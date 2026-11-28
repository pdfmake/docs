import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { loadPages } from '../scripts/corpus.mjs';

const require = createRequire(import.meta.url);
const pdfmake = process.env.PDFMAKE_SOURCE ? require(path.join(process.env.PDFMAKE_SOURCE, 'js/index.js')) : require('pdfmake');
test('run the exact Node quickstart and invoice code published in the docs', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'pdfmake-doc-examples-'));
  const previous = process.cwd();
  try {
    process.chdir(directory);
    let count = 0;
    for (const page of await loadPages()) {
      for (const match of page.markdown.matchAll(/```js\r?\n(\/\/ docs-test: ([\w-]+)\r?\n[\s\S]*?)```/g)) {
        const errors = [];
        const fakeProcess = { exitCode: 0 };
        const result = new vm.Script(match[1], { filename: page.source }).runInNewContext({
          require: name => name === 'pdfmake' ? pdfmake : require(name), process: fakeProcess,
          console: { error: error => errors.push(error) }
        });
        await result;
        assert.deepEqual(errors, [], match[2]);
        assert.equal(fakeProcess.exitCode, 0, match[2]);
        count++;
      }
    }
    assert.equal(count, 10, 'Expected five language editions of both the Node quickstart and invoice example');
    for (const name of ['document.pdf', 'invoice.pdf']) {
      const bytes = await fs.readFile(path.join(directory, name));
      assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
      assert.match(bytes.toString('latin1'), /%%EOF\s*$/);
    }
  } finally {
    process.chdir(previous);
    await fs.rm(directory, { recursive: true, force: true });
  }
});
