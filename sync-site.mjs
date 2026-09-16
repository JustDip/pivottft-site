// sync-site.mjs — regenerate the PivotTFT website from the latest app build.
//
// Run from the pivottft-landing/ directory AFTER `npm run build` in the
// sibling ../PivotTFT extension repo. It:
//   1. Copies the built JS + CSS bundles into js/ and css/.
//   2. Transforms dist/desktop.html into index.html (and 404.html) — swapping
//      in the public SEO <head>, stamping <body class="web-mode"> so the
//      app-only chrome never flashes, and rewriting asset paths to absolute
//      so deep links like /comps/<slug>/ resolve correctly.
//
// Per-comp titles, descriptions and the sitemap are rendered by the server
// (proxy/node/site.mjs) from the comps database — nothing to generate here.
//
//   node sync-site.mjs            # ADS=1 node sync-site.mjs → body.ads-on

import { readFileSync, writeFileSync, copyFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join('..', 'PivotTFT', 'dist');

// --- 1. Copy the JS + CSS bundles ------------------------------------------
let copied = 0;
const WEB_CSS = new Set(['general.css', 'sidebar.css', 'ingame.css', 'desktop.css', 'mh.css', 'comp-cards.css', 'mobile.css']);
for (const sub of ['js', 'css']) {
  mkdirSync(sub, { recursive: true });
  for (const file of readdirSync(join(DIST, sub))) {
    if (sub === 'css' && !WEB_CSS.has(file)) continue;
    if (sub === 'js' && file !== 'desktop.js') continue;
    copyFileSync(join(DIST, sub, file), join(sub, file));
    copied++;
  }
}

// --- 2. Public SEO <head> --------------------------------------------------
const HEAD = `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TFT Set 18 Comp Tier List | PivotTFT</title>
  <meta name="description" content="Curated Teamfight Tactics Set 18 team comps — the editors' tier list with boards, build order, items and augments." />
  <link rel="canonical" href="https://www.pivottft.com/" />
  <meta name="theme-color" content="#151518" />

  <!-- Icons -->
  <link rel="icon" href="/icons/desktop-icon.ico" sizes="any" />
  <link rel="icon" type="image/svg+xml" href="/img/header_icon.svg" />
  <link rel="apple-touch-icon" href="/img/cool_wolf.png" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="PivotTFT" />
  <meta property="og:title" content="TFT Set 18 Comp Tier List | PivotTFT" />
  <meta property="og:description" content="Curated Teamfight Tactics Set 18 team comps — boards, build order, items and augments." />
  <meta property="og:url" content="https://www.pivottft.com/" />
  <meta property="og:image" content="https://www.pivottft.com/img/cool_wolf.png" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="TFT Set 18 Comp Tier List | PivotTFT" />
  <meta name="twitter:description" content="Curated Teamfight Tactics Set 18 team comps — boards, build order, items and augments." />
  <meta name="twitter:image" content="https://www.pivottft.com/img/cool_wolf.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="/css/general.css" />
  <link rel="stylesheet" href="/css/sidebar.css" />
  <link rel="stylesheet" href="/css/ingame.css" />
  <link rel="stylesheet" href="/css/desktop.css" />
  <link rel="stylesheet" href="/css/mh.css" />
  <link rel="stylesheet" href="/css/comp-cards.css" />
  <link rel="stylesheet" href="/css/mobile.css" />
  <script defer src="/js/desktop.js"></script>
</head>`;

// Body classes the site is born with: web-mode hides the app-only chrome
// before any script runs; ads-on shows the reserved slots once a network is
// wired (ADS=1 at build time).
const BODY_CLASSES = ['desktop', 'web-mode', ...(process.env.ADS === '1' ? ['ads-on'] : [])].join(' ');

// --- 3. Transform desktop.html → index.html + 404.html ---------------------
let html = readFileSync(join(DIST, 'desktop.html'), 'utf8');
html = html.replace(/<head>[\s\S]*?<\/head>/, HEAD);
html = html.replace(/<body class="desktop">/, `<body class="${BODY_CLASSES}">`);
// Absolute asset paths (safety net — the body carries no relative asset refs).
html = html.replace(/(href|src)="(css|js|img|icons)\//g, '$1="/$2/');

writeFileSync('index.html', html);
writeFileSync('404.html', html);
console.log(`Synced ${copied} bundle files; wrote index.html + 404.html from ${DIST}/desktop.html`);
