# Landing Page Romina - Specification

**Domain**: landing-page-romina  
**Type**: bugfix  
**Source**: openspec/changes/archive/2026-05-19-landing-page-romina/specs/font-fix/spec.md

---

## Overview

Fix font mismatch between `app/layout.tsx` (next/font) and `app/globals.css` (@theme). The landing page uses Nunito for body text and Lora for headings.

> **Update 2026-05-19**: Font changed from Cormorant Garamond to Nunito per user request.

---

## Requirements

### R1: Font configuration in layout.tsx

| Location | Current | Change To |
|----------|---------|------------|
| Line 5 | `import { Cormorant_Garamond, Lora }` | `import { Nunito, Lora }` |
| Lines 14-17 | `const cormorant = Cormorant_Garamond({...})` | `const nunito = Nunito({...})` |
| Line 85 | `${cormorant.variable}` | `${nunito.variable}` |

**Acceptance**:
- [x] `Nunito` imported from `next/font/google`
- [x] Variable assigned to `--font-sans`
- [x] Body class uses `font-sans`

### R2: globals.css @theme

The `@theme inline` block in globals.css:

```css
--font-sans: 'Nunito', 'Helvetica', 'Arial', sans-serif;
--font-serif: 'Lora', 'Georgia', serif;
```

**Acceptance**:
- [x] `--font-sans` maps to Nunito
- [x] `--font-serif` maps to Lora
- [x] Fallback chain: Nunito → Helvetica → Arial → sans-serif

### R3: No component-level changes required

- `components/services.tsx` uses `prose prose-stone` which inherits from @theme
- No explicit `font-sans` or `font-serif` overrides needed

**Acceptance**:
- [x] Typography plugin renders correctly with Nunito body
- [x] No layout shifts from font changes

---

## Scenarios

### S1: Page Load - Body Text Renders Nunito

**Trigger**: User visits landing page
**Expected**: Body text displays in Nunito, headings in Lora
**Verification**: Visual inspection, DevTools computed styles

### S2: Fallback When Google Fonts Unavailable

**Trigger**: Network blocks Google Fonts CDN
**Expected**: Falls back to Helvetica → Arial → system sans-serif
**Verification**: Block fonts in DevTools → page remains readable

### S3: Tailwind Utility Classes

**Trigger**: Components use `font-sans` or `font-serif` classes
**Expected**:
- `font-sans` → Nunito
- `font-serif` → Lora
**Verification**: Inspect computed styles on elements

### S4: Build Verification

**Trigger**: `pnpm build`
**Expected**: Exit code 0, no font-related warnings
**Verification**: Run build command

---

## Verification Status

- [x] R1: layout.tsx loads Nunito with `--font-sans`
- [x] R1: Body class uses `font-sans`
- [x] R2: globals.css @theme maps `--font-sans` to Nunito
- [x] R2: Fallback chain configured (Helvetica, Arial, sans-serif)
- [x] R3: No component changes required
- [x] S1: Page renders with correct fonts
- [x] S4: Build succeeds

**Status**: VERIFIED ✅ - PASS

---

*Updated: 2026-05-19 - Font changed from Cormorant Garamond to Nunito*  
*Archived: 2026-05-19 from openspec/changes/archive/2026-05-19-landing-page-romina/*