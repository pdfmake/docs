import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { baseURL, basePath } from './versions.mjs';
import { root } from './corpus.mjs';

const publicRoot = path.join(root, 'public');
const files = [];
async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.name.endsWith('.html')) files.push(file);
  }
}
await walk(publicRoot);
const documents = new Map();
for (const file of files) {
  const ids = new Set();
  const links = [];
  let h1 = 0;
  let shell = false;
  let description, canonical, redirect;
  const structuredData = [];
  function visit(node) {
    const attrs = Object.fromEntries((node.attrs || []).map(a => [a.name, a.value]));
    if (attrs.id) { assert.ok(!ids.has(attrs.id), `Duplicate ID ${attrs.id} in ${file}`); ids.add(attrs.id); }
    if (node.tagName === 'h1') h1++;
    if (attrs.class === 'sidebar') shell = true;
    if (node.tagName === 'meta' && attrs['http-equiv'] === 'refresh') redirect = attrs.content;
    if (node.tagName === 'meta' && attrs.name === 'description') description = attrs.content;
    if (node.tagName === 'link' && attrs.rel === 'canonical') canonical = attrs.href;
    if (node.tagName === 'script' && attrs.type === 'application/ld+json') structuredData.push(JSON.parse((node.childNodes || []).map(child => child.value || '').join('')));
    for (const attr of ['href', 'src']) if (attrs[attr]) links.push(attrs[attr]);
    for (const child of node.childNodes || []) visit(child);
  }
  visit(parse(await fs.readFile(file, 'utf8')));
  if (redirect) { assert.equal(path.relative(publicRoot, file).replaceAll('\\', '/'), 'en/index.html'); assert.equal(canonical, baseURL); continue; }
  assert.equal(h1, 1, `Expected exactly one main heading: ${file}`);
  if (shell) {
    assert.ok(description, `Missing search description: ${file}`);
    assert.ok(canonical?.startsWith(baseURL), `Invalid canonical URL: ${file}`);
    assert.ok(structuredData.some(item => item['@type'] === 'TechArticle'), `Missing article structured data: ${file}`);
  }
  documents.set(file, { ids, links });
}
const missing = [];
for (const [file, { links }] of documents) {
  const relative = path.relative(publicRoot, file).replaceAll('\\', '/');
  const from = new URL(relative, 'http://docs.local' + basePath);
  for (const link of links) {
    const url = new URL(link, from);
    if (url.origin !== from.origin || !url.pathname.startsWith(basePath)) continue;
    const local = decodeURIComponent(url.pathname.slice(basePath.length));
    const target = path.join(publicRoot, local.endsWith('/') || !local ? local + 'index.html' : local);
    if (!(await fs.stat(target).catch(() => null))?.isFile()) { missing.push(`${relative}: ${link}`); continue; }
    if (url.hash && documents.has(target) && !documents.get(target).ids.has(decodeURIComponent(url.hash.slice(1)))) missing.push(`${relative}: missing fragment ${link}`);
  }
}
assert.deepEqual(missing, [], 'Broken internal links or fragment targets');
for (const name of ['sitemap.xml', 'robots.txt', 'llms.txt', 'llms-full.txt', 'docs-index.json']) {
  assert.ok((await fs.stat(path.join(publicRoot, name))).size > 0, `Missing ${name}`);
}
console.log(`Checked ${documents.size} HTML pages: headings, IDs, internal links, fragments and discovery files`);
