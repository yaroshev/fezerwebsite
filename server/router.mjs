// One dispatcher, two hosts: the Vite dev server mounts it as middleware and the
// Netlify function forwards to it, so localhost and production run identical
// request handling.
import { claimCode, openRedeemLink, stats } from './claims.mjs';
import { claimsToCsv, listClaims, markActivated, resendClaim, summary } from './admin.mjs';
import {
  allBattles,
  castVote,
  closeBattle,
  createBattle,
  deleteBattle,
  publicBattles,
  resetVotes,
  updateBattle,
} from './arena.mjs';
import {
  PLATFORMS,
  clientIp,
  emailKey,
  hashIp,
  isAdmin,
  isEmailShaped,
  json,
  rateLimit,
  siteUrl,
} from './util.mjs';

const CLAIMS_PER_IP_PER_HOUR = Number(process.env.PROMO_IP_HOURLY_LIMIT || 6);
const VOTES_PER_IP_PER_HOUR = Number(process.env.ARENA_IP_HOURLY_LIMIT || 30);

/**
 * The browser's anonymous voter token.
 *
 * A header rather than a query parameter: a token in a URL ends up in history,
 * in referrers and in access logs, and this one is the only thing standing
 * between a visitor and a second vote.
 */
function voterKey(request) {
  const value = String(request.headers.get('x-fezer-voter') ?? '').trim();
  return /^[A-Za-z0-9_-]{8,100}$/.test(value) ? value : null;
}

function maskEmail(address) {
  const [local, domain] = String(address).split('@');
  if (!domain) return address;
  const head = local.slice(0, 2);
  return `${head}${'*'.repeat(Math.max(local.length - 2, 1))}@${domain}`;
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function handleClaim(request) {
  const body = await readJson(request);
  if (!body || typeof body !== 'object') {
    return json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see.
  if (String(body.company ?? '').trim() !== '') {
    return json({ ok: true, status: 'sent', platform: body.platform ?? 'ios' });
  }

  const name = String(body.name ?? '').trim().replace(/\s+/g, ' ');
  const email = String(body.email ?? '').trim();
  const platform = String(body.platform ?? '');

  if (name.length < 1 || name.length > 80) {
    return json({ ok: false, error: 'invalid_name' }, { status: 400 });
  }
  if (!isEmailShaped(email)) {
    return json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }
  if (!PLATFORMS.includes(platform)) {
    return json({ ok: false, error: 'invalid_platform' }, { status: 400 });
  }

  const ip = clientIp(request);
  const ipHash = hashIp(ip);
  const limit = await rateLimit('claim_ip', ipHash, CLAIMS_PER_IP_PER_HOUR);
  if (!limit.ok) {
    return json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const utm = body.utm && typeof body.utm === 'object' ? body.utm : null;

  const result = await claimCode({
    name,
    email,
    emailKeyValue: emailKey(email),
    platform,
    siteUrl: siteUrl(request),
    ipHash,
    userAgent: request.headers.get('user-agent'),
    utm,
  });

  if (result.status === 'sold_out') {
    return json({ ok: false, error: 'sold_out', platform }, { status: 409 });
  }

  if (result.status === 'send_failed') {
    // The code is theirs and stays theirs; only delivery failed.
    return json(
      { ok: false, error: 'send_failed', message: result.error, platform: result.claim.platform },
      { status: 502 }
    );
  }

  return json({
    ok: true,
    status: result.status, // 'sent' | 'already_claimed'
    platform: result.claim.platform,
    email: maskEmail(result.claim.email),
    resent: Boolean(result.resent),
  });
}

async function handleRedirect(request, token) {
  const opened = await openRedeemLink(token);
  if (!opened || !opened.url) {
    return Response.redirect(`${siteUrl(request)}/plus-free?link=unknown`, 302);
  }
  return new Response(null, {
    status: 302,
    headers: { location: opened.url, 'cache-control': 'no-store' },
  });
}

async function handleArena(request, path) {
  if (path === '/api/arena/battles' && request.method === 'GET') {
    const { live, closed } = await publicBattles(voterKey(request));
    return json({ ok: true, live, closed });
  }

  if (path === '/api/arena/vote' && request.method === 'POST') {
    const body = await readJson(request);
    const voter = voterKey(request) ?? String(body?.voter ?? '').trim();
    const ipHash = hashIp(clientIp(request));

    // Coarse brake on top of the per-battle rules: one connection cannot sit
    // there minting fresh tokens all afternoon.
    const limit = await rateLimit('arena_ip', ipHash, VOTES_PER_IP_PER_HOUR);
    if (!limit.ok) return json({ ok: false, error: 'rate_limited' }, { status: 429 });

    const result = await castVote({
      battleId: String(body?.battle ?? ''),
      side: String(body?.side ?? ''),
      voterKey: voter,
      ipHash,
      userAgent: request.headers.get('user-agent'),
    });

    return json(result, { status: result.ok ? 200 : (result.status ?? 400) });
  }

  return json({ ok: false, error: 'not_found', path }, { status: 404 });
}

/** `/api/admin/arena/...` -- everything an operator does to a battle. */
async function handleAdminArena(request, segments) {
  const id = segments[1];

  if (!id && request.method === 'GET') {
    return json({ ok: true, battles: await allBattles() });
  }

  if (!id && request.method === 'POST') {
    const result = await createBattle(await readJson(request));
    return json(result, { status: result.ok ? 200 : 400 });
  }

  if (!id) return json({ ok: false, error: 'not_found' }, { status: 404 });

  const action = segments[2];

  if (!action && (request.method === 'PATCH' || request.method === 'PUT')) {
    const result = await updateBattle(id, await readJson(request));
    return json(result, { status: result.ok ? 200 : result.error === 'not_found' ? 404 : 400 });
  }

  if (!action && request.method === 'DELETE') {
    const result = await deleteBattle(id);
    return json(result, { status: result.ok ? 200 : 404 });
  }

  if (action === 'close' && request.method === 'POST') {
    const result = await closeBattle(id);
    return json(result, { status: result.ok ? 200 : 404 });
  }

  if (action === 'reset' && request.method === 'POST') {
    return json(await resetVotes(id));
  }

  return json({ ok: false, error: 'not_found' }, { status: 404 });
}

async function handleAdmin(request, url, segments) {
  if (!isAdmin(request)) {
    return json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const section = segments[0];

  if (section === 'arena') {
    return await handleAdminArena(request, segments);
  }

  if (section === 'summary' && request.method === 'GET') {
    return json({ ok: true, pool: await stats(), funnel: await summary() });
  }

  if (section === 'claims' && request.method === 'GET') {
    const { claims, matched } = await listClaims({
      limit: url.searchParams.get('limit') ?? 500,
      offset: url.searchParams.get('offset') ?? 0,
      platform: url.searchParams.get('platform') ?? undefined,
      search: url.searchParams.get('q') ?? undefined,
    });

    if (url.searchParams.get('format') === 'csv') {
      return new Response(claimsToCsv(claims), {
        headers: {
          'content-type': 'text/csv; charset=utf-8',
          'content-disposition': `attachment; filename="fezer-plus-promo-${new Date().toISOString().slice(0, 10)}.csv"`,
          'cache-control': 'no-store',
        },
      });
    }
    return json({ ok: true, matched, claims });
  }

  if (section === 'activations' && request.method === 'POST') {
    const contentType = request.headers.get('content-type') ?? '';
    let payload;
    let source = url.searchParams.get('source') ?? 'import';

    if (contentType.includes('application/json')) {
      const body = await readJson(request);
      payload = body?.codes ?? body?.text ?? '';
      if (body?.source) source = String(body.source);
    } else {
      payload = await request.text();
    }

    return json({ ok: true, ...(await markActivated(payload, source)) });
  }

  if (section === 'resend' && request.method === 'POST') {
    const body = await readJson(request);
    const target = String(body?.claim ?? body?.email ?? body?.id ?? '').trim();
    if (!target) return json({ ok: false, error: 'missing_claim' }, { status: 400 });
    const result = await resendClaim(target, siteUrl(request));
    return json(result, { status: result.ok ? 200 : 400 });
  }

  return json({ ok: false, error: 'not_found' }, { status: 404 });
}

/** Takes a WHATWG Request, returns a Response. No host-specific types. */
export async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '') || '/';

  try {
    if (path.startsWith('/r/')) {
      return await handleRedirect(request, decodeURIComponent(path.slice(3)));
    }

    if (path === '/api/promo/stats' && request.method === 'GET') {
      return json({ ok: true, ...(await stats()) }, {
        // A few seconds of edge caching keeps the counter honest while absorbing
        // the burst of every page view asking at once.
        headers: { 'cache-control': 'public, max-age=0, s-maxage=15' },
      });
    }

    if (path === '/api/promo/claim' && request.method === 'POST') {
      return await handleClaim(request);
    }

    if (path.startsWith('/api/arena/')) {
      return await handleArena(request, path);
    }

    if (path.startsWith('/api/admin/')) {
      return await handleAdmin(request, url, path.slice('/api/admin/'.length).split('/'));
    }

    return json({ ok: false, error: 'not_found', path }, { status: 404 });
  } catch (error) {
    console.error('[promo] request failed', path, error);
    return json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
