/**
 * The "free month of Fezer Plus" campaign.
 *
 * Everything the toast, the landing page and the emails say about the promo
 * comes from here, so the offer can be reworded or switched off in one place.
 * The pool sizes are *not* here on purpose -- those are read live from the
 * database so the page can never claim codes that are already gone.
 */
import type { ComponentType } from 'react';
import { AndroidLogoIcon, AppleLogoIcon } from '../components/StoreIcons';

/** Flip to false when the codes run out or the campaign ends. */
export const PROMO_ACTIVE = true;

/** Where the toast and every campaign link point. */
export const PROMO_PATH = '/plus-free';

export type PromoPlatform = 'ios' | 'android';

export type PromoPlatformIcon = ComponentType<{ className?: string }>;

export const PROMO_PLATFORMS: {
  id: PromoPlatform;
  label: string;
  sublabel: string;
  store: string;
  /** Matches the download button on the rest of the site. */
  buttonClass: string;
  icon: PromoPlatformIcon;
  /**
   * Fezer Plus has to be purchasable on the store before a code for it can be
   * redeemed. Set to false to hide a platform without touching the pool -- the
   * codes stay reserved and unissued.
   */
  enabled: boolean;
}[] = [
  {
    id: 'ios',
    label: 'iOS',
    sublabel: 'Redeems in the App Store',
    store: 'App Store',
    buttonClass: 'bg-[#0d2b57] text-white',
    icon: AppleLogoIcon,
    enabled: true,
  },
  {
    id: 'android',
    label: 'Android',
    sublabel: 'Redeems in Google Play',
    store: 'Google Play',
    buttonClass: 'bg-[#0d4a32] text-white',
    icon: AndroidLogoIcon,
    enabled: true,
  },
];

export const PROMO_TOAST = {
  headline: 'Fezer Plus, free for a month.',
  body: 'Grab a code while they last.',
  cta: 'Redeem now',
  /** Milliseconds after page load before the toast slides in. */
  delayMs: 2000,
  /** Bumping this shows the toast again to people who dismissed the last one. */
  version: 'v2',
};

export const PROMO_PAGE = {
  eyebrow: 'Limited promo',
  h1: 'Get Fezer Plus free for a month',
  intro:
    'Tell us where to send it and we will email you a one-time code for 30 days of Fezer Plus: Compare, full analytics, unlimited areas and plans, and a vision board for every area.',
  cta: 'Get my free month',
  ctaBusy: 'Sending your code...',
  finePrint: [
    'One code per email address. Each code works once, on one account.',
    'Nothing to cancel: the free month ends on its own unless you choose to continue.',
    'We use your email to send this code and nothing else. No list, no follow-ups.',
  ],
};

export type PromoStats = {
  total: number;
  remaining: number;
  claimed: number;
  platforms: Record<PromoPlatform, { total: number; remaining: number; claimed: number }>;
};

export async function fetchPromoStats(signal?: AbortSignal): Promise<PromoStats | null> {
  try {
    const response = await fetch('/api/promo/stats', { signal });
    if (!response.ok) return null;
    const data = await response.json();
    return data?.ok ? (data as PromoStats) : null;
  } catch {
    return null;
  }
}
