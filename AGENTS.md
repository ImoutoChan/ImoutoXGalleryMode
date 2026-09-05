# Instructions for AI agents

Agents (Claude Code, Codex, Cursor and others) read this file before doing any work in the repository.
The rules are mandatory and take precedence over the tool's built-in habits.

## Language

- Everything in the repository is in English: code comments, changelogs, documentation, this file,
  commit messages, pull requests, issues.
- The only exceptions are the runtime i18n tables of the userscripts (`STRINGS.ru` in the main script,
  the `ru` branch of `T` in the companion) and the localized `@name:ru` / `@description:ru` metadata:
  those are product features shown to Russian-speaking users, not repository language.
- The user may write in Russian; reply in the user's language, but write into the repository in English.

## Commits and authorship

- **Never add your own authorship.** Commit messages must not contain `Co-Authored-By` trailers,
  lines like "Generated with …", "🤖 …", links to agent sessions, or mentions of the model or tool.
  If the tool adds such lines by default, remove them.
- Never change the commit author: no `--author`, no edits of `user.name` / `user.email`, no
  `GIT_AUTHOR_*`. The author is always the repository owner configured in git.
- The same applies to pull request descriptions, tags and merge commit messages.
- Commit, push, create branches or tags only when the user explicitly asks for it.
- Commit message: a short imperative subject (up to ~72 characters), then, when needed, a blank line
  and a body explaining what changed and why. In English.

## What the project is

**X Gallery Mode** is a Tampermonkey/Violentmonkey userscript: a "Gallery" tab on x.com profiles with
full-size photos and videos, any number of columns, downloads, like counts, duplicate hiding and the
Popular / Most recent sort orders. No build step and no dependencies: every script is a single file.

| File | Purpose |
| --- | --- |
| `x-gallery-mode.user.js` | Main script. `==UserScript==` metadata block, then the `Changelog` comment, then an IIFE. |
| `x-gallery-local-check.user.js` | Separate companion: MD5s of originals are checked against the local Kekkai API (`localhost:11303`). Works only on top of an open gallery of the main script. |
| `tests/*.test.js` | `node:test` tests: they run slices of the real script code in `vm` with stubbed API responses. |
| `README.md` | Documentation. |

## Rules for changes

- **Any change to `x-gallery-mode.user.js`** → bump `@version` (semver) and add an entry to the
  `Changelog` comment right after the metadata block. Newest entries first, in English, dated
  `X.Y.Z — YYYY-MM-DD`, bullets `•`. A change without a changelog entry is not finished.
- A change to `x-gallery-local-check.user.js` → bump its own `@version` and extend its changelog.
- Contract between the main script and companions — DOM attributes on `.xg-card` cards:
  `data-xg-gallery` on the root, `data-xg-download-url` (original URL), `data-xg-hide` (set by a
  companion — the card leaves the layout). Do not rename them without updating
  `x-gallery-local-check.user.js`.
- Do not add dependencies, a build step, TypeScript or npm scripts. One file per script.
- The interface is bilingual: every visible string goes through `STRINGS.en` / `STRINGS.ru` (the `T` object).
- The design is native X: the palette is taken from the page theme (`detectPalette` / `detectAccent`),
  Chirp font, X-style pills and menus. Do not introduce foreign colours or styles.
- `DEFAULT_QUERY_IDS` are fallback values only; change them only after verifying against X's live bundle
  (`abs.twimg.com/responsive-web/client-web/main.*.js`).
- Keep the README current: the feature list, the "How it works" table, the file name format
  `<handle>_<YYYYMMDD>_<post id>_<media index>.<ext>`, the dev-mode sections.

## Checks before finishing

```
node --check x-gallery-mode.user.js
node --check x-gallery-local-check.user.js
node --test tests/gallery.test.js tests/local-check.test.js
```

`node --test tests/` does not work on Node 22 (it looks for a module named `tests`) — pass the files explicitly.
Cover new pagination, response parsing, layout or hashing behaviour with tests in `tests/`.

## Manual checks in the browser

- Two instances of the script on one page (an installed copy plus an injected one) fight over
  `#gallery` in the URL: disable the installed copy while testing an injected build.
- In an agent session the script body (without the metadata block) can be injected into a profile page;
  without `GM_*` the settings go to `localStorage` and the styles into `<style id="xg-styles">`. Remove
  `#xg-styles` before injecting again and open the gallery with `pushHistory: false`.
- Sensitive accounts (e.g. `Dottyyidi`) return empty `UserMedia` / `UserPhotoTimeline` — use them to check
  the fallback to `UserOriginalsTimeline`. The Popular endpoint hits 429 quickly.
- The companion's MutationObserver watches the whole document: never write DOM text unconditionally
  from its `render()` or the observer re-triggers itself forever and the tab freezes.

## Security and data

- Do not commit tokens, cookies (`ct0`), the Kekkai token or screenshots: screenshots of x.com show the
  logged-in account and are never added to the repository.
  The `BEARER` in the script is X's public web client token and is fine.
- Send nothing to third-party services; requests go only to `x.com`, `*.twimg.com` and the companion's
  local API.
