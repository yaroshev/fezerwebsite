import React from 'react';
import { AlertCircle, ArrowLeft, Check, Gift, Loader2, MailCheck } from 'lucide-react';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import { PLUS_INCLUDES, campaignParams, trackEvent } from '../seo/constants';
import {
  PROMO_PAGE,
  PROMO_PLATFORMS,
  fetchPromoStats,
  type PromoPlatform,
  type PromoPlatformIcon,
  type PromoStats,
} from '../content/promo';

const CLAIMED_KEY = 'fezer-promo-claimed-v1';

type Step = 1 | 2 | 3;

type Outcome =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; email: string; platform: PromoPlatform }
  | { kind: 'already'; email: string; platform: PromoPlatform }
  | { kind: 'error'; message: string };

const ERRORS: Record<string, string> = {
  invalid_name: 'Please enter your name.',
  invalid_email: 'That email address does not look right. Check it and try again.',
  invalid_platform: 'Pick the device you use Fezer on.',
  sold_out: 'The codes for that platform have just run out. Try the other one, or check back later.',
  rate_limited: 'That is a lot of requests from one connection. Try again in an hour.',
  send_failed:
    'Your code is reserved but the email would not send. Try again in a minute and you will get the same code, not a new one.',
  server_error: 'Something broke on our side. Try again in a moment.',
};

const FIELD =
  'mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-base text-neutral-950 outline-none transition-[border-color,box-shadow,background-color] placeholder:text-neutral-400 focus:border-[#0d2b57] focus:bg-white focus:ring-4 focus:ring-[#0d2b57]/12 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-600 dark:focus:border-blue-300 dark:focus:bg-neutral-900 dark:focus:ring-blue-300/10';

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function StatTile({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white px-4 py-4 text-center dark:border-neutral-800 dark:bg-neutral-900">
      <div
        className={`text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl ${
          muted ? 'text-neutral-400 dark:text-neutral-600' : 'text-[#0d2b57] dark:text-blue-300'
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
        {label}
      </div>
    </div>
  );
}

function StepRail({ step }: { step: Step }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
        Step {step} of 3
      </p>
      <div className="flex min-w-0 flex-1 gap-1.5" aria-hidden="true">
        {([1, 2, 3] as const).map((n) => (
          <div
            key={n}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              n < step
                ? 'bg-[#0d2b57] dark:bg-blue-300'
                : n === step
                  ? 'bg-[#0d2b57] dark:bg-blue-300'
                  : 'bg-neutral-200 dark:bg-neutral-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function PrimaryButton({
  children,
  disabled,
  busy,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  busy?: boolean;
}) {
  const ready = !disabled && !busy;
  return (
    <button
      type="submit"
      disabled={!ready}
      className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-[15px] font-semibold transition-all duration-200 ${
        ready
          ? 'bg-[#0d2b57] text-white shadow-[0_10px_24px_-10px_rgba(13,43,87,0.55)] hover:opacity-90 active:opacity-80 dark:bg-blue-300 dark:text-neutral-950 dark:shadow-[0_12px_28px_-12px_rgba(147,197,253,0.55)]'
          : 'cursor-not-allowed bg-neutral-200 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600'
      }`}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : children}
    </button>
  );
}

function PlatformChip({
  label,
  Icon,
  buttonClass,
  onClick,
}: {
  label: string;
  Icon: PromoPlatformIcon;
  buttonClass: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90 ${buttonClass}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
      <span className="opacity-70">Change</span>
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200"
    >
      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
      Back
    </button>
  );
}

export default function PromoPage() {
  const [stats, setStats] = React.useState<PromoStats | null>(null);
  const [step, setStep] = React.useState<Step>(1);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [company, setCompany] = React.useState(''); // honeypot
  const [platform, setPlatform] = React.useState<PromoPlatform | null>(null);
  const [outcome, setOutcome] = React.useState<Outcome>({ kind: 'idle' });
  const nameRef = React.useRef<HTMLInputElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const stepped = React.useRef(false);

  const loadStats = React.useCallback((signal?: AbortSignal) => {
    return fetchPromoStats(signal).then((result) => {
      if (signal?.aborted) return;
      setStats(result);
    });
  }, []);

  React.useEffect(() => {
    const controller = new AbortController();
    loadStats(controller.signal);
    trackEvent('promo_page_view', { page_path: '/plus-free' });
    return () => controller.abort();
  }, [loadStats]);

  // Pre-select the platform that matches the device the page is open on -- most
  // people arrive from a phone and are about to pick that one anyway.
  React.useEffect(() => {
    if (platform) return;
    const ua = navigator.userAgent;
    const guess: PromoPlatform | null = /android/i.test(ua)
      ? 'android'
      : /iphone|ipad|ipod/i.test(ua) || (/Mac/.test(ua) && navigator.maxTouchPoints > 1)
        ? 'ios'
        : null;
    if (guess) setPlatform(guess);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!stepped.current) {
      stepped.current = true;
      return;
    }
    if (step === 2) {
      nameRef.current?.focus();
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const availablePlatforms = PROMO_PLATFORMS.filter((entry) => entry.enabled);
  const remainingFor = (id: PromoPlatform) => stats?.platforms?.[id]?.remaining ?? null;
  // Only treat a platform as empty when the API gave us a real zero. A failed
  // stats fetch must not lock the form behind "All claimed".
  const soldOut = stats !== null && stats.remaining <= 0;
  const platformOut = platform !== null && remainingFor(platform) === 0;
  const detailsReady = name.trim().length > 0 && looksLikeEmail(email);

  function goTo(next: Step) {
    setOutcome({ kind: 'idle' });
    setStep(next);
  }

  function advanceFromPlatform(event: React.FormEvent) {
    event.preventDefault();
    if (!platform || platformOut) {
      setOutcome({ kind: 'error', message: ERRORS.invalid_platform });
      return;
    }
    goTo(2);
  }

  function advanceFromDetails(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setOutcome({ kind: 'error', message: ERRORS.invalid_name });
      nameRef.current?.focus();
      return;
    }
    if (!looksLikeEmail(email)) {
      setOutcome({ kind: 'error', message: ERRORS.invalid_email });
      return;
    }
    goTo(3);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (outcome.kind === 'sending') return;

    if (!platform || platformOut) {
      setOutcome({ kind: 'error', message: ERRORS.invalid_platform });
      setStep(1);
      return;
    }
    if (!name.trim() || !looksLikeEmail(email)) {
      setOutcome({ kind: 'error', message: !name.trim() ? ERRORS.invalid_name : ERRORS.invalid_email });
      setStep(2);
      return;
    }

    setOutcome({ kind: 'sending' });
    trackEvent('promo_claim_submit', { promo_platform: platform });

    try {
      const response = await fetch('/api/promo/claim', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, platform, company, utm: campaignParams() }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        const key = data?.error ?? 'server_error';
        setOutcome({ kind: 'error', message: ERRORS[key] ?? ERRORS.server_error });
        trackEvent('promo_claim_error', { promo_error: key });
        if (key === 'invalid_platform' || key === 'sold_out') setStep(1);
        if (key === 'invalid_name' || key === 'invalid_email') setStep(2);
        loadStats();
        return;
      }

      try {
        window.localStorage.setItem(CLAIMED_KEY, '1');
      } catch {
        // Only used to keep the toast away afterwards; not worth failing over.
      }

      setOutcome(
        data.status === 'already_claimed'
          ? { kind: 'already', email: data.email, platform: data.platform }
          : { kind: 'sent', email: data.email, platform: data.platform }
      );
      trackEvent('promo_claim_success', {
        promo_platform: data.platform,
        promo_status: data.status,
      });
      loadStats();
    } catch {
      setOutcome({ kind: 'error', message: ERRORS.server_error });
    }
  }

  const done = outcome.kind === 'sent' || outcome.kind === 'already';
  const chosen = availablePlatforms.find((entry) => entry.id === platform);

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav variant="minimal" />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 md:px-10">
          <header className="text-center animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0d2b57]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0d2b57] dark:bg-blue-300/10 dark:text-blue-300">
              <Gift className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
              {PROMO_PAGE.eyebrow}
            </span>
            <h1 className="mt-5 text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
              {PROMO_PAGE.h1}
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
              {PROMO_PAGE.intro}
            </p>
          </header>

          {/* Live pool. These are counted in the database at request time, not
              baked into the page, so they are the real remaining numbers. */}
          <section aria-label="Codes remaining" className="mt-8 grid grid-cols-3 gap-3 sm:mt-10">
            <StatTile
              label="Codes left"
              value={stats ? stats.remaining.toLocaleString() : '—'}
              muted={soldOut}
            />
            {availablePlatforms.map((entry) => {
              const left = remainingFor(entry.id);
              return (
                <StatTile
                  key={entry.id}
                  label={entry.label}
                  value={left === null ? '—' : left.toLocaleString()}
                  muted={left === 0}
                />
              );
            })}
          </section>

          {done ? (
            <section className="mt-8 rounded-3xl border border-neutral-200/80 bg-white p-6 text-center sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0d2b57]/8 text-[#0d2b57] dark:bg-blue-300/10 dark:text-blue-300">
                <MailCheck className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
                {outcome.kind === 'already' ? 'You already have a code' : 'Check your inbox'}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                {outcome.kind === 'already' ? (
                  <>
                    We sent one to <strong className="text-neutral-800 dark:text-neutral-200">{outcome.email}</strong>{' '}
                    already. It is one code per email, so search your inbox for “Fezer Plus” — including
                    the spam folder.
                  </>
                ) : (
                  <>
                    Your code is on its way to{' '}
                    <strong className="text-neutral-800 dark:text-neutral-200">{outcome.email}</strong>. Open
                    it on your {outcome.platform === 'ios' ? 'iPhone or iPad' : 'Android phone'} and tap the
                    redeem button — the {outcome.platform === 'ios' ? 'App Store' : 'Play Store'} fills the
                    code in for you.
                  </>
                )}
              </p>
              <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                Nothing after a few minutes? Check spam, then{' '}
                <a
                  href="mailto:hello@fezer.app?subject=Fezer%20Plus%20promo%20code"
                  className="font-medium text-[#0d2b57] underline underline-offset-2 dark:text-blue-300"
                >
                  email us
                </a>{' '}
                and we will resend the same code.
              </p>
            </section>
          ) : soldOut ? (
            <section className="mt-8 rounded-3xl border border-neutral-200/80 bg-white p-6 text-center sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Every code is gone</h2>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                All of them have been claimed. Fezer is still free to plan and track without an
                account, and Plus has a 7-day trial on the yearly plan.
              </p>
              <a
                href="/start"
                className="mt-6 inline-block rounded-full bg-[#0d2b57] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                See what Fezer does
              </a>
            </section>
          ) : (
            <section className="mt-8 rounded-3xl border border-neutral-200/80 bg-white p-5 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
              <StepRail step={step} />

              {/* Honeypot. Hidden from people, irresistible to form bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor="promo-company">Company</label>
                <input
                  id="promo-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </div>

              {step === 1 && (
                <form key="step-platform" onSubmit={advanceFromPlatform} className="mt-8 animate-fade-up">
                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-2xl font-semibold tracking-tight text-neutral-950 outline-none sm:text-[1.75rem] dark:text-white"
                  >
                    Where do you use Fezer?
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                    Codes redeem in that store, so pick the device you actually plan on.
                  </p>

                  <fieldset className="mt-7">
                    <legend className="sr-only">Platform</legend>
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                      {availablePlatforms.map((entry) => {
                        const left = remainingFor(entry.id);
                        const out = left === 0;
                        const active = platform === entry.id && !out;
                        const Icon = entry.icon;
                        return (
                          <button
                            key={entry.id}
                            type="button"
                            disabled={out}
                            onClick={() => {
                              setPlatform(entry.id);
                              setOutcome({ kind: 'idle' });
                            }}
                            aria-pressed={active}
                            className={`btn-press flex min-h-[5.75rem] items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200 sm:p-5 ${
                              out
                                ? 'cursor-not-allowed border-neutral-200 bg-neutral-50 opacity-50 dark:border-neutral-800 dark:bg-neutral-950'
                                : active
                                  ? `${entry.buttonClass} border-transparent shadow-[0_16px_32px_-18px_rgba(13,43,87,0.55)]`
                                  : 'border-neutral-200 bg-white text-neutral-800 shadow-sm hover:border-neutral-300 hover:shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:border-neutral-500'
                            }`}
                          >
                            <span
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                                out
                                  ? 'bg-neutral-200 text-neutral-400 dark:bg-neutral-800'
                                  : active
                                    ? 'bg-white/15 text-white'
                                    : entry.id === 'ios'
                                      ? 'bg-[#0d2b57] text-white'
                                      : 'bg-[#0d4a32] text-white'
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[17px] font-semibold tracking-tight">{entry.label}</span>
                              <span
                                className={`mt-0.5 block text-sm ${
                                  active ? 'text-white/75' : 'text-neutral-500 dark:text-neutral-400'
                                }`}
                              >
                                {out
                                  ? 'All claimed'
                                  : left === null
                                    ? entry.sublabel
                                    : `${left.toLocaleString()} left`}
                              </span>
                            </span>
                            {active && (
                              <Check className="h-5 w-5 shrink-0" strokeWidth={2.6} aria-hidden="true" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {outcome.kind === 'error' && (
                    <p
                      role="alert"
                      className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-3 text-sm leading-relaxed text-red-700 dark:bg-red-500/10 dark:text-red-300"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                      {outcome.message}
                    </p>
                  )}

                  <div className="mt-8">
                    <PrimaryButton disabled={!platform || platformOut}>Continue</PrimaryButton>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form key="step-details" onSubmit={advanceFromDetails} className="mt-8 animate-fade-up">
                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-2xl font-semibold tracking-tight text-neutral-950 outline-none sm:text-[1.75rem] dark:text-white"
                  >
                    Where should we send it?
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                    The code goes to this inbox. One address, one code.
                  </p>

                  {chosen && (
                    <PlatformChip
                      label={chosen.label}
                      Icon={chosen.icon}
                      buttonClass={chosen.buttonClass}
                      onClick={() => goTo(1)}
                    />
                  )}

                  <div className="mt-7 space-y-5">
                    <div>
                      <label
                        htmlFor="promo-name"
                        className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                      >
                        Full name
                      </label>
                      <input
                        ref={nameRef}
                        id="promo-name"
                        name="name"
                        type="text"
                        required
                        maxLength={80}
                        autoComplete="name"
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                          if (outcome.kind === 'error') setOutcome({ kind: 'idle' });
                        }}
                        placeholder="Alex Rivera"
                        className={FIELD}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="promo-email"
                        className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                      >
                        Email
                      </label>
                      <input
                        id="promo-email"
                        name="email"
                        type="email"
                        required
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (outcome.kind === 'error') setOutcome({ kind: 'idle' });
                        }}
                        placeholder="you@example.com"
                        className={FIELD}
                      />
                    </div>
                  </div>

                  {outcome.kind === 'error' && (
                    <p
                      role="alert"
                      className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-3 text-sm leading-relaxed text-red-700 dark:bg-red-500/10 dark:text-red-300"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                      {outcome.message}
                    </p>
                  )}

                  <div className="mt-8 space-y-4">
                    <PrimaryButton disabled={!detailsReady}>Continue</PrimaryButton>
                    <div className="text-center">
                      <BackButton onClick={() => goTo(1)} />
                    </div>
                  </div>
                </form>
              )}

              {step === 3 && (
                <form key="step-confirm" onSubmit={submit} className="mt-8 animate-fade-up">
                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-2xl font-semibold tracking-tight text-neutral-950 outline-none sm:text-[1.75rem] dark:text-white"
                  >
                    Send your free month
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                    We will email the code now. Nothing else, and nothing to cancel.
                  </p>

                  <dl className="mt-7 divide-y divide-neutral-100 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
                      <div className="min-w-0">
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                          Platform
                        </dt>
                        <dd className="mt-1 text-[15px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                          {chosen?.label ?? '—'}
                        </dd>
                      </div>
                      <button
                        type="button"
                        onClick={() => goTo(1)}
                        className="shrink-0 text-sm font-medium text-[#0d2b57] hover:opacity-80 dark:text-blue-300"
                      >
                        Change
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
                      <div className="min-w-0">
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                          Full name
                        </dt>
                        <dd className="mt-1 truncate text-[15px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                          {name.trim()}
                        </dd>
                      </div>
                      <button
                        type="button"
                        onClick={() => goTo(2)}
                        className="shrink-0 text-sm font-medium text-[#0d2b57] hover:opacity-80 dark:text-blue-300"
                      >
                        Change
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
                      <div className="min-w-0">
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                          Email
                        </dt>
                        <dd className="mt-1 truncate text-[15px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                          {email.trim()}
                        </dd>
                      </div>
                      <button
                        type="button"
                        onClick={() => goTo(2)}
                        className="shrink-0 text-sm font-medium text-[#0d2b57] hover:opacity-80 dark:text-blue-300"
                      >
                        Change
                      </button>
                    </div>
                  </dl>

                  {outcome.kind === 'error' && (
                    <p
                      role="alert"
                      className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-3 text-sm leading-relaxed text-red-700 dark:bg-red-500/10 dark:text-red-300"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                      {outcome.message}
                    </p>
                  )}

                  <div className="mt-8 space-y-4">
                    <PrimaryButton busy={outcome.kind === 'sending'}>
                      {outcome.kind === 'sending' ? PROMO_PAGE.ctaBusy : PROMO_PAGE.cta}
                    </PrimaryButton>
                    <p className="text-center text-xs leading-relaxed text-neutral-400 dark:text-neutral-500">
                      One code per email. It works once, on one account.
                    </p>
                    <div className="text-center">
                      <BackButton onClick={() => goTo(2)} />
                    </div>
                  </div>
                </form>
              )}
            </section>
          )}

          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
              What the month unlocks
            </h2>
            <ul className="mt-4 space-y-2.5">
              {PLUS_INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#0d2b57] dark:text-blue-300"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  <span className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <ul className="space-y-2">
              {PROMO_PAGE.finePrint.map((line) => (
                <li key={line} className="text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-500">
                  {line}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
