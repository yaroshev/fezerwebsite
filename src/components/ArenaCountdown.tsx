import { Timer } from 'lucide-react';
import { formatDeadline, timeLeft } from '../content/arena';

/**
 * Time left on a battle.
 *
 * `now` is null until the page has mounted -- see `useNow`. Until then this
 * renders the deadline as plain text, which is what the prerendered HTML ships
 * and what someone with JavaScript off keeps.
 */
function units(closesAt: string, now: number) {
  const left = timeLeft(closesAt, now);
  if (!left) return null;
  // Under a day the seconds are the story; above it they are noise.
  return left.days > 0
    ? [
        { value: left.days, label: 'days' },
        { value: left.hours, label: 'hrs' },
        { value: left.minutes, label: 'min' },
      ]
    : [
        { value: left.hours, label: 'hrs' },
        { value: left.minutes, label: 'min' },
        { value: left.seconds, label: 'sec' },
      ];
}

export function CountdownTiles({ closesAt, now }: { closesAt: string; now: number | null }) {
  if (now === null) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Closes {formatDeadline(closesAt)}
      </p>
    );
  }

  const parts = units(closesAt, now);
  if (!parts) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
        Voting closed
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Timer className="h-4 w-4 text-neutral-400" aria-hidden="true" />
      <div className="flex gap-1.5">
        {parts.map((unit) => (
          <div
            key={unit.label}
            className="min-w-[3.25rem] rounded-xl border border-neutral-200 bg-white px-2 py-1.5 text-center dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div className="text-lg font-semibold tabular-nums tracking-tight text-neutral-900 dark:text-neutral-100">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** One line, for places that cannot spare three tiles. */
export function CountdownLine({ closesAt, now }: { closesAt: string; now: number | null }) {
  if (now === null) return <>Closes {formatDeadline(closesAt)}</>;

  const left = timeLeft(closesAt, now);
  if (!left) return <>Voting closed</>;
  if (left.days > 0) return <>Closes in {left.days}d {left.hours}h</>;
  if (left.hours > 0) return <>Closes in {left.hours}h {left.minutes}m</>;
  return <>Closes in {left.minutes}m {String(left.seconds).padStart(2, '0')}s</>;
}
