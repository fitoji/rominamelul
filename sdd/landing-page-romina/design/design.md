# Technical Design: Font Fix - Inter to Cormorant Garamond

## Overview

This design specifies the implementation to fix the font mismatch between `layout.tsx` (next/font) and `globals.css` (@theme). The landing page requires Cormorant Garamond for the warm, organic aesthetic.

---

## Current State

### `app/layout.tsx`
```tsx
import { Inter, Lora } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

// Body uses: className={`${lora.variable} ${inter.variable} font-serif antialiased`}
```

### `app/globals.css` @theme
```css
@theme inline {
  --font-sans: 'Cormorant Garamond', 'Georgia', serif;
  --font-serif: 'Lora', 'Georgia', serif;
}
```

### Problem
- `layout.tsx` loads Inter → assigns to `--font-sans`
- `globals.css` expects `--font-sans` → 'Cormorant Garamond'
- Body class uses `font-serif`, which applies Lora everywhere

---

## Required Changes

### 1. `app/layout.tsx`

| Line | Current | Change To |
|------|---------|------------|
| 5 | `import { Inter, Lora } from 'next/font/google'` | `import { Cormorant_Garamond, Lora } from 'next/font/google'` |
| 14-17 | `const inter = Inter({...})` | `const cormorant = Cormorant_Garamond({...})` |
| 84 | `${lora.variable} ${inter.variable} font-serif` | `${lora.variable} ${cormorant.variable} font-sans` |

**Exact replacement:**

```tsx
// Line 5: Replace import
import { Cormorant_Garamond, Lora } from 'next/font/google'

// Lines 14-17: Replace inter declaration
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-sans',
})

// Line 84: Update body class
className={`${lora.variable} ${cormorant.variable} font-sans antialiased`}
```

**Font configuration options for Cormorant_Garamond:**
```tsx
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})
```

### 2. `app/globals.css` @theme

**Status:** Already correct. No changes needed.

```css
@theme inline {
  --font-sans: 'Cormorant Garamond', 'Georgia', serif;
  --font-serif: 'Lora', 'Georgia', serif;
}
```

### 3. Component-Level Font Classes

**Search results:**
- `components/services.tsx` uses `prose prose-stone max-w-none`

**Action:** No changes required. The Typography plugin (`prose-stone`) inherits from the @theme font variables. With `font-sans` applied to body:
- `prose` elements will use `--font-sans` (Cormorant Garamond) as the base
- Typography plugin respects the design token system

If explicit control is needed for prose headings vs body:
```tsx
// Optional: Force serif for headings in prose
<div className="prose prose-stone prose-headings:font-serif font-sans">
```

### 4. Verify No Other Inter References

**Search result:** Inter only appears in `app/layout.tsx` (lines 5, 14)

**Conclusion:** No other files require changes.

---

## Implementation Order

1. **Update `app/layout.tsx`:**
   - Replace import: `Inter` → `Cormorant_Garamond`
   - Replace variable: `inter` → `cormorant`
   - Update body class: `font-serif` → `font-sans`

2. **Verify `app/globals.css`:**
   - Confirm @theme fonts are correct (already validated)

3. **Verify component usage:**
   - Check `components/services.tsx` renders correctly

---

## Verification Checklist

- [ ] `layout.tsx` loads Cormorant Garamond via next/font with `--font-sans` variable
- [ ] Body class uses `font-sans` which resolves to Cormorant Garamond
- [ ] globals.css @theme and layout.tsx next/font use aligned fonts
- [ ] No other files reference Inter
- [ ] Page renders with warm, organic font aesthetic

---

## Risk Mitigation

| Risk | Likelihood | Mitigation |
|------|------------|-------------|
| Font not in Google Fonts | Low | Verified: Cormorant_Garamond available in next/font/google |
| Fallback not working | Low | Georgia fallback specified in globals.css |
| Prose styling mismatch | Low | Typography plugin inherits from @theme; verify in browser |

---

## Rollback Plan

To revert:
```tsx
// layout.tsx
import { Inter, Lora } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

// body class
className={`${lora.variable} ${inter.variable} font-serif antialiased`}
```

Change is isolated to 3 locations in `layout.tsx`.