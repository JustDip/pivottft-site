// gen-ssr-data.mjs — extract comp / champion / item data from the PivotTFT
// source for SSR.
//
// Run from pivottft-landing/. Uses esbuild to compile each TypeScript data
// module, then writes:
//   functions/_comps.json      — { slug, name, tier, playstyle, traits, desc }
//   functions/_champions.json  — { slug, name, cost, traits }
//   functions/_items.json      — { slug, name, type, components, stats }
//   sitemap.xml                — every section URL + every per-entity URL
//
// Slugs MUST stay identical to Router.ts (src/services/Router.ts) so the SSR
// URLs and the client-side router agree.
//
//   node gen-ssr-data.mjs   (also run automatically by sync-site.mjs)

import { execSync } from 'node:child_process';
import { writeFileSync, rmSync } from 'node:fs';

const SITE = 'https://www.pivottft.com';

function bundleModule(srcRelativePath, exportName) {
  const tmp = `.ssr-${exportName}.tmp.mjs`;
  execSync(
    `npx --yes esbuild ../PivotTFT/${srcRelativePath} --bundle --format=esm --platform=node --outfile=${tmp}`,
    { stdio: 'inherit' }
  );
  return tmp;
}

// --- shared slugify — identical rules to Router.ts -------------------------
function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
function makeUniquer() {
  const used = new Set();
  return (name, id) => {
    const base = slugify(name) || slugify(id);
    let slug = base, n = 2;
    while (used.has(slug)) slug = `${base}-${n++}`;
    used.add(slug);
    return slug;
  };
}

// --- comps -----------------------------------------------------------------
const compsTmp = bundleModule('src/data/set17/comps.ts', 'comps');
const { metaComps } = await import('./' + compsTmp);
rmSync(compsTmp);
const compUniq = makeUniquer();
const comps = metaComps.map(c => ({
  slug: compUniq(c.name, c.id),
  name: c.name,
  tier: c.tier,
  playstyle: c.playstyle,
  traits: c.coreTraits || [],
  desc: c.description || '',
}));
writeFileSync('functions/_comps.json', JSON.stringify(comps));

// --- champions -------------------------------------------------------------
const champsTmp = bundleModule('src/data/set17/champions.ts', 'champions');
const { champions } = await import('./' + champsTmp);
rmSync(champsTmp);
const champUniq = makeUniquer();
const champOut = champions.map(c => ({
  slug: champUniq(c.name, c.id),
  name: c.name,
  cost: c.cost,
  traits: c.traits || [],
}));
writeFileSync('functions/_champions.json', JSON.stringify(champOut));

// --- items -----------------------------------------------------------------
// Items already use a kebab-case `id` as their natural slug; Router.ts mirrors
// this. No name-based collision suffix needed.
const itemsTmp = bundleModule('src/data/set17/items.ts', 'items');
const { items } = await import('./' + itemsTmp);
rmSync(itemsTmp);
const itemOut = items.map(i => ({
  slug: slugify(i.id) || slugify(i.name),
  name: i.name,
  type: i.type || 'normal',
  components: i.components || [],
  stats: (i.stats || '').replace(/@[^@]+@/g, '').slice(0, 240),
})).filter(i => i.slug);
writeFileSync('functions/_items.json', JSON.stringify(itemOut));

// --- sitemap.xml -----------------------------------------------------------
const SECTIONS = ['', 'live-meta', 'trends', 'champions', 'traits', 'items',
  'augments', 'team-builder', 'positioning', 'augment-compare', 'comp-lists',
  'tables', 'tacticians', 'set-17', 'guides', 'players', 'leaderboards'];
const urls = [
  ...SECTIONS.map(s => SITE + (s ? `/${s}/` : '/')),
  ...comps.map(c => `${SITE}/comps/${c.slug}/`),
  ...champOut.map(c => `${SITE}/champions/${c.slug}/`),
  ...itemOut.map(i => `${SITE}/items/${i.slug}/`),
];
writeFileSync('sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n') +
  `\n</urlset>\n`
);

console.log(
  `SSR data: ${comps.length} comps, ${champOut.length} champions, ${itemOut.length} items; sitemap.xml has ${urls.length} URLs.`
);
