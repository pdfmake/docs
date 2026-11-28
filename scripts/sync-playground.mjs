// Mirror the documentation playground into the library's standalone development tool.
// Run explicitly when changing the shared UI; --check detects drift without modifying files.
import fs from 'node:fs/promises';
import path from 'node:path';
import { root } from './corpus.mjs';

const library = process.argv[2];
if (!library) throw new Error('Usage: node scripts/sync-playground.mjs /path/to/pdfmake [--check]');
const pairs = ['standalone.html', 'standalone.js', 'theme.js', 'app.js', 'examples.js', 'typed-examples.js', 'worker.js', 'typescript-check.js', 'playground.css', 'brand/pdfmake-logo.png', 'brand/pdfmake-icon.png', 'brand/icon-16.png', 'brand/icon-32.png', 'brand/icon-180.png'].map(name => [
  path.join(root, 'static/playground', name), path.join(library, 'dev-playground/public', name === 'standalone.html' ? 'index.html' : name)
]);
pairs.push([path.join(root, 'scripts/prepare-typescript.mjs'), path.join(library, 'scripts/prepare-typescript.mjs')]);
pairs.push([path.join(root, 'playground/editor.mjs'), path.join(library, 'dev-playground/editor.mjs')]);
for (const [source, target] of pairs) {
  const content = await fs.readFile(source);
  if (process.argv.includes('--check')) {
    const normalize = value => value.toString('utf8').replaceAll('\r\n', '\n');
    if (source.endsWith('.png') ? !content.equals(await fs.readFile(target)) : normalize(content) !== normalize(await fs.readFile(target))) throw new Error(`Playground drift: ${target}`);
  } else {
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content);
  }
}
console.log('Playground source mirror matches');
