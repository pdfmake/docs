import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from '@babel/parser';
import { loadPages } from '../scripts/corpus.mjs';

test('complete JavaScript documentation snippets parse and contain no duplicate object keys', async () => {
  let count = 0;
  for (const page of await loadPages()) {
    for (const match of page.markdown.matchAll(/```(?:js|javascript)\r?\n([\s\S]*?)```/g)) {
      const code = match[1];
      // Node/property fragments are illustrated in context, not standalone programs.
      if (!/^(?:\s*\/\/[^\n]*\n)*\s*(?:var|const|let|import|async function|function)\b/.test(code)) continue;
      let tree;
      try { tree = parse(code, { sourceType: 'module', allowAwaitOutsideFunction: true }); }
      catch (error) { assert.fail(`${page.source}: ${error.message}`); }
      function visit(node) {
        if (!node || typeof node !== 'object') return;
        if (node.type === 'ObjectExpression') {
          const keys = new Set();
          for (const property of node.properties) {
            if (property.computed || !property.key) continue;
            const key = property.key.name ?? property.key.value;
            assert.ok(!keys.has(key), `${page.source}: duplicate key ${key}`);
            keys.add(key);
          }
        }
        for (const value of Object.values(node)) {
          if (Array.isArray(value)) value.forEach(visit);
          else if (value && typeof value === 'object') visit(value);
        }
      }
      visit(tree);
      count++;
    }
  }
  assert.ok(count > 50, `Only checked ${count} snippets`);
  console.log(`Validated ${count} complete JavaScript snippets`);
});
