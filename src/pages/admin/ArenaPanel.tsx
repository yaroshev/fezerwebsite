import React from 'react';
import {
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  RotateCcw,
  Square,
  Trash2,
  Trophy,
  X,
} from 'lucide-react';
import { SIDE_STYLE, split, type ArenaBattle, type ArenaSide } from '../../content/arena';
import {
  CARD,
  FIELD,
  GHOST_BUTTON,
  LABEL,
  PRIMARY_BUTTON,
  fromLocalInput,
  shortDate,
  toLocalInput,
  type AdminApi,
} from './shared';

/**
 * Feature Arena operator tab.
 *
 * Battles are written by hand here -- two ideas, a deadline, publish. Publishing
 * is what puts a battle on the public page; the deadline is what ends the vote.
 * Neither is guessed from the other, so a battle can be drafted days ahead and
 * released on the hour.
 */

type Draft = {
  id: string | null;
  title: string;
  subtitle: string;
  aTitle: string;
  aSummary: string;
  aDetail: string;
  bTitle: string;
  bSummary: string;
  bDetail: string;
  closesAt: string;
  published: boolean;
};

/** A week out at the top of the hour -- a sane default nobody has to retype. */
function defaultDeadline() {
  const date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  date.setMinutes(0, 0, 0);
  return toLocalInput(date.toISOString());
}

const EMPTY: Draft = {
  id: null,
  title: '',
  subtitle: '',
  aTitle: '',
  aSummary: '',
  aDetail: '',
  bTitle: '',
  bSummary: '',
  bDetail: '',
  closesAt: defaultDeadline(),
  published: false,
};

function toDraft(battle: ArenaBattle): Draft {
  return {
    id: battle.id,
    title: battle.title,
    subtitle: battle.subtitle ?? '',
    aTitle: battle.a.title,
    aSummary: battle.a.summary,
    aDetail: battle.a.detail ?? '',
    bTitle: battle.b.title,
    bSummary: battle.b.summary,
    bDetail: battle.b.detail ?? '',
    closesAt: toLocalInput(battle.closesAt),
    published: battle.published,
  };
}

function StatusPill({ battle }: { battle: ArenaBattle }) {
  const tone =
    battle.status === 'live'
      ? 'bg-[#0d2b57]/8 text-[#0d2b57] dark:bg-blue-300/10 dark:text-blue-300'
      : battle.status === 'closed'
        ? 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'
        : 'bg-amber-100 text-amber-700 dark:bg-amber-300/10 dark:text-amber-300';
  const label = battle.status === 'live' ? 'Live' : battle.status === 'closed' ? 'Closed' : 'Draft';
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${tone}`}>
      {label}
    </span>
  );
}

function SideColumn({
  side,
  draft,
  set,
}: {
  side: ArenaSide;
  draft: Draft;
  set: (patch: Partial<Draft>) => void;
}) {
  const upper = side.toUpperCase();
  const titleKey = side === 'a' ? 'aTitle' : 'bTitle';
  const summaryKey = side === 'a' ? 'aSummary' : 'bSummary';
  const detailKey = side === 'a' ? 'aDetail' : 'bDetail';

  return (
    <div className="rounded-xl border border-neutral-200 p-3.5 dark:border-neutral-800">
      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${SIDE_STYLE[side].bg}`}
      >
        Side {upper}
      </span>
      <label className="mt-3 block">
        <span className={LABEL}>Feature name</span>
        <input
          value={draft[titleKey] as string}
          onChange={(event) => set({ [titleKey]: event.target.value } as Partial<Draft>)}
          placeholder={side === 'a' ? 'Calendar sync' : 'Weekly review'}
          className={`mt-1.5 ${FIELD}`}
        />
      </label>
      <label className="mt-3 block">
        <span className={LABEL}>The pitch</span>
        <textarea
          value={draft[summaryKey] as string}
          onChange={(event) => set({ [summaryKey]: event.target.value } as Partial<Draft>)}
          rows={3}
          placeholder="One or two sentences a visitor can decide on."
          className={`mt-1.5 ${FIELD}`}
        />
      </label>
      <label className="mt-3 block">
        <span className={LABEL}>Detail (optional)</span>
        <textarea
          value={draft[detailKey] as string}
          onChange={(event) => set({ [detailKey]: event.target.value } as Partial<Draft>)}
          rows={2}
          placeholder="What it would actually do, or what it would not."
          className={`mt-1.5 ${FIELD}`}
        />
      </label>
    </div>
  );
}

function BattleForm({
  draft,
  saving,
  onChange,
  onSave,
  onCancel,
}: {
  draft: Draft;
  saving: boolean;
  onChange: (patch: Partial<Draft>) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const complete =
    draft.title.trim() &&
    draft.aTitle.trim() &&
    draft.aSummary.trim() &&
    draft.bTitle.trim() &&
    draft.bSummary.trim() &&
    draft.closesAt;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSave();
      }}
      className={`${CARD} border-[#0d2b57]/30 dark:border-blue-300/30`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-tight">
          {draft.id ? 'Edit battle' : 'New battle'}
        </h3>
        <button type="button" onClick={onCancel} className="text-neutral-400 hover:text-neutral-700">
          <X className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Cancel</span>
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={LABEL}>Battle title</span>
          <input
            value={draft.title}
            onChange={(event) => onChange({ title: event.target.value })}
            placeholder="What should we build next?"
            className={`mt-1.5 ${FIELD}`}
          />
        </label>
        <label className="block">
          <span className={LABEL}>Subtitle (optional)</span>
          <input
            value={draft.subtitle}
            onChange={(event) => onChange({ subtitle: event.target.value })}
            placeholder="One line of context under the title."
            className={`mt-1.5 ${FIELD}`}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <SideColumn side="a" draft={draft} set={onChange} />
        <SideColumn side="b" draft={draft} set={onChange} />
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <label className="block">
          <span className={LABEL}>Voting closes</span>
          <input
            type="datetime-local"
            value={draft.closesAt}
            onChange={(event) => onChange({ closesAt: event.target.value })}
            className={`mt-1.5 ${FIELD} w-auto`}
          />
        </label>
        <label className="flex items-center gap-2 pb-2 text-sm">
          <input
            type="checkbox"
            checked={draft.published}
            onChange={(event) => onChange({ published: event.target.checked })}
            className="h-4 w-4 rounded border-neutral-300 accent-[#0d2b57]"
          />
          Published (visible on /feature-arena)
        </label>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button type="submit" disabled={!complete || saving} className={PRIMARY_BUTTON}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {draft.id ? 'Save changes' : 'Create battle'}
        </button>
        <button type="button" onClick={onCancel} className={GHOST_BUTTON}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function ResultBar({ battle }: { battle: ArenaBattle }) {
  const share = split(battle.votes);
  return (
    <div className="mt-3">
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div className={`h-full ${SIDE_STYLE.a.bar}`} style={{ width: `${share.a}%` }} />
        <div className={`h-full ${SIDE_STYLE.b.bar}`} style={{ width: `${share.b}%` }} />
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 text-xs">
        <span className={SIDE_STYLE.a.text}>
          <strong className="tabular-nums">{battle.votes.a.toLocaleString()}</strong> · {battle.a.title}
          {battle.votes.total > 0 && <span className="text-neutral-400"> ({Math.round(share.a)}%)</span>}
        </span>
        <span className="text-neutral-400">
          {battle.votes.total.toLocaleString()} total
        </span>
        <span className={`text-right ${SIDE_STYLE.b.text}`}>
          {battle.b.title} · <strong className="tabular-nums">{battle.votes.b.toLocaleString()}</strong>
          {battle.votes.total > 0 && <span className="text-neutral-400"> ({Math.round(share.b)}%)</span>}
        </span>
      </div>
    </div>
  );
}

export default function ArenaPanel({
  api,
  onStatus,
  onUnauthorized,
}: {
  api: AdminApi;
  onStatus: (message: string | null) => void;
  onUnauthorized: () => void;
}) {
  const [battles, setBattles] = React.useState<ArenaBattle[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [draft, setDraft] = React.useState<Draft | null>(null);
  const [confirmDelete, setConfirmDelete] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setBusy(true);
    try {
      const response = await api('arena');
      const data = await response.json();
      setBattles(data.battles ?? []);
    } catch (error) {
      if ((error as Error).name === 'Unauthorized') onUnauthorized();
      else onStatus('Could not load battles.');
    } finally {
      setBusy(false);
    }
  }, [api, onStatus, onUnauthorized]);

  React.useEffect(() => {
    load();
  }, [load]);

  const send = React.useCallback(
    async (path: string, init: RequestInit, message: string) => {
      try {
        const response = await api(path, init);
        const data = await response.json();
        if (!data.ok) {
          onStatus(
            data.fields?.length
              ? `Check these fields: ${data.fields.join(', ')}`
              : `That did not work (${data.error ?? 'unknown'}).`
          );
          return false;
        }
        onStatus(message);
        await load();
        return true;
      } catch (error) {
        if ((error as Error).name === 'Unauthorized') onUnauthorized();
        else onStatus('The arena API did not respond.');
        return false;
      }
    },
    [api, load, onStatus, onUnauthorized]
  );

  async function save() {
    if (!draft) return;
    setSaving(true);

    const body = {
      title: draft.title,
      subtitle: draft.subtitle,
      aTitle: draft.aTitle,
      aSummary: draft.aSummary,
      aDetail: draft.aDetail,
      bTitle: draft.bTitle,
      bSummary: draft.bSummary,
      bDetail: draft.bDetail,
      closesAt: fromLocalInput(draft.closesAt),
      published: draft.published,
    };

    const ok = await send(
      draft.id ? `arena/${draft.id}` : 'arena',
      {
        method: draft.id ? 'PATCH' : 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      },
      draft.id ? 'Battle saved.' : 'Battle created.'
    );

    setSaving(false);
    if (ok) setDraft(null);
  }

  const togglePublished = (battle: ArenaBattle) =>
    send(
      `arena/${battle.id}`,
      {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ published: !battle.published }),
      },
      battle.published ? 'Battle removed from the page.' : 'Battle published.'
    );

  const closeNow = (battle: ArenaBattle) =>
    send(`arena/${battle.id}/close`, { method: 'POST' }, 'Voting closed. The result stands.');

  const resetVotes = (battle: ArenaBattle) =>
    send(`arena/${battle.id}/reset`, { method: 'POST' }, 'Votes cleared for that battle.');

  async function remove(battle: ArenaBattle) {
    const ok = await send(`arena/${battle.id}`, { method: 'DELETE' }, 'Battle deleted.');
    if (ok) setConfirmDelete(null);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Feature Arena</h2>
          <p className="mt-0.5 text-[13px] text-neutral-500">
            Published battles appear on{' '}
            <a href="/feature-arena" className="underline underline-offset-2 hover:opacity-80">
              /feature-arena
            </a>
            . Voting ends on its own at the deadline.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={load} disabled={busy} className={GHOST_BUTTON}>
            {busy ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setDraft({ ...EMPTY, closesAt: defaultDeadline() })}
            className={PRIMARY_BUTTON}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            New battle
          </button>
        </div>
      </div>

      {draft && (
        <div className="mt-5">
          <BattleForm
            draft={draft}
            saving={saving}
            onChange={(patch) => setDraft((current) => (current ? { ...current, ...patch } : current))}
            onSave={save}
            onCancel={() => setDraft(null)}
          />
        </div>
      )}

      <div className="mt-5 space-y-3">
        {battles.length === 0 && !busy && (
          <div className="rounded-2xl border border-dashed border-neutral-300 px-6 py-10 text-center dark:border-neutral-700">
            <p className="text-sm font-medium">No battles yet.</p>
            <p className="mt-1 text-sm text-neutral-500">
              Create one, define the two ideas and a deadline, then publish it.
            </p>
          </div>
        )}

        {battles.map((battle) => (
          <div key={battle.id} className={CARD}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill battle={battle} />
                  <h3 className="text-sm font-semibold tracking-tight">{battle.title}</h3>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  {battle.closed ? 'Closed' : 'Closes'} {shortDate(battle.closesAt)} · /feature-arena ·{' '}
                  <span className="font-mono">{battle.slug}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button type="button" onClick={() => setDraft(toDraft(battle))} className={GHOST_BUTTON}>
                  <Pencil className="h-3 w-3" aria-hidden="true" />
                  Edit
                </button>
                <button type="button" onClick={() => togglePublished(battle)} className={GHOST_BUTTON}>
                  {battle.published ? (
                    <>
                      <EyeOff className="h-3 w-3" aria-hidden="true" />
                      Unpublish
                    </>
                  ) : (
                    <>
                      <Eye className="h-3 w-3" aria-hidden="true" />
                      Publish
                    </>
                  )}
                </button>
                {!battle.closed && (
                  <button type="button" onClick={() => closeNow(battle)} className={GHOST_BUTTON}>
                    <Square className="h-3 w-3" aria-hidden="true" />
                    Close now
                  </button>
                )}
                {battle.votes.total > 0 && (
                  <button type="button" onClick={() => resetVotes(battle)} className={GHOST_BUTTON}>
                    <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    Reset votes
                  </button>
                )}
                {confirmDelete === battle.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => remove(battle)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                    >
                      <Trash2 className="h-3 w-3" aria-hidden="true" />
                      Delete for good
                    </button>
                    <button type="button" onClick={() => setConfirmDelete(null)} className={GHOST_BUTTON}>
                      Keep
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(battle.id)}
                    className={`${GHOST_BUTTON} text-red-600 dark:text-red-400`}
                  >
                    <Trash2 className="h-3 w-3" aria-hidden="true" />
                    Delete
                  </button>
                )}
              </div>
            </div>

            <ResultBar battle={battle} />

            {battle.closed && (
              <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                <Trophy className="h-3.5 w-3.5 text-neutral-400" aria-hidden="true" />
                {battle.winner === 'tie'
                  ? 'Finished level, so no winner.'
                  : `${battle.winner === 'a' ? battle.a.title : battle.b.title} won.`}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
