/**
 * Feature Arena -- two candidate features, one deadline, one vote per visitor.
 *
 * The copy lives here so the page can be reworded without touching the markup,
 * the same way the promo campaign works. Everything else -- which battles are
 * running, what the totals are -- is read live from the API, because a page that
 * hardcoded either would start lying the moment someone voted.
 */

export const ARENA_PATH = '/feature-arena';

export type ArenaSide = 'a' | 'b';

export type ArenaIdea = {
  title: string;
  summary: string;
  detail: string | null;
};

export type ArenaBattle = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  a: ArenaIdea;
  b: ArenaIdea;
  closesAt: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  votes: { a: number; b: number; total: number };
  status: 'draft' | 'live' | 'closed';
  closed: boolean;
  winner: ArenaSide | 'tie' | null;
  myVote: ArenaSide | null;
};

export const ARENA_PAGE = {
  eyebrow: 'Feature Arena',
  h1: 'You decide what we build next',
  intro:
    'Two ideas enter, one gets built. Read both, back the one you want in Fezer, and watch the rope move. When the clock runs out the winner goes into development.',
  emptyTitle: 'No battle running right now',
  emptyBody:
    'The next two contenders are being lined up. Check back soon -- or send us the feature you want to see in the arena.',
  archiveTitle: 'Decided',
  archiveBody: 'Every battle that has already run, and what won it.',
  finePrint: [
    'One vote per visitor per battle. Votes are anonymous -- no account, no email, nothing that identifies you.',
    'A win means the feature goes to the front of the queue, not that the other idea is thrown away.',
  ],
};

export const ARENA_TOAST = {
  headline: 'Two features. One gets built.',
  body: 'Cast your vote before the clock runs out.',
  cta: 'Vote',
  /** Milliseconds after page load before the toast slides in. */
  delayMs: 2600,
  /** Bumping this shows the toast again to people who dismissed the last one. */
  version: 'v1',
};

export const ARENA_TOAST_DISMISS_KEY = `fezer-arena-dismissed-${ARENA_TOAST.version}`;

export const SIDE_STYLE: Record<
  ArenaSide,
  { name: string; text: string; bg: string; softBg: string; ring: string; bar: string }
> = {
  a: {
    name: 'A',
    text: 'text-[#0d2b57] dark:text-blue-300',
    bg: 'bg-[#0d2b57] text-white dark:bg-blue-300 dark:text-neutral-950',
    softBg: 'bg-[#0d2b57]/8 dark:bg-blue-300/10',
    ring: 'border-[#0d2b57] dark:border-blue-300',
    bar: 'bg-[#0d2b57] dark:bg-blue-300',
  },
  b: {
    name: 'B',
    text: 'text-[#0f766e] dark:text-teal-300',
    bg: 'bg-[#0f766e] text-white dark:bg-teal-300 dark:text-neutral-950',
    softBg: 'bg-[#0f766e]/8 dark:bg-teal-300/10',
    ring: 'border-[#0f766e] dark:border-teal-300',
    bar: 'bg-[#0f766e] dark:bg-teal-300',
  },
};

const VOTER_KEY = 'fezer-arena-voter-v1';

/**
 * A stable, anonymous handle for this browser.
 *
 * It is what makes "you already voted" possible without an account. Random and
 * meaningless on its own -- it identifies a browser, not a person -- and if it
 * is cleared, the per-IP ceiling on the server is what remains.
 */
export function voterToken(): string {
  if (typeof window === 'undefined') return '';
  try {
    const existing = window.localStorage.getItem(VOTER_KEY);
    if (existing && /^[A-Za-z0-9_-]{8,100}$/.test(existing)) return existing;
    const fresh =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `v-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    window.localStorage.setItem(VOTER_KEY, fresh);
    return fresh;
  } catch {
    // Private mode with storage blocked: the vote still lands, it just cannot be
    // remembered across reloads on this device.
    return `v-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
  }
}

function voterHeaders(): Record<string, string> {
  const token = voterToken();
  return token ? { 'x-fezer-voter': token } : {};
}

export type ArenaFeed = { live: ArenaBattle[]; closed: ArenaBattle[] };

export async function fetchBattles(signal?: AbortSignal): Promise<ArenaFeed | null> {
  try {
    const response = await fetch('/api/arena/battles', { signal, headers: voterHeaders() });
    if (!response.ok) return null;
    const data = await response.json();
    return data?.ok ? { live: data.live ?? [], closed: data.closed ?? [] } : null;
  } catch {
    return null;
  }
}

export type VoteResult =
  | { ok: true; battle: ArenaBattle; repeat: boolean }
  | { ok: false; error: string; battle: ArenaBattle | null };

export async function castVote(battle: string, side: ArenaSide): Promise<VoteResult> {
  try {
    const response = await fetch('/api/arena/vote', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...voterHeaders() },
      body: JSON.stringify({ battle, side }),
    });
    const data = await response.json();
    if (data?.ok) return { ok: true, battle: data.battle, repeat: Boolean(data.repeat) };
    return { ok: false, error: String(data?.error ?? 'server_error'), battle: data?.battle ?? null };
  } catch {
    return { ok: false, error: 'network', battle: null };
  }
}

export const VOTE_ERRORS: Record<string, string> = {
  voting_closed: 'This battle just closed. The result is in.',
  already_voted: 'A vote from this connection is already counted for this battle.',
  rate_limited: 'That is a lot of votes from one connection. Try again shortly.',
  invalid_side: 'Something went wrong picking that side. Reload and try again.',
  invalid_voter: 'This browser could not be identified for voting. Reload and try again.',
  not_found: 'That battle is no longer running.',
  network: 'Could not reach the arena. Check your connection and try again.',
  server_error: 'Something broke on our side. Try again in a moment.',
};

/** Whole units left until `iso`, or null once it has passed. */
export function timeLeft(iso: string, now: number) {
  const ms = Date.parse(iso) - now;
  if (!Number.isFinite(ms) || ms <= 0) return null;
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
    seconds: Math.floor((ms % 60_000) / 1000),
    ms,
  };
}

export function formatDeadline(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** The share of the bar each side holds. An empty battle sits dead centre. */
export function split(votes: { a: number; b: number; total: number }) {
  if (votes.total === 0) return { a: 50, b: 50, even: true };
  const a = (votes.a / votes.total) * 100;
  return { a, b: 100 - a, even: false };
}

/**
 * The battles baked into the page at build time.
 *
 * `scripts/prerender.mjs` reads the published battles and writes them into every
 * prerendered page, so the first paint shows the real matchup instead of a
 * spinner and a crawler sees the actual features rather than an empty shell. The
 * client still refetches on mount -- this snapshot is only as fresh as the last
 * deploy.
 */
declare global {
  interface Window {
    __FEZER_ARENA__?: ArenaFeed;
  }
  // eslint-disable-next-line no-var
  var __FEZER_ARENA__: ArenaFeed | undefined;
}

export function bootstrapFeed(): ArenaFeed | null {
  const injected = typeof window === 'undefined' ? globalThis.__FEZER_ARENA__ : window.__FEZER_ARENA__;
  if (!injected || !Array.isArray(injected.live) || !Array.isArray(injected.closed)) return null;
  // A snapshot cannot know who is voting, so never let it claim a vote.
  const clean = (battle: ArenaBattle) => ({ ...battle, myVote: null });
  return { live: injected.live.map(clean), closed: injected.closed.map(clean) };
}

/** Deep link to one battle: the page, plus the anchor that battle renders under. */
export function battleUrl(battle: ArenaBattle) {
  const origin = typeof window === 'undefined' ? 'https://fezer.app' : window.location.origin;
  return `${origin}${ARENA_PATH}#${battle.slug}`;
}

/** What someone posts after voting. Names their pick -- that is the hook. */
export function shareLine(battle: ArenaBattle, side: ArenaSide | null) {
  const pick = side ? battle[side].title : null;
  return pick
    ? `I voted for ${pick} in the Fezer Feature Arena. ${battle.a.title} vs ${battle.b.title}. The winner gets built.`
    : `${battle.a.title} vs ${battle.b.title} in the Fezer Feature Arena. The winner gets built.`;
}

export function shareIntentUrl(battle: ArenaBattle, side: ArenaSide | null) {
  const text = encodeURIComponent(shareLine(battle, side));
  const url = encodeURIComponent(battleUrl(battle));
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
}

export type ShareOutcome = 'shared' | 'copied' | 'failed';

/**
 * The share sheet on a phone, the clipboard everywhere else. Both end with the
 * link in someone else's hands, which is the only part that matters.
 */
export async function shareBattle(battle: ArenaBattle, side: ArenaSide | null): Promise<ShareOutcome> {
  const url = battleUrl(battle);
  const text = shareLine(battle, side);

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title: 'Fezer Feature Arena', text, url });
      return 'shared';
    } catch {
      // Cancelled, or the sheet refused -- fall through to the clipboard.
    }
  }

  try {
    await navigator.clipboard.writeText(`${text} ${url}`);
    return 'copied';
  } catch {
    return 'failed';
  }
}
