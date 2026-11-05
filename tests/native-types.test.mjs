import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { collectTypeFiles } from '../scripts/prepare-typescript.mjs';

test('native declaration snapshot is complete, attributed and reproducible without community pdfmake types', async () => {
  const root = new URL('../tooling/pdfmake-types/', import.meta.url);
  const snapshot = JSON.parse(await fs.readFile(new URL('snapshot.json', root), 'utf8'));
  for (const [name, hash] of Object.entries(snapshot.files)) {
    const content = (await fs.readFile(new URL(name, root), 'utf8')).replaceAll('\r\n', '\n');
    assert.equal(createHash('sha256').update(content).digest('hex'), hash, name);
  }
  assert.match(await fs.readFile(new URL('types/LICENSE', root), 'utf8'), /MIT License/);
  const files = await collectTypeFiles();
  assert.ok(files['/node_modules/pdfmake/types/interfaces.d.ts'].includes('validateDocument'));
  assert.ok(files['/node_modules/pdfmake/build/pdfmake.d.ts']);
  assert.equal(Object.keys(files).some(name => name.startsWith('/node_modules/@types/pdfmake/')), false);
});
