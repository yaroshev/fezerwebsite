// Generates 1200x630 social share cards into public/og/.
//
// Run manually with `npm run og` whenever page titles or screenshots change.
// The output PNGs are committed to the repo so the Netlify build never has to
// rasterize text -- font availability differs between machines and CI images,
// and a card that silently falls back to a different typeface is worse than a
// card that is simply regenerated on purpose.
//
// Requires the optional `sharp` devDependency. If it is missing, this script
// tells you how to install it and exits without touching anything.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'og');

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('\n[og] `sharp` is not installed. Run: npm i -D sharp\n');
  process.exit(1);
}

const W = 1200;
const H = 630;

const NAVY = '#0d2b57';
const NAVY_DEEP = '#071b3a';
const ACCENT = '#7fb0ff';

/** Escape text for embedding in SVG. */
function esc(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Greedy word wrap. Widths are approximated from average glyph advance for the
 * DejaVu/Liberation metrics we render with -- close enough for a fixed-size
 * card, and it keeps us from needing a font-metrics dependency.
 */
function wrap(text, fontSize, maxWidth) {
  const avg = fontSize * 0.54;
  const maxChars = Math.floor(maxWidth / avg);
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const FONT = "DejaVu Sans, Liberation Sans, Helvetica Neue, Helvetica, Arial, sans-serif";

function cardSvg({ title, eyebrow, footnote }) {
  // The title block is top-aligned under the eyebrow and must clear the
  // footnote. Rather than let a long title overflow, step the size down until
  // it fits in the available band.
  const FIRST_BASELINE = 252;
  const MAX_BOTTOM = 458;

  let titleSize = 68;
  let lines = wrap(title, titleSize, 620);
  let lineHeight = Math.round(titleSize * 1.2);

  while (
    titleSize > 40 &&
    FIRST_BASELINE + (lines.length - 1) * lineHeight > MAX_BOTTOM
  ) {
    titleSize -= 4;
    lines = wrap(title, titleSize, 620);
    lineHeight = Math.round(titleSize * 1.2);
  }

  const titleTspans = lines
    .map(
      (line, i) =>
        `<tspan x="80" y="${FIRST_BASELINE + i * lineHeight}">${esc(line)}</tspan>`
    )
    .join('');

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="${NAVY_DEEP}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.30" r="0.55">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Wordmark row. The icon itself is composited in afterwards by sharp. -->
  <text x="152" y="98" font-family="${FONT}" font-size="34" font-weight="700"
        fill="#ffffff" letter-spacing="-0.5">Fezer</text>

  <text x="80" y="170" font-family="${FONT}" font-size="22" font-weight="600"
        fill="${ACCENT}" letter-spacing="2.4">${esc(eyebrow.toUpperCase())}</text>

  <text font-family="${FONT}" font-size="${titleSize}" font-weight="700"
        fill="#ffffff" letter-spacing="-1.4">${titleTspans}</text>

  <text x="80" y="546" font-family="${FONT}" font-size="25" font-weight="400"
        fill="#b9cdf0">${esc(footnote)}</text>
</svg>`);
}

/** Rounded-corner mask used for both the app icon and the screenshot frame. */
function roundedMask(width, height, radius) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
       <rect width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="#fff"/>
     </svg>`
  );
}

async function roundedImage(input, width, height, radius) {
  const resized = await sharp(input)
    .resize(width, height, { fit: 'cover', position: 'top' })
    .toBuffer();

  return sharp(resized)
    .composite([{ input: roundedMask(width, height, radius), blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function buildCard({ slug, title, eyebrow, footnote, screenshot }) {
  const layers = [];

  // App icon, top-left.
  layers.push({
    input: await roundedImage(path.join(root, 'public', 'fezer-app-icon.png'), 56, 56, 14),
    top: 46,
    left: 80,
  });

  // Product screenshot, right side, cropped and bleeding off the bottom edge.
  if (screenshot) {
    const file = path.join(root, 'public', screenshot.replace(/^\//, ''));
    if (fs.existsSync(file)) {
      const shotW = 340;
      const shotH = 500;
      layers.push({
        input: await roundedImage(file, shotW, shotH, 30),
        top: 150,
        left: W - shotW - 88,
      });
    } else {
      console.warn(`[og] missing screenshot for ${slug}: ${screenshot}`);
    }
  }

  const png = await sharp(cardSvg({ title, eyebrow, footnote }))
    .composite(layers)
    .png({ compressionLevel: 9 })
    .toBuffer();

  const outPath = path.join(outDir, `${slug}.png`);
  fs.writeFileSync(outPath, png);
  console.log(`[og] ${path.relative(root, outPath)} (${(png.length / 1024).toFixed(0)} KB)`);
}

// --- card definitions -------------------------------------------------------
// Titles are written for a social feed, not for Google. They are deliberately
// shorter and punchier than the <title> tags.

const CARDS = [
  {
    slug: 'default',
    eyebrow: 'Day planner for iPhone',
    title: 'Plan your time. Track reality. Move goals forward.',
    footnote: 'Free · iPhone & iPad · No account, no cloud',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'day-planner-app',
    eyebrow: 'Day planner',
    title: 'A day planner built around what you do now',
    footnote: 'Free · iPhone & iPad · No account required',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'time-blocking-app',
    eyebrow: 'Time blocking',
    title: 'Time blocking that survives contact with a real day',
    footnote: 'Free · iPhone & iPad · No account required',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'time-tracker',
    eyebrow: 'Time tracker',
    title: 'See where your time actually went',
    footnote: 'Free · iPhone & iPad · Everything stays on device',
    screenshot: '/images/fezer-time-tracker.webp',
  },
  {
    slug: 'goal-planner',
    eyebrow: 'Goal planner',
    title: 'Goals that claim real hours in your week',
    footnote: 'Free · iPhone & iPad · No account required',
    screenshot: '/images/fezer-goal-planner.webp',
  },
  {
    slug: 'vision-board-app',
    eyebrow: 'Vision board',
    title: 'A vision board wired to your actual schedule',
    footnote: 'Free · iPhone & iPad · No account required',
    screenshot: '/images/fezer-vision-board-app.webp',
  },
  {
    slug: 'weekly-planner',
    eyebrow: 'Weekly planner',
    title: 'Plan the week, then see how it really went',
    footnote: 'Free · iPhone & iPad · No account required',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'structured-alternative',
    eyebrow: 'Fezer vs Structured',
    title: 'Structured plans your day. Fezer also records it.',
    footnote: 'Free · iPhone & iPad · No account, no cloud',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'offline-planner-app',
    eyebrow: 'Private by design',
    title: 'A planner with no account, no cloud, no tracking',
    footnote: 'Free · iPhone & iPad · Works fully offline',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'plan-vs-actual-time-tracking',
    eyebrow: 'Plan vs. reality',
    title: 'Put the day you planned next to the day you had',
    footnote: 'Free · iPhone & iPad · No account required',
    screenshot: '/images/fezer-time-tracker.webp',
  },
  {
    slug: 'sunsama-alternative',
    eyebrow: 'Fezer vs Sunsama',
    title: 'The daily planning loop, without the subscription',
    footnote: 'Free · iPhone & iPad · No account, no cloud',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'ticktick-alternative',
    eyebrow: 'Fezer vs TickTick',
    title: 'Start with your hours, not your list',
    footnote: 'Free · iPhone & iPad · No account, no cloud',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'tiimo-alternative',
    eyebrow: 'Fezer vs Tiimo',
    title: 'A visual day planner that also records the day',
    footnote: 'Free · iPhone & iPad · No account, no cloud',
    screenshot: '/images/fezer-time-tracker.webp',
  },
  {
    slug: 'todoist-alternative',
    eyebrow: 'Fezer vs Todoist',
    title: 'For when the list stops being the problem',
    footnote: 'Free · iPhone & iPad · No account, no cloud',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'guides',
    eyebrow: 'Guides',
    title: 'Guides to planning days that hold',
    footnote: 'Time blocking · Estimation · Reviews · Goals',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'guide-how-to-time-block',
    eyebrow: 'Guide',
    title: 'How to time block, in practice',
    footnote: 'A practical guide · fezer.app/guides',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'guide-why-your-schedule-slips',
    eyebrow: 'Guide',
    title: 'Why your schedule keeps slipping',
    footnote: 'The planning fallacy, fixed with a record',
    screenshot: '/images/fezer-time-tracker.webp',
  },
  {
    slug: 'guide-weekly-review',
    eyebrow: 'Guide',
    title: 'A 10-minute weekly review that uses evidence',
    footnote: 'Three questions · one change · ten minutes',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'guide-turn-goals-into-a-schedule',
    eyebrow: 'Guide',
    title: 'Turn goals into a schedule you actually follow',
    footnote: 'Decompose · commit · audit the hours',
    screenshot: '/images/fezer-goal-planner.webp',
  },
  {
    slug: 'faq',
    eyebrow: 'FAQ',
    title: 'Every question about Fezer, answered plainly',
    footnote: 'Free · iPhone & iPad · Data Not Collected',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'vision',
    eyebrow: 'Vision',
    title: 'The long-term vision guiding Fezer',
    footnote: 'Infrastructure for humanity’s next frontier',
    screenshot: '/images/fezer-vision-board-app.webp',
  },
  {
    slug: 'press',
    eyebrow: 'Press kit',
    title: 'Fezer, for people writing about it',
    footnote: 'Facts, assets and the launch video',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
  {
    slug: 'whats-new',
    eyebrow: 'Changelog',
    title: 'What’s new in Fezer',
    footnote: 'App releases and site updates',
    screenshot: '/images/fezer-time-blocking-planner.webp',
  },
];

fs.mkdirSync(outDir, { recursive: true });
for (const card of CARDS) {
  await buildCard(card);
}
console.log(`[og] generated ${CARDS.length} cards`);
