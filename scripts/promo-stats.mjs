#!/usr/bin/env node
// Terminal view of the promo, for when you do not want to open the dashboard.
//
//   node scripts/promo-stats.mjs            counts only
//   node scripts/promo-stats.mjs --claims   plus the most recent claims
//   node scripts/promo-stats.mjs --csv      the full ledger as CSV on stdout
import { db } from '../server/db.mjs';
import { stats } from '../server/claims.mjs';
import { claimsToCsv, listClaims, summary } from '../server/admin.mjs';

const args = new Set(process.argv.slice(2));

if (args.has('--csv')) {
  const { claims } = await listClaims({ limit: 5000 });
  process.stdout.write(claimsToCsv(claims));
  await db().end();
  process.exit(0);
}

const pool = await stats();
const funnel = await summary();

console.log('\nFezer Plus promo\n');
console.log(`  Codes left        ${pool.remaining} of ${pool.total}`);
console.log(`  Claimed           ${pool.claimed}\n`);

for (const [platform, label] of [['ios', 'iPhone & iPad'], ['android', 'Android    ']]) {
  const p = pool.platforms[platform];
  const f = funnel[platform] ?? { sent: 0, failed: 0, opened: 0, activated: 0 };
  console.log(
    `  ${label}   ${String(p.remaining).padStart(5)} left  ` +
      `| sent ${f.sent}  failed ${f.failed}  opened ${f.opened}  activated ${f.activated}`
  );
}

if (args.has('--claims')) {
  const { claims } = await listClaims({ limit: 25 });
  console.log('\n  Latest claims\n');
  for (const claim of claims) {
    console.log(
      `  ${claim.createdAt.slice(0, 16).replace('T', ' ')}  ${claim.email.padEnd(32)}  ` +
        `${claim.platform.padEnd(8)} ${claim.code.padEnd(24)} ${claim.emailStatus}` +
        `${claim.activatedAt ? '  ACTIVATED' : claim.openedAt ? '  opened' : ''}`
    );
  }
}
console.log('');
await db().end();
