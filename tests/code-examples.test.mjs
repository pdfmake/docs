import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';
import path from 'node:path';
import { createRequire } from 'node:module';
import { collectTypeFiles } from '../scripts/prepare-typescript.mjs';
import { createCodeExample } from '../scripts/code-examples.mjs';

test('all bilingual variants parse and every executable definition passes the browser TypeScript checker', async () => {
  const variants = JSON.parse(await fs.readFile(new URL('../data/codeExamples.json', import.meta.url), 'utf8'));
  const context = vm.createContext({ ts, pdfmakeTypeFiles: await collectTypeFiles(), importScripts() {} });
  vm.runInContext(await fs.readFile(new URL('../static/playground/typescript-check.js', import.meta.url), 'utf8'), context);
  let checked = 0;
  for (const [key, example] of Object.entries(variants)) {
    for (const language of ['javascript', 'typescript']) {
      const file = ts.createSourceFile('example.' + (language === 'javascript' ? 'js' : 'ts'), example[language], ts.ScriptTarget.Latest, true);
      assert.deepEqual(file.parseDiagnostics.map(item => ts.flattenDiagnosticMessageText(item.messageText, '\n')), [], key + ':' + language);
    }
    if (example.runnable) {
      const result = context.compileTypeScript(example.typescript);
      assert.deepEqual(JSON.parse(JSON.stringify(result.diagnostics)), [], key);
      const fakePdfMake = { addTableLayouts() {} };
      const run = source => new vm.Script(source + '\n;typeof dd !== "undefined" ? dd : docDefinition;').runInNewContext({ pdfMake: fakePdfMake });
      const javascript = run(example.javascript);
      const typescript = run(result.javascript.replace(/^import (\w+) from ["']pdfmake\/build\/pdfmake(?:\.js)?["'];?$/gm, ''));
      assert.equal(JSON.stringify(javascript), JSON.stringify(typescript), `Changed definition after TypeScript compilation: ${key}`);
      checked++;
    }
  }
  assert.ok(checked >= 40);
  const invalid = context.compileTypeScript('import type { TDocumentDefinitions } from "pdfmake/interfaces"; const dd: TDocumentDefinitions = {content:[{text:"x",fontSize:"large"}]};');
  assert.ok(invalid.diagnostics.some(item => item.message.includes('not assignable')), 'Actual pdfmake field types must be enforced');
  console.log(`Validated ${Object.keys(variants).length} bilingual variants and ${checked} typed document definitions`);
});

test('TypeScript examples retain real annotations while the JavaScript variant erases types', () => {
  const source = 'const value: number = 1;';
  const example = createCodeExample(source, 'ts');
  assert.equal(example.typescript, source);
  assert.doesNotMatch(example.javascript, /: number/);
});

test('all self-contained examples pass library preflight when the selected runtime supports it', async t => {
  const require = createRequire(import.meta.url);
  const pdfmake = process.env.PDFMAKE_SOURCE ? require(path.join(process.env.PDFMAKE_SOURCE, 'js/index.js')) : require('pdfmake');
  if (typeof pdfmake.validateDocument !== 'function') { t.skip('Preflight is unreleased; run with PDFMAKE_SOURCE to test the improved library.'); return; }
  pdfmake.addFonts({ Roboto: { normal: 'Roboto-Regular.ttf', bold: 'Roboto-Medium.ttf', italics: 'Roboto-Italic.ttf', bolditalics: 'Roboto-MediumItalic.ttf' } });
  const variants = JSON.parse(await fs.readFile(new URL('../data/codeExamples.json', import.meta.url), 'utf8'));
  let checked = 0;
  for (const [key, example] of Object.entries(variants)) {
    if (!example.runnable) continue;
    const doc = new vm.Script(example.javascript + '\n;typeof dd !== "undefined" ? dd : docDefinition;').runInNewContext({ pdfMake: pdfmake });
    const result = pdfmake.validateDocument(doc);
    assert.equal(result.valid, true, key + ': ' + JSON.stringify(result.errors));
    checked++;
  }
  assert.ok(checked >= 40);
  console.log(`Preflight accepted ${checked} self-contained document definitions`);
});
