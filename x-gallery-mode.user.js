// ==UserScript==
// @name         X Gallery Mode
// @name:ru      X Галерея профиля
// @namespace    imouto.x-gallery-mode
// @version      1.10.2
// @description  Gallery tab to X/Twitter profiles: uncropped images/videos in a fullscreen masonry grid, highly customizable, downloads, deduplication, Popular/Most recent
// @description:ru  Вкладка «Gallery» в профилях X/Twitter: изображения целиком без обрезки, любое число колонок, на всю ширину экрана, скачивание, открытие поста, лайки, скрытие дубликатов, фильтр ответов, без репостов, сортировка «популярные / новые».
// @author       ImoutoChan
// @license      Copyright ImoutoChan
// @homepageURL  https://github.com/ImoutoChan/ImoutoXGalleryMode
// @supportURL   https://github.com/ImoutoChan/ImoutoXGalleryMode/issues
// @updateURL    https://raw.githubusercontent.com/ImoutoChan/ImoutoXGalleryMode/master/x-gallery-mode.user.js
// @downloadURL  https://raw.githubusercontent.com/ImoutoChan/ImoutoXGalleryMode/master/x-gallery-mode.user.js
// @match        https://x.com/*
// @match        https://twitter.com/*
// @icon         data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMxLjM0IDI3LjI3Ij48ZGVmcz48c3R5bGU+LmR7ZmlsbDojZmZmO30uZXtmaWxsOiMyMzFmMjA7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJhIi8+PGcgaWQ9ImIiPjxnIGlkPSJjIj48Zz48cGF0aCBjbGFzcz0iZSIgZD0iTTE5Ljk2LC44MmgwYy0xLjY2LC42LTMuMjMsMS42LTQuNDQsMi44NmgwYy0uOTYtMS4yMy0yLjQyLTIuMi00LjA0LTIuODRoMEM2LjA2LTEuNjYtMS43NywxLjU4LC4zNiw5LjR2LjAzYy41NiwxLjc4LDEuODQsNC4yOCw0LjE3LDZ2MGgwYzMuMTksMi4zMywxMC4zMiw4LjksMTEuMDgsMTEuODNoMGMuODEtMy4yNyw2LjcyLTcuMjgsMTEuMDctMTEuNTZoMGMyLjA0LTIsMy43My00LjA4LDQuMzYtNi4yMUMzMi44MSwyLjQ3LDI2LjAzLTEuOTEsMTkuOTYsLjgyWiIvPjxwYXRoIGNsYXNzPSJkIiBkPSJNMTkuOTcsLjgyYy0xLjY3LC42LTMuMjMsMS42LTQuNDUsMi44Ni0uOTYtMS4yMi0yLjQxLTIuMi00LjA0LTIuODNDNi4wNS0xLjY3LTEuNzcsMS41OCwuMzYsOS40YzAsLjAxLDAsLjAyLDAsLjAyLC41NywxLjc4LDEuODUsNC4yOCw0LjE4LDYuMDEsMS41OSwxLjE3LDQuMTgsMy4zOSw2LjQ2LDUuNjksMi4yNywyLjMsNC4yNSw0LjY4LDQuNjMsNi4xNCwuNC0xLjY0LDIuMDgtMy40Niw0LjItNS40LDIuMTMtMS45NSw0LjctNC4wMiw2Ljg3LTYuMTYsMi4wNi0yLjAxLDMuNzMtNC4wOCw0LjM3LTYuMkMzMi44MSwyLjQ3LDI2LjA0LTEuOTEsMTkuOTcsLjgyWm0tLjMsMS41MmMuMTMsLjEsMS45NCwxLjg3LDMuMjIsNi44NS0uNjgsMS4wOC0yLjA2LDMuMTItMi43Niw0LjE1LDEuMzUtMi40Mi0zLjktOC42Ni0zLjktOC42NiwxLTEuMDUsMi4wNy0xLjgzLDMuNDQtMi4zM1ptLTcuNzcsLjA3YzEuMjksLjUyLDIuMTgsMS4xOSwyLjk0LDIuMTgsMCwwLTQuODQsNS4xNS00Ljg5LDcuNDItLjY3LTEuMDctMS4wOS0xLjUyLTEuNzEtMi43NiwuNTEtMS43NCwxLjk3LTUuNTUsMy42Ny02Ljg0Wm0tMS45Ni0uOTJjLS4zLC4xMi0yLjMsMS4wMS01LjQsMy4zNkMxLjc0LDYuOTksMS4zMiw3LjUsMS4yNCw3Ljc5LC40MiwyLjI3LDYuMjcsMCw5Ljk0LDEuNVpNMS44NCw5LjY5Yy4wOS0uMywuNTctMS44NCwzLjQzLTQsMy4yNy0yLjUsNS41MS0zLjU3LDUuNTktMy42LTEuODEsMS4zNy0zLjAzLDQuOTMtMy41OCw2Ljc5LS40MSwxLjA1LTEuNTgsMi43Mi0yLjE0LDUuMzYtMS45My0xLjQ0LTIuODItMy4wNi0zLjMtNC41NFptMTMuMTEsMTQuOTFjLS42MS0yLjQzLTguOTUtOS41MS04Ljk1LTkuNTEsLjU4LTIuNzIsMS4zLTMuMTQsMS43MS00LjM0LDIuNjEsNC43Nyw3LjEyLDkuNjgsNy4yNCwxMy44NFptLTQuMzQtMTEuMzVjLjA1LTIuMzYsNC45Mi03Ljg0LDQuOTItNy44NCwxLjc0LDIuNzUsMi42OSw0LjAyLDMuMyw1LjI5LDIuMjcsNC43OC0xLjYyLDQuMzctMi45NywxMi43LTEuMDItMy41Ny0zLjEyLTYuMTgtNS4yNC0xMC4xNVptNS45OCwxMS4xMWMxLjUyLTcuNTcsNC4yNy05Ljk3LDYuODItMTQuMjcsMS4wMywxLjcyLDEuNCwyLjk5LDEuODgsNS4zLTMuNTcsMy41NS04LjA1LDYuMjYtOC43LDguOTdabTkuNTctOS43N2MtLjQ3LTIuMzEtMS4wOC0zLjkxLTIuMTEtNS42NC0xLjItNC42NS0zLjA0LTYuNC0zLjM3LTYuNjgsMy4zNywxLjk1LDcuNzksNC4xMyw5LjA3LDcuMTctLjUyLDEuNzYtMS45MSwzLjQ5LTMuNTksNS4xNVptMy45Ni02LjQyYy0xLjI2LTIuOTktNS40OS00LjcxLTguODItNi42NCw0LjYyLTEuOTgsOS41NCwyLjA3LDguODIsNi42NFoiLz48cGF0aCBjbGFzcz0iZCIgZD0iTTE1LjMyLDYuMjRjMCwxLjM3LS44NywyLjY1LTEuMDYsMy4wMS0zLjIyLDQuNDgtLjYsNy4xMiwxLjA1LDExLjE5LDUuMDctOC44MSwyLjMxLTYuNTQsMC0xNC4yWm0uMDgsNy40OWMtLjQ4LC45Mi0uNjksMi4xNi0uNjYsMy4zNy0uOTMtMS45My0xLjczLTMuNTEtLjA1LTUuODgsLjEzLS4yNCwuNjktMS4wNywuNjktMS45NiwxLjM5LDQuNjEsMi45OCwzLjc3LC41OCw4LjE3LC4xMS0xLjM1LS4wOC0yLjc2LS41Ni0zLjdaIi8+PC9nPjwvZz48L2c+PC9zdmc+
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_download
// @grant        GM_openInTab
// @run-at       document-idle
// @noframes
// ==/UserScript==

/*
  Changelog

  1.10.2 — 2026-11-24
    • Restore the Gallery tab on profiles using the new X web layout.

  1.10.0 — 2026-11-24
    • Copy the full-size photo from the lightbox with Ctrl+C (Command+C on Mac) or the Copy button.

  1.9.0 — 2026-09-18
    • "Replies" menu in the header: "Show all" (default), "Own threads only" — replies addressed to other
      people leave the grid while the author's replies under their own posts stay — and "Hide all".
      The mode persists and switches without reloading the feed.
    • A reply is recognised by in_reply_to_status_id_str, with conversation_id_str as a fallback should X
      stop sending the field; the addressee comes from in_reply_to_user_id_str. Only the Media source
      carries replies to other people, Posts never returns them, but replies to one's own posts appear
      in both.

  1.8.2 — 2026-09-09
    • New logo: the heart mark as an embedded SVG, used for the script icon, the About button and the About
      dialog. Much smaller than the previous PNGs. The About button grew from 36 to 54 px; the API panel moved
      left to make room.
    • The header carries "@license Copyright ImoutoChan": all rights reserved, installing and using the
      script is allowed. Greasy Fork shows the line on the script page.

  1.8.1 — 2026-09-06
    • The About dialog no longer lists a license line.

  1.8.0 — 2026-09-06
    • Round logo button in the bottom-right corner, next to the API panel, with an "About this extension"
      tooltip. It opens a centred About dialog: version, date of the last update, license and links to the
      GitHub repository and its issues. The logo is embedded and also serves as the script icon.

  1.7.1 — 2026-09-06
    • Update and download URLs point at the GitHub repository (ImoutoChan/ImoutoXGalleryMode), so
      userscript managers pick up new versions on their own; homepage and support URLs added.

  1.7.0 — 2026-09-06
    • Header tools follow the profile name and wrap onto further lines only when they run out of room,
      so the first line is no longer left empty on the right.
    • The Sound pill opens a volume popover: a slider, a mute button and the level in per cent. The level
      applies to hover previews and to the lightbox player and is remembered; changes made in the player
      itself are picked up too.
    • "Search image" button on every card and in the lightbox: a reverse image search on IQDB opens in a
      background tab (GM_openInTab; a regular new tab when it is unavailable).
    • The lightbox shows the photo at once, using the variant already loaded for the grid, and swaps in
      the large one when it arrives instead of keeping the previous photo on screen.
    • Spinner in the lightbox while a sharper photo or a video is still loading (it only appears when the
      wait is noticeable, so cached images never blink).
    • Downloads are guaranteed to take the original: name=orig in the original format for photos and the
      highest-bitrate mp4 for videos and GIFs; resized variants are never used.

  1.6.0 — 2026-09-06
    • The header wraps its tools onto a second line when they do not fit in one.
    • Sound toggle in the header (off by default) applies to hover previews and to the lightbox player;
      muting or unmuting in the player itself is remembered.
    • Progress bar under a playing preview: click or drag it to seek.
    • Cards carrying the data-xg-hide attribute are excluded from the layout — an extension point for
      companion scripts (used by the "Hide saved" button of the local file check).

  1.5.2 — 2026-09-06
    • DOM markers on the gallery and download URLs on cards for the separate local file check extension.

  1.5.1 — 2026-09-06
    • Translucent play badge centred on videos and GIFs; it fades out once the preview starts.

  1.5.0 — 2026-09-06
    • Multiple media per post: separate cards, a carousel for vertical sets, or a carousel for every set.
      Switching does not reload the feed; every attachment stays reachable in the card and the lightbox.

  1.4.1 — 2026-09-06
    • The source is chosen through a menu styled like the rest of the gallery controls.
    • The API panel is collapsed by default; its header shows remaining / limit of requests.

  1.4.0 — 2026-09-06
    • Source selector: Auto (original behaviour), Media or Posts. An explicit choice never switches the
      source automatically. Media supports chronological order only.

  1.3.4 — 2026-09-06
    • Restored the original Most recent source selection: an empty first UserMedia page switches to
      UserOriginalsTimeline right away, whether or not a cursor is present.

  1.3.3 — 2026-09-06
    • A panel in the bottom-right corner shows the status and rate-limit headers of the last API response.

  1.3.2 — 2026-09-06
    • An empty page with a fresh cursor no longer ends loading or switches the source.
    • A missing timeline structure and GraphQL errors are shown as an error with a retry button.
    • Video previews start again after the lightbox is closed.

  1.3.1 — 2026-09-06
    • Videos and GIFs autoplay muted while the card is hovered; leaving the card stops playback and
      brings the poster back.

  1.3.0 — 2026-09-06
    • Videos and GIFs in the gallery: the grid shows a poster with a ▶ badge and the duration (or "GIF"),
      the lightbox has a player (GIFs loop silently), downloads take the best-bitrate mp4.
    • "Videos" toggle in the header (on by default) hides or shows videos and GIFs.
    • "Most recent" now uses UserMedia (photos + videos) instead of UserPhotoTimeline; the fallback to the
      chronological UserOriginalsTimeline for sensitive accounts is kept.
    • Duplicates are only searched among media of the same kind: a video poster is never folded into a
      photo of the same frame.
    • Counters in the header and in month headers say "media" instead of "photos".

  1.2.2 — 2026-09-06
    • Download file names now include the post date: <handle>_<YYYYMMDD>_<post id>_<photo index>.<ext>,
      e.g. Annu_art__20260819_2096226125081104526_1.jpg. The date is local, as shown in the gallery.

  1.2.1 — 2026-09-06
    • Fix: X returns an empty photo timeline for age-restricted (sensitive) accounts, so "Most recent"
      showed "No photos yet". An empty first page now falls back to the chronological
      UserOriginalsTimeline automatically (the same source "Popular" uses).

  1.2.0 — 2026-09-06
    • Two layouts with a header switch: "masonry" and "aligned rows" — every card in a row shares the
      height of the tallest one (capped at 1.5 × column width) and images fit inside.
    • "Group by month" toggle: month separators from newest to oldest, the current sort order inside a
      month. The lightbox follows the on-screen order.
    • Fix: display:flex overrode the hidden attribute — stale month headers and hidden duplicates stayed
      painted on top of cards.
    • The columns icon is now "bars"; toggle labels collapse to icons on windows narrower than 1280px.

  1.1.0 — 2026-09-06
    • Mouse wheel / touchpad flips photos in the lightbox (one notch = one photo, touchpad inertia is
      swallowed); the grid underneath does not scroll.

  1.0.0 — 2026-09-05
    • "Gallery" tab on profiles (a clone of the native tab), full-screen gallery across the whole window.
    • Uncropped masonry, any number of columns (1…∞), image quality picked for the column width and DPR.
    • Under each photo: likes, date, download original, open post; lightbox with arrows and stats.
    • Duplicate hiding (dHash + thumbnail correlation + media key); reposts are never shown.
    • Sort orders "Popular" (server-side, UserOriginalsTimeline + sortByMostLiked) and "Most recent"
      (UserPhotoTimeline); "Popular" by default.
    • Palette taken from the X theme (Lights out / Dim / Default + accent), en/ru interface, settings persist.
    • queryIds are read from X's main bundle with a cache and fallbacks; 429 rate limits are handled.
*/

(() => {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════════════
     Constants
     ═══════════════════════════════════════════════════════════════════════ */

  const BEARER = 'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';

  // Fallback query ids (verified 2026-09). The live ids are re-read from X's main bundle, see QueryIds.
  const DEFAULT_QUERY_IDS = {
    UserByScreenName: 'Gb-d6r0vxPOADdG62OEBpQ',
    UserMedia: 'VyudDWQnr9vJNw7GasFz2g',
    UserOriginalsTimeline: 'F3G579cN5xm0xa_j76q08Q',
  };

  const TIMELINE_FEATURES = {
    rweb_video_screen_enabled: false, rweb_cashtags_enabled: true,
    profile_label_improvements_pcf_label_in_post_enabled: true, responsive_web_profile_redirect_enabled: true,
    rweb_tipjar_consumption_enabled: false, verified_phone_label_enabled: false,
    creator_subscriptions_tweet_preview_api_enabled: true, responsive_web_graphql_timeline_navigation_enabled: true,
    premium_content_api_read_enabled: false, communities_web_enable_tweet_community_results_fetch: true,
    c9s_tweet_anatomy_moderator_badge_enabled: true, responsive_web_grok_analyze_button_fetch_trends_enabled: false,
    responsive_web_grok_analyze_post_followups_enabled: true, rweb_cashtags_composer_attachment_enabled: true,
    responsive_web_jetfuel_frame: true, responsive_web_grok_share_attachment_enabled: true,
    responsive_web_grok_annotations_enabled: true, articles_preview_enabled: true,
    responsive_web_edit_tweet_api_enabled: true, rweb_conversational_replies_downvote_enabled: false,
    graphql_is_translatable_rweb_tweet_is_translatable_enabled: true, view_counts_everywhere_api_enabled: true,
    longform_notetweets_consumption_enabled: true, responsive_web_twitter_article_tweet_consumption_enabled: true,
    content_disclosure_indicator_enabled: true, content_disclosure_ai_generated_indicator_enabled: true,
    responsive_web_grok_show_grok_translated_post: true, responsive_web_grok_analysis_button_from_backend: true,
    post_ctas_fetch_enabled: false, freedom_of_speech_not_reach_fetch_enabled: true, standardized_nudges_misinfo: true,
    tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
    longform_notetweets_rich_text_read_enabled: true, longform_notetweets_inline_media_enabled: false,
    responsive_web_grok_image_annotation_enabled: true, responsive_web_grok_imagine_annotation_enabled: true,
    responsive_web_grok_community_note_auto_translation_is_enabled: true, responsive_web_enhance_cards_enabled: false,
  };

  const USER_FEATURES = {
    hidden_profile_subscriptions_enabled: true, profile_label_improvements_pcf_label_in_post_enabled: true,
    responsive_web_profile_redirect_enabled: true, rweb_tipjar_consumption_enabled: false,
    verified_phone_label_enabled: false, subscriptions_verification_info_is_identity_verified_enabled: true,
    subscriptions_verification_info_verified_since_enabled: true, highlights_tweets_tab_ui_enabled: true,
    responsive_web_twitter_article_notes_tab_enabled: true, subscriptions_feature_can_gift_premium: true,
    creator_subscriptions_tweet_preview_api_enabled: true, responsive_web_graphql_timeline_navigation_enabled: true,
  };

  const PAGE_SIZE = 40;
  const MAX_EMPTY_PAGES = 6;      // consecutive pages without photos before auto-loading pauses
  const GRID_GAP = 4;
  const META_HEIGHT = 36;
  const META_HEIGHT_COMPACT = 28;
  const NARROW_BELOW = 235;       // column width (px) below which the date is hidden
  const COMPACT_BELOW = 150;      // … below which the footer shrinks
  const TINY_BELOW = 110;         // … below which the footer buttons move to the lightbox only
  const WHEEL_STEP = 60;          // accumulated wheel delta (px) that flips one photo in the lightbox
  const WHEEL_COOLDOWN = 220;     // ms to ignore wheel inertia after a flip
  const GROUP_HEADER_H = 60;      // month header height (px) when grouping by month
  const ROW_MAX_RATIO = 1.5;      // "aligned rows": cell image height is capped at this × column width

  // Duplicate detection thresholds (see Signature).
  const DUP_MAX_DHASH = 14;       // of 64 bits
  const DUP_MIN_NCC = 0.96;       // normalized cross-correlation on a 16x16 grayscale thumbnail
  const DUP_MAX_RATIO_DIFF = 0.05;

  const SETTINGS_KEY = 'xg.settings';
  const QUERY_IDS_KEY = 'xg.queryIds';
  const DEFAULT_SETTINGS = { columns: 4, sort: 'popular', source: 'auto', multiMedia: 'all', replies: 'all', hideDuplicates: true, layout: 'masonry', groupByMonth: false, showVideos: true, sound: false, volume: 0.5 };

  // Shown in the About dialog. VERSION and UPDATED must match @version and the newest changelog entry;
  // tests/gallery.test.js fails when they drift apart.
  const VERSION = '1.10.2';
  const UPDATED = '2026-11-24';
  const REPO_URL = 'https://github.com/ImoutoChan/ImoutoXGalleryMode';
  const LOGO = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMxLjM0IDI3LjI3Ij48ZGVmcz48c3R5bGU+LmR7ZmlsbDojZmZmO30uZXtmaWxsOiMyMzFmMjA7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJhIi8+PGcgaWQ9ImIiPjxnIGlkPSJjIj48Zz48cGF0aCBjbGFzcz0iZSIgZD0iTTE5Ljk2LC44MmgwYy0xLjY2LC42LTMuMjMsMS42LTQuNDQsMi44NmgwYy0uOTYtMS4yMy0yLjQyLTIuMi00LjA0LTIuODRoMEM2LjA2LTEuNjYtMS43NywxLjU4LC4zNiw5LjR2LjAzYy41NiwxLjc4LDEuODQsNC4yOCw0LjE3LDZ2MGgwYzMuMTksMi4zMywxMC4zMiw4LjksMTEuMDgsMTEuODNoMGMuODEtMy4yNyw2LjcyLTcuMjgsMTEuMDctMTEuNTZoMGMyLjA0LTIsMy43My00LjA4LDQuMzYtNi4yMUMzMi44MSwyLjQ3LDI2LjAzLTEuOTEsMTkuOTYsLjgyWiIvPjxwYXRoIGNsYXNzPSJkIiBkPSJNMTkuOTcsLjgyYy0xLjY3LC42LTMuMjMsMS42LTQuNDUsMi44Ni0uOTYtMS4yMi0yLjQxLTIuMi00LjA0LTIuODNDNi4wNS0xLjY3LTEuNzcsMS41OCwuMzYsOS40YzAsLjAxLDAsLjAyLDAsLjAyLC41NywxLjc4LDEuODUsNC4yOCw0LjE4LDYuMDEsMS41OSwxLjE3LDQuMTgsMy4zOSw2LjQ2LDUuNjksMi4yNywyLjMsNC4yNSw0LjY4LDQuNjMsNi4xNCwuNC0xLjY0LDIuMDgtMy40Niw0LjItNS40LDIuMTMtMS45NSw0LjctNC4wMiw2Ljg3LTYuMTYsMi4wNi0yLjAxLDMuNzMtNC4wOCw0LjM3LTYuMkMzMi44MSwyLjQ3LDI2LjA0LTEuOTEsMTkuOTcsLjgyWm0tLjMsMS41MmMuMTMsLjEsMS45NCwxLjg3LDMuMjIsNi44NS0uNjgsMS4wOC0yLjA2LDMuMTItMi43Niw0LjE1LDEuMzUtMi40Mi0zLjktOC42Ni0zLjktOC42NiwxLTEuMDUsMi4wNy0xLjgzLDMuNDQtMi4zM1ptLTcuNzcsLjA3YzEuMjksLjUyLDIuMTgsMS4xOSwyLjk0LDIuMTgsMCwwLTQuODQsNS4xNS00Ljg5LDcuNDItLjY3LTEuMDctMS4wOS0xLjUyLTEuNzEtMi43NiwuNTEtMS43NCwxLjk3LTUuNTUsMy42Ny02Ljg0Wm0tMS45Ni0uOTJjLS4zLC4xMi0yLjMsMS4wMS01LjQsMy4zNkMxLjc0LDYuOTksMS4zMiw3LjUsMS4yNCw3Ljc5LC40MiwyLjI3LDYuMjcsMCw5Ljk0LDEuNVpNMS44NCw5LjY5Yy4wOS0uMywuNTctMS44NCwzLjQzLTQsMy4yNy0yLjUsNS41MS0zLjU3LDUuNTktMy42LTEuODEsMS4zNy0zLjAzLDQuOTMtMy41OCw2Ljc5LS40MSwxLjA1LTEuNTgsMi43Mi0yLjE0LDUuMzYtMS45My0xLjQ0LTIuODItMy4wNi0zLjMtNC41NFptMTMuMTEsMTQuOTFjLS42MS0yLjQzLTguOTUtOS41MS04Ljk1LTkuNTEsLjU4LTIuNzIsMS4zLTMuMTQsMS43MS00LjM0LDIuNjEsNC43Nyw3LjEyLDkuNjgsNy4yNCwxMy44NFptLTQuMzQtMTEuMzVjLjA1LTIuMzYsNC45Mi03Ljg0LDQuOTItNy44NCwxLjc0LDIuNzUsMi42OSw0LjAyLDMuMyw1LjI5LDIuMjcsNC43OC0xLjYyLDQuMzctMi45NywxMi43LTEuMDItMy41Ny0zLjEyLTYuMTgtNS4yNC0xMC4xNVptNS45OCwxMS4xMWMxLjUyLTcuNTcsNC4yNy05Ljk3LDYuODItMTQuMjcsMS4wMywxLjcyLDEuNCwyLjk5LDEuODgsNS4zLTMuNTcsMy41NS04LjA1LDYuMjYtOC43LDguOTdabTkuNTctOS43N2MtLjQ3LTIuMzEtMS4wOC0zLjkxLTIuMTEtNS42NC0xLjItNC42NS0zLjA0LTYuNC0zLjM3LTYuNjgsMy4zNywxLjk1LDcuNzksNC4xMyw5LjA3LDcuMTctLjUyLDEuNzYtMS45MSwzLjQ5LTMuNTksNS4xNVptMy45Ni02LjQyYy0xLjI2LTIuOTktNS40OS00LjcxLTguODItNi42NCw0LjYyLTEuOTgsOS41NCwyLjA3LDguODIsNi42NFoiLz48cGF0aCBjbGFzcz0iZCIgZD0iTTE1LjMyLDYuMjRjMCwxLjM3LS44NywyLjY1LTEuMDYsMy4wMS0zLjIyLDQuNDgtLjYsNy4xMiwxLjA1LDExLjE5LDUuMDctOC44MSwyLjMxLTYuNTQsMC0xNC4yWm0uMDgsNy40OWMtLjQ4LC45Mi0uNjksMi4xNi0uNjYsMy4zNy0uOTMtMS45My0xLjczLTMuNTEtLjA1LTUuODgsLjEzLS4yNCwuNjktMS4wNywuNjktMS45NiwxLjM5LDQuNjEsMi45OCwzLjc3LC41OCw4LjE3LC4xMS0xLjM1LS4wOC0yLjc2LS41Ni0zLjdaIi8+PC9nPjwvZz48L2c+PC9zdmc+';

  /* ═══════════════════════════════════════════════════════════════════════
     i18n
     ═══════════════════════════════════════════════════════════════════════ */

  const LANG = (document.documentElement.lang || navigator.language || 'en').slice(0, 2).toLowerCase();
  const STRINGS = {
    en: {
      tab: 'Gallery', photos: 'media', posts: 'posts', videos: 'Videos', popular: 'Popular', recent: 'Most recent',
      sortBy: 'Sort by', columns: 'Columns', fewer: 'Fewer columns', more: 'More columns',
      hideDups: 'Hide duplicates', hidden: 'hidden', download: 'Download', open: 'Open post',
      copy: 'Copy', copying: 'Copying…', copied: 'Copied', copyFailed: 'Could not copy photo',
      loading: 'Loading…', end: 'You’ve seen it all', empty: 'No photos yet', retry: 'Retry',
      error: 'Something went wrong', rateLimited: 'X is rate limiting requests. Retrying in',
      loadMore: 'Load more', back: 'Back', close: 'Close', prev: 'Previous', next: 'Next',
      likes: 'Likes', reposts: 'Reposts', views: 'Views', loginRequired: 'Log in to X to use Gallery mode.',
      noReposts: 'Reposts are never shown in Gallery mode',
      layoutMasonry: 'Masonry', layoutRows: 'Aligned rows', groupByMonth: 'Group by month',
      apiStatus: 'Last API response', apiWaiting: 'No responses yet', apiReceived: 'Received',
      apiLimit: 'Request limit', apiRemaining: 'Remaining', apiReset: 'Limit resets',
      apiRetry: 'Scheduled retry', apiMissing: 'Not provided',
      source: 'Source', sourceAuto: 'Auto', sourceMedia: 'Media', sourcePosts: 'Posts',
      mediaRecentOnly: 'Media source supports Most recent only',
      multiMedia: 'Multiple media per post', multiAll: 'Show all separately', multiVertical: 'Collapse vertical sets', multiCollapse: 'Collapse all',
      replies: 'Replies', repliesAll: 'Show all', repliesThreads: 'Own threads only', repliesNone: 'Hide all',
      sound: 'Sound', soundOn: 'Sound on', soundOff: 'Muted', seek: 'Seek',
      volume: 'Volume', mute: 'Mute', unmute: 'Unmute', search: 'Search image',
      searchHint: 'Reverse image search on IQDB (opens in a background tab)',
      about: 'About this extension', aboutTagline: 'Every photo and video of a profile in one full-screen gallery.',
      version: 'Version', updated: 'Updated', github: 'GitHub repository', issues: 'Report an issue',
    },
    ru: {
      tab: 'Галерея', photos: 'медиа', posts: 'постов', videos: 'Видео', popular: 'Популярные', recent: 'Сначала новые',
      sortBy: 'Сортировка', columns: 'Колонки', fewer: 'Меньше колонок', more: 'Больше колонок',
      hideDups: 'Скрывать дубликаты', hidden: 'скрыто', download: 'Скачать', open: 'Открыть пост',
      copy: 'Скопировать', copying: 'Копирование…', copied: 'Скопировано', copyFailed: 'Не удалось скопировать фото',
      loading: 'Загрузка…', end: 'Это всё', empty: 'Фото пока нет', retry: 'Повторить',
      error: 'Что-то пошло не так', rateLimited: 'X ограничил частоту запросов. Повтор через',
      loadMore: 'Загрузить ещё', back: 'Назад', close: 'Закрыть', prev: 'Предыдущее', next: 'Следующее',
      likes: 'Лайки', reposts: 'Репосты', views: 'Просмотры', loginRequired: 'Войдите в X, чтобы использовать галерею.',
      noReposts: 'Репосты в галерее никогда не показываются',
      layoutMasonry: 'Плитка', layoutRows: 'Ровные ряды', groupByMonth: 'По месяцам',
      apiStatus: 'Последний ответ API', apiWaiting: 'Ответов пока нет', apiReceived: 'Получен',
      apiLimit: 'Лимит запросов', apiRemaining: 'Осталось', apiReset: 'Сброс лимита',
      apiRetry: 'Повтор назначен', apiMissing: 'Не передано',
      source: 'Источник', sourceAuto: 'Авто', sourceMedia: 'Медиа', sourcePosts: 'Посты',
      mediaRecentOnly: 'Для источника «Медиа» доступна только сортировка «Сначала новые»',
      multiMedia: 'Множество медиа в посте', multiAll: 'Показывать все отдельно', multiVertical: 'Схлопывать вертикальные', multiCollapse: 'Схлопывать все',
      replies: 'Ответы', repliesAll: 'Показывать все', repliesThreads: 'Только свои треды', repliesNone: 'Скрывать все',
      sound: 'Звук', soundOn: 'Звук включён', soundOff: 'Без звука', seek: 'Перемотка',
      volume: 'Громкость', mute: 'Выключить звук', unmute: 'Включить звук', search: 'Найти похожие',
      searchHint: 'Поиск по картинке на IQDB (откроется в фоновой вкладке)',
      about: 'Об этом расширении', aboutTagline: 'Все фото и видео профиля в одной полноэкранной галерее.',
      version: 'Версия', updated: 'Обновлено', github: 'Репозиторий на GitHub', issues: 'Сообщить о проблеме',
    },
  };
  const T = STRINGS[LANG] || STRINGS.en;

  /* ═══════════════════════════════════════════════════════════════════════
     Small utilities
     ═══════════════════════════════════════════════════════════════════════ */

  // GM_* live in the userscript sandbox scope, so probe them by identifier (typeof never throws).
  /* global GM_getValue, GM_setValue, GM_addStyle, GM_download, GM_openInTab, GM_info */
  const GM = {
    getValue: typeof GM_getValue === 'function' ? GM_getValue : null,
    setValue: typeof GM_setValue === 'function' ? GM_setValue : null,
    addStyle: typeof GM_addStyle === 'function' ? GM_addStyle : null,
    download: typeof GM_download === 'function' ? GM_download : null,
    openInTab: typeof GM_openInTab === 'function' ? GM_openInTab : null,
  };

  const storage = {
    get(key, fallback) {
      try {
        const raw = GM.getValue ? GM.getValue(key) : JSON.parse(localStorage.getItem(key));
        return raw == null ? fallback : raw;
      } catch { return fallback; }
    },
    set(key, value) {
      try { GM.setValue ? GM.setValue(key, value) : localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
    },
  };

  const settings = Object.assign({}, DEFAULT_SETTINGS, storage.get(SETTINGS_KEY, {}));
  if (!['auto', 'media', 'originals'].includes(settings.source)) settings.source = 'auto';
  if (settings.source === 'media') settings.sort = 'recent';
  if (!['all', 'vertical', 'collapse'].includes(settings.multiMedia)) settings.multiMedia = 'all';
  if (!['all', 'threads', 'none'].includes(settings.replies)) settings.replies = 'all';
  if (!(settings.volume >= 0 && settings.volume <= 1)) settings.volume = DEFAULT_SETTINGS.volume;
  const saveSettings = () => storage.set(SETTINGS_KEY, settings);

  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const el = (tag, className, html) => { const e = document.createElement(tag); if (className) e.className = className; if (html != null) e.innerHTML = html; return e; };
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const decodeEntities = (() => { const ta = document.createElement('textarea'); return (s) => { ta.innerHTML = s; return ta.value; }; })();

  function formatCount(n) {
    n = Number(n) || 0;
    if (n < 1000) return String(n);
    if (n < 1e6) return `${(n / 1e3).toFixed(n < 1e4 ? 1 : 0).replace(/\.0$/, '')}K`;
    return `${(n / 1e6).toFixed(1).replace(/\.0$/, '')}M`;
  }

  const dateLocale = LANG === 'ru' ? 'ru' : 'en';
  const dateFmtSameYear = new Intl.DateTimeFormat(dateLocale, { day: 'numeric', month: 'short' });
  const dateFmtFull = new Intl.DateTimeFormat(dateLocale, { day: 'numeric', month: 'short', year: 'numeric' });
  const formatDate = (d) => (d.getFullYear() === new Date().getFullYear() ? dateFmtSameYear : dateFmtFull).format(d);
  const formatDuration = (ms) => { const s = Math.round((ms || 0) / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  // YYYYMMDD in local time (matches the dates shown in the gallery), used in download file names.
  const fileDate = (d) => (Number.isNaN(d.getTime()) ? '00000000' : `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`);
  const monthFmt = new Intl.DateTimeFormat(dateLocale, { month: 'long', year: 'numeric' });
  const monthKey = (d) => (Number.isNaN(d.getTime()) ? '0000-00' : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  const monthLabel = (d) => { const s = Number.isNaN(d.getTime()) ? '—' : monthFmt.format(d); return s.charAt(0).toUpperCase() + s.slice(1); };

  const ICONS = {
    back: '<svg viewBox="0 0 24 24"><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/></svg>',
    repost: '<svg viewBox="0 0 24 24"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/></svg>',
    views: '<svg viewBox="0 0 24 24"><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/></svg>',
    download: '<svg viewBox="0 0 24 24"><path d="M12 16.5l-5.5-5.5 1.41-1.41L11 12.67V3h2v9.67l3.09-3.08L17.5 11 12 16.5zM4 18h16v2H4v-2z"/></svg>',
    external: '<svg viewBox="0 0 24 24"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h5v2H7v10h10v-3h2v5H5V5z"/></svg>',
    chevron: '<svg viewBox="0 0 24 24"><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"/></svg>',
    chevronLeft: '<svg viewBox="0 0 24 24"><path d="M14.59 3.54l1.42 1.42L8.96 12l7.05 7.04-1.42 1.42L6.13 12l8.46-8.46z"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24"><path d="M9.41 3.54L7.99 4.96 15.04 12l-7.05 7.04 1.42 1.42L17.87 12 9.41 3.54z"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><path d="M12 3.75c-4.56 0-8.25 3.69-8.25 8.25s3.69 8.25 8.25 8.25 8.25-3.69 8.25-8.25S16.56 3.75 12 3.75zM1.75 12C1.75 6.34 6.34 1.75 12 1.75S22.25 6.34 22.25 12 17.66 22.25 12 22.25 1.75 17.66 1.75 12zm9.25-5h2v4.59l3.2 3.2-1.41 1.42L11 12.41V7z"/></svg>',
    grid: '<svg viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8-2h8v8h-8v-8zm2 2v4h4v-4h-4z"/></svg>',
    minus: '<svg viewBox="0 0 24 24"><path d="M5 11h14v2H5z"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z"/></svg>',
    copies: '<svg viewBox="0 0 24 24"><path d="M4 4h11v2H6v9H4V4zm4 4h12v12H8V8zm2 2v8h8v-8h-8z"/></svg>',
    columns: '<svg viewBox="0 0 24 24"><path d="M3 4h4v16H3V4zm7 0h4v16h-4V4zm7 0h4v16h-4V4z"/></svg>',
    masonry: '<svg viewBox="0 0 24 24"><path d="M3 3h8v11H3V3zm2 2v7h4V5H5zm8-2h8v6h-8V3zm2 2v2h4V5h-4zM3 16h8v5H3v-5zm2 2v1h4v-1H5zm8-7h8v10h-8V11zm2 2v6h4v-6h-4z"/></svg>',
    rows: '<svg viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8-2h8v8h-8v-8zm2 2v4h4v-4h-4z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24"><path d="M7 2h2v2h6V2h2v2h4v18H3V4h4V2zM5 6v3h14V6H5zm0 5v9h14v-9H5zm2 2h3v3H7v-3zm5 0h3v3h-3v-3z"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M21 12L4 2v20l17-10z"/></svg>',
    reply: '<svg viewBox="0 0 24 24"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/></svg>',
    search: '<svg viewBox="0 0 24 24"><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"/></svg>',
    volume: '<svg viewBox="0 0 24 24"><path d="M3 9h4.3L12 5.2v13.6L7.3 15H3V9zm13.95-1.95A7 7 0 0 1 16.95 16.95l-1.41-1.41a5 5 0 0 0 0-7.08l1.41-1.41zm2.83-2.83A11 11 0 0 1 19.78 19.78l-1.42-1.42a9 9 0 0 0 0-12.72l1.42-1.42z"/></svg>',
    mute: '<svg viewBox="0 0 24 24"><path d="M3 9h4.3L12 5.2v13.6L7.3 15H3V9zm13.59 3L14.4 9.82l1.42-1.42L18 10.59l2.18-2.19 1.42 1.42L19.41 12l2.19 2.18-1.42 1.42L18 13.41l-2.18 2.19-1.42-1.42L16.59 12z"/></svg>',
  };

  /* ═══════════════════════════════════════════════════════════════════════
     Theme — derive the palette from the page so the overlay matches
     "Lights out" / "Dim" / "Default" and the user's accent colour.
     ═══════════════════════════════════════════════════════════════════════ */

  const PALETTES = {
    dark:  { bg: '#000000', bgA: 'rgba(0,0,0,0.85)',       surface: '#16181c', surface2: '#202327', text: '#e7e9ea', text2: '#71767b', border: '#2f3336', hover: 'rgba(231,233,234,0.1)', shadow: 'rgba(255,255,255,0.2) 0 0 15px, rgba(255,255,255,0.15) 0 0 3px 1px' },
    dim:   { bg: '#15202b', bgA: 'rgba(21,32,43,0.85)',    surface: '#1e2732', surface2: '#273340', text: '#f7f9f9', text2: '#8b98a5', border: '#38444d', hover: 'rgba(247,249,249,0.1)', shadow: 'rgba(136,153,166,0.2) 0 0 15px, rgba(136,153,166,0.15) 0 0 3px 1px' },
    light: { bg: '#ffffff', bgA: 'rgba(255,255,255,0.85)', surface: '#f7f9f9', surface2: '#eff3f4', text: '#0f1419', text2: '#536471', border: '#eff3f4', hover: 'rgba(15,20,25,0.1)',   shadow: 'rgba(101,119,134,0.2) 0 0 15px, rgba(101,119,134,0.15) 0 0 3px 1px' },
  };

  function detectPalette() {
    const rgb = (getComputedStyle(document.body).backgroundColor.match(/\d+/g) || [255, 255, 255]).map(Number);
    const lum = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    const key = lum > 128 ? 'light' : (rgb[2] > rgb[0] + 10 ? 'dim' : 'dark');
    return { key, accent: detectAccent(), ...PALETTES[key] };
  }

  function detectAccent() {
    for (const sel of ['[data-testid="UserUrl"]', '[data-testid="tweetText"] a', 'a[href*="/hashtag/"]', 'a[href^="https://t.co/"]']) {
      const node = document.querySelector(sel);
      if (!node) continue;
      const c = getComputedStyle(node).color;
      if (c && c !== 'rgba(0, 0, 0, 0)') return c;
    }
    return 'rgb(29, 155, 240)';
  }

  /* ═══════════════════════════════════════════════════════════════════════
     API layer
     ═══════════════════════════════════════════════════════════════════════ */

  class ApiError extends Error {
    constructor(message, { status, retryAt } = {}) { super(message); this.status = status; this.retryAt = retryAt; }
  }

  const ApiStatus = {
    last: null,
    onChange: null,
    record(operation, response) {
      const receivedAt = Date.now();
      const reset = response.headers.get('x-rate-limit-reset');
      const resetAt = reset && Number.isFinite(Number(reset)) && Number(reset) > 0 ? Number(reset) * 1000 : null;
      this.last = {
        operation, status: response.status, receivedAt,
        limit: response.headers.get('x-rate-limit-limit'),
        remaining: response.headers.get('x-rate-limit-remaining'),
        reset, resetAt, retryAfter: response.headers.get('retry-after'),
        retryAt: response.status === 429 ? (resetAt > receivedAt ? resetAt : receivedAt + 60_000) : null,
      };
      this.onChange?.();
      return this.last;
    },
  };

  const QueryIds = {
    promise: null,

    mainBundleUrl() {
      return [...document.scripts].map((s) => s.src).find((s) => /\/client-web(?:-legacy)?\/main\.[\w-]+\.js/.test(s)) || null;
    },

    get() {
      if (!this.promise) this.promise = this.resolve().catch(() => ({ ...DEFAULT_QUERY_IDS }));
      return this.promise;
    },

    invalidate() { this.promise = null; storage.set(QUERY_IDS_KEY, null); },

    async resolve() {
      const mainUrl = this.mainBundleUrl();
      const cached = storage.get(QUERY_IDS_KEY, null);
      if (cached && cached.mainUrl === mainUrl && cached.ids) return { ...DEFAULT_QUERY_IDS, ...cached.ids };
      if (!mainUrl) return { ...DEFAULT_QUERY_IDS };
      const text = await (await fetch(mainUrl)).text();
      const ids = {};
      const re = /queryId:"([\w-]+)",operationName:"(\w+)"/g;
      let m;
      while ((m = re.exec(text))) if (m[2] in DEFAULT_QUERY_IDS) ids[m[2]] = m[1];
      if (Object.keys(ids).length) storage.set(QUERY_IDS_KEY, { mainUrl, ids, at: Date.now() });
      return { ...DEFAULT_QUERY_IDS, ...ids };
    },
  };

  const csrfToken = () => (document.cookie.match(/(?:^|;\s*)ct0=([^;]+)/) || [])[1] || '';

  async function gql(operation, variables, features, fieldToggles, { retried = false } = {}) {
    const ids = await QueryIds.get();
    const params = new URLSearchParams({ variables: JSON.stringify(variables), features: JSON.stringify(features) });
    if (fieldToggles) params.set('fieldToggles', JSON.stringify(fieldToggles));
    const url = `${location.origin}/i/api/graphql/${ids[operation]}/${operation}?${params}`;
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${BEARER}`,
        'x-csrf-token': csrfToken(),
        'x-twitter-auth-type': 'OAuth2Session',
        'x-twitter-active-user': 'yes',
        'x-twitter-client-language': LANG,
      },
    });

    const apiStatus = ApiStatus.record(operation, res);
    if (res.status === 429) throw new ApiError('rate-limited', { status: 429, retryAt: apiStatus.retryAt });
    if ((res.status === 404 || res.status === 400) && !retried) {
      // Most likely a stale persisted-query id: re-read the bundle and retry once.
      QueryIds.invalidate();
      return gql(operation, variables, features, fieldToggles, { retried: true });
    }
    if (res.status === 401 || res.status === 403) throw new ApiError(T.loginRequired, { status: res.status });
    if (!res.ok) throw new ApiError(`${T.error} (HTTP ${res.status})`, { status: res.status });

    const json = await res.json();
    if (!json.data && json.errors?.length) throw new ApiError(json.errors.map((e) => e.message).join('; '));
    return json;
  }

  async function fetchUser(screenName) {
    const json = await gql('UserByScreenName', { screen_name: screenName, withGrokTranslatedBio: false }, USER_FEATURES, { withPayments: false, withAuxiliaryUserLabels: true });
    const r = json.data?.user?.result;
    if (!r || !r.rest_id) throw new ApiError(T.error);
    const avatar = r.avatar?.image_url || r.legacy?.profile_image_url_https || '';
    return {
      id: r.rest_id,
      name: r.core?.name || r.legacy?.name || screenName,
      screenName: r.core?.screen_name || r.legacy?.screen_name || screenName,
      avatar: avatar.replace('_normal.', '_bigger.'),
    };
  }

  // source: 'media' = UserMedia (Media tab; photos + videos only, dense pages),
  //         'originals' = UserOriginalsTimeline (Posts tab; text posts included, sortable by likes).
  // In Auto mode only, an empty first media page falls back to 'originals'.
  async function fetchTimelinePage(sort, source, userId, cursor) {
    let json;
    if (source === 'media') {
      const variables = { userId, count: PAGE_SIZE, includePromotedContent: false, withClientEventToken: false, withBirdwatchNotes: false, withVoice: true };
      if (cursor) variables.cursor = cursor;
      json = await gql('UserMedia', variables, TIMELINE_FEATURES, { withArticlePlainText: false });
    } else {
      const variables = { userId, count: PAGE_SIZE, sortByMostLiked: sort !== 'recent', includePromotedContent: false, withQuickPromoteEligibilityTweetFields: true, withVoice: true };
      if (cursor) variables.cursor = cursor;
      json = await gql('UserOriginalsTimeline', variables, TIMELINE_FEATURES, { withArticlePlainText: false });
    }
    return parseTimeline(json);
  }

  function parseTimeline(json) {
    // Do not turn a partial/failed response into a successful end of the timeline.
    if (json?.errors?.length) throw new ApiError(json.errors.map((e) => e.message).join('; ') || T.error);
    const timeline = json?.data?.user?.result?.timeline?.timeline || json?.data?.user?.result?.timeline_v2?.timeline;
    if (!Array.isArray(timeline?.instructions)) throw new ApiError(T.error);
    const tweets = [];
    let cursor = null;

    const pushTweet = (result) => { const t = normalizeTweet(result); if (t) tweets.push(t); };
    const visitEntry = (entry) => {
      const c = entry?.content;
      if (!c) return;
      if (c.cursorType) { if (c.cursorType === 'Bottom') cursor = c.value; return; }
      if (c.itemContent?.tweet_results) pushTweet(c.itemContent.tweet_results.result);
      for (const it of c.items || []) if (it.item?.itemContent?.tweet_results) pushTweet(it.item.itemContent.tweet_results.result);
    };

    for (const ins of timeline.instructions) {
      if (ins.type === 'TimelineAddEntries') (ins.entries || []).forEach(visitEntry);
      else if (ins.type === 'TimelineAddToModule') for (const it of ins.moduleItems || []) if (it.item?.itemContent?.tweet_results) pushTweet(it.item.itemContent.tweet_results.result);
      else if ((ins.type === 'TimelineReplaceEntry' || ins.type === 'TimelinePinEntry') && ins.entry) visitEntry(ins.entry);
    }
    return { tweets, cursor };
  }

  // Splits a pbs.twimg.com URL (photo or video poster) into base + extension so size variants can be requested.
  function parseMediaUrl(url) {
    const m = String(url).match(/^(https:\/\/pbs\.twimg\.com\/[^?#]+?)(?:\.(\w+))?(?:[?#].*)?$/);
    return { base: m ? m[1] : url, ext: m?.[2] || 'jpg' };
  }

  // kind: 'photo' | 'video' | 'gif'. For videos/gifs `base`/`ext` describe the poster image and
  // `videoUrl` is the best-bitrate mp4.
  function normalizeMedia(m, index) {
    if (!m?.media_url_https) return null;
    const kind = m.type === 'photo' ? 'photo' : m.type === 'video' ? 'video' : m.type === 'animated_gif' ? 'gif' : null;
    if (!kind) return null;
    const media = {
      key: m.media_key || m.id_str,
      index,
      kind,
      w: m.original_info?.width || m.sizes?.large?.w || 1,
      h: m.original_info?.height || m.sizes?.large?.h || 1,
      ...parseMediaUrl(m.media_url_https),
    };
    if (kind !== 'photo') {
      const mp4 = (m.video_info?.variants || [])
        .filter((v) => v.content_type === 'video/mp4' && v.url)
        .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))[0];
      if (!mp4) return null;
      media.videoUrl = mp4.url;
      media.duration = m.video_info?.duration_millis || 0;
      const ar = m.video_info?.aspect_ratio;
      if (Array.isArray(ar) && ar[0] > 0 && ar[1] > 0) { media.w = ar[0]; media.h = ar[1]; }
    }
    return media;
  }

  function normalizeTweet(result) {
    let tr = result;
    if (tr?.__typename === 'TweetWithVisibilityResults') tr = tr.tweet;
    const legacy = tr?.legacy;
    if (!legacy) return null;
    const user = tr.core?.user_results?.result;
    const media = (legacy.extended_entities?.media || legacy.entities?.media || [])
      .map((m, i) => normalizeMedia(m, i + 1))
      .filter(Boolean);
    const screenName = user?.core?.screen_name || user?.legacy?.screen_name || '';
    const id = tr.rest_id || legacy.id_str;
    return {
      id,
      userId: legacy.user_id_str,
      screenName,
      url: `https://x.com/${screenName || 'i'}/status/${id}`,
      isRetweet: Boolean(legacy.retweeted_status_result) || /^RT @/.test(legacy.full_text || ''),
      // X sends in_reply_to_* only on replies; conversation_id_str is the fallback should it stop doing so
      // (verified 2026-09 on a media timeline: the two mark exactly the same posts).
      isReply: Boolean(legacy.in_reply_to_status_id_str) || Boolean(legacy.conversation_id_str && legacy.conversation_id_str !== id),
      replyToUserId: legacy.in_reply_to_user_id_str || null,
      createdAt: new Date(legacy.created_at),
      favs: legacy.favorite_count || 0,
      retweets: legacy.retweet_count || 0,
      views: Number(tr.views?.count || 0),
      text: cleanText(legacy.full_text, legacy.entities),
      media,
    };
  }

  function cleanText(text, entities) {
    let t = text || '';
    for (const m of entities?.media || []) if (m.url) t = t.split(m.url).join('');
    for (const u of entities?.urls || []) if (u.url && u.expanded_url) t = t.split(u.url).join(u.expanded_url);
    return decodeEntities(t).replace(/[ \t]+\n/g, '\n').trim();
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Image URLs
     ═══════════════════════════════════════════════════════════════════════ */

  const VARIANTS = [['small', 680], ['medium', 1200], ['large', 2048], ['orig', Infinity]];
  const VARIANT_RANK = Object.fromEntries(VARIANTS.map(([name], i) => [name, i]));
  // Image (or video poster) URL at a given size variant.
  const mediaUrl = (media, variant) => `${media.base}?format=${media.ext}&name=${variant}`;

  function pickVariant(media, cssWidth) {
    const dpr = window.devicePixelRatio || 1;
    const longestNeeded = cssWidth * dpr * Math.max(1, media.h / media.w);
    const longestAvailable = Math.max(media.w, media.h);
    const target = Math.min(longestNeeded, longestAvailable);
    for (const [name, size] of VARIANTS) if (size >= target) return name;
    return 'orig';
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Perceptual signature for duplicate detection:
     dHash (64 bit) + 16x16 grayscale thumbnail for normalized cross-correlation.
     ═══════════════════════════════════════════════════════════════════════ */

  const Signature = (() => {
    const c16 = document.createElement('canvas'); c16.width = 16; c16.height = 16;
    const c9 = document.createElement('canvas'); c9.width = 9; c9.height = 8;
    const ctx16 = c16.getContext('2d', { willReadFrequently: true });
    const ctx9 = c9.getContext('2d', { willReadFrequently: true });
    const gray = (d, i) => d[i * 4] * 0.299 + d[i * 4 + 1] * 0.587 + d[i * 4 + 2] * 0.114;

    function compute(img) {
      ctx16.drawImage(img, 0, 0, 16, 16);
      ctx9.drawImage(img, 0, 0, 9, 8);
      const d16 = ctx16.getImageData(0, 0, 16, 16).data;
      const d9 = ctx9.getImageData(0, 0, 9, 8).data;

      const thumb = new Float32Array(256);
      let mean = 0;
      for (let i = 0; i < 256; i++) { thumb[i] = gray(d16, i); mean += thumb[i]; }
      mean /= 256;
      let norm = 0;
      for (let i = 0; i < 256; i++) { thumb[i] -= mean; norm += thumb[i] * thumb[i]; }
      norm = Math.sqrt(norm) || 1e-6;

      let hi = 0, lo = 0;
      for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
        const bit = gray(d9, y * 9 + x) > gray(d9, y * 9 + x + 1) ? 1 : 0;
        if (y < 4) hi = (hi << 1) | bit; else lo = (lo << 1) | bit;
      }
      return { thumb, norm, hi: hi >>> 0, lo: lo >>> 0 };
    }

    function popcount(n) { n -= (n >>> 1) & 0x55555555; n = (n & 0x33333333) + ((n >>> 2) & 0x33333333); return (((n + (n >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24; }

    function similar(a, b) {
      const dist = popcount(a.hi ^ b.hi) + popcount(a.lo ^ b.lo);
      if (dist > DUP_MAX_DHASH) return false;
      let dot = 0;
      for (let i = 0; i < 256; i++) dot += a.thumb[i] * b.thumb[i];
      return dot / (a.norm * b.norm) >= DUP_MIN_NCC;
    }

    return { compute, similar };
  })();

  /* ═══════════════════════════════════════════════════════════════════════
     Downloads and clipboard
     ═══════════════════════════════════════════════════════════════════════ */

  // What a download fetches: always the original. Photos use name=orig in the format X stored them in
  // (never a resized small/medium/large variant); videos and GIFs use the highest-bitrate mp4 that X offers.
  function downloadTarget(item) {
    const { tweet, media } = item;
    const isVideo = media.kind !== 'photo';
    const url = isVideo ? media.videoUrl : mediaUrl(media, 'orig');
    const ext = isVideo ? (media.videoUrl.match(/\.(\w+)(?:[?#]|$)/)?.[1] || 'mp4') : media.ext;
    return { url, name: `${tweet.screenName || 'x'}_${fileDate(tweet.createdAt)}_${tweet.id}_${media.index}.${ext}` };
  }

  async function downloadItem(item, button) {
    const { url, name } = downloadTarget(item);
    button?.classList.add('xg-busy');

    const viaBlob = async () => {
      const blob = await (await fetch(url)).blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name;
      document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 60_000);
    };

    try {
      if (GM.download) {
        await new Promise((resolve, reject) => GM.download({ url, name, saveAs: false, onload: resolve, onerror: reject, ontimeout: reject }))
          .catch(viaBlob);
      } else {
        await viaBlob();
      }
    } catch (e) {
      console.warn('[X Gallery] download failed', e);
      window.open(url, '_blank', 'noopener');
    } finally { button?.classList.remove('xg-busy'); }
  }

  async function photoPng(media) {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = mediaUrl(media, 'orig');
    await image.decode();
    const canvas = el('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas.getContext('2d').drawImage(image, 0, 0);
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Could not encode photo as PNG'));
      }, 'image/png');
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Reverse image search
     ═══════════════════════════════════════════════════════════════════════ */

  const SEARCH_URL = 'https://iqdb.org/?url=';
  // IQDB gets the "large" variant of the photo (or of the video poster).
  const searchUrl = (media) => SEARCH_URL + encodeURIComponent(mediaUrl(media, 'large'));

  // Opens a URL in a background tab so the gallery keeps focus. Needs GM_openInTab; window.open is the
  // fallback (a regular new tab) when the script runs without the userscript manager.
  function openInBackground(url) {
    if (GM.openInTab) {
      try { GM.openInTab(url, { active: false, insert: true, setParent: true }); return; } catch { /* fall back */ }
    }
    window.open(url, '_blank', 'noopener');
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Styles
     ═══════════════════════════════════════════════════════════════════════ */

  const CSS = `
html.xg-lock { overflow: hidden !important; }
#xg-root { position: fixed; inset: 0; z-index: 2147483000; overflow-y: auto; overflow-x: hidden; background: var(--xg-bg); color: var(--xg-text);
  font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 20px;
  -webkit-font-smoothing: antialiased; overscroll-behavior: contain; }
#xg-root *, #xg-root *::before, #xg-root *::after { box-sizing: border-box; }
#xg-root [hidden] { display: none !important; }
#xg-root button { font: inherit; }
#xg-root svg { fill: currentColor; flex: none; }

.xg-header { position: sticky; top: 0; z-index: 3; display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 6px 8px; min-height: 53px; padding: 6px 12px 6px 8px;
  background: var(--xg-bg-a); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--xg-border); }
.xg-round { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 9999px; border: 0;
  background: transparent; color: var(--xg-text); cursor: pointer; transition: background-color .2s; }
.xg-round:hover { background: var(--xg-hover); }
.xg-round svg { width: 20px; height: 20px; }
.xg-heading { display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1 1 auto; margin: 0 4px; }
.xg-avatar { width: 34px; height: 34px; border-radius: 9999px; object-fit: cover; background: var(--xg-surface2); flex: none; display: inline-block; }
.xg-heading-text { min-width: 0; max-width: 380px; }
.xg-name { font-weight: 700; font-size: 17px; line-height: 20px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.xg-sub { color: var(--xg-text2); font-size: 13px; line-height: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.xg-tools { display: contents; }
.xg-pill { position: relative; display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 14px; border-radius: 9999px;
  border: 1px solid var(--xg-border); background: transparent; color: var(--xg-text); font-weight: 700; font-size: 14px; line-height: 16px;
  cursor: pointer; white-space: nowrap; text-decoration: none; transition: background-color .2s, border-color .2s; }
.xg-pill:hover { background: var(--xg-hover); }
.xg-pill:disabled { opacity: .5; cursor: default; }
.xg-pill svg { width: 18px; height: 18px; }
.xg-pill.xg-active { background: var(--xg-accent); border-color: var(--xg-accent); color: #fff; }
.xg-pill.xg-active:hover { filter: brightness(0.92); }
.xg-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 9999px;
  background: var(--xg-surface2); color: var(--xg-text); font-size: 12px; line-height: 12px; font-weight: 700; }
.xg-pill.xg-active .xg-badge { background: rgba(255,255,255,0.25); color: #fff; }
.xg-cols { display: inline-flex; align-items: center; height: 34px; border: 1px solid var(--xg-border); border-radius: 9999px; padding: 0 3px; color: var(--xg-text2); }
.xg-cols > svg { width: 18px; height: 18px; margin: 0 4px 0 9px; }
.xg-cols .xg-round { width: 28px; height: 28px; }
.xg-cols .xg-round svg { width: 18px; height: 18px; }
.xg-cols input { width: 36px; height: 28px; text-align: center; background: transparent; border: 0; outline: 0; color: var(--xg-text); font-weight: 700; font-size: 14px;
  -moz-appearance: textfield; appearance: textfield; }
.xg-cols input::-webkit-inner-spin-button, .xg-cols input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.xg-seg { display: inline-flex; align-items: center; gap: 2px; height: 34px; padding: 0 3px; border: 1px solid var(--xg-border); border-radius: 9999px; }
.xg-seg .xg-round { width: 28px; height: 28px; color: var(--xg-text2); }
.xg-seg .xg-round svg { width: 18px; height: 18px; }
.xg-seg .xg-round[aria-pressed="true"] { background: var(--xg-accent); color: #fff; }
.xg-seg .xg-round[aria-pressed="true"]:hover { filter: brightness(0.92); }
@media (max-width: 1280px) { .xg-pill .xg-label { display: none; } .xg-pill { padding: 0 10px; } }
.xg-menu-wrap { position: relative; }
.xg-menu { position: absolute; top: 40px; right: 0; z-index: 5; min-width: 230px; padding: 4px 0; border-radius: 16px; background: var(--xg-bg); box-shadow: var(--xg-shadow); overflow: hidden; }
.xg-menu-title { padding: 10px 16px 6px; font-size: 13px; color: var(--xg-text2); }
.xg-menu-item { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 16px; border: 0; background: transparent; color: var(--xg-text);
  font-weight: 700; font-size: 15px; cursor: pointer; text-align: left; }
.xg-menu-item:hover { background: var(--xg-hover); }
.xg-menu-item svg { width: 18px; height: 18px; }
.xg-menu-item .xg-check { margin-left: auto; color: var(--xg-accent); visibility: hidden; }
.xg-menu-item[aria-checked="true"] .xg-check { visibility: visible; }
.xg-volume { min-width: 270px; padding-bottom: 8px; }
.xg-volume-row { display: flex; align-items: center; gap: 10px; padding: 2px 16px 4px 8px; }
.xg-volume-row .xg-round { width: 32px; height: 32px; }
.xg-volume-slider { flex: 1; height: 4px; margin: 0; border-radius: 2px; outline: 0; cursor: pointer; -webkit-appearance: none; appearance: none;
  background: linear-gradient(to right, var(--xg-accent) var(--xg-vol, 0%), var(--xg-border) var(--xg-vol, 0%)); }
.xg-volume-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; border: 0; background: var(--xg-accent); box-shadow: 0 1px 3px rgba(0,0,0,.3); }
.xg-volume-slider::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; border: 0; background: var(--xg-accent); box-shadow: 0 1px 3px rgba(0,0,0,.3); }
.xg-volume-slider::-moz-range-track { height: 4px; border-radius: 2px; background: var(--xg-border); }
.xg-volume-slider::-moz-range-progress { height: 4px; border-radius: 2px; background: var(--xg-accent); }
.xg-volume-slider:focus-visible { box-shadow: 0 0 0 2px var(--xg-bg), 0 0 0 4px var(--xg-accent); }
.xg-volume-value { min-width: 42px; text-align: right; color: var(--xg-text2); font-size: 14px; font-variant-numeric: tabular-nums; }

.xg-grid { position: relative; margin: ${GRID_GAP}px; }
.xg-card { position: absolute; top: 0; left: 0; display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; background: var(--xg-surface);
  outline: 1px solid transparent; transition: outline-color .2s; }
.xg-card:hover { outline-color: var(--xg-border); }
.xg-media { display: block; position: relative; height: var(--xg-img-h); background: var(--xg-surface2); overflow: hidden; }
.xg-img { display: block; width: 100%; height: 100%; object-fit: cover; cursor: zoom-in; opacity: 0; transition: opacity .25s, filter .2s; }
#xg-root.xg-rows .xg-img { object-fit: contain; }
.xg-preview { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
#xg-root.xg-rows .xg-preview { object-fit: contain; }
.xg-seek { position: absolute; left: 0; right: 0; bottom: 0; height: 16px; display: flex; align-items: flex-end; cursor: pointer; touch-action: none; }
.xg-seek-track { position: relative; width: 100%; height: 3px; background: rgba(255,255,255,.35); transition: height .12s; }
.xg-seek:hover .xg-seek-track, .xg-seek.xg-seeking .xg-seek-track { height: 5px; }
.xg-seek-fill { position: absolute; inset: 0; background: var(--xg-accent); transform-origin: 0 50%; transform: scaleX(0); }
.xg-img.xg-loaded { opacity: 1; }
.xg-group { position: absolute; left: 0; right: 0; display: flex; align-items: baseline; gap: 10px; height: ${GROUP_HEADER_H}px; padding: 22px 12px 0; }
.xg-group-title { font-size: 20px; line-height: 24px; font-weight: 800; }
.xg-group-count { color: var(--xg-text2); font-size: 15px; }
.xg-card:hover .xg-img { filter: brightness(1.06); }
.xg-count, .xg-play { position: absolute; display: inline-flex; align-items: center; gap: 4px; padding: 2px 7px; border-radius: 9999px;
  background: rgba(0,0,0,0.6); color: #fff; font-size: 12px; line-height: 16px; font-weight: 700; pointer-events: none; }
.xg-count { top: 8px; right: 8px; }
.xg-play { left: 8px; bottom: 8px; padding-left: 5px; }
.xg-count svg, .xg-play svg { width: 14px; height: 14px; }
.xg-play-center { position: absolute; right: 8px; top: 8px;
  display: flex; align-items: center; justify-content: center; width: clamp(24px, 28%, 64px); aspect-ratio: 1;
  border: 1px solid rgba(255,255,255,.25); border-radius: 9999px; color: rgba(255,255,255,.7);
  background: rgba(15,20,25,.22); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  box-shadow: 0 4px 20px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.06);
  pointer-events: none; transition: opacity .18s, transform .18s, background-color .18s; }
.xg-play-center svg { width: 46%; height: 46%; margin-left: 5%; }
.xg-card:hover .xg-play-center { background: rgba(15,20,25,.32); }
.xg-play-center.xg-playing { opacity: 0; transform: scale(.9); }
.xg-card[data-kind="video"] .xg-count, .xg-card[data-kind="gif"] .xg-count { left: 8px; right: auto; }
@media (prefers-reduced-motion: reduce) { .xg-play-center { transition: none; } }
.xg-stacked .xg-img, .xg-stacked .xg-preview { object-fit: contain; }
.xg-card-nav { position: absolute; top: calc(var(--xg-img-h) / 2); transform: translateY(-50%); width: 26px; height: 26px;
  padding: 0; border: 0; border-radius: 9999px; display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,.65); color: #fff; cursor: pointer; }
.xg-card-nav:hover { background: rgba(0,0,0,.85); }
.xg-card-nav svg { width: 18px; height: 18px; }
.xg-card-prev { left: 4px; } .xg-card-next { right: 4px; }
.xg-meta { display: flex; align-items: center; gap: 8px; height: ${META_HEIGHT}px; padding: 0 6px 0 10px; color: var(--xg-text2); font-size: 13px; line-height: 16px; }
.xg-likes { display: inline-flex; align-items: center; gap: 4px; }
.xg-likes svg { width: 16px; height: 16px; }
.xg-date { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.xg-spacer { flex: 1; }
.xg-icon-btn { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 9999px; border: 0; background: transparent;
  color: var(--xg-text2); cursor: pointer; transition: background-color .2s, color .2s; }
.xg-icon-btn svg { width: 17px; height: 17px; }
.xg-icon-btn:hover { background: var(--xg-hover); color: var(--xg-text); }
.xg-busy svg { animation: xg-pulse .8s ease-in-out infinite; }
#xg-root.xg-narrow .xg-date { display: none; }
#xg-root.xg-compact .xg-meta { height: ${META_HEIGHT_COMPACT}px; font-size: 12px; padding: 0 4px 0 6px; gap: 4px; }
#xg-root.xg-compact .xg-likes svg { width: 14px; height: 14px; }
#xg-root.xg-compact .xg-icon-btn { width: 24px; height: 24px; }
#xg-root.xg-compact .xg-icon-btn svg { width: 15px; height: 15px; }
#xg-root.xg-tiny .xg-icon-btn { display: none; }

.xg-status { display: flex; align-items: center; justify-content: center; gap: 12px; min-height: 96px; padding: 24px 16px 40px; color: var(--xg-text2); text-align: center; }
.xg-api { position: fixed; right: 74px; bottom: 12px; z-index: 4; width: max-content; max-width: calc(100vw - 86px);
  border: 1px solid var(--xg-border); border-radius: 18px; background: var(--xg-bg); box-shadow: var(--xg-shadow);
  font-size: 13px; line-height: 18px; }
.xg-api[open] { width: 310px; border-radius: 16px; }
.xg-api summary.xg-pill { display: flex; width: 100%; height: 36px; border: 0; list-style: none; gap: 8px; }
.xg-api summary::-webkit-details-marker { display: none; }
.xg-api summary::marker { content: ''; }
.xg-api summary .xg-badge { margin-left: auto; font-variant-numeric: tabular-nums; }
.xg-api-caret { display: flex; transition: transform .15s; }
.xg-api[open] .xg-api-caret { transform: rotate(180deg); }
.xg-api[data-error="true"] summary .xg-badge { color: #f4212e; }
.xg-api-body { padding: 12px 16px 16px; border-top: 1px solid var(--xg-border); max-height: 50vh; overflow: auto; }
.xg-api-operation { overflow-wrap: anywhere; font-weight: 700; }
.xg-api dl { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 4px 12px; margin: 8px 0 0; }
.xg-api dt { color: var(--xg-text2); }
.xg-api dd { margin: 0; text-align: right; overflow-wrap: anywhere; font-variant-numeric: tabular-nums; }
.xg-about-btn { position: fixed; right: 12px; bottom: 12px; z-index: 4; width: 54px; height: 54px; padding: 0; border-radius: 9999px; border: 1px solid var(--xg-border);
  background: #fff; box-shadow: var(--xg-shadow); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: filter .15s; }
.xg-about-btn img { display: block; width: 36px; height: 36px; margin-top: 4px; }
.xg-about-btn:hover { filter: brightness(0.92); }
.xg-about-btn::after { content: attr(data-tip); position: absolute; right: 0; bottom: 62px; padding: 3px 8px; border-radius: 4px; background: rgba(91,112,131,.95); color: #fff;
  font-size: 11px; line-height: 14px; font-weight: 400; white-space: nowrap; pointer-events: none; opacity: 0; transition: opacity .15s .35s; }
.xg-about-btn:hover::after, .xg-about-btn:focus-visible::after { opacity: 1; }
.xg-about { position: fixed; inset: 0; z-index: 2147483090; display: flex; align-items: center; justify-content: center; padding: 16px; background: rgba(0,0,0,.45); }
.xg-about-card { position: relative; width: min(440px, 100%); padding: 32px 28px 28px; border-radius: 16px; background: var(--xg-bg); color: var(--xg-text); box-shadow: var(--xg-shadow); text-align: center; }
.xg-about-close { position: absolute; top: 8px; right: 8px; }
.xg-about-logo { display: block; box-sizing: content-box; width: 96px; height: 96px; margin: 0 auto 14px; padding: 14px; border-radius: 28px; background: #fff; border: 1px solid var(--xg-border); }
.xg-about-title { margin: 0; font-size: 23px; line-height: 28px; font-weight: 800; }
.xg-about-tagline { margin: 6px 0 18px; color: var(--xg-text2); font-size: 15px; line-height: 20px; }
.xg-about-meta { display: grid; grid-template-columns: auto auto; justify-content: center; gap: 6px 16px; margin: 0 0 22px; font-size: 15px; line-height: 20px; }
.xg-about-meta dt { color: var(--xg-text2); text-align: right; }
.xg-about-meta dd { margin: 0; text-align: left; font-weight: 700; font-variant-numeric: tabular-nums; }
.xg-about-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.xg-status .xg-pill { color: var(--xg-text); }
.xg-spinner { width: 26px; height: 26px; border-radius: 50%; border: 3px solid var(--xg-border); border-top-color: var(--xg-accent); animation: xg-spin .8s linear infinite; }
@keyframes xg-spin { to { transform: rotate(360deg); } }
@keyframes xg-pulse { 50% { opacity: .3; } }

.xg-lb { position: fixed; inset: 0; z-index: 2147483100; display: flex; flex-direction: column; background: rgba(0,0,0,0.93); color: #e7e9ea; -webkit-user-select: none; user-select: none; touch-action: none; }
.xg-lb-top { display: flex; align-items: center; gap: 8px; height: 53px; padding: 0 8px; flex: none; }
.xg-lb-top .xg-round, .xg-lb-nav { color: #e7e9ea; }
.xg-lb-top .xg-round:hover, .xg-lb-nav:hover { background: rgba(255,255,255,0.15); }
.xg-lb-counter { color: #71767b; font-size: 14px; margin-left: 4px; }
.xg-lb-stage { position: relative; flex: 1; display: flex; align-items: center; justify-content: center; min-height: 0; }
.xg-lb-img { max-width: calc(100vw - 32px); max-height: 100%; object-fit: contain; cursor: zoom-out; }
.xg-lb-video { max-width: calc(100vw - 32px); max-height: 100%; outline: 0; background: #000; }
.xg-lb-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 9999px; border: 0; background: rgba(0,0,0,0.5); cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; }
.xg-lb-nav svg { width: 22px; height: 22px; }
.xg-lb-loader { position: absolute; top: 12px; right: 12px; width: 22px; height: 22px; border-width: 3px; border-color: rgba(255,255,255,.2); border-top-color: var(--xg-accent);
  pointer-events: none; animation: xg-spin .8s linear infinite, xg-appear .2s ease-out .15s both; }
@keyframes xg-appear { from { opacity: 0; } to { opacity: 1; } }
.xg-lb-prev { left: 12px; } .xg-lb-next { right: 12px; }
.xg-lb-bottom { display: flex; align-items: center; gap: 16px; padding: 12px 20px 16px; flex: none; }
.xg-lb-text { flex: 1; min-width: 0; font-size: 15px; line-height: 20px; white-space: pre-wrap; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; -webkit-user-select: text; user-select: text; }
.xg-lb-stats { display: flex; align-items: center; gap: 16px; color: #71767b; font-size: 14px; white-space: nowrap; }
.xg-lb-stats span { display: inline-flex; align-items: center; gap: 5px; }
.xg-lb-stats svg { width: 18px; height: 18px; }
.xg-lb-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.xg-lb-actions .xg-pill { color: #e7e9ea; border-color: #536471; }
.xg-lb-actions .xg-pill:hover { background: rgba(255,255,255,0.1); }
@media (max-width: 900px) { .xg-lb-stats { display: none; } .xg-heading-text { display: none; } }
@media (max-width: 640px) { .xg-lb-text { display: none; } }
`;

  function injectStyles() {
    if (document.getElementById('xg-styles')) return;
    if (GM.addStyle) { const s = GM.addStyle(CSS); if (s && s.id !== undefined) s.id = 'xg-styles'; return; }
    const style = el('style'); style.id = 'xg-styles'; style.textContent = CSS; document.head.append(style);
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Gallery overlay
     ═══════════════════════════════════════════════════════════════════════ */

  class Gallery {
    constructor() {
      this.root = null;
      this.isOpen = false;
      this.session = 0;
      this.retryTimer = null;
      this.resetState();
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onResize = debounce(() => this.layout(), 100);
      this.scheduleLayout = debounce(() => this.layout(), 30);
      this.onExternalHide = debounce(() => { this.layout(); this.renderHeading(); }, 30);
    }

    resetState() {
      this.stopPreview();
      this.items = [];
      this.cardSelections = new Map();
      this.itemIds = new Set();
      this.keyIndex = new Map();     // media_key -> item (exact duplicates)
      this.signed = [];              // items with computed signatures
      this.postIds = new Set();
      this.groupHeaders = new Map();  // month key -> header element
      this.ordered = null;            // items in on-screen order (set by layout)
      this.source = null;             // resolved source for this pagination session
      this.cursor = null;
      this.ended = false;
      this.loading = false;
      this.emptyPages = 0;
      this.paused = false;
      this.lightboxIndex = -1;
      if (this.retryTimer) clearInterval(this.retryTimer);
      this.retryTimer = null;
    }

    /* ── lifecycle ─────────────────────────────────────────────────────── */

    async open(screenName, { pushHistory = true } = {}) {
      if (this.isOpen) return;
      injectStyles();
      this.isOpen = true;
      this.screenName = screenName;
      this.user = null;
      this.session++;
      const session = this.session;

      this.palette = detectPalette();
      this.buildDom();
      document.documentElement.classList.add('xg-lock');
      document.addEventListener('keydown', this.onKeyDown, true);
      window.addEventListener('resize', this.onResize);

      if (pushHistory && location.hash !== '#gallery') history.pushState({ xgGallery: true }, '', `${location.pathname}${location.search}#gallery`);
      this.pushedHistory = pushHistory && history.state?.xgGallery === true;

      this.layout();
      this.setStatus('loading');
      try {
        const user = await fetchUser(screenName);
        if (session !== this.session) return;
        this.user = user;
        this.renderHeading();
        this.loadMore();
      } catch (e) {
        if (session === this.session) this.showError(e);
      }
    }

    close({ fromPopState = false } = {}) {
      if (!this.isOpen) return;
      this.isOpen = false;
      this.session++;
      this.closeLightbox();
      this.closeAbout();
      this.stopPreview();
      this.observer?.disconnect();
      this.hideObserver?.disconnect();
      ApiStatus.onChange = null;
      this.apiPanel = null;
      this.root?.remove();
      this.root = null;
      document.documentElement.classList.remove('xg-lock');
      document.removeEventListener('keydown', this.onKeyDown, true);
      window.removeEventListener('resize', this.onResize);
      this.resetState();
      if (!fromPopState && location.hash === '#gallery') {
        if (this.pushedHistory) history.back();
        else history.replaceState(history.state, '', `${location.pathname}${location.search}`);
      }
    }

    onKeyDown(e) {
      // Typing in inputs is left alone, except Escape closing the volume popover from its slider.
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName) && !(e.key === 'Escape' && this.volumeMenu && !this.volumeMenu.hidden)) return;
      if (this.about) {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); this.closeAbout(); }
        return;
      }
      if (this.lightboxIndex >= 0) {
        if (e.key === 'Escape') { e.preventDefault(); this.closeLightbox(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); this.stepLightbox(-1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); this.stepLightbox(1); }
        else if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && (e.code === 'KeyC' || e.key.toLowerCase() === 'c') &&
          !e.target?.isContentEditable && !window.getSelection()?.toString() &&
          this.visibleItems()[this.lightboxIndex]?.media.kind === 'photo') {
          e.preventDefault();
          if (!e.repeat) this.copyLightboxPhoto();
        }
        e.stopPropagation();
        return;
      }
      if (e.key === 'Escape' && (!this.sourceMenu.hidden || !this.sortMenu.hidden || !this.multiMenu.hidden || !this.repliesMenu.hidden || !this.volumeMenu.hidden)) {
        e.preventDefault(); e.stopPropagation();
        const button = !this.sourceMenu.hidden ? this.sourceBtn : !this.multiMenu.hidden ? this.multiBtn
          : !this.repliesMenu.hidden ? this.repliesBtn : !this.volumeMenu.hidden ? this.soundBtn : this.sortBtn;
        this.toggleSourceMenu(false); this.toggleMenu(false); this.toggleMultiMenu(false); this.toggleRepliesMenu(false); this.toggleVolumeMenu(false); button.focus();
      }
      else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); this.close(); }
      else if (e.key === '-' || e.key === '[') { e.preventDefault(); this.setColumns(settings.columns - 1); }
      else if (e.key === '=' || e.key === '+' || e.key === ']') { e.preventDefault(); this.setColumns(settings.columns + 1); }
    }

    /* ── DOM ───────────────────────────────────────────────────────────── */

    buildDom() {
      const p = this.palette;
      const root = el('div');
      root.id = 'xg-root';
      root.dataset.xgGallery = '1';
      root.setAttribute('role', 'dialog');
      root.setAttribute('aria-label', T.tab);
      const vars = { bg: p.bg, 'bg-a': p.bgA, surface: p.surface, surface2: p.surface2, text: p.text, text2: p.text2, border: p.border, hover: p.hover, shadow: p.shadow, accent: p.accent };
      for (const [k, v] of Object.entries(vars)) root.style.setProperty(`--xg-${k}`, v);

      const header = el('header', 'xg-header');
      const back = el('button', 'xg-round', ICONS.back);
      back.title = T.back; back.setAttribute('aria-label', T.back);
      back.addEventListener('click', () => this.close());

      this.heading = el('div', 'xg-heading');
      this.renderHeading();

      const tools = el('div', 'xg-tools');

      const sourceWrap = el('div', 'xg-menu-wrap');
      this.sourceBtn = el('button', 'xg-pill');
      this.sourceBtn.setAttribute('aria-haspopup', 'menu');
      this.sourceBtn.setAttribute('aria-expanded', 'false');
      this.sourceBtn.addEventListener('click', (e) => { e.stopPropagation(); this.toggleSourceMenu(); });
      this.sourceMenu = el('div', 'xg-menu');
      this.sourceMenu.setAttribute('role', 'menu');
      this.sourceMenu.hidden = true;
      this.sourceMenu.addEventListener('click', (e) => e.stopPropagation());
      this.sourceMenu.append(el('div', 'xg-menu-title', T.source));
      for (const [value, label, icon] of [['auto', T.sourceAuto, ICONS.copies], ['media', T.sourceMedia, ICONS.grid], ['originals', T.sourcePosts, ICONS.rows]]) {
        const item = el('button', 'xg-menu-item', `${icon}<span>${label}</span><span class="xg-check">${ICONS.check}</span>`);
        item.setAttribute('role', 'menuitemradio');
        item.dataset.source = value;
        item.addEventListener('click', () => { this.toggleSourceMenu(false); this.setSource(value); this.sourceBtn.focus(); });
        this.sourceMenu.append(item);
      }
      sourceWrap.append(this.sourceBtn, this.sourceMenu);
      this.renderSourceButton();

      const multiWrap = el('div', 'xg-menu-wrap');
      this.multiBtn = el('button', 'xg-pill');
      this.multiBtn.setAttribute('aria-haspopup', 'menu');
      this.multiBtn.setAttribute('aria-expanded', 'false');
      this.multiBtn.addEventListener('click', (e) => { e.stopPropagation(); this.toggleMultiMenu(); });
      this.multiMenu = el('div', 'xg-menu');
      this.multiMenu.hidden = true;
      this.multiMenu.setAttribute('role', 'menu');
      this.multiMenu.addEventListener('click', (e) => e.stopPropagation());
      this.multiMenu.append(el('div', 'xg-menu-title', T.multiMedia));
      for (const [value, label] of [['all', T.multiAll], ['vertical', T.multiVertical], ['collapse', T.multiCollapse]]) {
        const item = el('button', 'xg-menu-item', `${ICONS.copies}<span>${label}</span><span class="xg-check">${ICONS.check}</span>`);
        item.dataset.multi = value;
        item.setAttribute('role', 'menuitemradio');
        item.addEventListener('click', () => { this.toggleMultiMenu(false); this.setMultiMedia(value); this.multiBtn.focus(); });
        this.multiMenu.append(item);
      }
      multiWrap.append(this.multiBtn, this.multiMenu);
      this.renderMultiButton();

      // Replies: the Media timeline carries posts the author wrote as replies, this filters them out.
      const repliesWrap = el('div', 'xg-menu-wrap');
      this.repliesBtn = el('button', 'xg-pill');
      this.repliesBtn.setAttribute('aria-haspopup', 'menu');
      this.repliesBtn.setAttribute('aria-expanded', 'false');
      this.repliesBtn.addEventListener('click', (e) => { e.stopPropagation(); this.toggleRepliesMenu(); });
      this.repliesMenu = el('div', 'xg-menu');
      this.repliesMenu.hidden = true;
      this.repliesMenu.setAttribute('role', 'menu');
      this.repliesMenu.addEventListener('click', (e) => e.stopPropagation());
      this.repliesMenu.append(el('div', 'xg-menu-title', T.replies));
      for (const [value, label] of [['all', T.repliesAll], ['threads', T.repliesThreads], ['none', T.repliesNone]]) {
        const item = el('button', 'xg-menu-item', `${ICONS.reply}<span>${label}</span><span class="xg-check">${ICONS.check}</span>`);
        item.dataset.replies = value;
        item.setAttribute('role', 'menuitemradio');
        item.addEventListener('click', () => { this.toggleRepliesMenu(false); this.setReplies(value); this.repliesBtn.focus(); });
        this.repliesMenu.append(item);
      }
      repliesWrap.append(this.repliesBtn, this.repliesMenu);
      this.renderRepliesButton();

      // Sort menu
      const sortWrap = el('div', 'xg-menu-wrap');
      this.sortBtn = el('button', 'xg-pill');
      this.sortBtn.setAttribute('aria-haspopup', 'menu');
      this.sortBtn.addEventListener('click', (e) => { e.stopPropagation(); this.toggleMenu(); });
      this.sortMenu = el('div', 'xg-menu');
      this.sortMenu.setAttribute('role', 'menu');
      this.sortMenu.hidden = true;
      this.sortMenu.addEventListener('click', (e) => e.stopPropagation());
      this.sortMenu.append(el('div', 'xg-menu-title', T.sortBy));
      for (const [key, label, icon] of [['popular', T.popular, ICONS.heart], ['recent', T.recent, ICONS.clock]]) {
        const item = el('button', 'xg-menu-item', `${icon}<span>${label}</span><span class="xg-check">${ICONS.check}</span>`);
        item.setAttribute('role', 'menuitemradio');
        item.dataset.sort = key;
        item.addEventListener('click', () => { this.toggleMenu(false); this.setSort(key); });
        this.sortMenu.append(item);
      }
      sortWrap.append(this.sortBtn, this.sortMenu);
      this.renderSortButton();

      // Columns
      const cols = el('div', 'xg-cols', ICONS.columns);
      cols.title = T.columns;
      const minus = el('button', 'xg-round', ICONS.minus); minus.title = T.fewer; minus.setAttribute('aria-label', T.fewer);
      const plus = el('button', 'xg-round', ICONS.plus); plus.title = T.more; plus.setAttribute('aria-label', T.more);
      this.colsInput = el('input');
      this.colsInput.type = 'number'; this.colsInput.min = '1'; this.colsInput.step = '1'; this.colsInput.value = settings.columns;
      this.colsInput.setAttribute('aria-label', T.columns);
      minus.addEventListener('click', () => this.setColumns(settings.columns - 1));
      plus.addEventListener('click', () => this.setColumns(settings.columns + 1));
      this.colsInput.addEventListener('change', () => this.setColumns(parseInt(this.colsInput.value, 10)));
      this.colsInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.colsInput.blur(); });
      cols.append(minus, this.colsInput, plus);

      // Layout: masonry / aligned rows
      const seg = el('div', 'xg-seg');
      seg.setAttribute('role', 'group');
      this.layoutBtns = {};
      for (const [key, label, icon] of [['masonry', T.layoutMasonry, ICONS.masonry], ['rows', T.layoutRows, ICONS.rows]]) {
        const b = el('button', 'xg-round', icon);
        b.title = label; b.setAttribute('aria-label', label);
        b.addEventListener('click', () => this.setLayout(key));
        this.layoutBtns[key] = b;
        seg.append(b);
      }
      this.renderLayoutButtons();

      // Videos & GIFs toggle
      this.videoBtn = el('button', 'xg-pill', `${ICONS.play}<span class="xg-label">${T.videos}</span>`);
      this.videoBtn.title = T.videos;
      this.videoBtn.addEventListener('click', () => { settings.showVideos = !settings.showVideos; saveSettings(); this.renderVideoButton(); this.renderHeading(); this.layout(); });
      this.renderVideoButton();

      // Sound: the pill opens a volume popover (slider + mute); previews and the lightbox player follow it.
      const soundWrap = el('div', 'xg-menu-wrap');
      this.soundBtn = el('button', 'xg-pill');
      this.soundBtn.setAttribute('aria-haspopup', 'dialog');
      this.soundBtn.setAttribute('aria-expanded', 'false');
      this.soundBtn.addEventListener('click', (e) => { e.stopPropagation(); this.toggleVolumeMenu(); });
      this.volumeMenu = el('div', 'xg-menu xg-volume');
      this.volumeMenu.setAttribute('role', 'dialog');
      this.volumeMenu.setAttribute('aria-label', T.volume);
      this.volumeMenu.hidden = true;
      this.volumeMenu.addEventListener('click', (e) => e.stopPropagation());
      this.volumeMenu.innerHTML = `<div class="xg-menu-title">${T.volume}</div><div class="xg-volume-row">
        <button class="xg-round xg-volume-mute" type="button"></button>
        <input class="xg-volume-slider" type="range" min="0" max="100" step="1" aria-label="${T.volume}">
        <span class="xg-volume-value"></span></div>`;
      this.volumeMute = this.volumeMenu.querySelector('.xg-volume-mute');
      this.volumeSlider = this.volumeMenu.querySelector('.xg-volume-slider');
      this.volumeValue = this.volumeMenu.querySelector('.xg-volume-value');
      this.volumeMute.addEventListener('click', () => this.setSound(!this.soundOn()));
      this.volumeSlider.addEventListener('input', () => this.setVolume(this.volumeSlider.valueAsNumber / 100));
      soundWrap.append(this.soundBtn, this.volumeMenu);
      this.renderSoundButton();

      // Group by month toggle
      this.groupBtn = el('button', 'xg-pill', `${ICONS.calendar}<span class="xg-label">${T.groupByMonth}</span>`);
      this.groupBtn.title = T.groupByMonth;
      this.groupBtn.addEventListener('click', () => { settings.groupByMonth = !settings.groupByMonth; saveSettings(); this.renderGroupButton(); this.layout(); });
      this.renderGroupButton();

      // Duplicates toggle
      this.dupBtn = el('button', 'xg-pill', `${ICONS.copies}<span class="xg-label">${T.hideDups}</span><span class="xg-badge">0</span>`);
      this.dupBtn.addEventListener('click', () => { settings.hideDuplicates = !settings.hideDuplicates; saveSettings(); this.renderDupButton(); this.renderHeading(); this.layout(); });
      this.renderDupButton();

      tools.append(sourceWrap, sortWrap, cols, seg, multiWrap, repliesWrap, this.videoBtn, soundWrap, this.groupBtn, this.dupBtn);
      header.append(back, this.heading, tools);

      this.grid = el('div', 'xg-grid');
      this.status = el('div', 'xg-status');

      root.append(header, this.grid, this.status);
      root.addEventListener('click', () => { this.toggleMenu(false); this.toggleSourceMenu(false); this.toggleMultiMenu(false); this.toggleRepliesMenu(false); this.toggleVolumeMenu(false); });
      document.body.append(root);
      this.root = root;

      this.apiPanel = el('details', 'xg-api');
      this.apiPanel.append(el('summary', 'xg-pill'), el('div', 'xg-api-body'));
      this.apiPanel.addEventListener('toggle', () => { if (this.apiPanel?.open) this.renderApiStatus(); });
      root.append(this.apiPanel);
      ApiStatus.onChange = () => this.renderApiStatus();
      this.renderApiStatus();

      // Logo button next to the API panel: tooltip on hover, About dialog on click.
      this.aboutBtn = el('button', 'xg-about-btn', `<img src="${LOGO}" alt="">`);
      this.aboutBtn.dataset.tip = T.about;
      this.aboutBtn.setAttribute('aria-label', T.about);
      this.aboutBtn.setAttribute('aria-haspopup', 'dialog');
      this.aboutBtn.addEventListener('click', () => this.openAbout());
      root.append(this.aboutBtn);

      this.sentinelVisible = false;
      this.observer = new IntersectionObserver((entries) => {
        this.sentinelVisible = entries.some((en) => en.isIntersecting);
        if (this.sentinelVisible) this.maybeLoad();
      }, { root, rootMargin: '1200px 0px' });
      this.observer.observe(this.status);

      // Companion scripts exclude cards from the layout by setting data-xg-hide on them.
      this.hideObserver = new MutationObserver(() => this.onExternalHide());
      this.hideObserver.observe(this.grid, { attributes: true, subtree: true, attributeFilter: ['data-xg-hide'] });
    }

    /* ── About dialog ──────────────────────────────────────────────────── */

    // The userscript manager knows the installed version; the constant is the fallback for injected builds.
    installedVersion() {
      try { return (typeof GM_info === 'object' && GM_info?.script?.version) || VERSION; } catch { return VERSION; }
    }

    openAbout() {
      if (this.about || !this.root) return;
      const about = el('div', 'xg-about');
      about.setAttribute('role', 'dialog');
      about.setAttribute('aria-modal', 'true');
      about.setAttribute('aria-label', T.about);
      about.innerHTML = `
        <div class="xg-about-card">
          <button class="xg-round xg-about-close" title="${T.close}" aria-label="${T.close}">${ICONS.close}</button>
          <img class="xg-about-logo" src="${LOGO}" alt="">
          <h2 class="xg-about-title">X Gallery Mode</h2>
          <p class="xg-about-tagline">${T.aboutTagline}</p>
          <dl class="xg-about-meta">
            <dt>${T.version}</dt><dd>${escapeHtml(this.installedVersion())}</dd>
            <dt>${T.updated}</dt><dd>${UPDATED}</dd>
          </dl>
          <div class="xg-about-links">
            <a class="xg-pill" href="${REPO_URL}" target="_blank" rel="noopener">${ICONS.external}<span>${T.github}</span></a>
            <a class="xg-pill" href="${REPO_URL}/issues" target="_blank" rel="noopener">${ICONS.external}<span>${T.issues}</span></a>
          </div>
        </div>`;
      about.addEventListener('click', (e) => { if (e.target === about) this.closeAbout(); });
      about.querySelector('.xg-about-close').addEventListener('click', () => this.closeAbout());
      this.about = about;
      this.root.append(about);
      about.querySelector('.xg-about-close').focus({ preventScroll: true });
    }

    closeAbout() {
      if (!this.about) return;
      this.about.remove();
      this.about = null;
      this.aboutBtn?.focus({ preventScroll: true });
    }

    renderApiStatus() {
      if (!this.apiPanel) return;
      const data = ApiStatus.last;
      const summary = this.apiPanel.querySelector('summary');
      const quota = `${data?.remaining ?? '—'} / ${data?.limit ?? '—'}`;
      summary.innerHTML = `${ICONS.clock}<span>API</span><span class="xg-badge">${escapeHtml(quota)}</span><span class="xg-api-caret">${ICONS.chevron}</span>`;
      summary.title = `${T.apiStatus} · ${T.apiRemaining} / ${T.apiLimit}`;
      summary.setAttribute('aria-label', `${T.apiStatus}: ${T.apiRemaining} / ${T.apiLimit}: ${quota}`);
      this.apiPanel.dataset.error = String(Boolean(data && data.status >= 400));
      if (!this.apiPanel.open) return;
      const body = this.apiPanel.querySelector('.xg-api-body');
      body.replaceChildren();
      if (!data) { body.textContent = T.apiWaiting; return; }
      const time = (value) => {
        const date = new Date(value);
        return value && Number.isFinite(date.getTime()) ? date.toLocaleString(dateLocale) : T.apiMissing;
      };
      const operation = el('div', 'xg-api-operation');
      operation.textContent = data.operation;
      const list = el('dl');
      for (const [label, value, raw] of [
        ['HTTP', String(data.status)],
        [T.apiReceived, time(data.receivedAt)],
        [T.apiLimit, data.limit],
        [T.apiRemaining, data.remaining],
        [T.apiReset, time(data.resetAt), data.reset],
        ['Retry-After', data.retryAfter],
        ...(data.retryAt ? [[T.apiRetry, time(data.retryAt)]] : []),
      ]) {
        const term = el('dt'); term.textContent = label;
        const detail = el('dd'); detail.textContent = value ?? T.apiMissing;
        if (raw != null) detail.title = raw;
        list.append(term, detail);
      }
      body.append(operation, list);
    }

    renderHeading() {
      if (!this.heading) return;
      const u = this.user;
      const shown = this.items.filter((it) => !this.isHidden(it)).length;
      const sub = u ? `@${escapeHtml(u.screenName)} · ${shown} ${T.photos} · ${this.postIds.size} ${T.posts}` : `@${escapeHtml(this.screenName)}`;
      this.heading.innerHTML = `${u?.avatar ? `<img class="xg-avatar" src="${escapeHtml(u.avatar)}" alt="">` : '<span class="xg-avatar"></span>'}
        <div class="xg-heading-text"><div class="xg-name">${escapeHtml(u?.name || this.screenName)}</div><div class="xg-sub" title="${escapeHtml(T.noReposts)}">${sub}</div></div>`;
    }

    renderMultiButton() {
      const label = settings.multiMedia === 'vertical' ? T.multiVertical : settings.multiMedia === 'collapse' ? T.multiCollapse : T.multiAll;
      this.multiBtn.innerHTML = `${ICONS.copies}<span class="xg-label">${label}</span>${ICONS.chevron}`;
      this.multiBtn.title = `${T.multiMedia}: ${label}`;
      this.multiBtn.setAttribute('aria-label', this.multiBtn.title);
      for (const item of this.multiMenu.querySelectorAll('.xg-menu-item')) item.setAttribute('aria-checked', String(item.dataset.multi === settings.multiMedia));
    }

    setMultiMedia(mode) {
      if (!['all', 'vertical', 'collapse'].includes(mode) || settings.multiMedia === mode) return;
      const current = this.visibleItems()[this.lightboxIndex];
      settings.multiMedia = mode;
      saveSettings();
      this.stopPreview();
      this.renderMultiButton();
      this.layout();
      if (current && this.lightboxIndex >= 0) {
        this.lightboxIndex = this.visibleItems().indexOf(current);
        this.renderLightbox();
      }
    }

    renderRepliesButton() {
      const mode = settings.replies || 'all';
      const label = mode === 'threads' ? T.repliesThreads : mode === 'none' ? T.repliesNone : T.repliesAll;
      this.repliesBtn.innerHTML = `${ICONS.reply}<span class="xg-label">${label}</span>${ICONS.chevron}`;
      const hidden = mode === 'all' ? 0 : this.items.filter((it) => this.isHiddenReply(it.tweet)).length;
      this.repliesBtn.title = mode === 'all' ? `${T.replies}: ${label}` : `${T.replies}: ${label} · ${hidden} ${T.hidden}`;
      this.repliesBtn.setAttribute('aria-label', this.repliesBtn.title);
      this.repliesBtn.classList.toggle('xg-active', mode !== 'all');
      for (const item of this.repliesMenu.querySelectorAll('.xg-menu-item')) item.setAttribute('aria-checked', String(item.dataset.replies === mode));
    }

    setReplies(mode) {
      if (!['all', 'threads', 'none'].includes(mode) || settings.replies === mode) return;
      const current = this.visibleItems()[this.lightboxIndex];
      settings.replies = mode;
      saveSettings();
      this.stopPreview();
      this.renderRepliesButton();
      this.renderHeading();
      this.layout();
      if (current && this.lightboxIndex >= 0) {
        this.lightboxIndex = this.visibleItems().indexOf(current);
        this.renderLightbox();
      }
    }

    renderSourceButton() {
      const [label, icon] = settings.source === 'media' ? [T.sourceMedia, ICONS.grid]
        : settings.source === 'originals' ? [T.sourcePosts, ICONS.rows] : [T.sourceAuto, ICONS.copies];
      this.sourceBtn.innerHTML = `${icon}<span>${label}</span>${ICONS.chevron}`;
      this.sourceBtn.title = `${T.source}: ${label}`;
      this.sourceBtn.setAttribute('aria-label', this.sourceBtn.title);
      for (const item of this.sourceMenu.querySelectorAll('.xg-menu-item')) item.setAttribute('aria-checked', String(item.dataset.source === settings.source));
    }

    renderSortButton() {
      this.sortBtn.disabled = settings.source === 'media';
      this.sortBtn.title = settings.source === 'media' ? T.mediaRecentOnly : T.sortBy;
      const popular = settings.sort !== 'recent';
      this.sortBtn.innerHTML = `${popular ? ICONS.heart : ICONS.clock}<span>${popular ? T.popular : T.recent}</span>${ICONS.chevron}`;
      for (const item of this.sortMenu.querySelectorAll('.xg-menu-item')) item.setAttribute('aria-checked', String(item.dataset.sort === (popular ? 'popular' : 'recent')));
    }

    renderLayoutButtons() {
      for (const [key, b] of Object.entries(this.layoutBtns)) b.setAttribute('aria-pressed', String((settings.layout || 'masonry') === key));
    }

    renderGroupButton() {
      this.groupBtn.classList.toggle('xg-active', Boolean(settings.groupByMonth));
      this.groupBtn.setAttribute('aria-pressed', String(Boolean(settings.groupByMonth)));
    }

    renderVideoButton() {
      const on = settings.showVideos !== false;
      this.videoBtn.classList.toggle('xg-active', on);
      this.videoBtn.setAttribute('aria-pressed', String(on));
    }

    renderSoundButton() {
      const on = this.soundOn();
      const pct = Math.round(this.volumeLevel() * 100);
      this.soundBtn.innerHTML = `${on ? ICONS.volume : ICONS.mute}<span class="xg-label">${T.sound}</span>${on ? `<span class="xg-badge">${pct}%</span>` : ''}`;
      this.soundBtn.classList.toggle('xg-active', on);
      this.soundBtn.setAttribute('aria-pressed', String(on));
      this.soundBtn.title = on ? `${T.soundOn} · ${pct}%` : T.soundOff;
      if (!this.volumeSlider) return;
      // The slider sits at 0 while muted (like other players); dragging it up turns the sound on.
      const shown = on ? pct : 0;
      this.volumeSlider.value = String(shown);
      this.volumeSlider.style.setProperty('--xg-vol', `${shown}%`);
      this.volumeValue.textContent = `${shown}%`;
      this.volumeMute.innerHTML = on ? ICONS.volume : ICONS.mute;
      this.volumeMute.title = on ? T.mute : T.unmute;
      this.volumeMute.setAttribute('aria-label', this.volumeMute.title);
    }

    soundOn() { return Boolean(settings.sound) && settings.volume > 0; }

    volumeLevel() { return Number.isFinite(settings.volume) ? clamp(settings.volume, 0, 1) : DEFAULT_SETTINGS.volume; }

    setSound(on) {
      settings.sound = Boolean(on);
      if (settings.sound && !(settings.volume > 0)) settings.volume = DEFAULT_SETTINGS.volume;
      saveSettings();
      this.renderSoundButton();
      this.applySound();
    }

    // Slider semantics: 0 mutes, anything above turns the sound on at that level.
    setVolume(volume) {
      settings.volume = clamp(Number(volume) || 0, 0, 1);
      settings.sound = settings.volume > 0;
      saveSettings();
      this.renderSoundButton();
      this.applySound();
    }

    toggleVolumeMenu(force) {
      const show = force ?? this.volumeMenu.hidden;
      if (show) { this.toggleMenu(false); this.toggleSourceMenu(false); this.toggleMultiMenu(false); this.toggleRepliesMenu(false); }
      this.volumeMenu.hidden = !show;
      this.soundBtn.setAttribute('aria-expanded', String(show));
      if (show) this.volumeSlider.focus({ preventScroll: true });
    }

    // GIFs are always silent; videos follow the sound toggle and the volume level.
    isMuted(media) { return media.kind === 'gif' || !this.soundOn(); }

    applyVolume(video, media) {
      video.muted = this.isMuted(media);
      video.volume = this.volumeLevel();
    }

    applySound() {
      if (this.preview) this.applyVolume(this.preview.video, this.preview.item.media);
      const video = this.lb?.querySelector('.xg-lb-video');
      const item = this.lightboxIndex >= 0 ? this.visibleItems()[this.lightboxIndex] : null;
      if (video && item) this.applyVolume(video, item.media);
    }

    setLayout(key) {
      settings.layout = key === 'rows' ? 'rows' : 'masonry';
      saveSettings();
      this.renderLayoutButtons();
      this.layout();
    }

    renderDupButton() {
      const hiddenCount = this.items.filter((it) => it.dupOf).length;
      this.dupBtn.classList.toggle('xg-active', settings.hideDuplicates);
      this.dupBtn.setAttribute('aria-pressed', String(settings.hideDuplicates));
      this.dupBtn.querySelector('.xg-badge').textContent = String(hiddenCount);
      this.dupBtn.title = `${T.hideDups} · ${hiddenCount} ${T.hidden}`;
    }

    toggleMenu(force) {
      const show = force ?? this.sortMenu.hidden;
      if (show) { this.toggleSourceMenu(false); this.toggleMultiMenu(false); this.toggleRepliesMenu(false); this.toggleVolumeMenu(false); }
      this.sortMenu.hidden = !show;
      this.sortBtn.setAttribute('aria-expanded', String(show));
    }

    toggleSourceMenu(force) {
      const show = force ?? this.sourceMenu.hidden;
      if (show) { this.toggleMenu(false); this.toggleMultiMenu(false); this.toggleRepliesMenu(false); this.toggleVolumeMenu(false); }
      this.sourceMenu.hidden = !show;
      this.sourceBtn.setAttribute('aria-expanded', String(show));
    }

    toggleMultiMenu(force) {
      const show = force ?? this.multiMenu.hidden;
      if (show) { this.toggleMenu(false); this.toggleSourceMenu(false); this.toggleRepliesMenu(false); this.toggleVolumeMenu(false); }
      this.multiMenu.hidden = !show;
      this.multiBtn.setAttribute('aria-expanded', String(show));
    }

    toggleRepliesMenu(force) {
      const show = force ?? this.repliesMenu.hidden;
      if (show) { this.toggleMenu(false); this.toggleSourceMenu(false); this.toggleMultiMenu(false); this.toggleVolumeMenu(false); }
      this.repliesMenu.hidden = !show;
      this.repliesBtn.setAttribute('aria-expanded', String(show));
    }

    setStatus(state, payload) {
      const s = this.status;
      if (!s) return;
      s.innerHTML = '';
      s.dataset.state = state;
      if (state === 'loading') {
        s.append(el('div', 'xg-spinner'), el('span', null, T.loading));
      } else if (state === 'end') {
        s.textContent = this.items.length ? T.end : T.empty;
      } else if (state === 'more') {
        const btn = el('button', 'xg-pill', T.loadMore);
        btn.addEventListener('click', () => { this.paused = false; this.emptyPages = 0; this.loadMore(); });
        s.append(btn);
      } else if (state === 'error') {
        const btn = el('button', 'xg-pill', T.retry);
        btn.addEventListener('click', () => { this.ended = false; if (!this.user) this.reopen(); else this.loadMore(); });
        s.append(el('span', null, escapeHtml(payload || T.error)), btn);
      } else if (state === 'rate-limited') {
        const label = el('span');
        const tick = () => {
          const ms = payload - Date.now();
          if (ms <= 0) { clearInterval(this.retryTimer); this.retryTimer = null; if (!this.user) this.reopen(); else this.loadMore(); return; }
          const sec = Math.ceil(ms / 1000);
          label.textContent = `${T.rateLimited} ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
        };
        if (this.retryTimer) clearInterval(this.retryTimer);
        this.retryTimer = setInterval(tick, 1000);
        tick();
        s.append(el('div', 'xg-spinner'), label);
      }
    }

    // Retry the initial user lookup after an error.
    async reopen() {
      const session = this.session;
      this.setStatus('loading');
      try {
        const user = await fetchUser(this.screenName);
        if (session !== this.session) return;
        this.user = user;
        this.renderHeading();
        this.loadMore();
      } catch (e) { if (session === this.session) this.showError(e); }
    }

    showError(e) {
      console.warn('[X Gallery]', e);
      if (e instanceof ApiError && e.status === 429) this.setStatus('rate-limited', e.retryAt);
      else this.setStatus('error', e?.message || T.error);
    }

    /* ── settings ──────────────────────────────────────────────────────── */

    setColumns(n) {
      n = clamp(Number.isFinite(n) ? Math.round(n) : DEFAULT_SETTINGS.columns, 1, 200);
      settings.columns = n;
      saveSettings();
      this.colsInput.value = n;
      this.layout();
    }

    setSort(sort) {
      if (settings.source === 'media' && sort !== 'recent') return;
      if (settings.sort === sort) return;
      settings.sort = sort;
      saveSettings();
      this.renderSortButton();
      this.restartTimeline();
    }

    setSource(source) {
      if (!['auto', 'media', 'originals'].includes(source) || settings.source === source) return;
      settings.source = source;
      if (source === 'media') settings.sort = 'recent';
      saveSettings();
      this.renderSourceButton();
      this.toggleSourceMenu(false);
      this.toggleMenu(false);
      this.renderSortButton();
      this.restartTimeline();
    }

    restartTimeline() {
      this.closeLightbox();
      this.session++;
      this.grid.innerHTML = '';
      this.grid.style.height = '0px';
      this.resetState();
      this.root.scrollTop = 0;
      this.renderHeading();
      this.renderDupButton();
      this.loadMore();
    }

    /* ── data loading ──────────────────────────────────────────────────── */

    maybeLoad() {
      if (!this.isOpen || !this.user || this.loading || this.ended || this.paused || this.retryTimer) return;
      if (this.status.dataset.state === 'error') return;
      this.loadMore();
    }

    async loadMore() {
      if (!this.isOpen || !this.user || this.loading || this.ended) return;
      this.loading = true;
      this.paused = false;
      if (this.retryTimer) clearInterval(this.retryTimer);
      this.retryTimer = null;
      const session = this.session;
      this.setStatus('loading');
      try {
        const source = this.source || (settings.source === 'auto'
          ? (settings.sort === 'recent' ? 'media' : 'originals') : settings.source);
        const { tweets, cursor } = await fetchTimelinePage(settings.sort, source, this.user.id, this.cursor);
        if (session !== this.session) return;
        if (settings.source === 'auto' && source === 'media' && !this.cursor && !tweets.length) {
          // Empty media timeline on the very first page (age-restricted account): use the chronological originals instead.
          this.source = 'originals';
          this.loading = false;
          return this.loadMore();
        }
        this.source = source;
        const added = this.addTweets(tweets);
        if (!cursor || cursor === this.cursor) this.ended = true;
        this.cursor = cursor;
        this.emptyPages = added ? 0 : this.emptyPages + 1;
        if (this.emptyPages >= MAX_EMPTY_PAGES) this.paused = true;
        this.loading = false;
        if (this.ended) this.setStatus('end');
        else if (this.paused) this.setStatus('more');
        else if (this.sentinelVisible) this.loadMore();
        else this.setStatus('idle');
      } catch (e) {
        if (session !== this.session) return;
        this.loading = false;
        this.showError(e);
      }
    }

    addTweets(tweets) {
      let added = 0;
      const frag = document.createDocumentFragment();
      for (const tweet of tweets) {
        if (tweet.isRetweet || (tweet.userId && tweet.userId !== this.user.id)) continue;
        if (!tweet.media.length) continue;
        this.postIds.add(tweet.id);
        for (const media of tweet.media) {
          const id = `${tweet.id}:${media.key}`;
          if (this.itemIds.has(id)) continue;
          this.itemIds.add(id);
          const item = { id, tweet, media, order: this.items.length, dupOf: null, el: null, img: null, variant: null, sig: null, noHash: false };
          const exact = this.keyIndex.get(media.key);
          if (exact) item.dupOf = exact.dupOf || exact; else this.keyIndex.set(media.key, item);
          this.items.push(item);
          frag.append(this.renderItem(item));
          added++;
        }
      }
      if (added) {
        this.grid.append(frag);
        this.layout();
        this.renderHeading();
        this.renderDupButton();
        this.renderRepliesButton();
      }
      return added;
    }

    /* ── cards ─────────────────────────────────────────────────────────── */

    renderItem(item) {
      const { tweet, media } = item;
      const card = el('article', 'xg-card');
      card.dataset.id = item.id;
      card.dataset.kind = media.kind;
      card.dataset.xgDownloadUrl = downloadTarget(item).url;  // the companion hashes exactly what a download would fetch

      const link = el('a', 'xg-media');
      link.href = `${tweet.url}/${media.kind === 'photo' ? 'photo' : 'video'}/${media.index}`;
      link.target = '_blank'; link.rel = 'noopener';
      const img = el('img', 'xg-img');
      img.loading = 'lazy'; img.decoding = 'async';
      img.alt = tweet.text.slice(0, 200);
      img.crossOrigin = 'anonymous';
      img.addEventListener('load', () => { img.classList.add('xg-loaded'); this.onImageLoad(item); });
      img.addEventListener('error', () => {
        if (img.getAttribute('crossorigin') !== null) { item.noHash = true; img.removeAttribute('crossorigin'); const src = img.src; img.removeAttribute('src'); img.src = src; }
      });
      link.append(img);
      if (tweet.media.length > 1) link.append(el('span', 'xg-count', `${ICONS.copies}${media.index}/${tweet.media.length}`));
      if (media.kind !== 'photo') {
        item.playOverlay = el('span', 'xg-play-center', ICONS.play);
        item.playOverlay.setAttribute('aria-hidden', 'true');
        link.append(item.playOverlay);
        link.append(el('span', 'xg-play', `${ICONS.play}${media.kind === 'gif' ? 'GIF' : formatDuration(media.duration)}`));
        card.addEventListener('mouseenter', () => this.startPreview(item, link));
        card.addEventListener('mouseleave', () => {
          if (this.preview?.item === item && !this.preview.seeking) this.stopPreview();
        });
        link.addEventListener('dragstart', (e) => { if (this.preview?.seeking) e.preventDefault(); });
      }
      link.addEventListener('click', (e) => {
        if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        this.openLightbox(item);
      });

      const meta = el('footer', 'xg-meta');
      meta.innerHTML = `<span class="xg-likes" title="${T.likes}">${ICONS.heart}<span>${formatCount(tweet.favs)}</span></span>
        <span class="xg-date" title="${escapeHtml(tweet.createdAt.toLocaleString())}">${formatDate(tweet.createdAt)}</span><span class="xg-spacer"></span>
        <button class="xg-icon-btn xg-search" title="${T.searchHint}" aria-label="${T.search}">${ICONS.search}</button>
        <button class="xg-icon-btn xg-dl" title="${T.download}" aria-label="${T.download}">${ICONS.download}</button>
        <a class="xg-icon-btn xg-open" href="${escapeHtml(tweet.url)}" target="_blank" rel="noopener" title="${T.open}" aria-label="${T.open}">${ICONS.external}</a>`;
      meta.querySelector('.xg-search').addEventListener('click', () => openInBackground(searchUrl(media)));
      const dl = meta.querySelector('.xg-dl');
      dl.addEventListener('click', () => downloadItem(item, dl));

      card.append(link, meta);
      item.nav = [];
      if (tweet.media.length > 1) for (const [delta, name, icon, label] of [[-1, 'prev', ICONS.chevronLeft, T.prev], [1, 'next', ICONS.chevronRight, T.next]]) {
        const button = el('button', `xg-card-nav xg-card-${name}`, icon);
        button.hidden = true;
        button.setAttribute('aria-label', label);
        button.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.stepCard(item, delta, name); });
        card.append(button);
        item.nav.push(button);
      }
      item.el = card; item.img = img;
      return card;
    }

    stepCard(item, delta, direction) {
      const stack = item.stack;
      if (!stack || stack.length < 2) return;
      const next = stack[(stack.indexOf(item) + delta + stack.length) % stack.length];
      this.stopPreview();
      this.cardSelections.set(item.tweet.id, next.id);
      this.layout();
      next.el.querySelector(`.xg-card-${direction}`)?.focus({ preventScroll: true });
      if (next.el.matches(':hover')) this.startPreview(next, next.el.querySelector('.xg-media'));
    }

    // Keep the media model intact; only choose which existing card occupies each grid slot.
    cardStacks(visible) {
      const byPost = new Map();
      const stacks = [];
      for (const item of visible) {
        const media = item.tweet.media;
        const collapse = media.length > 1 && (settings.multiMedia === 'collapse'
          || (settings.multiMedia === 'vertical' && media.every((m) => m.w > 0 && m.h / m.w >= 1.25)));
        if (!collapse) { stacks.push([item]); continue; }
        let stack = byPost.get(item.tweet.id);
        if (!stack) { stack = []; byPost.set(item.tweet.id, stack); stacks.push(stack); }
        stack.push(item);
      }
      return stacks;
    }

    startPreview(item, link) {
      if (!this.isOpen || this.lightboxIndex >= 0 || item.el.hidden || !item.media.videoUrl) return;
      this.stopPreview();
      const video = el('video', 'xg-preview');
      this.applyVolume(video, item.media);
      video.loop = true;
      video.playsInline = true;
      video.preload = 'none';
      video.poster = item.img.currentSrc || item.img.src;
      const seek = this.buildSeekBar(item, video);
      this.preview = { item, video, seek, seeking: false, raf: 0 };
      const stopOnFailure = () => {
        if (this.preview?.video === video) this.stopPreview();
      };
      video.addEventListener('error', stopOnFailure, { once: true });
      video.addEventListener('playing', () => {
        if (this.preview?.video !== video) return;
        item.playOverlay?.classList.add('xg-playing');
        seek.el.hidden = false;
        this.trackProgress();
      });
      link.insertBefore(video, item.img.nextSibling);
      link.append(seek.el);
      video.src = item.media.videoUrl;
      video.play().catch(stopOnFailure);
    }

    // Progress bar under a playing preview; click or drag seeks. Hidden until playback starts.
    buildSeekBar(item, video) {
      const bar = el('div', 'xg-seek');
      const track = el('div', 'xg-seek-track');
      const fill = el('div', 'xg-seek-fill');
      track.append(fill);
      bar.append(track);
      bar.hidden = true;
      bar.setAttribute('role', 'slider');
      bar.setAttribute('aria-label', T.seek);
      const active = () => this.preview?.video === video;
      const seekTo = (e) => {
        const rect = bar.getBoundingClientRect();
        const t = rect.width ? clamp((e.clientX - rect.left) / rect.width, 0, 1) : 0;
        if (Number.isFinite(video.duration) && video.duration > 0) video.currentTime = t * video.duration;
        fill.style.transform = `scaleX(${t})`;
      };
      bar.addEventListener('pointerdown', (e) => {
        if (e.button !== 0 || !active()) return;
        e.preventDefault(); e.stopPropagation();
        this.preview.seeking = true;
        bar.classList.add('xg-seeking');
        try { bar.setPointerCapture(e.pointerId); } catch { /* capture unsupported */ }
        seekTo(e);
      });
      bar.addEventListener('pointermove', (e) => { if (active() && this.preview.seeking) seekTo(e); });
      const release = (e) => {
        if (!active() || !this.preview.seeking) return;
        this.preview.seeking = false;
        bar.classList.remove('xg-seeking');
        // The card's mouseleave is ignored while dragging; stop now if the pointer ended outside it.
        const under = document.elementFromPoint(e.clientX, e.clientY);
        if (!under || !item.el.contains(under)) this.stopPreview();
      };
      bar.addEventListener('pointerup', release);
      bar.addEventListener('pointercancel', release);
      bar.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); });
      return { el: bar, fill };
    }

    trackProgress() {
      const preview = this.preview;
      if (!preview) return;
      const { video, seek } = preview;
      const tick = () => {
        if (this.preview !== preview) return;
        if (!preview.seeking && video.duration > 0) seek.fill.style.transform = `scaleX(${video.currentTime / video.duration})`;
        preview.raf = requestAnimationFrame(tick);
      };
      if (preview.raf) cancelAnimationFrame(preview.raf);
      tick();
    }

    stopPreview() {
      if (!this.preview) return;
      const { video, item, seek, raf } = this.preview;
      this.preview = null;
      if (raf) cancelAnimationFrame(raf);
      item.playOverlay?.classList.remove('xg-playing');
      seek?.el.remove();
      video.pause();
      video.removeAttribute('src');
      video.load();
      video.remove();
    }

    onImageLoad(item) {
      if (item.sig || item.noHash || item.dupOf) return;
      try {
        item.sig = Signature.compute(item.img);
      } catch { item.noHash = true; return; }
      this.indexSignature(item);
    }

    indexSignature(item) {
      const ratio = item.media.w / item.media.h;
      // Only compare like with like: a video poster must not be folded into a photo of the same frame.
      const matches = this.signed.filter((other) => other !== item
        && other.media.kind === item.media.kind
        && Math.abs(other.media.w / other.media.h - ratio) / ratio <= DUP_MAX_RATIO_DIFF
        && Signature.similar(other.sig, item.sig));
      this.signed.push(item);
      if (!matches.length) return;
      const group = new Set([item, ...matches]);
      for (const m of matches) if (m.dupOf) group.add(m.dupOf);
      let rep = item;
      for (const g of group) if (g.order < rep.order) rep = g;
      for (const g of group) g.dupOf = g === rep ? null : rep;
      for (const it of this.items) if (it.dupOf && it.dupOf !== rep && group.has(it.dupOf)) it.dupOf = rep;
      this.renderDupButton();
      this.renderHeading();
      if (settings.hideDuplicates) this.scheduleLayout();
    }

    isHidden(item) {
      return (settings.hideDuplicates && Boolean(item.dupOf)) || (settings.showVideos === false && item.media.kind !== 'photo')
        || this.isHiddenReply(item.tweet) || Boolean(item.el?.dataset?.xgHide);
    }

    // "threads" keeps the replies an author wrote under their own post (a thread continuing the same work)
    // and drops the ones addressed to somebody else; "none" drops every reply.
    isHiddenReply(tweet) {
      if (!tweet?.isReply || !settings.replies || settings.replies === 'all') return false;
      if (settings.replies === 'none') return true;
      return tweet.replyToUserId !== tweet.userId;
    }

    // Items in on-screen order (grouping may reorder them); drives the lightbox.
    visibleItems() { return this.ordered || this.items.filter((it) => !this.isHidden(it)); }

    /* ── layout: masonry or aligned rows, optionally grouped by month ──── */

    layout() {
      if (!this.root) return;
      const n = Math.max(1, settings.columns);
      const width = this.grid.clientWidth;
      const colW = Math.max(1, (width - GRID_GAP * (n - 1)) / n);
      const compact = colW < COMPACT_BELOW;
      const rows = settings.layout === 'rows';
      this.root.classList.toggle('xg-narrow', colW < NARROW_BELOW);
      this.root.classList.toggle('xg-compact', compact);
      this.root.classList.toggle('xg-tiny', colW < TINY_BELOW);
      this.root.classList.toggle('xg-rows', rows);
      const metaH = compact ? META_HEIGHT_COMPACT : META_HEIGHT;

      const visible = [];
      for (const item of this.items) {
        if (!item.el) continue;
        if (this.isHidden(item)) {
          if (this.preview?.item === item) this.stopPreview();
          item.el.hidden = true;
          continue;
        }
        item.el.hidden = false;
        visible.push(item);
      }

      const cards = [];
      for (const stack of this.cardStacks(visible)) {
        const active = stack.find((it) => it.id === this.cardSelections.get(it.tweet.id)) || stack[0];
        const ratio = stack[0].media.h / stack[0].media.w;
        for (const item of stack) {
          item.stack = stack;
          item.frameRatio = ratio;
          item.el.hidden = item !== active;
          item.el.classList.toggle('xg-stacked', stack.length > 1);
          for (const button of item.nav) button.hidden = stack.length < 2;
          if (item !== active && this.preview?.item === item) this.stopPreview();
        }
        cards.push(active);
      }
      const groups = settings.groupByMonth ? this.groupByMonth(cards) : [{ key: null, items: cards }];
      const usedHeaders = new Set();
      const ctx = { n, colW, metaH };
      let y = 0;
      this.ordered = [];
      for (const group of groups) {
        if (group.key) {
          const header = this.groupHeader(group);
          header.style.top = `${Math.round(y)}px`;
          header.hidden = false;
          usedHeaders.add(group.key);
          y += GROUP_HEADER_H;
        }
        y = rows ? this.layoutRows(group.items, y, ctx) : this.layoutMasonry(group.items, y, ctx);
        for (const item of group.items) this.ordered.push(...item.stack);
      }
      for (const [key, header] of this.groupHeaders) if (!usedHeaders.has(key)) header.hidden = true;
      this.grid.style.height = `${Math.max(0, Math.round(y) - GRID_GAP)}px`;
    }

    // Masonry: each card goes to the currently shortest column. Returns the bottom edge.
    layoutMasonry(items, y0, { n, colW, metaH }) {
      const heights = new Array(n).fill(y0);
      for (const item of items) {
        let col = 0;
        for (let i = 1; i < n; i++) if (heights[i] < heights[col]) col = i;
        const imgH = Math.round(colW * item.frameRatio);
        this.placeCard(item, col, heights[col], colW, imgH);
        heights[col] += imgH + metaH + GRID_GAP;
      }
      return items.length ? Math.max(...heights) : y0;
    }

    // Aligned rows: every card in a row shares the tallest image height (capped), images fit inside.
    layoutRows(items, y0, { n, colW, metaH }) {
      let y = y0;
      const maxImgH = Math.round(colW * ROW_MAX_RATIO);
      for (let i = 0; i < items.length; i += n) {
        const row = items.slice(i, i + n);
        const imgH = Math.min(maxImgH, Math.max(...row.map((it) => Math.round(colW * it.frameRatio))));
        row.forEach((item, col) => this.placeCard(item, col, y, colW, imgH));
        y += imgH + metaH + GRID_GAP;
      }
      return y;
    }

    placeCard(item, col, top, colW, imgH) {
      const card = item.el;
      card.style.width = `${colW}px`;
      card.style.left = `${Math.round(col * (colW + GRID_GAP))}px`;
      card.style.top = `${Math.round(top)}px`;
      card.style.setProperty('--xg-img-h', `${imgH}px`);
      this.ensureVariant(item, colW);
    }

    // Buckets items by calendar month, newest month first; order inside a month follows the current sort.
    groupByMonth(items) {
      const buckets = new Map();
      for (const item of items) {
        const key = monthKey(item.tweet.createdAt);
        let b = buckets.get(key);
        if (!b) { b = { key, date: item.tweet.createdAt, items: [] }; buckets.set(key, b); }
        b.items.push(item);
      }
      return [...buckets.values()].sort((a, b) => (a.key < b.key ? 1 : a.key > b.key ? -1 : 0));
    }

    groupHeader(group) {
      let header = this.groupHeaders.get(group.key);
      if (!header) {
        header = el('div', 'xg-group', `<span class="xg-group-title">${escapeHtml(monthLabel(group.date))}</span><span class="xg-group-count"></span>`);
        this.groupHeaders.set(group.key, header);
        this.grid.append(header);
      }
      header.querySelector('.xg-group-count').textContent = `${group.items.reduce((n, it) => n + it.stack.length, 0)} ${T.photos}`;
      return header;
    }

    ensureVariant(item, colW) {
      const want = pickVariant(item.media, colW);
      if (item.variant && VARIANT_RANK[want] <= VARIANT_RANK[item.variant]) return;
      item.variant = want;
      item.img.src = mediaUrl(item.media, want);
    }

    /* ── lightbox ──────────────────────────────────────────────────────── */

    openLightbox(item) {
      const list = this.visibleItems();
      const idx = list.indexOf(item);
      if (idx < 0) return;
      this.stopPreview();
      if (!this.lb) {
        const lb = el('div', 'xg-lb');
        lb.setAttribute('role', 'dialog');
        lb.innerHTML = `
          <div class="xg-lb-top">
            <button class="xg-round xg-lb-close" title="${T.close}" aria-label="${T.close}">${ICONS.close}</button>
            <span class="xg-lb-counter"></span>
          </div>
          <div class="xg-lb-stage">
            <button class="xg-lb-nav xg-lb-prev" title="${T.prev}" aria-label="${T.prev}">${ICONS.chevronLeft}</button>
            <img class="xg-lb-img" alt="">
            <video class="xg-lb-video" playsinline preload="metadata" hidden></video>
            <div class="xg-lb-loader xg-spinner" role="status" aria-label="${T.loading}" hidden></div>
            <button class="xg-lb-nav xg-lb-next" title="${T.next}" aria-label="${T.next}">${ICONS.chevronRight}</button>
          </div>
          <div class="xg-lb-bottom">
            <div class="xg-lb-text"></div>
            <div class="xg-lb-stats"></div>
            <div class="xg-lb-actions">
              <button class="xg-pill xg-lb-search" title="${T.searchHint}">${ICONS.search}<span>${T.search}</span></button>
              <button class="xg-pill xg-lb-dl">${ICONS.download}<span>${T.download}</span></button>
              <button class="xg-pill xg-lb-copy" aria-keyshortcuts="Control+C Meta+C">${ICONS.copies}<span aria-live="polite">${T.copy}</span></button>
              <a class="xg-pill xg-lb-open" target="_blank" rel="noopener">${ICONS.external}<span>${T.open}</span></a>
            </div>
          </div>`;
        lb.querySelector('.xg-lb-close').addEventListener('click', () => this.closeLightbox());
        lb.querySelector('.xg-lb-prev').addEventListener('click', (e) => { e.stopPropagation(); this.stepLightbox(-1); });
        lb.querySelector('.xg-lb-next').addEventListener('click', (e) => { e.stopPropagation(); this.stepLightbox(1); });
        lb.querySelector('.xg-lb-stage').addEventListener('click', (e) => { if (e.target === e.currentTarget || e.target.classList.contains('xg-lb-img')) this.closeLightbox(); });
        lb.querySelector('.xg-lb-dl').addEventListener('click', (e) => { const it = this.visibleItems()[this.lightboxIndex]; if (it) downloadItem(it, e.currentTarget); });
        lb.querySelector('.xg-lb-copy').addEventListener('click', () => this.copyLightboxPhoto());
        lb.querySelector('.xg-lb-search').addEventListener('click', () => { const it = this.visibleItems()[this.lightboxIndex]; if (it) openInBackground(searchUrl(it.media)); });
        // The spinner stays while a sharper photo is still pending and while the player is buffering.
        const lbImg = lb.querySelector('.xg-lb-img');
        lbImg.addEventListener('load', () => this.onLightboxImageSettled());
        lbImg.addEventListener('error', () => this.onLightboxImageSettled());
        const lbVideo = lb.querySelector('.xg-lb-video');
        for (const type of ['canplay', 'playing', 'error']) lbVideo.addEventListener(type, () => this.setLightboxLoading(false));
        lbVideo.addEventListener('waiting', () => { if (lbVideo.src) this.setLightboxLoading(true); });
        // Mute / volume changes made in the native player keep the header sound control in sync.
        lb.querySelector('.xg-lb-video').addEventListener('volumechange', (e) => {
          const player = e.currentTarget;
          const it = this.lightboxIndex >= 0 ? this.visibleItems()[this.lightboxIndex] : null;
          if (!it || it.media.kind === 'gif' || !player.src) return;
          const on = !player.muted && player.volume > 0;
          if (on === this.soundOn() && (!on || Math.abs(player.volume - settings.volume) < 0.005)) return;
          settings.sound = on;
          if (on) settings.volume = player.volume;
          saveSettings();
          this.renderSoundButton();
        });
        // Mouse wheel / touchpad flips photos; the grid underneath must not scroll meanwhile.
        lb.addEventListener('wheel', (e) => { e.preventDefault(); this.onLightboxWheel(e); }, { passive: false });
        this.lb = lb;
      }
      this.wheelAcc = 0;
      this.wheelAt = 0;
      this.root.append(this.lb);
      this.lightboxIndex = idx;
      this.renderLightbox();
    }

    onLightboxWheel(e) {
      const now = performance.now();
      const raw = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const scale = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? 800 : 1;  // lines / pages → px
      const delta = raw * scale;
      if (!delta) return;
      // A mouse-wheel notch arrives as one big delta and flips at once; touchpads send many small
      // deltas that accumulate, followed by inertia that is swallowed for WHEEL_COOLDOWN.
      const notch = Math.abs(delta) >= WHEEL_STEP;
      if (now - this.wheelAt < (notch ? 40 : WHEEL_COOLDOWN)) return;
      if (Math.sign(delta) !== Math.sign(this.wheelAcc)) this.wheelAcc = 0;   // direction change resets
      this.wheelAcc += delta;
      if (Math.abs(this.wheelAcc) < WHEEL_STEP) return;
      this.stepLightbox(this.wheelAcc > 0 ? 1 : -1);
      this.wheelAcc = 0;
      this.wheelAt = now;
    }

    async copyLightboxPhoto() {
      const item = this.visibleItems()[this.lightboxIndex];
      if (item?.media.kind !== 'photo') return;
      const button = this.lb.querySelector('.xg-lb-copy');
      if (button.classList.contains('xg-busy')) return;
      const label = button.querySelector('span');
      clearTimeout(this.copyFeedbackTimer);
      button.classList.add('xg-busy');
      label.textContent = T.copying;
      let result = T.copied;
      try {
        if (typeof ClipboardItem !== 'function' || !navigator.clipboard?.write) throw new Error('Image clipboard unavailable');
        const png = photoPng(item.media);
        // A rejected clipboard write may never consume the image promise.
        png.catch(() => {});
        // Start the write in the input event to preserve transient user activation.
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })]);
      } catch {
        result = T.copyFailed;
      } finally {
        button.classList.remove('xg-busy');
      }
      if (this.visibleItems()[this.lightboxIndex] === item) {
        label.textContent = result;
        this.copyFeedbackTimer = setTimeout(() => { label.textContent = T.copy; }, 2500);
      }
    }

    stepLightbox(delta) {
      const list = this.visibleItems();
      if (!list.length) return;
      this.lightboxIndex = (this.lightboxIndex + delta + list.length) % list.length;
      this.renderLightbox();
      if (this.lightboxIndex >= list.length - 3) this.maybeLoad();
    }

    renderLightbox() {
      const list = this.visibleItems();
      const item = list[this.lightboxIndex];
      if (!item) { this.closeLightbox(); return; }
      const { tweet, media } = item;
      const lb = this.lb;
      const img = lb.querySelector('.xg-lb-img');
      const video = lb.querySelector('.xg-lb-video');
      const copy = lb.querySelector('.xg-lb-copy');
      const isVideo = media.kind !== 'photo';
      img.hidden = isVideo;
      video.hidden = !isVideo;
      copy.hidden = isVideo;
      copy.querySelector('span').textContent = T.copy;
      if (isVideo) {
        img.removeAttribute('src');
        this.lbPending = null;
        this.setLightboxLoading(true);
        video.poster = mediaUrl(media, 'large');
        video.loop = media.kind === 'gif';
        this.applyVolume(video, media);
        video.controls = media.kind !== 'gif';
        video.src = media.videoUrl;
        video.play().catch(() => { /* autoplay may be blocked until the user interacts */ });
      } else {
        this.stopVideo();
        this.showLightboxPhoto(item, img);
        img.alt = tweet.text.slice(0, 200);
      }
      lb.querySelector('.xg-lb-counter').textContent = `${this.lightboxIndex + 1} / ${list.length}`;
      lb.querySelector('.xg-lb-text').textContent = tweet.text;
      lb.querySelector('.xg-lb-stats').innerHTML = `
        <span title="${T.likes}">${ICONS.heart}${formatCount(tweet.favs)}</span>
        <span title="${T.reposts}">${ICONS.repost}${formatCount(tweet.retweets)}</span>
        ${tweet.views ? `<span title="${T.views}">${ICONS.views}${formatCount(tweet.views)}</span>` : ''}
        <span>${formatDate(tweet.createdAt)}</span>`;
      lb.querySelector('.xg-lb-open').href = tweet.url;
      // Preload neighbouring photos for snappy navigation.
      for (const d of [1, -1]) {
        const nb = list[(this.lightboxIndex + d + list.length) % list.length];
        if (nb && nb !== item && nb.media.kind === 'photo') new Image().src = mediaUrl(nb.media, 'large');
      }
    }

    // Shows the variant the grid already holds (cached, so it paints at once) and swaps in the large one
    // when it has loaded, so flipping never leaves the previous photo on screen while the next downloads.
    showLightboxPhoto(item, img) {
      const large = mediaUrl(item.media, 'large');
      const current = item.img?.currentSrc || item.img?.src || '';
      const token = (this.lbPhotoToken = (this.lbPhotoToken || 0) + 1);
      this.lbPending = null;
      this.setLightboxLoading(true);
      if (!current || current === large || (item.variant && VARIANT_RANK[item.variant] >= VARIANT_RANK.large)) {
        img.src = current || large;
        this.onLightboxImageSettled(img);
        return;
      }
      const loader = new Image();
      loader.onload = () => {
        if (this.lbPhotoToken !== token) return;
        this.lbPending = null;
        if (this.lightboxIndex >= 0) img.src = large;
        this.onLightboxImageSettled(img);
      };
      loader.onerror = () => { if (this.lbPhotoToken === token) { this.lbPending = null; this.setLightboxLoading(false); } };
      loader.src = large;
      // A cached large variant (e.g. preloaded as a neighbour) is complete right away: skip the low-res step.
      if (loader.complete && loader.naturalWidth > 0) { img.src = large; this.onLightboxImageSettled(img); return; }
      this.lbPending = token;
      img.src = current;
    }

    // Hides the spinner once the shown image is ready, unless a sharper variant is still on its way.
    // Setting src to an already complete image may not fire load again, hence the explicit check.
    onLightboxImageSettled(img) {
      if (this.lbPending) return;
      if (img && !(img.complete && img.naturalWidth > 0)) return;
      this.setLightboxLoading(false);
    }

    setLightboxLoading(on) {
      const loader = this.lb?.querySelector('.xg-lb-loader');
      if (loader) loader.hidden = !on;
    }

    stopVideo() {
      const video = this.lb?.querySelector('.xg-lb-video');
      if (!video || !video.src) return;
      video.pause();
      video.removeAttribute('src');
      video.load();
    }

    closeLightbox() {
      if (this.lightboxIndex < 0) return;
      this.lightboxIndex = -1;
      this.lbPending = null;
      this.setLightboxLoading(false);
      this.stopVideo();
      this.lb?.remove();
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Profile tab injection + routing
     ═══════════════════════════════════════════════════════════════════════ */

  const gallery = new Gallery();

  function findProfileTablist() {
    const profile = location.pathname.split('/')[1]?.toLowerCase();
    if (!profile) return null;
    for (const tablist of document.querySelectorAll('main [role="tablist"], [data-testid="primaryColumn"] [role="tablist"]')) {
      for (const media of tablist.querySelectorAll('a[role="tab"][href]')) {
        const path = media.getAttribute('href').split(/[?#]/, 1)[0];
        const match = path.match(/^\/([A-Za-z0-9_]{1,15})\/media$/);
        if (match?.[1].toLowerCase() === profile) return { tablist, media, screenName: match[1] };
      }
    }
    return null;
  }

  function ensureTab() {
    const info = findProfileTablist();
    if (!info) return;
    const { tablist, media, screenName } = info;
    const existing = tablist.querySelector('.xg-tab');
    if (existing) {
      if (existing.dataset.screenName !== screenName) { existing.dataset.screenName = screenName; existing.href = `/${screenName}#gallery`; }
      return;
    }
    const presentation = media.closest('[role="presentation"]');
    const template = presentation && tablist.contains(presentation) ? presentation : media;
    const clone = template.cloneNode(true);
    const link = template === media ? clone : clone.querySelector('a[role="tab"]');
    link.classList.add('xg-tab');
    link.dataset.screenName = screenName;
    link.href = `/${screenName}#gallery`;
    link.setAttribute('aria-selected', 'false');
    for (const attr of ['id', 'tabindex', 'aria-label', 'aria-controls', 'aria-current', 'data-active', 'data-composite-item-active']) link.removeAttribute(attr);

    const underline = link.querySelector('[data-tab-underline]');
    if (underline) underline.remove();
    else {
      // The old layout puts a separate underline after the label inside the same container.
      const labelHost = link.querySelector('div[dir]') || link.firstElementChild?.firstElementChild;
      if (labelHost) while (labelHost.children.length > 1) labelHost.lastElementChild.remove();
    }
    // The new layout uses a visible label and a hidden copy that sets its width.
    const labels = [...link.querySelectorAll('span')].filter((span) => !span.children.length && span.textContent.trim());
    for (const label of labels.length ? labels : [link]) label.textContent = T.tab;
    link.addEventListener('click', (e) => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
      e.preventDefault(); e.stopPropagation();
      gallery.open(link.dataset.screenName);
    });
    tablist.append(clone);
  }

  function handleHashRoute() {
    if (location.hash !== '#gallery' || gallery.isOpen) return;
    const info = findProfileTablist();
    if (info) gallery.open(info.screenName, { pushHistory: false });
  }

  const onDomChange = debounce(() => { ensureTab(); handleHashRoute(); }, 120);
  new MutationObserver(onDomChange).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('popstate', () => {
    if (gallery.isOpen && location.hash !== '#gallery') gallery.close({ fromPopState: true });
    else if (!gallery.isOpen && location.hash === '#gallery') handleHashRoute();
  });
  onDomChange();
})();
