// gen-ssr-data.mjs — extract comp data from the PivotTFT source for SSR.
//
// Run from pivottft-landing/. Uses esbuild to compile the TypeScript comp
// data module, then writes:
//   functions/_comps.json — { slug, name, tier, playstyle, traits, desc } per comp
//   sitemap.xml           — every section URL + every /comps/<slug>/ URL
//
// Slugs MUST stay identical to Router.ts (src/services/Router.ts) so the SSR
// URLs and the client-side router agree.
//
//   node gen-ssr-data.mjs   (also run automatically by sync-site.mjs)

import { execSync } from 'node:child_process';
import { writeFileSync, rmSync } from 'node:fs';

const SITE = 'https://www.pivottft.com';
const TMP = '.ssr-comps.tmp.mjs';

// Compile comps.ts (its only import is a type, which esbuild elides) to ESM.
execSync(
  `npx --yes esbuild ../PivotTFT/src/data/set17/comps.ts --bundle --format=esm --platform=node --outfile=${TMP}`,
  { stdio: 'inherit' }
);
const { metaComps } = await import('./' + TMP);
rmSync(TMP);

// --- slugify — identical rules to Router.ts ---------------------------------
function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
const used = new Set();
function uniqueSlug(name, id) {
  const base = slugify(name) || slugify(id);
  let slug = base, n = 2;
  while (used.has(slug)) slug = `${base}-${n++}`;
  used.add(slug);
  return slug;
}

const comps = metaComps.map(c => ({
  slug: uniqueSlug(c.name, c.id),
  name: c.name,
  tier: c.tier,
  playstyle: c.playstyle,
  traits: c.coreTraits || [],
  desc: c.description || '',
}));
writeFileSync('functions/_comps.json', JSON.stringify(comps));

// --- sitemap.xml -----------------------------------------------------------
const SECTIONS = ['', 'live-meta', 'trends', 'champions', 'traits', 'items',
  'augments', 'team-builder', 'positioning', 'augment-compare', 'comp-lists',
  'tables', 'tacticians', 'set-17', 'guides', 'players', 'leaderboards'];
const urls = [
  ...SECTIONS.map(s => SITE + (s ? `/${s}/` : '/')),
  ...comps.map(c => `${SITE}/comps/${c.slug}/`),
];
writeFileSync('sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n') +
  `\n</urlset>\n`
);

console.log(`SSR data: ${comps.length} comps -> functions/_comps.json; sitemap.xml has ${urls.length} URLs.`);
