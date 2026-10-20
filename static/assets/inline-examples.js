import { createEditor } from '../playground/editor.js';

const active = new Set();
const drafts = new Map();
let pdfModule;
function pdfjs() {
  return pdfModule ??= import('../playground/vendor/pdf.mjs').then(module => {
    module.GlobalWorkerOptions.workerSrc = new URL('../playground/vendor/pdf.worker.mjs', import.meta.url).href;
    return module;
  });
}
export function disposeExamples() { for (const controller of active) controller.destroy(); active.clear(); }

export function enhanceExamples(scope, ui) {
  const controllers = [];
  for (const [index, block] of [...scope.querySelectorAll('.interactive-code')].entries()) {
    if (block.dataset.enhanced) continue;
    block.dataset.enhanced = 'true';
    const $ = selector => block.querySelector(selector);
    const key = location.pathname + ':' + block.dataset.exampleKey + ':' + index;
    const original = Object.fromEntries([...block.querySelectorAll('[data-code-pane]')].map(pane => [pane.dataset.codePane, pane.querySelector('code').textContent.trim()]));
    const saved = drafts.get(key);
    const versions = { ...original, ...saved?.versions };
    const histories = { ...saved?.histories };
    let language = saved?.language || 'javascript', editor, loading = false, revision = 0, timer, worker, timeout;
    let destroyed = false, pdf, pdfLoad, pdfUrl, pageNumber = 1, pageRevision = 0, task;
    const runnable = block.dataset.runnable === 'true';
    function status(text) { $('.inline-status').hidden = false; $('.inline-status').textContent = text; }
    function save() {
      if (editor) { versions[language] = editor.getValue(); histories[language] = editor.serialize(); }
      drafts.delete(key); drafts.set(key, { versions: { ...versions }, histories: { ...histories }, language, edited: !!editor });
      while (drafts.size > 60) drafts.delete(drafts.keys().next().value);
    }
    function stop() { worker?.terminate(); worker = undefined; clearTimeout(timeout); }
    function error(message) { $('.inline-error').hidden = false; $('.inline-error').textContent = message; status(ui.codeFailed); }
    function schedule() { clearTimeout(timer); if (!destroyed && runnable && $('[data-code-live]').checked) timer = setTimeout(run, 650); }
    function changed() {
      if (loading || !editor) return;
      revision++; stop(); clearTimeout(timer); save();
      $('.inline-error').hidden = true;
      $('.inline-download')?.removeAttribute('href');
      block.dataset.stale = 'true';
      status(runnable ? ui.codeWaiting : ui[block.dataset.context === 'node' ? 'codeNodeContext' : 'codeContext']);
      schedule();
    }
    function choose(value) {
      save(); revision++; stop(); clearTimeout(timer); language = value; block.dataset.language = value;
      block.querySelectorAll('[data-code-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.codeLanguage === value)));
      block.querySelectorAll('[data-code-pane]').forEach(pane => { pane.hidden = !!editor || pane.dataset.codePane !== value; });
      if (editor) {
        loading = true; editor.setLanguage(value);
        if (histories[value]) { try { editor.restore(histories[value]); } catch { editor.setValue(versions[value]); } }
        else editor.resetValue(versions[value]);
        editor.setLanguage(value);
        loading = false; changed();
      }
      save();
    }
    function edit() {
      if (editor || destroyed) return;
      $('.inline-editor').hidden = false; $('.inline-actions').hidden = false; $('.edit-code').hidden = true;
      block.classList.add('is-editing');
      editor = createEditor($('.inline-editor'), versions[language], changed, run, { language, sourceType: 'module' });
      if (histories[language]) { loading = true; try { editor.restore(histories[language]); } catch {} loading = false; }
      choose(language);
      status(runnable ? ui.codeWaiting : ui[block.dataset.context === 'node' ? 'codeNodeContext' : 'codeContext']);
    }
    async function draw(doc, number, current) {
      const page = await doc.getPage(number);
      const scale = Math.max(0.2, Math.min(1.25, ($('.inline-canvas').clientWidth - 28) / page.getViewport({ scale: 1 }).width));
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas'); const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.floor(viewport.width * ratio); canvas.height = Math.floor(viewport.height * ratio);
      canvas.style.width = viewport.width + 'px'; canvas.style.height = viewport.height + 'px';
      canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', ui.codePdf + ' ' + number);
      task = page.render({ canvasContext: canvas.getContext('2d'), viewport, transform: [ratio, 0, 0, ratio, 0, 0] });
      await task.promise;
      const text = await page.getTextContent();
      if (!current()) return false;
      $('.inline-canvas').replaceChildren(canvas); $('.inline-text p').textContent = text.items.map(item => item.str).join(' ');
      $('.inline-page-count').textContent = `${number} / ${doc.numPages}`;
      $('[data-code-action="previous"]').disabled = number === 1; $('[data-code-action="next"]').disabled = number === doc.numPages;
      return true;
    }
    async function accept(data, current) {
      let pending;
      try {
        const module = await pdfjs();
        if (destroyed || current !== revision) return;
        const blob = new Blob([data.buffer], { type: 'application/pdf' });
        pending = module.getDocument({ data: new Uint8Array(data.buffer), password: data.password });
        const doc = await pending.promise;
        if (destroyed || current !== revision) { await pending.destroy(); return; }
        $('.inline-preview').hidden = false;
        if (!await draw(doc, 1, () => !destroyed && current === revision)) { await pending.destroy(); return; }
        const old = pdfLoad, oldUrl = pdfUrl; pdf = doc; pdfLoad = pending; pageNumber = 1;
        pdfUrl = URL.createObjectURL(blob);
        $('.inline-download').href = pdfUrl; $('.inline-error').hidden = true; block.dataset.stale = 'false';
        status(ui.codeReady); old?.destroy(); if (oldUrl) URL.revokeObjectURL(oldUrl);
      } catch (failure) { if (!destroyed && current === revision) error(failure.message); if (pending !== pdfLoad) pending?.destroy(); }
    }
    function run() {
      if (!editor || destroyed) return;
      stop(); clearTimeout(timer); const current = ++revision;
      const source = editor.getValue();
      if (source.length > 500000) { error(ui.codeTooLarge); return; }
      $('.inline-error').hidden = true;
      const [syntax] = editor.diagnose(); if (syntax) { error(syntax.message); return; }
      status(ui.codeRendering);
      const instance = worker = new Worker(new URL('../playground/worker.js', import.meta.url));
      instance.onmessage = ({ data }) => {
        if (destroyed || instance !== worker || current !== revision) return;
        stop();
        if (data.diagnostics) editor.reportDiagnostics(data.diagnostics);
        if (data.error) { error(data.error); return; }
        if (data.checked) { status(ui.codeChecked); return; }
        accept(data, current);
      };
      instance.onerror = event => { if (instance === worker) { stop(); error(event.message || ui.codeFailed); } };
      timeout = setTimeout(() => { if (current === revision) { stop(); error(ui.codeTimeout); } }, 15000);
      instance.postMessage({ source, language, checkOnly: !runnable, syntaxOnly: !runnable });
    }
    for (const button of block.querySelectorAll('[data-code-language]')) button.addEventListener('click', () => choose(button.dataset.codeLanguage));
    $('.edit-code').addEventListener('click', () => { edit(); editor.focus(); });
    $('.copy-example').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(editor ? editor.getValue() : versions[language]); $('.copy-example').textContent = ui.copied; }
      catch { status(ui.copyFailed); }
    });
    block.addEventListener('click', async event => {
      const action = event.target.closest('[data-code-action]')?.dataset.codeAction;
      if (!action || !editor) return;
      if (action === 'undo' || action === 'redo') editor[action]();
      if (action === 'run') run();
      if (action === 'reset') { editor.setValue(original[language]); editor.focus(); }
      if ((action === 'previous' || action === 'next') && pdf) {
        pageNumber = Math.min(pdf.numPages, Math.max(1, pageNumber + (action === 'next' ? 1 : -1)));
        const current = ++pageRevision; task?.cancel();
        try { await draw(pdf, pageNumber, () => !destroyed && current === pageRevision); } catch (failure) { if (failure.name !== 'RenderingCancelledException') error(failure.message); }
      }
    });
    $('[data-code-live]')?.addEventListener('change', () => { if ($('[data-code-live]').checked) run(); else clearTimeout(timer); });
    choose(language);
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); if (block.closest('.worked-example')) edit(); } }, { rootMargin: '100px' });
    observer.observe(block);
    if (saved?.edited) edit();
    const controller = { destroy() { if (destroyed) return; save(); destroyed = true; revision++; pageRevision++; stop(); clearTimeout(timer); observer.disconnect(); task?.cancel(); editor?.destroy(); pdfLoad?.destroy(); if (pdfUrl) URL.revokeObjectURL(pdfUrl); active.delete(controller); } };
    active.add(controller); controllers.push(controller);
  }
  return controllers;
}
