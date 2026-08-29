# Fezer Plus free-month promo

A toast on every page, a claim page at `/plus-free`, one-time store codes emailed
through Resend, and a ledger at `/promo-admin` that says who got which code and
whether it was used.

## How a claim works

1. The toast appears below the nav on every page except the promo pages. It
   shows the live remaining count and hides itself entirely when the pool is
   empty or the visitor dismissed it.
2. `/plus-free` asks for name, email and platform, showing how many codes are
   left in total and per platform. Those numbers are counted in the database on
   each request, so they are real.
3. `POST /api/promo/claim` takes one code out of the pool and writes the claim in
   a single write transaction, then emails the code.
4. The email's redeem button points at `/r/<token>` on fezer.app, which records
   the click and redirects to the store's own redeem URL.

**One code per email.** Deduplication uses a normalized key: lowercased, `+tags`
stripped, and dots removed for Gmail. `j.o.e+2@gmail.com` and `joe@gmail.com` are
one person and get one code. Coming back with the same address returns the same
code rather than burning another.

## Local development

```bash
cp .env.example .env
npm run promo:secrets       # writes DATABASE_URL and RESEND_API_KEY, without echoing them
npm run promo:import ios     "~/Desktop/Apple OfferCodeOneTimeUseCodes_573950.csv"
npm run promo:import android "~/Desktop/android promotion_codes.csv"
npm run dev
```

The API runs inside the Vite dev server, so `npm run dev` is the whole stack:
`http://localhost:5173/plus-free` and `http://localhost:5173/promo-admin`.

Local and production talk to the *same* Supabase database. There is no second
copy to drift out of sync, and it means a claim made on localhost really does
take a code out of the pool -- delete the row from `promo.claims` and clear
`claimed_at` on the code if you want it back.

With `RESEND_API_KEY` empty, nothing is actually mailed -- each message is
written to `.data/outbox/` and its code logged, so the full flow including the
tracked redirect can be exercised without sending anything. Set
`PROMO_EMAIL_TRANSPORT=console` to force that even with a key present.

`.data/` and `.env` are gitignored.

## The database

Supabase Postgres, the "Fezer Website" project. Three tables, all in their own
`promo` schema:

- `promo.codes` -- the pool. One row per store code, `claimed_at` set when it
  goes out.
- `promo.claims` -- the ledger. One row per person: who, which code, whether the
  email sent, whether the link was clicked, whether the code was redeemed.
- `promo.rate_limit` -- a fixed-window counter per hashed IP.

The schema is not `public` on purpose. Supabase publishes `public` through
PostgREST to anyone holding the anon key, and a table of unissued one-time codes
plus a list of names and email addresses has no business being reachable that
way. PostgREST only serves the schemas it is configured for and `promo` is not
one of them, so this connection is the only route in. `ensureSchema()` also
revokes the `anon` and `authenticated` roles from the schema, in case that ever
changes.

Connections go through the **transaction pooler** on port 6543, not a direct
connection. Serverless functions open and drop connections constantly; the
pooler is what makes that survivable, and it is why `prepare: false` is set --
transaction pooling gives a backend connection to a transaction rather than to a
client, so prepared statements cannot be cached between calls.

Handing out one-time codes needs a real transaction, and Postgres does not
serialize writers the way SQLite does, so the pool read takes its own lock:

```sql
UPDATE promo.codes SET claimed_at = $1, claim_id = $2
 WHERE code = (SELECT code FROM promo.codes
                WHERE platform = $3 AND claimed_at IS NULL
                ORDER BY seq LIMIT 1 FOR UPDATE SKIP LOCKED)
RETURNING code, redeem_url
```

`SKIP LOCKED` is the load-bearing part. Without it a second simultaneous claim
blocks on the same row, then finds it taken and reports "sold out" with a
thousand codes still sitting in the pool.

## Going live

**1. Environment variables in Netlify** (Site configuration -> Environment
variables), matching `.env.example`:

`DATABASE_URL`, `RESEND_API_KEY`, `PROMO_EMAIL_FROM`, `PROMO_EMAIL_REPLY_TO`,
`PROMO_ADMIN_TOKEN`, `PROMO_SITE_URL=https://fezer.app`, `PROMO_IP_SALT`.

The whole set can be pushed from the local file in one go:

```bash
netlify env:import .env
netlify env:set PROMO_SITE_URL https://fezer.app
```

**2. The sending domain.** fezer.app is verified in Resend, with its own DKIM
and SPF records sitting alongside the Google Workspace MX records -- Workspace
receives mail, Resend sends this campaign. `PROMO_EMAIL_FROM` must be an address
on that domain.

**3. Deploy, then check** `https://fezer.app/api/promo/stats` returns the real
pool before pointing anyone at the campaign.

## Watching it run

`https://fezer.app/promo-admin` with the admin token: remaining per platform,
sent / failed / opened / activated, the full claim list, per-person resend, and
a CSV export.

From a terminal:

```bash
npm run promo:stats            # counts
npm run promo:stats -- --claims  # plus recent claims
npm run promo:stats -- --csv     # the whole ledger as CSV
```

## Knowing whether a code was actually used

Two different signals, and they mean different things:

- **Opened** is a click on the redeem link in the email. It is recorded
  automatically and is a good proxy, but it is not proof of redemption.
- **Activated** is the real thing, and neither store pushes it per code. Apple's
  App Store Server Notifications say an offer was redeemed but not *which*
  one-time code; Play is no better in real time. The ground truth arrives as a
  periodic export: App Store Connect → Users and Access → Offer Codes, and Play
  Console → Promotions. Paste that export into "Mark codes as activated" on the
  dashboard and every code we issued that appears in it gets stamped, with a
  count of anything in the file we did not issue.

## Turning it off

Set `PROMO_ACTIVE = false` in `src/content/promo.ts` and rebuild -- the toast
stops appearing. `/plus-free` keeps working and shows the sold-out state once the
pool empties on its own. To pull a whole platform without touching its codes, set
`enabled: false` for it in the same file.
