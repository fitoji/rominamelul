# Tasks: dark-mode

**Change ID**: `dark-mode`
**Status**: `tasks` (proposal + design + spec all approved; ready for apply)
**Date**: 2026-06-02
**Project key**: `b_TTzk1b8KwYH` (romina-web)
**Links**:
- Proposal: `openspec/changes/dark-mode/proposal.md`
- Design: `openspec/changes/dark-mode/design.md`
- Spec delta: `openspec/changes/dark-mode/specs/landing-page-romina/spec.md`

---

## Forecast recap

`~65 net line additions` across 4 files. Single PR, band `<200`, far below the 400-line review budget. No new dependencies (`next-themes@0.4.6` already in `package.json`). No test runner (`strict_tdd: false`); verification = `pnpm build` + `pnpm lint` + `npx tsc --noEmit` + manual smoke on `/` and `/generador`. One silent bug fix as a side effect: `components/ui/sonner.tsx:3` `useTheme()` will start returning the real theme once `ThemeProvider` is mounted.

---

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~65 net additions (band `<200`) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR |
| Delivery strategy | single-pr (review budget already cleared) |
| Chain strategy | size-exception not needed |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | ThemeProvider mounted + no-FOUC + viewport + ModeToggle + Header wiring + carousel dots | PR 1 | Single PR; all tasks in dependency order; verification included |

---

## Phase 1: Foundation — `app/layout.tsx`

### 1.1 Mount ThemeProvider + viewport + no-FOUC script + suppressHydrationWarning
- **phase**: 1
- **files**: `app/layout.tsx`
- **acceptance_criteria**:
  - `viewport` export added with `colorScheme: 'light dark'` and two `themeColor` media-query entries.
  - `ThemeProvider` imported from `@/components/theme-provider` and wraps `{children}` inside the existing `TooltipProvider`.
  - Provider props: `attribute="class"`, `defaultTheme="light"`, `enableSystem={false}`, `disableTransitionOnChange`.
  - `<html>` carries `suppressHydrationWarning`.
  - Explicit `<head>` block contains one `<script dangerouslySetInnerHTML>` with the `NO_FOUC_SCRIPT` constant (try/catch, reads `localStorage.theme`, toggles `.dark`, sets `style.colorScheme`).
- **estimated_lines**: 25
- **dependencies**: none
- **work_unit_commits**:
  - `chore(theme): mount ThemeProvider, viewport export, no-FOUC script, suppressHydrationWarning`
- **risks**:
  - Hydration warning if `suppressHydrationWarning` is missed → must be added in the same commit as the provider mount.

---

## Phase 2: Toggle component

### 2.1 Create `components/theme-toggle.tsx` (ModeToggle)
- **phase**: 2
- **files**: `components/theme-toggle.tsx` (new)
- **acceptance_criteria**:
  - `"use client"` at top; exports `ModeToggle` (named, matches shadcn docs).
  - Uses `useTheme` from `next-themes`; renders `<Button variant="ghost" size="icon" className="rounded-xl">`.
  - `mounted` flag set in `useEffect`; `isDark = mounted && resolvedTheme === "dark"`.
  - Click → `setTheme(isDark ? "light" : "dark")`.
  - `aria-label` in Spanish (imperative: "Cambiar a tema claro" / "Cambiar a tema oscuro"); `aria-pressed={isDark}`.
  - Icon swaps between `Sun` / `Moon` from `lucide-react`; both `aria-hidden` and `suppressHydrationWarning`.
- **estimated_lines**: 35
- **dependencies**: `1.1`
- **work_unit_commits**:
  - `feat(theme): add ModeToggle with aria-pressed and mounted gate`
- **risks**:
  - SSR/client mismatch if `mounted` gate is omitted → guard before `resolvedTheme`.

---

## Phase 3: Header integration

### 3.1 Wire ModeToggle into desktop nav and mobile sheet
- **phase**: 3
- **files**: `components/header.tsx`
- **acceptance_criteria**:
  - `import { ModeToggle } from '@/components/theme-toggle'` added with the other section component imports.
  - Desktop nav: `<ModeToggle />` rendered between the vertical `Separator` and the "Contacto" CTA.
  - Mobile sheet footer: `<ModeToggle />` rendered above the "Agenda tu sesión" CTA, centered via `<div className="mb-3 flex justify-center">`.
  - No prop drilling; no Header refactor beyond the two insertion points.
- **estimated_lines**: 7
- **dependencies**: `2.1`
- **work_unit_commits**:
  - `feat(header): wire ModeToggle into desktop nav and mobile sheet`
- **risks**:
  - Mobile sheet layout shift if wrapper `<div>` is missing `mb-3` → keep the original vertical rhythm.

---

## Phase 4: Carousel dots token swap

### 4.1 Swap `bg-white*` → `bg-foreground*` in organizations dots
- **phase**: 4
- **files**: `components/organizations.tsx`
- **acceptance_criteria**:
  - `components/organizations.tsx:217-218`: three token swaps — `bg-white` → `bg-foreground`, `bg-white/50` → `bg-foreground/50`, `bg-white/70` → `bg-foreground/70`.
  - No other lines touched; dot logic / carousel behavior unchanged.
  - Visually: active dot uses the foreground color (ink); inactive dots use 50% opacity with 70% on hover.
- **estimated_lines**: 3
- **dependencies**: `1.1` (theme tokens must resolve; logically independent of toggle)
- **work_unit_commits**:
  - `refactor(organizations): swap carousel dots to bg-foreground token`
- **risks**:
  - Contrast against the slide image — `bg-foreground` is text-colored; in light mode it is a dark turquoise, in dark mode near-white. Acceptable per design tradeoff.

---

## Phase 5: Verification

### 5.1 Build, lint, typecheck, manual smoke
- **phase**: 5
- **files**: (no file changes)
- **acceptance_criteria**:
  - `npx tsc --noEmit` exits 0 (mandatory because `next.config.mjs` has `ignoreBuildErrors: true`).
  - `pnpm lint` exits 0 with no new violations.
  - `pnpm build` exits 0 with no new warnings.
  - Manual on `/`: first paint light, click toggle → flips dark, icon swaps to Sun, `aria-pressed="true"`.
  - Manual on `/`: hard-reload with `localStorage.theme === "dark"` → no flash of light.
  - Manual on `/generador`: trigger a toast → toast background matches current theme (verifies `sonner.tsx` side-effect fix).
- **estimated_lines**: 0
- **dependencies**: `1.1`, `2.1`, `3.1`, `4.1`
- **work_unit_commits**:
  - `chore(theme): verify build, lint, typecheck, manual smoke` (verification log in body; no code changes — this commit may be empty or omitted if changes are clean across phases 1–4).
- **risks**:
  - Build passes but typecheck fails (Next 16 masks type errors via `ignoreBuildErrors`) → always run `npx tsc --noEmit` explicitly.

---

## Work-unit commits plan (summary)

| Phase | Commit message | Type |
|-------|----------------|------|
| 1 | `chore(theme): mount ThemeProvider, viewport export, no-FOUC script, suppressHydrationWarning` | chore |
| 2 | `feat(theme): add ModeToggle with aria-pressed and mounted gate` | feat |
| 3 | `feat(header): wire ModeToggle into desktop nav and mobile sheet` | feat |
| 4 | `refactor(organizations): swap carousel dots to bg-foreground token` | refactor |
| 5 | `chore(theme): verify build, lint, typecheck, manual smoke` | chore (optional) |

Each commit is a reviewable work unit per `work-unit-commits`: one clear purpose, the repo still makes sense after applying only that commit, rollback is clean. No `Co-Authored-By` trailer.

---

## Out of scope

- System option / `prefers-color-scheme` toggle (UX decision — 2 options only).
- Per-account / per-user theme persistence (no auth on the site).
- Design-system token overhaul or palette redesign.
- New shadcn primitives (existing `Button` + `lucide-react` icons only).
- Header refactor beyond the two ModeToggle insertion points.
- New icons beyond `Sun` / `Moon`.
- Migration of other hardcoded colors (e.g. WhatsApp `bg-emerald-500` / `bg-[#25D366]`, modal scrims `bg-black/50` — intentional, per proposal).
- Adding a test runner (separate, deliberate change).

---

## Definition of done

- [ ] All phases (1.1, 2.1, 3.1, 4.1, 5.1) committed with the conventional-commit messages above.
- [ ] `pnpm build` exits 0.
- [ ] `pnpm lint` exits 0.
- [ ] `npx tsc --noEmit` exits 0.
- [ ] Manual smoke: toggle flips light ↔ dark on `/` in both directions.
- [ ] Manual smoke: theme persists across hard reload via `localStorage.theme`.
- [ ] Manual smoke: no FOUC on first paint with `localStorage.theme === "dark"`.
- [ ] Manual smoke: `/generador` toasts flip color with the active theme.
- [ ] No new dependency in `package.json`.
- [ ] Code style matches `openspec/AGENTS.md` (Spanish UI copy, English identifiers, no `any`, no `forwardRef`).
