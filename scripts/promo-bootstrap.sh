#!/usr/bin/env bash
# One-time setup for the Fezer Plus promo, run from your own shell.
#
#   bash scripts/promo-bootstrap.sh
#
# Two things have to happen from a machine with a direct network path: loading
# the code pool into Supabase (Postgres speaks its own protocol on port 6543,
# which sandboxed shells cannot open) and handing the environment to Netlify.
# Run `npm run promo:secrets` first so .env has DATABASE_URL and RESEND_API_KEY.
set -euo pipefail

cd "$(dirname "$0")/.."

if ! grep -q '^DATABASE_URL=.\+' .env 2>/dev/null; then
  echo "DATABASE_URL is empty in .env -- run 'npm run promo:secrets' first." >&2
  exit 1
fi

IOS_CSV="${IOS_CSV:-$HOME/Desktop/Apple OfferCodeOneTimeUseCodes_573950.csv}"
ANDROID_CSV="${ANDROID_CSV:-$HOME/Desktop/android promotion_codes.csv}"

echo
echo "==> Importing the code pool into Supabase"
npm run --silent promo:import ios     "$IOS_CSV"
npm run --silent promo:import android "$ANDROID_CSV"

echo
echo "==> Pushing the environment to Netlify"
# Values move straight from .env into Netlify; none of them are echoed or land
# in shell history.
npx --yes netlify-cli@latest link --name fezer
npx --yes netlify-cli@latest env:import .env
npx --yes netlify-cli@latest env:set PROMO_SITE_URL https://fezer.app

echo
echo "==> Environment now set on Netlify:"
npx --yes netlify-cli@latest env:list --plain | cut -d= -f1

echo
echo "Done. The pool is loaded and Netlify has the configuration."
