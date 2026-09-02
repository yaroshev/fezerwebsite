import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Nav from '../components/Nav';
import AppStoreButton from '../components/AppStoreButton';
import BetaAccessButton from '../components/BetaAccessButton';
import VisionStatementLightbox from '../components/VisionStatementLightbox';
import SiteFooter from '../components/SiteFooter';
import HeroVideo from '../components/HeroVideo';
import Pricing from '../components/Pricing';
import FeatureCarousel from '../components/FeatureCarousel';
import ArenaStrip from '../components/ArenaStrip';

export default function Home() {
  const [activeSection, setActiveSection] = React.useState<string>('top');
  const [visionOpen, setVisionOpen] = React.useState(false);

  /**
   * Which section the nav highlights.
   *
   * Read straight from where the sections sit relative to a line a third of the
   * way down the viewport: the furthest one that has crossed it is the one you
   * are in. An IntersectionObserver used to do this, and it had a bug -- `#top`
   * wraps the whole page, so it is always intersecting and never fires again on
   * the way back up, which left "Features" lit at the top of the page. Position
   * is unambiguous in both directions.
   */
  React.useEffect(() => {
    const ids = ['features', 'privacy'];

    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = 'top';
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      }
      setActiveSection(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activeId={activeSection} />

      <main id="top" className="relative">
        {/* Hero */}
        <div className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden">
          <HeroVideo />
          <div className="relative mx-auto flex w-full max-w-xl flex-col items-center px-6 py-16 sm:py-20">
            <div className="flex w-full flex-col items-center text-center animate-fade-up">
              <img
                src="/fezer-app-icon.png"
                alt="Fezer app icon"
                width={1024}
                height={1024}
                className="h-14 w-14 rounded-[22%] object-cover shadow-xl shadow-[#0d2b57]/25 sm:h-16 sm:w-16"
              />
              <h1 className="mt-6 text-[1.75rem] font-semibold tracking-tight leading-[1.15] text-neutral-950 sm:text-4xl sm:leading-[1.12] md:text-[2.75rem] dark:text-white">
                Fezer - Own Your Day
              </h1>

              <div className="mt-5 max-w-md space-y-1.5 sm:mt-6">
                <p className="text-lg leading-snug text-neutral-800 sm:text-xl dark:text-neutral-200">
                  Live a life you mean to live.
                </p>
                <p className="text-[15px] leading-snug text-neutral-500 sm:text-base dark:text-neutral-400">
                  Infrastructure for humanity&rsquo;s next frontier.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:mt-10 sm:gap-4">
                <AppStoreButton location="hero" />
                <BetaAccessButton location="hero" />
              </div>

              <button
                type="button"
                onClick={() => setVisionOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={visionOpen}
                className="nav-link relative mt-6 py-1 text-sm font-medium text-[#0d2b57] transition-colors duration-200 hover:text-[#071d3c] touch-manipulation dark:text-[#9ec7ff] dark:hover:text-white"
              >
                View vision statement
              </button>
            </div>
          </div>
        </div>

        {/* Features, one at a time */}
        <section id="features" className="w-full">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
            <FeatureCarousel />
          </div>
        </section>

        <ArenaStrip />

        <Pricing />

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
                    Your plans, schedule, tracking history, notes, and attachments stay on your
                    phone or tablet, on iOS and Android alike. There is no account, no sign-in, and
                    no cloud copy of your day.
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
      <VisionStatementLightbox open={visionOpen} onClose={() => setVisionOpen(false)} />
    </div>
  );
}
