import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
const execute = promisify(execFile);

test('collection combines verified version directories and refuses overwrite or mixed runtimes', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'pdfmake-version-collection-'));
  const command = fileURLToPath(new URL('../scripts/assemble-versions.mjs', import.meta.url));
  try {
    for (const id of ['0.3', '0.4']) {
      const source = path.join(directory, id);
      await fs.mkdir(path.join(source, 'playground/vendor'), { recursive: true });
      const baseURL = `https://pdfmake.github.io/docs/${id}/`;
      await fs.writeFile(path.join(source, 'version-snapshot.json'), JSON.stringify({ version: id, libraryVersion: `${id}.0`, baseURL }));
      await fs.writeFile(path.join(source, 'docs-index.json'), JSON.stringify({ version: id, pages: [{ version: id, url: baseURL }] }));
      await fs.writeFile(path.join(source, 'playground/vendor/version.json'), JSON.stringify({ version: `${id}.0` }));
      await fs.writeFile(path.join(source, 'index.html'), `<h1>${id}</h1>`);
    }
    const output = path.join(directory, 'collection');
    const args = [command, output, `0.3=${path.join(directory, '0.3')}`, `0.4=${path.join(directory, '0.4')}`];
    await execute(process.execPath, args);
    assert.equal(await fs.readFile(path.join(output, 'docs/0.3/index.html'), 'utf8'), '<h1>0.3</h1>');
    assert.equal(await fs.readFile(path.join(output, 'docs/0.4/index.html'), 'utf8'), '<h1>0.4</h1>');
    await assert.rejects(execute(process.execPath, args), /Refusing to replace/);
    await fs.writeFile(path.join(directory, '0.4/playground/vendor/version.json'), '{"version":"0.3.0"}');
    const invalidOutput = path.join(directory, 'invalid');
    await assert.rejects(execute(process.execPath, [command, invalidOutput, ...args.slice(2)]), /playground version mismatch/);
    assert.equal(await fs.stat(invalidOutput).catch(() => null), null, 'Preflight must fail before copying any snapshot');
  } finally { await fs.rm(directory, { recursive: true, force: true }); }
});
