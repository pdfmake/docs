import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { versionConfig, activeVersion } from './versions.mjs';

async function checkedTree(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    const file = path.join(directory, entry.name);
    const stat = await fs.lstat(file);
    if (stat.isSymbolicLink() || !stat.isFile() && !stat.isDirectory()) throw new Error(`Unsupported Pages artifact entry: ${file}`);
    if (stat.isDirectory()) await checkedTree(file);
    else if (stat.nlink > 1) throw new Error(`Hard links are not allowed in Pages artifacts: ${file}`);
  }
}

// GitHub project Pages serves this artifact under /docs/: artifact root contains 0.3/, not docs/0.3/.
export async function assemblePages({ snapshot, published, destination, commit = 'local-review', basePath = '/docs' }) {
  snapshot = path.resolve(snapshot); published = path.resolve(published); destination = path.resolve(destination);
  if (basePath !== '/docs') throw new Error(`Unexpected Pages base path: ${basePath}`);
  if (new Set([snapshot, published, destination]).size !== 3 || [snapshot, published].some(source => destination.startsWith(source + path.sep) || source.startsWith(destination + path.sep))) throw new Error('Pages inputs and destination must be separate directories.');
  if (await fs.stat(destination).catch(() => null)) throw new Error('Pages destination must not exist; use a fresh staging directory.');
  const manifest = JSON.parse(await fs.readFile(path.join(snapshot, 'version-snapshot.json'), 'utf8'));
  if (manifest.version !== activeVersion.id || manifest.baseURL !== activeVersion.baseURL || manifest.libraryVersion !== activeVersion.libraryVersion) throw new Error('Snapshot identity does not match the version registry.');
  const index = JSON.parse(await fs.readFile(path.join(snapshot, 'docs-index.json'), 'utf8'));
  if (index.version !== activeVersion.id || !index.pages.length || index.pages.some(page => page.version !== activeVersion.id || !page.url.startsWith(activeVersion.baseURL))) throw new Error('Mixed-version or empty search index.');
  const runtime = JSON.parse(await fs.readFile(path.join(snapshot, 'playground/vendor/version.json'), 'utf8'));
  if (runtime.version !== manifest.libraryVersion) throw new Error('Playground runtime does not match snapshot.');
  await fs.access(path.join(snapshot, 'index.html'));
  await fs.access(path.join(published, 'index.html')); // Never replace the whole historical site with one series.
  for (const release of versionConfig.releases) if (release.id !== activeVersion.id) await fs.access(path.join(published, release.id, 'index.html'));
  const cname = await fs.readFile(path.join(published, 'CNAME'), 'utf8').catch(() => null);
  if (cname && cname.trim() !== new URL(versionConfig.origin).hostname) throw new Error('Historical custom domain differs from configured canonical origin.');
  await checkedTree(snapshot); await checkedTree(published);
  await fs.mkdir(destination, { recursive: true });
  for (const entry of await fs.readdir(published)) {
    if (['.git', activeVersion.id, 'deployment.json'].includes(entry)) continue;
    await fs.cp(path.join(published, entry), path.join(destination, entry), { recursive: true, errorOnExist: true, force: false });
  }
  await fs.cp(snapshot, path.join(destination, activeVersion.id), { recursive: true, errorOnExist: true, force: false });
  await fs.writeFile(path.join(destination, '.nojekyll'), '');
  await fs.writeFile(path.join(destination, 'deployment.json'), JSON.stringify({ sourceCommit: commit, version: activeVersion.id, libraryVersion: manifest.libraryVersion, canonical: activeVersion.baseURL }, null, 2) + '\n');
  await checkedTree(destination);
  console.log(`Pages artifact: preserved root and historical versions; replaced ${activeVersion.id}/ from verified snapshot.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const [snapshot, published, destination] = process.argv.slice(2);
  if (!snapshot || !published || !destination) throw new Error('Usage: node scripts/assemble-pages.mjs public published pages-artifact');
  await assemblePages({ snapshot, published, destination, commit: process.env.GITHUB_SHA, basePath: process.env.PAGES_BASE_PATH || '/docs' });
}
