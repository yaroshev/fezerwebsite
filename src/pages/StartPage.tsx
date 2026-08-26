import React from 'react';
import { Check } from 'lucide-react';
import Nav from '../components/Nav';
import AppStoreButton from '../components/AppStoreButton';
import BetaAccessButton from '../components/BetaAccessButton';
import SiteFooter from '../components/SiteFooter';
import VideoEmbed from '../components/VideoEmbed';
import {
  HERO_CHIP,
  PLUS_AVAILABILITY,
  PLUS_INCLUDES,
  PRICING,
  SCREENSHOTS,
  START_VIDEO,
  trackEvent,
} from '../seo/constants';

const LOOP_STEPS = [
  {
    stage: 'PLAN',
    heading: 'Decide where your time should go.',
    body: 'Organize the work that matters, then put it on the day as time blocks. Repeating routines are already there when you wake up.',
    image: SCREENSHOTS.goalPlanner,
    alt: 'Fezer plans organized under a Personal Wellbeing area',
  },
  {
    stage: 'REALITY',
    heading: 'Capture what actually happens.',
    body: 'One tap on Begin starts a session. End drops it onto the day. No timers to configure.',
    image: SCREENSHOTS.timeTracker,
    alt: 'Fezer Now screen with a Begin button below the current commitment',
  },
  {
    stage: 'FEEDBACK',
    heading: 'See where your intentions and reality diverged.',
    body: 'Planned on one side, tracked on the other. Late starts, overruns, and work that was never planned become obvious.',
    image: SCREENSHOTS.timeBlocking,
    alt: 'Fezer Compare mode with planned blocks beside tracked time on the same hours',
  },
] as const;

const PLUS_HIGHLIGHTS = PLUS_INCLUDES.slice(0, 4);

function StoreButtons({ location }: { location: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
      <AppStoreButton location={location} eventName="start_app_store_click" />
      <BetaAccessButton location={location} eventName="start_google_play_click" />
    </div>
  );
}

export default function StartPage() {
  React.useEffect(() => {
    trackEvent('start_page_view', {
      page_location: window.location.href,
      page_path: '/start',
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav variant="minimal" />

      <main>
        <header className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-12 text-center">
          <div className="flex flex-col items-center animate-fade-up">
            <img
              src="/fezer-app-icon.png"
              alt="Fezer app icon"
              width={1024}
              height={1024}
              className="h-14 w-14 rounded-[22%] object-cover shadow-xl shadow-[#0d2b57]/25 sm:h-16 sm:w-16"
            />
            <h1 className="mt-6 text-[1.75rem] font-semibold tracking-tight leading-[1.15] text-neutral-950 sm:text-4xl sm:leading-[1.12] md:text-[2.75rem] dark:text-white">
              Plan your day. Track what actually happened. Learn from the difference.
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
              Fezer is a personal planning and time-tracking app built around one simple loop:
            </p>
            <p className="mt-3 text-base font-semibold tracking-tight text-neutral-900 sm:text-lg dark:text-neutral-100">
              Plan → Track → Compare → Improve
            </p>
            <div className="mt-8 sm:mt-10">
              <StoreButtons location="start-hero" />
            </div>
            <p className="mt-4 text-sm text-neutral-400 dark:text-neutral-500">{HERO_CHIP}</p>
          </div>
        </header>

        <section
          id="video"
          aria-labelledby="start-video-heading"
          className="w-full bg-white dark:bg-neutral-950"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
            <h2 id="start-video-heading" className="sr-only">
              See Fezer in {START_VIDEO.durationLabel}
            </h2>
            <VideoEmbed
              location="start"
              video={START_VIDEO}
              autoPlay
              loop={false}
              size="large"
              eventName="start_video_play"
            />
            <p className="mt-5 text-center text-sm text-neutral-500 dark:text-neutral-400">
              Plays muted. Use the controls if you want sound.
            </p>
          </div>
        </section>

        <section aria-labelledby="start-loop-heading" className="w-full">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#0d2b57] dark:text-blue-300">
              Plan → Reality → Feedback
            </p>
            <h2
              id="start-loop-heading"
              className="mt-3 text-center text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight"
            >
              The whole product is this loop
            </h2>

            <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-24">
              {LOOP_STEPS.map((step, index) => {
                const mediaOnLeft = index % 2 === 1;
                return (
                  <article
                    key={step.stage}
                    className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(260px,340px)] lg:gap-16"
                  >
                    <div className={mediaOnLeft ? 'lg:order-2' : ''}>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d2b57] dark:text-blue-300">
                        {step.stage}
                      </p>
                      <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                        {step.heading}
                      </h3>
                      <p className="mt-4 max-w-2xl text-[15px] sm:text-base md:text-lg text-neutral-600 leading-relaxed dark:text-neutral-400">
                        {step.body}
                      </p>
                    </div>
                    <img
                      src={step.image}
                      alt={step.alt}
                      width={920}
                      height={1996}
                      loading="lazy"
                      decoding="async"
                      className={`mx-auto w-full max-w-[280px] sm:max-w-[320px] rounded-3xl border border-neutral-200/80 shadow-xl shadow-[#0d2b57]/10 dark:border-neutral-800 ${
                        mediaOnLeft ? 'lg:order-1' : ''
                      }`}
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full bg-[#0d2b57] text-white">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-24 text-center">
            <p className="font-vision text-[1.65rem] leading-snug tracking-tight sm:text-3xl md:text-4xl md:leading-snug">
              Your plans are hypotheses. Reality is the data.
            </p>
            <p className="mt-5 text-[15px] sm:text-base text-white/70">
              Fezer helps you learn from the difference.
            </p>
          </div>
        </section>

        <section id="plus" className="w-full bg-white dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              Use Fezer free. Upgrade when you want more.
            </h2>
            <p className="mt-4 text-[15px] sm:text-base text-neutral-600 leading-relaxed dark:text-neutral-400">
              Planning and tracking stay free, with no account. Fezer Plus is{' '}
              {PRICING.perMonthOnYearly}/month billed yearly at {PRICING.yearly.display}, or{' '}
              {PRICING.monthly.display} a month. {PRICING.trialDays} days free on the yearly plan.
            </p>
            <ul className="mt-8 mx-auto max-w-md space-y-3 text-left">
              {PLUS_HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#0d2b57] dark:text-blue-300"
                    aria-hidden="true"
                  />
                  <span className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            {!PLUS_AVAILABILITY.ios && (
              <p className="mt-6 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                Fezer Plus is on Google Play today. The iPhone and iPad version is with Apple for
                review — until it clears, the App Store build is the free tier.
              </p>
            )}
            <div className="mt-8">
              <StoreButtons location="start-plus" />
            </div>
          </div>
        </section>

        <section className="w-full">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-24 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Own your day.</h2>
            <p className="mt-4 text-lg sm:text-xl font-medium tracking-tight text-neutral-800 dark:text-neutral-200">
              Plan it. Track it. Learn from it.
            </p>
            <div className="mt-8 sm:mt-10">
              <StoreButtons location="start-final" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
