import React from 'react';
import { Zap, Calendar, Target, Timer, PieChart, Paperclip, ShieldCheck } from 'lucide-react';
import Nav from '../components/Nav';
import AppStoreButton from '../components/AppStoreButton';
import BetaAccessButton from '../components/BetaAccessButton';
import SiteFooter from '../components/SiteFooter';
import VideoEmbed from '../components/VideoEmbed';
import { SCREENSHOTS } from '../seo/constants';

const FEATURES = [
  {
    title: 'Now',
    desc: 'One glance shows your current commitment: what is live, what is next, and what is due.',
    Icon: Zap,
  },
  {
    title: 'Schedule',
    desc: 'Plan your day in time blocks, then switch to Track and Compare to see how the day really went.',
    Icon: Calendar,
  },
  {
    title: 'Goals & Fronts',
    desc: 'Organize goals into fronts, break them into steps, and commit steps straight onto your schedule.',
    Icon: Target,
  },
  {
    title: 'Time tracking',
    desc: 'Start tracking with one tap and add checkpoints along the way to capture how the work unfolded.',
    Icon: Timer,
  },
  {
    title: 'Analytics',
    desc: 'See where your time actually went, broken down by front and goal across the day or week.',
    Icon: PieChart,
  },
  {
    title: 'Notes & attachments',
    desc: 'Attach photos and files to steps and blocks. Everything is stored locally on your device.',
    Icon: Paperclip,
  },
];

type SectionLink = { href: string; label: string };

const CATEGORY_SECTIONS: {
  id: string;
  heading: string;
  paragraphs: string[];
  links: SectionLink[];
  image?: { src: string; alt: string };
}[] = [
  {
    id: 'plan',
    heading: 'Plan your day with time blocks',
    paragraphs: [
      'Fezer\u2019s Schedule turns your day into a timeline of time blocks and deadline pins. Routines repeat automatically -  every day, weekdays or weekly -  so the structure of a good day is already in place when you wake up.',
      'The Now view then keeps a single commitment in front of you: what is live, what comes next and what is due.',
    ],
    links: [
      { href: '/time-blocking-app', label: 'Explore Fezer\u2019s time-blocking planner' },
      { href: '/day-planner-app', label: 'See Fezer as a day planner' },
    ],
    image: {
      src: SCREENSHOTS.timeBlocking,
      alt: 'Fezer day planner showing scheduled time blocks beside tracked time',
    },
  },
  {
    id: 'track',
    heading: 'Track where your time actually goes',
    paragraphs: [
      'One tap on Begin starts a tracked session; checkpoints capture how the work unfolded; End drops the session onto your schedule as a tracked block. No timers to configure, no categories to maintain.',
      'Tracked time sits right next to the plan, so the difference between intention and reality is always one glance away.',
    ],
    links: [{ href: '/time-tracker', label: 'See how the personal time tracker works' }],
    image: {
      src: SCREENSHOTS.timeTracker,
      alt: 'Fezer time tracker showing the Begin button below the current commitment',
    },
  },
  {
    id: 'goals',
    heading: 'Turn goals into scheduled steps',
    paragraphs: [
      'Goals in Fezer are organized into fronts -  the areas of your life -  and broken into ordered steps. Each step can be committed onto your schedule: pinned as a deadline or blocked as time to work on it.',
      'That commit is the difference between a goal you wrote down and a goal that shows up in your Tuesday.',
    ],
    links: [{ href: '/goal-planner', label: 'Create a goal plan' }],
    image: {
      src: SCREENSHOTS.goalPlanner,
      alt: 'Fezer goal planner with goals organized under a Personal Wellbeing front',
    },
  },
  {
    id: 'vision',
    heading: 'Build a vision for every area of life',
    paragraphs: [
      'Every front and goal can carry its own vision board -  pins for what you want, need, think and reflect on, with lenses for dreaming, planning and remembering.',
      'Because the board lives beside your goals and schedule, vision and execution finally share one place.',
    ],
    links: [{ href: '/vision-board-app', label: 'Build a digital vision board' }],
    image: {
      src: SCREENSHOTS.visionBoard,
      alt: 'Fezer vision board with Want and Need pins for personal goals',
    },
  },
  {
    id: 'review',
    heading: 'Review, compare and improve',
    paragraphs: [
      'Compare mode puts the planned day and the tracked day side by side. Analytics rolls the same data up by front and goal across the day, week, month or year -  plan versus reality, in numbers.',
      'Each week\u2019s plan starts from evidence about the last one. That loop is how days actually get better.',
    ],
    links: [{ href: '/weekly-planner', label: 'Plan and review your week' }],
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = React.useState<string>('top');

  // Track active section for nav highlighting
  React.useEffect(() => {
    const sections = ['top', 'features', 'privacy'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') || 'top';
            setActiveSection(id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activeId={activeSection} />

      <main id="top" className="relative">
        {/* Hero */}
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-10 pt-14 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
          <div className="flex flex-col items-center text-center animate-fade-up">
            <img
              src="/fezer-app-icon.png"
              alt="Fezer app icon"
              width={1024}
              height={1024}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-[22%] shadow-2xl shadow-[#0d2b57]/25 animate-float"
            />
            <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight max-w-3xl">
              Own your day with Fezer
            </h1>
            <p className="mt-5 max-w-2xl text-lg sm:text-xl md:text-2xl text-neutral-500 leading-relaxed dark:text-neutral-400">
              A private day planner, time tracker and goal planner that connects what you want with
              what you do each day.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="flex flex-row flex-wrap items-center justify-center gap-3">
                <AppStoreButton location="hero" />
                <BetaAccessButton location="hero" />
              </div>
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                Free · iPhone &amp; iPad · No account required
              </span>
            </div>
          </div>
        </div>

        {/* Launch video */}
        <section id="video" className="w-full bg-white dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(280px,340px)] lg:gap-16">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                  See Fezer in 29 seconds
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] sm:text-base md:text-lg text-neutral-600 leading-relaxed dark:text-neutral-400">
                  Plan the day in time blocks, track what actually happens with one tap, and see
                  the two side by side. The whole idea of Fezer fits in one short video.
                </p>
                <p className="mt-3 max-w-2xl text-[15px] sm:text-base text-neutral-500 leading-relaxed dark:text-neutral-400">
                  Nothing loads from YouTube until you press play.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  <a
                    href="/guides"
                    className="text-[15px] font-medium text-[#0d2b57] hover:opacity-80 transition-opacity dark:text-blue-300"
                  >
                    Read the planning guides →
                  </a>
                </div>
              </div>
              <VideoEmbed location="home" />
            </div>
          </div>
        </section>

        {/* Category sections */}
        <div className="w-full bg-white dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 space-y-16 sm:space-y-24">
            {CATEGORY_SECTIONS.map((section, index) => (
              <div
                key={section.id}
                className={`grid items-center gap-8 lg:gap-16 ${
                  section.image ? 'lg:grid-cols-[1fr_minmax(260px,340px)]' : ''
                }`}
              >
                <div className={section.image && index % 2 === 1 ? 'lg:order-2' : ''}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((text) => (
                    <p
                      key={text.slice(0, 32)}
                      className="mt-4 max-w-2xl text-[15px] sm:text-base md:text-lg text-neutral-600 leading-relaxed dark:text-neutral-400"
                    >
                      {text}
                    </p>
                  ))}
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {section.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-[15px] font-medium text-[#0d2b57] hover:opacity-80 transition-opacity dark:text-blue-300"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                </div>
                {section.image && (
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    width={920}
                    height={1996}
                    loading="lazy"
                    className={`mx-auto w-full max-w-[260px] sm:max-w-[300px] rounded-3xl border border-neutral-200/80 shadow-xl shadow-[#0d2b57]/10 dark:border-neutral-800 ${
                      index % 2 === 1 ? 'lg:order-1' : ''
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Feature grid */}
        <section id="features" className="w-full">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
            <div className="mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-semibold tracking-tight">
                One place for your day
              </h2>
              <p className="mt-2 sm:mt-3 text-neutral-500 max-w-2xl text-[15px] sm:text-base leading-relaxed dark:text-neutral-400">
                Fezer brings your commitments, schedule, and goals together so you always know what
                to work on now.
              </p>
            </div>
            {/* Mobile: horizontal scroll carousel */}
            <div className="md:hidden -mx-4 overflow-x-auto mobile-feature-scroll pb-2">
              <div className="flex gap-4 pl-4 pr-4" style={{ width: 'max-content' }}>
                {FEATURES.map(({ title, desc, Icon }) => (
                  <div
                    key={title}
                    className="mobile-feature-snap w-[280px] shrink-0 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm active:scale-[0.99] transition-transform dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none"
                    aria-label={title}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#0d2b57] text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
                    <p className="mt-2 text-[15px] text-neutral-500 leading-relaxed dark:text-neutral-400">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Desktop: grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map(({ title, desc, Icon }, i) => (
                <div
                  key={title}
                  className="rounded-2xl border border-neutral-200/60 bg-white p-5 hover-lift opacity-0 animate-fade-up dark:border-neutral-800 dark:bg-neutral-900"
                  style={{ animationDelay: `${0.15 + i * 0.05}s` }}
                  aria-label={title}
                >
                  <div className="card-icon-hover w-10 h-10 rounded-xl bg-[#0d2b57] text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed dark:text-neutral-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy" className="w-full bg-white dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
            <div className="rounded-3xl border border-neutral-200/60 bg-gradient-to-br from-[#e8f1ff] to-[#fafafa] p-6 sm:p-10 md:p-12 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0d2b57] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Private by design</h2>
                  <p className="mt-3 text-neutral-600 max-w-3xl text-[15px] sm:text-base leading-relaxed dark:text-neutral-400">
                    Your goals, schedule, tracking history, notes, and attachments stay on your
                    iPhone or iPad. There is no account, no sign-in, and no cloud copy of your day.
                    We use anonymous product analytics to keep the app working. We cannot read what
                    you wrote, and we do not sell any of it.
                  </p>
                  <a
                    href="/privacypolicy"
                    className="btn-press mt-6 inline-flex items-center justify-center rounded-full bg-[#0d2b57] text-white px-6 py-3 text-sm font-semibold"
                  >
                    Read the full Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
