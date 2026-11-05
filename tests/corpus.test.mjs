import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { activeVersion, basePath, versionConfig } from '../scripts/versions.mjs';
import { loadPages, searchPages } from '../scripts/corpus.mjs';

test('all authored pages are versioned, discoverable and exported', async () => {
  const pages = await loadPages();
  assert.ok(pages.length >= 50);
  assert.equal(new Set(pages.map(p => p.id)).size, pages.length);
  const snapshot = JSON.parse(await fs.readFile(new URL('../static/docs-index.json', import.meta.url), 'utf8'));
  assert.deepEqual(snapshot.pages, pages.filter(page => page.language === 'en'));
  assert.doesNotMatch(pages.find(page => page.id === 'index').markdown, /<div class="cards"/);
  assert.match(pages.find(page => page.id === 'learn/first-pdf').markdown, /var dd =/);
  for (const page of pages) {
    assert.equal(page.version, activeVersion.id);
    assert.ok(page.description.length > 30, page.id);
    assert.ok(page.markdown.includes(`Version: pdfmake ${activeVersion.label}`));
    assert.doesNotMatch(page.markdown, /\{\{[%<]/);
  }
});

test('translations have matching sources, isolated search indexes and Markdown discovery', async () => {
  const pages = await loadPages();
  const englishKeys = pages.filter(page => page.language === 'en').map(page => page.translationKey).sort();
  for (const language of ['de', 'fr', 'es', 'pt-br']) {
    const localized = pages.filter(page => page.language === language);
    assert.deepEqual(localized.map(page => page.translationKey).sort(), englishKeys, `Incomplete translations: ${language}`);
    const snapshot = JSON.parse(await fs.readFile(new URL(`../static/${language}/docs-index.json`, import.meta.url), 'utf8'));
    assert.deepEqual(snapshot.pages, localized);
    const corpus = await fs.readFile(new URL(`../static/${language}/llms-full.txt`, import.meta.url), 'utf8');
    for (const page of localized) {
      const english = pages.find(p => p.language === 'en' && p.translationKey === page.translationKey);
      assert.ok(english, page.id);
      const source = (await fs.readFile(new URL('../content/' + english.source, import.meta.url), 'utf8')).replaceAll('\r\n', '\n');
      assert.equal(page.sourceDigest, createHash('sha256').update(source).digest('hex'), `Review translation after source changes: ${page.source}`);
      assert.ok(page.path.startsWith(`${basePath}${language}/`));
      assert.ok(corpus.includes(page.markdown));
      assert.equal(await fs.readFile(new URL(`../static/markdown/${page.id}.md`, import.meta.url), 'utf8'), page.markdown);
    }
  }
});

test('translations preserve examples, section structure, tables and localized navigation', async () => {
  const pages = await loadPages();
  const english = new Map(pages.filter(page => page.language === 'en').map(page => [page.translationKey, page]));
  const source = async page => (await fs.readFile(new URL('../content/' + page.source, import.meta.url), 'utf8')).replaceAll('\r\n', '\n');
  const fences = text => [...text.matchAll(/^```([^\n]*)\n([\s\S]*?)^```[ \t]*$/gm)].map(match => [match[1].trim(), match[2]]);
  const examples = text => [...text.matchAll(/\{\{[<%]\s*example\s+id="([\w-]+)"\s*[>%]\}\}/g)].map(match => match[1]);
  const prose = text => text.replace(/^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm, '');
  const headings = text => [...prose(text).matchAll(/^(#{1,6})[ \t]+/gm)].map(match => match[1].length);
  const tableRows = text => prose(text).split('\n').filter(line => line.trimStart().startsWith('|')).length;
  const sourceBasePath = `/docs/${versionConfig.sourceVersion}/`;
  const escapedPath = sourceBasePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const internalLinks = text => [...prose(text).replace(/`[^`\n]+`/g, '').matchAll(new RegExp(String.raw`\[[^\]]*\]\((${escapedPath}[^)\s]*)\)|href=["'](${escapedPath}[^"']*)["']`, 'g'))].map(match => match[1] || match[2]);
  for (const page of pages.filter(page => page.language !== 'en')) {
    const original = await source(english.get(page.translationKey)), translated = await source(page);
    assert.deepEqual(fences(translated), fences(original), `Changed or missing code examples: ${page.source}`);
    assert.deepEqual(examples(translated), examples(original), `Changed or missing runnable examples: ${page.source}`);
    assert.deepEqual(headings(translated), headings(original), `Missing or restructured documentation sections: ${page.source}`);
    assert.equal(tableRows(translated), tableRows(original), `Missing documentation table rows: ${page.source}`);
    const links = internalLinks(translated);
    for (const href of links) assert.ok(href.startsWith(`${sourceBasePath}${page.language}/`), `Unlocalized link in ${page.source}: ${href}`);
    const equivalents = new Set(links.map(href => href.replace(`${sourceBasePath}${page.language}/`, sourceBasePath)));
    for (const href of internalLinks(original)) assert.ok(equivalents.has(href), `Missing reference in ${page.source}: ${href}`);
  }
});

test('task-based navigation includes every documentation chapter exactly once', async () => {
  const pages = (await loadPages()).filter(page => page.language === 'en' && page.translationKey !== 'playground');
  const groups = JSON.parse(await fs.readFile(new URL('../data/navigation.json', import.meta.url), 'utf8'));
  const ids = groups.flatMap(group => group.pages);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate chapters in navigation');
  assert.deepEqual([...ids].sort(), pages.map(page => page.id).sort(), 'No hidden or orphaned chapters');
});

test('search finds feature, runtime, security and migration pages deterministically', async () => {
  const pages = (await loadPages()).filter(page => page.language === 'en');
  for (const [query, id] of [['tables', 'document-definition-object/tables'], ['resource security', 'guides/resource-security'], ['invoice', 'guides/invoice'], ['Node.js quickstart', 'getting-started/server-side']]) {
    assert.ok(searchPages(pages, query, 3).some(p => p.id === id), query);
  }
  assert.deepEqual(searchPages(pages, '  !!! '), []);
  assert.deepEqual(searchPages(pages, 'no_such_topic_92f3'), []);
  assert.equal(searchPages(pages, 'font', 2).length, 2);
});
