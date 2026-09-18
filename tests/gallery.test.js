const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'x-gallery-mode.user.js'), 'utf8');
function section(start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from);
  assert.ok(from >= 0 && to > from);
  return source.slice(from, to);
}

// Execute the actual userscript parser and Gallery class without bootstrapping X's DOM.
function harness(pages = [], sort = 'popular', sourceChoice = 'auto') {
  const calls = [];
  const videos = [];
  const nodes = [];
  const images = [];
  const cachedImages = new Set();
  const context = vm.createContext({
    settings: { sort, source: sourceChoice }, MAX_EMPTY_PAGES: 6, clearInterval,
    clamp: (n, min, max) => Math.min(max, Math.max(min, n)), DEFAULT_SETTINGS: { columns: 4, volume: 0.5 },
    VARIANT_RANK: { small: 0, medium: 1, large: 2, orig: 3 }, mediaUrl: (m, v) => `${m.base}?format=${m.ext}&name=${v}`,
    Image: class {
      constructor() { this.complete = false; this.naturalWidth = 0; images.push(this); }
      set src(value) { this._src = value; if (cachedImages.has(value)) { this.complete = true; this.naturalWidth = 100; } }
      get src() { return this._src; }
    },
    cachedImages,
    GRID_GAP: 4, COMPACT_BELOW: 140, NARROW_BELOW: 100, TINY_BELOW: 50,
    META_HEIGHT: 36, META_HEIGHT_COMPACT: 28,
    saveSettings() {},
    T: { error: 'Invalid response' },
    normalizeTweet: (result) => result?.legacy ? result : null,
    fetchTimelinePage: async (...args) => {
      calls.push(args);
      assert.ok(pages.length, 'Unexpected extra request');
      return context.parseTimeline(pages.shift());
    },
    el: (tag, className) => {
      if (tag !== 'video') {
        const node = { tag, className, hidden: false, children: [], style: {}, classList: { add() {}, remove() {}, toggle() {} },
          append(...items) { this.children.push(...items); }, remove() { this.removed = true; },
          addEventListener() {}, setAttribute() {}, getBoundingClientRect() { return { left: 0, width: 100 }; } };
        nodes.push(node);
        return node;
      }
      const video = {
        playCount: 0, pauseCount: 0, removed: false,
        addEventListener() {}, play() { this.playCount++; return Promise.resolve(); },
        pause() { this.pauseCount++; }, removeAttribute(name) { delete this[name]; },
        load() {}, remove() { this.removed = true; },
      };
      videos.push(video);
      return video;
    },
  });
  vm.runInContext(
    section('  class ApiError', '  const QueryIds') +
    section('  function parseTimeline(', '  // Splits a pbs.twimg.com URL') +
    section('  class Gallery', '  const gallery = new Gallery();') +
    '\nglobalThis.Gallery = Gallery; globalThis.ApiStatus = ApiStatus;', context);
  const gallery = Object.create(context.Gallery.prototype);
  Object.assign(gallery, {
    isOpen: true, user: { id: 'u' }, session: 1, source: null,
    cursor: null, loading: false, ended: false, paused: false, emptyPages: 0,
    lightboxIndex: -1, sentinelVisible: false, status: { dataset: {} }, added: [], items: [],
    setStatus(state) { this.status.dataset.state = state; },
    addTweets(tweets) { this.added.push(...tweets); this.items.push(...tweets); return tweets.length; },
    showError(error) { this.error = error; this.setStatus('error'); },
  });
  return { gallery, calls, videos, nodes, images, cachedImages, parse: context.parseTimeline, apiStatus: context.ApiStatus, settings: context.settings };
}

function page(cursor, tweets = []) {
  const entries = tweets.map((result) => ({ content: { itemContent: { tweet_results: { result } } } }));
  if (cursor) entries.push({ content: { cursorType: 'Bottom', value: cursor } });
  return { data: { user: { result: { timeline: { timeline: {
    instructions: [{ type: 'TimelineAddEntries', entries }],
  } } } } } };
}

test('empty intermediate page keeps the cursor and reaches later posts', async () => {
  const { gallery: g, calls } = harness([page('c1'), page(null, [{ legacy: {}, id: 'later' }])]);
  await g.loadMore();
  assert.equal(g.ended, false);
  assert.equal(g.cursor, 'c1');
  await g.loadMore();
  assert.equal(calls[1][3], 'c1');
  assert.equal(g.added[0].id, 'later');
  assert.equal(g.ended, true);
});

test('first empty media page with a cursor immediately falls back as originally implemented', async () => {
  const { gallery: g, calls } = harness([page('c1'), page(null, [{ legacy: {} }])], 'recent');
  await g.loadMore();
  assert.equal(g.source, 'originals');
  assert.equal(calls.length, 2);
  assert.equal(calls[1][0], 'recent');
  assert.equal(calls[1][1], 'originals');
  assert.equal(calls[1][3], null);
  assert.equal(g.added.length, 1);
});

test('empty first media page without a cursor still falls back to originals', async () => {
  const { gallery: g, calls } = harness([page(null), page(null, [{ legacy: {} }])], 'recent');
  await g.loadMore();
  assert.deepEqual(calls.map((args) => args[1]), ['media', 'originals']);
  assert.equal(g.added.length, 1);
});

test('Most recent with posts keeps using UserMedia across pages', async () => {
  const { gallery: g, calls } = harness([
    page('media-next', [{ legacy: {}, id: 'first' }]),
    page(null, [{ legacy: {}, id: 'second' }]),
  ], 'recent');
  await g.loadMore();
  await g.loadMore();
  assert.deepEqual(calls.map((args) => args[1]), ['media', 'media']);
  assert.equal(calls[1][3], 'media-next');
  assert.equal(g.added.length, 2);
});

test('Popular always starts with originals', async () => {
  const { gallery: g, calls } = harness([page('c1'), page(null, [{ legacy: {} }])]);
  await g.loadMore();
  await g.loadMore();
  assert.deepEqual(calls.map((args) => args[1]), ['originals', 'originals']);
  assert.equal(calls[0][0], 'popular');
  assert.equal(g.added.length, 1);
});

test('explicit Media does not fall back on an empty first page', async () => {
  for (const cursor of [null, 'next']) {
    const { gallery: g, calls } = harness([page(cursor)], 'recent', 'media');
    await g.loadMore();
    assert.equal(calls.length, 1);
    assert.equal(calls[0][1], 'media');
    assert.equal(g.source, 'media');
    assert.equal(g.cursor, cursor);
    assert.equal(g.ended, cursor === null);
  }
});

test('explicit Posts uses originals for either sort', async () => {
  for (const sort of ['recent', 'popular']) {
    const { gallery: g, calls } = harness([page(null, [{ legacy: {} }])], sort, 'originals');
    await g.loadMore();
    assert.equal(calls[0][0], sort);
    assert.equal(calls[0][1], 'originals');
  }
});

test('changing source resets pagination and forces chronological order for Media', () => {
  const { gallery: g, settings } = harness([], 'popular', 'originals');
  g.source = 'originals'; g.cursor = 'old-cursor'; g.ended = true;
  g.root = { scrollTop: 123 }; g.grid = { innerHTML: 'old cards', style: {} };
  g.toggleSourceMenu = g.renderSourceButton = g.toggleMenu = g.renderSortButton = g.renderHeading = g.renderDupButton = () => {};
  let loads = 0;
  g.loadMore = () => {
    loads++;
    assert.equal(g.cursor, null);
    assert.equal(g.source, null);
    assert.equal(g.ended, false);
  };
  const session = g.session;
  g.setSource('media');
  assert.equal(settings.source, 'media');
  assert.equal(settings.sort, 'recent');
  assert.equal(g.session, session + 1);
  assert.equal(g.grid.innerHTML, '');
  assert.equal(g.root.scrollTop, 0);
  assert.equal(loads, 1);
  g.setSort('popular');
  assert.equal(settings.sort, 'recent');
  assert.equal(loads, 1);
  g.setSource('originals');
  g.setSort('popular');
  assert.equal(settings.source, 'originals');
  assert.equal(settings.sort, 'popular');
  assert.equal(loads, 3);
});

function mediaItems(postId, dimensions) {
  const media = dimensions.map(([w, h, kind = 'photo'], i) => ({ w, h, kind, index: i + 1 }));
  const tweet = { id: postId, media };
  return media.map((m, i) => ({ id: `${postId}:${i}`, tweet, media: m }));
}

test('vertical heuristic collapses only multi-media posts whose every attachment is tall', () => {
  const { gallery: g, settings } = harness();
  settings.multiMedia = 'vertical';
  const tall = mediaItems('tall', [[2327, 4096], [2327, 4096], [2327, 4096]]);
  const mixed = mediaItems('mixed', [[600, 1000], [1000, 600]]);
  const square = mediaItems('square', [[1000, 1000], [1000, 1000]]);
  const single = mediaItems('single', [[600, 1000]]);
  const stacks = g.cardStacks([...tall, ...mixed, ...square, ...single]);
  assert.deepEqual(Array.from(stacks, (stack) => stack.length), [3, 1, 1, 1, 1, 1]);
  assert.deepEqual(Array.from(stacks[0]), tall);
});

test('all modes preserve every visible attachment, including mixed photos and videos', () => {
  const { gallery: g, settings } = harness();
  const items = [...mediaItems('a', [[1000, 600], [600, 1000, 'video']]), ...mediaItems('b', [[800, 800]])];
  for (const [mode, sizes] of [['all', [1, 1, 1]], ['collapse', [2, 1]]]) {
    settings.multiMedia = mode;
    const stacks = g.cardStacks(items);
    assert.deepEqual(Array.from(stacks, (stack) => stack.length), sizes);
    assert.deepEqual(Array.from(stacks.flat()), items);
  }
});

test('collapsed layout keeps one fixed-size slot and every slide in lightbox order', () => {
  const { gallery: g, settings } = harness();
  Object.assign(settings, { multiMedia: 'collapse', columns: 1, layout: 'masonry' });
  const items = mediaItems('a', [[600, 1000], [1000, 600, 'video'], [800, 800]]);
  const styles = () => ({ setProperty(key, value) { this[key] = value; } });
  for (const item of items) {
    item.el = { hidden: false, classList: { toggle() {} }, style: styles() };
    item.nav = [{ hidden: true }, { hidden: true }];
  }
  g.items = items;
  g.root = { classList: { toggle() {} } };
  g.grid = { clientWidth: 300, style: {} };
  g.cardSelections = new Map(); g.groupHeaders = new Map();
  g.ensureVariant = () => {};
  g.layout();
  assert.deepEqual(items.map((it) => it.el.hidden), [false, true, true]);
  const height = g.grid.style.height;
  assert.deepEqual(Array.from(g.visibleItems()), items);
  g.cardSelections.set('a', items[1].id);
  g.layout();
  assert.deepEqual(items.map((it) => it.el.hidden), [true, false, true]);
  assert.equal(g.grid.style.height, height);
  assert.equal(items[1].el.style['--xg-img-h'], '500px');
  assert.deepEqual(Array.from(g.visibleItems()), items);
  settings.showVideos = false;
  g.layout();
  assert.deepEqual(items.map((it) => it.el.hidden), [false, true, true]);
  assert.deepEqual(Array.from(g.visibleItems()), [items[0], items[2]]);
  settings.multiMedia = 'all';
  g.layout();
  assert.deepEqual(items.map((it) => it.el.hidden), [false, true, false]);
  assert.ok(items[0].nav.every((button) => button.hidden));
});

test('switching multi-media mode only relayouts existing media without fetching', () => {
  const { gallery: g, settings, calls } = harness();
  settings.multiMedia = 'all';
  let layouts = 0;
  g.renderMultiButton = () => {};
  g.layout = () => layouts++;
  g.setMultiMedia('collapse');
  assert.equal(settings.multiMedia, 'collapse');
  assert.equal(layouts, 1);
  assert.equal(calls.length, 0);
});

test('empty stretch after collected media retains UserMedia and its cursor', async () => {
  const { gallery: g, calls } = harness([
    page('first', [{ legacy: {} }]),
    ...Array.from({ length: 6 }, (_, i) => page(`media-${i}`)),
  ], 'recent');
  for (let i = 0; i < 7; i++) await g.loadMore();
  assert.equal(calls.length, 7);
  assert.equal(g.source, 'media');
  assert.equal(g.cursor, 'media-5');
  assert.equal(g.paused, true);
  assert.equal(g.ended, false);
  g.maybeLoad();
  assert.equal(calls.length, 7, 'Automatic loading must stop while Load more is shown');
});

test('six empty pages with advancing cursors pause without claiming the end', async () => {
  const { gallery: g } = harness(Array.from({ length: 6 }, (_, i) => page(`c${i}`)));
  for (let i = 0; i < 6; i++) await g.loadMore();
  assert.equal(g.ended, false);
  assert.equal(g.paused, true);
  assert.equal(g.status.dataset.state, 'more');
});

test('missing timeline and malformed instructions are errors', () => {
  const { parse } = harness();
  for (const response of [null, {}, { data: { user: { result: {} } } },
    { data: { user: { result: { timeline: { timeline: { instructions: {} } } } } } }]) {
    assert.throws(() => parse(response), /Invalid response/);
  }
});

test('partial GraphQL errors are not treated as end of feed or silently skipped', () => {
  const { parse } = harness();
  const response = page('next', [{ legacy: {} }]);
  response.errors = [{ message: 'Temporarily unavailable' }];
  assert.throws(() => parse(response), /Temporarily unavailable/);
});

test('failed page preserves the previous cursor and can be retried', async () => {
  const { gallery: g, calls } = harness([{}, page(null, [{ legacy: {} }])]);
  g.cursor = 'previous';
  await g.loadMore();
  assert.equal(g.status.dataset.state, 'error');
  assert.equal(g.ended, false);
  assert.equal(g.cursor, 'previous');
  await g.loadMore();
  assert.equal(calls[1][3], 'previous');
  assert.equal(g.added.length, 1);
});

test('invalid first media response does not trigger a fallback', async () => {
  const { gallery: g, calls } = harness([{}], 'recent');
  await g.loadMore();
  assert.equal(g.status.dataset.state, 'error');
  assert.equal(calls.length, 1);
  assert.equal(g.source, null);
});

test('valid empty timeline and timeline_v2 remain supported', () => {
  const { parse } = harness();
  assert.equal(parse(page(null)).cursor, null);
  const response = page('next');
  const result = response.data.user.result;
  result.timeline_v2 = result.timeline;
  delete result.timeline;
  assert.equal(parse(response).cursor, 'next');
});

test('video hover resumes after lightbox close and stops on preview cleanup', () => {
  const { gallery: g, videos } = harness();
  g.lightboxIndex = 0;
  g.lb = { remove() {}, querySelector() { return null; } };
  const item = { el: { hidden: false }, img: { src: 'poster.jpg' }, media: { videoUrl: 'video.mp4' } };
  const link = { insertBefore() {}, append(node) { this.seek = node; } };
  g.startPreview(item, link);
  assert.equal(videos.length, 0);
  g.closeLightbox();
  assert.ok(g.lb, 'Lightbox DOM remains cached for reuse');
  g.startPreview(item, link);
  assert.equal(videos.length, 1);
  assert.equal(videos[0].playCount, 1);
  assert.equal(videos[0].muted, true);
  assert.equal(link.seek.className, 'xg-seek');
  assert.equal(link.seek.hidden, true, 'Seek bar shows up only once playback starts');
  g.stopPreview();
  assert.equal(videos[0].pauseCount, 1);
  assert.equal(videos[0].removed, true);
  assert.equal(link.seek.removed, true);
  assert.equal(g.preview, null);
});

test('sound is off by default; the toggle and the volume level apply to a running preview, GIFs stay silent', () => {
  const { gallery: g, videos, settings } = harness();
  g.renderSoundButton = () => {};
  const link = { insertBefore() {}, append() {} };
  const video = { el: { hidden: false }, img: { src: 'poster.jpg' }, media: { videoUrl: 'video.mp4', kind: 'video' } };
  g.startPreview(video, link);
  assert.equal(videos[0].muted, true);
  g.setSound(true);
  assert.equal(settings.sound, true);
  assert.equal(settings.volume, 0.5, 'unmuting without a stored level uses the default');
  assert.equal(videos[0].muted, false);
  assert.equal(videos[0].volume, 0.5);
  g.setVolume(0.3);
  assert.equal(videos[0].volume, 0.3);
  assert.equal(videos[0].muted, false);
  g.setVolume(0);
  assert.equal(settings.sound, false, 'slider at zero mutes');
  assert.equal(videos[0].muted, true);
  g.setVolume(0.8);
  assert.equal(settings.sound, true);
  assert.equal(videos[0].muted, false);
  g.setSound(false);
  assert.equal(videos[0].muted, true);
  assert.equal(settings.volume, 0.8, 'muting keeps the level');
  g.stopPreview();
  settings.sound = true;
  g.startPreview({ ...video, media: { videoUrl: 'loop.mp4', kind: 'gif' } }, link);
  assert.equal(videos[1].muted, true);
  g.startPreview(video, link);
  assert.equal(videos[2].muted, false);
  assert.equal(videos[2].volume, 0.8);
});

test('lightbox paints the cached grid variant first and swaps in the large one when it loads', () => {
  const { gallery: g, images, cachedImages } = harness();
  const spinner = { hidden: true };
  g.lb = { querySelector: (selector) => (selector === '.xg-lb-loader' ? spinner : null), remove() {} };
  const base = 'https://pbs.twimg.com/media/A';
  const media = { base, ext: 'jpg', kind: 'photo' };
  const item = { media, variant: 'small', img: { currentSrc: `${base}?format=jpg&name=small` } };
  const img = { src: '', complete: true, naturalWidth: 100 };
  g.lightboxIndex = 0;
  g.showLightboxPhoto(item, img);
  assert.equal(img.src, `${base}?format=jpg&name=small`, 'the cached grid image is shown immediately');
  assert.equal(images.length, 1);
  assert.equal(images[0].src, `${base}?format=jpg&name=large`);
  assert.equal(spinner.hidden, false, 'spinner while the large variant is pending');
  g.onLightboxImageSettled(img);
  assert.equal(spinner.hidden, false, 'the low-res load event must not hide the spinner');
  images[0].onload();
  assert.equal(img.src, `${base}?format=jpg&name=large`);
  assert.equal(spinner.hidden, true);
  // A large variant already in the cache (preloaded neighbour) skips the low-res step and the spinner.
  cachedImages.add('https://pbs.twimg.com/media/C?format=jpg&name=large');
  g.showLightboxPhoto({ ...item, media: { ...media, base: 'https://pbs.twimg.com/media/C' }, img: { currentSrc: 'https://pbs.twimg.com/media/C?format=jpg&name=small' } }, img);
  assert.equal(img.src, 'https://pbs.twimg.com/media/C?format=jpg&name=large');
  assert.equal(spinner.hidden, true);
  // Flipping on before the large variant arrives: the stale load must not overwrite the current photo.
  const other = { media: { ...media, base: 'https://pbs.twimg.com/media/B' }, variant: 'small', img: { currentSrc: 'https://pbs.twimg.com/media/B?format=jpg&name=small' } };
  g.showLightboxPhoto(item, img);
  g.showLightboxPhoto(other, img);
  images[images.length - 2].onload();
  assert.equal(img.src, 'https://pbs.twimg.com/media/B?format=jpg&name=small', 'stale load ignored');
  assert.equal(spinner.hidden, false);
  images[images.length - 1].onload();
  assert.equal(img.src, 'https://pbs.twimg.com/media/B?format=jpg&name=large');
  assert.equal(spinner.hidden, true);
  // A failed large load just drops the spinner and keeps the low-res photo.
  g.showLightboxPhoto(item, img);
  images[images.length - 1].onerror();
  assert.equal(img.src, `${base}?format=jpg&name=small`);
  assert.equal(spinner.hidden, true);
  // A closed lightbox ignores late loads.
  g.showLightboxPhoto(item, img);
  g.closeLightbox();
  images[images.length - 1].onload();
  assert.equal(img.src, `${base}?format=jpg&name=small`);
  assert.equal(spinner.hidden, true);
  // The grid already holds the large or original variant: use it directly, no extra request.
  g.lightboxIndex = 0;
  const before = images.length;
  g.showLightboxPhoto({ ...item, variant: 'orig', img: { currentSrc: `${base}?format=jpg&name=orig` } }, img);
  assert.equal(img.src, `${base}?format=jpg&name=orig`);
  assert.equal(images.length, before);
  assert.equal(spinner.hidden, true);
});

test('downloads always take the original: name=orig in the stored format, highest-bitrate mp4 for videos', () => {
  const ctx = vm.createContext({ fileDate: () => '20260819' });
  vm.runInContext(section('  const VARIANTS = ', '  function pickVariant(') + section('  function parseMediaUrl(', '  function normalizeTweet(')
    + section('  function downloadTarget(', '  async function downloadItem(') + '\nObject.assign(globalThis, { downloadTarget, normalizeMedia });', ctx);
  const tweet = { id: '1', screenName: 'Annu_art_', createdAt: new Date() };
  const png = ctx.normalizeMedia({ media_key: '3_1', type: 'photo', media_url_https: 'https://pbs.twimg.com/media/F-ti3R5aAAAr997.png', original_info: { width: 3000, height: 4000 } }, 1);
  const photo = ctx.downloadTarget({ tweet, media: png });
  assert.equal(photo.url, 'https://pbs.twimg.com/media/F-ti3R5aAAAr997?format=png&name=orig');
  assert.equal(photo.name, 'Annu_art__20260819_1_1.png');
  const jpg = ctx.normalizeMedia({ media_key: '3_2', type: 'photo', media_url_https: 'https://pbs.twimg.com/media/ABC.jpg' }, 2);
  assert.equal(ctx.downloadTarget({ tweet, media: jpg }).url, 'https://pbs.twimg.com/media/ABC?format=jpg&name=orig');
  const video = ctx.normalizeMedia({ media_key: '7_3', type: 'video', media_url_https: 'https://pbs.twimg.com/ext_tw_video_thumb/1/pu/img/poster.jpg',
    video_info: { duration_millis: 63000, aspect_ratio: [16, 9], variants: [
      { content_type: 'application/x-mpegURL', url: 'https://video.twimg.com/ext_tw_video/1/pu/pl/list.m3u8' },
      { content_type: 'video/mp4', bitrate: 832000, url: 'https://video.twimg.com/ext_tw_video/1/pu/vid/avc1/640x360/low.mp4' },
      { content_type: 'video/mp4', bitrate: 2176000, url: 'https://video.twimg.com/ext_tw_video/1/pu/vid/avc1/1280x720/best.mp4?tag=12' },
      { content_type: 'video/mp4', bitrate: 256000, url: 'https://video.twimg.com/ext_tw_video/1/pu/vid/avc1/320x180/tiny.mp4' },
    ] } }, 3);
  const clip = ctx.downloadTarget({ tweet, media: video });
  assert.equal(clip.url, 'https://video.twimg.com/ext_tw_video/1/pu/vid/avc1/1280x720/best.mp4?tag=12');
  assert.equal(clip.name, 'Annu_art__20260819_1_3.mp4');
  for (const target of [photo, clip]) assert.doesNotMatch(target.url, /name=(small|medium|large|thumb|900x900|4096x4096)/);
});

test('VERSION and UPDATED agree with @version and the newest changelog entry', () => {
  const version = source.match(/^\/\/ @version\s+(\S+)$/m)[1];
  const entry = source.match(/\n  Changelog\n\n  (\d+\.\d+\.\d+) — (\d{4}-\d{2}-\d{2})\n/);
  assert.ok(entry, 'changelog starts with a dated version entry');
  assert.equal(entry[1], version, 'newest changelog entry matches @version');
  assert.equal(source.match(/^  const VERSION = '([^']+)';$/m)[1], version, 'VERSION constant matches @version');
  assert.equal(source.match(/^  const UPDATED = '([^']+)';$/m)[1], entry[2], 'UPDATED constant matches the newest changelog date');
  assert.match(source.match(/^\/\/ @icon\s+(\S+)$/m)[1], /^data:image\/svg\+xml;base64,[A-Za-z0-9+/=]+$/, 'the script icon is the embedded logo');
});

test('search links point IQDB at the large variant and open in a background tab', () => {
  const opened = [];
  const ctx = vm.createContext({
    GM: { openInTab: (url, options) => opened.push([url, options]) },
    window: { open() { throw new Error('GM_openInTab must be preferred'); } },
  });
  vm.runInContext(section('  const VARIANTS = ', '  function pickVariant(') + section('  const SEARCH_URL', '  /* ═')
    + '\nObject.assign(globalThis, { searchUrl, openInBackground });', ctx);
  const media = { base: 'https://pbs.twimg.com/media/F-ti3R5aAAAr997', ext: 'jpg', kind: 'photo' };
  const url = ctx.searchUrl(media);
  assert.equal(url, 'https://iqdb.org/?url=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FF-ti3R5aAAAr997%3Fformat%3Djpg%26name%3Dlarge');
  ctx.openInBackground(url);
  // Objects come from another vm realm, so compare by value rather than by prototype.
  assert.equal(JSON.stringify(opened), JSON.stringify([[url, { active: false, insert: true, setParent: true }]]));
  const fallback = [];
  ctx.GM.openInTab = null;
  ctx.window.open = (...args) => fallback.push(args);
  ctx.openInBackground(url);
  assert.equal(JSON.stringify(fallback), JSON.stringify([[url, '_blank', 'noopener']]));
});

test('cards flagged by a companion via data-xg-hide leave the layout and the lightbox order', () => {
  const { gallery: g, settings } = harness();
  Object.assign(settings, { multiMedia: 'all', columns: 2, layout: 'masonry' });
  const items = [...mediaItems('a', [[1000, 1000]]), ...mediaItems('b', [[1000, 1000]])];
  for (const item of items) {
    item.el = { hidden: false, dataset: {}, classList: { toggle() {} }, style: { setProperty() {} } };
    item.nav = [];
  }
  g.items = items;
  g.root = { classList: { toggle() {} } };
  g.grid = { clientWidth: 400, style: {} };
  g.cardSelections = new Map(); g.groupHeaders = new Map();
  g.ensureVariant = () => {};
  g.layout();
  assert.deepEqual(items.map((it) => it.el.hidden), [false, false]);
  items[0].el.dataset.xgHide = 'local';
  g.layout();
  assert.deepEqual(items.map((it) => it.el.hidden), [true, false]);
  assert.deepEqual(Array.from(g.visibleItems()), [items[1]]);
  delete items[0].el.dataset.xgHide;
  g.layout();
  assert.deepEqual(items.map((it) => it.el.hidden), [false, false]);
  assert.deepEqual(Array.from(g.visibleItems()), items);
});

test('replies are recognised by in_reply_to_status_id_str, with conversation_id_str as the fallback', () => {
  const ctx = vm.createContext({ decodeEntities: (text) => text });
  vm.runInContext(section('  function parseMediaUrl(', '  function normalizeTweet(')
    + section('  function normalizeTweet(', '  /* ═') + '\nglobalThis.normalizeTweet = normalizeTweet;', ctx);
  const tweet = (legacy) => ctx.normalizeTweet({ rest_id: 'p1', legacy: { created_at: 'Wed Sep 16 12:00:00 +0000 2026', user_id_str: 'author', full_text: '', ...legacy } });

  const original = tweet({ conversation_id_str: 'p1' });
  assert.equal(original.isReply, false);
  assert.equal(original.replyToUserId, null);

  const toSomebody = tweet({ conversation_id_str: 'root', in_reply_to_status_id_str: 'root', in_reply_to_user_id_str: 'somebody' });
  assert.equal(toSomebody.isReply, true);
  assert.equal(toSomebody.replyToUserId, 'somebody');

  const ownThread = tweet({ conversation_id_str: 'root', in_reply_to_status_id_str: 'root', in_reply_to_user_id_str: 'author' });
  assert.equal(ownThread.isReply, true);
  assert.equal(ownThread.replyToUserId, 'author');

  // Should X stop sending in_reply_to_*, a differing conversation id still marks the post as a reply.
  assert.equal(tweet({ conversation_id_str: 'root' }).isReply, true);
});

test('the replies filter drops answers to other people, and own threads as well in "Hide all"', () => {
  const { gallery: g, settings } = harness();
  Object.assign(settings, { multiMedia: 'all', columns: 3, layout: 'masonry', replies: 'all' });
  const post = mediaItems('post', [[1000, 1000]]);
  const ownThread = mediaItems('own', [[1000, 1000]]);
  const toSomebody = mediaItems('other', [[1000, 1000]]);
  Object.assign(post[0].tweet, { userId: 'author' });
  Object.assign(ownThread[0].tweet, { userId: 'author', isReply: true, replyToUserId: 'author' });
  Object.assign(toSomebody[0].tweet, { userId: 'author', isReply: true, replyToUserId: 'somebody' });
  const items = [...post, ...ownThread, ...toSomebody];
  for (const item of items) {
    item.el = { hidden: false, dataset: {}, classList: { toggle() {} }, style: { setProperty() {} } };
    item.nav = [];
  }
  g.items = items;
  g.root = { classList: { toggle() {} } };
  g.grid = { clientWidth: 600, style: {} };
  g.cardSelections = new Map(); g.groupHeaders = new Map();
  g.ensureVariant = () => {};
  g.layout();
  assert.deepEqual(items.map((it) => it.el.hidden), [false, false, false]);
  settings.replies = 'threads';
  g.layout();
  assert.deepEqual(items.map((it) => it.el.hidden), [false, false, true]);
  assert.deepEqual(Array.from(g.visibleItems()), [post[0], ownThread[0]]);
  settings.replies = 'none';
  g.layout();
  assert.deepEqual(items.map((it) => it.el.hidden), [false, true, true]);
  assert.deepEqual(Array.from(g.visibleItems()), [post[0]]);
  settings.replies = 'all';
  g.layout();
  assert.deepEqual(items.map((it) => it.el.hidden), [false, false, false]);
});

test('switching the replies mode only relayouts existing media without fetching', () => {
  const { gallery: g, settings, calls } = harness();
  settings.replies = 'all';
  let layouts = 0;
  g.renderRepliesButton = () => {};
  g.renderHeading = () => {};
  g.layout = () => layouts++;
  g.setReplies('threads');
  assert.equal(settings.replies, 'threads');
  assert.equal(layouts, 1);
  assert.equal(calls.length, 0);
});

test('API status captures 429 headers and replaces them on the next response', () => {
  const { apiStatus } = harness();
  let updates = 0;
  apiStatus.onChange = () => updates++;
  const reset = String(Math.floor(Date.now() / 1000) + 600);
  const data = apiStatus.record('UserMedia', {
    status: 429, headers: new Headers({
      'x-rate-limit-limit': '100', 'x-rate-limit-remaining': '0',
      'x-rate-limit-reset': reset, 'retry-after': '120',
    }),
  });
  assert.equal(data.limit, '100');
  assert.equal(data.remaining, '0');
  assert.equal(data.retryAfter, '120');
  assert.equal(data.resetAt, Number(reset) * 1000);
  assert.equal(data.retryAt, data.resetAt);
  apiStatus.record('UserByScreenName', { status: 200, headers: new Headers() });
  assert.equal(apiStatus.last.operation, 'UserByScreenName');
  assert.equal(apiStatus.last.status, 200);
  assert.equal(apiStatus.last.limit, null);
  assert.equal(apiStatus.last.remaining, null);
  assert.equal(apiStatus.last.resetAt, null);
  assert.equal(apiStatus.last.retryAfter, null);
  assert.equal(apiStatus.last.retryAt, null);
  assert.equal(updates, 2);
});

test('API status reports the same 60-second retry fallback for missing or invalid reset', () => {
  const { apiStatus } = harness();
  for (const reset of [null, 'invalid', '0', '1']) {
    const headers = new Headers({ 'retry-after': 'Wed, 09 Sep 2026 12:00:00 GMT' });
    if (reset !== null) headers.set('x-rate-limit-reset', reset);
    const data = apiStatus.record('UserMedia', { status: 429, headers });
    assert.equal(data.retryAt - data.receivedAt, 60_000);
    assert.equal(data.retryAfter, 'Wed, 09 Sep 2026 12:00:00 GMT');
  }
});
