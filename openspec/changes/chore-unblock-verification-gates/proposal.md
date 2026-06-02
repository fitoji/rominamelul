# Proposal: chore — unblock verification gates

> **Status**: draft
> **Project key**: `b_TTzk1b8KwYH`
> **Change name**: `chore-unblock-verification-gates`
> **Date**: 2026-06-02
> **Author**: Sub-agent sdd-propose (orchestrator gentle-orchestrator, on behalf of user)

## Resumen ejecutivo

El comando `npx tsc --noEmit` y `pnpm lint` fallan en `main` por dos motivos preexistentes no relacionados entre sí: (1) un objeto literal incompleto en `components/services.tsx:53` que no cumple el type `ServiceDetail` (faltan `modality` e `icon`); (2) ausencia total del binario `eslint` y de su flat config en el proyecto, pese a que `package.json` declara `"lint": "eslint ."`. Esto bloquea la fase `sdd-verify` de cualquier cambio activo (incluido `dark-mode`) y oculta regresiones reales de tipo/lint. Este cambio arregla ambos con un diff mínimo: completar los dos campos del segundo service y agregar `eslint` + `eslint-config-next` con un `eslint.config.mjs` válido para Next 16.

## Problem statement

### Bloqueo 1 — `tsc --noEmit` falla con `TS2739`

`components/services.tsx:20-27` define:

```ts
type ServiceDetail = {
  title: string;
  description: string;
  modality: string;
  icon: typeof User;
  image: string;
  fullDescription: string;
};
```

El primer service (líneas 31-51) cumple el type. El segundo service (línea 53, "Trabajo sobre Sí") sólo trae `title`, `description`, `image` y `fullDescription`. Faltan `modality` (string) e `icon` (componente de `lucide-react`). El error:

```
components/services.tsx(53,5): error TS2739: Type '{ title: string; description: string; image: string; fullDescription: string; }' is missing the following properties from type 'ServiceDetail': modality, icon
```

El type es correcto. La data quedó incompleta. La build pasa porque `next.config.mjs` tiene `typescript.ignoreBuildErrors: true`, pero CI gateado en `tsc --noEmit` falla en seco.

### Bloqueo 2 — `eslint` no existe en el proyecto

`package.json` declara:

```json
"scripts": { "lint": "eslint ." }
```

Pero:

- `eslint` no está en `devDependencies`
- `eslint-config-next` no está en `devDependencies`
- No existe `eslint.config.mjs` ni `.eslintrc*` en el repo
- `node_modules/.bin/eslint` no existe

Resultado: `pnpm lint` devuelve `sh: eslint: command not found`. El script quedó huérfano (típico de migrar de `next lint` a ESLint flat config en Next 15/16 sin completar la migración).

### Impacto combinado

`sdd-verify` exige `tsc --noEmit`, `pnpm lint` y `pnpm build`. Con los dos gates rotos, cualquier `sdd-verify` produce un reporte con `CRITICAL` falso: el cambio bajo review puede estar perfectamente bien y aún así el gate falla por motivos ajenos. Esto erosiona la confianza en el SDD.

## Proposed solution

Dos cambios mínimos, aislados, sin dependencias entre sí:

### Cambio A — Completar el objeto service en `services.tsx:53`

Agregar al objeto del segundo service:

- `modality: "Sesión de Charla"` — porque la `fullDescription` describe explícitamente "un espacio de charla" como modalidad distinta del masaje.
- `icon: Heart` — porque "Trabajo sobre Sí" es trabajo emocional/transformacional, y `Heart` es el ícono semánticamente más cercano de los importados (`Heart, Sparkles, User, Users` en la línea 17). No usamos `User` para diferenciarlo visualmente del primer service.

`icon` se renderiza en el JSX como `<service.icon />`. Hay que verificar exactamente dónde se usa para no asumir. El grep actual muestra `complement.icon` en la línea 293 (eso es de los complements, no de services), pero falta ver cómo se usa `service.icon`. El sub-agent de apply debe leer el bloque JSX que renderiza `services` y confirmar que el `icon` se consume; si no se consume en el render actual, el type igualmente lo exige y agregarlo cumple el contrato sin cambiar el JSX.

### Cambio B — Configurar ESLint con flat config (Next 16)

1. Agregar a `devDependencies`:
   - `eslint` (versión estable de la línea 9.x, compatible con flat config por defecto)
   - `eslint-config-next` (versión alineada con `next@16.2.6` instalada, idealmente la más reciente del 16.x)
2. Crear `eslint.config.mjs` en la raíz con la forma estándar de Next 16 flat config:

   ```js
   import { FlatCompat } from "@eslint/eslintrc";

   const compat = new FlatCompat({
     baseDirectory: import.meta.dirname,
   });

   export default [
     ...compat.extends("next/core-web-vitals", "next/typescript"),
   ];
   ```

   Esto reusa `eslint-config-next` (que internamente trae `next/core-web-vitals` y `next/typescript`) bajo el formato flat config. Es la receta oficial de Next 16 (antes usaba `next lint` con `.eslintrc.json`).

3. `pnpm install` para materializar las deps.
4. Verificar con `pnpm lint` que ahora corre.

### Por qué no relajar el type

`ServiceDetail` exige `modality` e `icon` por diseño: el primer service los usa. Relajar el type para hacerlos opcionales sería una regresión: rompe la simetría entre services y abre la puerta a que un futuro service olvidemos los campos. La dirección correcta es data-completeness, no type-relaxation.

### Por qué no usar `.eslintrc.json`

Next 16 (y ESLint 9) recomiendan flat config (`eslint.config.mjs`). El legado `.eslintrc.*` sigue funcionando con `ESLINT_USE_FLAT_CONFIG=false`, pero mantener el proyecto en flat config evita deuda técnica inmediata. La migración a flat config se hace una sola vez.

## Scope

### In-scope

- `components/services.tsx` — agregar `modality` e `icon` al segundo service entry (línea 53).
- `package.json` — agregar `eslint` y `eslint-config-next` a `devDependencies`.
- `eslint.config.mjs` (nuevo) — flat config mínimo que extienda `next/core-web-vitals` y `next/typescript`.
- `package-lock`/`pnpm-lock.yaml` se regenera al instalar.

### Out-of-scope

- Cambios de reglas de lint más allá del mínimo necesario.
- Migración a Prettier o cualquier formateador.
- Tests (no hay test runner, sigue fuera de scope).
- Refactor de `services.tsx` más allá del fix puntual.
- Cambios al type `ServiceDetail` (no se relaja).
- Cualquier otro ajuste en `package.json` (no se actualizan otras deps).

## Affected files

| File | Type | Estimated lines |
|---|---|---:|
| `components/services.tsx` | modify | +2 |
| `package.json` | modify | +2 |
| `eslint.config.mjs` | new | ~12 |
| `pnpm-lock.yaml` | modify (regenerado) | +N (dependiente de versiones resueltas) |

## User impact

Cero impacto en la experiencia de visitante. Es un chore de developer experience:

- El type check vuelve a pasar.
- `pnpm lint` queda usable.
- La consola de CI deja de gritar sobre cosas que no son del cambio bajo review.

## Risks

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| 1 | `icon: Heart` no es lo que el diseño del sitio espera para "Trabajo sobre Sí" | low | El ícono se ve en el JSX; si el visual no convence, el cambio es trivial de revertir. El criterio de aceptación: "no rompe el render". |
| 2 | Versión de `eslint-config-next` incompatible con `next@16.2.6` | medium | Pin a la última 16.x disponible en el momento del apply. Si la instalación falla, fallback a `eslint-config-next@^15` o un commit sin `next/typescript` extend (sólo `next/core-web-vitals`). |
| 3 | `eslint.config.mjs` agrega reglas que rompen builds existentes (warnings como errors) | medium | El config mínimo no setea `severity: "error"` en nada nuevo; hereda defaults de `next/core-web-vitals` que son warnings. Si aparece algún error nuevo en `pnpm lint`, listarlo en el return envelope y NO cambiar la lógica de la app para silenciarlo. |
| 4 | El nuevo `pnpm lint` reporta errores preexistentes en otros archivos | medium | Aceptable: el cambio es legítimo (el repo debería haber tenido lint desde el día 1). El apply documenta cualquier error nuevo en el return envelope para triage posterior. NO expandir scope para arreglarlos. |
| 5 | `modality: "Sesión de Charla"` no es la copy final aprobada | low | Es copy provisional, una decisión de contenido que el dueño del sitio puede ajustar. El fix de tipo no depende del copy exacto. |

## Rollback plan

`git revert` de los commits de este cambio. La lockfile vuelve al estado previo con `pnpm install` (sin las deps nuevas). El type de `ServiceDetail` se queda intacto; sólo revierte los datos del segundo service. Cero estado de usuario, cero migraciones.

## Verification approach

Después de aplicar:

1. `npx tsc --noEmit` → debe pasar sin errores.
2. `pnpm lint` → debe correr (puede reportar 0 errores o N warnings preexistentes; los warnings son aceptables).
3. `pnpm build` → debe seguir pasando (no tocamos código de runtime).
4. `git diff main..chore/unblock-verification-gates` → inspección visual: nada más que los archivos listados en affected files.
5. Re-correr los gates sobre `feat/dark-mode` (rebased sobre este branch) para confirmar que el dark-mode sigue verde.

## Open questions

1. **Versión exacta de `eslint-config-next`** — el sub-agent de apply debe resolver la última 16.x compatible en el momento de aplicar. Si Next 16.2.6 está en el lockfile pero `eslint-config-next@16.x` no existe todavía, fallback a `^15.0.0` o el último disponible y documentar.
2. **¿Bloquea el gate de lint cualquier error preexistente que aparezca?** — Recomendación: NO. Si `pnpm lint` reporta errores en archivos que no tocamos, son ruido histórico; se documentan en el return envelope y se triagean aparte. El criterio de aceptación es que `pnpm lint` CORRA, no que devuelva 0 errores.

## Next recommended phase

`sdd-apply` (este cambio no necesita design — son 2 fixes mecánicos).
