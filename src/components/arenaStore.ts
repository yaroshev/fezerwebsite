import React from 'react';
import {
  bootstrapFeed,
  castVote,
  fetchBattles,
  VOTE_ERRORS,
  type ArenaBattle,
  type ArenaFeed,
  type ArenaSide,
} from '../content/arena';
import { trackEvent } from '../seo/constants';

/**
 * One copy of the arena, shared by every surface that shows it.
 *
 * The homepage strip, the callout on an article, the nav dot and the arena page
 * itself can all be on screen at once. Each fetching for itself would mean four
 * requests for one answer and four versions of the truth the moment somebody
 * votes -- so the feed lives here, is fetched once, and every subscriber is told
 * when it changes.
 */

type Snapshot = {
  feed: ArenaFeed | null;
  /** False until the first live answer arrives; a build-time snapshot is not one. */
  loaded: boolean;
};

const EMPTY: ArenaFeed = { live: [], closed: [] };

let snapshot: Snapshot = { feed: bootstrapFeed(), loaded: false };
const listeners = new Set<() => void>();
let inflight: Promise<void> | null = null;
let loadedAt = 0;

/** How long a fetched feed is considered current enough to reuse. */
const FRESH_MS = 15_000;

function emit() {
  for (const listener of listeners) listener();
}

function publish(next: Snapshot) {
  snapshot = next;
  emit();
}

export function refreshArena(force = false): Promise<void> {
  if (inflight) return inflight;
  if (!force && snapshot.loaded && Date.now() - loadedAt < FRESH_MS) return Promise.resolve();

  inflight = fetchBattles()
    .then((feed) => {
      loadedAt = Date.now();
      // An unreachable API keeps whatever was baked in rather than blanking the
      // page: a stale matchup reads better than a hole where one was.
      publish({ feed: feed ?? snapshot.feed ?? EMPTY, loaded: true });
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

function replaceBattle(next: ArenaBattle) {
  const feed = snapshot.feed ?? EMPTY;
  const swap = (list: ArenaBattle[]) => list.map((item) => (item.id === next.id ? next : item));
  publish({ ...snapshot, feed: { live: swap(feed.live), closed: swap(feed.closed) } });
}

export function useArenaFeed() {
  const [state, setState] = React.useState(snapshot);

  React.useEffect(() => {
    const listener = () => setState(snapshot);
    listeners.add(listener);
    listener();
    refreshArena();
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return state;
}

/** Every battle currently open, soonest deadline first. */
export function useLiveBattles() {
  const { feed, loaded } = useArenaFeed();
  return { battles: feed?.live ?? [], loaded };
}

/**
 * The battle a single-slot surface shows.
 *
 * The first one this visitor has not answered -- asking again for a vote they
 * have already cast is the fastest way to make the whole thing feel fake. Once
 * they have voted in all of them, the first still stands as the state of play.
 */
export function useLiveBattle() {
  const { feed, loaded } = useArenaFeed();
  const live = feed?.live ?? [];
  const battle = live.find((entry) => !entry.myVote) ?? live[0] ?? null;
  return { battle, loaded, hasClosed: (feed?.closed.length ?? 0) > 0 };
}

/**
 * Voting, with the busy and error state a button needs.
 *
 * `source` is only for analytics -- it says which surface the vote came from, so
 * the homepage strip and the arena page can be told apart.
 */
export function useArenaVote(source: string) {
  const [busy, setBusy] = React.useState<ArenaSide | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const submit = React.useCallback(
    async (battle: ArenaBattle, side: ArenaSide) => {
      setBusy(side);
      setError(null);

      const result = await castVote(battle.id, side);

      if (result.ok) {
        trackEvent('arena_vote', { battle: battle.slug, side, source });
        replaceBattle(result.battle);
      } else {
        setError(VOTE_ERRORS[result.error] ?? VOTE_ERRORS.server_error);
        // A rejection usually means our copy is out of date; take theirs.
        if (result.battle) replaceBattle(result.battle);
        if (result.error === 'voting_closed' || result.error === 'not_found') refreshArena(true);
      }

      setBusy(null);
      return result;
    },
    [source]
  );

  return { busy, error, submit, clearError: React.useCallback(() => setError(null), []) };
}

/**
 * A page-wide clock, in whole seconds.
 *
 * Null on the first render on both the server and the client: every page here is
 * prerendered, and a countdown computed during render would bake one instant
 * into the HTML and then disagree with the browser on hydration.
 */
export function useNow(active: boolean) {
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [active]);

  return now;
}
