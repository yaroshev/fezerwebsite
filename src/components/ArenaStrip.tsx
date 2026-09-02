import React from 'react';
import { ArrowRight, Check, Loader2, PartyPopper, Share2, Swords } from 'lucide-react';
import ArenaBar from './ArenaBar';
import { CountdownLine } from './ArenaCountdown';
import AppStoreButton from './AppStoreButton';
import BetaAccessButton from './BetaAccessButton';
import { useArenaVote, useLiveBattles, useNow } from './arenaStore';
import { trackEvent } from '../seo/constants';
import { ARENA_PATH, SIDE_STYLE, shareBattle, type ArenaBattle, type ArenaSide } from '../content/arena';

/**
 * The homepage arena.
 *
 * Votes in place, then moves on. Sending someone to another page to answer a
 * two-option question loses most of them, and stopping at "thanks" wastes the
 * one moment they are demonstrably willing to press something -- so a vote is
 * acknowledged, the next battle slides in, and when there is nothing left to
 * vote on the slot turns into the app.
 *
 * Renders nothing when no battle is running, so the homepage never carries a
 * dead slot.
 */

/** How long the thank-you sits before the next battle takes over. */
const ADVANCE_MS = 2400;

function IdeaButton({
  side,
  battle,
  busy,
  onVote,
}: {
  side: ArenaSide;
  battle: ArenaBattle;
  busy: boolean;
  onVote: (side: ArenaSide) => void;
}) {
  const style = SIDE_STYLE[side];
  const mine = battle.myVote === side;

  if (battle.myVote) {
    return (
      <div
        className={`rounded-2xl border p-4 transition-colors ${
          mine ? `${style.ring} ${style.softBg}` : 'border-neutral-200 opacity-70 dark:border-neutral-800'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[15px] font-semibold tracking-tight">{battle[side].title}</h3>
          {mine && (
            <span className={`inline-flex items-center gap-1 text-xs font-semibold ${style.text}`}>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Your pick
            </span>
          )}
        </div>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
          {battle[side].summary}
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onVote(side)}
      disabled={busy}
      className="hover-lift rounded-2xl border border-neutral-200 bg-white p-4 text-left transition-colors hover:border-neutral-300 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[15px] font-semibold tracking-tight">{battle[side].title}</h3>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${style.bg}`}
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : 'Vote'}
        </span>
      </div>
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
        {battle[side].summary}
      </p>
    </button>
  );
}

/** Where the run ends: nothing left to ask, so ask for the install instead. */
function AllDone({ count }: { count: number }) {
  return (
    <div className="rounded-3xl border border-neutral-200/80 bg-[#fafafa] p-6 text-center sm:p-10 dark:border-neutral-800 dark:bg-neutral-900/40">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0d2b57]/8 text-[#0d2b57] dark:bg-blue-300/10 dark:text-blue-300">
        <PartyPopper className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        That is every battle. Thank you.
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        {count === 1
          ? 'Your vote is counted.'
          : `All ${count} of your votes are counted.`}{' '}
        Whatever wins goes into development, and the results land right here when the clocks run
        out. In the meantime, the app itself is free to plan and track.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <AppStoreButton location="arena-strip-complete" />
        <BetaAccessButton location="arena-strip-complete" />
      </div>
      <a
        href={ARENA_PATH}
        onClick={() => trackEvent('arena_link_click', { source: 'homepage-strip-complete' })}
        className="link-underline mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d2b57] dark:text-blue-300"
      >
        See how every battle is going
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}

export default function ArenaStrip() {
  const { battles, loaded } = useLiveBattles();
  const { busy, error, submit } = useArenaVote('homepage-strip');
  const [cursor, setCursor] = React.useState(0);
  const [justVoted, setJustVoted] = React.useState<string | null>(null);
  const [shared, setShared] = React.useState<string | null>(null);

  const current = battles[Math.min(cursor, Math.max(battles.length - 1, 0))] ?? null;
  const now = useNow(Boolean(current));
  const allVoted = battles.length > 0 && battles.every((entry) => entry.myVote);

  // Open on the first battle they have not answered, once the feed arrives.
  const positioned = React.useRef(false);
  React.useEffect(() => {
    if (!loaded || positioned.current || battles.length === 0) return;
    positioned.current = true;
    const first = battles.findIndex((entry) => !entry.myVote);
    if (first > 0) setCursor(first);
  }, [loaded, battles]);

  const advance = React.useCallback(() => {
    setJustVoted(null);
    setCursor((position) => {
      const next = battles.findIndex((entry, at) => at > position && !entry.myVote);
      if (next !== -1) return next;
      const earlier = battles.findIndex((entry) => !entry.myVote);
      return earlier === -1 ? position : earlier;
    });
  }, [battles]);

  // The thank-you is a beat, not a destination.
  React.useEffect(() => {
    if (!justVoted) return;
    const timer = window.setTimeout(advance, ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [justVoted, advance]);

  if (!current) return null;

  const remaining = battles.filter((entry) => !entry.myVote).length;
  const thanking = justVoted === current.id;

  async function vote(side: ArenaSide) {
    if (!current) return;
    const result = await submit(current, side);
    if (result.ok) setJustVoted(current.id);
  }

  async function share() {
    if (!current) return;
    const outcome = await shareBattle(current, current.myVote);
    trackEvent('arena_share', { battle: current.slug, outcome, source: 'homepage-strip' });
    setShared(outcome === 'copied' ? 'Link copied.' : null);
  }

  return (
    <section className="w-full bg-white dark:bg-neutral-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-10">
        {allVoted && !thanking ? (
          <AllDone count={battles.length} />
        ) : (
          <div className="rounded-3xl border border-neutral-200/80 bg-[#fafafa] p-5 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/40">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0d2b57]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0d2b57] dark:bg-blue-300/10 dark:text-blue-300">
                  <Swords className="h-3.5 w-3.5" aria-hidden="true" />
                  Feature Arena
                </span>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {current.title}
                </h2>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {current.subtitle ??
                    'Two ideas, one deadline. The one you vote up is the one we build next.'}
                </p>
              </div>
              <p className="shrink-0 rounded-full border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
                <CountdownLine closesAt={current.closesAt} now={now} />
              </p>
            </div>

            <div className="mt-6">
              <ArenaBar battle={current} />
            </div>

            {thanking ? (
              <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      Thanks, your vote is in
                      {current.myVote ? <> for {current[current.myVote].title}</> : null}
                    </p>
                    <p className="mt-1 text-[13px] text-neutral-500 dark:text-neutral-400">
                      {remaining > 0
                        ? `${remaining} more ${remaining === 1 ? 'battle' : 'battles'} waiting for you.`
                        : 'That was the last one.'}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={share}
                      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
                    >
                      <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                      {shared ?? 'Share'}
                    </button>
                    <button
                      type="button"
                      onClick={advance}
                      className="btn-press inline-flex items-center gap-1.5 rounded-full bg-[#0d2b57] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:bg-blue-300 dark:text-neutral-950"
                    >
                      {remaining > 0 ? 'Next battle' : 'Wrap up'}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <IdeaButton side="a" battle={current} busy={busy === 'a'} onVote={vote} />
                <IdeaButton side="b" battle={current} busy={busy === 'b'} onVote={vote} />
              </div>
            )}

            {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <a
                href={ARENA_PATH}
                onClick={() => trackEvent('arena_link_click', { source: 'homepage-strip' })}
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d2b57] dark:text-blue-300"
              >
                {current.myVote ? 'See the full battle' : 'Read both ideas in full'}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>

              {battles.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">
                    {Math.min(cursor, battles.length - 1) + 1} of {battles.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {battles.map((entry, position) => (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => {
                          setJustVoted(null);
                          setCursor(position);
                        }}
                        aria-label={`Go to: ${entry.title}`}
                        aria-current={position === cursor}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          position === cursor
                            ? 'w-6 bg-[#0d2b57] dark:bg-blue-300'
                            : entry.myVote
                              ? 'w-1.5 bg-[#0d2b57]/40 dark:bg-blue-300/40'
                              : 'w-1.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
