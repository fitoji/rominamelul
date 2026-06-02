# Spec: dark-mode

## Change ID
`dark-mode`

## Status
Draft → Implementing

## Source
- Proposal: `openspec/changes/dark-mode/proposal.md` · Design: `openspec/changes/dark-mode/design.md` · Merged into: `openspec/specs/landing-page-romina/spec.md` (delta, no removals)

## Overview

Esta delta agrega **theme switching (Claro / Oscuro)** y elimina el flash de tema incorrecto en el primer paint a `landing-page-romina`. Son dos nuevos requirements (R4, R5) y cinco scenarios composites — no introduce capability nueva. Cablea al runtime la fundación ya existente (`next-themes@0.4.6`, `ThemeProvider` en `components/theme-provider.tsx`, tokens bajo `.dark` en `app/globals.css`) y repara como efecto colateral el `useTheme()` huérfano en `components/ui/sonner.tsx:3`.

---

## MODIFIED Requirements

### Requirement: R4 — Theme switching (light / dark)

The system MUST permitir al visitante alternar entre tema claro y oscuro desde el Header, ofreciendo exactamente dos opciones (`light` y `dark`) y MUST NOT exponer una opción "Sistema" en la UI.

The system MUST montar un `next-themes` `ThemeProvider` en `app/layout.tsx`, dentro del `TooltipProvider` existente, envolviendo `{children}`. El provider MUST configurarse con `attribute="class"`, `defaultTheme="light"`, `disableTransitionOnChange`, y `enableSystem={false}`.

The system MUST renderizar un `ModeToggle` (basado en `Button`) en el Header, en la barra de navegación desktop (entre el `Separator` y el CTA "Contacto") y en el footer del mobile sheet (sobre el CTA "Agenda tu sesión").

The `<html>` element MUST llevar `suppressHydrationWarning` para silenciar el hydration warning que `next-themes` causa al mutar la clase antes de hidratar.

The `ModeToggle` MUST llamar a `useTheme()` de `next-themes`, MUST alternar entre los iconos `Sun` y `Moon` (de `lucide-react`) según `resolvedTheme`, y MUST aplicar `aria-label` (en español, forma imperativa) y `aria-pressed` que reflejen el estado actual.

The `ModeToggle` MUST gatear el icono detrás de un flag `mounted` (seteado en `useEffect`) para evitar mismatch SSR/cliente.

The tema seleccionado MUST persistir entre recargas vía `localStorage` con la `storageKey` default de `next-themes` (`"theme"`).

### Requirement: R5 — No flash of unstyled content (no FOUC) on first paint

The system MUST incluir un `<script>` inline (usando `dangerouslySetInnerHTML`) dentro de un bloque `<head>` explícito de `app/layout.tsx` que, antes del primer paint, lea `localStorage.getItem('theme')` y alterne `.dark` en `<html>`.

The inline script MUST envolverse en `try/catch` para que, si `localStorage` lanza (ej. Safari private mode), el script falle silenciosamente y la página caiga al tema `light` por defecto.

Cuando `localStorage.getItem('theme')` es ausente o no parseable, the inline script MUST defaultear a `light` (sin `.dark` en `<html>`).

The inline script MUST setear `document.documentElement.style.colorScheme` al tema resuelto para tematizar form controls y scrollbars en el primer paint.

The system MUST declarar un export `viewport` en `app/layout.tsx` con `colorScheme: 'light dark'` y dos entradas `themeColor` con media queries para `prefers-color-scheme: light` y `prefers-color-scheme: dark`.

## ADDED Scenarios

#### Scenario: S4.1 — Toggle flips theme (both directions)

- GIVEN un visitante en `/` sin tema persistido y `defaultTheme="light"`, la página renderiza en claro.
- WHEN clickea el `ModeToggle` del header, llama a `setTheme("dark")`, y `next-themes` agrega `.dark` a `<html>` y escribe `localStorage.theme = "dark"`.
- THEN la página re-renderiza en oscuro dentro de un animation frame, el icono cambia de `Moon` a `Sun`, y `aria-pressed` es `true`.
- AND clickear otra vez llama a `setTheme("light")`, remueve `.dark` de `<html>`, y escribe `localStorage.theme = "light"`. La página re-renderiza en claro y el icono vuelve a `Moon`.

#### Scenario: S4.2 — Theme persists across hard reload

- GIVEN un visitante con `localStorage.theme === "dark"` de una sesión previa, hard-reloading `/` con cache deshabilitada.
- WHEN el browser parsea el HTML, el script no-FOUC inline corre sincrónicamente, lee `"dark"`, agrega `.dark` a `<html>`, y setea `style.colorScheme = "dark"`.
- THEN el primer paint muestra oscuro (sin flash de claro), y React hidrata sin warnings porque `<html>` tiene `suppressHydrationWarning`.

#### Scenario: S4.3 — First-visit user with no persisted theme

- GIVEN un visitante de primera vez sin `localStorage.theme`.
- WHEN carga `/`.
- THEN la página renderiza en claro (el `defaultTheme`), sin flash, y el `ModeToggle` muestra `Moon`.

#### Scenario: S4.4 — localStorage disabled (degraded environment)

- GIVEN un visitante con `localStorage` deshabilitado (ej. Safari private mode).
- WHEN el script no-FOUC corre y el `try/catch` traga el error de acceso.
- THEN la página cae a claro (sin `.dark`), y el `ModeToggle` sigue funcionando dentro de la sesión pero no persiste entre recargas. Degradación documentada; no regresión.

#### Scenario: S5.1 — `color-scheme` and `theme-color` meta tags emitted

- GIVEN el root layout exporta `viewport` con `colorScheme: 'light dark'` y dos entradas `themeColor`.
- WHEN la página carga en un browser moderno.
- THEN el `<head>` contiene `<meta name="color-scheme" content="light dark">` y dos `<meta name="theme-color">` con `media` apropiado, y el browser tematiza form controls, scrollbars, y el chrome móvil acorde.
