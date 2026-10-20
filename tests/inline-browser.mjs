import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { serve } from '../scripts/serve.mjs';
import { basePath } from '../scripts/versions.mjs';

const server = await serve(fileURLToPath(new URL('../public/', import.meta.url)));
const browser = await chromium.launch({ args: ['--no-proxy-server'], ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
const page = await context.newPage();
const base = `http://127.0.0.1:${server.address().port}${basePath}`;
const errors = [];
page.on('dialog', dialog => dialog.accept());
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
async function replace(block, source) {
  await block.locator('.cm-content').click(); await page.keyboard.press('ControlOrMeta+A'); await page.keyboard.insertText(source);
}
async function ready(block) {
  await block.locator('.inline-status').filter({ hasText: /^PDF updated\.$/ }).or(block.locator('.inline-error:visible')).first().waitFor({ timeout: 30000 });
  assert.equal(await block.locator('.inline-error').isVisible(), false, await block.locator('.inline-error').textContent());
}
try {
  await page.goto(base + 'learn/first-pdf/', { waitUntil: 'domcontentloaded' });
  const block = page.locator('.worked-example .interactive-code');
  await block.scrollIntoViewIfNeeded(); await ready(block); console.log('Inline JS ready');
  assert.equal(await page.locator('iframe').count(), 0, 'Documentation previews use the same document');
  await block.locator('[data-code-language="typescript"]').click(); await ready(block);
  assert.match(await block.locator('.cm-content').textContent(), /TDocumentDefinitions/); console.log('Inline TS ready');
  const old = await block.locator('canvas').elementHandle();
  await replace(block, 'import type { TDocumentDefinitions } from "pdfmake/interfaces";\nconst dd: TDocumentDefinitions = { content: [{ text: "Typed", fontSize: "wrong" }] };');
  await block.locator('.inline-error').waitFor({ state: 'visible', timeout: 30000 });
  assert.match(await block.locator('.inline-error').textContent(), /TS2322|not assignable/);
  assert.equal(await old.evaluate(canvas => canvas.isConnected), true, 'Retain the successful canvas after type errors');
  assert.equal(await block.locator('.inline-download').getAttribute('href'), null);
  await replace(block, 'import type { TDocumentDefinitions } from "pdfmake/interfaces";\nconst dd: TDocumentDefinitions = { content: [{ text: "Typed inline edit", fontSize: 21 }] };');
  await ready(block); assert.match(await block.locator('.inline-text p').textContent(), /Typed inline edit/);
  await block.locator('[data-code-language="javascript"]').click(); await ready(block);
  assert.match(await block.locator('.cm-content').textContent(), /Make something clear/);
  await replace(block, 'var dd = { content: ["JavaScript inline edit"] };'); await ready(block);
  await block.locator('[data-code-action="undo"]').click(); await ready(block);
  assert.match(await block.locator('.inline-text p').textContent(), /Make something clear/);
  await block.locator('[data-code-action="redo"]').click(); await ready(block);
  assert.match(await block.locator('.inline-text p').textContent(), /JavaScript inline edit/);
  await block.locator('[data-code-language="typescript"]').click(); await ready(block);
  assert.match(await block.locator('.cm-content').textContent(), /Typed inline edit/);
  const download = page.waitForEvent('download'); await block.locator('.inline-download').click();
  assert.equal((await fs.readFile(await (await download).path())).subarray(0, 5).toString(), '%PDF-');
  const tablesLink = page.locator('.sidebar a[href$="document-definition-object/tables/"]');
  const tablesGroup = page.locator('.sidebar details').filter({ has: page.locator('a[href$="document-definition-object/tables/"]') });
  if (!await tablesGroup.evaluate(group => group.open)) await tablesGroup.locator('summary').click();
  await tablesLink.click();
  await page.waitForURL('**/tables/');
  await page.goBack(); await page.waitForURL('**/learn/first-pdf/'); await ready(block);
  assert.match(await block.locator('.cm-content').textContent(), /Typed inline edit/, 'Language and edits survive SPA Back');
  await page.goto(base + 'getting-started/server-side/', { waitUntil: 'domcontentloaded' });
  const node = page.locator('.interactive-code[data-context="node"]').first();
  await node.locator('.edit-code').click(); await node.locator('[data-code-language="typescript"]').click();
  assert.match(await node.locator('.inline-status').textContent(), /Node\.js/);
  assert.equal(await node.locator('[data-code-action="run"]').textContent(), 'Check syntax', 'Node examples must not pretend to execute in a browser');
  await page.goto(base + 'document-definition-object/headers-footers/', { waitUntil: 'domcontentloaded' });
  const definition = page.locator('.interactive-code[data-runnable="true"]').first();
  await definition.locator('.edit-code').click(); await ready(definition);
  assert.ok((await definition.locator('.inline-text p').textContent()).length > 5, 'Ordinary reference blocks also render inline');
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  if (process.env.SCREENSHOT_DIR) {
    await fs.mkdir(process.env.SCREENSHOT_DIR, { recursive: true });
    await page.screenshot({ path: process.env.SCREENSHOT_DIR + '/inline-example-mobile.png', fullPage: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({ path: process.env.SCREENSHOT_DIR + '/inline-example-desktop.png', fullPage: true });
  }
  await page.goto(base + 'playground/', { waitUntil: 'domcontentloaded' });
  const mainReady = async () => { await page.locator('#status').filter({ hasText: /^PDF ready/ }).waitFor({ timeout: 30000 }); assert.equal(await page.locator('#error').isVisible(), false); };
  await mainReady(); await page.locator('#code-language').selectOption('typescript'); await mainReady();
  for (const id of await page.locator('#example option').evaluateAll(options => options.map(option => option.value))) {
    await page.locator('#example').selectOption(id); await mainReady();
    assert.match(await page.locator('.cm-content').textContent(), /TDocumentDefinitions/);
  }
  await page.locator('.cm-content').click(); await page.keyboard.press('ControlOrMeta+A');
  await page.keyboard.insertText('import type { TDocumentDefinitions } from "pdfmake/interfaces"; const dd: TDocumentDefinitions = { content: ["Saved TypeScript workspace"] };');
  await mainReady();
  await page.locator('#document-name').fill('Typed report'); await page.locator('#save-document').click();
  await page.reload({ waitUntil: 'domcontentloaded' }); await mainReady();
  assert.equal(await page.locator('#code-language').inputValue(), 'typescript');
  assert.match(await page.locator('.cm-content').textContent(), /Saved TypeScript workspace/);
  const exported = page.waitForEvent('download'); await page.locator('#export').click();
  assert.match((await exported).suggestedFilename(), /\.ts$/);
  await page.locator('#code-language').selectOption('javascript'); await mainReady();
  await page.locator('#code-language').selectOption('typescript'); await mainReady();
  assert.match(await page.locator('.cm-content').textContent(), /Saved TypeScript workspace/);
  console.log('All ten playground examples also render as TypeScript; language drafts, autosave and .ts export passed');
  const plain = await browser.newContext({ javaScriptEnabled: false });
  const noJs = await plain.newPage(); await noJs.goto(base + 'learn/first-pdf/', { waitUntil: 'domcontentloaded' });
  assert.equal(await noJs.locator('.worked-example [data-code-pane="javascript"]').isVisible(), true);
  assert.equal(await noJs.locator('.worked-example [data-code-pane="typescript"]').isVisible(), true);
  await plain.close();
  assert.deepEqual(errors, []);
  console.log('Inline JS/TS editing, actual type errors, live PDF, retained canvas, undo/redo, download, SPA drafts, Node context, ordinary reference, mobile and no-JS passed');
} finally { await context.close(); await browser.close(); server.close(); }
