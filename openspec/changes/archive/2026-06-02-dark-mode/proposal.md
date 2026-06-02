# Proposal: dark-mode

**Status**: `draft`
**Date**: 2026-06-02
**Author**: Sub-agent `sdd-propose`
**Project key**: `b_TTzk1b8KwYH`
**Source of truth**: This proposal; main spec at `openspec/specs/landing-page-romina/spec.md` (delta to be written in `sdd-spec`).

---

## Resumen ejecutivo

RominaWeb está hoy hard-pineada al esquema claro. El bloque `.dark` de `app/globals.css` ya existe y mapea todos los tokens semánticos, pero el `ThemeProvider` de `next-themes` no está montado, no hay `ModeToggle`, y el Header no expone ningún control. La fundación está lista — `next-themes@0.4.6` ya está en `package.json:51` y `components/theme-provider.tsx` (11 líneas) ya existe, solo falta cablearlo. Esta propuesta monta el provider, agrega un toggle de **dos opciones (Claro / Oscuro, sin "Sistema")** en el header (desktop y mobile), elimina el FOUC inicial con un script inline, suma `<meta name="theme-color">` para mobile chrome, y repara 3 líneas de `bg-white` en el carousel de `organizations.tsx`. Como efecto colateral, se repara un bug silencioso en `components/ui/sonner.tsx:3` (llama a `useTheme()` sin provider). Cambio chico: ~100 líneas, banda `<200`, bien debajo del presupuesto de 400 — un solo PR, sin dependencias nuevas.

## Planteamiento del problema

Una landing comercial en 2026 sin dark mode se siente incompleta. Visitar `/` de noche, en un ambiente con poca luz, fuerza al ojo a adaptarse a un fondo blanco permanente. La expectativa del usuario ya es poder alternar. En este proyecto la mitad del trabajo técnico ya está hecho: `next-themes` instalado, `ThemeProvider` definido, tokens invertidos en `.dark`. Lo único que falta es wiring + UI.

## Solución propuesta

- **Toggle de 2 opciones**: un `Button` con `aria-label` + `aria-pressed` + foco visible, que alterna Claro ↔ Oscuro. Iconos `Sun` / `Moon` de `lucide-react`. Sin opción "Sistema" — decisión de UX, simplifica el contrato.
- **`next-themes`** con `attribute="class"` (obligatorio: `@custom-variant dark (&:is(.dark *))` en `app/globals.css:4` ata el modo oscuro a `.dark` en `<html>`, no a `data-theme`).
- **`defaultTheme="light"`**, **`enableSystem={false}`**. Persistencia por `localStorage` (default de `next-themes`).
- **`suppressHydrationWarning`** en `<html>` (`app/layout.tsx:96`) — `next-themes` muta `<html>` antes de hidratar.
- **Script no-FOUC inline** en `<head>` (`<Script id="theme-init" strategy="beforeInteractive">`): lee `localStorage.theme` y aplica `.dark` a `<html>` antes del primer paint. `disableTransitionOnChange` minimiza el flash aunque el script falle.
- **`<meta name="theme-color">`** con dos variantes (`media="(prefers-color-scheme: light)"` y `media="(prefers-color-scheme: dark)"`) para que el chrome del navegador móvil siga al tema.
- **`ThemeProvider`** montado en `app/layout.tsx`, dentro del `TooltipProvider` (ya existente). Orden: `TooltipProvider` → `ThemeProvider` → `{children}`. El tooltip no depende del tema; el provider solo necesita envolver el árbol que llama `useTheme()`.
- **Fix cosmético** en `components/organizations.tsx:217-218`: `bg-white` / `bg-white/50` / `bg-white/70` → `bg-foreground` / `bg-foreground/50` / `bg-foreground/70` para que los dots respeten el tema.

## Alcance

### Dentro de alcance
- Montar `ThemeProvider` en `app/layout.tsx` + `suppressHydrationWarning`.
- Crear `components/theme-toggle.tsx` (client component, 2 opciones).
- Insertar el toggle en Header (desktop nav tras el CTA "Contacto"; mobile en footer del sheet).
- Script no-FOUC en `<head>` + dos `<meta name="theme-color">` por media query.
- 3 cambios `bg-white*` → `bg-foreground*` en `components/organizations.tsx`.

### Fuera de alcance
- Opción "Sistema" / `prefers-color-scheme` (decisión de UX).
- Persistencia por usuario autenticado (no hay auth en el sitio).
- Rediseño del sistema de tokens o de la paleta.
- Nuevos primitives de shadcn (se usan `Button` + `lucide-react`, ambos ya instalados).
- Refactor del Header más allá del punto de inserción del toggle.
- Migración de otros colores hardcodeados (explorados y descartados: son intencionales — botones WhatsApp `bg-emerald-500` / `bg-[#25D366]`, scrims de modales `bg-black/50`).

## Archivos afectados

| Archivo | Tipo | Líneas | Descripción |
|---|---|---|---|
| `app/layout.tsx` | Modify | +8 / ~3 modify | Wrap con `ThemeProvider`, `suppressHydrationWarning`, script no-FOUC, dos `theme-color` meta. |
| `components/theme-toggle.tsx` | New | ~50 | Client component: `useTheme`, `Button`, iconos `Sun` / `Moon`, a11y attrs. |
| `components/header.tsx` | Modify | +6 | Importar y renderizar `<ThemeToggle />` en desktop nav y mobile sheet. |
| `components/organizations.tsx` | Modify | ~3 modify | `bg-white*` → `bg-foreground*` en dots del carousel Embla. |

**Total**: ~80–100 líneas, banda `<200`. Un solo PR; chained PR no recomendado.

## Capabilities (contrato con `sdd-spec`)

### New Capabilities
Ninguna. "Tema visual" no se modela como spec independiente — es propiedad transversal de la landing.

### Modified Capabilities
- `landing-page-romina`: agregar `R4: Theme switching`, `R5: No-FOUC on first paint` y scenario `S5: User toggles theme and reload`. Delta a `openspec/changes/dark-mode/specs/landing-page-romina/spec.md`. `sdd-archive` los fusionará al spec principal.

## Impacto en el usuario

- Aparece un botón con icono de luna a la derecha del CTA "Contacto" (escritorio) y en el footer del sheet (mobile).
- Click cambia la paleta al instante; refresh persiste vía `localStorage.theme`.
- Sin nuevas rutas, sin nuevo copy, sin deps añadidas.
- Los toasts (`sonner`) empiezan a respetar el tema elegido.

## Riesgos

| Riesgo | Severidad | Mitigación |
|---|---|---|
| Hydration mismatch warning si falta `suppressHydrationWarning` | Alta | Agregar en el mismo commit que monta `ThemeProvider`. Requerido por `next-themes`. |
| Flash blanco en primer paint con tema "dark" persistido | Media | Script no-FOUC en `<head>` antes del primer paint. `disableTransitionOnChange` reduce aunque el script falle. |
| `sonner.tsx` llama a `useTheme()` sin provider (bug preexistente) | Media | Montar `ThemeProvider` lo repara como efecto colateral, sin acción extra. |
| `bg-white` en dots del carousel ignoran el tema | Baja | Cambio incluido: `bg-white*` → `bg-foreground*`. |
| React Compiler + `useTheme()` | Baja | Compatibles — `next-themes` 0.4 usa `useState`/`useEffect` estándar. |

## Plan de rollback

`git revert` del commit (o `reset --hard HEAD~1` si no se pusheó). Sin migración de datos, sin feature flag. Estado único: `localStorage.theme` (borrable con DevTools si quedara raro). Cambio puramente aditivo sobre CSS variables ya existentes.

## Aproximación de verificación

- `pnpm build` — exit 0, sin warnings nuevos.
- `pnpm lint` — sin violaciones.
- `npx tsc --noEmit` — sin errores (importante: `next.config.mjs` tiene `ignoreBuildErrors: true`).
- Smoke manual: toggle en `/` (flip inmediato), refresh (persistencia), `/generador` con un toast (verifica que el toast respeta el tema).

No hay test runner (`strict_tdd: false`); verificación por compilación + observación manual.

## Preguntas abiertas

1. **¿Sumar `<meta name="color-scheme">` además de `theme-color`?** — Tentativo: sí, en el mismo bloque. Decisión final en `sdd-design`.
2. **Orden de providers**: ¿`TooltipProvider` → `ThemeProvider` o al revés? — Recomendado: ThemeProvider dentro de Tooltip (el tooltip no depende del tema). Confirmar en `sdd-design`.
3. **Forma exacta del script no-FOUC** (location, `dangerouslySetInnerHTML` vs `next/script`): resolver en `sdd-design`.

## Próxima fase recomendada

`sdd-design`.
