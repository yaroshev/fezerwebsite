import React from 'react';
import { AlertCircle, Check, Loader2, Share2, Swords, Trophy } from 'lucide-react';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import ArenaBar from '../components/ArenaBar';
import { CountdownTiles } from '../components/ArenaCountdown';
import AppStoreButton from '../components/AppStoreButton';
import BetaAccessButton from '../components/BetaAccessButton';
import { useArenaFeed, useArenaVote, useNow } from '../components/arenaStore';
import { trackEvent } from '../seo/constants';
import {
  ARENA_PAGE,
  SIDE_STYLE,
  formatDeadline,
  shareBattle,
  shareIntentUrl,
  split,
  type ArenaBattle,
  type ArenaSide,
} from '../content/arena';

/**
 * The public arena.
 *
 * The feed comes from the shared store, so a vote cast in the homepage strip is
 * already reflected here, and everything time-dependent waits for the mount --
 * this page is prerendered, and a clock computed during render would ship frozen
 * in the HTML and then disagree with the browser on hydration.
 */

function Pill({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * What someone sees the moment after voting.
 *
 * This is the most engaged they will be all visit: they have just taken a side
 * on the roadmap. So the page asks for the one thing that compounds -- passing
 * it on -- and offers the app, rather than leaving them on a dead end.
 */
function AfterVote({ battle }: { battle: ArenaBattle }) {
  const [shared, setShared] = React.useState<string | null>(null);
  const pick = battle.myVote ? battle[battle.myVote] : null;

  async function share() {
    const outcome = await shareBattle(battle, battle.myVote);
    trackEvent('arena_share', { battle: battle.slug, outcome, source: 'arena-page' });
    setShared(
      outcome === 'copied'
        ? 'Link copied.'
        : outcome === 'failed'
          ? 'Could not open the share sheet.'
          : null
    );
  }

  return (
    <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
            <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            Your vote is in{pick ? <>: you backed {pick.title}</> : null}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
            Results land {formatDeadline(battle.closesAt)}. Bring someone with you and the rope moves
            further.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={share}
            className="btn-press inline-flex items-center gap-1.5 rounded-full bg-[#0d2b57] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:bg-blue-300 dark:text-neutral-950"
          >
            <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
            Share this battle
          </button>
          <a
            href={shareIntentUrl(battle, battle.myVote)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('arena_share', { battle: battle.slug, outcome: 'x', source: 'arena-page' })}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Post on X
          </a>
        </div>
      </div>

      {shared && <p className="mt-2 text-xs text-neutral-500">{shared}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800">
        <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
          While the votes come in, Fezer is free to plan and track.
        </p>
        <div className="flex flex-wrap gap-2">
          <AppStoreButton location="feature-arena" className="!px-4 !py-2 !text-[13px]" />
          <BetaAccessButton location="feature-arena" className="!px-4 !py-2 !text-[13px]" />
        </div>
      </div>
    </div>
  );
}

function IdeaCard({
  side,
  idea,
  battle,
  busy,
  onVote,
}: {
  side: ArenaSide;
  idea: ArenaBattle['a'];
  battle: ArenaBattle;
  busy: boolean;
  onVote: (side: ArenaSide) => void;
}) {
  const style = SIDE_STYLE[side];
  const mine = battle.myVote === side;
  const won = battle.closed && battle.winner === side;
  const lost = battle.closed && battle.winner !== side && battle.winner !== 'tie';

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border bg-white p-5 transition-colors dark:bg-neutral-900 ${
        won
          ? `${style.ring} shadow-[0_16px_40px_-24px_rgba(13,43,87,0.5)]`
          : mine
            ? style.ring
            : 'border-neutral-200 dark:border-neutral-800'
      } ${lost ? 'opacity-70' : ''}`}
    >
      <div className="flex items-center justify-between gap-3">
        <Pill className={style.bg}>Side {style.name}</Pill>
        {won && (
          <Pill className={`${style.softBg} ${style.text}`}>
            <Trophy className="h-3 w-3" aria-hidden="true" />
            Winner
          </Pill>
        )}
        {mine && !won && (
          <Pill className="bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
            <Check className="h-3 w-3" aria-hidden="true" />
            Your pick
          </Pill>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {idea.title}
      </h3>
      <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        {idea.summary}
      </p>
      {idea.detail && (
        <p className="mt-3 whitespace-pre-line border-t border-neutral-100 pt-3 text-sm leading-relaxed text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          {idea.detail}
        </p>
      )}

      <div className="mt-5 flex-1" />

      {battle.closed ? (
        <div className="rounded-full bg-neutral-100 px-4 py-3 text-center text-sm font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
          {battle.votes[side].toLocaleString()} {battle.votes[side] === 1 ? 'vote' : 'votes'}
        </div>
      ) : battle.myVote ? (
        <div
          className={`rounded-full px-4 py-3 text-center text-sm font-semibold ${
            mine ? style.bg : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500'
          }`}
        >
          {mine ? 'You backed this' : 'Not your pick'}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onVote(side)}
          disabled={busy}
          className={`btn-press flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 ${style.bg}`}
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : `Vote for ${idea.title}`}
        </button>
      )}
    </div>
  );
}

function BattleCard({
  battle,
  now,
  busySide,
  error,
  onVote,
}: {
  battle: ArenaBattle;
  now: number | null;
  busySide: ArenaSide | null;
  error: string | null;
  onVote: (battle: ArenaBattle, side: ArenaSide) => void;
}) {
  const winnerIdea = battle.winner === 'a' ? battle.a : battle.winner === 'b' ? battle.b : null;

  return (
    <article
      id={battle.slug}
      className="scroll-mt-24 rounded-3xl border border-neutral-200/80 bg-[#fafafa] p-5 sm:p-6 dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          {battle.closed ? (
            <Pill className="bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              Decided
            </Pill>
          ) : (
            <Pill className="bg-[#0d2b57]/8 text-[#0d2b57] dark:bg-blue-300/10 dark:text-blue-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
              </span>
              Voting open
            </Pill>
          )}
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-100">
            {battle.title}
          </h2>
          {battle.subtitle && (
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {battle.subtitle}
            </p>
          )}
        </div>
        <div className="shrink-0">
          <CountdownTiles closesAt={battle.closesAt} now={now} />
          {now !== null && (
            <p className="mt-1.5 text-right text-[11px] text-neutral-400">
              {battle.closed ? 'Closed' : 'Closes'} {formatDeadline(battle.closesAt)}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <ArenaBar battle={battle} />
        {battle.votes.total === 0 && !battle.closed && (
          <p className="mt-1.5 text-center text-xs text-neutral-500">
            No votes yet. The first one moves the rope.
          </p>
        )}
      </div>

      {battle.closed && (
        <div
          className={`mt-5 flex items-start gap-3 rounded-2xl px-4 py-3.5 ${
            winnerIdea ? SIDE_STYLE[battle.winner as ArenaSide].softBg : 'bg-neutral-100 dark:bg-neutral-900'
          }`}
        >
          <Trophy
            className={`mt-0.5 h-5 w-5 shrink-0 ${
              winnerIdea ? SIDE_STYLE[battle.winner as ArenaSide].text : 'text-neutral-400'
            }`}
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {winnerIdea ? `${winnerIdea.title} wins` : 'Dead heat'}
            </p>
            <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
              {winnerIdea
                ? 'This is the next feature selected for development.'
                : 'The vote finished level, so this one goes back to us to decide.'}
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <IdeaCard
          side="a"
          idea={battle.a}
          battle={battle}
          busy={busySide === 'a'}
          onVote={(side) => onVote(battle, side)}
        />
        <div className="flex items-center justify-center">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:border-neutral-800 dark:bg-neutral-900">
            vs
          </span>
        </div>
        <IdeaCard
          side="b"
          idea={battle.b}
          battle={battle}
          busy={busySide === 'b'}
          onVote={(side) => onVote(battle, side)}
        />
      </div>

      {battle.myVote && !battle.closed && <AfterVote battle={battle} />}
    </article>
  );
}

function ArchiveRow({ battle }: { battle: ArenaBattle }) {
  const share = split(battle.votes);
  const winnerIdea = battle.winner === 'a' ? battle.a : battle.winner === 'b' ? battle.b : null;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {battle.title}
        </h3>
        <span className="text-xs text-neutral-400">{formatDeadline(battle.closesAt)}</span>
      </div>

      <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div className={`h-full ${SIDE_STYLE.a.bar}`} style={{ width: `${share.a}%` }} />
        <div className={`h-full ${SIDE_STYLE.b.bar}`} style={{ width: `${share.b}%` }} />
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 text-xs">
        <span className={battle.winner === 'a' ? `font-semibold ${SIDE_STYLE.a.text}` : 'text-neutral-500'}>
          {battle.a.title} · {battle.votes.a.toLocaleString()}
        </span>
        <span className={battle.winner === 'b' ? `font-semibold ${SIDE_STYLE.b.text}` : 'text-neutral-500'}>
          {battle.votes.b.toLocaleString()} · {battle.b.title}
        </span>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
        <Trophy className="h-3.5 w-3.5 text-neutral-400" aria-hidden="true" />
        {winnerIdea ? `${winnerIdea.title} won` : 'Finished level'}
      </p>
    </div>
  );
}

export default function FeatureArena() {
  const { feed, loaded } = useArenaFeed();
  const { busy, error, submit } = useArenaVote('arena-page');
  const now = useNow(true);

  React.useEffect(() => {
    trackEvent('arena_page_view', { page_path: '/feature-arena' });
  }, []);

  const live = feed?.live ?? [];
  const closed = feed?.closed ?? [];
  const [busyBattle, setBusyBattle] = React.useState<string | null>(null);

  const vote = React.useCallback(
    async (battle: ArenaBattle, side: ArenaSide) => {
      setBusyBattle(battle.id);
      await submit(battle, side);
      setBusyBattle(null);
    },
    [submit]
  );

  // Scroll a shared deep link (/feature-arena#slug) into view once the battles
  // it points at actually exist in the DOM.
  const jumped = React.useRef(false);
  React.useEffect(() => {
    if (jumped.current || !loaded || typeof window === 'undefined') return;
    const target = window.location.hash.slice(1);
    if (!target) return;
    const element = document.getElementById(target);
    if (!element) return;
    jumped.current = true;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [loaded]);

  const busySideFor = (battle: ArenaBattle) => (busyBattle === battle.id ? busy : null);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Nav activePath="/feature-arena" />

      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 md:px-10">
        <header className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#0d2b57]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0d2b57] dark:bg-blue-300/10 dark:text-blue-300">
            <Swords className="h-3.5 w-3.5" aria-hidden="true" />
            {ARENA_PAGE.eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">
            {ARENA_PAGE.h1}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {ARENA_PAGE.intro}
          </p>
        </header>

        {!loaded && live.length === 0 && closed.length === 0 && (
          <div className="mt-10 flex items-center gap-2 text-sm text-neutral-500">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Loading the arena…
          </div>
        )}

        {loaded && live.length === 0 && closed.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-neutral-300 px-6 py-12 text-center dark:border-neutral-700">
            <Swords className="mx-auto h-8 w-8 text-neutral-300 dark:text-neutral-700" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold tracking-tight">{ARENA_PAGE.emptyTitle}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-500">
              {ARENA_PAGE.emptyBody}
            </p>
            <a
              href="/#feedback"
              className="btn-press mt-5 inline-flex rounded-full bg-[#0d2b57] px-5 py-2.5 text-sm font-semibold text-white dark:bg-blue-300 dark:text-neutral-950"
            >
              Suggest a feature
            </a>
          </div>
        )}

        {live.length > 0 && (
          <section className="mt-10 space-y-8">
            {live.map((battle) => (
              <BattleCard
                key={battle.id}
                battle={battle}
                now={now}
                busySide={busySideFor(battle)}
                error={busyBattle === battle.id ? error : null}
                onVote={vote}
              />
            ))}
          </section>
        )}

        {closed.length > 0 && live.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-semibold tracking-tight">{ARENA_PAGE.archiveTitle}</h2>
            <p className="mt-1 text-sm text-neutral-500">{ARENA_PAGE.archiveBody}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {closed.map((battle) => (
                <ArchiveRow key={battle.id} battle={battle} />
              ))}
            </div>
          </section>
        )}

        {/* With nothing running, the last result deserves the full card. */}
        {closed.length > 0 && live.length === 0 && (
          <section className="mt-10 space-y-8">
            <BattleCard battle={closed[0]} now={now} busySide={null} error={null} onVote={vote} />
            {closed.length > 1 && (
              <div>
                <h2 className="text-lg font-semibold tracking-tight">{ARENA_PAGE.archiveTitle}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {closed.slice(1).map((battle) => (
                    <ArchiveRow key={battle.id} battle={battle} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {(live.length > 0 || closed.length > 0) && (
          <ul className="mt-12 space-y-1.5 border-t border-neutral-200 pt-6 text-xs leading-relaxed text-neutral-500 dark:border-neutral-800">
            {ARENA_PAGE.finePrint.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
