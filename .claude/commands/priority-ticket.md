---
description: Trae un ticket de Jira por prioridad y prepara (sin aplicar) el plan de implementación
argument-hint: [clave-o-búsqueda-del-ticket]
---

Eres responsable de convertir un ticket de Jira en un plan de implementación, sin tocar código todavía.

1. Interpreta `$ARGUMENTS`:
   - Si parece una clave de ticket (p. ej. `PROJ-123`), tráelo con el MCP de Atlassian (`getJiraIssue`).
   - Si es texto libre o no se pasó nada, busca en el tablero los tickets en "Por hacer" asignados a mí (`searchJiraIssuesUsingJql`, ordenados por prioridad) y toma el de mayor prioridad.
2. Lee el ticket completo: título, descripción, criterios de aceptación y comentarios. No asumas nada que no esté escrito ahí.
3. Explora el repo (lee `CLAUDE.md` primero) para entender qué existe ya relacionado con el ticket: rutas, componentes, convenciones, código reutilizable.
4. Redacta un plan de implementación, sin escribir código todavía:
   - Lista de archivos a crear o modificar, con una línea de qué cambia en cada uno.
   - Qué convenciones del proyecto vas a seguir, nombradas explícitamente (no genéricas).
   - Riesgos, huecos de información o decisiones de diseño que necesitas confirmar antes de tocar código.
5. Presenta el plan para revisión. No lo apliques hasta que se confirme.
