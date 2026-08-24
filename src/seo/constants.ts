export const SITE_URL = 'https://fezer.app';
export const APP_STORE_URL = 'https://apps.apple.com/ca/app/fezer-planner/id6790143164';
export const APP_STORE_ID = '6790143164';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=me.fezer&hl=en';

export const SCREENSHOTS = {
  goalPlanner: '/images/fezer-goal-planner.webp',
  timeBlocking: '/images/fezer-time-blocking-planner.webp',
  timeTracker: '/images/fezer-time-tracker.webp',
  visionBoard: '/images/fezer-vision-board-app.webp',
};

/** The "Introducing Fezer App" launch video on YouTube. */
export const INTRO_VIDEO = {
  id: 'DSfsImPoHsE',
  title: 'Introducing Fezer App',
  description:
    'Most planners give you a longer list. Fezer answers a better question: what should I be doing right now? Plan your day as time blocks, track what actually happens and move your goals forward.',
  watchUrl: 'https://www.youtube.com/watch?v=DSfsImPoHsE',
  // youtube-nocookie keeps YouTube from setting tracking cookies until playback.
  embedUrl: 'https://www.youtube-nocookie.com/embed/DSfsImPoHsE',
  channelUrl: 'https://www.youtube.com/@Fezer_app',
  uploadDate: '2026-08-04',
  /** ISO 8601 duration for VideoObject schema. */
  duration: 'PT29S',
  /** Local poster image -- no request leaves the page until the visitor taps play. */
  cover: '/images/introducing-fezer-cover.webp',
};

export function trackEvent(name: string, params: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

export function trackStoreClick(location: string) {
  trackEvent('app_store_click', { link_location: location });
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
