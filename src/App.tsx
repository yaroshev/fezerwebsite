import React from 'react';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeleteAccount from './pages/DeleteAccount';
import { Clock, CheckSquare, QrCode, Boxes, Users, FileText } from 'lucide-react';
import PhoneSlideshow from './components/PhoneSlideshow';

function App() {
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
      <main id="top" className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 flex items-center min-h-[90vh]">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-14 items-stretch">
          {/* Left: 2/3 width content card */}
          <div className="md:col-span-2 animate-fade-up">
            <div className="h-full min-h-[400px] sm:min-h-[520px] rounded-2xl sm:rounded-3xl border border-neutral-200/60 bg-white p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
              <div>
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <img 
                    src="/fezer-logo-transparent-blue.png" 
                    alt="Fezer Logo" 
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform duration-300 hover:scale-105"
                  />
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">Fezer</h1>
                    <span className="inline-flex items-center rounded-full bg-amber-100/80 text-amber-700 px-3 py-1 text-xs font-medium tracking-wide uppercase" aria-label="Beta">Beta</span>
                  </div>
                </div>
                <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-neutral-500 max-w-2xl leading-relaxed">
                  Field operations OS for construction. Time, tasks, tools, supplies,
                  teams, and reports—in one fast app.
                </p>
                <p className="mt-3 text-xl sm:text-2xl font-medium tracking-tight text-neutral-900">Do Great Work</p>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 self-end w-full sm:w-auto">
                <a
                  href="https://testflight.apple.com/join/kvGPdcqB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 sm:px-5 sm:py-2.5 text-base sm:text-sm font-medium min-h-[48px] sm:min-h-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  aria-label="Download Fezer for iOS via TestFlight"
                >
                  Download for iOS
                </a>
                <a
                  href="https://play.google.com/apps/testing/me.fezer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 px-6 py-3 sm:px-5 sm:py-2.5 text-base sm:text-sm font-medium min-h-[48px] sm:min-h-0 hover:border-neutral-300 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 transition-colors duration-200"
                  aria-label="Join Fezer Android beta via Google Play testing"
                >
                  Download for Android
                </a>
              </div>
            </div>
          </div>

          {/* Right: 1/3 width phone + downloads, match height */}
          <div className="md:col-span-1 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative h-full min-h-[300px] sm:min-h-[400px] md:min-h-[520px] flex items-center justify-center">
              {/* Subtle organic bubbles behind the phone, small footprint */}
              <div
                className="pointer-events-none absolute -top-2 right-6 w-16 h-16 rounded-full opacity-25 blur-2xl -z-10"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(158,199,255,0.55), rgba(13,43,87,0) 60%)' }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-10 left-8 w-14 h-14 rounded-full opacity-25 blur-2xl -z-10"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(13,43,87,0.3), rgba(158,199,255,0) 60%)' }}
                aria-hidden="true"
              />
              <PhoneSlideshow />
            </div>
          </div>
        </div>
      </main>

      <section id="features" className="w-full">
        <div id="web-fallback" className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-4 text-sm text-neutral-600"></div>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">Built for crews and PMs</h2>
          <p className="mt-3 text-neutral-500 max-w-2xl">Fast, clear, and reliable in the field. Fezer keeps projects moving with accurate data and simple workflows.</p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-neutral-200/60 bg-[#fafafa] p-6 hover-lift transition-colors duration-200 hover:bg-white hover:border-neutral-200">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900">One source of truth</h3>
              <p className="mt-2 text-neutral-500 text-sm leading-relaxed">Time, tasks, tools, supplies, teams, and reports in one place—no more scattered spreadsheets.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200/60 bg-[#fafafa] p-6 hover-lift transition-colors duration-200 hover:bg-white hover:border-neutral-200">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900">Designed for the field</h3>
              <p className="mt-2 text-neutral-500 text-sm leading-relaxed">Fast, offline-friendly on iOS and Android—optimized for crews and jobsite realities.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200/60 bg-[#fafafa] p-6 hover-lift transition-colors duration-200 hover:bg-white hover:border-neutral-200">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900">Reliable reporting</h3>
              <p className="mt-2 text-neutral-500 text-sm leading-relaxed">Accurate inputs mean trustworthy daily reports, closeouts, and forecasts.</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="w-full border-t border-neutral-200/80 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/fezer-logo-transparent-blue.png" alt="Fezer logo" className="w-6 h-6" />
              <span className="text-sm font-medium text-neutral-700">Fezer</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600">
              <a href="mailto:hello@fezer.app" className="link-underline hover:text-neutral-900 transition-colors duration-200">hello@fezer.app</a>
              <a href="/privacypolicy" className="link-underline hover:text-neutral-900 transition-colors duration-200">Privacy Policy</a>
              <a href="/terms" className="link-underline hover:text-neutral-900 transition-colors duration-200">Terms</a>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-400">© {new Date().getFullYear()} Fezer. All rights reserved. Fezer is currently in beta.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;