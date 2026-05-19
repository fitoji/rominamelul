# Tasks: Font Fix - Landing Page Romina

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~12 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | auto-chain |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: stacked-to-main
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Replace Inter with Cormorant Garamond in layout.tsx | PR 1 | Simple font config change |

---

## Phase 1: Font Configuration Update

- [ ] 1.1 Replace `Inter` import with `Cormorant_Garamond` in `app/layout.tsx` (line 5)
- [ ] 1.2 Remove `inter` variable configuration (lines 14-17)
- [ ] 1.3 Add `cormorant` variable configuration with `variable: '--font-sans'`, `subsets: ['latin']`, `weight: ['400', '500', '600', '700']`
- [ ] 1.4 Update body class from `${lora.variable} ${inter.variable} font-serif` to `${lora.variable} ${cormorant.variable} font-sans` (line 84)

## Phase 2: Verification

- [ ] 2.1 Run `npm run build` to verify no errors
- [ ] 2.2 Verify in dev mode (`npm run dev`) that body text shows Cormorant Garamond and headings show Lora

---

## Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| Phase 1 | 4 | Font config in layout.tsx |
| Phase 2 | 2 | Build and visual verification |
| Total | 6 | |

### Implementation Order

1. Update `app/layout.tsx` — replace Inter with Cormorant_Garamond, update body class
2. Run build verification
3. Verify visually in dev mode

### Next Step

Ready for implementation (sdd-apply).