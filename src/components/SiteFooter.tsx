import React from 'react';
import { MessageSquare } from 'lucide-react';
import { FEATURE_PAGES } from '../content/features';
import { COMPARISON_PAGES } from '../content/comparisons';
import { GUIDES } from '../content/guides';
import { APP_STORE_URL, PLAY_STORE_URL, trackEvent, trackStoreClick } from '../seo/constants';
import FeedbackModal from './FeedbackModal';

export default function SiteFooter() {
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);

  React.useEffect(() => {
    const syncWithUrl = () => setFeedbackOpen(window.location.hash === '#feedback');
    syncWithUrl();
    window.addEventListener('hashchange', syncWithUrl);
    return () => window.removeEventListener('hashchange', syncWithUrl);
  }, []);

  const openFeedback = React.useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState(null, '', '#feedback');
    setFeedbackOpen(true);
  }, []);

  const closeFeedback = React.useCallback(() => {
    if (window.location.hash === '#feedback') {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    setFeedbackOpen(false);
  }, []);

  return (
    <>
      <footer className="w-full border-t border-neutral-200/80 bg-white safe-area-bottom dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row md:justify-between gap-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-3">
                <img src="/fezer-app-icon.png" alt="Fezer app icon" className="w-8 h-8 rounded-lg" />
                <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Fezer</span>
              </div>
              <p className="mt-3 text-sm text-neutral-500 leading-relaxed dark:text-neutral-400">
                A private day planner, time tracker and goal planner for iPhone, iPad and Android.
              </p>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackStoreClick('footer')}
                className="mt-4 inline-block text-sm font-medium text-[#0d2b57] hover:opacity-80 dark:text-blue-300"
              >
                Download Fezer on the App Store
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('play_store_click', { link_location: 'footer' })}
                className="mt-2 inline-block text-sm font-medium text-[#0d2b57] hover:opacity-80 dark:text-blue-300"
              >
                Get Fezer on Google Play
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-10">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Explore Fezer</h2>
                <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {FEATURE_PAGES.slice(0, 3).map((page) => (
                    <li key={page.path}>
                      <a href={page.path} className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                        {page.navLabel}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Go further</h2>
                <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {FEATURE_PAGES.slice(3).map((page) => (
                    <li key={page.path}>
                      <a href={page.path} className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                        {page.navLabel}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Compare</h2>
                <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {COMPARISON_PAGES.map((page) => (
                    <li key={page.path}>
                      <a href={page.path} className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                        {page.navLabel}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Guides</h2>
                <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {GUIDES.map((guide) => (
                    <li key={guide.path}>
                      <a href={guide.path} className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                        {guide.navLabel}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="/guides" className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                      All guides
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">More</h2>
                <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>
                    <a href="/vision" className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                      Vision
                    </a>
                  </li>
                  <li>
                    <a href="/faq" className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="/whats-new" className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                      What’s new
                    </a>
                  </li>
                  <li>
                    <a href="/press" className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                      Press kit
                    </a>
                  </li>
                  <li>
                    <a href="/privacypolicy" className="hover:text-neutral-900 transition-colors dark:hover:text-neutral-100">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#feedback"
                      onClick={openFeedback}
                      className="inline-flex items-center gap-1.5 text-left transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                      aria-haspopup="dialog"
                    >
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                      Send feedback
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-10 text-xs text-neutral-400 dark:text-neutral-500">
            © {new Date().getFullYear()} Fezer. All rights reserved.
          </p>
        </div>
      </footer>
      <FeedbackModal open={feedbackOpen} onClose={closeFeedback} />
    </>
  );
}
