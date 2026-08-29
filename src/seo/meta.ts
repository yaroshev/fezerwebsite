import { FEATURE_PAGES } from '../content/features';
import { COMPARISON_PAGES } from '../content/comparisons';
import { GUIDES } from '../content/guides';
import { FAQ_ITEMS } from '../content/faq';
import { APP_STORE_URL, APP_VERSION, INTRO_VIDEO, PLAY_STORE_URL, PRICING, SITE_URL, SCREENSHOTS, START_VIDEO } from './constants';

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  robots: string;
  /** Included in sitemap.xml generation and OG url/canonical. */
  indexable: boolean;
  /**
   * Filename (without extension) of the pre-generated 1200x630 card in
   * /public/og. Cards are committed to the repo; regenerate with `npm run og`.
   */
  ogSlug?: string;
  jsonLd?: object;
};

/** Social cards are 1200x630 so they render as large previews, not thumbnails. */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export function ogImageUrl(slug?: string) {
  return `${SITE_URL}/og/${slug ?? 'default'}.png`;
}

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Fezer',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/fezer-app-icon.png`,
  },
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Fezer',
  url: `${SITE_URL}/`,
  publisher: { '@id': `${SITE_URL}/#organization` },
  description:
    'Fezer is a private day planner, time tracker, goal planner and vision board app for iPhone, iPad and Android.',
};

const SOFTWARE_APPLICATION = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#app`,
  name: 'Fezer Planner',
  alternateName: 'Fezer',
  applicationCategory: 'ProductivityApplication',
  applicationSubCategory: 'Day Planner',
  operatingSystem: 'iOS, iPadOS, Android',
  softwareVersion: APP_VERSION,
  downloadUrl: [APP_STORE_URL, PLAY_STORE_URL],
  installUrl: APP_STORE_URL,
  // Free to install, with two paid plans. Stating all three lets Google show a
  // price range instead of a bare "Free" that the paid tier then contradicts.
  offers: [
    {
      '@type': 'Offer',
      name: 'Fezer',
      price: '0',
      priceCurrency: PRICING.currency,
      description: 'Plan the day in time blocks and track it, free and without an account.',
    },
    {
      '@type': 'Offer',
      name: 'Fezer Plus, monthly',
      price: PRICING.monthly.amount.toFixed(2),
      priceCurrency: PRICING.currency,
      category: 'subscription',
    },
    {
      '@type': 'Offer',
      name: 'Fezer Plus, yearly',
      price: PRICING.yearly.amount.toFixed(2),
      priceCurrency: PRICING.currency,
      category: 'subscription',
    },
  ],
  image: `${SITE_URL}/fezer-app-icon.png`,
  screenshot: [
    `${SITE_URL}${SCREENSHOTS.timeBlocking}`,
    `${SITE_URL}${SCREENSHOTS.timeTracker}`,
    `${SITE_URL}${SCREENSHOTS.goalPlanner}`,
    `${SITE_URL}${SCREENSHOTS.visionBoard}`,
  ],
  url: `${SITE_URL}/`,
  description:
    'Fezer is a private day planner, time tracker, goal planner and vision board app. Plan with time blocks, track where your time goes and move your goals forward. All data stays on your device.',
  featureList: [
    'Day planning with time blocks',
    'Time blocking with repeating blocks',
    'One-tap time tracking with checkpoints',
    'Goal planning with areas, plans and steps',
    'Vision boards for goals and life areas',
    'Plan vs. reality analytics',
  ],
  isAccessibleForFree: true,
  author: { '@id': `${SITE_URL}/#organization` },
  publisher: { '@id': `${SITE_URL}/#organization` },
};

/** The "Introducing Fezer App" launch video, embedded on / and /press. */
const INTRO_VIDEO_JSONLD = {
  '@type': 'VideoObject',
  '@id': `${SITE_URL}/#introvideo`,
  name: INTRO_VIDEO.title,
  description: INTRO_VIDEO.description,
  thumbnailUrl: [`${SITE_URL}${INTRO_VIDEO.cover}`, `https://i.ytimg.com/vi/${INTRO_VIDEO.id}/hqdefault.jpg`],
  uploadDate: INTRO_VIDEO.uploadDate,
  duration: INTRO_VIDEO.duration,
  contentUrl: INTRO_VIDEO.watchUrl,
  embedUrl: `${INTRO_VIDEO.embedUrl}`,
  publisher: { '@id': `${SITE_URL}/#organization` },
};

const START_VIDEO_JSONLD = {
  '@type': 'VideoObject',
  '@id': `${SITE_URL}/start#video`,
  name: START_VIDEO.title,
  description: START_VIDEO.description,
  thumbnailUrl: [`${SITE_URL}${START_VIDEO.cover}`, `https://i.ytimg.com/vi/${START_VIDEO.id}/hqdefault.jpg`],
  uploadDate: START_VIDEO.uploadDate,
  duration: START_VIDEO.duration,
  contentUrl: START_VIDEO.watchUrl,
  embedUrl: START_VIDEO.embedUrl,
  publisher: { '@id': `${SITE_URL}/#organization` },
};

function featurePageJsonLd(path: string, title: string, description: string) {
  const url = `${SITE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION,
      WEBSITE,
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#app` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Fezer', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: title, item: url },
        ],
      },
    ],
  };
}

/**
 * Comparison pages get the same graph plus a FAQPage node. The questions and
 * answers must match the visible copy on the page -- Google requires the marked-up
 * content to be present on the page itself, and mismatches risk a manual action.
 */
function comparisonPageJsonLd(
  path: string,
  title: string,
  description: string,
  faq: { q: string; a: string }[]
) {
  const url = `${SITE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION,
      WEBSITE,
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#app` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Fezer', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: title, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

export const ROUTES_META: RouteMeta[] = [
  {
    path: '/',
    title: 'Fezer -  Day Planner, Time Tracker & Goal Planner App',
    description:
      'Fezer is a private day planner, time tracker, goal planner and vision board app. Plan with time blocks, track where your time goes and move your goals forward.',
    robots: 'index, follow',
    indexable: true,
    ogSlug: 'default',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [ORGANIZATION, WEBSITE, SOFTWARE_APPLICATION, INTRO_VIDEO_JSONLD],
    },
  },
  {
    path: '/start',
    title: 'Fezer — Plan. Track. Compare. Improve.',
    description:
      'Plan your day, track what actually happens, and compare the difference with Fezer. Available on iPhone and Android.',
    robots: 'index, follow',
    indexable: true,
    ogSlug: 'start',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION,
        WEBSITE,
        SOFTWARE_APPLICATION,
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/start`,
          url: `${SITE_URL}/start`,
          name: 'Fezer — Plan. Track. Compare. Improve.',
          description:
            'Plan your day, track what actually happens, and compare the difference with Fezer. Available on iPhone and Android.',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#app` },
          primaryImageOfPage: { '@id': `${SITE_URL}/start#video` },
        },
        START_VIDEO_JSONLD,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Fezer', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Get started', item: `${SITE_URL}/start` },
          ],
        },
      ],
    },
  },
  {
    path: '/plus-free',
    title: 'Free Month of Fezer Plus -  Fezer',
    description:
      'Claim a one-time code for 30 days of Fezer Plus on iPhone, iPad or Android. One code per email, while they last.',
    robots: 'index, follow',
    indexable: true,
    ogSlug: 'default',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION,
        WEBSITE,
        SOFTWARE_APPLICATION,
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/plus-free`,
          url: `${SITE_URL}/plus-free`,
          name: 'Free Month of Fezer Plus',
          description:
            'Claim a one-time code for 30 days of Fezer Plus on iPhone, iPad or Android.',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#app` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Fezer', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Free month of Plus', item: `${SITE_URL}/plus-free` },
          ],
        },
      ],
    },
  },
  {
    // Operator dashboard for the promo. Kept out of search and the sitemap; the
    // data behind it needs the admin token regardless.
    path: '/promo-admin',
    title: 'Promo Dashboard -  Fezer',
    description: 'Internal dashboard for the Fezer Plus promo.',
    robots: 'noindex, nofollow',
    indexable: false,
  },
  ...FEATURE_PAGES.map((page) => ({
    path: page.path,
    title: page.title,
    description: page.metaDescription,
    robots: 'index, follow',
    indexable: true,
    // Feature page slugs match their card filenames in /public/og.
    ogSlug: page.path.slice(1),
    jsonLd: featurePageJsonLd(page.path, page.title, page.metaDescription),
  })),
  ...COMPARISON_PAGES.map((page) => ({
    path: page.path,
    title: page.title,
    description: page.metaDescription,
    robots: 'index, follow',
    indexable: true,
    ogSlug: page.ogSlug,
    jsonLd: comparisonPageJsonLd(page.path, page.title, page.metaDescription, page.faq),
  })),
  {
    path: '/guides',
    title: 'Guides to Time Blocking, Reviews & Goals -  Fezer',
    description:
      'Practical, tool-agnostic guides to time blocking, honest time estimation, ten-minute weekly reviews and turning goals into a schedule you actually follow.',
    robots: 'index, follow',
    indexable: true,
    ogSlug: 'guides',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION,
        WEBSITE,
        {
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/guides`,
          url: `${SITE_URL}/guides`,
          name: 'Guides to Time Blocking, Reviews & Goals -  Fezer',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: GUIDES.map((guide, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: guide.h1,
              url: `${SITE_URL}${guide.path}`,
            })),
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Fezer', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
          ],
        },
      ],
    },
  },
  ...GUIDES.map((guide) => ({
    path: guide.path,
    title: guide.title,
    description: guide.metaDescription,
    robots: 'index, follow',
    indexable: true,
    ogSlug: guide.ogSlug,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION,
        WEBSITE,
        {
          '@type': 'Article',
          '@id': `${SITE_URL}${guide.path}`,
          headline: guide.h1,
          description: guide.metaDescription,
          url: `${SITE_URL}${guide.path}`,
          image: `${SITE_URL}/og/${guide.ogSlug}.png`,
          datePublished: guide.datePublished,
          dateModified: guide.datePublished,
          author: { '@id': `${SITE_URL}/#organization` },
          publisher: { '@id': `${SITE_URL}/#organization` },
          isPartOf: { '@id': `${SITE_URL}/#website` },
          mainEntityOfPage: `${SITE_URL}${guide.path}`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Fezer', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
            { '@type': 'ListItem', position: 3, name: guide.h1, item: `${SITE_URL}${guide.path}` },
          ],
        },
      ],
    },
  })),
  {
    path: '/faq',
    title: 'Frequently Asked Questions -  Fezer',
    description:
      'Answers to the most common questions about Fezer: what is free, what Fezer Plus includes, where your data lives, backups, sync, calendar import, Android and more.',
    robots: 'index, follow',
    indexable: true,
    ogSlug: 'faq',
    // The FAQPage node mirrors the visible copy on /faq -- keep src/content/faq.ts
    // as the single source of truth for both.
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION,
        WEBSITE,
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/faq`,
          url: `${SITE_URL}/faq`,
          name: 'Frequently Asked Questions -  Fezer',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#app` },
        },
        {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/faq#faq`,
          mainEntity: FAQ_ITEMS.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        },
      ],
    },
  },
  {
    path: '/press',
    title: 'Press Kit -  Fezer',
    description:
      'The Fezer press kit: fact sheet, boilerplate copy, story angles, downloadable icon and screenshots, and the Introducing Fezer launch video. Free to use in coverage.',
    robots: 'index, follow',
    indexable: true,
    ogSlug: 'press',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION,
        WEBSITE,
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/press`,
          url: `${SITE_URL}/press`,
          name: 'Press Kit -  Fezer',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#app` },
        },
        INTRO_VIDEO_JSONLD,
      ],
    },
  },
  {
    path: '/about',
    title: 'About -  Fezer',
    description:
      'The long-term vision guiding Fezer, the product thesis, the objectives that move that work forward, and the principles it is built on.',
    robots: 'index, follow',
    indexable: true,
    ogSlug: 'about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION,
        WEBSITE,
        {
          '@type': 'AboutPage',
          '@id': `${SITE_URL}/about`,
          url: `${SITE_URL}/about`,
          name: 'About -  Fezer',
          description:
            'The long-term vision guiding Fezer, the product thesis, the objectives, and the principles behind it.',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#organization` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Fezer', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
          ],
        },
      ],
    },
  },
  {
    path: '/whats-new',
    title: 'What’s New -  Fezer',
    description:
      'App releases and notable website additions for Fezer, newest first -  only what has actually shipped, no roadmap promises.',
    robots: 'index, follow',
    indexable: true,
    ogSlug: 'whats-new',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION,
        WEBSITE,
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/whats-new`,
          url: `${SITE_URL}/whats-new`,
          name: 'What’s New -  Fezer',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#app` },
        },
      ],
    },
  },
  {
    path: '/privacypolicy',
    title: 'Privacy Policy -  Fezer',
    description:
      'How Fezer handles your data: your plans stay on your device. No account, no ads. Anonymous product analytics help us keep the app working.',
    robots: 'index, follow',
    indexable: true,
  },
  {
    path: '/delete-account',
    title: 'Delete Your Data -  Fezer',
    description:
      'How to delete your Fezer data. Fezer stores everything on your device, so removing the app removes all of your data.',
    robots: 'noindex, follow',
    indexable: false,
  },
  {
    path: '/404',
    title: 'Page Not Found -  Fezer',
    description: 'The page you are looking for does not exist.',
    robots: 'noindex, follow',
    indexable: false,
  },
];
