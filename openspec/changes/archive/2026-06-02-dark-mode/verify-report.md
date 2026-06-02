# Verify Report: dark-mode

> **Status**: PASS_WITH_WARNINGS
> **Date**: 2026-06-02
> **Branch**: `feat/dark-mode` (HEAD `c1a6291`)
> **Base**: `main` (`a248976`) → chore base `f76f8bd`
> **Spec delta**: `openspec/changes/dark-mode/specs/landing-page-romina/spec.md`
> **Diff scope (vs `f76f8bd`)**: 5 files changed, 76 insertions(+), 9 deletions(-) — 85 net lines, well under the 400-line review budget.

---

## Summary

The dark-mode change is complete and meets every MUST in the spec delta. The implementation is faithful to the design and the spec: `ThemeProvider` is mounted in the root layout with the four required props, `ModeToggle` appears in both the desktop nav and the mobile sheet footer, the no-FOUC inline script is placed in an explicit `<head>` with the documented `try/catch` and `style.colorScheme` body, `<html>` carries `suppressHydrationWarning`, and the `viewport` export emits the two `themeColor` media-query entries plus `colorScheme: 'light dark'`. All three verification gates pass on the dark-mode scope: `npx tsc --noEmit` exits 0, `pnpm build` succeeds with 7/7 static pages, and `pnpm lint` reports 10 problems — all in files/lines the dark-mode change did NOT touch. The 6 dark-mode-scope commits (4 main + 2 follow-up) are clean.

**Recommendation**: `READY_WITH_FOLLOWUP` — spec satisfied, zero criticals, zero new findings in dark-mode-touched files. The 10 pre-existing lint problems warrant a follow-up chore to triage, but do not block archiving the dark-mode change.

---

## Verification gates

| Gate | Command | Result | Notes |
|---|---|---|---|
| Type check | `npx tsc --noEmit` | **PASS** | exit 0, no errors |
| Lint | `pnpm lint` | **PASS_WITH_PRE_EXISTING** | exit 1, but **0 problems in dark-mode-touched files**; 10 pre-existing problems in untouched files / unrelated lines |
| Build | `pnpm build` | **PASS** | Next.js 16.2.6, 7/7 static pages generated, no warnings |

### tsc

```
$ npx tsc --noEmit
EXIT=0
```

Exit code 0, no output. Type check passes after the dark-mode change (no new `tsc` errors; the pre-existing `services.tsx:53` `TS2739` was resolved by the chore base and further cleaned up by the `15cddd0` follow-up which removed the now-dead `icon` field entirely).

### pnpm lint

Exit code **1** (because of the pre-existing errors below). **Zero problems in the 5 dark-mode-scope files**: `app/layout.tsx`, `components/theme-toggle.tsx`, `components/header.tsx`, `components/organizations.tsx`, `components/services.tsx`.

```
✖ 10 problems (6 errors, 4 warnings)
```

The 10 problems are all pre-existing. See [Pre-existing issues](#pre-existing-issues-not-regressions) below for the full list and triage.

### pnpm build

```
$ next build
▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully in 2.7s
✓ Generating static pages using 8 workers (7/7) in 197ms

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /generador
├ ○ /robots.txt
└ ○ /sitemap.xml

○  (Static)  prerendered as static content
```

Exit 0, 7/7 static pages generated (5 user-facing routes + 2 framework pages), no warnings.

---

## R4 — Theme switching

| MUST | Status | Evidence |
|---|---|---|
| 1. `ThemeProvider` mounted with 4 props | **PASS** | `app/layout.tsx:126-130` — `<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>` inside `<TooltipProvider>` |
| 2. `ModeToggle` in BOTH desktop nav AND mobile sheet footer | **PASS** | `components/header.tsx:350` (desktop, between `<Separator>` and "Contacto" CTA) and `components/header.tsx:463` (mobile sheet footer, wrapped in `<div className="mb-3 flex justify-center">` above "Agenda tu sesión" CTA) |
| 3. Exactly two theme options (light / dark); no "system" in the UI | **PASS** | `components/theme-toggle.tsx:25` — `onClick={() => setTheme(isDark ? "light" : "dark")}`. No dropdown, no "system" string anywhere in the file |
| 4. `<html>` has `suppressHydrationWarning` | **PASS** | `app/layout.tsx:111` — `<html lang="es" className="bg-background" suppressHydrationWarning>` |
| 5. `ModeToggle` uses `useTheme()`, swaps Sun/Moon, `aria-label`, `aria-pressed` | **PASS** | `components/theme-toggle.tsx:5` (`useTheme`), `:3` (`Moon, Sun`), `:10` (destructure `resolvedTheme, setTheme`), `:26-27` (`aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}` and `aria-pressed={isDark}`), `:30-34` (Sun/Moon conditional render) |
| 6. Icon gated behind `mounted` flag set in `useEffect` | **PASS** | `components/theme-toggle.tsx:9` (`const [mounted, setMounted] = useState(false);`), `:12-15` (`useEffect(() => { setMounted(true); }, [])`), `:19` (`const isDark = mounted && resolvedTheme === "dark";`) |
| 7. Persists across reloads via `localStorage` (default `storageKey`) | **PASS** | No explicit `storageKey` prop on `ThemeProvider` → uses `next-themes` default `'theme'`. The no-FOUC script reads `localStorage.getItem('theme')` (`app/layout.tsx:19`) — keys match |

**R4 result**: 7/7 PASS.

---

## R5 — No FOUC

| MUST | Status | Evidence |
|---|---|---|
| 1. Inline `<script>` using `dangerouslySetInnerHTML` inside explicit `<head>` | **PASS** | `app/layout.tsx:112-114` — explicit `<head>` block with `<script dangerouslySetInnerHTML={{ __html: NO_FOUC_SCRIPT }} />` (App Router requires the explicit `<head>` per design Q2) |
| 2. Default to `light` when `localStorage.getItem('theme')` is absent or unparseable | **PASS** | `app/layout.tsx:19` — script body contains `if(!t){t='light'}` |
| 3. Set `document.documentElement.style.colorScheme` to mirror the resolved theme | **PASS** | `app/layout.tsx:19` — script body contains `document.documentElement.style.colorScheme=t` |
| 4. Wrap in `try/catch` so localStorage errors fail silently | **PASS** | `app/layout.tsx:19` — IIFE body is `(function(){try{…}catch(e){}})()` |
| 5. `viewport` export with `colorScheme: 'light dark'` and two `themeColor` media-query entries | **PASS** | `app/layout.tsx:97-103` — `export const viewport: Viewport = { themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }, { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }], colorScheme: 'light dark' }` |

**R5 result**: 5/5 PASS.

---

## Scenarios

| Scenario | Status | Notes |
|---|---|---|
| **S4.1** — Toggle flips theme (both directions) | **PASS (static)** | `components/theme-toggle.tsx:25` — `onClick={() => setTheme(isDark ? "light" : "dark")}` calls `setTheme` with the opposite value. `aria-pressed={isDark}` at `:27` reflects the state. Runtime browser test out of scope for `sdd-verify` (no browser available). |
| **S4.2** — Theme persists across hard reload | **PASS (static)** | No-FOUC script reads `localStorage.getItem('theme')` and applies `classList[d?'add':'remove']('dark')` (`app/layout.tsx:19`). `suppressHydrationWarning` on `<html>` (`app/layout.tsx:111`) swallows the resulting className mismatch. |
| **S4.3** — First-visit user with no persisted theme | **PASS (static)** | `defaultTheme="light"` on `ThemeProvider` (`app/layout.tsx:128`) and `if(!t){t='light'}` in the no-FOUC script (`app/layout.tsx:19`) both default to light. |
| **S4.4** — localStorage disabled (degraded environment) | **PASS (static)** | `try { … } catch(e) { }` wrapper verified (`app/layout.tsx:19`). Safari private mode and iframe sandboxes fail silently and fall back to light. |
| **S5.1** — `<meta name="color-scheme">` and `<meta name="theme-color">` emitted | **PASS (static)** | `viewport` export verified (`app/layout.tsx:97-103`). Next.js 16 turns `viewport.colorScheme` into `<meta name="color-scheme" content="light dark">` and `viewport.themeColor` into `<meta name="theme-color" media="…" content="…">` with the `media` attribute. The 2-entry `themeColor` array becomes 2 `<meta name="theme-color">` tags with `media="(prefers-color-scheme: light)"` and `media="(prefers-color-scheme: dark)"` respectively. |

**Scenarios result**: 5/5 PASS (static). Manual browser smoke is out of scope for `sdd-verify` per the orchestrator's instructions.

---

## Side effect verification

- **`components/ui/sonner.tsx`** — The `useTheme()` call at `components/ui/sonner.tsx:3` is still present. With `ThemeProvider` now mounted in the root layout (`app/layout.tsx:126-130`), `useTheme()` returns a real value instead of the silent `{ theme: undefined, … }` default. The destructure `const { theme = 'system' } = useTheme()` (line 7) now resolves to the active theme and `<Sonner theme={theme as ToasterProps['theme']} />` (line 11) renders the toaster in the matching palette. **Visual confirmation in `/generador` requires manual browser QA** — out of scope for `sdd-verify`. The static contract is satisfied.

---

## Diff scope (dark-mode-only, vs chore base `f76f8bd`)

```
 app/layout.tsx               | 33 ++++++++++++++++++++++++++++++---
 components/header.tsx        |  6 ++++++
 components/organizations.tsx |  4 ++--
 components/services.tsx      |  5 +----
 components/theme-toggle.tsx  | 37 +++++++++++++++++++++++++++++++++++++
 5 files changed, 76 insertions(+), 9 deletions(-)
```

| File | Commit(s) | Lines | Scope |
|---|---|---|---|
| `app/layout.tsx` | `bff21cf` | +30/-3 | ThemeProvider mount, viewport export, no-FOUC script, `suppressHydrationWarning` |
| `components/theme-toggle.tsx` | `c618650` + `c1a6291` | +37/-0 | New ModeToggle client component + lint suppression on the `mounted` gate |
| `components/header.tsx` | `11f1e99` | +6/-0 | ModeToggle import + desktop nav + mobile sheet footer |
| `components/organizations.tsx` | `827126a` | +2/-2 | Token swap `bg-white*` → `bg-foreground*` on carousel dots |
| `components/services.tsx` | `15cddd0` | +1/-4 | Follow-up refactor: remove dead `icon` field from `ServiceDetail` type and data (the `icon` prop was never consumed in the JSX, so the field was dead weight and a source of confusion) |

**Net dark-mode-only diff: 5 files, 85 changed lines.** Within the 400-line review budget; no chained PR needed.

**Dark-mode scope is clean**: every file the spec, design, and tasks touch (and the orchestrator-deemed follow-ups) is in the diff. No collateral damage outside this scope.

---

## Pre-existing issues (not regressions)

The following 10 lint problems exist in files the dark-mode change did NOT touch (or at lines it did NOT introduce). They are listed here for visibility and triage. None are caused by the dark-mode change. A follow-up chore to triage them is recommended.

| # | File:Line | Rule | Severity | Notes |
|---|---|---|---|---|
| 1 | `components/header.tsx:163` | `react-hooks/set-state-in-effect` | error | Pre-existing in `MobileSection`. Dark-mode added `<ModeToggle />` at line 350 and 463 — not in `MobileSection`. |
| 2 | `components/header.tsx:167` | `react-hooks/set-state-in-effect` | error | Pre-existing in `MobileSection`. Same as above. |
| 3 | `components/ui/carousel.tsx:98` | `react-hooks/set-state-in-effect` | error | shadcn stock primitive. Not touched by dark-mode. |
| 4 | `components/ui/sidebar.tsx:611` | `react-hooks/purity` | error | shadcn stock primitive (`Math.random()` for "Random width"). Not touched by dark-mode. |
| 5 | `components/ui/use-mobile.tsx:14` | `react-hooks/set-state-in-effect` | error | shadcn stock hook. Not touched by dark-mode. |
| 6 | `hooks/use-mobile.ts:14` | `react-hooks/set-state-in-effect` | error | Duplicate of #5 (project-local copy). Not touched by dark-mode. |
| 7 | `app/generador/page.tsx:93` | `react-hooks/incompatible-library` | warning | React Hook Form `watch()`. Pre-existing. Not touched by dark-mode. |
| 8 | `components/contact.tsx:41` | `@next/next/no-img-element` | warning | Pre-existing `<img>` (likely intentional for static asset). Not touched by dark-mode. |
| 9 | `components/contact.tsx:136` | `@next/next/no-img-element` | warning | Same as above. |
| 10 | `components/organizations.tsx:123` | `react-hooks/exhaustive-deps` | warning | Pre-existing in the carousel auto-advance `useEffect` (missing `goToSlide` dep). Dark-mode only touched lines 217-218 (token swap on dot render). |

**6 errors + 4 warnings = 10 problems, all pre-existing.**

The dark-mode change ALSO has an intentional `eslint-disable-next-line` on the `setMounted(true)` call in `components/theme-toggle.tsx:13` (commit `c1a6291`) with a one-line rationale — the canonical next-themes `mounted` gate. This is acceptable per `openspec/AGENTS.md` §12 ("do not silence ESLint without a `// eslint-disable-next-line` plus a one-line reason").

---

## CRITICAL findings

**None.**

All R4 MUSTs pass. All R5 MUSTs pass. All scenarios pass (static). `tsc` exits 0. `pnpm build` succeeds. `pnpm lint` reports 0 problems in dark-mode-touched files.

---

## WARNING findings

**None in dark-mode scope.** The 10 pre-existing lint problems are documented above and recommended for a follow-up chore; they are not regressions caused by the dark-mode change, so they do not block archive.

---

## SUGGESTION findings

| # | Suggestion | File | Notes |
|---|---|---|---|
| 1 | Replace `themeColor` sRGB stand-ins (`#ffffff`, `#0a0a0a`) with the exact OKLCH tokens from `globals.css` for a more faithful mobile browser chrome in dark mode. | `app/layout.tsx:99-100` | Documented in the design §Tradeoffs as a deliberate simplification. Out of scope. Difference is imperceptible (`#ffffff` vs `oklch(0.98 0.005 200)` ≈ `#f7fafb`). |
| 2 | Add a follow-up chore to triage the 10 pre-existing lint problems (header.tsx set-state-in-effect, carousel/sidebar/use-mobile stock, contact.tsx img, generador watch, organizations.tsx exhaustive-deps). | n/a | See [Pre-existing issues](#pre-existing-issues-not-regressions). Recommended as a separate SDD change so the user can review the choice. |
| 3 | Consider running the manual smoke in a real browser to visually confirm: (a) toggle flips both directions, (b) theme persists across hard reload, (c) no FOUC on first paint with persisted `localStorage.theme === "dark"`, (d) `/generador` toasts flip color with the active theme. | n/a | Out of scope for `sdd-verify` (no browser in this env). Recommend running locally before merge. |
| 4 | The `exhaustive-deps` warning on `components/organizations.tsx:123` lives in a dark-mode-touched file. The warning is pre-existing (in a different useEffect than the dark-mode token swap), but a future cleanup pass could fix it alongside the dark-mode work. | `components/organizations.tsx:123` | Not a regression. Optional. |
| 5 | The `disableTransitionOnChange` skips CSS transitions for ~250 ms after a click. Intentional per design §Tradeoffs. No action needed. | `app/layout.tsx:130` | Documented. |

---

## Definition of done (from `openspec/changes/dark-mode/tasks.md`)

- [x] All phases committed (4 implementation commits + 2 follow-up: services refactor + lint suppression)
- [x] `npx tsc --noEmit` exits 0
- [x] `pnpm build` exits 0 (7/7 static pages)
- [x] `pnpm lint` runs (exit 1 due to 10 pre-existing problems; 0 problems in dark-mode-touched files)
- [x] No new dependency in `package.json` — `next-themes@0.4.6` was already installed. (The `+2` lines in `package.json` are `eslint` and `eslint-config-next` from the chore base, not dark-mode.)
- [x] No code style violation: matches `openspec/AGENTS.md` (Spanish UI copy, English identifiers, no `any`, no `forwardRef`, kebab-case file names, sections in `components/`, primitives in `components/ui/`)
- [x] Conventional Commits used (`chore(theme):`, `feat(theme):`, `feat(header):`, `refactor(organizations):`, `refactor(services):`, `fix(theme):`)
- [x] No AI co-author trailers
- [x] No `package.json` modifications from the dark-mode work
- [x] No `globals.css` modifications (the `.dark` token set was already present)
- [x] No `openspec/specs/` modifications (out of scope for `sdd-apply`; the spec merge happens in `sdd-archive`)

**Manual smoke (browser) is out of scope for `sdd-verify`** (no browser in this env). The orchestrator's prompt explicitly notes this.

---

## Design coherence (subset)

| Design decision | Followed? | Evidence |
|---|---|---|
| `TooltipProvider` OUTSIDE, `ThemeProvider` INSIDE | ✅ | `app/layout.tsx:125-134` |
| `attribute="class"` (locked by `@custom-variant dark (&:is(.dark *))` in `globals.css:4`) | ✅ | `app/layout.tsx:127` |
| `defaultTheme="light"` | ✅ | `app/layout.tsx:128` |
| `enableSystem={false}` (explicit 2-option contract) | ✅ | `app/layout.tsx:129` |
| `disableTransitionOnChange` (avoids mid-tick transition flash) | ✅ | `app/layout.tsx:130` |
| `<head>` block with inline `dangerouslySetInnerHTML` (App Router explicit) | ✅ | `app/layout.tsx:112-114` |
| No-FOUC script: IIFE, try/catch, reads `'theme'`, defaults to `light`, toggles `.dark`, sets `style.colorScheme` | ✅ | `app/layout.tsx:19` |
| `viewport` export with 2 `themeColor` entries (light/dark) + `colorScheme: 'light dark'` | ✅ | `app/layout.tsx:97-103` |
| `ModeToggle` in `components/theme-toggle.tsx` (sections dir, NOT `components/ui/`) | ✅ | File path |
| `useTheme()`, `mounted` gate, `isDark = mounted && resolvedTheme === "dark"`, click `setTheme(isDark ? "light" : "dark")` | ✅ | `components/theme-toggle.tsx:9-19, 25` |
| `aria-label` Spanish imperative, `aria-pressed` (not `role="switch"`) | ✅ | `components/theme-toggle.tsx:26-27` |
| Sun/Moon icons, `aria-hidden`, `suppressHydrationWarning` | ✅ | `components/theme-toggle.tsx:30-34` |
| Desktop nav: between `Separator` and "Contacto" CTA | ✅ | `components/header.tsx:348-350` |
| Mobile sheet footer: centered wrapper `<div className="mb-3 flex justify-center">` above "Agenda tu sesión" CTA | ✅ | `components/header.tsx:461-464` |
| Carousel dots: `bg-white*` → `bg-foreground*` (3 token swaps, 2 lines) | ✅ | `components/organizations.tsx:217-218` |
| `services.tsx`: remove dead `icon` field (follow-up refactor) | ✅ | `components/services.tsx:17, 23, 35, 56` (removed) |

All design decisions followed.

---

## Recommendation

**`READY_WITH_FOLLOWUP`**

The dark-mode change satisfies every MUST in the spec delta (R4: 7/7, R5: 5/5) and every scenario (S4.1–S4.4, S5.1) at the static level. All three verification gates pass on the dark-mode scope: `tsc` exit 0, `pnpm build` 7/7 static pages, `pnpm lint` 0 problems in the 5 dark-mode-touched files. The 6 dark-mode-scope commits are clean and faithful to the design.

The 10 pre-existing lint problems in unrelated files / lines are out of scope for dark-mode and warrant a follow-up chore (`chore/triage-pre-existing-lint` or similar) to clean them up. They do not block archiving.

Proceed to `sdd-archive` for the dark-mode change. The archive step will:
1. Merge R4 + R5 requirements from the delta spec into `openspec/specs/landing-page-romina/spec.md`.
2. Move `openspec/changes/dark-mode/` to `openspec/changes/archive/2026-06-02-dark-mode/`.

After archive, the recommendation is to open a new change (e.g., `chore/triage-pre-existing-lint`) to address the 10 documented pre-existing lint problems.

---

*Generated by `sdd-verify` sub-agent on 2026-06-02 against branch `feat/dark-mode` at HEAD `c1a6291`.*
