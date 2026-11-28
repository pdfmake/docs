(() => {
  const script = document.currentScript;
  const ui = JSON.parse(script.dataset.ui);
  const input = document.querySelector('#search');
  const results = document.querySelector('#search-results');
  const status = document.querySelector('#search-status');
  document.documentElement.classList.add('js');
  const menu = document.querySelector('.nav-toggle');
  const backdrop = document.querySelector('.nav-backdrop');
  menu.hidden = false;
  function closeMenu(focus = false) { const wasOpen = document.body.classList.contains('nav-open'); document.body.classList.remove('nav-open'); document.querySelector('main').inert = false; menu.setAttribute('aria-expanded', 'false'); backdrop.hidden = true; if (focus && wasOpen) menu.focus(); }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; document.body.classList.toggle('nav-open', open); document.querySelector('main').inert = open; menu.setAttribute('aria-expanded', String(open)); backdrop.hidden = !open; });
  backdrop.addEventListener('click', () => closeMenu(true));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(true); document.querySelector('.search-popover').hidden = true; } if (event.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) { event.preventDefault(); input.focus(); } });
  let corpus;
  function getCorpus() {
    return corpus ??= fetch(script.dataset.index).then(response => { if (!response.ok) throw new Error('Search index unavailable'); return response.json(); }).catch(error => { corpus = undefined; throw error; });
  }
  let request = 0;
  input.addEventListener('focus', () => { if (input.value.trim()) document.querySelector('.search-popover').hidden = false; });
  input.addEventListener('keydown', event => { if (event.key === 'ArrowDown') { const first = results.querySelector('a'); if (first) { event.preventDefault(); first.focus(); } } });
  results.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    const links = [...results.querySelectorAll('a')], current = links.indexOf(document.activeElement);
    if (event.key === 'ArrowUp' && current <= 0) input.focus();
    else links[(current + (event.key === 'ArrowDown' ? 1 : links.length - 1)) % links.length]?.focus();
  });
  input.addEventListener('input', async () => {
    const current = ++request;
    const query = input.value.trim().toLowerCase();
    results.replaceChildren();
    results.hidden = !query;
    status.textContent = '';
    document.querySelector('.search-popover').hidden = !query;
    if (!query) return;
    try {
      const { pages } = await getCorpus();
      if (request !== current) return;
      const terms = query.match(/[\p{L}\p{N}_]+/gu) || [];
      const hits = pages.map(page => ({ page, score: terms.reduce((score, term) => score
        + (`${page.title} ${page.id}`.toLowerCase().includes(term) ? 12 : 0)
        + (page.description.toLowerCase().includes(term) ? 5 : 0)
        + (page.markdown.toLowerCase().includes(term) ? 1 : 0), 0) }))
        .filter(hit => hit.score > 0).sort((a, b) => b.score - a.score || a.page.id.localeCompare(b.page.id)).slice(0, 8);
      for (const { page } of hits) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = page.path;
        link.textContent = page.title;
        li.append(link);
        results.append(li);
      }
      status.textContent = hits.length ? ui.results.replace('{count}', hits.length) : ui.noResults;
    } catch {
      if (request === current) status.textContent = ui.searchFailed;
    }
  });
  let inlineModule;
  const codeUI = JSON.parse(script.dataset.codeUi);
  function examples(scope) {
    inlineModule ??= import(new URL('./inline-examples.js', script.src));
    inlineModule.then(module => { if (scope === document || scope.isConnected) module.enhanceExamples(scope, codeUI); }).catch(console.error);
  }
  let observer;
  function enhance(scope) {
    observer?.disconnect();
    const headings = [...scope.querySelectorAll('article h2[id], article h3[id]')];
    observer = new IntersectionObserver(entries => {
      const entry = entries.find(item => item.isIntersecting);
      if (!entry) return;
      for (const link of document.querySelectorAll('.toc a')) { if (decodeURIComponent(new URL(link.href).hash.slice(1)) === entry.target.id) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }
    }, { rootMargin: '-80px 0px -65% 0px' });
    headings.forEach(heading => observer.observe(heading));
    const kind = scope.dataset?.pageKind || document.querySelector('main').dataset.pageKind;
    for (const link of document.querySelectorAll('.primary-nav a')) { if (link.dataset.section === (kind === 'workspace' ? 'playground' : 'docs')) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); }
    for (const picker of scope.querySelectorAll('[data-runtime-picker]')) {
      const buttons = [...picker.querySelectorAll('button')];
      const panels = [...scope.querySelectorAll('[data-runtime-panel]')];
      function choose(name) { buttons.forEach(button => { button.setAttribute('aria-selected', String(button.dataset.runtime === name)); button.tabIndex = button.dataset.runtime === name ? 0 : -1; }); panels.forEach(panel => { panel.hidden = panel.dataset.runtimePanel !== name; }); }
      picker.addEventListener('click', event => { const button = event.target.closest('[data-runtime]'); if (button) choose(button.dataset.runtime); });
      picker.addEventListener('keydown', event => { if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return; event.preventDefault(); const index = buttons.indexOf(document.activeElement); const next = buttons[(index + (event.key === 'ArrowRight' ? 1 : buttons.length - 1)) % buttons.length]; choose(next.dataset.runtime); next.focus(); });
      choose('node');
    }
    examples(scope);
    for (const button of scope.querySelectorAll('.copy-example')) {
      if (button.closest('.interactive-code')) continue;
      const code = button.closest('.code-block, .example-source')?.querySelector('code');
      if (!code) continue;
      button.setAttribute('aria-label', ui.copy);
      button.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(code.textContent); button.textContent = ui.copied; }
        catch { button.textContent = ui.copyFailed; }
      });
    }
  }
  enhance(document);

  // Full HTML is always served for crawlers and direct links. Enhance only chapter navigation.
  const cache = new Map();
  let navigation = 0;
  function chapter(link) {
    if (!link || link.hasAttribute('data-version') || link.hasAttribute('data-language') || link.target || link.hasAttribute('download')) return null;
    const url = new URL(link.href, location.href);
    const base = new URL(script.dataset.index, location.href).pathname.replace(/docs-index\.json$/, '');
    if (url.origin !== location.origin || !url.pathname.startsWith(base) || url.pathname.includes('/playground/standalone.html') || /\.[a-z0-9]+$/i.test(url.pathname)) return null;
    const relative = url.pathname.slice(new URL(script.dataset.index, location.href).pathname.replace(/docs-index\.json$/, '').length);
    if (script.dataset.language === 'en' && /^(de|fr|es|pt-br)\//.test(relative)) return null;
    return url;
  }
  function getPage(url) {
    const key = url.pathname;
    if (!cache.has(key)) {
      cache.set(key, fetch(key, { headers: { Accept: 'text/html' } }).then(response => {
        if (!response.ok) throw new Error('Could not load chapter');
        return response.text();
      }).catch(error => { cache.delete(key); throw error; }));
      if (cache.size > 20) cache.delete(cache.keys().next().value);
    }
    return cache.get(key);
  }
  let workspace;
  let workspaceController;
  async function activateWorkspace(main, url) {
    if (main.dataset.pageKind !== 'workspace') return;
    if (workspaceController && main === workspace) { workspaceController.resume(url); return; }
    const { mountPlayground } = await import(script.dataset.playground);
    if (!main.isConnected) return;
    const { pages } = await getCorpus().catch(() => ({ pages: [] }));
    if (!main.isConnected) return;
    workspace = main;
    workspaceController = mountPlayground(main, { url: url.href, version: script.dataset.version, docLinks: Object.fromEntries(pages.map(page => [page.translationKey + '/', page.path])) });
  }
  activateWorkspace(document.querySelector('main'), new URL(location.href)).catch(error => { document.querySelector('[data-workspace]')?.prepend(Object.assign(document.createElement('p'), { textContent: error.message })); });
  async function navigate(url, push = true, scroll) {
    const current = ++navigation;
    document.querySelector('main').setAttribute('aria-busy', 'true');
    try {
      const html = await getPage(url);
      if (current !== navigation) return;
      const next = new DOMParser().parseFromString(html, 'text/html');
      const incoming = next.querySelector('main');
      const main = incoming?.dataset.pageKind === 'workspace' && workspace ? workspace : incoming;
      if (!main) throw new Error('Missing chapter content');
      if (push) {
        history.replaceState({ docs: true, scroll: [scrollX, scrollY] }, '', location.href);
        history.pushState({ docs: true, scroll: [0, 0] }, '', url);
      }
      (await inlineModule)?.disposeExamples();
      if (current !== navigation) return;
      if (document.querySelector('main') === workspace) workspaceController.suspend();
      document.querySelector('main').replaceWith(main);
      const sidebar = document.querySelector('.sidebar');
      const openGroups = new Set([...sidebar.querySelectorAll('details[open]')].map(group => group.dataset.navGroup));
      const incomingSidebar = next.querySelector('.sidebar');
      for (const group of incomingSidebar.querySelectorAll('details')) if (openGroups.has(group.dataset.navGroup)) group.open = true;
      const sidebarScroll = sidebar.scrollTop;
      sidebar.replaceWith(incomingSidebar);
      incomingSidebar.scrollTop = sidebarScroll;
      closeMenu();
      document.querySelector('.search-popover').hidden = true;
      document.title = next.title;
      document.querySelector('.language-menu').replaceWith(next.querySelector('.language-menu'));
      document.querySelector('.version-menu').replaceWith(next.querySelector('.version-menu'));
      document.head.querySelectorAll('link[hreflang]').forEach(link => link.remove());
      for (const link of next.head.querySelectorAll('link[hreflang]')) document.head.append(link);
      for (const selector of ['meta[name="description"]', 'link[rel="canonical"]', 'link[rel="alternate"][type="text/markdown"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:url"]', 'script[type="application/ld+json"]']) {
        const incoming = next.querySelector(selector), existing = document.head.querySelector(selector);
        if (incoming && existing) existing.replaceWith(incoming);
      }
      for (const link of document.querySelectorAll('.sidebar a')) {
        if (new URL(link.href).pathname === url.pathname) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
      }
      enhance(main);
      await activateWorkspace(main, url);
      main.removeAttribute('aria-busy');
      if (scroll) window.scrollTo(...scroll);
      else if (url.hash) document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView();
      else window.scrollTo(0, 0);
      if (push) main.focus({ preventScroll: true });
      document.dispatchEvent(new CustomEvent('docs:navigated', { detail: { path: url.pathname } }));
    } catch { if (current === navigation) location.assign(url.href); }
  }
  history.replaceState({ docs: true, scroll: [scrollX, scrollY] }, '', location.href);
  history.scrollRestoration = 'manual';
  document.addEventListener('click', event => {
    if (!event.target.closest('.search-area')) document.querySelector('.search-popover').hidden = true;
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = chapter(event.target.closest('a[href]'));
    if (!url || (url.pathname === location.pathname && url.hash)) return;
    event.preventDefault(); navigate(url);
  });
  window.addEventListener('popstate', event => { if (event.state?.docs) navigate(new URL(location.href), false, event.state.scroll); });
  document.addEventListener('pointerover', event => {
    const url = chapter(event.target.closest('a[href]'));
    if (url && url.pathname !== location.pathname) getPage(url).catch(() => {});
  });
})();
