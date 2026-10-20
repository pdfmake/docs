import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import { root, loadPages } from '../scripts/corpus.mjs';

test('the authored TypeScript Node ESM and browser examples with native declarations compile in strict mode', async () => {
  const page = (await loadPages()).find(page => page.id === 'getting-started');
  const blocks = [...page.markdown.matchAll(/```ts\n([\s\S]*?)```/g)].map(match => match[1]);
  assert.equal(blocks.length, 2);
  const parent = path.join(root, 'node_modules/.cache');
  await fs.mkdir(parent, { recursive: true });
  const directory = await fs.mkdtemp(path.join(parent, 'pdfmake-docs-types-'));
  try {
    for (const [index, source] of blocks.entries()) {
      const file = path.join(directory, index === 0 ? 'node.mts' : 'browser.ts');
      await fs.writeFile(file, source);
      const program = ts.createProgram([file], { strict: true, noEmit: true, skipLibCheck: false,
        target: ts.ScriptTarget.ES2022, esModuleInterop: true,
        baseUrl: root, paths: {
          pdfmake: ['tooling/pdfmake-types/types/index.d.ts'],
          'pdfmake/interfaces': ['tooling/pdfmake-types/interfaces.d.ts'],
          'pdfmake/interfaces.js': ['tooling/pdfmake-types/interfaces.d.ts'],
          'pdfmake/build/*': ['tooling/pdfmake-types/build/*']
        },
        module: index === 0 ? ts.ModuleKind.NodeNext : ts.ModuleKind.ESNext,
        moduleResolution: index === 0 ? ts.ModuleResolutionKind.NodeNext : ts.ModuleResolutionKind.Bundler });
      const diagnostics = ts.getPreEmitDiagnostics(program);
      assert.equal(diagnostics.length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: file => file, getCurrentDirectory: () => root, getNewLine: () => '\n'
      }));
    }
  } finally { await fs.rm(directory, { recursive: true, force: true }); }
});
