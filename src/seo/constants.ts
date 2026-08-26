export const SITE_URL = 'https://fezer.app';
export const APP_STORE_URL = 'https://apps.apple.com/ca/app/fezer-planner/id6790143164';
export const APP_STORE_ID = '6790143164';
/**
 * The version live on the App Store right now -- not the version in the repo,
 * and not the build sitting in review. It feeds `softwareVersion` in structured
 * data, so it has to describe what a visitor can actually download today.
 */
export const APP_VERSION = '1.0.2';

/**
 * Whether Fezer Plus can actually be bought on each store.
 *
 * The iOS build carrying StoreKit is in review; until it is approved the App
 * Store listing shows no in-app purchases, so telling an iPhone visitor the
 * price without saying where they can pay it would be the same mistake in the
 * other direction. Flip `ios` to true the day the build goes live and every
 * piece of copy that depends on it follows.
 */
export const PLUS_AVAILABILITY = { ios: false, android: true };

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=me.fezer&hl=en';

/**
 * Hero chip under store buttons. Inner pages used to say "iPhone & iPad"
 * after the homepage already listed Android; keep this the single source.
 */
export const HERO_CHIP = 'Free to plan and track · iPhone, iPad and Android';

export const SCREENSHOTS = {
  goalPlanner: '/images/fezer-goal-planner.webp',
  timeBlocking: '/images/fezer-time-blocking-planner.webp',
  timeTracker: '/images/fezer-time-tracker.webp',
  visionBoard: '/images/fezer-vision-board-app.webp',
};

/**
 * Fezer Plus, the paid tier. Prices are the store-facing US figures and are the
 * single source of truth for the pricing section, the hero subline and the
 * Offer nodes in structured data -- change them here and the whole site follows.
 */
export const PRICING = {
  monthly: { amount: 5.99, display: '$5.99', period: 'month' },
  yearly: { amount: 55.99, display: '$55.99', period: 'year' },
  currency: 'USD',
  /** Yearly cost expressed per month, for the cheapest honest headline number. */
  get perMonthOnYearly() {
    return `$${(this.yearly.amount / 12).toFixed(2)}`;
  },
  /** How much cheaper a year is than twelve months bought one at a time. */
  get savingPercent() {
    return Math.round((1 - this.yearly.amount / (this.monthly.amount * 12)) * 100);
  },
  trialDays: 7,
};

/**
 * What the free tier includes, and what Plus opens.
 *
 * These numbers are the caps in `FezerLimits.free` in both apps. They are the
 * limits a new install starts with -- installs from before the caps went live
 * keep whatever larger ceiling they already had -- so the copy says "new
 * accounts" rather than stating them as a flat truth for everyone.
 */
export const FREE_INCLUDES = [
  'Unlimited time blocks, repeating routines and deadline pins',
  'One-tap tracking with checkpoints, from anywhere in the app',
  'Live Activities, widgets and the Control Center control (iPhone and iPad)',
  'The timeline, in Plan and Tracked views',
  '3 areas, 3 plans in each, 7 steps per plan',
  'One vision board, up to 10 pins',
];

export const PLUS_INCLUDES = [
  'Compare - the day you planned beside the day you got',
  'Analytics by day, week, month and year, broken down by area and plan',
  'The list and month views of your schedule',
  'Unlimited areas, plans and steps',
  'A vision board for every area, with unlimited pins',
];

/**
 * The Fezer walkthrough on YouTube.
 *
 * `uploadDate` must be a full ISO 8601 timestamp *with* a UTC offset. A bare
 * date raises two Search Console errors against every page carrying the
 * VideoObject -- "missing a timezone" and "invalid datetime value" -- because
 * Google reads schema.org date-times strictly.
 */
export const INTRO_VIDEO = {
  id: 'xVXW7xa3Q30',
  title: 'Introducing Fezer App',
  description:
    'Most planners give you a longer list. Fezer answers a better question: what should I be doing right now? Plan your day as time blocks, track what actually happens and move your goals forward.',
  watchUrl: 'https://www.youtube.com/shorts/xVXW7xa3Q30',
  // youtube-nocookie keeps YouTube from setting tracking cookies until playback.
  embedUrl: 'https://www.youtube-nocookie.com/embed/xVXW7xa3Q30',
  channelUrl: 'https://www.youtube.com/@Fezer_app',
  uploadDate: '2026-08-25T12:00:00-07:00',
  /** ISO 8601 duration for VideoObject schema. */
  duration: 'PT29S',
  /** Human-readable duration, used in the heading and the poster caption. */
  durationLabel: '29 seconds',
  /** Local poster image -- no request leaves the page until the visitor taps play. */
  cover: '/images/introducing-fezer-cover.webp',
};

/** Looping hero background. Silent, muted, decorative -- never the only source of meaning. */
export const HERO_VIDEO = {
  sources: [
    { src: '/video/hero-1920.mp4', type: 'video/mp4', media: '(min-width: 768px)' },
    { src: '/video/hero-1280.mp4', type: 'video/mp4' },
  ],
  poster: '/video/hero-poster.webp',
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
