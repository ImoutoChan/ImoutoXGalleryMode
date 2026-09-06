// ==UserScript==
// @name         X Gallery — Local media check
// @name:ru      X Gallery — проверка локальных медиа
// @namespace    imouto.x-gallery-local-check
// @version      1.1.1
// @description  Optional companion for X Gallery Mode: check original media MD5 against local Kekkai and highlight exact matches.
// @license      MIT
// @homepageURL  https://github.com/ImoutoChan/ImoutoXGalleryMode
// @supportURL   https://github.com/ImoutoChan/ImoutoXGalleryMode/issues
// @updateURL    https://raw.githubusercontent.com/ImoutoChan/ImoutoXGalleryMode/master/x-gallery-local-check.user.js
// @downloadURL  https://raw.githubusercontent.com/ImoutoChan/ImoutoXGalleryMode/master/x-gallery-local-check.user.js
// @match        https://x.com/*
// @match        https://twitter.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @connect      localhost
// @connect      pbs.twimg.com
// @connect      video.twimg.com
// @run-at       document-idle
// @noframes
// ==/UserScript==

/*
  Changelog

  1.1.1 — 2026-09-06
    • Update and download URLs point at the GitHub repository (ImoutoChan/ImoutoXGalleryMode), so
      userscript managers pick up new versions on their own; license, homepage and support URLs added.

  1.1.0 — 2026-09-06
    • Progress ring on the check button: the arc is the share of checked media; it spins while work is in flight.
    • "Hide saved" button: cards with an exact MD5 match are removed from the gallery (through the
      data-xg-hide attribute of the main script 1.6.0+); the toggle is remembered.
    • Turning the check off removes frames, tooltips and hide markers from every card.

  1.0.1 — 2026-09-06
    • Original MD5s are checked against the local Kekkai API; exact matches are outlined.
*/

(() => {
  'use strict';

  const API = 'http://localhost:11303/FileStatus';
  const TOKEN_KEY = 'kekkai-token';
  const HIDE_KEY = 'hide-saved';
  const BATCH_SIZE = 16;
  const RING = 2 * Math.PI * 9; // circumference of the progress ring (r = 9 in a 24×24 viewBox)
  const ru = (document.documentElement.lang || navigator.language || '').startsWith('ru');
  const T = ru ? {
    check: 'Проверить локально', stop: 'Остановить проверку', active: 'Локально',
    token: 'Токен Kekkai API', tokenPrompt: 'Токен локального Kekkai API (можно оставить пустым; сохраняется в настройках этого юзерскрипта):',
    found: 'Точный MD5 найден локально', relative: 'API нашёл связанный файл (RelativePresent), точное совпадение не подтверждено',
    absent: 'MD5 не найден локально', failed: 'Не удалось проверить медиа',
    auth: 'API отклонил токен. Измените его через меню юзерскрипта.',
    apiError: 'Локальный API недоступен или вернул некорректный ответ',
    progress: 'Проверено', errors: 'Ошибок', hint: 'MD5 оригиналов фото и выбранных MP4. Новые карточки проверяются автоматически, пока проверка включена.',
    hide: 'Скрыть сохранённые', hiddenCount: 'скрыто', hideHint: 'Убирать из галереи медиа, чей MD5 найден локально (действует при включённой проверке).',
  } : {
    check: 'Check local files', stop: 'Stop checking', active: 'Local',
    token: 'Kekkai API token', tokenPrompt: 'Local Kekkai API token (may be empty; saved in this userscript settings):',
    found: 'Exact MD5 found locally', relative: 'API found a related file (RelativePresent); exact match not confirmed',
    absent: 'MD5 not found locally', failed: 'Could not check media',
    auth: 'API rejected the token. Change it in the userscript menu.',
    apiError: 'Local API unavailable or returned an invalid response',
    progress: 'Checked', errors: 'Errors', hint: 'MD5 of original photos and selected MP4s. New cards are checked automatically while enabled.',
    hide: 'Hide saved', hiddenCount: 'hidden', hideHint: 'Remove media whose MD5 was found locally from the gallery (while checking is enabled).',
  };

  // Incremental RFC 1321 MD5. Binary bytes are hashed as received, without decoding/re-encoding media.
  class Md5 {
    constructor() {
      this.state = new Int32Array([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
      this.tail = new Uint8Array(64);
      this.used = 0;
      this.length = 0;
    }
    block(bytes, offset) {
      const words = new DataView(bytes.buffer, bytes.byteOffset + offset, 64);
      let [a, b, c, d] = this.state;
      for (let i = 0; i < 64; i++) {
        let f, g;
        if (i < 16) { f = (b & c) | (~b & d); g = i; }
        else if (i < 32) { f = (d & b) | (~d & c); g = (5 * i + 1) % 16; }
        else if (i < 48) { f = b ^ c ^ d; g = (3 * i + 5) % 16; }
        else { f = c ^ (b | ~d); g = (7 * i) % 16; }
        const n = (a + f + MD5_K[i] + words.getInt32(g * 4, true)) | 0;
        const shift = MD5_S[(i >>> 4) * 4 + i % 4];
        const next = (b + ((n << shift) | (n >>> (32 - shift)))) | 0;
        a = d; d = c; c = b; b = next;
      }
      this.state[0] += a; this.state[1] += b; this.state[2] += c; this.state[3] += d;
    }
    update(bytes) {
      this.length += bytes.length;
      let offset = 0;
      if (this.used) {
        const count = Math.min(64 - this.used, bytes.length);
        this.tail.set(bytes.subarray(0, count), this.used);
        this.used += count; offset += count;
        if (this.used === 64) { this.block(this.tail, 0); this.used = 0; }
      }
      while (offset + 64 <= bytes.length) { this.block(bytes, offset); offset += 64; }
      if (offset < bytes.length) { this.tail.set(bytes.subarray(offset), 0); this.used = bytes.length - offset; }
      return this;
    }
    digest() {
      const final = new Uint8Array(this.used < 56 ? 64 : 128);
      final.set(this.tail.subarray(0, this.used)); final[this.used] = 0x80;
      const view = new DataView(final.buffer);
      view.setUint32(final.length - 8, (this.length * 8) >>> 0, true);
      view.setUint32(final.length - 4, Math.floor(this.length / 0x20000000), true);
      for (let offset = 0; offset < final.length; offset += 64) this.block(final, offset);
      const output = new DataView(new ArrayBuffer(16));
      this.state.forEach((n, i) => output.setInt32(i * 4, n, true));
      return Array.from(new Uint8Array(output.buffer), (n) => n.toString(16).padStart(2, '0')).join('');
    }
  }
  const MD5_K = Int32Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32));
  const MD5_S = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];

  function abortError() { return new DOMException('Aborted', 'AbortError'); }
  async function hashBytes(buffer, signal) {
    const bytes = new Uint8Array(buffer);
    const hash = new Md5();
    for (let offset = 0; offset < bytes.length; offset += 262144) {
      if (signal.aborted) throw abortError();
      hash.update(bytes.subarray(offset, offset + 262144));
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    if (signal.aborted) throw abortError();
    return hash.digest();
  }

  function mediaUrl(card) {
    try {
      const url = new URL(card.dataset.xgDownloadUrl);
      return url.protocol === 'https:' && ['pbs.twimg.com', 'video.twimg.com'].includes(url.hostname) ? url.href : null;
    } catch { return null; }
  }

  function request(options, signal) {
    return new Promise((resolve, reject) => {
      if (signal.aborted) { reject(abortError()); return; }
      let handle;
      const finish = (callback, value) => { signal.removeEventListener('abort', abort); callback(value); };
      const abort = () => { handle?.abort(); finish(reject, abortError()); };
      signal.addEventListener('abort', abort, { once: true });
      try {
        handle = GM_xmlhttpRequest({
          ...options, anonymous: true, timeout: 120000,
          onload: (response) => finish(resolve, response),
          onerror: () => finish(reject, new Error(T.apiError)),
          ontimeout: () => finish(reject, new Error(T.apiError)),
          onabort: () => finish(reject, abortError()),
        });
      } catch { finish(reject, new Error(T.apiError)); }
    });
  }

  function parseStatuses(response, hashes) {
    if (!Array.isArray(response)) throw new Error(T.apiError);
    const statuses = new Map();
    for (const row of response) {
      if (typeof row?.hash !== 'string' || !['Present', 'RelativePresent', 'NotFound'].includes(row.status)) throw new Error(T.apiError);
      const hash = row.hash.toLowerCase();
      if (statuses.has(hash) && statuses.get(hash) !== row.status) throw new Error(T.apiError);
      statuses.set(hash, row.status);
    }
    if (hashes.some((hash) => !statuses.has(hash))) throw new Error(T.apiError);
    return statuses;
  }

  async function queryStatuses(hashes, token, signal) {
    const response = await request({
      method: 'POST', url: `${API}?token=${encodeURIComponent(token)}`,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, data: JSON.stringify(hashes),
    }, signal);
    if (signal.aborted) throw abortError();
    if (response.status === 401 || response.status === 403) throw new Error(T.auth);
    if (response.status !== 200) throw new Error(T.apiError);
    try { return parseStatuses(JSON.parse(response.responseText), hashes); }
    catch { throw new Error(T.apiError); }
  }

  const hashCache = new Map(); // URL -> digest only; never keep downloaded media buffers.
  let session = null;
  let style = null;

  const ICONS = {
    check: '<svg viewBox="0 0 24 24"><path d="M3 3h18v14H3V3zm2 2v10h14V5H5zm3 14h8v2H8v-2zm2-9 2 2 4-4 1.4 1.4-5.4 5.4-3.4-3.4L10 10z"/></svg>',
    hide: '<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 5C6.5 5 2.7 9.3 1.5 12c1.2 2.7 5 7 10.5 7s9.3-4.3 10.5-7C21.3 9.3 17.5 5 12 5zm0 2c-4.2 0-7.3 3.2-8.4 5 1.1 1.8 4.2 5 8.4 5s7.3-3.2 8.4-5c-1.1-1.8-4.2-5-8.4-5zm0 2a3 3 0 1 1 0 6 3 3 0 1 1 0-6z"/><path d="M3.3 4.7l1.4-1.4 16 16-1.4 1.4z"/></svg>',
  };

  const CSS = [
    '#xg-root .xg-card.xgl-present, #xg-root .xg-card.xgl-present:hover { outline: 3px solid #f4212e; outline-offset: -3px; }',
    '#xg-root .xg-card.xgl-present .xg-media { opacity: .8; }',
    '#xg-root .xgl-ring { transform: rotate(-90deg); }',
    '#xg-root .xgl-ring circle { fill: none; stroke: currentColor; stroke-width: 2.5; }',
    '#xg-root .xgl-ring-track { opacity: .3; }',
    `#xg-root .xgl-ring-fill { stroke-linecap: round; stroke-dasharray: ${RING.toFixed(2)}; transition: stroke-dashoffset .3s; }`,
    '#xg-root .xgl-ring.xgl-busy { animation: xgl-spin 1.4s linear infinite; }',
    '@keyframes xgl-spin { from { transform: rotate(-90deg); } to { transform: rotate(270deg); } }',
  ].join('\n');

  function configureToken() {
    const value = window.prompt(T.tokenPrompt, GM_getValue(TOKEN_KEY, ''));
    if (value === null) return false;
    GM_setValue(TOKEN_KEY, value.trim());
    if (session) stop(session);
    return true;
  }
  GM_registerMenuCommand(T.token, configureToken);

  // Saved media are hidden only while a check is running; the toggle itself is remembered.
  const hiding = (s) => s.enabled && s.hideSaved;

  // Text nodes are only replaced when the text actually changes: every childList mutation inside the
  // gallery wakes the MutationObserver below, so an unconditional write would re-render forever.
  const setText = (node, text) => { if (node.textContent !== text) node.textContent = text; };

  function render(s) {
    const total = s.entries.size;
    const checked = [...s.entries.values()].filter((entry) => entry.done).length;
    setText(s.label, s.enabled ? `${T.active} ${checked}/${total}` : T.check);
    s.button.classList.toggle('xg-active', s.enabled);
    s.button.setAttribute('aria-pressed', String(s.enabled));
    s.button.title = s.error || `${s.enabled ? T.stop : T.hint}\n${T.progress}: ${checked}/${total}; ${T.errors}: ${s.errors}`;
    // While checking, a progress ring replaces the icon: arc = share of checked media; it spins while work is in flight.
    s.icon.hidden = s.enabled;
    s.ring.hidden = !s.enabled;
    s.ring.classList.toggle('xgl-busy', s.enabled && s.running);
    const share = total ? checked / total : 0;
    s.ringFill.style.strokeDashoffset = String(RING * (1 - Math.max(share, 0.04)));
    const hidden = hiding(s)
      ? [...s.entries.values()].filter((entry) => entry.status === 'Present').reduce((n, entry) => n + entry.cards.size, 0) : 0;
    s.hideBtn.classList.toggle('xg-active', s.hideSaved);
    s.hideBtn.setAttribute('aria-pressed', String(s.hideSaved));
    setText(s.hideBadge, String(hidden));
    s.hideBtn.title = `${T.hide} · ${hidden} ${T.hiddenCount}\n${T.hideHint}`;
  }

  function mark(card, entry, hide = false) {
    const present = entry.status === 'Present';
    card.dataset.xglStatus = entry.status || 'Error';
    card.classList.toggle('xgl-present', present);
    // The main script (1.6.0+) drops cards carrying data-xg-hide from its layout.
    if (hide && present) card.dataset.xgHide = 'local'; else delete card.dataset.xgHide;
    card.querySelector('.xg-media')?.setAttribute('title', present ? T.found
      : entry.status === 'RelativePresent' ? T.relative : entry.status === 'NotFound' ? T.absent : T.failed);
  }

  function unmark(card) {
    delete card.dataset.xglStatus;
    delete card.dataset.xgHide;
    card.classList.remove('xgl-present');
    card.querySelector('.xg-media')?.removeAttribute('title');
  }

  function applyHide(s) {
    for (const entry of s.entries.values()) if (entry.done) for (const card of entry.cards) mark(card, entry, hiding(s));
  }

  function enqueue(s, card) {
    const url = mediaUrl(card);
    if (!url || !s.root.contains(card)) return;
    let entry = s.entries.get(url);
    if (!entry) {
      entry = { url, cards: new Set(), done: false };
      s.entries.set(url, entry);
      s.queue.push(entry);
    }
    entry.cards.add(card);
    if (entry.done) mark(card, entry, hiding(s));
  }

  function stop(s) {
    s.enabled = false;
    s.controller?.abort();
    // Turning the check off removes every frame, tooltip and hide marker it produced.
    for (const card of s.root.querySelectorAll('.xg-card')) unmark(card);
    render(s);
  }

  async function pump(s) {
    if (s.running || !s.enabled) return;
    s.running = true;
    render(s);
    const controller = s.controller;
    const signal = controller.signal;
    try {
      if (!s.apiReady) {
        // Validate API access before downloading potentially large media files.
        await queryStatuses([], s.token, signal);
        s.apiReady = true;
      }
      while (s.queue.length && !signal.aborted && s.root.isConnected) {
        const batch = s.queue.splice(0, BATCH_SIZE);
        const ready = [];
        // Sequential downloads bound peak memory to one media file.
        for (const entry of batch) {
          try {
            entry.hash = hashCache.get(entry.url);
            if (!entry.hash) {
              const response = await request({ method: 'GET', url: entry.url, responseType: 'arraybuffer' }, signal);
              if (response.status < 200 || response.status >= 300 || !response.response?.byteLength) throw new Error(T.failed);
              entry.hash = await hashBytes(response.response, signal);
              if (hashCache.size >= 10000) hashCache.delete(hashCache.keys().next().value);
              hashCache.set(entry.url, entry.hash);
            }
            ready.push(entry);
          } catch (error) {
            if (signal.aborted) throw abortError();
            entry.done = true; s.errors++;
            for (const card of entry.cards) mark(card, entry, hiding(s));
          }
          render(s);
        }
        if (!ready.length) continue;
        const hashes = [...new Set(ready.map((entry) => entry.hash))];
        const statuses = await queryStatuses(hashes, s.token, signal);
        for (const entry of ready) {
          entry.done = true; entry.status = statuses.get(entry.hash);
          for (const card of entry.cards) if (s.root.contains(card)) mark(card, entry, hiding(s));
        }
        render(s);
      }
    } catch (error) {
      if (!signal.aborted) { s.error = error.message; stop(s); }
    } finally {
      s.running = false;
      if (s.enabled && s.queue.length) void pump(s);
      else render(s);
    }
  }

  function start(s) {
    if (s.running) return;
    s.token = GM_getValue(TOKEN_KEY, '');
    s.enabled = true; s.error = ''; s.errors = 0;
    s.apiReady = false;
    s.controller = new AbortController(); s.entries.clear(); s.queue = [];
    for (const card of s.root.querySelectorAll('.xg-card')) enqueue(s, card);
    render(s);
    void pump(s);
  }

  function mount() {
    const root = document.querySelector('#xg-root[data-xg-gallery="1"]');
    if (session?.root === root) return;
    if (session) { stop(session); session.button.remove(); session.hideBtn.remove(); session = null; }
    if (!root) return;
    const tools = root.querySelector('.xg-tools');
    if (!tools) return;
    if (!style) {
      style = document.createElement('style');
      style.textContent = CSS;
      document.head.append(style);
    }
    const button = document.createElement('button');
    button.className = 'xg-pill xgl-check';
    button.innerHTML = `${ICONS.check}<svg class="xgl-ring" viewBox="0 0 24 24" aria-hidden="true" hidden>`
      + '<circle class="xgl-ring-track" cx="12" cy="12" r="9"/><circle class="xgl-ring-fill" cx="12" cy="12" r="9"/></svg><span></span>';
    const hideBtn = document.createElement('button');
    hideBtn.className = 'xg-pill xgl-hide';
    hideBtn.innerHTML = `${ICONS.hide}<span class="xg-label">${T.hide}</span><span class="xg-badge">0</span>`;
    const s = {
      root, button, hideBtn, label: button.querySelector('span'), icon: button.querySelector('svg:not(.xgl-ring)'),
      ring: button.querySelector('.xgl-ring'), ringFill: button.querySelector('.xgl-ring-fill'), hideBadge: hideBtn.querySelector('.xg-badge'),
      hideSaved: Boolean(GM_getValue(HIDE_KEY, false)), enabled: false, running: false,
      queue: [], entries: new Map(), errors: 0, error: '', controller: null,
    };
    session = s;
    button.addEventListener('click', () => { if (s.enabled) stop(s); else start(s); });
    hideBtn.addEventListener('click', () => { s.hideSaved = !s.hideSaved; GM_setValue(HIDE_KEY, s.hideSaved); applyHide(s); render(s); });
    tools.append(button, hideBtn);
    render(s);
  }

  // Reacts only to cards appearing or disappearing. Changes inside the companion's own buttons and
  // any other DOM churn (heading re-renders, text nodes) must not trigger work, or render() would
  // feed the observer in an endless loop.
  function observeGallery(records) {
    mount();
    const s = session;
    if (!s?.enabled) return;
    let added = false;
    for (const record of records) {
      if (s.button.contains(record.target) || s.hideBtn.contains(record.target)) continue;
      // Sort/source changes clear the grid. Cancel old work rather than hash a discarded feed.
      for (const node of record.removedNodes) {
        if (node.nodeType === 1 && (node.matches('.xg-card') || node.querySelector('.xg-card'))) { stop(s); return; }
      }
      for (const node of record.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches('.xg-card')) { enqueue(s, node); added = true; }
        for (const card of node.querySelectorAll('.xg-card')) { enqueue(s, card); added = true; }
      }
    }
    if (!added) return;
    render(s);
    void pump(s);
  }

  new MutationObserver(observeGallery).observe(document.documentElement, { childList: true, subtree: true });
  mount();
})();
