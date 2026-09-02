import React from 'react';
import { SIDE_STYLE, split, type ArenaBattle } from '../content/arena';

/**
 * Fixed, not random: the same sparks render on the server and in the browser,
 * and a scatter this small reads as random anyway.
 */
const SPARKS = [
  { x: 22, y: -14, delay: 0 },
  { x: -19, y: -18, delay: 40 },
  { x: 26, y: 6, delay: 80 },
  { x: -24, y: 4, delay: 20 },
  { x: 12, y: -24, delay: 110 },
  { x: -11, y: 22, delay: 60 },
  { x: 17, y: 19, delay: 130 },
  { x: -16, y: -6, delay: 90 },
  { x: 5, y: 27, delay: 150 },
  { x: -3, y: -27, delay: 30 },
];

/**
 * The rope.
 *
 * Two fills meeting at a knot, with a mark at dead centre so a small lead still
 * reads as a lead. The standing is shown to everyone, voted or not -- the bar
 * moving is the point, and hiding it until someone commits makes a live battle
 * look broken.
 */
export default function ArenaBar({
  battle,
  size = 'lg',
}: {
  battle: ArenaBattle;
  /** `lg` carries the side labels and the totals; `sm` is the bar alone. */
  size?: 'lg' | 'sm';
}) {
  const share = split(battle.votes);
  const empty = battle.votes.total === 0;
  const large = size === 'lg';

  // A burst each time the rope actually moves. Keyed by a counter so the
  // animation restarts rather than being ignored as already-played.
  const [burst, setBurst] = React.useState(0);
  const lastShare = React.useRef(share.a);
  React.useEffect(() => {
    if (Math.abs(share.a - lastShare.current) < 0.01) return;
    lastShare.current = share.a;
    setBurst((count) => count + 1);
  }, [share.a]);

  return (
    <div>
      {large && (
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <div className={`text-xs font-semibold uppercase tracking-[0.14em] ${SIDE_STYLE.a.text}`}>
              Side A
            </div>
            <div className="mt-0.5 truncate text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {battle.a.title}
            </div>
          </div>
          <div className="min-w-0 text-right">
            <div className={`text-xs font-semibold uppercase tracking-[0.14em] ${SIDE_STYLE.b.text}`}>
              Side B
            </div>
            <div className="mt-0.5 truncate text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {battle.b.title}
            </div>
          </div>
        </div>
      )}

      <div className={`relative ${large ? 'mt-2' : ''}`}>
        <div
          className={`flex w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800 ${
            large ? 'h-5' : 'h-2.5'
          }`}
          role="img"
          aria-label={
            empty
              ? 'No votes yet'
              : `${battle.a.title} ${Math.round(share.a)} percent, ${battle.b.title} ${Math.round(
                  share.b
                )} percent`
          }
        >
          <div
            className={`h-full transition-[width] duration-700 ease-out ${SIDE_STYLE.a.bar} ${
              empty ? 'opacity-40' : ''
            }`}
            style={{ width: `${share.a}%` }}
          />
          <div
            className={`h-full transition-[width] duration-700 ease-out ${SIDE_STYLE.b.bar} ${
              empty ? 'opacity-40' : ''
            }`}
            style={{ width: `${share.b}%` }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/70 dark:bg-neutral-950/70"
          aria-hidden="true"
        />
        {large && (
          <>
            <div
              className="pointer-events-none absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-neutral-900 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)] transition-[left] duration-700 ease-out dark:border-neutral-950 dark:bg-neutral-100"
              style={{ left: `${share.a}%` }}
              aria-hidden="true"
            />
            {burst > 0 && (
              <span
                key={burst}
                className="pointer-events-none absolute top-1/2 transition-[left] duration-700 ease-out"
                style={{ left: `${share.a}%` }}
                aria-hidden="true"
              >
                {SPARKS.map((spark, position) => (
                  <span
                    key={position}
                    className="arena-spark"
                    style={
                      {
                        '--spark-x': `${spark.x}px`,
                        '--spark-y': `${spark.y}px`,
                        '--spark-delay': `${spark.delay}ms`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </span>
            )}
          </>
        )}
      </div>

      <div className={`flex items-center justify-between gap-3 ${large ? 'mt-2 text-sm' : 'mt-1.5 text-xs'}`}>
        <span className={`font-semibold tabular-nums ${SIDE_STYLE.a.text}`}>
          {empty ? '0%' : `${Math.round(share.a)}%`}
          {large && !empty && <span className="font-normal"> · {battle.votes.a.toLocaleString()}</span>}
        </span>
        <span className="text-xs text-neutral-500">
          {battle.votes.total.toLocaleString()} {battle.votes.total === 1 ? 'vote' : 'votes'}
        </span>
        <span className={`font-semibold tabular-nums ${SIDE_STYLE.b.text}`}>
          {large && !empty && <span className="font-normal">{battle.votes.b.toLocaleString()} · </span>}
          {empty ? '0%' : `${Math.round(share.b)}%`}
        </span>
      </div>
    </div>
  );
}
