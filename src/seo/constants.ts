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
 * Both stores carry Fezer Plus. Flip a platform to false if a store build ever
 * ships without in-app purchases again, and every piece of copy that depends
 * on availability follows.
 */
export const PLUS_AVAILABILITY = { ios: true, android: true };

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

export type SiteVideo = {
  id: string;
  title: string;
  description: string;
  watchUrl: string;
  embedUrl: string;
  channelUrl: string;
  uploadDate: string;
  duration: string;
  durationLabel: string;
  cover: string;
};

/**
 * The Fezer walkthrough on YouTube.
 *
 * `uploadDate` must be a full ISO 8601 timestamp *with* a UTC offset. A bare
 * date raises two Search Console errors against every page carrying the
 * VideoObject -- "missing a timezone" and "invalid datetime value" -- because
 * Google reads schema.org date-times strictly.
 */
export const INTRO_VIDEO: SiteVideo = {
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

/**
 * Demo video for the /start conversion page.
 *
 * Distinct from INTRO_VIDEO (the 29-second launch short used on / and /press).
 * Autoplay on /start is muted; YouTube will refuse unmuted autoplay.
 */
export const START_VIDEO: SiteVideo = {
  id: 'xtka7vCEAOw',
  title: 'Fezer App | Start and End Tracking. Compare Mode',
  description:
    'Plan the day, start and end tracking with one tap, then open Compare to see the plan beside what actually happened.',
  watchUrl: 'https://www.youtube.com/shorts/xtka7vCEAOw',
  embedUrl: 'https://www.youtube-nocookie.com/embed/xtka7vCEAOw',
  channelUrl: 'https://www.youtube.com/@Fezer_app',
  uploadDate: '2026-08-26T15:03:28-07:00',
  duration: 'PT2M7S',
  durationLabel: '2 minutes',
  cover: '/images/start-video-cover.webp',
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

/** Incoming campaign params from the landing URL. Empty during SSR. */
export function campaignParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const search = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = search.get(key);
    if (value) out[key] = value;
  }
  return out;
}

/**
 * Carry landing-page UTMs onto store URLs so a click still attributes.
 * Google Play reads `referrer`; App Store keeps the utm_* query string and `ct`.
 */
export function withCampaignUrl(baseUrl: string): string {
  const utm = campaignParams();
  if (Object.keys(utm).length === 0) return baseUrl;
  try {
    const url = new URL(baseUrl);
    if (url.hostname.includes('play.google.com')) {
      const referrer = new URLSearchParams(url.searchParams.get('referrer') ?? '');
      for (const [key, value] of Object.entries(utm)) referrer.set(key, value);
      url.searchParams.set('referrer', referrer.toString());
    } else {
      for (const [key, value] of Object.entries(utm)) {
        if (!url.searchParams.has(key)) url.searchParams.set(key, value);
      }
      if (utm.utm_campaign && !url.searchParams.has('ct')) {
        url.searchParams.set('ct', utm.utm_campaign);
      }
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, { ...campaignParams(), ...params });
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
