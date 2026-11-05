import fs from 'node:fs/promises';
import path from 'node:path';
import { versionConfig } from './versions.mjs';

// Compose already verified snapshots without rebuilding or replacing older releases.
const [destination, ...snapshots] = process.argv.slice(2);
if (!destination || !snapshots.length) throw new Error('Usage: npm run build:collection -- collection 0.3=public [0.4=../snapshot]');
const output = path.resolve(destination);
const plans = [];
const ids = new Set();
for (const entry of snapshots) {
  const split = entry.indexOf('=');
  const id = entry.slice(0, split), source = path.resolve(entry.slice(split + 1));
  if (split < 1 || !/^\d+\.\d+$/.test(id) || ids.has(id)) throw new Error('Invalid or duplicate snapshot argument');
  ids.add(id);
  const manifest = JSON.parse(await fs.readFile(path.join(source, 'version-snapshot.json'), 'utf8'));
  const expectedURL = new URL(`/docs/${id}/`, versionConfig.origin).href;
  if (manifest.version !== id || manifest.baseURL !== expectedURL) throw new Error(`Snapshot metadata does not match ${id}`);
  const index = JSON.parse(await fs.readFile(path.join(source, 'docs-index.json'), 'utf8'));
  if (index.version !== id || index.pages.some(page => page.version !== id || !page.url.startsWith(expectedURL))) throw new Error('Mixed-version search index');
  const library = JSON.parse(await fs.readFile(path.join(source, 'playground/vendor/version.json'), 'utf8'));
  if (library.version !== manifest.libraryVersion) throw new Error('Snapshot playground version mismatch');
  const target = path.join(output, 'docs', id);
  if (source === output || output.startsWith(source + path.sep) || source.startsWith(output + path.sep)) throw new Error('Source and collection must be separate directories');
  if (await fs.stat(target).catch(() => null)) throw new Error(`Refusing to replace existing snapshot: ${target}`);
  plans.push({ source, target });
}
for (const { source, target } of plans) {
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.cp(source, target, { recursive: true, errorOnExist: true, force: false });
}
console.log(`Assembled ${plans.length} immutable snapshots under ${output}/docs/`);
