# Landing Page Romina - Specification

**Domain**: landing-page-romina  
**Type**: bugfix  
**Source**: openspec/changes/archive/2026-05-19-landing-page-romina/specs/font-fix/spec.md

---

## Overview

Fix font mismatch between `app/layout.tsx` (next/font) and `app/globals.css` (@theme). The landing page uses Nunito for body text and Lora for headings. Add theme switching (Claro / Oscuro) and eliminate the first-paint FOUC.

> **Update 2026-05-19**: Font changed from Cormorant Garamond to Nunito per user request.
> **Update 2026-06-02**: Dark mode added — `next-themes` `ThemeProvider` mounted in the root layout, a two-option `ModeToggle` rendered in the Header (desktop nav and mobile sheet), and an inline no-FOUC script in an explicit `<head>` block. See R4, R5 and S4.1–S4.4, S5.1.

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

### R4: Theme switching (light / dark)

The system MUST permitir al visitante alternar entre tema claro y oscuro desde el Header, ofreciendo exactamente dos opciones (`light` y `dark`) y MUST NOT exponer una opción "Sistema" en la UI.

The system MUST montar un `next-themes` `ThemeProvider` en `app/layout.tsx`, dentro del `TooltipProvider` existente, envolviendo `{children}`. El provider MUST configurarse con `attribute="class"`, `defaultTheme="light"`, `disableTransitionOnChange`, y `enableSystem={false}`.

The system MUST renderizar un `ModeToggle` (basado en `Button`) en el Header, en la barra de navegación desktop (entre el `Separator` y el CTA "Contacto") y en el footer del mobile sheet (sobre el CTA "Agenda tu sesión").

The `<html>` element MUST llevar `suppressHydrationWarning` para silenciar el hydration warning que `next-themes` causa al mutar la clase antes de hidratar.

The `ModeToggle` MUST llamar a `useTheme()` de `next-themes`, MUST alternar entre los iconos `Sun` y `Moon` (de `lucide-react`) según `resolvedTheme`, y MUST aplicar `aria-label` (en español, forma imperativa) y `aria-pressed` que reflejen el estado actual.

The `ModeToggle` MUST gatear el icono detrás de un flag `mounted` (seteado en `useEffect`) para evitar mismatch SSR/cliente.

The tema seleccionado MUST persistir entre recargas vía `localStorage` con la `storageKey` default de `next-themes` (`"theme"`).

**Acceptance**:
- [x] `ThemeProvider` mounted in `app/layout.tsx` inside `TooltipProvider` with the four required props
- [x] `<html>` carries `suppressHydrationWarning`
- [x] `ModeToggle` rendered in BOTH desktop nav and mobile sheet footer
- [x] Exactly two theme options exposed in the UI; no "system" affordance
- [x] `ModeToggle` swaps `Sun` / `Moon` icons and exposes `aria-label` + `aria-pressed`
- [x] Icon gated behind a `mounted` flag set in `useEffect` (SSR-safe)
- [x] Persists across reloads via `localStorage` with the `next-themes` default `storageKey` (`"theme"`)

### R5: No flash of unstyled content (no FOUC) on first paint

The system MUST incluir un `<script>` inline (usando `dangerouslySetInnerHTML`) dentro de un bloque `<head>` explícito de `app/layout.tsx` que, antes del primer paint, lea `localStorage.getItem('theme')` y alterne `.dark` en `<html>`.

The inline script MUST envolverse en `try/catch` para que, si `localStorage` lanza (ej. Safari private mode), el script falle silenciosamente y la página caiga al tema `light` por defecto.

Cuando `localStorage.getItem('theme')` es ausente o no parseable, the inline script MUST defaultear a `light` (sin `.dark` en `<html>`).

The inline script MUST setear `document.documentElement.style.colorScheme` al tema resuelto para tematizar form controls y scrollbars en el primer paint.

The system MUST declarar un export `viewport` en `app/layout.tsx` con `colorScheme: 'light dark'` y dos entradas `themeColor` con media queries para `prefers-color-scheme: light` y `prefers-color-scheme: dark`.

**Acceptance**:
- [x] Inline `<script dangerouslySetInnerHTML>` lives inside an explicit `<head>` in `app/layout.tsx`
- [x] Script defaults to `light` when `localStorage.getItem('theme')` is absent or unparseable
- [x] Script sets `document.documentElement.style.colorScheme` to the resolved theme
- [x] Script body wrapped in `try/catch` so `localStorage` errors fail silently
- [x] `viewport` export with `colorScheme: 'light dark'` and two `themeColor` media-query entries

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

### S4.1: Toggle flips theme (both directions)

**Given** un visitante en `/` sin tema persistido y `defaultTheme="light"`, la página renderiza en claro.
**When** clickea el `ModeToggle` del header, llama a `setTheme("dark")`, y `next-themes` agrega `.dark` a `<html>` y escribe `localStorage.theme = "dark"`.
**Then** la página re-renderiza en oscuro dentro de un animation frame, el icono cambia de `Moon` a `Sun`, y `aria-pressed` es `true`.
**And** clickear otra vez llama a `setTheme("light")`, remueve `.dark` de `<html>`, y escribe `localStorage.theme = "light"`. La página re-renderiza en claro y el icono vuelve a `Moon`.

**Verification**: Click `ModeToggle` in the Header (desktop or mobile sheet) and inspect `<html>` class, `localStorage.theme`, icon swap, and `aria-pressed`. Repeat in the opposite direction.

### S4.2: Theme persists across hard reload

**Given** un visitante con `localStorage.theme === "dark"` de una sesión previa, hard-reloading `/` con cache deshabilitada.
**When** el browser parsea el HTML, el script no-FOUC inline corre sincrónicamente, lee `"dark"`, agrega `.dark` a `<html>`, y setea `style.colorScheme = "dark"`.
**Then** el primer paint muestra oscuro (sin flash de claro), y React hidrata sin warnings porque `<html>` tiene `suppressHydrationWarning`.

**Verification**: Set `localStorage.theme = "dark"`, hard-reload, and confirm `<html>` carries the `dark` class on first paint with no FOUC. Confirm the React console has no hydration warning.

### S4.3: First-visit user with no persisted theme

**Given** un visitante de primera vez sin `localStorage.theme`.
**When** carga `/`.
**Then** la página renderiza en claro (el `defaultTheme`), sin flash, y el `ModeToggle` muestra `Moon`.

**Verification**: Clear `localStorage.theme`, reload, and confirm the first paint is the light theme and the toggle shows the `Moon` icon.

### S4.4: localStorage disabled (degraded environment)

**Given** un visitante con `localStorage` deshabilitado (ej. Safari private mode).
**When** el script no-FOUC corre y el `try/catch` traga el error de acceso.
**Then** la página cae a claro (sin `.dark`), y el `ModeToggle` sigue funcionando dentro de la sesión pero no persiste entre recargas. Degradación documentada; no regresión.

**Verification**: In DevTools, block `localStorage` access (or use Safari private mode) and confirm the page falls back to light with no thrown errors, and the toggle still flips the theme within the session.

### S5.1: `color-scheme` and `theme-color` meta tags emitted

**Given** el root layout exporta `viewport` con `colorScheme: 'light dark'` y dos entradas `themeColor`.
**When** la página carga en un browser moderno.
**Then** el `<head>` contiene `<meta name="color-scheme" content="light dark">` y dos `<meta name="theme-color">` con `media` apropiado, y el browser tematiza form controls, scrollbars, y el chrome móvil acorde.

**Verification**: Inspect the rendered `<head>` and confirm the three `<meta>` tags. In DevTools, toggle the OS `prefers-color-scheme` and confirm form controls and scrollbars track the OS theme.

---

## Verification Status

- [x] R1: layout.tsx loads Nunito with `--font-sans`
- [x] R1: Body class uses `font-sans`
- [x] R2: globals.css @theme maps `--font-sans` to Nunito
- [x] R2: Fallback chain configured (Helvetica, Arial, sans-serif)
- [x] R3: No component changes required
- [x] S1: Page renders with correct fonts
- [x] S4: Build succeeds
- [x] R4: `ThemeProvider` mounted with the four required props; `ModeToggle` in desktop nav and mobile sheet
- [x] R4: `<html>` carries `suppressHydrationWarning`; `ModeToggle` uses `useTheme()`, swaps `Sun` / `Moon`, exposes `aria-label` + `aria-pressed`
- [x] R4: Icon gated behind a `mounted` flag set in `useEffect` (SSR-safe)
- [x] R4: Persists across reloads via `localStorage` with the `next-themes` default `storageKey`
- [x] R5: Inline `<script>` in an explicit `<head>` reads `localStorage.theme`, defaults to `light`, sets `style.colorScheme`
- [x] R5: Script body wrapped in `try/catch`; fails silently on `localStorage` errors
- [x] R5: `viewport` export with `colorScheme: 'light dark'` and two `themeColor` media-query entries
- [x] S4.1: Toggle flips theme in both directions; `aria-pressed` reflects state
- [x] S4.2: Theme persists across hard reload; no FOUC on first paint; no hydration warning
- [x] S4.3: First-visit user (no `localStorage.theme`) lands on light; `ModeToggle` shows `Moon`
- [x] S4.4: `localStorage` disabled → silent fallback to light; toggle still works within the session
- [x] S5.1: `<meta name="color-scheme">` and two `<meta name="theme-color">` emitted

**Status**: VERIFIED ✅ - PASS

---

*Updated: 2026-05-19 - Font changed from Cormorant Garamond to Nunito*  
*Archived: 2026-05-19 from openspec/changes/archive/2026-05-19-landing-page-romina/*  
*Updated: 2026-06-02 - Dark mode: R4 (theme switching) and R5 (no FOUC) merged; S4.1–S4.4 + S5.1 added*  
*Archived: 2026-06-02 from openspec/changes/dark-mode/*