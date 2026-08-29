// Database access for the Fezer Plus promo.
//
// One Supabase Postgres database, reached the same way from `npm run dev` and
// from the Netlify function, so localhost and production exercise identical SQL.
//
// Everything lives in its own `promo` schema rather than in `public`. That is
// deliberate: Supabase exposes `public` through PostgREST to anyone holding the
// anon key, and a table of unissued one-time store codes plus a ledger of names
// and email addresses has no business being reachable that way. PostgREST only
// serves the schemas it is configured for, and `promo` is not one of them, so
// the only route to these tables is this connection.
import postgres from 'postgres';

let sql;

/**
 * The connection pool.
 *
 * Serverless invocations come and go, so this points at Supabase's transaction
 * pooler (port 6543) rather than the database directly. Transaction pooling
 * hands a backend connection to a transaction rather than to a client, which is
 * exactly the shape of this workload -- and it means prepared statements cannot
 * be cached across calls, hence `prepare: false`.
 */
export function db() {
  if (sql) return sql;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Point it at the Supabase connection pooler: ' +
        'postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres'
    );
  }
  if (url.startsWith('file:') || url.startsWith('libsql:')) {
    throw new Error('DATABASE_URL must be a Postgres URL; the SQLite/libSQL backend has been removed.');
  }

  sql = postgres(url, {
    prepare: false,
    max: Number(process.env.PGPOOL_MAX || 3),
    idle_timeout: 20,
    connect_timeout: 15,
    // Supabase terminates TLS with its own CA. Verification against the system
    // store fails, so ask for an encrypted channel without demanding a chain we
    // do not ship: the credentials still never cross the wire in the clear.
    ssl: process.env.PGSSL_STRICT === 'true' ? 'verify-full' : { rejectUnauthorized: false },
    onnotice: () => {},
  });
  return sql;
}

/**
 * libSQL took `?` placeholders; Postgres wants `$1`, `$2`. Rewriting here keeps
 * every query in this codebase in one dialect. No `?` appears inside a string
 * literal in any of them -- if one ever does, it has to be written as `$n` by
 * hand instead.
 */
function toPositional(text) {
  let n = 0;
  return text.replace(/\?/g, () => `$${++n}`);
}

/** Runs one statement on a connection and normalises the result to `{ rows }`. */
async function run(conn, statement) {
  const text = typeof statement === 'string' ? statement : statement.sql;
  const args = typeof statement === 'string' ? [] : statement.args ?? [];
  const result = await conn.unsafe(toPositional(text), args);
  return { rows: Array.from(result), rowsAffected: result.count ?? 0 };
}

/** `db().execute(sqlString)` or `db().execute({ sql, args })`. */
export function execute(statement) {
  return run(db(), statement);
}

/**
 * Runs `fn` inside a real transaction, on one reserved connection.
 *
 * This is what makes handing out one-time-use codes safe: the read of an
 * existing claim, the UPDATE that reserves a code and the INSERT that records it
 * either all happen or none do. Two people submitting the same instant cannot be
 * handed the same code, and the same person submitting twice cannot burn two.
 */
export async function withTransaction(fn) {
  const conn = await db().reserve();
  let open = false;
  try {
    await conn.unsafe('BEGIN');
    open = true;
    const value = await fn({ execute: (statement) => run(conn, statement) });
    await conn.unsafe('COMMIT');
    open = false;
    return value;
  } catch (error) {
    if (open) {
      try {
        await conn.unsafe('ROLLBACK');
      } catch {
        // The connection is already gone; the original error is the useful one.
      }
    }
    throw error;
  } finally {
    conn.release();
  }
}

const SCHEMA = [
  `CREATE SCHEMA IF NOT EXISTS promo`,

  `CREATE TABLE IF NOT EXISTS promo.codes (
     code        text PRIMARY KEY,
     platform    text NOT NULL CHECK (platform IN ('ios','android')),
     redeem_url  text NOT NULL,
     -- Position in the imported file, so codes go out in the order they arrived
     -- rather than in whatever order the store happened to generate them.
     seq         integer NOT NULL,
     batch       text,
     -- ISO-8601 strings rather than timestamptz: every reader here treats these
     -- as opaque instants and formats them itself, and text round-trips through
     -- JSON, CSV export and the dashboard unchanged.
     imported_at text NOT NULL,
     claimed_at  text,
     claim_id    text
   )`,
  // The pool lookup is "next unclaimed code for this platform", so index exactly
  // that. The partial index keeps shrinking as the pool drains.
  `CREATE INDEX IF NOT EXISTS codes_pool
     ON promo.codes (platform, seq) WHERE claimed_at IS NULL`,

  `CREATE TABLE IF NOT EXISTS promo.claims (
     id                text PRIMARY KEY,
     email_key         text NOT NULL UNIQUE,
     email             text NOT NULL,
     name              text NOT NULL,
     platform          text NOT NULL,
     code              text NOT NULL UNIQUE,
     token             text NOT NULL UNIQUE,
     created_at        text NOT NULL,
     ip_hash           text,
     user_agent        text,
     utm               text,
     email_status      text NOT NULL DEFAULT 'pending',
     email_id          text,
     email_error       text,
     email_sent_at     text,
     opened_at         text,
     open_count        integer NOT NULL DEFAULT 0,
     activated_at      text,
     activation_source text
   )`,
  `CREATE INDEX IF NOT EXISTS claims_created ON promo.claims (created_at DESC)`,
  // The tracked redeem link is looked up by token on every click.
  `CREATE INDEX IF NOT EXISTS claims_token ON promo.claims (token)`,

  // Coarse abuse brake. One row per (bucket kind, key, hour).
  // `window` is a reserved word in Postgres, so the column is `window_key`.
  `CREATE TABLE IF NOT EXISTS promo.rate_limit (
     bucket     text NOT NULL,
     window_key text NOT NULL,
     hits       integer NOT NULL DEFAULT 0,
     PRIMARY KEY (bucket, window_key)
   )`,

  // Belt and braces alongside the unexposed schema: even if `promo` were ever
  // added to PostgREST's search path, the anon and authenticated roles have
  // nothing granted to them here, and every table is behind row level security
  // with no policy on it -- which denies everyone except the owning role this
  // connection uses.
  `REVOKE ALL ON SCHEMA promo FROM anon, authenticated`,
  `REVOKE ALL ON ALL TABLES IN SCHEMA promo FROM anon, authenticated`,
  `ALTER TABLE promo.codes      ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE promo.claims     ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE promo.rate_limit ENABLE ROW LEVEL SECURITY`,
];

let ready;

/**
 * Idempotent; every entry point awaits this before touching a table.
 *
 * The fast path matters more than it looks. A serverless cold start runs this
 * before its first query, and `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` takes
 * an ACCESS EXCLUSIVE lock even when the setting is already what it asks for --
 * replaying the whole script on every cold start would have a burst of traffic
 * queueing behind its own schema checks. One cheap lookup answers "is this
 * database already set up", and only a database that is not pays for the DDL.
 */
export function ensureSchema() {
  if (!ready) {
    ready = (async () => {
      const probe = await execute(`SELECT to_regclass('promo.claims') AS present`);
      if (probe.rows[0]?.present) return;

      for (const statement of SCHEMA) {
        try {
          await execute(statement);
        } catch (error) {
          // The REVOKEs reference Supabase-provided roles. On a plain Postgres
          // they do not exist, and that is not a reason to refuse to start.
          if (statement.startsWith('REVOKE') && /role .* does not exist/i.test(error?.message ?? '')) continue;
          throw error;
        }
      }
    })().catch((error) => {
      ready = undefined; // let the next request retry a transient connect failure
      throw error;
    });
  }
  return ready;
}
