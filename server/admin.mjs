// The operator side: who has a code, whether the email landed, and whether the
// code was actually used.
import { ensureSchema, execute } from './db.mjs';
import { deliverPromoEmail, renderPromoEmail } from './email.mjs';
import { nowIso } from './util.mjs';

const CLAIM_COLUMNS = `id, created_at, name, email, platform, code, email_status, email_sent_at,
                       email_error, opened_at, open_count, activated_at, activation_source, utm`;

function toClaim(row) {
  let utm = null;
  if (row.utm) {
    try {
      utm = JSON.parse(String(row.utm));
    } catch {
      utm = null;
    }
  }
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    name: String(row.name),
    email: String(row.email),
    platform: String(row.platform),
    code: String(row.code),
    emailStatus: String(row.email_status),
    emailSentAt: row.email_sent_at ? String(row.email_sent_at) : null,
    emailError: row.email_error ? String(row.email_error) : null,
    openedAt: row.opened_at ? String(row.opened_at) : null,
    openCount: Number(row.open_count ?? 0),
    activatedAt: row.activated_at ? String(row.activated_at) : null,
    activationSource: row.activation_source ? String(row.activation_source) : null,
    utm,
  };
}

export async function listClaims({ limit = 500, offset = 0, platform, search } = {}) {
  await ensureSchema();

  const where = [];
  const args = [];
  if (platform) {
    where.push('platform = ?');
    args.push(platform);
  }
  if (search) {
    where.push('(email ILIKE ? OR name ILIKE ? OR code ILIKE ?)');
    const like = `%${search}%`;
    args.push(like, like, like);
  }

  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const rows = await execute({
    sql: `SELECT ${CLAIM_COLUMNS} FROM promo.claims ${clause}
          ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    args: [...args, Math.min(Number(limit) || 500, 5000), Number(offset) || 0],
  });

  const count = await execute({
    sql: `SELECT COUNT(*) AS n FROM promo.claims ${clause}`,
    args,
  });

  return { claims: rows.rows.map(toClaim), matched: Number(count.rows[0]?.n ?? 0) };
}

/** Headline numbers for the dashboard -- the funnel, not just the pool. */
export async function summary() {
  await ensureSchema();

  const result = await execute(
    `SELECT platform,
            COUNT(*)                                                  AS claims,
            SUM(CASE WHEN email_status = 'sent'   THEN 1 ELSE 0 END)  AS sent,
            SUM(CASE WHEN email_status = 'failed' THEN 1 ELSE 0 END)  AS failed,
            SUM(CASE WHEN opened_at   IS NOT NULL THEN 1 ELSE 0 END)  AS opened,
            SUM(CASE WHEN activated_at IS NOT NULL THEN 1 ELSE 0 END) AS activated
       FROM promo.claims GROUP BY platform`
  );

  const byPlatform = {};
  for (const row of result.rows) {
    byPlatform[String(row.platform)] = {
      claims: Number(row.claims),
      sent: Number(row.sent),
      failed: Number(row.failed),
      opened: Number(row.opened),
      activated: Number(row.activated),
    };
  }
  return byPlatform;
}

export function claimsToCsv(claims) {
  const header = [
    'claimed_at', 'name', 'email', 'platform', 'code', 'email_status', 'email_sent_at',
    'email_error', 'redeem_link_opened_at', 'open_count', 'activated_at', 'activation_source',
    'utm_source', 'utm_medium', 'utm_campaign',
  ];

  const escape = (value) => {
    const text = value === null || value === undefined ? '' : String(value);
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  const lines = [header.join(',')];
  for (const claim of claims) {
    lines.push([
      claim.createdAt, claim.name, claim.email, claim.platform, claim.code,
      claim.emailStatus, claim.emailSentAt, claim.emailError, claim.openedAt,
      claim.openCount, claim.activatedAt, claim.activationSource,
      claim.utm?.utm_source, claim.utm?.utm_medium, claim.utm?.utm_campaign,
    ].map(escape).join(','));
  }
  return `${lines.join('\r\n')}\r\n`;
}

// Store codes are alphanumeric and long; this pulls them out of anything pasted
// in, so an App Store Connect or Play Console export can go in verbatim.
const CODE_TOKEN = /[A-Z0-9]{12,32}/g;

/**
 * Marks codes as actually redeemed.
 *
 * Neither store pushes a per-code redemption event we can subscribe to, so the
 * ground truth arrives as a periodic export: App Store Connect lists which
 * one-time offer codes were used, Play Console the same for promotion codes.
 * Paste or upload that export and every code in it that we issued gets stamped.
 * Codes we never issued are reported back rather than silently ignored.
 */
export async function markActivated(input, source = 'import') {
  await ensureSchema();

  const raw = Array.isArray(input) ? input.join('\n') : String(input ?? '');
  const found = [...new Set((raw.toUpperCase().match(CODE_TOKEN) ?? []))];
  if (found.length === 0) return { matched: 0, newlyActivated: 0, unknown: [], scanned: 0 };

  const stamp = nowIso();
  let matched = 0;
  let newlyActivated = 0;
  const known = new Set();

  // Chunked so a large paste stays well inside the bind-parameter limit.
  for (let i = 0; i < found.length; i += 200) {
    const chunk = found.slice(i, i + 200);
    const placeholders = chunk.map(() => '?').join(',');

    const before = await execute({
      sql: `SELECT code, activated_at FROM promo.claims WHERE code IN (${placeholders})`,
      args: chunk,
    });
    for (const row of before.rows) {
      known.add(String(row.code));
      matched += 1;
      if (!row.activated_at) newlyActivated += 1;
    }

    await execute({
      sql: `UPDATE promo.claims
               SET activated_at = COALESCE(activated_at, ?), activation_source = ?
             WHERE code IN (${placeholders})`,
      args: [stamp, source, ...chunk],
    });
  }

  return {
    scanned: found.length,
    matched,
    newlyActivated,
    unknown: found.filter((code) => !known.has(code)).slice(0, 50),
  };
}

/** Re-send a claim's existing code -- for a bounce or a Resend outage. */
export async function resendClaim(claimId, siteUrl) {
  await ensureSchema();

  const result = await execute({
    sql: 'SELECT id, name, email, platform, code, token FROM promo.claims WHERE id = ? OR email = ?',
    args: [claimId, claimId],
  });
  if (result.rows.length === 0) return { ok: false, error: 'No claim with that id or email' };

  const row = result.rows[0];
  const message = renderPromoEmail({
    name: String(row.name),
    platform: String(row.platform),
    code: String(row.code),
    redeemUrl: `${siteUrl}/r/${String(row.token)}`,
    siteUrl,
  });

  const delivery = await deliverPromoEmail({
    to: String(row.email),
    subject: message.subject,
    html: message.html,
    text: message.text,
    code: String(row.code),
  });

  await execute({
    sql: `UPDATE promo.claims SET email_status = ?, email_id = ?, email_error = ?, email_sent_at = ?
           WHERE id = ?`,
    args: [
      delivery.ok ? 'sent' : 'failed',
      delivery.id ?? null,
      delivery.ok ? null : String(delivery.error ?? '').slice(0, 500),
      delivery.ok ? nowIso() : null,
      String(row.id),
    ],
  });

  return { ok: delivery.ok, error: delivery.error ?? null, email: String(row.email) };
}
