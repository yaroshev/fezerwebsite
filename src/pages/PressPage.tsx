import { Download, ExternalLink } from 'lucide-react';
import Nav from '../components/Nav';
import AppStoreButton from '../components/AppStoreButton';
import BetaAccessButton from '../components/BetaAccessButton';
import SiteFooter from '../components/SiteFooter';
import VideoEmbed from '../components/VideoEmbed';
import { INTRO_VIDEO, SCREENSHOTS, trackEvent } from '../seo/constants';

const FACTS: { label: string; value: string }[] = [
  { label: 'Name', value: 'Fezer Planner (Fezer)' },
  { label: 'Category', value: 'Productivity -  day planner, time tracker, goal planner' },
  { label: 'Developer', value: 'Yaroslav Shevchenko, independent developer' },
  { label: 'Released', value: 'iPhone and iPad July 25, 2026; Android August 2026' },
  { label: 'Platforms', value: 'iPhone and iPad (iOS / iPadOS 26 or later); Android (8.0 or later)' },
  { label: 'Price', value: 'Free to plan and track. Fezer Plus $5.99/month or $55.99/year, 7-day free trial on the yearly plan. No ads.' },
  { label: 'Version', value: 'iOS 3.0.5; Android 1.1.6' },
  { label: 'Languages', value: '40 languages on iPhone and iPad; English on Android' },
  { label: 'Privacy', value: 'Plans stay on device. No account, no ads. Anonymous product analytics; see the Privacy Policy.' },
  { label: 'Website', value: 'fezer.app' },
];

const ASSETS: { label: string; desc: string; href: string }[] = [
  {
    label: 'App icon',
    desc: 'PNG, 1024x1024',
    href: '/fezer-app-icon.png',
  },
  {
    label: 'Screenshot: time blocking',
    desc: 'Planned day beside tracked time (WebP)',
    href: SCREENSHOTS.timeBlocking,
  },
  {
    label: 'Screenshot: time tracker',
    desc: 'Now view with one-tap tracking (WebP)',
    href: SCREENSHOTS.timeTracker,
  },
  {
    label: 'Screenshot: goal planner',
    desc: 'Plans organized under areas (WebP)',
    href: SCREENSHOTS.goalPlanner,
  },
  {
    label: 'Screenshot: vision board',
    desc: 'Want and Need pins on a board (WebP)',
    href: SCREENSHOTS.visionBoard,
  },
  {
    label: 'Social card',
    desc: 'PNG, 1200x630',
    href: '/og/default.png',
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activePath="/press" />

      <main className="flex-1">
        {/* Hero */}
        <header className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0d2b57] dark:text-blue-300">
              Press kit
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Fezer, for people writing about it
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-neutral-500 leading-relaxed dark:text-neutral-400">
              Everything on this page may be used freely in coverage of Fezer: facts, copy, the
              icon, screenshots and the launch video. No permission needed, no embargo.
            </p>
          </div>
        </header>

        {/* Boilerplate + video */}
        <section className="w-full bg-white dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-10 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_minmax(280px,340px)] lg:gap-16 items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">In one sentence</h2>
                <p className="mt-4 text-[15px] sm:text-base text-neutral-600 leading-relaxed max-w-2xl dark:text-neutral-400">
                  Fezer is a free-to-plan, fully on-device day planner for iPhone, iPad and Android
                  that shows the day you planned next to the day you actually had.
                </p>

                <h2 className="mt-10 text-2xl sm:text-3xl font-semibold tracking-tight">
                  In one paragraph
                </h2>
                <p className="mt-4 text-[15px] sm:text-base text-neutral-600 leading-relaxed max-w-2xl dark:text-neutral-400">
                  Fezer is a day planner, time tracker and goal planner built around a loop most
                  planners skip: plan the day in time blocks, track what actually happens with one
                  tap, then compare the two side by side so tomorrow’s plan starts from evidence.
                  Above the day sits a planning layer -  areas, plans, steps and vision boards -
                  whose steps commit directly onto the schedule. The
                  app has no accounts: everything a user plans and tracks stays on their
                  device. We use anonymous product analytics to keep the app working; we
                  cannot read a user's schedule.
                </p>

                <h2 className="mt-10 text-2xl sm:text-3xl font-semibold tracking-tight">
                  Angles that hold up
                </h2>
                <ul className="mt-4 space-y-3 max-w-2xl">
                  {[
                    'Plan vs. actual: almost every planner records intentions; Fezer also records the day as it ran and confronts the two -  the core loop is calibration, not organization.',
                    'Free where it counts, structurally: with no servers, sync or AI infrastructure to fund, the free tier is a working planner rather than a demo. What Plus charges for is the analysis layer, not access. Fezer Plus pays for the developer, not for servers.',
                    'Privacy as architecture: no account, no cloud copy of the day. Plans stay on the device. Product analytics are anonymous and cannot read a schedule.',
                    'A 3.5 MB app in 2026: a full planner, tracker, goal system and vision board smaller than most app updates.',
                    'Built by one person: designed, developed and shipped by a solo independent developer.',
                  ].map((point) => (
                    <li
                      key={point.slice(0, 40)}
                      className="flex gap-3 text-[15px] text-neutral-600 leading-relaxed dark:text-neutral-400"
                    >
                      <span
                        className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d2b57] dark:bg-blue-300"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mx-auto w-full lg:sticky lg:top-24">
                <VideoEmbed location="press" />
                <p className="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  The launch video -  free to embed or clip.{' '}
                  <a
                    href={INTRO_VIDEO.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#0d2b57] hover:opacity-80 dark:text-blue-300"
                  >
                    Watch on YouTube
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fact sheet */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Fact sheet</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-200/70 dark:border-neutral-800">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <tbody>
                {FACTS.map((fact, i) => (
                  <tr
                    key={fact.label}
                    className={i === 0 ? '' : 'border-t border-neutral-200/70 dark:border-neutral-800'}
                  >
                    <th
                      scope="row"
                      className="w-[32%] bg-neutral-50 px-5 py-4 text-sm font-semibold tracking-tight align-top dark:bg-neutral-900"
                    >
                      {fact.label}
                    </th>
                    <td className="px-5 py-4 text-[15px] text-neutral-600 align-top dark:text-neutral-400">
                      {fact.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Assets */}
        <section className="w-full bg-white dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Assets</h2>
            <p className="mt-3 max-w-3xl text-[15px] text-neutral-600 leading-relaxed dark:text-neutral-400">
              Right-click and save, or open in a new tab. All assets are current production images
              from the app and this site.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ASSETS.map((asset) => (
                <li key={asset.href}>
                  <a
                    href={asset.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('press_asset_open', { asset: asset.label })}
                    className="flex h-full items-start gap-3 rounded-2xl border border-neutral-200/60 bg-[#fafafa] p-5 hover:border-neutral-300 hover:bg-white transition-colors dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
                  >
                    <Download
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#0d2b57] dark:text-blue-300"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-[15px] font-semibold tracking-tight">
                        {asset.label}
                      </span>
                      <span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400">
                        {asset.desc}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <div className="rounded-3xl bg-[#0d2b57] p-8 sm:p-12 text-white">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Questions, interviews, review builds
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] sm:text-base text-blue-100 leading-relaxed">
              The fastest route to the developer is the Send feedback form in the footer -  include
              your outlet and an email address and you will hear back. The app itself is free on
              the App Store, so no review code is needed.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <AppStoreButton location="press-cta" className="!bg-white !text-[#0d2b57]" />
              <BetaAccessButton
                location="press-cta"
                className="!border-white/40 !bg-transparent !text-white hover:!bg-white/10 dark:!border-white/40 dark:!bg-transparent dark:!text-white"
              />
              <a
                href={INTRO_VIDEO.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('outbound_click', { link_location: 'press-youtube-channel' })}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-100 hover:text-white transition-colors"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Fezer on YouTube
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
