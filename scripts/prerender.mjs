// Build-time prerendering: renders every route to static HTML with
// route-specific <head> tags, and generates sitemap.xml from the same
// route list. Runs after `vite build` (client) and the SSR build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');

/**
 * The Feature Arena is the one page whose content lives in the database rather
 * than in this repo, so the prerender reads it and bakes it in.
 *
 * Three things follow from that: a crawler sees the actual matchup instead of
 * an empty shell, a shared link unfurls with the two feature names in its title,
 * and the page paints the battle rather than a spinner. The snapshot is only as
 * fresh as the last deploy -- the browser refetches on mount, and publishing a
 * battle from the admin fires a rebuild.
 *
 * This has to happen before the SSR bundle is imported: the store reads the
 * snapshot as its module initialises.
 */
let arenaFeed = null;
let closeArenaDb = null;
try {
  const arena = await import(pathToFileURL(path.join(root, 'server/arena.mjs')).href);
  const db = await import(pathToFileURL(path.join(root, 'server/db.mjs')).href);
  closeArenaDb = db.closeDb;
  arenaFeed = await arena.publicBattles(null);
  console.log(
    `[prerender] arena snapshot: ${arenaFeed.live.length} live, ${arenaFeed.closed.length} decided`
  );
} catch (error) {
  // A build without database access still ships; the page just fetches on mount.
  console.warn(`[prerender] arena snapshot unavailable: ${error.message}`);
  arenaFeed = null;
}

globalThis.__FEZER_ARENA__ = arenaFeed ?? undefined;

const arenaScript = arenaFeed
  ? `<script>window.__FEZER_ARENA__=${JSON.stringify(arenaFeed).replace(/</g, '\\u003c')}</script>`
  : '';

const {
  render,
  ROUTES_META,
  APP_STORE_ID,
  SITE_URL,
  ogImageUrl,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} = await import(path.join(root, 'dist-server/entry-server.js'));

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * The arena's own title and description name the two features in play, so a link
 * to it reads "Calendar sync vs Weekly review" rather than generic page copy.
 */
function withLiveBattle(route) {
  const live = arenaFeed?.live?.[0];
  if (route.path !== '/feature-arena' || !live) return route;

  return {
    ...route,
    title: `${live.a.title} vs ${live.b.title} -  Vote on What Fezer Builds Next`,
    description: `${live.a.title} or ${live.b.title}? Vote in the Fezer Feature Arena. One vote per person, and the winner is the next feature we build.`,
  };
}

function buildHead(route) {
  const url = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  // 1200x630 card so links unfurl as a large preview on X, LinkedIn, Slack,
  // Discord and Facebook instead of a small square icon thumbnail.
  const image = ogImageUrl(route.ogSlug);

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${route.robots}" />`,
  ];

  if (route.indexable) {
    tags.push(`<link rel="canonical" href="${url}" />`);
  }

  tags.push(
    `<meta property="og:site_name" content="Fezer" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:secure_url" content="${image}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    `<meta property="og:image:alt" content="${title}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${title}" />`,
    `<meta name="apple-itunes-app" content="app-id=${APP_STORE_ID}, app-argument=${url}" />`
  );

  if (arenaScript) tags.push(arenaScript);

  if (route.jsonLd) {
    // Escape closing tags so the JSON cannot break out of the script element.
    const json = JSON.stringify(route.jsonLd).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }

  return tags.join('\n    ');
}

// Flat files (`about.html`), not directories (`about/index.html`). With Netlify's
// pretty_urls enabled, a flat file is served at its extensionless path with a 200,
// so /time-blocking-app resolves directly. A directory would instead make Netlify
// 301 /time-blocking-app -> /time-blocking-app/, which conflicts with the
// slash-less canonical and sitemap entries below and reads to Googlebot as a
// redirect error. Keep this in sync with the URLs built in buildHead/sitemap.
function outputPathFor(routePath) {
  if (routePath === '/') return path.join(distDir, 'index.html');
  if (routePath === '/404') return path.join(distDir, '404.html'); // Netlify custom 404 page
  return path.join(distDir, `${routePath.slice(1)}.html`);
}

// House style bans the em dash. Battle copy comes from the database and is
// baked in here, so this is the one place that sees every string the site ships.
const withEmDash = [];

for (const route of ROUTES_META) {
  const appHtml = render(route.path === '/404' ? '/__not_found__' : route.path);
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('<!--app-head-->', buildHead(withLiveBattle(route)))
    .replace('<!--app-html-->', appHtml);

  if (html.includes('\u2014')) withEmDash.push(route.path);

  const outPath = outputPathFor(route.path);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`prerendered ${route.path} -> ${path.relative(root, outPath)}`);
}

if (withEmDash.length > 0) {
  console.warn(`[prerender] em dash on ${withEmDash.length} page(s): ${withEmDash.join(', ')}`);
}

// Sitemap: indexable routes only, kept in sync with the prerendered pages.
const today = new Date().toISOString().slice(0, 10);
const sitemapEntries = ROUTES_META.filter((route) => route.indexable)
  .map((route) => {
    const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
    const priority = route.path === '/' ? '1.0' : route.path === '/privacypolicy' ? '0.3' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log('generated sitemap.xml');

// The connection pool would keep this process alive long after the files are on
// disk.
if (closeArenaDb) await closeArenaDb();
