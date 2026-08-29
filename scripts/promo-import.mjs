#!/usr/bin/env node
// Loads store promo codes into the pool.
//
//   node scripts/promo-import.mjs ios     "~/Desktop/Apple OfferCodeOneTimeUseCodes_573950.csv"
//   node scripts/promo-import.mjs android "~/Desktop/android promotion_codes.csv"
//
// Re-running is safe: codes already in the table are skipped, so a top-up file
// can be imported without disturbing anything already handed out.
import fs from 'node:fs';
import path from 'node:path';
import { db, ensureSchema, execute } from '../server/db.mjs';

const APP_STORE_ID = process.env.PROMO_APP_STORE_ID || '6790143164';

function usage(message) {
  console.error(`${message}\n\nUsage: node scripts/promo-import.mjs <ios|android> <file.csv> [batch-label]`);
  process.exit(1);
}

const [platform, fileArg, batchArg] = process.argv.slice(2);
if (platform !== 'ios' && platform !== 'android') usage('First argument must be "ios" or "android".');
if (!fileArg) usage('Second argument must be the CSV path.');

const file = path.resolve(fileArg.replace(/^~/, process.env.HOME ?? '~'));
if (!fs.existsSync(file)) usage(`No such file: ${file}`);

const batch = batchArg || path.basename(file);

/**
 * Apple exports `CODE,https://apps.apple.com/redeem?...` with no header; Play
 * exports a single "Promotion code" column. Both are handled by taking the
 * first field of each line and ignoring anything that is not a code.
 */
function parse(text) {
  const rows = [];
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    const [first, second] = line.split(',');
    const code = (first ?? '').trim().replace(/^"|"$/g, '').toUpperCase();
    if (!/^[A-Z0-9]{8,32}$/.test(code)) continue; // header rows and stray text

    const url = (second ?? '').trim().replace(/^"|"$/g, '');
    rows.push({
      code,
      redeemUrl:
        url ||
        (platform === 'ios'
          ? `https://apps.apple.com/redeem?ctx=offercodes&id=${APP_STORE_ID}&code=${code}`
          : `https://play.google.com/redeem?code=${code}`),
    });
  }
  return rows;
}

const codes = parse(fs.readFileSync(file, 'utf8'));
if (codes.length === 0) usage('No codes found in that file.');

await ensureSchema();
const importedAt = new Date().toISOString();

// Continue numbering after whatever is already in the pool, so a top-up import
// queues behind the codes that are already waiting.
const highest = await execute({
  sql: 'SELECT COALESCE(MAX(seq), 0) AS top FROM promo.codes WHERE platform = ?',
  args: [platform],
});
const seqBase = Number(highest.rows[0].top) + 1;

// One multi-row INSERT per chunk rather than one statement per code: 1000
// round trips to a hosted database is a slow import, one is not. 500 rows is
// 3000 bind parameters, comfortably inside Postgres' limit.
let inserted = 0;
for (let i = 0; i < codes.length; i += 500) {
  const chunk = codes.slice(i, i + 500);
  const values = chunk.map(() => '(?, ?, ?, ?, ?, ?)').join(', ');
  const args = chunk.flatMap(({ code, redeemUrl }, offset) => [
    code,
    platform,
    redeemUrl,
    seqBase + i + offset,
    batch,
    importedAt,
  ]);

  const result = await execute({
    sql: `INSERT INTO promo.codes (code, platform, redeem_url, seq, batch, imported_at)
          VALUES ${values} ON CONFLICT (code) DO NOTHING`,
    args,
  });
  inserted += Number(result.rowsAffected ?? 0);
}

const totals = await execute({
  sql: `SELECT COUNT(*) AS total, SUM(CASE WHEN claimed_at IS NULL THEN 1 ELSE 0 END) AS remaining
          FROM promo.codes WHERE platform = ?`,
  args: [platform],
});

const { total, remaining } = totals.rows[0];
console.log(`Read ${codes.length} codes from ${path.basename(file)}`);
console.log(`Inserted ${inserted} new, skipped ${codes.length - inserted} already present`);
console.log(`Pool for ${platform}: ${remaining} available of ${total}`);

await db().end();
