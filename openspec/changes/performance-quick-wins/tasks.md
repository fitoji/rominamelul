# Tasks: performance-quick-wins

## Change ID
`performance-quick-wins`

---

## Task List

### T1: Fix `sizes` en about.tsx
**File**: `components/about.tsx`
**Lines**: 58-64
**Action**: Agregar `sizes="(max-width: 768px) 100vw, 50vw"` al Image de romi02-masajes.webp
**Commit**: `fix(about): add sizes prop to next/image`

---

### T2: Fix `h-100` typo
**File**: `components/about.tsx`
**Lines**: 63
**Action**: Cambiar `h-100` a `h-full`
**Commit**: `fix(about): correct h-100 to h-full tailwind class`

---

### T3: Add sizes a services.tsx
**File**: `components/services.tsx`
**Lines**: 158-162, 233, 254 y demás imágenes con fill
**Action**: Agregar `sizes` apropiado a cada Image
**Commit**: `fix(services): add sizes prop to all next/image components`

---

### T4: Add sizes a organizations.tsx
**File**: `components/organizations.tsx`
**Lines**: 138-144
**Action**: Agregar `sizes` a las imágenes del carousel
**Commit**: `fix(organizations): add sizes prop to slider images`

---

### T5: Lazy-load html-to-image en generador
**File**: `app/generador/page.tsx`
**Lines**: 5
**Action**: Cambiar import estático a dynamic import, usar en el handler de download
**Commit**: `perf(generador): lazy load html-to-image on download click`

---

### T6: YouTube facade en videos.tsx
**File**: `components/videos.tsx`
**Lines**: 49-55
**Action**: Crear thumbnail facade con botón de play, cargar iframe solo on click
**Commit**: `perf(videos): add youtube facade pattern`

---

### T7: Lazy-load imágenes en contact.tsx
**File**: `components/contact.tsx`
**Lines**: 41-45, 134-138
**Action**: Agregar `loading="lazy"` a los iconos de WhatsApp
**Commit**: `perf(contact): add loading lazy to images`

---

### T8: Pause carousel on visibility change (testimonials)
**File**: `components/testimonials.tsx`
**Lines**: 126-134
**Action**: Agregar document.addEventListener('visibilitychange') para pausar setInterval
**Commit**: `perf(testimonials): pause carousel when tab hidden`

---

### T9: Pause carousel on visibility change (organizations)
**File**: `components/organizations.tsx`
**Lines**: 82-87
**Action**: Mismo patrón que T8
**Commit**: `perf(organizations): pause carousel when tab hidden`

---

### T10: Remover dead code en page.tsx
**File**: `app/page.tsx`
**Lines**: 11, 26
**Action**: Eliminar import comentado de Testimonials
**Commit**: `chore(page): remove unused Testimonials import`

---

### T11: will-change en gift-massage.tsx
**File**: `components/gift-massage.tsx`
**Lines**: 145, 153, 163, 171
**Action**: Agregar `will-change: transform` via className o style
**Commit**: `perf(gift-massage): add will-change to hover scale images`

---

### T12: Fix phone format en lib/seo.ts
**File**: `lib/seo.ts`
**Line**: 27
**Action**: Cambiar `'+34326327361'` a `'+34 626 327 361'`
**Commit**: `fix(seo): correct phone number format`

---

### T13: Build verification
**Action**: Correr `next build` para verificar que no hay errores
**Commit**: (integrado en cada fix si pasa, o revert si falla)

---

## Execution Order

1. T1 + T2 (mismo archivo, mismo commit si querés)
2. T3
3. T4
4. T5
5. T6
6. T7
7. T8
8. T9
9. T10
10. T11
11. T12
12. T13

---

## Verification Commands

```bash
# Build
pnpm build

# Lighthouse (después de T1-T4)
npx lighthouse http://localhost:3000 --only-categories=performance

# Bundle analyzer (después de T5)
npx next build --analyze
```