import crypto from 'node:crypto';
import { execute } from './db.mjs';

export const PLATFORMS = ['ios', 'android'];

export const PLATFORM_LABEL = {
  ios: 'iPhone or iPad',
  android: 'Android',
};

export function json(body, init = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...(init.headers ?? {}),
    },
  });
}

export function nowIso() {
  return new Date().toISOString();
}

export function newId() {
  return crypto.randomUUID();
}

/** URL-safe, unguessable, and short enough to sit in an email link. */
export function newToken() {
  return crypto.randomBytes(16).toString('base64url');
}

/**
 * The key a claim is deduplicated on -- "one code per email" has to survive the
 * obvious dodges. Gmail ignores dots and everything after a `+`, so
 * `j.o.e+3@gmail.com` and `joe@gmail.com` are one inbox and get one code. The
 * address we actually deliver to is stored separately and untouched.
 */
export function emailKey(raw) {
  const address = String(raw ?? '').trim().toLowerCase();
  const at = address.lastIndexOf('@');
  if (at < 1) return address;

  let local = address.slice(0, at);
  const domain = address.slice(at + 1);

  local = local.split('+')[0];
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    local = local.replace(/\./g, '');
    return `${local}@gmail.com`;
  }
  return `${local}@${domain}`;
}

// Deliberately permissive: the real validation is that the address accepts the
// email. This only rejects input that cannot be an address at all.
const EMAIL_SHAPE = /^[^\s@,;:<>()[\]\\"]+@[^\s@.]+(\.[^\s@.]+)+$/;

export function isEmailShaped(value) {
  const address = String(value ?? '').trim();
  return address.length >= 6 && address.length <= 254 && EMAIL_SHAPE.test(address);
}

/** IPs are personal data and we only ever need equality, so store a digest. */
export function hashIp(ip) {
  if (!ip) return null;
  const salt = process.env.PROMO_IP_SALT || 'fezer-promo';
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}

export function clientIp(request) {
  const headers = request.headers;
  const forwarded = headers.get('x-nf-client-connection-ip') || headers.get('x-forwarded-for');
  if (!forwarded) return null;
  return forwarded.split(',')[0].trim() || null;
}

/**
 * Fixed-window counter. Not precise at window edges, and that is fine -- it is
 * here to stop a script from draining the pool, not to meter an API.
 */
export async function rateLimit(bucket, key, limit, windowMs = 60 * 60 * 1000) {
  if (!key) return { ok: true, hits: 0 };
  const window = String(Math.floor(Date.now() / windowMs));
  const id = `${bucket}:${key}`;

  const result = await execute({
    sql: `INSERT INTO promo.rate_limit (bucket, window_key, hits) VALUES (?, ?, 1)
          ON CONFLICT (bucket, window_key) DO UPDATE SET hits = rate_limit.hits + 1
          RETURNING hits`,
    args: [id, window],
  });

  const hits = Number(result.rows[0]?.hits ?? 1);
  return { ok: hits <= limit, hits };
}

export function timingSafeEqual(a, b) {
  const left = Buffer.from(String(a ?? ''));
  const right = Buffer.from(String(b ?? ''));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

/** Admin endpoints are token-gated; no token configured means no admin API. */
export function isAdmin(request) {
  const expected = process.env.PROMO_ADMIN_TOKEN;
  if (!expected) return false;

  // Header only. A token in a query string ends up in browser history and in
  // access logs, and the dashboard has no need for one there.
  const header = request.headers.get('authorization') || '';
  const bearer = header.startsWith('Bearer ') ? header.slice(7) : '';
  return timingSafeEqual(bearer, expected);
}

export function siteUrl(request) {
  const configured = process.env.PROMO_SITE_URL;
  if (configured) return configured.replace(/\/+$/, '');
  try {
    return new URL(request.url).origin;
  } catch {
    return 'https://fezer.app';
  }
}
