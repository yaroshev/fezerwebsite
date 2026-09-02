/**
 * Bits every admin tab needs.
 *
 * The dashboard is one token-gated page with tabs; each tab is a panel that gets
 * a ready-made `api` and does its own loading. Nothing here renders, so the
 * panels can import it without dragging components across files.
 */

/**
 * Unchanged from when this was the promo-only dashboard, so a token already
 * remembered on an operator's machine keeps working after the refactor.
 */
export const TOKEN_KEY = 'fezer-promo-admin-token';
export const TAB_KEY = 'fezer-admin-tab';

export class Unauthorized extends Error {
  constructor() {
    super('unauthorized');
    this.name = 'Unauthorized';
  }
}

export type AdminApi = (path: string, init?: RequestInit) => Promise<Response>;

/**
 * Every admin request carries the token as a bearer header -- never in the URL,
 * where it would be kept in browser history and server access logs.
 */
export function createApi(token: string): AdminApi {
  return async (path, init = {}) => {
    const response = await fetch(`/api/admin/${path}`, {
      ...init,
      headers: { authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
    });
    if (response.status === 401) throw new Unauthorized();
    return response;
  };
}

export async function readJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function shortDate(value: string | null) {
  if (!value) return 'not yet';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'not yet';
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** `<input type="datetime-local">` wants local wall-clock time, not an offset. */
export function toLocalInput(iso: string | null) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

export function fromLocalInput(value: string) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

export const FIELD =
  'w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-[#0d2b57] dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-blue-300';

export const LABEL =
  'block text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500';

export const CARD =
  'rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900';

export const PRIMARY_BUTTON =
  'inline-flex items-center gap-1.5 rounded-full bg-[#0d2b57] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-blue-300 dark:text-neutral-950';

export const GHOST_BUTTON =
  'inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800';
