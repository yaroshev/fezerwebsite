import React from 'react';
import { Gift, LogOut, Swords } from 'lucide-react';
import Nav from '../components/Nav';
import PromoPanel from './admin/PromoPanel';
import ArenaPanel from './admin/ArenaPanel';
import { TAB_KEY, TOKEN_KEY, createApi } from './admin/shared';

/**
 * The operator dashboard. Noindex, and useless without the admin token -- the
 * token lives in localStorage on whichever machine you use and every request
 * carries it as a bearer header.
 *
 * One gate, several tabs: the promo campaign and the Feature Arena are different
 * jobs but the same job to get into, and adding a third tab is a panel plus an
 * entry in TABS.
 */

type TabId = 'promo' | 'arena';

const TABS: { id: TabId; label: string; icon: typeof Gift }[] = [
  { id: 'promo', label: 'Plus promo', icon: Gift },
  { id: 'arena', label: 'Feature Arena', icon: Swords },
];

export default function AdminPage() {
  const [token, setToken] = React.useState('');
  const [authed, setAuthed] = React.useState(false);
  const [checking, setChecking] = React.useState(false);
  const [status, setStatus] = React.useState<string | null>(null);
  const [tab, setTab] = React.useState<TabId>('promo');

  const api = React.useMemo(() => createApi(token), [token]);

  /** One cheap authenticated call decides whether the dashboard opens. */
  const signIn = React.useCallback(async (candidate: string) => {
    if (!candidate) return;
    setChecking(true);
    try {
      const response = await fetch('/api/admin/summary', {
        headers: { authorization: `Bearer ${candidate}` },
      });
      if (response.status === 401) {
        setAuthed(false);
        setStatus('That token was not accepted.');
        return;
      }
      if (!response.ok) throw new Error('unreachable');
      setToken(candidate);
      setAuthed(true);
      setStatus(null);
      try {
        window.localStorage.setItem(TOKEN_KEY, candidate);
      } catch {
        // Session-only access is fine.
      }
    } catch {
      setAuthed(false);
      setStatus('Could not reach the admin API.');
    } finally {
      setChecking(false);
    }
  }, []);

  // A remembered token opens the dashboard straight away. Typing one does not
  // trigger anything until the form is submitted -- otherwise the first
  // keystroke would fire a request and flash "token not accepted".
  const booted = React.useRef(false);
  React.useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    try {
      const savedTab = window.localStorage.getItem(TAB_KEY);
      if (savedTab === 'promo' || savedTab === 'arena') setTab(savedTab);
    } catch {
      // Default tab is fine.
    }

    let saved = '';
    try {
      saved = window.localStorage.getItem(TOKEN_KEY) ?? '';
    } catch {
      // No stored token; the operator types it in.
    }
    if (saved) {
      setToken(saved);
      signIn(saved);
    }
  }, [signIn]);

  const selectTab = React.useCallback((next: TabId) => {
    setTab(next);
    setStatus(null);
    try {
      window.localStorage.setItem(TAB_KEY, next);
    } catch {
      // Not remembering the tab is not worth an error.
    }
  }, []);

  const signOut = React.useCallback(() => {
    try {
      window.localStorage.removeItem(TOKEN_KEY);
    } catch {
      // Nothing stored to clear.
    }
    setToken('');
    setAuthed(false);
    setStatus(null);
  }, []);

  // The remembered token is wrong now, so forget it -- otherwise the next page
  // load signs in with it automatically and fails again.
  const onUnauthorized = React.useCallback(() => {
    try {
      window.localStorage.removeItem(TOKEN_KEY);
    } catch {
      // Nothing stored to clear.
    }
    setAuthed(false);
    setStatus('That token is no longer accepted. Sign in again.');
  }, []);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950">
        <Nav variant="minimal" />
        <div className="mx-auto max-w-sm px-4 py-20">
          <h1 className="text-xl font-semibold tracking-tight">Fezer admin</h1>
          <p className="mt-2 text-sm text-neutral-500">Paste the PROMO_ADMIN_TOKEN.</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              signIn(token);
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
              disabled={checking}
              className="mt-3 w-full rounded-full bg-[#0d2b57] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {checking ? 'Checking…' : 'Open dashboard'}
            </button>
          </form>
          {status && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{status}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950">
      <Nav variant="minimal" />

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Fezer admin</h1>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-2 text-sm font-medium transition-colors hover:bg-white dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            Sign out
          </button>
        </div>

        <div
          role="tablist"
          aria-label="Admin sections"
          className="mt-5 inline-flex gap-1 rounded-full border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900"
        >
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => selectTab(id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === id
                  ? 'bg-[#0d2b57] text-white dark:bg-blue-300 dark:text-neutral-950'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {status && (
          <p className="mt-4 rounded-xl bg-[#0d2b57]/6 px-3.5 py-2.5 text-sm text-[#0d2b57] dark:bg-blue-300/10 dark:text-blue-200">
            {status}
          </p>
        )}

        <div className="mt-6">
          {tab === 'promo' ? (
            <PromoPanel api={api} onStatus={setStatus} onUnauthorized={onUnauthorized} />
          ) : (
            <ArenaPanel api={api} onStatus={setStatus} onUnauthorized={onUnauthorized} />
          )}
        </div>
      </div>
    </div>
  );
}
