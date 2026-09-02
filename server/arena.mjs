// Feature Arena: two candidate features, one deadline, one vote per visitor.
//
// Same shape as the promo module next door -- its own schema (`arena`), created
// on first use, unreachable through PostgREST, and every query goes through the
// one pooled connection in db.mjs.
//
// Vote totals are counted from the ledger rather than kept as a running tally on
// the battle. A denormalised counter is one bug away from disagreeing with the
// rows behind it, and these are hundreds of votes, not millions.
import { execute, withTransaction } from './db.mjs';
import { newId, nowIso } from './util.mjs';

export const SIDES = ['a', 'b'];

/**
 * How many votes one IP may cast in a single battle.
 *
 * Not one: a household, an office and a mobile carrier all share an address, and
 * refusing the second person in a coffee shop is a worse failure than letting a
 * determined person clear their storage twice. The browser token is the primary
 * identity; this is the brake on scripting it.
 */
const VOTES_PER_IP = Number(process.env.ARENA_IP_VOTES_PER_BATTLE || 3);

/** Opaque, URL-safe, and long enough not to collide. */
const VOTER_KEY = /^[A-Za-z0-9_-]{8,100}$/;

/**
 * Asks the host to rebuild the site.
 *
 * The published battles are baked into every prerendered page so that crawlers
 * and link previews see the real matchup -- which means a battle published or
 * closed here is invisible to them until the next deploy. One POST to a Netlify
 * build hook closes that gap. Unset in development, and never awaited: a slow or
 * broken hook must not make an operator's click fail.
 */
function requestRebuild(reason) {
  const hook = process.env.NETLIFY_BUILD_HOOK;
  if (!hook) return;

  fetch(hook, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ trigger_title: `Feature Arena: ${reason}` }),
  }).catch((error) => {
    console.warn('[arena] build hook failed', error?.message ?? error);
  });
}

const SCHEMA = [
  `CREATE SCHEMA IF NOT EXISTS arena`,

  `CREATE TABLE IF NOT EXISTS arena.battles (
     id         text PRIMARY KEY,
     slug       text NOT NULL UNIQUE,
     title      text NOT NULL,
     subtitle   text,
     a_title    text NOT NULL,
     a_summary  text NOT NULL,
     a_detail   text,
     b_title    text NOT NULL,
     b_summary  text NOT NULL,
     b_detail   text,
     -- ISO-8601 strings, like the promo tables: every reader treats these as
     -- opaque instants and formats them itself.
     closes_at  text NOT NULL,
     published  boolean NOT NULL DEFAULT false,
     created_at text NOT NULL,
     updated_at text NOT NULL
   )`,
  `CREATE INDEX IF NOT EXISTS battles_live ON arena.battles (published, closes_at DESC)`,

  `CREATE TABLE IF NOT EXISTS arena.votes (
     id         text PRIMARY KEY,
     battle_id  text NOT NULL REFERENCES arena.battles (id) ON DELETE CASCADE,
     side       text NOT NULL CHECK (side IN ('a','b')),
     -- Anonymous per-browser token. No account, no email, nothing that
     -- identifies a person -- just something stable enough to say "you already
     -- voted in this one" when they come back.
     voter_key  text NOT NULL,
     ip_hash    text,
     user_agent text,
     created_at text NOT NULL
   )`,
  // The database, not the application, is what makes one-vote-per-visitor true:
  // two clicks landing at the same instant cannot both insert.
  `CREATE UNIQUE INDEX IF NOT EXISTS votes_one_per_voter ON arena.votes (battle_id, voter_key)`,
  `CREATE INDEX IF NOT EXISTS votes_by_ip ON arena.votes (battle_id, ip_hash)`,

  `REVOKE ALL ON SCHEMA arena FROM anon, authenticated`,
  `REVOKE ALL ON ALL TABLES IN SCHEMA arena FROM anon, authenticated`,
  `ALTER TABLE arena.battles ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE arena.votes   ENABLE ROW LEVEL SECURITY`,
];

let ready;

/** Idempotent, and cheap on the path that matters -- see db.mjs `ensureSchema`. */
export function ensureArenaSchema() {
  if (!ready) {
    ready = (async () => {
      const probe = await execute(`SELECT to_regclass('arena.battles') AS present`);
      if (probe.rows[0]?.present) return;

      for (const statement of SCHEMA) {
        try {
          await execute(statement);
        } catch (error) {
          if (statement.startsWith('REVOKE') && /role .* does not exist/i.test(error?.message ?? '')) continue;
          throw error;
        }
      }
    })().catch((error) => {
      ready = undefined;
      throw error;
    });
  }
  return ready;
}

function text(value, max) {
  const out = String(value ?? '').trim().replace(/\s+/g, ' ');
  return max ? out.slice(0, max) : out;
}

/** Multi-line fields keep their line breaks; only trailing whitespace goes. */
function block(value, max = 1200) {
  const out = String(value ?? '').replace(/\r\n/g, '\n').trim();
  return out.slice(0, max);
}

export function slugify(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

async function uniqueSlug(base, exceptId) {
  const root = slugify(base) || `battle-${Date.now().toString(36)}`;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const candidate = attempt === 0 ? root : `${root}-${attempt + 1}`;
    const clash = await execute({
      sql: 'SELECT id FROM arena.battles WHERE slug = ?',
      args: [candidate],
    });
    if (clash.rows.length === 0 || String(clash.rows[0].id) === String(exceptId ?? '')) return candidate;
  }
  return `${root}-${Date.now().toString(36)}`;
}

function toBattle(row, counts = { a: 0, b: 0 }, myVote = null) {
  const closesAt = String(row.closes_at);
  const closed = Date.parse(closesAt) <= Date.now();
  const published = row.published === true || row.published === 't' || row.published === 1;
  const total = counts.a + counts.b;

  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    subtitle: row.subtitle ? String(row.subtitle) : null,
    a: {
      title: String(row.a_title),
      summary: String(row.a_summary),
      detail: row.a_detail ? String(row.a_detail) : null,
    },
    b: {
      title: String(row.b_title),
      summary: String(row.b_summary),
      detail: row.b_detail ? String(row.b_detail) : null,
    },
    closesAt,
    published,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    votes: { a: counts.a, b: counts.b, total },
    // A battle nobody published is a draft whatever its deadline says.
    status: !published ? 'draft' : closed ? 'closed' : 'live',
    closed,
    // Only meaningful once voting is over; before that the bar is the whole story.
    winner: closed ? (counts.a === counts.b ? 'tie' : counts.a > counts.b ? 'a' : 'b') : null,
    myVote,
  };
}

async function countsFor(ids) {
  const tally = new Map(ids.map((id) => [id, { a: 0, b: 0 }]));
  if (ids.length === 0) return tally;

  const placeholders = ids.map(() => '?').join(',');
  const result = await execute({
    sql: `SELECT battle_id, side, COUNT(*) AS n FROM arena.votes
           WHERE battle_id IN (${placeholders}) GROUP BY battle_id, side`,
    args: ids,
  });

  for (const row of result.rows) {
    const entry = tally.get(String(row.battle_id));
    if (entry) entry[String(row.side)] = Number(row.n);
  }
  return tally;
}

/** Which side this browser already picked, per battle. */
async function votesByVoter(ids, voterKey) {
  const mine = new Map();
  if (!voterKey || ids.length === 0) return mine;

  const placeholders = ids.map(() => '?').join(',');
  const result = await execute({
    sql: `SELECT battle_id, side FROM arena.votes
           WHERE voter_key = ? AND battle_id IN (${placeholders})`,
    args: [voterKey, ...ids],
  });
  for (const row of result.rows) mine.set(String(row.battle_id), String(row.side));
  return mine;
}

const COLUMNS = `id, slug, title, subtitle, a_title, a_summary, a_detail,
                 b_title, b_summary, b_detail, closes_at, published, created_at, updated_at`;

async function hydrate(rows, voterKey) {
  const ids = rows.map((row) => String(row.id));
  const [counts, mine] = await Promise.all([countsFor(ids), votesByVoter(ids, voterKey)]);
  return rows.map((row) =>
    toBattle(row, counts.get(String(row.id)) ?? { a: 0, b: 0 }, mine.get(String(row.id)) ?? null)
  );
}

/**
 * What the public page shows: published battles only.
 *
 * Live ones first, the one closing soonest at the top, then the decided ones
 * newest first -- the archive reads as a history of what won.
 */
export async function publicBattles(voterKey) {
  await ensureArenaSchema();

  const result = await execute(
    `SELECT ${COLUMNS} FROM arena.battles WHERE published = true ORDER BY closes_at DESC`
  );

  const battles = await hydrate(result.rows, voterKey);
  const live = battles.filter((battle) => !battle.closed).sort((x, y) => x.closesAt.localeCompare(y.closesAt));
  const closed = battles.filter((battle) => battle.closed);
  return { live, closed };
}

/** Everything, drafts included. Admin only. */
export async function allBattles() {
  await ensureArenaSchema();
  const result = await execute(
    `SELECT ${COLUMNS} FROM arena.battles ORDER BY closes_at DESC, created_at DESC`
  );
  return hydrate(result.rows, null);
}

export async function getBattle(id, voterKey) {
  await ensureArenaSchema();
  const result = await execute({
    sql: `SELECT ${COLUMNS} FROM arena.battles WHERE id = ? OR slug = ?`,
    args: [id, id],
  });
  if (result.rows.length === 0) return null;
  const [battle] = await hydrate(result.rows, voterKey);
  return battle;
}

/** Shared by create and update: rejects what cannot be rendered or voted on. */
function readInput(body, { partial = false } = {}) {
  const errors = [];
  const out = {};

  const field = (key, source, { required, max, multiline }) => {
    if (partial && !(source in (body ?? {}))) return;
    const value = multiline ? block(body?.[source], max) : text(body?.[source], max);
    if (required && !value) errors.push(source);
    out[key] = value || null;
  };

  field('title', 'title', { required: true, max: 120 });
  field('subtitle', 'subtitle', { max: 200 });
  field('a_title', 'aTitle', { required: true, max: 80 });
  field('a_summary', 'aSummary', { required: true, max: 400, multiline: true });
  field('a_detail', 'aDetail', { max: 1200, multiline: true });
  field('b_title', 'bTitle', { required: true, max: 80 });
  field('b_summary', 'bSummary', { required: true, max: 400, multiline: true });
  field('b_detail', 'bDetail', { max: 1200, multiline: true });

  if (!partial || 'closesAt' in (body ?? {})) {
    const closesAt = new Date(String(body?.closesAt ?? ''));
    if (Number.isNaN(closesAt.getTime())) errors.push('closesAt');
    else out.closes_at = closesAt.toISOString();
  }

  if (!partial || 'published' in (body ?? {})) {
    out.published = Boolean(body?.published);
  }

  if ('slug' in (body ?? {})) {
    const slug = slugify(body.slug);
    if (slug) out.slug = slug;
  }

  return { values: out, errors };
}

export async function createBattle(body) {
  await ensureArenaSchema();

  const { values, errors } = readInput(body);
  if (errors.length) return { ok: false, error: 'invalid_fields', fields: errors };

  const id = newId();
  const stamp = nowIso();
  const slug = await uniqueSlug(values.slug ?? values.title);

  await execute({
    sql: `INSERT INTO arena.battles
            (id, slug, title, subtitle, a_title, a_summary, a_detail,
             b_title, b_summary, b_detail, closes_at, published, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id, slug, values.title, values.subtitle,
      values.a_title, values.a_summary, values.a_detail,
      values.b_title, values.b_summary, values.b_detail,
      values.closes_at, values.published ?? false, stamp, stamp,
    ],
  });

  if (values.published) requestRebuild(`published "${values.title}"`);

  return { ok: true, battle: await getBattle(id) };
}

export async function updateBattle(id, body) {
  await ensureArenaSchema();

  const existing = await execute({
    sql: 'SELECT id, published FROM arena.battles WHERE id = ?',
    args: [id],
  });
  if (existing.rows.length === 0) return { ok: false, error: 'not_found' };
  const wasPublished = existing.rows[0].published === true || existing.rows[0].published === 't';

  const { values, errors } = readInput(body, { partial: true });
  if (errors.length) return { ok: false, error: 'invalid_fields', fields: errors };

  if (values.slug) values.slug = await uniqueSlug(values.slug, id);

  const columns = Object.keys(values);
  if (columns.length === 0) return { ok: true, battle: await getBattle(id) };

  const assignments = columns.map((column) => `${column} = ?`).join(', ');
  await execute({
    sql: `UPDATE arena.battles SET ${assignments}, updated_at = ? WHERE id = ?`,
    args: [...columns.map((column) => values[column]), nowIso(), id],
  });

  const battle = await getBattle(id);
  // Either state being published means what the last build baked in is now wrong.
  if (wasPublished || battle?.published) requestRebuild(`updated "${battle?.title ?? id}"`);

  return { ok: true, battle };
}

/**
 * Deleting a battle takes its votes with it (ON DELETE CASCADE). That is the
 * point: a removed battle leaves nothing behind that could be counted again.
 */
export async function deleteBattle(id) {
  await ensureArenaSchema();
  const result = await execute({
    sql: 'DELETE FROM arena.battles WHERE id = ? RETURNING id, published, title',
    args: [id],
  });
  if (result.rows.length === 0) return { ok: false };
  if (result.rows[0].published === true || result.rows[0].published === 't') {
    requestRebuild(`deleted "${result.rows[0].title}"`);
  }
  return { ok: true };
}

/** Ends a battle now, without waiting for the clock. */
export async function closeBattle(id) {
  await ensureArenaSchema();
  const result = await execute({
    sql: 'UPDATE arena.battles SET closes_at = ?, updated_at = ? WHERE id = ? RETURNING id',
    args: [nowIso(), nowIso(), id],
  });
  if (result.rows.length === 0) return { ok: false, error: 'not_found' };

  const battle = await getBattle(id);
  if (battle?.published) requestRebuild(`closed "${battle.title}"`);

  return { ok: true, battle };
}

/** Clears the ledger for one battle. Used when a battle is re-run. */
export async function resetVotes(id) {
  await ensureArenaSchema();
  await execute({ sql: 'DELETE FROM arena.votes WHERE battle_id = ?', args: [id] });
  return { ok: true, battle: await getBattle(id) };
}

/**
 * Casts a vote, or reports the one already cast.
 *
 * The whole check-and-insert runs in one transaction against a row-locked
 * battle, so the deadline that is read is the deadline that applies and two
 * simultaneous clicks from the same browser cannot both land. Coming back after
 * voting is not an error -- it returns the same battle with the same choice,
 * which is exactly what the page needs to render.
 */
export async function castVote({ battleId, side, voterKey, ipHash, userAgent }) {
  await ensureArenaSchema();

  if (!SIDES.includes(side)) return { ok: false, error: 'invalid_side', status: 400 };
  // The same shape the router accepts in the header, applied again here because
  // this function is also reachable with a key taken from the request body.
  if (!VOTER_KEY.test(String(voterKey ?? ''))) {
    return { ok: false, error: 'invalid_voter', status: 400 };
  }

  const outcome = await withTransaction(async (tx) => {
    const found = await tx.execute({
      sql: 'SELECT id, closes_at, published FROM arena.battles WHERE id = ? OR slug = ? FOR UPDATE',
      args: [battleId, battleId],
    });
    if (found.rows.length === 0) return { ok: false, error: 'not_found', status: 404 };

    const row = found.rows[0];
    const id = String(row.id);
    const published = row.published === true || row.published === 't' || row.published === 1;
    if (!published) return { ok: false, error: 'not_found', status: 404 };
    if (Date.parse(String(row.closes_at)) <= Date.now()) {
      return { ok: false, error: 'voting_closed', status: 409, id };
    }

    const mine = await tx.execute({
      sql: 'SELECT side FROM arena.votes WHERE battle_id = ? AND voter_key = ?',
      args: [id, voterKey],
    });
    if (mine.rows.length > 0) {
      return { ok: true, id, side: String(mine.rows[0].side), repeat: true };
    }

    if (ipHash) {
      const fromIp = await tx.execute({
        sql: 'SELECT COUNT(*) AS n FROM arena.votes WHERE battle_id = ? AND ip_hash = ?',
        args: [id, ipHash],
      });
      if (Number(fromIp.rows[0]?.n ?? 0) >= VOTES_PER_IP) {
        return { ok: false, error: 'already_voted', status: 429, id };
      }
    }

    await tx.execute({
      sql: `INSERT INTO arena.votes (id, battle_id, side, voter_key, ip_hash, user_agent, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [newId(), id, side, voterKey, ipHash, userAgent ? userAgent.slice(0, 300) : null, nowIso()],
    });

    return { ok: true, id, side, repeat: false };
  });

  if (!outcome.ok) {
    const battle = outcome.id ? await getBattle(outcome.id, voterKey) : null;
    return { ...outcome, battle };
  }

  return { ok: true, repeat: outcome.repeat, battle: await getBattle(outcome.id, voterKey) };
}
