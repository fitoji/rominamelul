# Delta Spec: Font Fix - Landing Page Romina

**Domain**: landing-page-romina  
**Type**: bugfix  
**Spec Path**: openspec/changes/landing-page-romina/specs/font-fix/spec.md  
**Design Source**: sdd/landing-page-romina/design/design.md

---

## Overview

Fix font mismatch between `app/layout.tsx` (next/font) and `app/globals.css` (@theme). The landing page requires Cormorant Garamond for body text (warm, organic aesthetic) and Lora for headings.

---

## Requirements

### R1: Replace Inter with Cormorant Garamond in layout.tsx

| Location | Current (Mismatch) | Change To |
|----------|-------------------|------------|
| Line 5 | `import { Inter, Lora }` | `import { Cormorant_Garamond, Lora }` |
| Lines 14-17 | `const inter = Inter({...})` | `const cormorant = Cormorant_Garamond({...})` |
| Line 85 | `font-serif` | `font-sans` |

**Acceptance**:
- [x] `Cormorant_Garamond` imported from `next/font/google`
- [x] Variable assigned to `--font-sans`
- [x] `Inter` completely removed
- [x] Body class uses `font-sans`

### R2: globals.css remains unchanged

The `@theme inline` block in globals.css is already correct:

```css
--font-sans: 'Cormorant Garamond', 'Georgia', serif;
--font-serif: 'Lora', 'Georgia', serif;
```

**Acceptance**:
- [x] `--font-sans` maps to Cormorant Garamond
- [x] `--font-serif` maps to Lora
- [x] Fallback chain: Google Font → Georgia → serif

### R3: No component-level changes required

- `components/services.tsx` uses `prose prose-stone` which inherits from @theme
- No explicit `font-sans` or `font-serif` overrides needed

**Acceptance**:
- [x] Typography plugin renders correctly with Cormorant Garamond body
- [x] No layout shifts from font changes

---

## Scenarios

### S1: Page Load - Body Text Renders Cormorant Garamond

**Trigger**: User visits landing page  
**Expected**: Body text displays in Cormorant Garamond, headings in Lora  
**Verification**: Visual inspection, DevTools computed styles

### S2: Fallback When Google Fonts Unavailable

**Trigger**: Network blocks Google Fonts CDN  
**Expected**: Falls back to Georgia, then system serif  
**Verification**: Block fonts in DevTools → page remains readable

### S3: Tailwind Utility Classes

**Trigger**: Components use `font-sans` or `font-serif` classes  
**Expected**:
- `font-sans` → Cormorant Garamond
- `font-serif` → Lora  
**Verification**: Inspect computed styles on elements

### S4: Build Verification

**Trigger**: `pnpm build`  
**Expected**: Exit code 0, no font-related warnings  
**Verification**: Run build command

---

## Current Implementation Status

| File | Status | Details |
|------|--------|---------|
| `app/layout.tsx` | ✅ Done | Cormorant_Garamond loaded, body uses `font-sans` |
| `app/globals.css` | ✅ Verified | @theme fonts correctly aligned |
| `components/` | ✅ No changes | Inheritance from @theme works |

---

## Verification Checklist

- [x] R1: layout.tsx loads Cormorant_Garamond with `--font-sans`
- [x] R1: Body class uses `font-sans` (not `font-serif`)
- [x] R2: globals.css @theme maps `--font-sans` to Cormorant Garamond
- [x] R2: Fallback chain configured (Georgia, serif)
- [x] R3: No component changes required
- [x] S1: Page renders with correct fonts
- [x] S4: Build succeeds

---

## Next Step

**Recommendation**: Proceed to **sdd-verify** to confirm implementation matches spec, or **sdd-archive** if verification is complete.

The font fix is implemented and aligned with the design. All acceptance criteria are satisfied.