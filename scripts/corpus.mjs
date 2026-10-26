import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import TOML from '@iarna/toml';
import { examples } from '../static/playground/examples.js';

export const root = fileURLToPath(new URL('../', import.meta.url));
import { activeVersion, rebaseLinks } from './versions.mjs';
export { baseURL } from './versions.mjs';
export const languages = ['en', 'de', 'fr', 'es', 'pt-br'];
export async function loadPages({ version = activeVersion, codeExamples } = {}) {
  codeExamples ??= JSON.parse(await fs.readFile(path.join(root, 'data/codeExamples.json'), 'utf8'));
  const baseURL = version.baseURL, basePath = version.basePath;
  const files = [];
  async function walk(directory) {
    for (const item of await fs.readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, item.name);
      if (item.isDirectory()) await walk(file);
      else if (item.name.endsWith('.md') && item.name !== '_footer.md') files.push(file);
    }
  }
  await walk(path.join(root, 'content'));
  return Promise.all(files.sort().map(async file => {
    const source = (await fs.readFile(file, 'utf8')).replaceAll('\r\n', '\n');
    const match = source.match(/^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+\r?\n([\s\S]*)$/);
    if (!match) throw new Error(`Missing TOML front matter: ${file}`);
    let meta;
    try { meta = TOML.parse(match[1]); }
    catch (error) { throw new Error(`Invalid TOML front matter in ${file}: ${error.message}`, { cause: error }); }
    if (!meta.title || !meta.description) throw new Error(`Missing title/description: ${file}`);
    const relative = path.relative(path.join(root, 'content'), file).replaceAll('\\', '/');
    const language = relative.match(/\.([a-z-]+)\.md$/)?.[1] || 'en';
    if (!languages.includes(language)) throw new Error(`Unsupported content language: ${relative}`);
    const translationKey = relative.replace(/\.[a-z-]+\.md$/, '.md').replace(/(?:^|\/)\_index\.md$|\.md$/g, '') || 'index';
    const prefix = language === 'en' ? '' : `${language}/`;
    const id = prefix + translationKey;
    const route = prefix + (translationKey === 'index' ? '' : `${translationKey}/`);
    // Turn legacy Hugo admonitions into readable Markdown, preserving their text.
    const markdown = rebaseLinks(match[2], version).replace(/\{\{<\s*example\s+id="([\w-]+)"\s*>\}\}/g, (_, id) => {
      const example = examples.find(item => item.id === id);
      if (!example) throw new Error(`Unknown example: ${id}`);
      return `\n\n### Runnable example: ${example.title}\n\n\`\`\`js\n${example.source}\n\`\`\`\n\n[See the rendered PDF and edit this example](${baseURL}${prefix}playground/?example=${id})\n\n`;
    }).replace(/\{\{%\s*(?:alert|panel)\b[^}]*%\}\}/g, '\n> **Note:** ')
      .replace(/\{\{%\s*\/(?:alert|panel)\s*%\}\}/g, '\n').trim();
    if (/\{\{[%<]/.test(markdown)) throw new Error(`Unhandled shortcode: ${relative}`);
    const pairedMarkdown = markdown.replace(/^([ \t]*)```[ \t]*([\w-]*)[ \t]*\n([\s\S]*?)^\1```/gm, (original, indent, language, rawSource) => {
      const source = rawSource.split('\n').map(line => line.startsWith(indent) ? line.slice(indent.length) : line).join('\n');
      const key = createHash('sha256').update(source.trim().replaceAll('\r\n', '\n')).digest('hex');
      const example = codeExamples[key];
      if (!example) { if (/^(js|javascript|ts|typescript)$/.test(language)) throw new Error(`Missing code variants: ${relative}`); return original; }
      return `**JavaScript**\n\n\`\`\`js\n${example.javascript}\n\`\`\`\n\n**TypeScript**\n\n\`\`\`ts\n${example.typescript}\n\`\`\``;
    });
    const portableMarkdown = pairedMarkdown.split(/(```[\s\S]*?```)/g).map((part, index) => index % 2 ? part : part.replace(/<a[^>]*href="([^"]+)"[^>]*>\s*<strong>([\s\S]*?)<\/strong>\s*<span>([\s\S]*?)<\/span>\s*<\/a>/g,
      (_, href, title, description) => `\n- [${title}](${href}): ${description}\n`)
      .replace(/<div class="runtime-picker"[^>]*>[\s\S]*?<\/div>/g, '')
      .replace(/<div[^>]*data-runtime-panel[^>]*>/g, '')
      .replace(/<div class="(?:cards|learning-path)">|<\/div>/g, '')).join('');
    return { id, language, translationKey, path: basePath + route, title: meta.title, description: meta.description, version: version.id,
      sourceDigest: meta.sourceDigest || null, source: relative, url: baseURL + route, uri: `pdfmake://docs/${version.id}/${id}`,
      markdown: `# ${meta.title}\n\nVersion: pdfmake ${version.label}\nLanguage: ${language}\nSource: ${baseURL + route}\n\n${portableMarkdown}\n` };
  }));
}

export function searchPages(pages, query, limit = 5) {
  const terms = [...new Set(query.toLowerCase().match(/[\p{L}\p{N}_]+/gu) || [])];
  if (!terms.length) return [];
  return pages.map(page => {
    const title = `${page.title} ${page.id}`.toLowerCase();
    const description = page.description.toLowerCase();
    const body = page.markdown.toLowerCase();
    const score = terms.reduce((total, term) => total + (title.includes(term) ? 12 : 0)
      + (description.includes(term) ? 5 : 0) + (body.includes(term) ? 1 : 0), 0);
    return { ...page, score };
  }).filter(page => page.score > 0).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id)).slice(0, limit);
}
