# Proposal: performance-quick-wins

## Summary

Implement 10 quick-win performance optimizations for RominaWeb, targeting LCP improvement and bundle reduction.

## Intent

Optimizar los Core Web Vitals de la landing page de Romina Melul, focándose en los cambios de mayor impacto con menor esfuerzo.

## Scope

### In scope
- Agregar `sizes` a todos los `next/image` que faltan
- Lazy-load de `html-to-image` en generador
- YouTube facade pattern
- Fix CSS typos
- Remover dead code
- Optimizar scroll handling en header

### Out of scope
- Reescribir componentes grandes
- Añadir tests (no hay test runner configurado)
- Refactoring架构ural profundo

## Approach

1. **Fixs aislados**: cada fix es independiente, se puede reverting sin afectar otros
2. **Work-unit commits**: un commit por fix para fácil review
3. **Verificación incremental**: Lighthouse después de cada fix crítico

## Risks

- No hay test runner → verificar manualmente
- Cambios en imágenes pueden afectar layout → revisar en móvil

## Deliverables

- Spec: lista de fixes con requisitos de verificación
- Tasks: breakdown mecánico de cada fix
- Commits: uno por fix

## Artifacts

- `openspec/changes/performance-quick-wins/proposal.md` (este archivo)
- `openspec/changes/performance-quick-wins/specs/quick-fixes-spec.md`
- `openspec/changes/performance-quick-wins/tasks.md`

## Notes

- Idioma para UI: español
- Commits: conventional commits
- SDD mode: interactive, OpenSpec, ask-on-risk, 400 lines review budget