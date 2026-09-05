const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'x-gallery-local-check.user.js'), 'utf8');
const from = source.indexOf('  class Md5');
const to = source.indexOf('  const hashCache');
assert.ok(from >= 0 && to > from);
const context = vm.createContext({
  URL, DOMException, setTimeout, T: { apiError: 'Invalid API response', auth: 'Invalid token' },
  API: 'http://localhost:11303/FileStatus',
});
vm.runInContext(source.slice(from, to) + '\nglobalThis.Md5 = Md5;', context);

test('MD5 matches standard vectors', () => {
  for (const [input, hash] of [
    ['', 'd41d8cd98f00b204e9800998ecf8427e'],
    ['a', '0cc175b9c0f1b6a831c399e269772661'],
    ['abc', '900150983cd24fb0d6963f7d28e17f72'],
    ['message digest', 'f96b697d7cb7938d525a2f31aaf161d0'],
    ['abcdefghijklmnopqrstuvwxyz', 'c3fcd3d76192e4007dfb496cca67e13b'],
  ]) assert.equal(new context.Md5().update(Buffer.from(input)).digest(), hash);
});

test('incremental MD5 matches node:crypto on binary data and padding boundaries', () => {
  for (const length of [0, 1, 55, 56, 63, 64, 65, 119, 120, 127, 128, 129, 1025, 1048577]) {
    const data = Buffer.alloc(length);
    for (let i = 0; i < length; i++) data[i] = (i * 71 + (i >>> 8)) & 255;
    const expected = crypto.createHash('md5').update(data).digest('hex');
    for (const chunk of [1, 63, 64, 97, 262144]) {
      if (length > 10000 && chunk === 1) continue;
      const md5 = new context.Md5();
      for (let i = 0; i < length; i += chunk) md5.update(data.subarray(i, i + chunk));
      assert.equal(md5.digest(), expected, `length=${length}, chunk=${chunk}`);
    }
  }
});

test('async hashing preserves binary content and supports cancellation', async () => {
  const data = crypto.randomBytes(600001);
  const controller = new AbortController();
  const buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  assert.equal(await context.hashBytes(buffer, controller.signal), crypto.createHash('md5').update(data).digest('hex'));
  controller.abort();
  await assert.rejects(context.hashBytes(buffer, controller.signal), { name: 'AbortError' });
});

test('lookup matches rows by hash, tolerates uppercase, and distinguishes related files', () => {
  const statuses = context.parseStatuses([
    { hash: 'BBB', status: 'RelativePresent' }, { hash: 'CCC', status: 'NotFound' }, { hash: 'AAA', status: 'Present' },
  ], ['aaa', 'bbb', 'ccc']);
  assert.equal(statuses.get('aaa'), 'Present');
  assert.equal(statuses.get('bbb'), 'RelativePresent');
  assert.equal(statuses.get('ccc'), 'NotFound');
});

test('lookup rejects missing, malformed, conflicting, and unknown results', () => {
  for (const response of [null, {}, [], [{ hash: 'abc', status: 'unknown' }],
    [{ hash: null, status: 'Present' }],
    [{ hash: 'abc', status: 'Present' }, { hash: 'abc', status: 'NotFound' }]]) {
    assert.throws(() => context.parseStatuses(response, ['abc']), /Invalid API response/);
  }
});

test('media URLs are restricted to actual Twitter media hosts', () => {
  for (const url of ['https://pbs.twimg.com/media/a.jpg?format=jpg&name=orig', 'https://video.twimg.com/a.mp4']) {
    assert.equal(context.mediaUrl({ dataset: { xgDownloadUrl: url } }), url);
  }
  for (const url of ['http://localhost:11303/FileStatus', 'https://evil.example/a', 'data:text/plain,abc', 'https://pbs.twimg.com.evil.example/a']) {
    assert.equal(context.mediaUrl({ dataset: { xgDownloadUrl: url } }), null);
  }
});

test('API lookup sends only hashes, encodes token, and validates status', async () => {
  let options;
  context.GM_xmlhttpRequest = (value) => {
    options = value;
    queueMicrotask(() => value.onload({ status: 200, responseText: '[{"hash":"abc","status":"Present"}]' }));
    return { abort() {} };
  };
  const result = await context.queryStatuses(['abc'], 'a&b ?', new AbortController().signal);
  assert.equal(options.url, 'http://localhost:11303/FileStatus?token=a%26b%20%3F');
  assert.equal(options.method, 'POST');
  assert.equal(options.data, '["abc"]');
  assert.equal(options.anonymous, true);
  assert.equal(result.get('abc'), 'Present');
  await context.queryStatuses(['abc'], '', new AbortController().signal);
  assert.equal(options.url, 'http://localhost:11303/FileStatus?token=');
  context.GM_xmlhttpRequest = (value) => {
    queueMicrotask(() => value.onload({ status: 401, responseText: '' }));
    return { abort() {} };
  };
  await assert.rejects(context.queryStatuses([], 'wrong', new AbortController().signal), /Invalid token/);
});

test('companion stays idle when the main gallery is absent', () => {
  let requests = 0, observer;
  const idle = vm.createContext({
    document: { documentElement: { lang: 'en' }, querySelector() { return null; } },
    navigator: { language: 'en' }, GM_registerMenuCommand() {},
    GM_xmlhttpRequest() { requests++; },
    MutationObserver: class { constructor(callback) { observer = callback; } observe() {} },
  });
  vm.runInContext(source, idle);
  observer([]);
  assert.equal(requests, 0);
});

test('only exact Present is highlighted, with independent results for slides', () => {
  const end = source.indexOf('  new MutationObserver');
  const marking = vm.createContext({
    document: { documentElement: { lang: 'en' } }, navigator: { language: 'en' },
    GM_registerMenuCommand() {},
  });
  vm.runInContext(source.slice(0, end) + '\nglobalThis.mark = mark;\n})();', marking);
  const makeCard = () => ({
    dataset: {}, classList: { toggle(name, enabled) { this[name] = enabled; } },
    querySelector() { return { setAttribute() {} }; },
  });
  const first = makeCard(), second = makeCard();
  marking.mark(first, { status: 'Present' });
  marking.mark(second, { status: 'NotFound' });
  assert.equal(first.classList['xgl-present'], true);
  assert.equal(second.classList['xgl-present'], false);
  marking.mark(first, { status: 'RelativePresent' });
  assert.equal(first.classList['xgl-present'], false);
  assert.equal(first.dataset.xglStatus, 'RelativePresent');
});

test('render never rewrites unchanged text and the observer ignores its own buttons (no feedback loop)', () => {
  const end = source.indexOf('  new MutationObserver');
  const gallery = { isConnected: false };
  const ctx = vm.createContext({
    document: { documentElement: { lang: 'en' }, querySelector: () => gallery }, navigator: { language: 'en' },
    GM_registerMenuCommand() {},
  });
  vm.runInContext(source.slice(0, end) + '\nObject.assign(globalThis, { render, observeGallery, setSession: (value) => { session = value; } });\n})();', ctx);
  const textNode = () => { let value = ''; let writes = 0; return { get textContent() { return value; }, set textContent(v) { value = v; writes++; }, get writes() { return writes; } }; };
  const element = () => ({ hidden: false, title: '', style: {}, classList: { toggle() {} }, setAttribute() {} });
  const s = {
    root: gallery, entries: new Map(), queue: [], enabled: true, running: false, hideSaved: true, errors: 0, error: '', controller: null,
    button: { ...element(), contains: (node) => node === 'button-child' }, hideBtn: { ...element(), contains: (node) => node === 'hide-child' },
    label: textNode(), icon: element(), ring: element(), ringFill: element(), hideBadge: textNode(),
  };
  ctx.render(s);
  ctx.render(s);
  ctx.render(s);
  assert.equal(s.label.writes, 1);
  assert.equal(s.hideBadge.writes, 1);
  // Mutations produced by the buttons themselves (badge text, label text) must not re-render or pump.
  ctx.setSession(s);
  s.controller = { signal: { aborted: false } };
  ctx.observeGallery([
    { target: 'hide-child', addedNodes: [{ nodeType: 3 }], removedNodes: [{ nodeType: 3 }] },
    { target: 'button-child', addedNodes: [{ nodeType: 3 }], removedNodes: [] },
    { target: 'heading', addedNodes: [{ nodeType: 1, matches: () => false, querySelectorAll: () => [] }], removedNodes: [{ nodeType: 3 }] },
  ]);
  assert.equal(s.label.writes, 1);
  assert.equal(s.hideBadge.writes, 1);
  assert.equal(s.running, false, 'no pump without new cards');
});

test('hide saved flags only exact matches, the ring tracks progress, and stopping clears every marker', () => {
  const end = source.indexOf('  new MutationObserver');
  const ctx = vm.createContext({
    document: { documentElement: { lang: 'en' } }, navigator: { language: 'en' },
    GM_registerMenuCommand() {},
  });
  vm.runInContext(source.slice(0, end)
    + '\nObject.assign(globalThis, { mark, stop, applyHide, render, RING });\n})();', ctx);
  const makeCard = () => {
    const media = { attrs: {}, setAttribute(name, value) { this.attrs[name] = value; }, removeAttribute(name) { delete this.attrs[name]; } };
    return { dataset: {}, media, classList: { toggle(name, on) { this[name] = on; }, remove(name) { this[name] = false; } }, querySelector() { return media; } };
  };
  const element = () => ({ hidden: false, textContent: '', title: '', style: {}, classList: { toggle(name, on) { this[name] = on; } }, setAttribute() {} });
  const present = makeCard(), related = makeCard(), pending = makeCard();
  const entries = new Map([
    ['a', { done: true, status: 'Present', cards: new Set([present]) }],
    ['b', { done: true, status: 'RelativePresent', cards: new Set([related]) }],
    ['c', { done: false, cards: new Set([pending]) }],
  ]);
  const s = {
    root: { querySelectorAll() { return [present, related, pending]; } }, entries, queue: [], enabled: true, running: true, hideSaved: true,
    errors: 0, error: '', controller: { abort() { this.aborted = true; } },
    button: element(), label: element(), icon: element(), ring: element(), ringFill: element(), hideBtn: element(), hideBadge: element(),
  };
  ctx.applyHide(s);
  ctx.render(s);
  assert.equal(present.dataset.xgHide, 'local');
  assert.equal(related.dataset.xgHide, undefined);
  assert.equal(present.media.attrs.title, 'Exact MD5 found locally');
  assert.equal(s.hideBadge.textContent, '1');
  assert.equal(s.icon.hidden, true);
  assert.equal(s.ring.hidden, false);
  assert.equal(s.ring.classList['xgl-busy'], true);
  assert.ok(Math.abs(Number(s.ringFill.style.strokeDashoffset) - ctx.RING / 3) < 1e-9, 'two of three entries checked');
  s.hideSaved = false;
  ctx.applyHide(s);
  ctx.render(s);
  assert.equal(present.dataset.xgHide, undefined);
  assert.equal(present.classList['xgl-present'], true);
  assert.equal(s.hideBadge.textContent, '0');
  s.hideSaved = true;
  ctx.applyHide(s);
  ctx.stop(s);
  assert.equal(s.enabled, false);
  assert.equal(s.controller.aborted, true);
  assert.equal(present.classList['xgl-present'], false);
  assert.equal(present.dataset.xgHide, undefined);
  assert.equal(present.dataset.xglStatus, undefined);
  assert.equal(present.media.attrs.title, undefined);
  assert.equal(s.hideBadge.textContent, '0');
  assert.equal(s.icon.hidden, false);
  assert.equal(s.ring.hidden, true);
  assert.equal(s.label.textContent, 'Check local files');
});
