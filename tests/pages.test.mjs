import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { assemblePages } from '../scripts/assemble-pages.mjs';
import { activeVersion } from '../scripts/versions.mjs';

test('Pages composition preserves historical site and verifies snapshot identity', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'pdfmake-pages-'));
  const snapshot = path.join(root, 'snapshot'), published = path.join(root, 'published'), destination = path.join(root, 'artifact');
  const write = async (file, value) => { await fs.mkdir(path.dirname(file), { recursive: true }); await fs.writeFile(file, typeof value === 'string' ? value : JSON.stringify(value)); };
  try {
    await write(path.join(published, 'index.html'), 'historical landing');
    await write(path.join(published, '0.1/index.html'), 'old stable');
    await write(path.join(published, '0.3/index.html'), 'previous current');
    await write(path.join(published, 'images/logo.png'), 'historical asset');
    await write(path.join(snapshot, 'index.html'), 'new current');
    await write(path.join(snapshot, 'version-snapshot.json'), { version: activeVersion.id, baseURL: activeVersion.baseURL, libraryVersion: activeVersion.libraryVersion });
    await write(path.join(snapshot, 'docs-index.json'), { version: activeVersion.id, pages: [{ version: activeVersion.id, url: activeVersion.baseURL }] });
    await write(path.join(snapshot, 'playground/vendor/version.json'), { version: activeVersion.libraryVersion });
    await assert.rejects(assemblePages({ snapshot, published, destination, basePath: '/' }), /base path/);
    await assemblePages({ snapshot, published, destination });
    for (const file of ['index.html', '0.1/index.html', 'images/logo.png']) assert.equal(await fs.readFile(path.join(destination, file), 'utf8'), await fs.readFile(path.join(published, file), 'utf8'));
    assert.equal(await fs.readFile(path.join(destination, '0.3/index.html'), 'utf8'), 'new current');
    assert.equal(await fs.readFile(path.join(published, '0.3/index.html'), 'utf8'), 'previous current');
    await assert.rejects(assemblePages({ snapshot, published, destination }), /must not exist/);
    await write(path.join(snapshot, 'version-snapshot.json'), { version: '0.4' });
    await assert.rejects(assemblePages({ snapshot, published, destination: path.join(root, 'wrong') }), /identity/);
  } finally { await fs.rm(root, { recursive: true, force: true }); }
});
