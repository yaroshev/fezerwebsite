import React from 'react';
import { Download, Loader2, RefreshCw, Send } from 'lucide-react';
import Nav from '../components/Nav';

/**
 * Operator view for the Fezer Plus promo. Noindex, and useless without the
 * admin token -- the token lives in localStorage on whichever machine you use
 * and every request carries it as a bearer header.
 */
const TOKEN_KEY = 'fezer-promo-admin-token';

type Claim = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  platform: 'ios' | 'android';
  code: string;
  emailStatus: string;
  emailError: string | null;
  openedAt: string | null;
  openCount: number;
  activatedAt: string | null;
  activationSource: string | null;
};

type Summary = {
  pool: {
    total: number;
    remaining: number;
    claimed: number;
    platforms: Record<string, { total: number; remaining: number; claimed: number }>;
  };
  funnel: Record<
    string,
    { claims: number; sent: number; failed: number; opened: number; activated: number }
  >;
};

const PLATFORM_NAME: Record<string, string> = { ios: 'iOS', android: 'Android' };

function shortDate(value: string | null) {
  if (!value) return '—';
  return new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function Metric({ label, value, tone }: { label: string; value: React.ReactNode; tone?: 'muted' | 'warn' }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-3.5 py-3 dark:border-neutral-800 dark:bg-neutral-900">
      <div
        className={`text-xl font-semibold tabular-nums tracking-tight ${
          tone === 'warn'
            ? 'text-red-600 dark:text-red-400'
            : tone === 'muted'
              ? 'text-neutral-500'
              : 'text-neutral-900 dark:text-neutral-100'
        }`}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500">
        {label}
      </div>
    </div>
  );
}

export default function PromoAdmin() {
  const [token, setToken] = React.useState('');
  const [authed, setAuthed] = React.useState(false);
  const [summary, setSummary] = React.useState<Summary | null>(null);
  const [claims, setClaims] = React.useState<Claim[]>([]);
  const [matched, setMatched] = React.useState(0);
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [activationInput, setActivationInput] = React.useState('');

  // The token is passed in rather than read from state, so the same helper works
  // for the remembered token on boot and for one typed in by hand.
  const api = React.useCallback(
    async (authToken: string, path: string, init: RequestInit = {}) => {
      const response = await fetch(`/api/admin/${path}`, {
        ...init,
        headers: { authorization: `Bearer ${authToken}`, ...(init.headers ?? {}) },
      });
      if (response.status === 401) throw new Error('unauthorized');
      return response;
    },
    []
  );

  const load = React.useCallback(
    async (authToken: string, search: string) => {
      if (!authToken) return;
      setBusy(true);
      try {
        const [summaryResponse, claimsResponse] = await Promise.all([
          api(authToken, 'summary'),
          api(authToken, `claims?limit=500${search ? `&q=${encodeURIComponent(search)}` : ''}`),
        ]);
        const summaryData = await summaryResponse.json();
        const claimsData = await claimsResponse.json();
        setSummary({ pool: summaryData.pool, funnel: summaryData.funnel });
        setClaims(claimsData.claims ?? []);
        setMatched(claimsData.matched ?? 0);
        setAuthed(true);
        setStatus(null);
        try {
          window.localStorage.setItem(TOKEN_KEY, authToken);
        } catch {
          // Session-only access is fine.
        }
      } catch (error) {
        setAuthed(false);
        setStatus(
          (error as Error).message === 'unauthorized'
            ? 'That token was not accepted.'
            : 'Could not reach the promo API.'
        );
      } finally {
        setBusy(false);
      }
    },
    [api]
  );

  const refresh = React.useCallback(
    (search = query) => load(token, search),
    [load, query, token]
  );

  // A remembered token opens the dashboard straight away. Typing one does not
  // trigger anything until the form is submitted -- otherwise the first
  // keystroke would fire a request and flash "token not accepted".
  const booted = React.useRef(false);
  React.useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    let saved = '';
    try {
      saved = window.localStorage.getItem(TOKEN_KEY) ?? '';
    } catch {
      // No stored token; the operator types it in.
    }
    if (saved) {
      setToken(saved);
      load(saved, '');
    }
  }, [load]);

  async function importActivations() {
    if (!activationInput.trim()) return;
    setBusy(true);
    try {
      const response = await api(token, 'activations?source=store-export', {
        method: 'POST',
        headers: { 'content-type': 'text/plain' },
        body: activationInput,
      });
      const data = await response.json();
      setStatus(
        `Scanned ${data.scanned} codes: ${data.matched} matched, ${data.newlyActivated} newly marked activated` +
          (data.unknown?.length ? `, ${data.unknown.length} not issued by us` : '')
      );
      setActivationInput('');
      await refresh();
    } catch {
      setStatus('Import failed.');
    } finally {
      setBusy(false);
    }
  }

  async function resend(claim: Claim) {
    setBusy(true);
    try {
      const response = await api(token, 'resend', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ claim: claim.id }),
      });
      const data = await response.json();
      setStatus(data.ok ? `Re-sent to ${data.email}` : `Resend failed: ${data.error}`);
      await refresh();
    } catch {
      setStatus('Resend failed.');
    } finally {
      setBusy(false);
    }
  }

  /**
   * Fetched rather than opened in a new tab, so the admin token travels in a
   * header instead of a URL that would be kept in history and server logs.
   */
  async function downloadCsv() {
    setBusy(true);
    try {
      const response = await api(token, 'claims?format=csv&limit=5000');
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement('a');
      link.href = url;
      link.download = `fezer-plus-promo-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setStatus('Could not download the CSV.');
    } finally {
      setBusy(false);
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950">
        <Nav variant="minimal" />
        <div className="mx-auto max-w-sm px-4 py-20">
          <h1 className="text-xl font-semibold tracking-tight">Promo dashboard</h1>
          <p className="mt-2 text-sm text-neutral-500">Paste the PROMO_ADMIN_TOKEN.</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              load(token, '');
            }}
            className="mt-4"
          >
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Admin token"
              className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-base outline-none focus:border-[#0d2b57] dark:border-neutral-700 dark:bg-neutral-900"
            />
            <button
              type="submit"
              disabled={busy}
              className="mt-3 w-full rounded-full bg-[#0d2b57] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy ? 'Checking…' : 'Open dashboard'}
            </button>
          </form>
          {status && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{status}</p>}
        </div>
      </div>
    );
  }

  const platforms = ['ios', 'android'] as const;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950">
      <Nav variant="minimal" />

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Fezer Plus promo</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => refresh()}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-2 text-sm font-medium disabled:opacity-60 dark:border-neutral-700"
            >
              {busy ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              Refresh
            </button>
            <button
              type="button"
              onClick={downloadCsv}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0d2b57] px-3.5 py-2 text-sm font-semibold text-white"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              CSV
            </button>
          </div>
        </div>

        {status && (
          <p className="mt-3 rounded-xl bg-[#0d2b57]/6 px-3.5 py-2.5 text-sm text-[#0d2b57] dark:bg-blue-300/10 dark:text-blue-200">
            {status}
          </p>
        )}

        {summary && (
          <>
            <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Metric label="Codes left" value={summary.pool.remaining.toLocaleString()} />
              <Metric label="Claimed" value={summary.pool.claimed.toLocaleString()} />
              <Metric label="Pool size" value={summary.pool.total.toLocaleString()} tone="muted" />
            </section>

            <section className="mt-4 grid gap-4 sm:grid-cols-2">
              {platforms.map((platform) => {
                const pool = summary.pool.platforms[platform] ?? { total: 0, remaining: 0, claimed: 0 };
                const funnel =
                  summary.funnel[platform] ?? { claims: 0, sent: 0, failed: 0, opened: 0, activated: 0 };
                return (
                  <div
                    key={platform}
                    className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <h2 className="text-sm font-semibold tracking-tight">{PLATFORM_NAME[platform]}</h2>
                    <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-[#0d2b57] dark:text-blue-300">
                      {pool.remaining.toLocaleString()}
                      <span className="ml-1.5 text-sm font-medium text-neutral-500">
                        of {pool.total.toLocaleString()} left
                      </span>
                    </p>
                    <dl className="mt-3 grid grid-cols-4 gap-2 text-center">
                      {[
                        ['Sent', funnel.sent],
                        ['Failed', funnel.failed],
                        ['Opened', funnel.opened],
                        ['Activated', funnel.activated],
                      ].map(([label, value]) => (
                        <div key={label as string} className="rounded-lg bg-neutral-50 py-2 dark:bg-neutral-950">
                          <dt className="text-[10px] uppercase tracking-[0.1em] text-neutral-500">{label}</dt>
                          <dd className="text-base font-semibold tabular-nums">{value as number}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                );
              })}
            </section>
          </>
        )}

        <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-sm font-semibold tracking-tight">Mark codes as activated</h2>
          <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">
            Neither store notifies us per code, so redemption comes from their reports: App Store
            Connect → Users and Access → Offer Codes, and Play Console → Promotions. Paste or drop the
            export in here — every code we issued that appears in it gets stamped activated.
          </p>
          <textarea
            value={activationInput}
            onChange={(event) => setActivationInput(event.target.value)}
            rows={4}
            placeholder="Paste the redeemed-codes export (CSV or one code per line)"
            className="mt-3 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 font-mono text-xs outline-none focus:border-[#0d2b57] dark:border-neutral-700 dark:bg-neutral-950"
          />
          <button
            type="button"
            onClick={importActivations}
            disabled={busy || !activationInput.trim()}
            className="mt-2 rounded-full bg-[#0d2b57] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Import activations
          </button>
        </section>

        <section className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold tracking-tight">
              Claims <span className="font-normal text-neutral-500">({matched.toLocaleString()})</span>
            </h2>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && refresh(query)}
              placeholder="Search name, email or code"
              className="w-56 rounded-full border border-neutral-300 bg-white px-3.5 py-1.5 text-sm outline-none focus:border-[#0d2b57] dark:border-neutral-700 dark:bg-neutral-900"
            />
          </div>

          <div className="mt-3 overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full min-w-[820px] border-collapse bg-white text-sm dark:bg-neutral-900">
              <thead>
                <tr className="border-b border-neutral-200 text-left text-[11px] uppercase tracking-[0.1em] text-neutral-500 dark:border-neutral-800">
                  <th className="px-3 py-2 font-medium">Claimed</th>
                  <th className="px-3 py-2 font-medium">Person</th>
                  <th className="px-3 py-2 font-medium">Platform</th>
                  <th className="px-3 py-2 font-medium">Code</th>
                  <th className="px-3 py-2 font-medium">Email</th>
                  <th className="px-3 py-2 font-medium">Opened</th>
                  <th className="px-3 py-2 font-medium">Activated</th>
                  <th className="px-3 py-2 font-medium" />
                </tr>
              </thead>
              <tbody>
                {claims.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-8 text-center text-neutral-500">
                      No claims yet.
                    </td>
                  </tr>
                )}
                {claims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="border-b border-neutral-100 last:border-0 dark:border-neutral-800"
                  >
                    <td className="whitespace-nowrap px-3 py-2 text-neutral-500">
                      {shortDate(claim.createdAt)}
                    </td>
                    <td className="px-3 py-2">
                      <div className="font-medium">{claim.name}</div>
                      <div className="text-xs text-neutral-500">{claim.email}</div>
                    </td>
                    <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                      {PLATFORM_NAME[claim.platform]}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 font-mono text-xs">{claim.code}</td>
                    <td className="px-3 py-2">
                      <span
                        title={claim.emailError ?? undefined}
                        className={
                          claim.emailStatus === 'sent'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : claim.emailStatus === 'failed'
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-neutral-500'
                        }
                      >
                        {claim.emailStatus}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-neutral-500">
                      {claim.openedAt ? `${shortDate(claim.openedAt)} (${claim.openCount})` : '—'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2">
                      {claim.activatedAt ? (
                        <span className="text-emerald-600 dark:text-emerald-400">
                          {shortDate(claim.activatedAt)}
                        </span>
                      ) : (
                        <span className="text-neutral-400">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => resend(claim)}
                        disabled={busy}
                        title="Re-send this person the same code"
                        className="inline-flex items-center gap-1 rounded-full border border-neutral-300 px-2.5 py-1 text-xs font-medium disabled:opacity-50 dark:border-neutral-700"
                      >
                        <Send className="h-3 w-3" aria-hidden="true" />
                        Resend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
