# SDD Explore: Landing Page for Romina Melul

**Change:** `landing-page-romina`
**Date:** 2026-05-19
**Phase:** Explore

---

## 1. Current App Structure

```
app/
├── favicon.ico
├── globals.css         ← Tailwind v4 CSS-first config
├── globals valorant.css
├── layout.tsx          ← Root layout with fonts, metadata, SEO structured data
└── page.tsx            ← Landing page assembling all sections
```

**Current page composition (app/page.tsx):**

```tsx
<Header /> → <Hero /> → <AboutMe /> → <About /> → <Services /> → <Philosophy /> → <Contact /> → <Footer />
```

**Stack:**

- Next.js 16.2.4 (latest)
- React 19
- Tailwind CSS v4.2.0 (CSS-first `@import 'tailwindcss'`)
- TypeScript 5.7.3
- shadcn/ui components (Radix UI + CVA)
- next-themes for dark mode
- Lucide React for icons
- Vercel Analytics

---

## 2. Existing Components

### Business Components (page sections)

| Component    | File                        | Client? | Purpose                                                        |
| ------------ | --------------------------- | ------- | -------------------------------------------------------------- |
| `Header`     | `components/header.tsx`     | Yes     | Fixed nav with mobile hamburger menu                           |
| `Hero`       | `components/hero.tsx`       | No      | Full-viewport hero with logo image                             |
| `AboutMe`    | `components/about-me.tsx`   | —       | Personal bio section                                           |
| `About`      | `components/about.tsx`      | No      | Therapy explanation with 3 purpose cards                       |
| `Services`   | `components/services.tsx`   | Yes     | 2 main services + 4 complementary practices with Dialog modals |
| `Philosophy` | `components/philosophy.tsx` | —       | Philosophical content section                                  |
| `Contact`    | `components/contact.tsx`    | No      | WhatsApp contact card                                          |
| `Footer`     | `components/footer.tsx`     | No      | Navigation links + copyright                                   |

### UI Component Library (57 components in `components/ui/`)

Fully stocked shadcn/ui v1.x with Radix primitives:

- **Layout:** Card, Accordion, Separator, Sheet (drawer), Resizable panels
- **Navigation:** NavigationMenu, Tabs, Menu/Menubar, Breadcrumb, Pagination
- **Forms:** Input, Textarea, Checkbox, RadioGroup, Select, Switch, Toggle, ToggleGroup, InputOTP, Calendar, Form + react-hook-form + zod integration
- **Feedback:** Toast/Toaster (Sonner), Alert, AlertDialog, Dialog, Popover, HoverCard, Tooltip, Progress, Skeleton
- **Media:** Carousel (Embla), Avatar, AspectRatio
- **Data:** Chart (Recharts), Table
- **Actions:** Button (with CVA variants), Command (cmdk), Kbd

### Utility Components

- `theme-provider.tsx` — next-themes provider
- `use-mobile.tsx` — mobile breakpoint detection hook
- `use-toast.ts` — toast hook

---

## 3. Design System

### Color Palette (defined in `app/globals.css` via CSS variables)

**Light mode:**
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `oklch(0.98 0.005 200)` | Page background — very light turquoise |
| `--foreground` | `oklch(0.25 0.02 220)` | Text — dark blue-gray |
| `--primary` | `oklch(0.65 0.14 200)` | Turquoise (brand core) |
| `--accent` | `oklch(0.78 0.15 75)` | Golden/orange (from logo sun) |
| `--secondary` | `oklch(0.92 0.03 200)` | Light turquoise |
| `--muted` | `oklch(0.95 0.01 200)` | Soft gray-blue |
| `--card` | `oklch(1 0 0)` | Pure white |
| `--border` | `oklch(0.90 0.02 200)` | Light turquoise border |

**Dark mode:** Full dark palette with adjusted luminance values.

### Typography

| Font                 | Role                     | Source           |
| -------------------- | ------------------------ | ---------------- |
| `Cormorant Garamond` | `--font-sans` (body)     | next/font/google |
| `Lora`               | `--font-serif` (display) | next/font/google |
| `Geist Mono`         | `--font-mono`            | System           |

**Note:** `layout.tsx` loads Inter + Lora, but `@theme inline` in globals.css references `Cormorant Garamond` as `--font-sans` and `Lora` as `--font-serif`. Potential mismatch between loaded fonts and CSS variables.

### Visual Identity

- **Logo color:** Turquoise/teal from logo
- **Accent color:** Golden/orange from logo sun
- **Pattern:** Subtle turquoise/golden blur blobs in hero background
- **Radius:** 0.75rem (generous rounded corners)
- **Animations:** tw-animate-css for entrance animations

### Dark Mode

- Uses `next-themes` ThemeProvider pattern
- `dark:` variant applied via `.dark` class on `<html>`

---

## 4. Key Implementation Details

### SEO Setup

- Complete `metadata` object in `layout.tsx` (title, description, OG, Twitter)
- JSON-LD structured data (Organization + Person)
- `globals.css` defines `html { scroll-behavior: smooth }`

### Images

- `next.config.mjs`: `images.unoptimized: true` (no image optimization)
- All images served from `/public/` directory
- Logo: `/romina-logo2.svg` (hero), `/images/logo.png` (header/footer)
- Therapy images: `/images/therapy-1.jpg`, `/images/therapy-2.jpg`, `/images/romi-masajes.webp`
- Icons: `/icons8-*.png` (Icons8 icons for services)

### Animations

- `tw-animate-css` installed for pre-built CSS animations
- Hero scroll indicator: native `animate-bounce`
- Cards: `transition-all duration-300` + `hover:scale-[1.02]`
- Header: `backdrop-blur-md` on scroll
- Mobile menu: conditional render with state

---

## 5. What's Reusable for a Landing Page

✅ **Everything needed is already built.** This IS the landing page.

| Reusable Aspect   | Available                                 |
| ----------------- | ----------------------------------------- |
| Header navigation | ✅ `Header` component (fixed, responsive) |
| Hero section      | ✅ `Hero` with CTAs                       |
| Services display  | ✅ `Services` with Dialog modals          |
| About sections    | ✅ `About`, `AboutMe`                     |
| Contact CTA       | ✅ `Contact` (WhatsApp card)              |
| Footer            | ✅ `Footer` with nav + contact info       |
| Design tokens     | ✅ Full palette in CSS variables          |
| UI components     | ✅ 57 shadcn/ui components                |
| Typography        | ✅ Cormorant Garamond + Lora + Geist Mono |
| Dark mode         | ✅ next-themes configured                 |
| SEO               | ✅ Metadata + JSON-LD                     |
| Analytics         | ✅ Vercel Analytics                       |

---

## 6. What's Missing / Areas for Improvement

### High Priority

1. **Font mismatch:** `layout.tsx` loads Inter + Lora via next/font, but `globals.css` `@theme` references Cormorant Garamond as `--font-sans` and Lora as `--font-serif`. The actual body font being used is Inter (loaded but not referenced in CSS). Need to either:
   - Remove Inter from layout and keep Cormorant Garamond, OR
   - Add Cormorant Garamond to next/font imports and use it consistently

2. **No animations on scroll:** The page is static. A landing page would benefit from scroll-triggered entrance animations (framer-motion or CSS animations with Intersection Observer).

3. **No test suite:** No Jest, Playwright, or Vitest configured.

4. **Image optimization disabled:** `images.unoptimized: true` — consider enabling for production performance.

### Medium Priority

5. **No loading states:** Components lack Suspense boundaries or skeleton states.
6. **Accessibility audit needed:** No ARIA testing, focus management could be improved.
7. **No error boundary:** Missing `error.tsx` in the app root.
8. **Services component uses client-side dialogs:** Good, but the main `About` and `Hero` sections are server components — this is correct, but the services dialogs load all full descriptions in the client bundle.

### Low Priority

9. **`globals valorant.css`:** An extra CSS file (likely unused) — confirm if needed.
10. **No sitemap.xml or robots.txt:** Standard for a production landing page.

---

## 7. Recommended Approach

### Assessment

The project already HAS a complete landing page. The current `app/page.tsx` assembles all sections into a functional landing page for Romina Melul's therapy practice. The design system (turquoise + golden palette), typography (serif fonts for an organic/warm feel), and component library are all in place.

### For SDD Phases

**Spec:** Focus on WHAT needs to change — specific sections to redesign, features to add, or improvements to existing sections. The existing landing page is functional, so the SDD should identify concrete changes rather than rebuilding from scratch.

**Design:**

- Leverage existing design tokens (turquoise/teal + golden accent)
- Consider serif typography (Cormorant/Lora) for warmth
- Plan scroll-triggered animations for impact
- Keep the organic, therapeutic aesthetic

**Implementation tasks would cover:**

1. Fix font loading mismatch
2. Add scroll-triggered entrance animations
3. Optionally: enhance hero with motion effects, improve mobile experience
4. Ensure accessibility compliance (WCAG)
5. Add error boundary and test infrastructure

### Next Step

Proceed to **SDD Spec** phase with a clear change definition. Since the landing page exists, the SDD should focus on:

- Specific section redesigns (e.g., "enhance Hero with animated background")
- New features (e.g., "add scroll-triggered entrance animations")
- Technical improvements (e.g., "fix font configuration mismatch")

---

## 8. File Inventory

| Path                        | Type      | Purpose                            |
| --------------------------- | --------- | ---------------------------------- |
| `app/globals.css`           | CSS       | Tailwind v4 config + design tokens |
| `app/layout.tsx`            | Layout    | Root layout, fonts, metadata, SEO  |
| `app/page.tsx`              | Page      | Landing page composition           |
| `components/header.tsx`     | Component | Fixed navigation                   |
| `components/hero.tsx`       | Component | Hero section                       |
| `components/about-me.tsx`   | Component | Personal bio                       |
| `components/about.tsx`      | Component | Therapy explanation                |
| `components/services.tsx`   | Component | Services + Dialog modals           |
| `components/philosophy.tsx` | Component | Philosophy section                 |
| `components/contact.tsx`    | Component | WhatsApp contact                   |
| `components/footer.tsx`     | Component | Footer                             |
| `components/ui/button.tsx`  | UI        | Button with CVA variants           |
| `components/ui/card.tsx`    | UI        | Card component                     |
| `components/ui/dialog.tsx`  | UI        | Dialog modal                       |
| `components/ui/tooltip.tsx` | UI        | Tooltip (used in Hero)             |
| `lib/utils.ts`              | Utility   | `cn()` helper                      |
| `lib/seo.ts`                | Utility   | JSON-LD structured data            |
| `package.json`              | Config    | Dependencies                       |
| `next.config.mjs`           | Config    | Next.js config                     |
