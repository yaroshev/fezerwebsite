import React from 'react';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeleteAccount from './pages/DeleteAccount';
import { Clock, CheckSquare, QrCode, Boxes, Users, FileText, Download } from 'lucide-react';
import PhoneSlideshow from './components/PhoneSlideshow';
import Nav from './components/Nav';

function App() {
  const [activeSection, setActiveSection] = React.useState<string>('top');
  // Track active section for nav (home page only)
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '') return;

    const sections = ['top', 'features', 'contact'];
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

  // Minimal fallback for invite/task links
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/invite/')) {
      const token = path.split('/invite/')[1];
      document.title = 'Fezer Task Invite';
      const deepLink = `me.fezer://invite/${token}`;
      // Try to open the app; if it fails, show TestFlight fallback + instructions
      const el = document.getElementById('web-fallback');
      if (el) {
        el.innerHTML = `Opening Fezer… If nothing happens, <a class="underline" href="https://testflight.apple.com/join/kvGPdcqB" target="_blank" rel="noopener noreferrer">install via TestFlight</a> then return to this link.`;
      }
      // Attempt app open
      const now = Date.now();
      window.location.href = deepLink;
      setTimeout(() => {
        // If still here after ~1s, user likely doesn't have the app installed
        if (Date.now() - now < 1600) {
          window.location.href = 'https://testflight.apple.com/join/kvGPdcqB';
        }
      }, 1200);
    } else if (path.startsWith('/tasks/')) {
      document.title = 'Fezer Task';
      const id = path.split('/tasks/')[1];
      const deepLink = `me.fezer://tasks/${id}`;
      const el = document.getElementById('web-fallback');
      if (el) {
        el.innerHTML = `Opening Fezer… If nothing happens, <a class="underline" href="https://testflight.apple.com/join/kvGPdcqB" target="_blank" rel="noopener noreferrer">install via TestFlight</a> then return to this link.`;
      }
      const now = Date.now();
      window.location.href = deepLink;
      setTimeout(() => {
        if (Date.now() - now < 1600) {
          window.location.href = 'https://testflight.apple.com/join/kvGPdcqB';
        }
      }, 1200);
    }
  }, []);

  // Lightweight routing without react-router
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path === '/privacypolicy') {
      return <PrivacyPolicy />;
    }
    if (path === '/delete-account') {
      return <DeleteAccount />;
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-black flex flex-col">
      <Nav activeId={activeSection} />
      <main id="top" className="relative">
        {/* Mobile hero: Fezer + description above phone, download buttons inline below */}
        <div className="md:hidden min-h-[100dvh] flex flex-col">
          <div className="flex-1 flex flex-col items-center px-5 pt-6 pb-8" style={{ background: 'var(--fezer-hero-mobile)' }}>
            {/* Fezer Beta + description above phone */}
            <div className="flex flex-col items-center text-center animate-fade-up w-full">
              <h1 className="text-[2.25rem] sm:text-[2.75rem] font-semibold tracking-tight text-neutral-900 flex items-center justify-center gap-2">
                Fezer
                <span className="inline-flex items-center rounded-full bg-amber-100/90 text-amber-800 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase" aria-label="Beta">Beta</span>
              </h1>
              <p className="mt-2 text-sm text-neutral-600 leading-snug max-w-[300px]">
                Field operations OS for construction. Time, tasks, tools, supplies, teams, and reports—in one fast app.
              </p>
            </div>
            {/* Phone */}
            <div className="mt-6 animate-fade-up" style={{ animationDelay: '0.08s' }}>
              <PhoneSlideshow className="phone-glow" />
            </div>
            {/* Download buttons inline with icons, right under phone */}
            <div className="mt-5 flex items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: '0.15s' }}>
              <a
                href="https://testflight.apple.com/join/kvGPdcqB"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press flex items-center justify-center gap-2 rounded-2xl bg-[#0d2b57] text-white px-5 py-3.5 min-h-[48px] shadow-lg shadow-[#0d2b57]/20 active:scale-[0.96] transition-transform"
                aria-label="Download Fezer for iOS via TestFlight"
              >
                <Download className="w-6 h-6" strokeWidth={2} />
                <span className="font-semibold text-[15px]">iOS</span>
              </a>
              <a
                href="https://play.google.com/apps/testing/me.fezer"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press flex items-center justify-center gap-2 rounded-2xl border-2 border-neutral-200 bg-white text-neutral-700 px-5 py-3.5 min-h-[48px] active:scale-[0.96] transition-transform"
                aria-label="Join Fezer Android beta via Google Play testing"
              >
                <Download className="w-6 h-6" strokeWidth={2} />
                <span className="font-semibold text-[15px]">Android</span>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop hero: original layout */}
        <div className="hidden md:flex mx-auto w-full max-w-7xl px-6 lg:px-10 items-center min-h-[90vh]">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 items-stretch w-full">
            <div className="md:col-span-2 animate-fade-up">
              <div className="h-full min-h-[520px] rounded-3xl border border-neutral-200/60 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img src="/fezer-logo-transparent-blue.png" alt="Fezer Logo" className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 hover:scale-105 shrink-0" />
                    <div className="flex items-center gap-3">
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-900">Fezer</h1>
                      <span className="inline-flex items-center rounded-full bg-amber-100/80 text-amber-700 px-3 py-1 text-xs font-medium tracking-wide uppercase" aria-label="Beta">Beta</span>
                    </div>
                  </div>
                  <p className="mt-6 text-xl md:text-2xl text-neutral-500 max-w-2xl leading-relaxed">
                    Field operations OS for construction. Time, tasks, tools, supplies, teams, and reports—in one fast app.
                  </p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">Do Great Work</p>
                </div>
                <div className="mt-8 flex flex-row gap-4">
                  <a href="https://testflight.apple.com/join/kvGPdcqB" target="_blank" rel="noopener noreferrer" className="btn-press inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2" aria-label="Download Fezer for iOS via TestFlight">Download for iOS</a>
                  <a href="https://play.google.com/apps/testing/me.fezer" target="_blank" rel="noopener noreferrer" className="btn-press inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 px-6 py-3 text-sm font-medium hover:border-neutral-300 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 transition-colors duration-200" aria-label="Join Fezer Android beta via Google Play testing">Download for Android</a>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative h-full min-h-[520px] flex items-center justify-center">
                <div className="pointer-events-none absolute -top-2 right-6 w-16 h-16 rounded-full opacity-25 blur-2xl -z-10" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(158,199,255,0.55), rgba(13,43,87,0) 60%)' }} aria-hidden="true" />
                <div className="pointer-events-none absolute bottom-10 left-8 w-14 h-14 rounded-full opacity-25 blur-2xl -z-10" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(13,43,87,0.3), rgba(158,199,255,0) 60%)' }} aria-hidden="true" />
                <PhoneSlideshow className="phone-glow" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <section id="features" className="w-full">
        <div id="web-fallback" className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-4 text-sm text-neutral-600"></div>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-semibold tracking-tight text-neutral-900">Built for crews and PMs</h2>
            <p className="mt-2 sm:mt-3 text-neutral-500 max-w-2xl text-[15px] sm:text-base leading-relaxed">Fast, clear, and reliable in the field. Fezer keeps projects moving with accurate data and simple workflows.</p>
          </div>
          {/* Mobile: horizontal scroll carousel */}
          <div className="md:hidden -mx-4 overflow-x-auto mobile-feature-scroll pb-2">
            <div className="flex gap-4 pl-4 pr-4" style={{ width: 'max-content' }}>
              {[
                { title: 'Time tracking', desc: 'Clock in/out and labor allocation—clean and auditable.', Icon: Clock },
                { title: 'Task management', desc: 'Plan daily work, assign, comment, and verify completion.', Icon: CheckSquare },
                { title: 'Tools & QR tracking', desc: 'Scan tools and assets with QR to know where everything is.', Icon: QrCode },
                { title: 'Supplies & inventory', desc: 'Request, receive, and reconcile materials without chaos.', Icon: Boxes },
                { title: 'Teams & permissions', desc: 'Simple roles to keep data secure and responsibilities clear.', Icon: Users },
                { title: 'Reports & blueprints', desc: 'Generate reports and reference drawings right in the app.', Icon: FileText },
              ].map(({ title, desc, Icon }, i) => (
                <div key={title} className="mobile-feature-snap w-[280px] shrink-0 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm active:scale-[0.99] transition-transform" aria-label={title}>
                  <div className="w-11 h-11 rounded-xl bg-[#0d2b57] text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-neutral-900">{title}</h3>
                  <p className="mt-2 text-[15px] text-neutral-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Time tracking', desc: 'Clock in/out and labor allocation—clean and auditable.', Icon: Clock },
              { title: 'Task management', desc: 'Plan daily work, assign, comment, and verify completion.', Icon: CheckSquare },
              { title: 'Tools & QR tracking', desc: 'Scan tools and assets with QR to know where everything is.', Icon: QrCode },
              { title: 'Supplies & inventory', desc: 'Request, receive, and reconcile materials without chaos.', Icon: Boxes },
              { title: 'Teams & permissions', desc: 'Simple roles to keep data secure and responsibilities clear.', Icon: Users },
              { title: 'Reports & blueprints', desc: 'Generate reports and reference drawings right in the app.', Icon: FileText },
            ].map(({ title, desc, Icon }, i) => (
              <div key={title} className="rounded-2xl border border-neutral-200/60 bg-white p-5 hover-lift opacity-0 animate-fade-up" style={{ animationDelay: `${0.15 + i * 0.05}s` }} aria-label={title}>
                <div className="card-icon-hover w-10 h-10 rounded-xl brand-bg text-white flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-neutral-900">{title}</h3>
                <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="w-full bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="rounded-2xl border border-neutral-200/60 bg-gradient-to-br from-[#f8fafc] to-[#fafafa] p-6 sm:p-8 hover-lift transition-all duration-200 hover:border-[#0d2b57]/20 hover:shadow-lg hover:shadow-[#0d2b57]/5">
              <span className="text-[#0d2b57] text-sm font-semibold tracking-wider">01</span>
              <h3 className="mt-3 text-lg sm:text-xl font-semibold tracking-tight text-neutral-900">One source of truth</h3>
              <p className="mt-2 text-neutral-500 text-[15px] sm:text-sm leading-relaxed">Time, tasks, tools, supplies, teams, and reports in one place—no more scattered spreadsheets.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200/60 bg-gradient-to-br from-[#f8fafc] to-[#fafafa] p-6 sm:p-8 hover-lift transition-all duration-200 hover:border-[#0d2b57]/20 hover:shadow-lg hover:shadow-[#0d2b57]/5">
              <span className="text-[#0d2b57] text-sm font-semibold tracking-wider">02</span>
              <h3 className="mt-3 text-lg sm:text-xl font-semibold tracking-tight text-neutral-900">Designed for the field</h3>
              <p className="mt-2 text-neutral-500 text-[15px] sm:text-sm leading-relaxed">Fast, offline-friendly on iOS and Android—optimized for crews and jobsite realities.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200/60 bg-gradient-to-br from-[#f8fafc] to-[#fafafa] p-6 sm:p-8 hover-lift transition-all duration-200 hover:border-[#0d2b57]/20 hover:shadow-lg hover:shadow-[#0d2b57]/5">
              <span className="text-[#0d2b57] text-sm font-semibold tracking-wider">03</span>
              <h3 className="mt-3 text-lg sm:text-xl font-semibold tracking-tight text-neutral-900">Reliable reporting</h3>
              <p className="mt-2 text-neutral-500 text-[15px] sm:text-sm leading-relaxed">Accurate inputs mean trustworthy daily reports, closeouts, and forecasts.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="w-full" style={{ background: 'linear-gradient(180deg, #fafafa 0%, #f0f7ff 100%)' }}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">Contact</h2>
          <p className="mt-2 sm:mt-3 text-neutral-500 max-w-2xl text-[15px] sm:text-base">Questions, feedback, or ready to get started? Reach out.</p>
          <a
            href="mailto:hello@fezer.app"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white border-2 border-neutral-200 px-6 py-4 text-lg font-semibold text-neutral-900 shadow-sm hover:border-[#0d2b57]/30 hover:shadow-md hover:shadow-[#0d2b57]/5 transition-all duration-200 active:scale-[0.98] md:inline-flex"
          >
            hello@fezer.app
          </a>
        </div>
      </section>

      <footer className="w-full border-t border-neutral-200/80 bg-white safe-area-bottom">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/fezer-logo-transparent-blue.png" alt="Fezer logo" className="w-7 h-7" />
              <span className="text-sm font-medium text-neutral-800">Fezer</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-600">
              <a href="mailto:hello@fezer.app" className="link-underline hover:text-neutral-900 transition-colors duration-200 font-medium">hello@fezer.app</a>
              <a href="/privacypolicy" className="link-underline hover:text-neutral-900 transition-colors duration-200 font-medium">Privacy Policy</a>
              <a href="/terms" className="link-underline hover:text-neutral-900 transition-colors duration-200 font-medium">Terms</a>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-400">© {new Date().getFullYear()} Fezer. All rights reserved. Fezer is currently in beta.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;