// Offline search of the vendored IconMCP archive: node scripts/icons/search-iconmcp.mjs <words...>
// Prints matching icon names (every word must appear in the name, label, tags or category), best first.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const words = process.argv.slice(2).map((w) => w.toLowerCase());
if (!words.length) {
  console.error('usage: node scripts/icons/search-iconmcp.mjs <words...>');
  process.exit(1);
}
const archive = JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(process.cwd(), 'vendor/iconmcp/iconmcp-outline.json.gz'))));
const picked = new Set(JSON.parse(fs.readFileSync(path.join(process.cwd(), 'vendor/iconmcp/picked.json'), 'utf8')).outline);

const hits = archive.icons
  .map((icon) => {
    const fields = [icon.name, icon.label.toLowerCase(), ...icon.tags, icon.category];
    if (!words.every((w) => fields.some((f) => f.includes(w)))) return null;
    // Exact name first, then name matches, then shorter (base) names.
    const score = (icon.name === words.join('-') ? 0 : 2) - (words.every((w) => icon.name.includes(w)) ? 1 : 0);
    return { icon, score };
  })
  .filter(Boolean)
  .sort((a, b) => a.score - b.score || a.icon.name.length - b.icon.name.length);

for (const { icon } of hits.slice(0, 40)) {
  console.log(`${icon.name.padEnd(32)} ${picked.has(icon.name) ? 'vendored ' : '         '}${icon.label} [${icon.tags.join(', ')}]`);
}
if (hits.length > 40) console.log(`... ${hits.length - 40} more`);
