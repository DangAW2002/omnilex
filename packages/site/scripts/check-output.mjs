// T-P8: the search page loads shards instead of JSON embedded in the HTML.
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('dist');
const manifest = JSON.parse(fs.readFileSync(path.resolve('../../dist/manifest.json'), 'utf-8'));
const failures = [];
const expectFile = (relPath) => {
  if (!fs.existsSync(path.join(outDir, relPath))) failures.push(`missing ${relPath}`);
};

expectFile('data/manifest.json');
for (const locale of ['vi', 'en']) {
  const html = fs.readFileSync(path.join(outDir, locale, 'index.html'), 'utf-8');
  if (html.includes('search-data')) failures.push(`${locale}/index.html still embeds search data`);
  expectFile(`data/${locale}/search-index.json`);
  for (const pack of manifest.packs.filter((item) => item.kind === 'content')) {
    expectFile(`data/packs/${pack.id}/${locale}/cards.json`);
    expectFile(`data/packs/${pack.id}/${locale}/search-index.json`);
  }
}

const scripts = fs.readdirSync(path.join(outDir, '_astro')).filter((file) => file.endsWith('.js'));
if (!scripts.some((file) => fs.readFileSync(path.join(outDir, '_astro', file), 'utf-8').includes('search-index.json'))) {
  failures.push('no client script fetches search-index.json');
}

if (failures.length > 0) {
  console.error(`T-P8 failed:\n  - ${failures.join('\n  - ')}`);
  process.exit(1);
}
console.log('T-P8: search page reads shards (no embedded search data)');
