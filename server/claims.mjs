// Allocating a promo code, and everything that has to stay true while doing it:
// one code per person, no code handed out twice, and a ledger that says who got
// what and whether they ever used it.
import { ensureSchema, execute, withTransaction } from './db.mjs';
import { deliverPromoEmail, renderPromoEmail } from './email.mjs';
import { PLATFORMS, newId, newToken, nowIso } from './util.mjs';

export async function stats() {
  await ensureSchema();

  const result = await execute(
    `SELECT platform,
            COUNT(*)                                      AS total,
            SUM(CASE WHEN claimed_at IS NULL THEN 1 ELSE 0 END) AS remaining
       FROM promo.codes
      GROUP BY platform`
  );

  const byPlatform = Object.fromEntries(
    PLATFORMS.map((platform) => [platform, { total: 0, remaining: 0, claimed: 0 }])
  );

  for (const row of result.rows) {
    const platform = String(row.platform);
    if (!byPlatform[platform]) continue;
    const total = Number(row.total);
    const remaining = Number(row.remaining);
    byPlatform[platform] = { total, remaining, claimed: total - remaining };
  }

  const total = PLATFORMS.reduce((sum, p) => sum + byPlatform[p].total, 0);
  const remaining = PLATFORMS.reduce((sum, p) => sum + byPlatform[p].remaining, 0);

  return { total, remaining, claimed: total - remaining, platforms: byPlatform };
}

/** The link that goes in the email: our redirect, so a click is recorded. */
function trackingUrl(siteUrl, token) {
  return `${siteUrl}/r/${token}`;
}

/**
 * Take one code out of the pool and write the claim, in a single transaction.
 *
 * Two people submitting at the same instant must not be handed the same code,
 * and the same person submitting twice must not burn two. Postgres does not
 * serialize writers the way SQLite does, so the pool read carries its own lock:
 * `FOR UPDATE SKIP LOCKED` gives each concurrent claim the first row nobody else
 * is holding. Without SKIP LOCKED the second claimant would block on the same
 * row and then find it taken, which reads as "sold out" while a thousand codes
 * are still sitting there.
 */
async function allocate({ emailKeyValue, email, name, platform, ipHash, userAgent, utm }) {
  return withTransaction(async (tx) => {
    const existing = await tx.execute({
      sql: `SELECT id, name, platform, code, token, email, email_status
              FROM promo.claims WHERE email_key = ?`,
      args: [emailKeyValue],
    });

    if (existing.rows.length > 0) {
      const row = existing.rows[0];
      return {
        status: 'existing',
        claim: {
          id: String(row.id),
          name: String(row.name),
          platform: String(row.platform),
          code: String(row.code),
          token: String(row.token),
          email: String(row.email),
          emailStatus: String(row.email_status),
        },
      };
    }

    const claimId = newId();
    const claimedAt = nowIso();

    const taken = await tx.execute({
      sql: `UPDATE promo.codes
               SET claimed_at = ?, claim_id = ?
             WHERE code = (SELECT code FROM promo.codes
                            WHERE platform = ? AND claimed_at IS NULL
                            ORDER BY seq
                            LIMIT 1
                            FOR UPDATE SKIP LOCKED)
         RETURNING code, redeem_url`,
      args: [claimedAt, claimId, platform],
    });

    if (taken.rows.length === 0) {
      return { status: 'sold_out', platform };
    }

    const code = String(taken.rows[0].code);
    const storeUrl = String(taken.rows[0].redeem_url);
    const token = newToken();

    await tx.execute({
      sql: `INSERT INTO promo.claims
              (id, email_key, email, name, platform, code, token, created_at,
               ip_hash, user_agent, utm, email_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      args: [
        claimId,
        emailKeyValue,
        email,
        name,
        platform,
        code,
        token,
        claimedAt,
        ipHash,
        userAgent ? userAgent.slice(0, 300) : null,
        utm ? JSON.stringify(utm) : null,
      ],
    });

    return {
      status: 'new',
      claim: { id: claimId, name, platform, code, token, email, storeUrl, emailStatus: 'pending' },
    };
  });
}

async function storeUrlFor(code) {
  const result = await execute({
    sql: 'SELECT redeem_url FROM promo.codes WHERE code = ?',
    args: [code],
  });
  return result.rows[0] ? String(result.rows[0].redeem_url) : null;
}

async function recordDelivery(claimId, result) {
  await execute({
    sql: `UPDATE promo.claims
             SET email_status = ?, email_id = ?, email_error = ?, email_sent_at = ?
           WHERE id = ?`,
    args: [
      result.ok ? 'sent' : 'failed',
      result.id ?? null,
      result.ok ? null : String(result.error ?? 'unknown error').slice(0, 500),
      result.ok ? nowIso() : null,
      claimId,
    ],
  });
}

/**
 * The whole claim path: reserve a code, then email it.
 *
 * Delivery happens outside the transaction and its outcome is recorded on the
 * claim. A send that fails leaves the code assigned to that address rather than
 * back in the pool -- coming back with the same email re-sends the same code
 * instead of burning a second one.
 */
export async function claimCode({ name, email, emailKeyValue, platform, siteUrl, ipHash, userAgent, utm }) {
  await ensureSchema();

  const outcome = await allocate({ emailKeyValue, email, name, platform, ipHash, userAgent, utm });
  if (outcome.status === 'sold_out') return outcome;

  const claim = outcome.claim;
  const alreadyDelivered = outcome.status === 'existing' && claim.emailStatus === 'sent';

  // Someone who already has a code and already received it does not get another
  // email on every form submit; they are told to check their inbox instead.
  if (alreadyDelivered) {
    return { status: 'already_claimed', claim, resent: false };
  }

  const storeUrl = claim.storeUrl ?? (await storeUrlFor(claim.code));
  const message = renderPromoEmail({
    name: claim.name,
    platform: claim.platform,
    code: claim.code,
    redeemUrl: trackingUrl(siteUrl, claim.token),
    siteUrl,
  });

  const delivery = await deliverPromoEmail({
    to: claim.email,
    subject: message.subject,
    html: message.html,
    text: message.text,
    code: claim.code,
  });

  await recordDelivery(claim.id, delivery);

  if (!delivery.ok) {
    return { status: 'send_failed', claim, error: delivery.error, storeUrl };
  }

  return {
    status: outcome.status === 'existing' ? 'already_claimed' : 'sent',
    claim,
    resent: outcome.status === 'existing',
    transport: delivery.transport,
    storeUrl,
  };
}

/** Follows the tracked link from the email and records the click. */
export async function openRedeemLink(token) {
  await ensureSchema();

  const result = await execute({
    sql: `UPDATE promo.claims
             SET opened_at  = COALESCE(opened_at, ?),
                 open_count = open_count + 1
           WHERE token = ?
       RETURNING code, platform`,
    args: [nowIso(), token],
  });

  if (result.rows.length === 0) return null;
  const code = String(result.rows[0].code);
  return { code, platform: String(result.rows[0].platform), url: await storeUrlFor(code) };
}
