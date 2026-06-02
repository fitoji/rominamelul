# sdd-init Report — b_TTzk1b8KwYH (romina-web)

> **Topic key equivalent (Engram mode)**: `sdd-init/b_TTzk1b8KwYH`
> **Detected**: 2026-06-02
> **Persistence mode**: `openspec` (file-based, in-repo)
> **Init phase status**: `ok`

---

## 1. Project snapshot

| Field | Value |
| --- | --- |
| Project key | `b_TTzk1b8KwYH` |
| Display name | `romina-web` |
| Type | Single Next.js application (landing page) |
| Package manager | `pnpm` (lockfile present; `pnpm-workspace.yaml` exists but empty) |
| Framework | Next.js **16.2.6** (App Router) |
| UI library | React **19.2.6** |
| Language | TypeScript **5.7.3** (strict) |
| Styling | Tailwind CSS **4.2.0** (`@theme inline` pattern) |
| Component kit | shadcn/ui (new-york style, neutral base) + Radix primitives |
| Forms / validation | React Hook Form 7.54.1 + Zod 3.24.1 |
| Icons | `lucide-react` |
| Analytics | `@vercel/analytics` |
| Other notable deps | `next-themes`, `html-to-image`, `embla-carousel-react`, `sonner`, `recharts`, `date-fns`, `vaul`, `cmdk`, `react-day-picker`, `react-resizable-panels`, `input-otp` |
| React Compiler | Enabled (`next.config.mjs` → `reactCompiler: true`) |
| Build flags | `typescript.ignoreBuildErrors: true`, `images.unoptimized: true` |

## 2. Architecture (detected)

```
romina-web/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout, loads Nunito + Lora via next/font
│   ├── page.tsx             # Landing
│   ├── globals.css          # Tailwind v4 @theme inline (Nunito/Lora variables)
│   ├── robots.ts            # SEO
│   ├── sitemap.ts           # SEO
│   └── generador/           # Standalone sub-route (html-to-image gift generator)
├── components/              # Section components (about, header, hero, services, etc.)
│   └── ui/                  # shadcn primitives (button, card, dialog, carousel, …)
├── lib/                     # utils.ts (cn), seo.ts, nav-links*.ts
├── hooks/                   # use-mobile.ts, use-toast.ts
├── public/                  # Static assets (images, icons, PDF, logo)
├── styles/                  # Auxiliary styles
├── openspec/                # SDD artifacts (this directory)
│   ├── config.yaml
│   ├── specs/landing-page-romina/spec.md
│   └── changes/
│       ├── performance-quick-wins/   # ACTIVE
│       └── archive/2026-05-19-landing-page-romina/   # COMPLETED
├── sdd/                     # Legacy non-standard artifacts (landing-page-romina/{explore,design})
│                            # Kept for history; future artifacts go in openspec/
├── .agents/skills/          # Project-level skills
├── .atl/skill-registry.md   # Auto-generated skill index
├── .engram/                 # Local Engram chunks (not used as artifact store this session)
└── .pi/                     # Pi agent state
```

**Layer boundaries**:
- Routes → Sections (`components/*.tsx`) → Primitives (`components/ui/`) → utils (`lib/utils.ts`).
- No backend, no API routes, no database — fully static/SSG landing page.
- `@/*` alias maps to repo root (`tsconfig.json` paths).

**Conventions**:
- UI copy in Spanish.
- Conventional Commits for messages.
- App Router default; `components.json` has `rsc: true` → RSC by default, opt into `"use client"`.
- Tailwind v4 with `@theme inline` and CSS variables for theming (no separate `tailwind.config.ts`).
- `next/font/google` used for Nunito (body) and Lora (serif) — wired through `--font-sans` / `--font-serif`.

## 3. Testing capabilities

**Strict TDD Mode**: `disabled` (no test runner installed)

| Layer | Available | Tool |
| --- | --- | --- |
| Unit | ❌ | — |
| Integration | ❌ | — |
| E2E | ❌ | — |

| Capability | Available | Command |
| --- | --- | --- |
| Coverage | ❌ | — |
| Linter | ✅ | `pnpm lint` (ESLint, Next 16 default flat config) |
| Type checker | ✅ | `npx tsc --noEmit` (TypeScript 5.7.3, strict) |
| Formatter | ❌ | — (no Prettier / format script) |
| Build | ✅ | `pnpm build` (next build) |

**Implication for SDD phases**:
- `sdd-verify` falls back to: `pnpm build` + `pnpm lint` + `npx tsc --noEmit` + manual visual checks.
- `sdd-apply` cannot enforce RED-GREEN-REFACTOR. New code should be verified by reading + manual smoke checks.
- Adding a test runner is a separate, deliberate decision (Vitest + Testing Library is the natural pick for this stack).

## 4. Skill registry

- Path: `/Users/fitoji/Developer/00.PROYECTOS/RominaWeb/b_TTzk1b8KwYH/.atl/skill-registry.md`
- Last refreshed: 2026-06-02 (already current — no rebuild needed this turn).
- 31 skills indexed. **Project-scoped** skills relevant to this codebase:
  - `next-best-practices`, `next-cache-components`, `next-upgrade`
  - `vercel-react-best-practices`, `vercel-composition-patterns`
  - `tailwind-css-patterns`, `tailwind-v4-shadcn`
  - `shadcn`, `react-hook-form`, `zod`
  - `frontend-design`, `seo`, `accessibility`
  - `typescript-advanced-types`, `nodejs-best-practices`, `nodejs-backend-patterns`
- **User-scoped** workflow skills: `sdd-*`, `branch-pr`, `chained-pr`, `work-unit-commits`, `comment-writer`, `judgment-day`, `issue-creation`, `skill-creator`, `skill-improver`, `cognitive-doc-design`, `go-testing`.

## 5. OpenSpec state (pre-existing)

| Path | Status | Notes |
| --- | --- | --- |
| `openspec/config.yaml` | **Refreshed** this turn | Updated Next.js 16.2.4 → 16.2.6; expanded `rules`; added `init_report` pointer. |
| `openspec/specs/landing-page-romina/spec.md` | Exists | Nunito/Lora font fix — already archived 2026-05-19. |
| `openspec/changes/performance-quick-wins/` | **Active** | `proposal.md`, `specs/quick-fixes-spec.md`, `tasks.md` present. 10 quick-win tasks pending apply. |
| `openspec/changes/archive/2026-05-19-landing-page-romina/` | Archived | Source for current main spec. |
| `sdd/landing-page-romina/{explore,design}/` | Legacy | Non-standard location. Kept untouched. Future artifacts belong in `openspec/`. |

## 6. Artifacts written this turn

1. `openspec/config.yaml` — refreshed (detected state + rules).
2. `openspec/init.md` — **this file** (the `sdd-init/{project}` equivalent for OpenSpec mode).
3. `openspec/AGENTS.md` — project conventions for subagents that pick up later SDD phases.

## 7. Risks & gaps (must read before next phase)

- **No test runner** → `sdd-verify` cannot prove correctness with tests. Plan for manual checks (build, lint, typecheck, Lighthouse, visual).
- **`typescript.ignoreBuildErrors: true`** in `next.config.mjs` masks type errors during build. `sdd-verify` MUST run `npx tsc --noEmit` separately.
- **`images.unoptimized: true`** → Next/Image does no runtime optimization. Performance deltas from `sizes` props are still valuable (CLS, browser hints) but Lighthouse will not credit `next/image` optimization.
- **No CI** → no automated safety net. All verification is local/manual.
- **No formatter** → style drift risk on multi-author PRs. Consider adding Prettier.
- **Active change `performance-quick-wins` in flight** → next SDD phase (e.g. `/sdd-new`) should account for it. `sdd-archive` will move it under `changes/archive/YYYY-MM-DD-performance-quick-wins/` once verified.
- **`sdd/landing-page-romina/` legacy dir** → non-standard; do not write new artifacts there. New work goes in `openspec/changes/{name}/`.

## 8. Next recommended step

- If the user wants to ship the active `performance-quick-wins` change: launch `/sdd-apply performance-quick-wins`.
- If the user wants to start a new change: launch `/sdd-new <change-name>` (or `/sdd-explore <idea>` for ambiguous ideas).
- Optional housekeeping: add Vitest + Testing Library (one separate change) to unlock `strict_tdd: true`.
