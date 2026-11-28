import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { basePath, activeVersion, versionConfig } from '../scripts/versions.mjs';
import { serve } from '../scripts/serve.mjs';

const server = await serve(fileURLToPath(new URL('../public/', import.meta.url)));
const base = `http://127.0.0.1:${server.address().port}${basePath}`;
const browser = await chromium.launch({ args: ['--no-proxy-server'], ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
async function ready() {
  await page.waitForFunction(() => document.querySelector('#status').textContent.startsWith('PDF ready.') || !document.querySelector('#error').hidden, null, { timeout: 15000 });
  assert.equal(await page.locator('#error').isVisible(), false, await page.locator('#error').textContent());
}
async function code(source) {
  await page.locator('.cm-content').click(); await page.keyboard.press('ControlOrMeta+A'); await page.keyboard.insertText(source);
}
async function run() { await page.getByRole('button', { name: /^Run/ }).click(); await ready(); }
try {
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  assert.equal(await page.locator('.version-menu a[aria-current]').getAttribute('data-version'), activeVersion.id);
  assert.equal(await page.locator('.version-menu a[data-version="0.1"]').getAttribute('href'), new URL('/docs/0.1/', versionConfig.origin).href);
  await page.locator('.brand-logo').evaluate(image => image.decode());
  assert.equal(await page.locator('.brand-logo').getAttribute('alt'), 'pdfMake');
  assert.equal(await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--accent').trim()), '#c9252d');
  for (const link of await page.locator('link[rel="icon"], link[rel="apple-touch-icon"]').evaluateAll(links => links.map(link => link.href))) {
    const response = await fetch(link);
    assert.equal(response.status, 200);
    assert.equal(Buffer.from(await response.arrayBuffer()).subarray(1, 4).toString(), 'PNG');
  }
  const background = () => page.locator('html').evaluate(el => getComputedStyle(el).backgroundColor);
  assert.equal(await page.locator('#theme').inputValue(), 'system');
  await page.emulateMedia({ colorScheme: 'dark' });
  assert.equal(await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--accent').trim()), '#ff8c90');
  assert.equal(await background(), 'rgb(17, 27, 35)', 'System follows dark OS preference');
  if (process.env.SCREENSHOT_DIR) {
    await page.locator('.worked-example').scrollIntoViewIfNeeded();
    await page.locator('.worked-example .inline-status').filter({ hasText: 'PDF updated.' }).waitFor({ timeout: 15000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: process.env.SCREENSHOT_DIR + '/docs-dark.png', fullPage: true });
  }
  await page.locator('#theme').selectOption('light');
  assert.equal(await background(), 'rgb(255, 255, 255)', 'Explicit Light overrides the OS');
  await page.reload();
  assert.equal(await page.locator('#theme').inputValue(), 'light', 'Preference survives reload');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.locator('#theme').selectOption('dark');
  assert.equal(await background(), 'rgb(17, 27, 35)', 'Explicit Dark overrides the OS');
  await page.evaluate(() => { window.docsSentinel = 'same-document'; });
  await page.getByRole('searchbox').fill('tables');
  await page.locator('#search-results a', { hasText: 'Tables' }).click();
  await page.waitForURL('**/document-definition-object/tables/');
  await page.locator('main h1').filter({ hasText: 'Tables' }).waitFor();
  assert.equal(await page.evaluate(() => window.docsSentinel), 'same-document', 'Navigation must not reload the document');
  assert.equal(await page.getByRole('searchbox').inputValue(), 'tables');
  assert.equal(await page.locator('#theme').inputValue(), 'dark', 'Theme survives SPA navigation');
  assert.equal(await background(), 'rgb(17, 27, 35)');
  assert.ok((await page.locator('link[rel=canonical]').getAttribute('href')).endsWith('/tables/'));
  await page.goBack(); await page.waitForURL(base);
  assert.equal(await page.evaluate(() => window.docsSentinel), 'same-document');
  await page.getByRole('tab', { name: 'Browser', exact: true }).click();
  assert.equal(await page.locator('#panel-browser').isVisible(), true);
  assert.equal(await page.locator('#panel-node').isVisible(), false);
  await page.getByRole('tab', { name: 'Node.js / API', exact: true }).click();
  await page.locator('#theme').selectOption('system');
  assert.equal(await background(), 'rgb(255, 255, 255)');
  await page.emulateMedia({ colorScheme: 'dark' });
  assert.equal(await background(), 'rgb(17, 27, 35)', 'System reacts to changes without reloading');
  await page.emulateMedia({ colorScheme: 'light' });
  console.log('System/Light/Dark themes, saved preference and SPA persistence passed');
  console.log('SPA chapter navigation, canonical metadata, search persistence and Back passed');

  const languagesPage = await context.newPage();
  languagesPage.on('pageerror', error => errors.push(error.message));
  for (const [lang, query, title] of [['de', 'Tabellen', 'Tabellen'], ['fr', 'tableaux', 'Tableaux'], ['es', 'tablas', 'Tablas'], ['pt-br', 'tabelas', 'Tabelas']]) {
    await languagesPage.goto(base + lang + '/');
    assert.equal((await languagesPage.locator('html').getAttribute('lang')).toLowerCase(), lang);
    await languagesPage.evaluate(() => { window.languageSentinel = true; });
    await languagesPage.locator('#search').fill(query);
    await languagesPage.locator('#search-results a', { hasText: title }).first().click();
    await languagesPage.waitForURL(`**/${lang}/document-definition-object/tables/`);
    assert.equal(await languagesPage.evaluate(() => window.languageSentinel), true, 'Localized chapters retain SPA navigation');
    assert.equal(await languagesPage.locator('main h1').textContent(), title);
    assert.ok((await languagesPage.locator('link[rel=canonical]').getAttribute('href')).endsWith(`/${lang}/document-definition-object/tables/`));
    assert.equal(await languagesPage.locator('link[hreflang]').count(), 6);
    const md = await languagesPage.locator('link[type="text/markdown"]').getAttribute('href');
    assert.ok(md.endsWith(`/markdown/${lang}/document-definition-object/tables.md`));
    assert.match(await (await fetch(new URL(md, base))).text(), new RegExp('Language: ' + lang));
    await languagesPage.setViewportSize({ width: 390, height: 844 });
    assert.equal(await languagesPage.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Mobile overflow: ${lang}`);
    if (process.env.SCREENSHOT_DIR && lang === 'de') await languagesPage.screenshot({ path: process.env.SCREENSHOT_DIR + '/docs-german-mobile.png', fullPage: true });
    await languagesPage.setViewportSize({ width: 1440, height: 1000 });
    await languagesPage.locator('.primary-nav a[data-section="playground"]').click();
    await languagesPage.waitForURL(`**/${lang}/playground/`);
    await languagesPage.waitForFunction(() => document.querySelector('#status')?.textContent.startsWith('PDF ready.'), null, { timeout: 15000 });
    assert.equal(await languagesPage.evaluate(() => window.languageSentinel), true, 'Translated playground uses the same application shell');
    assert.equal(await languagesPage.locator('main iframe').count(), 0);
    await languagesPage.locator('#example-docs').click();
    await languagesPage.waitForURL(`**/${lang}/getting-started/client-side/`);
    assert.equal(await languagesPage.evaluate(() => window.languageSentinel), true);
    await languagesPage.goto(base + lang + '/document-definition-object/tables/');
  }
  await languagesPage.locator('.language-menu summary').click();
  await languagesPage.locator('.language-menu a[data-language="de"]').click();
  await languagesPage.waitForURL('**/de/document-definition-object/tables/');
  assert.equal(await languagesPage.locator('#search').inputValue(), '', 'Language switch loads the matching search corpus');
  await languagesPage.goto(base + 'guides/resource-security/');
  assert.equal(await languagesPage.locator('link[hreflang="de"]').count(), 1, 'Advanced chapters have translated equivalents too');
  assert.equal(await languagesPage.locator('.language-menu a[data-language="de"]').getAttribute('href'), basePath + 'de/guides/resource-security/');
  assert.equal(await languagesPage.locator('.language-menu a[data-language="de"] small').count(), 0);
  await languagesPage.locator('.language-menu summary').click();
  await languagesPage.locator('.language-menu a[data-language="de"]').click();
  await languagesPage.waitForURL('**/de/guides/resource-security/');
  assert.equal(await languagesPage.locator('.sidebar .language-tag').count(), 0, 'Every sidebar chapter is available in the current language');
  await languagesPage.close();
  console.log('Four translated locales: search, SPA, chapter language switch, Markdown, hreflang and mobile layout passed');

  const html = await (await fetch(base + 'learn/first-pdf/')).text();
  assert.match(html, /Your first PDF/); assert.match(html, /Make something clear/);
  const markdown = await (await fetch(base + 'markdown/learn/first-pdf.md')).text();
  assert.match(markdown, /var dd =/); assert.match(markdown, /Make something clear/); assert.doesNotMatch(markdown, /\{\{</);

  await page.goto(base + 'playground/', { waitUntil: 'domcontentloaded' }); await ready();
  await page.locator('.brand-logo').evaluate(image => image.decode());
  assert.equal(await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--accent').trim()), '#c9252d');
  await page.locator('#auto-run').uncheck();
  const ids = await page.locator('#example option').evaluateAll(options => options.map(o => o.value));
  for (const id of ids) {
    console.log(`Rendering ${id}`); await page.locator('#example').selectOption(id); await run();
    assert.ok((await page.locator('#page-text').textContent()).length > 5, `${id}: extracted text`);
    if (id === 'tables') {
      await page.getByRole('button', { name: 'Next page' }).click();
      await page.waitForFunction(() => document.querySelector('#page-count').textContent.startsWith('2 /'));
      await page.getByRole('button', { name: 'Previous page' }).click(); await page.locator('#zoom').selectOption('1.5');
    }
  }
  await page.locator('#example').selectOption('welcome'); await run();
  const downloadPromise = page.waitForEvent('download'); await page.getByRole('button', { name: 'Download PDF' }).click();
  const bytes = await fs.readFile(await (await downloadPromise).path()); assert.equal(bytes.subarray(0, 5).toString(), '%PDF-'); assert.match(bytes.toString('latin1'), /%%EOF\s*$/);

  const oldCanvas = await page.locator('#pdf-canvas').elementHandle();
  await code('var dd = { broken syntax');
  assert.equal(await page.locator('#preview').isVisible(), true);
  assert.equal(await oldCanvas.evaluate(canvas => canvas.isConnected), true, 'Keep the last successful canvas during edits');
  assert.equal(await page.getByRole('button', { name: 'Download PDF' }).isEnabled(), false);
  await page.getByRole('button', { name: /^Run/ }).click();
  await page.locator('#error').waitFor({ state: 'visible' }); assert.match(await page.locator('#error').textContent(), /line|Line/);
  await page.getByRole('button', { name: 'Go to error in editor' }).click();
  assert.equal(await page.locator('.cm-content').evaluate(el => el === document.activeElement), true);
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  assert.match(await page.locator('.cm-content').textContent(), /Make something clear/);
  await page.getByRole('button', { name: 'Redo', exact: true }).click();
  assert.match(await page.locator('.cm-content').textContent(), /broken syntax/);

  await code('var dd = {content: [{table: {body: []}}]};');
  await page.getByRole('button', { name: /^Run/ }).click(); await page.locator('#error').waitFor({ state: 'visible' });
  if (process.env.PDFMAKE_SOURCE) {
    assert.match(await page.locator('#error').textContent(), /table.body/);
    assert.match(await page.locator('#error').textContent(), /PDFMAKE_VALIDATION_ERROR/);
  } else {
    assert.match(await page.locator('#error').textContent(), /PDFMAKE_.*ERROR|PDFMAKE_INVALID_DOCUMENT/);
  }
  await code('var dd = {content: [notDefinedInThisExample]};');
  await page.getByRole('button', { name: /^Run/ }).click(); await page.locator('#error').waitFor({ state: 'visible' });
  assert.match(await page.locator('#error').textContent(), /ReferenceError at line 1/);
  await code('while (true) {}'); await page.getByRole('button', { name: /^Run/ }).click();
  await page.getByRole('button', { name: 'Cancel', exact: true }).click(); assert.match(await page.locator('#status').textContent(), /cancelled/);
  await page.getByRole('button', { name: /^Run/ }).click(); await page.locator('#error').waitFor({ state: 'visible', timeout: 13000 });
  assert.match(await page.locator('#error').textContent(), /10 seconds/);

  await code('var dd = {content: ["Recovered document"]};'); await run();
  await page.locator('#auto-run').check(); await ready();
  const previousCanvas = await page.locator('#pdf-canvas').elementHandle();
  await code('var dd = {content: ["Automatic update"]};');
  assert.equal(await previousCanvas.evaluate(canvas => canvas.isConnected), true);
  await page.waitForFunction(() => document.querySelector('#page-text').textContent.includes('Automatic update'));
  assert.equal(await previousCanvas.evaluate(canvas => canvas.isConnected), false, 'Swap the rendered page after completion');
  await page.evaluate(() => { window.workspaceSentinel = 'one-application'; });
  const retainedEditor = await page.locator('.cm-content').elementHandle();
  await page.locator('#example-docs').click();
  await page.locator('main[data-page-kind="doc"]').waitFor();
  assert.equal(await page.evaluate(() => window.workspaceSentinel), 'one-application', 'Playground reference links use SPA navigation');
  await page.locator('.primary-nav a[data-section="playground"]').click();
  await page.locator('main[data-page-kind="workspace"]').waitFor(); await ready();
  assert.equal(await retainedEditor.evaluate(editor => editor.isConnected), true, 'The editor instance survives reading a chapter');
  assert.match(await page.locator('.cm-content').textContent(), /Automatic update/);
  assert.equal(await page.getByRole('button', { name: 'Undo', exact: true }).isEnabled(), true);
  assert.equal(await page.locator('main iframe').count(), 0, 'The workspace is mounted directly, without an iframe');
  await page.goBack(); await page.locator('main[data-page-kind="doc"]').waitFor();
  await page.goForward(); await page.locator('main[data-page-kind="workspace"]').waitFor(); await ready();
  assert.match(await page.locator('#page-text').textContent(), /Automatic update/);
  await page.locator('#document-name').fill('Review invoice'); await page.getByRole('button', { name: 'Save document', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#saved-documents').options.length === 2);
  await page.reload(); await page.locator('.cm-content').waitFor();
  assert.match(await page.locator('.cm-content').textContent(), /Automatic update/);
  assert.equal(await page.getByRole('button', { name: 'Undo', exact: true }).isEnabled(), true, 'Undo history survives reload');
  await ready();
  assert.match(await page.locator('#page-text').textContent(), /Automatic update/, 'Reload renders the saved workspace with Live preview enabled');
  await code('var dd = {content: ["Edited after reload without Run"]};');
  await page.waitForFunction(() => document.querySelector('#page-text').textContent.includes('Edited after reload without Run'));
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#page-text').textContent.includes('Automatic update'));
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  assert.match(await page.locator('.cm-content').textContent(), /Recovered document/);
  await page.getByRole('button', { name: 'Redo', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#page-text').textContent.includes('Automatic update'));
  const savedId = await page.locator('#saved-documents option').nth(1).getAttribute('value');
  await code('var dd = {content: ["Before restoring named document"]};');
  await page.waitForFunction(() => document.querySelector('#page-text').textContent.includes('Before restoring named document'));
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#saved-documents').selectOption(savedId);
  await page.waitForFunction(() => document.querySelector('#page-text').textContent.includes('Automatic update'));
  assert.equal(await page.locator('#document-name').inputValue(), 'Review invoice');
  await code('var dd = {content: ["Edited after named restore without Run"]};');
  await page.waitForFunction(() => document.querySelector('#page-text').textContent.includes('Edited after named restore without Run'));
  await page.locator('#auto-run').uncheck();
  await page.reload(); await page.locator('.cm-content').waitFor();
  assert.equal(await page.locator('#auto-run').isChecked(), false, 'Manual rendering preference survives reload');
  await code('var dd = {content: ["Manual preview preference"]};');
  await page.waitForTimeout(1000);
  assert.equal(await page.locator('#preview').isVisible(), false, 'Live preview off prevents rendering on reload and edit');
  await page.locator('#auto-run').check(); await ready();
  assert.match(await page.locator('#page-text').textContent(), /Manual preview preference/);
  await page.evaluate(() => {
    dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }));
    dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
  });
  await page.locator('#zoom').selectOption('1');
  assert.equal(await page.locator('#preview').isVisible(), true, 'Keep the PDF when restored from the browser page cache');
  const workspaceBefore = await page.evaluate(() => localStorage.getItem('pdfmake-playground-workspace-v2'));

  await page.goto(base + 'learn/first-pdf/'); await page.locator('.worked-example').scrollIntoViewIfNeeded();
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.locator('.worked-example .copy-example').click();
  assert.match(await page.evaluate(() => navigator.clipboard.readText()), /var dd =/);
  const inline = page.locator('.worked-example .interactive-code');
  await inline.locator('.inline-status').filter({ hasText: 'PDF updated.' }).waitFor({ timeout: 15000 });
  assert.match(await inline.locator('.inline-text p').textContent(), /Make something clear/);
  assert.equal(await page.evaluate(() => localStorage.getItem('pdfmake-playground-workspace-v2')), workspaceBefore, 'Embedded examples must not overwrite the workspace');
  console.log('Live previews, diagnostics, undo/redo, autosave, restored history, named documents and embedded results passed');

  if (process.env.SCREENSHOT_DIR) {
    const dir = process.env.SCREENSHOT_DIR; await fs.mkdir(dir, { recursive: true });
    await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
    await page.screenshot({ path: dir + '/tutorial-desktop.png', fullPage: true });
    await page.goto(base + 'playground/?example=invoice'); await ready();
    await page.screenshot({ path: dir + '/playground-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Mobile playground overflow');
    await page.screenshot({ path: dir + '/playground-mobile.png', fullPage: true });
    await page.goto(base); assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Mobile docs overflow');
    const menu = page.locator('.nav-toggle');
    await menu.click();
    assert.equal(await menu.getAttribute('aria-expanded'), 'true');
    await page.locator('.sidebar a[href$="learn/first-pdf/"]').click();
    await page.waitForURL('**/learn/first-pdf/');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false', 'Mobile drawer closes after navigation');
    await menu.click(); await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    await page.screenshot({ path: dir + '/docs-mobile.png', fullPage: true });
    await page.setViewportSize({ width: 1440, height: 1000 }); await page.screenshot({ path: dir + '/docs-desktop.png', fullPage: true });
  }
  assert.deepEqual(errors, []);
  const noJs = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'dark' }); const plain = await noJs.newPage();
  await plain.goto(base + 'learn/first-pdf/'); assert.match(await plain.locator('main').textContent(), /Make something clear/);
  assert.equal(await plain.locator('html').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(17, 27, 35)', 'System theme works without JavaScript');
  assert.equal(await plain.locator('#theme').isVisible(), false);
  await plain.goto(base + 'de/learn/first-pdf/');
  assert.equal(await plain.locator('main h1').textContent(), 'Deine erste PDF');
  await plain.locator('.language-menu summary').click();
  await plain.locator('.language-menu a[data-language="fr"]').click();
  await plain.waitForURL('**/fr/learn/first-pdf/');
  assert.equal(await plain.locator('main h1').textContent(), 'Votre premier PDF', 'Translated articles and language links work without JavaScript');
  await plain.locator('.version-menu summary').click();
  assert.equal(await plain.locator('.version-menu a[aria-current]').getAttribute('href'), basePath + 'fr/learn/first-pdf/');
  assert.equal(await plain.locator('.version-menu a[data-version="0.1"] small').count(), 1);
  await noJs.close();
  console.log(`Browser passed: ${ids.length} examples, SPA/SEO/no-JS, diagnostics, streams/output, persistence, non-flickering preview and mobile layout`);
} catch (error) {
  if (process.env.SCREENSHOT_DIR) { await fs.mkdir(process.env.SCREENSHOT_DIR, { recursive: true }); await page.screenshot({ path: process.env.SCREENSHOT_DIR + '/failure.png', fullPage: true }).catch(() => {}); }
  throw error;
} finally { await context.close(); await browser.close(); server.close(); }
