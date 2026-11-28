import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveVersion, versionConfig, activeVersion, rebaseLinks, versionTargets } from '../scripts/versions.mjs';
import { loadPages } from '../scripts/corpus.mjs';

test('version registry rejects missing snapshots, duplicate IDs and mismatched runtimes', () => {
  assert.equal(resolveVersion(versionConfig).id, versionConfig.current);
  assert.throws(() => resolveVersion(versionConfig, '999.0'), /No managed/);
  assert.throws(() => resolveVersion(versionConfig, '0.1'), /No managed/);
  assert.throws(() => resolveVersion({ ...versionConfig, releases: [...versionConfig.releases, versionConfig.releases[0]] }), /duplicate/);
  assert.throws(() => resolveVersion({ ...versionConfig, releases: versionConfig.releases.map(item => item.id === versionConfig.current ? { ...item, libraryVersion: '9999.0.0' } : item) }), /Library version/);
});

test('future snapshot isolates URLs, Markdown, MCP URIs and links while preserving source code', async () => {
  const release = { id: '999.0', label: '999.0.x', ref: 'next', libraryVersion: '999.0.0', status: 'preview', managed: true };
  const config = { ...versionConfig, sourceVersion: '0.3', releases: [...versionConfig.releases, release] };
  const future = resolveVersion(config, '999.0');
  const pages = await loadPages({ version: future });
  assert.equal(pages.length, (await loadPages()).length);
  for (const page of pages) {
    assert.equal(page.version, '999.0');
    assert.ok(page.path.startsWith('/docs/999.0/'));
    assert.ok(page.uri.startsWith('pdfmake://docs/999.0/'));
    assert.ok(page.url.startsWith(future.baseURL));
    assert.match(page.markdown, /Version: pdfmake 999\.0\.x/);
  }
  const sample = '[Guide](/docs/0.3/guides/)\n```js\nconst literal = "/docs/0.3/";\n```';
  assert.equal(rebaseLinks(sample, future), '[Guide](/docs/999.0/guides/)\n```js\nconst literal = "/docs/0.3/";\n```');
});

test('version switch preserves only confirmed chapters/languages and otherwise labels the home fallback', () => {
  const page = { version: activeVersion.id, language: 'de', translationKey: 'document-definition-object/tables' };
  const links = versionTargets(page);
  assert.equal(links.find(link => link.current).url, activeVersion.basePath + 'de/document-definition-object/tables/');
  assert.equal(links.find(link => link.id === '0.1').url, new URL('/docs/0.1/', versionConfig.origin).href);
  assert.equal(links.find(link => link.id === '0.1').sameChapter, false);
  const config = { releases: [{ id: '999.0', label: '999.0.x', managed: true, chapters: [page.translationKey], languages: ['en', 'de'] }] };
  assert.equal(versionTargets(page, config)[0].url, '/docs/999.0/de/document-definition-object/tables/');
});
