import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const library = process.argv[2];
if (!library) throw new Error('Usage: node scripts/sync-native-types.mjs /path/to/pdfmake [--check]');
const target = new URL('../tooling/pdfmake-types/', import.meta.url);
const names = ['package.json', 'interfaces.d.ts', 'types/interfaces.d.ts', 'types/index.d.ts', 'types/browser.d.ts', 'types/LICENSE', 'build/pdfmake.d.ts', 'build/pdfmake.min.d.ts', 'build/vfs_fonts.d.ts'];
const hashes = {};
for (const name of names) {
  let content = await fs.readFile(path.join(library, name), 'utf8');
  if (name === 'package.json') { const source = JSON.parse(content); content = JSON.stringify({ name: source.name, version: source.version, types: source.types, description: 'Declaration-only snapshot of the local unreleased library branch; not a published runtime.' }, null, 2) + '\n'; }
  content = content.replaceAll('\r\n', '\n');
  hashes[name] = createHash('sha256').update(content).digest('hex');
  const file = new URL(name, target);
  if (process.argv.includes('--check')) { if ((await fs.readFile(file, 'utf8')).replaceAll('\r\n', '\n') !== content) throw new Error(`Native type snapshot drift: ${name}`); }
  else { await fs.mkdir(new URL('.', file), { recursive: true }); await fs.writeFile(file, content); }
}
const manifest = JSON.stringify({ source: 'pdfmake local improvement branch (unreleased)', files: hashes }, null, 2) + '\n';
if (process.argv.includes('--check')) { if ((await fs.readFile(new URL('snapshot.json', target), 'utf8')).replaceAll('\r\n', '\n') !== manifest) throw new Error('Type snapshot manifest drift'); }
else await fs.writeFile(new URL('snapshot.json', target), manifest);
console.log('Native declaration snapshot matches the library');
