import fs from 'node:fs/promises';
import path from 'node:path';
import { root, loadPages, baseURL, languages } from './corpus.mjs';
import { activeVersion, versionConfig, rebaseLinks, versionTargets } from './versions.mjs';
import { createCodeExample, codeKey } from './code-examples.mjs';
import { examples } from '../static/playground/examples.js';

const codeExamples = {};
async function collectCode(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await collectCode(file);
    else if (entry.name.endsWith('.md')) {
      const source = (await fs.readFile(file, 'utf8')).replaceAll('\r\n', '\n');
      for (const match of source.matchAll(/^([ \t]*)```[ \t]*([\w-]*)[ \t]*\n([\s\S]*?)^\1```/gm)) {
        const code = match[3].split('\n').map(line => line.startsWith(match[1]) ? line.slice(match[1].length) : line).join('\n');
        if (/^(js|javascript|ts|typescript)$/.test(match[2]) || (!match[2] && /^\s*(?:\/\/|var\b|const\b|let\b|import\b|[{}]|text:\s*\[)/.test(code))) codeExamples[codeKey(code)] = createCodeExample(code, match[2] || 'js');
      }
    }
  }
}
await collectCode(path.join(root, 'content'));
for (const example of examples) codeExamples[codeKey(example.source)] = createCodeExample(example.source);
const pages = await loadPages({ codeExamples });
const files = new Map();
files.set('static/playground/typed-examples.js', 'export const typedExamples = ' + JSON.stringify(Object.fromEntries(examples.map(example => [example.id, codeExamples[codeKey(example.source)].typescript])), null, 2) + ';\n');
files.set('data/codeExamples.json', JSON.stringify(codeExamples, null, 2) + '\n');
files.set('data/playground.json', JSON.stringify(examples, null, 2) + '\n');
files.set('data/docs-all.json', JSON.stringify({ version: activeVersion.id, pages }, null, 2) + '\n');
for (const language of languages) {
  const localized = pages.filter(page => page.language === language);
  const prefix = language === 'en' ? '' : `${language}/`;
  files.set(`static/${prefix}docs-index.json`, JSON.stringify({ version: activeVersion.id, language, pages: localized }, null, 2) + '\n');
  files.set(`static/${prefix}llms.txt`, `# pdfmake ${activeVersion.id} documentation · ${language}\n\n`
    + `> Generate PDFs in Node.js and browsers from document definitions. This corpus targets ${activeVersion.label} only.\n\n`
    + `Use only examples for ${activeVersion.label}; do not mix APIs from different version series.\n`
    + 'Use synchronous resource access policies. Never execute untrusted document callbacks.\n\n'
    + `Translation coverage: ${localized.length} of ${pages.filter(page => page.language === 'en').length} documentation pages.\n\n`
    + `Full Markdown corpus: ${baseURL}${prefix}llms-full.txt\n\n## Languages\n\n`
    + languages.map(lang => `- [${lang}](${baseURL}${lang === 'en' ? '' : lang + '/'}llms.txt)`).join('\n') + '\n\n## Pages\n\n'
    + localized.map(p => `- [${p.title}](${baseURL}markdown/${p.id}.md): ${p.description}`).join('\n') + '\n');
  files.set(`static/${prefix}llms-full.txt`, localized.map(p => p.markdown).join('\n---\n\n'));
}
for (const page of pages) files.set(`static/markdown/${page.id}.md`, page.markdown);
files.set('data/versionLinks.json', JSON.stringify(Object.fromEntries(pages.map(page => [page.id, versionTargets(page)])), null, 2) + '\n');
files.set('data/docsVersion.json', JSON.stringify({ ...activeVersion, releases: versionConfig.releases }, null, 2) + '\n');
files.set('static/version-snapshot.json', JSON.stringify({ version: activeVersion.id, libraryVersion: activeVersion.libraryVersion, baseURL, languages, chapters: pages.filter(page => page.language === 'en').map(page => page.translationKey) }, null, 2) + '\n');
files.set('static/versions.json', JSON.stringify({ current: versionConfig.current, releases: versionConfig.releases.map(({ id, label, status }) => ({ id, label, status, url: new URL(`/docs/${id}/`, versionConfig.origin).href })) }, null, 2) + '\n');
files.set('.generated/hugo.json', JSON.stringify({ baseURL, contentDir: '.generated/content', params: { docsVersion: activeVersion.id, docsVersionLabel: activeVersion.label, editURL: `https://github.com/pdfmake/docs/edit/${activeVersion.ref}/content/` } }, null, 2) + '\n');
async function stageContent(directory) {
  for (const item of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) await stageContent(file);
    else files.set('.generated/content/' + path.relative(path.join(root, 'content'), file).replaceAll('\\', '/'), rebaseLinks(await fs.readFile(file, 'utf8')));
  }
}
await stageContent(path.join(root, 'content'));
const check = process.argv.includes('--check');
for (const [name, text] of files) {
  // Ephemeral Hugo inputs are recreated by build/dev and do not exist in clean CI checkouts.
  if (check && name.startsWith('.generated/')) continue;
  const file = path.join(root, name);
  if (check) {
    if (await fs.readFile(file, 'utf8').catch(() => '') !== text) throw new Error(`Stale generated file: ${name}. Run npm run docs:generate.`);
  } else {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, text);
  }
}
// Detect removed pages too: old resources must not survive in the generated corpus.
async function checkExtra(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true }).catch(() => [])) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await checkExtra(file);
    else if (!files.has(path.relative(root, file).replaceAll('\\', '/'))) {
      if (check) throw new Error(`Orphaned generated resource: ${file}`);
      await fs.unlink(file);
    }
  }
}
await checkExtra(path.join(root, 'static/markdown'));
if (!check) await checkExtra(path.join(root, '.generated/content'));
console.log(`${check ? 'Checked' : 'Generated'} ${pages.length} versioned documentation pages`);
