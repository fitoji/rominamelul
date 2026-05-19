# Proposal: Fix Font Mismatch in Landing Page

## Intent

Align font declarations between `layout.tsx` (next/font) and `globals.css` (@theme) to resolve the Inter/Cormorant Garamond mismatch. The warm, organic aesthetic of the landing page requires Cormorant Garamond for sans-serif text.

## Scope

### In Scope
- Update `app/layout.tsx` to load Cormorant Garamond via next/font
- Verify `app/globals.css` @theme correctly references Cormorant Garamond + Lora
- Ensure body element applies the correct font classes

### Out of Scope
- Other page-specific font adjustments
- Adding or removing font weights/variants

## Capabilities

> This is a pure refactor — no new or modified spec-level capabilities. The font configuration is implementation-only.

### New Capabilities
None (pure config alignment)

### Modified Capabilities
None (existing behavior preserved)

## Approach

Replace `Inter` with `Cormorant Garamond` in `layout.tsx` while keeping `Lora` as the serif font. This aligns with the design intent: Cormorant Garamond provides the warm, organic feel for body/sans-serif text, Lora remains for headings.

**Changes:**
1. `app/layout.tsx`: Replace `Inter` import → `Cormorant_Garamond` from next/font/google
2. `app/globals.css`: Already correct — `--font-sans: 'Cormorant Garamond'`, `--font-serif: 'Lora'`

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/layout.tsx` | Modified | Swap Inter for Cormorant_Garamond, update body class |
| `app/globals.css` | Verified | Confirm @theme fonts are correct |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|-------------|
| Font not available in next/font/google | Low | Verify Cormorant Garamond is in Google Fonts |
| Fallback fonts not loading | Low | Specify Georgia as fallback in globals.css |

## Rollback Plan

Revert `layout.tsx` to use `Inter` instead of Cormorant Garamond. The change is isolated to one file and one import swap.

## Dependencies

- None

## Success Criteria

- [ ] `layout.tsx` loads Cormorant Garamond via next/font with `--font-sans` variable
- [ ] Body class uses `font-sans` which resolves to Cormorant Garamond
- [ ] globals.css @theme and layout.tsx next/font use the same fonts
- [ ] Page renders with warm, organic font aesthetic (Cormorant Garamond + Lora)