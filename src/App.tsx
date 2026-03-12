import React, { useState } from 'react';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { Clock, CheckSquare, QrCode, Boxes, Users, FileText } from 'lucide-react';
import PhoneSlideshow from './components/PhoneSlideshow';

function App() {
  const [showAndroidModal, setShowAndroidModal] = useState(false);
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
  }

  const handleAndroidClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAndroidModal(true);
  };

  const closeAndroidModal = () => {
    setShowAndroidModal(false);
  };

  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col">
      <main id="top" className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 flex items-center min-h-[90vh]">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-14 items-stretch">
          {/* Left: 2/3 width content card */}
          <div className="md:col-span-2">
            <div className="h-full min-h-[400px] sm:min-h-[520px] rounded-2xl sm:rounded-3xl border border-neutral-100 shadow-sm bg-white p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="/fezer-logo-transparent-blue.png" 
                    alt="Fezer Logo" 
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                  />
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">Fezer</h1>
                </div>
                <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-neutral-600 max-w-2xl leading-relaxed">
                  Field operations OS for construction. Time, tasks, tools, supplies,
                  teams, and reports - in one fast app.
                </p>
                <p className="mt-3 text-xl sm:text-2xl font-medium tracking-tight text-neutral-900">Do Great Work</p>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 self-end w-full sm:w-auto">
                <a
                  href="https://testflight.apple.com/join/kvGPdcqB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-black text-white px-6 py-3 sm:px-5 sm:py-2.5 text-base sm:text-sm font-medium hover:opacity-90 transition-opacity min-h-[48px] sm:min-h-0"
                  aria-label="Download Fezer for iOS via TestFlight"
                >
                  Download for iOS
                </a>
                <button
                  onClick={handleAndroidClick}
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-black px-6 py-3 sm:px-5 sm:py-2.5 text-base sm:text-sm font-medium hover:bg-black/5 transition-colors min-h-[48px] sm:min-h-0"
                  aria-haspopup="dialog"
                  aria-controls="android-modal"
                >
                  Download for Android
                </button>
              </div>
            </div>
          </div>

          {/* Right: 1/3 width phone + downloads, match height */}
          <div className="md:col-span-1">
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
        <div id="web-fallback" className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-4 text-sm text-neutral-700"></div>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Built for crews and PMs</h2>
          <p className="mt-3 text-neutral-600 max-w-2xl">Fast, clear, and reliable in the field. Fezer keeps projects moving with accurate data and simple workflows.</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Time tracking', desc: 'Clock in/out and labor allocation—clean and auditable.', Icon: Clock },
              { title: 'Task management', desc: 'Plan daily work, assign, comment, and verify completion.', Icon: CheckSquare },
              { title: 'Tools & QR tracking', desc: 'Scan tools and assets with QR to know where everything is.', Icon: QrCode },
              { title: 'Supplies & inventory', desc: 'Request, receive, and reconcile materials without chaos.', Icon: Boxes },
              { title: 'Teams & permissions', desc: 'Simple roles to keep data secure and responsibilities clear.', Icon: Users },
              { title: 'Reports & blueprints', desc: 'Generate reports and reference drawings right in the app.', Icon: FileText },
            ].map(({ title, desc, Icon }) => (
              <div key={title} className="rounded-xl border border-neutral-100 shadow-sm p-5 bg-white hover-lift" aria-label={title}>
                <div className="w-10 h-10 rounded-full brand-bg text-white flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="w-full bg-neutral-50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-100 shadow-sm bg-white p-6">
              <h3 className="text-lg font-semibold tracking-tight">One source of truth</h3>
              <p className="mt-2 text-neutral-600">Time, tasks, tools, supplies, teams, and reports in one place—no more scattered spreadsheets.</p>
            </div>
            <div className="rounded-2xl border border-neutral-100 shadow-sm bg-white p-6">
              <h3 className="text-lg font-semibold tracking-tight">Designed for the field</h3>
              <p className="mt-2 text-neutral-600">Fast, offline-friendly, and iOS-native—optimized for crews and jobsite realities.</p>
            </div>
            <div className="rounded-2xl border border-neutral-100 shadow-sm bg-white p-6">
              <h3 className="text-lg font-semibold tracking-tight">Reliable reporting</h3>
              <p className="mt-2 text-neutral-600">Accurate inputs mean trustworthy daily reports, closeouts, and forecasts.</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="w-full border-t border-neutral-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/fezer-logo-transparent-blue.png" alt="Fezer logo" className="w-6 h-6" />
              <span className="text-sm text-neutral-700">Fezer</span>
            </div>
            <div className="text-sm text-neutral-700">
              <a href="mailto:hello@fezer.app" className="hover:opacity-70 transition-opacity">hello@fezer.app</a>
              <span className="mx-2">·</span>
              <a href="/privacypolicy" className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-black px-3 py-1.5 text-sm font-medium hover:bg-black/5 transition-colors">Privacy Policy</a>
              <span className="mx-2">·</span>
              <a href="/terms" className="hover:opacity-70 transition-opacity">Terms</a>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-500">© {new Date().getFullYear()} Fezer. All rights reserved.</p>
        </div>
      </footer>

      {/* Android Coming Soon Modal */}
      {showAndroidModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div id="android-modal" role="dialog" aria-modal="true" aria-labelledby="android-title" className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center animate-mobile-modal-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 id="android-title" className="text-2xl font-bold text-gray-900 mb-2">Android Coming Soon</h2>
              <p className="text-gray-600 leading-relaxed">
                We're working hard to bring Fezer to Android devices. 
                Stay tuned for updates and be among the first to know when it's ready!
              </p>
            </div>
            <button
              onClick={closeAndroidModal}
              className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;