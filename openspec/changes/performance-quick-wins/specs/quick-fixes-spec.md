# Spec: performance-quick-wins

## Change ID
`performance-quick-wins`

## Status
Draft → Implementing

---

## Overview

Implementar 10 quick-win performance fixes identificados en el codebase audit. El objetivo principal es mejorar LCP (Largest Contentful Paint) y reducir el JavaScript bundle.

---

## Requirements

### R1: Agregar `sizes` a todos los `next/image`

**Ubicaciones**:
- `components/about.tsx` líneas 58-64
- `components/services.tsx` líneas 158-162, 233, 254, etc.
- `components/organizations.tsx` líneas 138-144

**Criterio de aceptación**:
- Cada `next/image` con `fill` o dimensiones fixed debe tener `sizes` apropiado
- `sizes="(max-width: 768px) 100vw, 50vw"` para imágenes de sección
- `sizes="(max-width: 768px) 100vw, 33vw"` para thumbnails en grid

**Verificación**: Lighthouse performance score mejora en mobile

---

### R2: Lazy-load de `html-to-image` en generador

**Ubicación**: `app/generador/page.tsx` línea 5

**Criterio de aceptación**:
- El import de `html-to-image` debe ser dynamic import
- Solo se carga cuando el usuario hace click en "Descargar"
- El resto del formulario funciona sin esta librería

**Verificación**: Bundle analyzer muestra html-to-image fuera del initial bundle

---

### R3: YouTube facade pattern

**Ubicación**: `components/videos.tsx` líneas 49-55

**Criterio de aceptación**:
- El iframe de YouTube no carga al page load
- Muestra un thumbnail estático con un botón de "play"
- Solo carga el iframe cuando el usuario hace click en el thumbnail

**Verificación**: Network tab no muestra requests a YouTube hasta hacer click

---

### R4: Fix CSS typo `h-100` → `h-full`

**Ubicación**: `components/about.tsx` línea 63

**Criterio de aceptación**:
- `h-100` no existe en Tailwind, debe ser `h-full`
- La imagen mantiene su aspect ratio correcto

**Verificación**: Imagen visible en mobile y desktop sin overflow

---

### R5: Remover dead code

**Ubicación**: `app/page.tsx` líneas 11, 26

**Criterio de aceptación**:
- Import de `Testimonials` comentado debe eliminarse
- No hay imports sin usar en el archivo

**Verificación**: `next build` no muestra warnings de imports sin usar

---

### R6: Lazy-load imágenes del contact

**Ubicación**: `components/contact.tsx` líneas 41-45, 134-138

**Criterio de aceptación**:
- Las imágenes de iconos (WhatsApp, etc.) usan `loading="lazy"`
- No afectan LCP porque están below the fold

**Verificación**: Network tab muestra lazy loading en contacto

---

### R7: Pause carousels on visibility change

**Ubicaciones**:
- `components/testimonials.tsx` líneas 126-134
- `components/organizations.tsx` líneas 82-87

**Criterio de aceptación**:
- Los carousels paran su setInterval cuando el tab está hidden
- Reanudan cuando el tab vuelve a estar visible

**Verificación**: No animation cuando tab está en background (console log)

---

### R8: will-change en hover animations

**Ubicación**: `components/gift-massage.tsx` líneas 145, 153, 163, 171

**Criterio de aceptación**:
- Las imágenes con `hover:scale-105` tienen `will-change: transform`
- La animación corre a 60fps sin jank

**Verificación**: DevTools Performance tab muestra smooth frames

---

### R9: Optimizar scroll listener en header

**Ubicación**: `components/header.tsx` líneas 242-246

**Criterio de aceptación**:
- El scroll listener no causa re-renders innecesarios
- Se puede usar CSS `position: sticky` con `backdrop-blur` en vez de JS

**Verificación**: No reflows en scroll, 60fps maintained

---

### R10: Phone format en SEO

**Ubicación**: `lib/seo.ts` línea 27

**Criterio de aceptación**:
- El phone number usa formato internacional correcto: `+34 626 327 361`
- No más `'+34326327361'`

**Verificación**: Structured data válido en validación tools

---

## Scenarios

### S1: Page load con Lighthouse
**Given**: Usuario abre la página en mobile
**When**: Lighthouse corre el audit
**Then**: LCP < 2.5s, TBT < 200ms, CLS < 0.1

### S2: Generador bundle size
**Given**: Usuario abre /generador
**When**: Network tab muestra initial bundle
**Then**: html-to-image NO está en el initial bundle

### S3: YouTube no carga al inicio
**Given**: Usuario abre la página
**When**: Network tab revisa requests externos
**Then**: No requests a youtube.com o googlevideo.com al cargar

### S4: Carousel pausa en background
**Given**: Usuario tiene carousel visible y cambia de tab
**When**: El tab pierde focus
**Then**: El carousel para de animarse

---

## Dependencies

- Ninguna (son fixes independientes)

## Risks

- R1 (sizes) puede cambiar el layout si no se prueba bien → hacer en móvil primero
- R9 (scroll listener) puede afectar sticky header behavior → test extensivo

---

## Verification

1. `next build` pasa sin errores ni warnings
2. Lighthouse performance > 90 en mobile
3. Bundle analyzer muestra reducción de inicial bundle
4. No console errors en la página