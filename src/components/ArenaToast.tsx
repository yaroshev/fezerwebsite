import React from 'react';
import { Swords, X } from 'lucide-react';
import { CountdownLine } from './ArenaCountdown';
import { useLiveBattle, useNow } from './arenaStore';
import { trackEvent } from '../seo/constants';
import { ARENA_PATH, ARENA_TOAST, ARENA_TOAST_DISMISS_KEY } from '../content/arena';

/**
 * The arena's turn at the toast slot.
 *
 * Shown to people the promo has nothing left to offer -- they claimed a code or
 * dismissed it -- so a returning visitor meets something new instead of the same
 * banner they already declined. It disappears for good once they vote.
 */
function isDismissed() {
  try {
    return window.localStorage.getItem(ARENA_TOAST_DISMISS_KEY) === '1';
  } catch {
    return false; // private browsing; showing the toast is the safe failure
  }
}

export default function ArenaToast() {
  const { battle } = useLiveBattle();
  const now = useNow(Boolean(battle));
  const [visible, setVisible] = React.useState(false);
  const [entered, setEntered] = React.useState(false);
  const announced = React.useRef(false);

  const eligible = Boolean(battle) && !battle?.myVote && !isDismissed();

  React.useEffect(() => {
    if (!eligible || announced.current) return;
    announced.current = true;

    // The settle delay keeps the first paint clean -- every page here ships as
    // prerendered HTML, and a banner in it would flash before React can decide
    // whether this visitor should see it at all.
    const delay = window.setTimeout(() => {
      setVisible(true);
      window.setTimeout(() => setEntered(true), 30);
      trackEvent('arena_toast_view');
    }, ARENA_TOAST.delayMs);

    return () => window.clearTimeout(delay);
  }, [eligible]);

  // Voting elsewhere on the page retires the toast on the spot.
  React.useEffect(() => {
    if (battle?.myVote && visible) {
      setEntered(false);
      window.setTimeout(() => setVisible(false), 200);
    }
  }, [battle?.myVote, visible]);

  if (!visible || !battle) return null;

  const dismiss = () => {
    setEntered(false);
    trackEvent('arena_toast_dismiss');
    try {
      window.localStorage.setItem(ARENA_TOAST_DISMISS_KEY, '1');
    } catch {
      // Nothing to persist to; the toast simply returns on the next visit.
    }
    window.setTimeout(() => setVisible(false), 200);
  };

  return (
    // Sits just below the sticky nav rather than on top of it, so it never
    // covers a navigation link on any device.
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-[calc(env(safe-area-inset-top)+3.9rem)] transition-all duration-300 ease-out-expo sm:pt-[calc(env(safe-area-inset-top)+4.4rem)] ${
        entered ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
      }`}
    >
      <div className="pointer-events-auto flex w-full max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-[#0d2b57] px-3.5 py-3 text-white shadow-2xl shadow-[#0d2b57]/30 sm:gap-4 sm:px-5">
        <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/12 sm:flex">
          <Swords className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold leading-tight tracking-tight sm:text-sm">
            {ARENA_TOAST.headline}
          </p>
          <p className="mt-0.5 truncate text-[12px] leading-tight text-white/70 sm:text-[13px]">
            {battle.a.title} vs {battle.b.title}
            <span className="hidden sm:inline">
              {' '}
              · <CountdownLine closesAt={battle.closesAt} now={now} />
            </span>
          </p>
        </div>

        <a
          href={ARENA_PATH}
          onClick={() => trackEvent('arena_toast_click', { battle: battle.slug })}
          className="shrink-0 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-[#0d2b57] transition-colors hover:bg-[#e8f0fc] active:bg-[#d8e6fa] sm:px-4 sm:text-sm"
        >
          {ARENA_TOAST.cta}
        </a>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="-mr-1 shrink-0 rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
