import React from 'react';
import { Gift, X } from 'lucide-react';
import { trackEvent } from '../seo/constants';
import {
  PROMO_ACTIVE,
  PROMO_DISMISS_KEY,
  PROMO_PATH,
  PROMO_TOAST,
  fetchPromoStats,
  type PromoStats,
} from '../content/promo';

function isDismissed() {
  try {
    return window.localStorage.getItem(PROMO_DISMISS_KEY) === '1';
  } catch {
    return false; // private browsing; showing the toast is the safe failure
  }
}

/**
 * The campaign toast: a floating bar at the top of every page except the promo
 * pages themselves.
 *
 * It renders nothing on the server and nothing on the first client paint. Every
 * page on this site is prerendered to static HTML, so a toast baked into that
 * HTML would flash for people who already dismissed it. Mounting only after the
 * settle delay keeps the first paint clean.
 *
 * Stats are best-effort. When the pool is confirmed empty the toast stays
 * hidden; when the API is unreachable (common on a cold local setup) the toast
 * still appears so the campaign is never silently gone.
 */
export default function PromoToast() {
  const [stats, setStats] = React.useState<PromoStats | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    if (!PROMO_ACTIVE || isDismissed()) return;
    if (window.location.pathname.startsWith(PROMO_PATH)) return;

    const controller = new AbortController();
    let delayTimer: number | undefined;
    let enterTimer: number | undefined;

    const reveal = (result: PromoStats | null) => {
      if (controller.signal.aborted) return;
      setStats(result);
      setVisible(true);
      // Two frames: mount hidden, then transition in.
      enterTimer = window.setTimeout(() => setEntered(true), 30);
      trackEvent('promo_toast_view', {
        promo_remaining: result?.remaining ?? null,
      });
    };

    // Wait out the settle delay and the stats fetch together. A fast API still
    // respects the delay; a failing API does not suppress the toast.
    Promise.all([
      new Promise<void>((resolve) => {
        delayTimer = window.setTimeout(resolve, PROMO_TOAST.delayMs);
      }),
      fetchPromoStats(controller.signal),
    ]).then(([, result]) => {
      if (controller.signal.aborted) return;
      if (result && result.remaining <= 0) return;
      reveal(result);
    });

    return () => {
      controller.abort();
      window.clearTimeout(delayTimer);
      window.clearTimeout(enterTimer);
    };
  }, []);

  const dismiss = () => {
    setEntered(false);
    trackEvent('promo_toast_dismiss');
    try {
      window.localStorage.setItem(PROMO_DISMISS_KEY, '1');
    } catch {
      // Nothing to persist to; the toast simply returns on the next visit.
    }
    window.setTimeout(() => setVisible(false), 200);
  };

  if (!visible) return null;

  const remaining = stats?.remaining;
  const total = stats?.total;
  const poolLabel =
    typeof remaining === 'number' && typeof total === 'number'
      ? `${remaining.toLocaleString()} of ${total.toLocaleString()} left`
      : null;

  return (
    // Sits just below the sticky nav rather than on top of it: the top padding is
    // the nav's own height plus the notch inset, so the toast never covers a
    // navigation link on any device.
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-[calc(env(safe-area-inset-top)+3.9rem)] transition-all duration-300 ease-out-expo sm:pt-[calc(env(safe-area-inset-top)+4.4rem)] ${
        entered ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
      }`}
    >
      <div className="pointer-events-auto flex w-full max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-[#0d2b57] px-3.5 py-3 text-white shadow-2xl shadow-[#0d2b57]/30 sm:gap-4 sm:px-5">
        <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/12 sm:flex">
          <Gift className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold leading-tight tracking-tight sm:text-sm">
            {PROMO_TOAST.headline}
          </p>
          <p className="mt-0.5 truncate text-[12px] leading-tight text-white/70 sm:text-[13px]">
            {poolLabel ? (
              <>
                {poolLabel}
                <span className="hidden sm:inline"> · {PROMO_TOAST.body}</span>
              </>
            ) : (
              PROMO_TOAST.body
            )}
          </p>
        </div>

        <a
          href={PROMO_PATH}
          onClick={() =>
            trackEvent('promo_toast_click', {
              promo_remaining: remaining ?? null,
            })
          }
          className="shrink-0 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-[#0d2b57] transition-colors hover:bg-[#e8f0fc] active:bg-[#d8e6fa] sm:px-4 sm:text-sm"
        >
          {PROMO_TOAST.cta}
        </a>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss promo"
          className="-mr-1 shrink-0 rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
