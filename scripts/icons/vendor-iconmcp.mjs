/**
 * Generates the app's icon components from data committed in vendor/:
 *
 *   vendor/iconmcp/iconmcp-outline.json.gz  every IconMCP outline icon (archive-iconmcp.mjs)
 *   vendor/iconmcp/picked.json              the names the app uses: { outline: [], solid: [] }
 *   vendor/iconmcp/solid.json               the few solid icons (not in the archive)
 *   vendor/brands/extra-marks.json          brand marks Simple Icons lacks
 *   simple-icons (devDependency)            the other brand marks
 *
 * into src/components/icons/iconmcp/icons.tsx and src/components/icons/brands.tsx.
 *
 *   node scripts/icons/vendor-iconmcp.mjs           regenerate (offline)
 *   node scripts/icons/vendor-iconmcp.mjs --fetch   refresh solid.json + extra-marks.json first (network, by hand only)
 *
 * To add an icon: find it with `node scripts/icons/search-iconmcp.mjs <words>`, add its name to picked.json
 * (solid only for deliberately filled marks; then run --fetch), and regenerate.
 *
 * Owner ruling 2026-11-06: regular weight is stroke-width 1 on the 16-unit grid (the archive is drawn at the
 * library default 0.833). Three details of the drawing depend on the stroke, matching iconmcp.com's renderer
 * at size 16 (checked against get_icon for every picked icon):
 *   dots (circle r 0.55 at 0.833)            r = 0.66 * stroke
 *   mask knock-outs (stroke-width 2.167)     stroke-width = stroke + 2
 *   mask ids (iconmcp-<name>-m)              useId(), so two icons on one page never share an id
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import * as simpleIcons from 'simple-icons';

const root = process.cwd();
const vendor = (...p) => path.join(root, 'vendor', ...p);
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const picked = readJson(vendor('iconmcp', 'picked.json'));

const SIMPLE_ICONS = ['facebook', 'instagram', 'x', 'youtube', 'tiktok', 'threads', 'google', 'pinterest', 'bluesky', 'reddit', 'mastodon', 'discord'];
const EXTRA_MARKS = {
  linkedin: { iconify: 'cib/linkedin', source: 'CoreUI Brands', licence: 'CC0-1.0' },
  slack: { iconify: 'cib/slack', source: 'CoreUI Brands', licence: 'CC0-1.0' },
  googleBusinessProfile: { iconify: 'mdi/google-my-business', source: 'Material Design Icons', licence: 'Apache-2.0' },
};

if (process.argv.includes('--fetch')) await fetchNetworkData();

const archive = JSON.parse(zlib.gunzipSync(fs.readFileSync(vendor('iconmcp', 'iconmcp-outline.json.gz'))));
const outlineByName = new Map(archive.icons.map((icon) => [icon.name, icon.outline]));
const solidByName = readJson(vendor('iconmcp', 'solid.json')).icons;

const pascal = (name) => name.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
const exportName = (name, style = 'outline') => `Icon${pascal(name)}${style === 'solid' ? 'Solid' : ''}`;

const ROOT_ATTRS = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="0.833" stroke-linecap="round" stroke-linejoin="round"';
const camel = (attr) => attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

/** One IconMCP svg string -> the JSX body of its component. Throws on anything the stroke rules don't cover. */
function toComponent(name, style, svg) {
  const label = `${name} (${style})`;
  svg = svg.replace(/^(<svg[^>]*?)\s+width="\d+"\s+height="\d+"/, '$1').replace(/>\s+</g, '><').trim();
  const open = svg.match(/^<svg ([^>]*)>/);
  if (!open || open[1] !== ROOT_ATTRS) throw new Error(`${label}: unexpected root <svg ${open?.[1]}>`);
  const inner = svg.slice(open[0].length, -'</svg>'.length);
  const maskId = `iconmcp-${name}-m`;
  let usesStroke = false;
  let usesMask = false;
  const jsx = inner.replace(/<(\/?)([a-zA-Z]+)([^>]*?)(\/?)>/g, (_, close, tag, attrText, selfClose) => {
    if (close) return `</${tag}>`;
    const attrs = [...attrText.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => {
      if (key === 'id' && value === maskId) { usesMask = true; return 'id={maskId}'; }
      if (key === 'mask' && value === `url(#${maskId})`) return 'mask={`url(#${maskId})`}';
      if (key === 'id' || key === 'mask') throw new Error(`${label}: unexpected ${key}="${value}"`);
      if (key === 'stroke-width') {
        if (value !== '2.167') throw new Error(`${label}: unexpected stroke-width ${value}`);
        usesStroke = true;
        return 'strokeWidth={stroke + 2}';
      }
      if (tag === 'circle' && key === 'r' && value === '0.55') { usesStroke = true; return 'r={0.66 * stroke}'; }
      return `${camel(key)}="${value}"`;
    });
    return `<${tag}${attrs.length ? ` ${attrs.join(' ')}` : ''}${selfClose ? ' /' : ''}>`;
  });
  const hooks = [usesStroke && '  const stroke = strokeOf(props);', usesMask && '  const maskId = useId();'].filter(Boolean);
  return [
    ...(/shape/i.test(name) ? ['// oxlint-disable-next-line anti-slop/no-shape-in-symbol-names -- the name is IconMCP\'s own icon name.'] : []),
    `export function ${exportName(name, style)}(props: AppIconProps) {`,
    ...hooks,
    `  return <svg {...lineIconProps(props)}>${jsx}</svg>;`,
    '}',
  ].join('\n');
}

const components = [];
for (const name of picked.outline) {
  const svg = outlineByName.get(name);
  if (!svg) throw new Error(`${name}: not in the IconMCP archive`);
  components.push(toComponent(name, 'outline', svg));
}
for (const name of picked.solid) {
  if (!solidByName[name]) throw new Error(`${name}: not in vendor/iconmcp/solid.json; run with --fetch`);
  components.push(toComponent(name, 'solid', solidByName[name]));
}
const exportNames = [...picked.outline.map((n) => exportName(n)), ...picked.solid.map((n) => exportName(n, 'solid'))];
const dupes = exportNames.filter((n, i) => exportNames.indexOf(n) !== i);
if (dupes.length) throw new Error(`export name collision: ${dupes.join(', ')}`);

const usesUseId = components.some((c) => c.includes('useId()'));
write('src/components/icons/iconmcp/icons.tsx', [
  '// Generated by scripts/icons/vendor-iconmcp.mjs from vendor/iconmcp. Do not edit by hand.',
  '// IconMCP (https://iconmcp.com), MIT, Copyright (c) 2026 UI8. See THIRD_PARTY_NOTICES.md.',
  ...(usesUseId ? ["import { useId } from 'react';"] : []),
  "import type { AppIconProps } from '../icon-types';",
  "import { lineIconProps, strokeOf } from './svg-props';",
  '',
  components.join('\n\n'),
  '',
].join('\n'));

// Brand marks: single path, fill="currentColor".
const marks = SIMPLE_ICONS.map((slug) => {
  const icon = simpleIcons[`si${slug[0].toUpperCase()}${slug.slice(1)}`];
  if (!icon) throw new Error(`simple-icons has no ${slug}`);
  return { key: slug, title: icon.title, viewBox: '0 0 24 24', path: icon.path, source: 'Simple Icons', licence: 'CC0-1.0' };
});
const extra = readJson(vendor('brands', 'extra-marks.json')).marks;
for (const key of Object.keys(EXTRA_MARKS)) {
  if (!extra[key]) throw new Error(`vendor/brands/extra-marks.json has no ${key}; run with --fetch`);
  marks.push({ key, ...extra[key] });
}
const simpleIconsVersion = readJson(path.join(root, 'node_modules', 'simple-icons', 'package.json')).version;
write('src/components/icons/brands.tsx', [
  '// Generated by scripts/icons/vendor-iconmcp.mjs. Do not edit by hand.',
  `// Simple Icons ${simpleIconsVersion} (CC0), CoreUI Brands (CC0) and Material Design Icons (Apache 2.0). See THIRD_PARTY_NOTICES.md.`,
  "import type { AppIconProps } from './icon-types';",
  "import { iconSvgProps } from './iconmcp/svg-props';",
  '',
  marks.map((m) => [
    `/** ${m.title} (${m.source}, ${m.licence}) */`,
    `export function Brand${m.key[0].toUpperCase()}${m.key.slice(1)}(props: AppIconProps) {`,
    `  return <svg {...iconSvgProps({ fill: 'currentColor', ...props }, '${m.viewBox}')}><path d="${m.path}" /></svg>;`,
    '}',
  ].join('\n')).join('\n\n'),
  '',
].join('\n'));

console.log(`icons.tsx: ${picked.outline.length} outline + ${picked.solid.length} solid; brands.tsx: ${marks.length} marks`);

function write(rel, text) {
  fs.writeFileSync(path.join(root, rel), text);
}

async function fetchNetworkData() {
  let id = 0;
  const solid = {};
  for (const name of picked.solid) {
    const response = await fetch('https://iconmcp.com/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
      body: JSON.stringify({ jsonrpc: '2.0', id: ++id, method: 'tools/call', params: { name: 'get_icon', arguments: { name, format: 'svg', style: 'solid' } } }),
    });
    const json = await response.json();
    if (!json.result || json.result.isError) throw new Error(`get_icon ${name} solid failed`);
    solid[name] = json.result.content[0].text.replace(/>\s+</g, '><').trim();
  }
  fs.writeFileSync(vendor('iconmcp', 'solid.json'), `${JSON.stringify({ source: 'https://iconmcp.com get_icon style solid, library defaults', licence: 'MIT, Copyright (c) 2026 UI8', icons: solid }, null, 2)}\n`);

  const marks = {};
  for (const [key, spec] of Object.entries(EXTRA_MARKS)) {
    const svg = await (await fetch(`https://api.iconify.design/${spec.iconify}.svg`)).text();
    const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
    const paths = [...svg.matchAll(/<path[^>]* d="([^"]+)"/g)].map((m) => m[1]);
    if (!viewBox || paths.length !== 1) throw new Error(`${spec.iconify}: expected one path`);
    marks[key] = { title: key, viewBox, path: paths[0], source: `${spec.source} (${spec.iconify.replace('/', ':')})`, licence: spec.licence };
  }
  marks.linkedin.title = 'LinkedIn';
  marks.slack.title = 'Slack';
  marks.googleBusinessProfile.title = 'Google Business Profile';
  fs.writeFileSync(vendor('brands', 'extra-marks.json'), `${JSON.stringify({ source: 'https://api.iconify.design', marks }, null, 2)}\n`);
}
