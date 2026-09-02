import { ArrowRight, Check, Loader2, Swords } from 'lucide-react';
import ArenaBar from './ArenaBar';
import { CountdownLine } from './ArenaCountdown';
import { useArenaVote, useLiveBattle, useNow } from './arenaStore';
import { trackEvent } from '../seo/constants';
import { ARENA_PATH, SIDE_STYLE, type ArenaSide } from '../content/arena';

/**
 * The in-content callout for feature, comparison and guide pages.
 *
 * Those pages are where the organic traffic actually lands, and someone who has
 * just read a thousand words about time blocking is exactly who should be
 * choosing what gets built. Compact enough to sit between the article and the
 * related links without competing with either, and it votes in place.
 *
 * Renders nothing when no battle is running.
 */
export default function ArenaCallout({ source }: { source: string }) {
  const { battle } = useLiveBattle();
  const { busy, error, submit } = useArenaVote(source);
  const now = useNow(Boolean(battle));

  if (!battle) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10">
      <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <Swords className="h-4 w-4 text-[#0d2b57] dark:text-blue-300" aria-hidden="true" />
            You pick what we build next
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            <CountdownLine closesAt={battle.closesAt} now={now} />
          </p>
        </div>

        <div className="mt-3">
          <ArenaBar battle={battle} size="sm" />
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(['a', 'b'] as const).map((side: ArenaSide) => {
            const style = SIDE_STYLE[side];
            const mine = battle.myVote === side;

            if (battle.myVote) {
              return (
                <div
                  key={side}
                  className={`flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-sm ${
                    mine
                      ? `${style.ring} ${style.softBg} font-semibold`
                      : 'border-neutral-200 text-neutral-400 dark:border-neutral-800 dark:text-neutral-500'
                  }`}
                >
                  <span className="truncate">{battle[side].title}</span>
                  {mine && <Check className={`h-4 w-4 shrink-0 ${style.text}`} aria-hidden="true" />}
                </div>
              );
            }

            return (
              <button
                key={side}
                type="button"
                onClick={() => submit(battle, side)}
                disabled={busy !== null}
                className={`btn-press flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 ${style.bg}`}
              >
                {busy === side ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <span className="truncate">{battle[side].title}</span>
                )}
              </button>
            );
          })}
        </div>

        {error && <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>}

        <a
          href={ARENA_PATH}
          onClick={() => trackEvent('arena_link_click', { source })}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
        >
          {battle.myVote ? 'See how the vote is going' : 'Read both ideas'}
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
