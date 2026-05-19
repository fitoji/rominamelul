# SDD Spec: Font Fix - Landing Page Romina

## Overview

Align font declarations between `app/layout.tsx` (next/font/google) and `app/globals.css` (@theme inline) to resolve the Inter/Cormorant Garamond mismatch. The landing page requires Cormorant Garamond for body text (warm, organic feel) and Lora for headings.

---

## Requirements

### R1: Font Loading in layout.tsx

**Description**: Cormorant Garamond must be loaded via next/font/google and assigned to the CSS variable `--font-sans`.

**Details**:
- Import `Cormorant_Garamond` from `next/font/google`
- Configure with:
  - `subsets: ['latin']`
  - `weight: ['400', '500', '600', '700']` (matching Lora weights for consistency)
  - `variable: '--font-sans'`
- Remove the existing `Inter` import and configuration
- Keep `Lora` import with `variable: '--font-serif'`

**Acceptance**:
- [ ] `app/layout.tsx` imports `Cormorant_Garamond` from `next/font/google`
- [ ] `Cormorant_Garamond` config uses `variable: '--font-sans'`
- [ ] `Inter` import is completely removed
- [ ] `Lora` remains with `variable: '--font-serif'`

---

### R2: Body Class Assignment

**Description**: The body element must apply the correct font class to use Cormorant Garamond.

**Details**:
- Current: `${lora.variable} ${inter.variable} font-serif`
- Required: `${lora.variable} ${cormorant.variable} font-sans`

**Acceptance**:
- [ ] Body class string uses `cormorant.variable` (not `inter.variable`)
- [ ] Body class uses `font-sans` (not `font-serif`)

---

### R3: globals.css Font Consistency

**Description**: Verify globals.css correctly maps font variables to the intended fonts.

**Details**:
- `--font-sans` must resolve to `'Cormorant Garamond', 'Georgia', serif`
- `--font-serif` must resolve to `'Lora', 'Georgia', serif`

**Acceptance**:
- [ ] globals.css @theme defines `--font-sans: 'Cormorant Garamond', 'Georgia', serif`
- [ ] globals.css @theme defines `--font-serif: 'Lora', 'Georgia', serif`

---

### R4: No Font Fallback Breakage

**Description**: Fallback fonts must work if Google Fonts fail to load.

**Details**:
- Both `--font-sans` and `--font-serif` include `'Georgia'` as secondary fallback
- Both end with `serif` as last resort

**Acceptance**:
- [ ] Cormorant Garamond fallback chain: `'Cormorant Garamond'` → `'Georgia'` → `serif`
- [ ] Lora fallback chain: `'Lora'` → `'Georgia'` → `serif`

---

### R5: No Typography Regressions

**Description**: All existing typography styling must continue to work correctly after the font change.

**Details**:
- All `font-sans` and `font-serif` utility classes must render correctly
- Heading elements (h1-h6) that use font-serif must still show Lora
- Body text that uses font-sans must now show Cormorant Garamond
- No layout shifts or overflow issues from font changes

**Acceptance**:
- [ ] h1-h6 elements render with Lora (font-serif)
- [ ] p, span, div default text renders with Cormorant Garamond (font-sans)
- [ ] No horizontal scrollbar or overflow from longer/shorter glyphs
- [ ] Build completes without font-related warnings

---

## Scenarios

### S1: Initial Page Load (Happy Path)

**Trigger**: User visits `https://rominamelul.com` for the first time

**Expected**:
1. Browser downloads fonts from Google Fonts (Cormorant Garamond, Lora)
2. CSS variables `--font-sans` and `--font-serif` are set
3. Body text displays in Cormorant Garamond with warm, organic feel
4. Headings display in Lora with elegant serif styling
5. No FOUT (Flash of Unstyled Text) causing layout shift

**Validation**:
- DevTools Network tab shows fonts being loaded
- Page visually shows Cormorant Garamond for body, Lora for headings

---

### S2: Font Loading Failure Fallback

**Trigger**: Google Fonts CDN is unavailable (network issue or outage)

**Expected**:
1. Browser skips Google Fonts
2. Falls back to `'Georgia'` 
3. If Georgia unavailable, falls back to system `serif`
4. Page remains readable but with basic serif font

**Validation**:
- Temporarily block Google Fonts in DevTools → page still renders
- Text remains visible in fallback serif

---

### S3: Tailwind Font Utilities

**Trigger**: Developer uses `font-sans` or `font-serif` classes in components

**Expected**:
- `class="font-sans"` → applies `--font-sans` variable = Cormorant Garamond
- `class="font-serif"` → applies `--font-serif` variable = Lora

**Validation**:
- Check components using these classes (e.g., `<p class="font-sans">`)
- Confirm they render with correct fonts per R1-R3

---

### S4: Build Verification

**Trigger**: Running `npm run build` or `next build`

**Expected**:
- Build succeeds without errors
- No warnings about missing fonts or invalid configurations
- Font metadata is correctly generated

**Validation**:
- `npm run build` exits with code 0
- No error messages related to next/font configuration

---

### S5: Dev Mode Hot Reload

**Trigger**: Developer edits layout.tsx and saves (triggers HMR)

**Expected**:
- Next.js recompiles
- Font changes apply without full page refresh
- No console errors about font loading

**Validation**:
- Edit and save layout.tsx → page updates within seconds
- No React hydration errors in console

---

## Technical Notes

### Current Mismatch Analysis

| File | font-sans | font-serif |
|------|-----------|------------|
| `layout.tsx` (next/font) | Inter | Lora |
| `globals.css` (@theme) | Cormorant Garamond | Lora |

**Result**: Body text shows Inter, but CSS expects Cormorant Garamond.

### Resolution

Replace Inter with Cormorant Garamond in layout.tsx so both sources align:

| File | font-sans | font-serif |
|------|-----------|------------|
| `layout.tsx` (next/font) | Cormorant Garamond | Lora |
| `globals.css` (@theme) | Cormorant Garamond | Lora |

---

## Verification Checklist

- [ ] R1: Cormorant_Garamond loaded in layout.tsx with --font-sans variable
- [ ] R2: Body class uses cormorant.variable and font-sans
- [ ] R3: globals.css font-sans = Cormorant Garamond, font-serif = Lora
- [ ] R4: Fallback fonts configured (Georgia, serif)
- [ ] R5: No typography regressions (headings Lora, body Cormorant Garamond)
- [ ] S1: Page loads with correct fonts
- [ ] S2: Fallback works when Google Fonts unavailable
- [ ] S3: Tailwind utilities work correctly
- [ ] S4: Build succeeds
- [ ] S5: Dev mode HMR works