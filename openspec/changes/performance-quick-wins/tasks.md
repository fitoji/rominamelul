# Tasks: performance-quick-wins

## Change ID
`performance-quick-wins`

---

## Estado actual (snapshot 2026-06-02)

- ✅ **Hechas (8)**: T1, T2, T3, T4, T6, T9, T11, T12
- ❌ **Pendientes (4)**: T5, T7, T8, T10
- ⚪ **N/A (1)**: T13 (build verification, embebido en cada commit)

**Resumen de progreso**: 8/12 tasks reales completadas (T13 es ceremonia, no trabajo). Las 4 pendientes son cambios mecánicos chicos, sin dependencias entre sí.

> Nota: la `proposal.md` original dice "10 quick wins" pero hay 13 tasks listadas — T13 es build verify embebido y no es un fix real. Cosmético, no bloquea.

---

## Task List

### T1: Fix `sizes` en about.tsx ✅
**File**: `components/about.tsx`
**Lines**: 58-64
**Action**: Agregar `sizes="(max-width: 768px) 100vw, 50vw"` al Image de romi02-masajes.webp
**Commit**: `fix(about): add sizes prop to next/image`
**Status**: Hecho en `96c42f4` (junto con T2)

---

### T2: Fix `h-100` typo ✅
**File**: `components/about.tsx`
**Lines**: 63
**Action**: Cambiar `h-100` a `h-full`
**Commit**: `fix(about): correct h-100 to h-full tailwind class`
**Status**: Hecho en `96c42f4` (junto con T1)

---

### T3: Add sizes a services.tsx ✅
**File**: `components/services.tsx`
**Lines**: 158-162, 233, 254 y demás imágenes con fill
**Action**: Agregar `sizes` apropiado a cada Image
**Commit**: `fix(services): add sizes prop to all next/image components`
**Status**: Hecho en `21b2b1f`

---

### T4: Add sizes a organizations.tsx ✅
**File**: `components/organizations.tsx`
**Lines**: 138-144
**Action**: Agregar `sizes` a las imágenes del carousel
**Commit**: `fix(organizations): add sizes prop to slider images`
**Status**: Hecho en `944956a` (junto con T9)

---

### T5: Lazy-load html-to-image en generador ❌
**File**: `app/generador/page.tsx`
**Lines**: 5
**Action**: Cambiar import estático a dynamic import, usar en el handler de download
**Commit**: `perf(generador): lazy load html-to-image on download click`
**Status**: **Pendiente** — línea 5 aún tiene `import { toJpeg } from "html-to-image"` estático. Reemplazar por `const { toJpeg } = await import("html-to-image")` dentro del `handleDownload`.

---

### T6: YouTube facade en videos.tsx ✅
**File**: `components/videos.tsx`
**Lines**: 49-55
**Action**: Crear thumbnail facade con botón de play, cargar iframe solo on click
**Commit**: `perf(videos): add youtube facade pattern`
**Status**: Hecho en `86b366e perf(videos): add youtube facade pattern with click-to-load`

---

### T7: Lazy-load imágenes en contact.tsx ❌
**File**: `components/contact.tsx`
**Lines**: 41-45, 134-138
**Action**: Agregar `loading="lazy"` a los iconos de WhatsApp
**Commit**: `perf(contact): add loading lazy to images`
**Status**: **Pendiente** — `components/contact.tsx` no tiene `loading="lazy"` en ningún `<Image>`. Verificar que las imágenes decorativas (iconos WhatsApp/teléfono/mail) lo lleven.

---

### T8: Pause carousel on visibility change (testimonials) ❌
**File**: `components/testimonials.tsx`
**Lines**: 126-134
**Action**: Agregar `document.addEventListener('visibilitychange')` para pausar `setInterval`
**Commit**: `perf(testimonials): pause carousel when tab hidden`
**Status**: **Pendiente** — `components/testimonials.tsx:129` tiene `setInterval` pero no hay listener de `visibilitychange`. Patrón a copiar: T9 ya lo aplicó en organizations.

---

### T9: Pause carousel on visibility change (organizations) ✅
**File**: `components/organizations.tsx`
**Lines**: 82-87
**Action**: Mismo patrón que T8
**Commit**: `perf(organizations): pause carousel when tab hidden`
**Status**: Hecho en `944956a` (junto con T4)

---

### T10: Remover dead code en page.tsx ❌
**File**: `app/page.tsx`
**Lines**: 11, 26
**Action**: Eliminar import comentado de Testimonials
**Commit**: `chore(page): remove unused Testimonials import`
**Status**: **Pendiente** — `app/page.tsx:25` aún contiene `{/* <Testimonials /> */}`. Buscar también si hay import de Testimonials en línea ~11 y eliminarlo.

---

### T11: will-change en gift-massage.tsx ✅
**File**: `components/gift-massage.tsx`
**Lines**: 145, 153, 163, 171
**Action**: Agregar `will-change: transform` via className o style
**Commit**: `perf(gift-massage): add will-change to hover scale images`
**Status**: Hecho en `eb09800 perf(gift-massage): add sizes and will-change to images, fix aria-hidden`

---

### T12: Fix phone format en lib/seo.ts ✅
**File**: `lib/seo.ts`
**Line**: 27
**Action**: Cambiar `'+34326327361'` a `'+34 626 327 361'`
**Commit**: `fix(seo): correct phone number format`
**Status**: Hecho en `adeb664 fix(seo): correct phone number format to international standard`

---

### T13: Build verification ⚪
**Action**: Correr `next build` para verificar que no hay errores
**Commit**: (integrado en cada fix si pasa, o revert si falla)
**Status**: N/A — verificación embebida en el workflow de cada commit. No es un fix independiente.

---

## Suggested Execution Order (sólo para las pendientes)

1. T5 — `app/generador/page.tsx` (1 cambio pequeño)
2. T7 — `components/contact.tsx` (agregar `loading="lazy"` en 1–2 `<Image>`)
3. T8 — `components/testimonials.tsx` (copiar patrón de T9)
4. T10 — `app/page.tsx` (borrar 1 comentario + 1 import)

**Estimación**: 4 commits chicos, total ~30 líneas modificadas, sin dependencias entre sí. Aplicables en cualquier orden.

---

## Verification Commands

```bash
# Build
pnpm build

# Lighthouse (después de T5)
npx lighthouse http://localhost:3000 --only-categories=performance

# Bundle analyzer (después de T5)
npx next build --analyze
```
