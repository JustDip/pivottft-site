// sync-site.mjs — regenerate the PivotTFT website from the latest app build.
//
// Run from the pivottft-landing/ directory AFTER `npm run build` in the
// sibling ../PivotTFT extension repo. It:
//   1. Copies the built JS + CSS bundles into js/ and css/.
//   2. Transforms dist/desktop.html into index.html (and 404.html) — swapping
//      in the public SEO <head> and rewriting asset paths to absolute so deep
//      links like /comps/<slug>/ resolve correctly.
//
// This keeps the website a faithful, never-drifting mirror of the app — the
// website's HTML is no longer hand-maintained.
//
//   node sync-site.mjs

import { readFileSync, writeFileSync, copyFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const DIST = join('..', 'PivotTFT', 'dist');

// --- 1. Copy the JS + CSS bundles ------------------------------------------
let copied = 0;
for (const sub of ['js', 'css']) {
  mkdirSync(sub, { recursive: true });
  for (const file of readdirSync(join(DIST, sub))) {
    copyFileSync(join(DIST, sub, file), join(sub, file));
    copied++;
  }
}

// --- 2. Public SEO <head> --------------------------------------------------
const HEAD = `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>PivotTFT — TFT Meta Comps, Tier Lists & Stats for Set 17</title>
  <meta name="description" content="PivotTFT is a free Teamfight Tactics companion: meta comp tier lists, champion and item stats, positioning guides, a team builder, and lobby scouting for TFT Set 17." />
  <link rel="canonical" href="https://www.pivottft.com/" />
  <meta name="theme-color" content="#151518" />

  <!-- Icons -->
  <link rel="icon" href="/icons/desktop-icon.ico" sizes="any" />
  <link rel="icon" type="image/svg+xml" href="/img/header_icon.svg" />
  <link rel="apple-touch-icon" href="/img/cool_wolf.png" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="PivotTFT" />
  <meta property="og:title" content="PivotTFT — TFT Meta Comps, Tier Lists & Stats" />
  <meta property="og:description" content="Free Teamfight Tactics companion: meta comp tier lists, champion & item stats, positioning guides, and lobby scouting for Set 17." />
  <meta property="og:url" content="https://www.pivottft.com/" />
  <meta property="og:image" content="https://www.pivottft.com/img/cool_wolf.png" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="PivotTFT — TFT Meta Comps, Tier Lists & Stats" />
  <meta name="twitter:description" content="Free Teamfight Tactics companion: meta comps, champion & item stats, positioning, and lobby scouting for Set 17." />
  <meta name="twitter:image" content="https://www.pivottft.com/img/cool_wolf.png" />

  <link rel="stylesheet" href="/css/general.css" />
  <link rel="stylesheet" href="/css/sidebar.css" />
  <link rel="stylesheet" href="/css/desktop.css" />
  <link rel="stylesheet" href="/css/ingame.css" />
  <link rel="stylesheet" href="/css/mh.css" />
  <link rel="stylesheet" href="/css/comp-cards.css" />
  <link rel="stylesheet" href="/css/mobile.css" />
  <script defer src="/js/desktop.js"></script>
</head>`;

// --- 3. Transform desktop.html → index.html + 404.html ---------------------
let html = readFileSync(join(DIST, 'desktop.html'), 'utf8');
html = html.replace(/<head>[\s\S]*?<\/head>/, HEAD);
// Absolute asset paths (safety net — the body carries no relative asset refs).
html = html.replace(/(href|src)="(css|js|img|icons)\//g, '$1="/$2/');

writeFileSync('index.html', html);
writeFileSync('404.html', html);
console.log(`Synced ${copied} bundle files; wrote index.html + 404.html from ${DIST}/desktop.html`);

// --- 4. Regenerate the SSR comp data + sitemap from the PivotTFT source -----
execSync('node gen-ssr-data.mjs', { stdio: 'inherit' });
