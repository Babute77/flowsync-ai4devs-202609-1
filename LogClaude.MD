# Log de cambios — Claude

Registro de cambios realizados por Claude en este proyecto. La ejecución más reciente va arriba; cada ejecución se separa con `---`.

## Ejecución — 2026-09-26

**Resumen:** `/init` (en español) sobre el `CLAUDE.md` existente: se completaron los huecos detectados al revisar el repo.

| Fecha y hora | Fichero / recurso | Motivo |
|---|---|---|
| 2026-09-26 | `CLAUDE.md` | Añadidos: arranque inicial del backend, suites de Japa y cómo lanzar una suite, un archivo o un test concretos, `.env.test`, código autogenerado en `.adonisjs/` (`#generated/controllers`, registro de Tuyau), pila de middleware de `start/kernel.ts`, comportamiento de CORS (`CORS_ORIGIN` no se usa) y el hook de Prettier del frontend. |

---

## Ejecución — 2026-09-26 09:38

**Resumen:** revisión de `/init` (ejecutado de nuevo sobre `CLAUDE.md` ya existente): se verificó contra el repo real (rutas, modelo, validadores, configs, package.json de ambos paquetes) y no se encontraron inexactitudes; solo faltaba el prefijo obligatorio del harness.

| Fecha y hora | Fichero / recurso | Motivo |
|---|---|---|
| 2026-09-26 09:38 | `CLAUDE.md` | Añadidas las dos líneas de prefijo exigidas por la skill `/init` ("This file provides guidance to Claude Code...") antes del contenido existente. No se modificó nada más: el contenido ya reflejaba con exactitud el estado del repo (rutas de `start/routes.ts`, `config/auth.ts`, modelo `User`, validadores, `package.json` de `backend/` y `frontend/`, configs de oxlint/Prettier). |

---

## Ejecución — 2026-09-20 15:43 (Europe/Madrid)

**Resumen:** añadida regla de proceso en CLAUDE.md para registrar cambios en LogClaude.MD.

| Fecha y hora | Fichero / recurso | Motivo |
|---|---|---|
| 2026-09-20 15:43 | `CLAUDE.md` | Añadida regla en "Reglas de proceso": registrar todo cambio en `LogClaude.MD` (fecha/hora, fichero, motivo), ejecución nueva arriba, separada con `---`, sin borrar entradas anteriores. |

---

## Ejecución — 2026-09-20 15:12–15:34 (Europe/Madrid)

**Resumen:** montaje del harness de Claude Code (8 piezas), reconexión del MCP de Atlassian y creación del ticket FLOW-2.

| Fecha y hora | Fichero / recurso | Motivo |
|---|---|---|
| 2026-09-20 15:32 | *(permisos de sesión, no es un fichero del repo)* | Habilitado el borrado de archivos en `C:\Lidr` para esta sesión: necesario para ejecutar `git checkout` (borra y restaura el archivo) tras probar el hook, y para operaciones git futuras del ejercicio. |
| 2026-09-20 15:32 | `frontend/src/main.tsx` | Prueba manual del hook de Prettier. El contenido no cambió (ya estaba en estilo Prettier), solo se normalizaron saltos de línea a LF; restaurado con `git checkout` tras la prueba. Sin cambio neto. |
| 2026-09-20 15:31 | `frontend/node_modules/` *(no versionado)* | Ejecutado `npm install` en `frontend/` para instalar Prettier de verdad, evitando que el hook dependa de descargarlo por `npx` en cada ejecución. |
| 2026-09-20 15:30 | `.claude/settings.json` | Creado: registra el hook de formateo en `PostToolUse`, con matcher `Edit\|Write\|MultiEdit`. Pieza 6 del harness. |
| 2026-09-20 15:30 | `.claude/hooks/format-frontend.mjs` | Creado: hook que lee el JSON de entrada del evento `PostToolUse`, comprueba si el archivo tocado está dentro de `frontend/` con extensión relevante, y si es así corre `prettier --write` sobre ese archivo. Ignora cualquier archivo fuera de `frontend/`. Pieza 6 del harness. |
| 2026-09-20 15:29 | `frontend/package.json` | Añadida dependencia de desarrollo `prettier@^3.8.3` y script `format`: `prettier --write .`. El frontend solo tenía `oxlint`, no Prettier. Parte de la pieza 6 del harness. |
| 2026-09-20 15:29 | `frontend/.prettierignore` | Creado: excluye `dist` y `node_modules` del formateo. Parte de la pieza 6 del harness. |
| 2026-09-20 15:29 | `frontend/.prettierrc.json` | Creado: configuración de Prettier para el frontend (`semi: false`, `singleQuote: true`, `printWidth: 100`, `trailingComma: all`). Parte de la pieza 6 del harness. |
| 2026-09-20 15:28 | `.claude/agents/adversarial-reviewer.md` | Creado el subagente `adversarial-reviewer`: revisa planes/diffs buscando activamente supuestos no verificados, incumplimiento de convenciones, casos borde no cubiertos y tests que no prueban lo que dicen. Pieza 5 del harness. |
| 2026-09-20 15:27 | `.claude/commands/commit.md` | Creada la skill `/commit`: revisa `git status`/`diff`, separa cambios de backend/frontend si no están acoplados, corre lint/typecheck antes de commitear, exige mensaje en imperativo y `add` explícito de archivos (nunca `-A`). Pieza 4 del harness. |
| 2026-09-20 15:27 | Jira **FLOW-2** *(no es un fichero de este repo)* | Creado el ticket "Implementar login en el frontend" en el proyecto FLOW, asignado a Manuel Pardo, estado "Tareas por hacer". Punto 3 de la Parte A del ejercicio. |
| 2026-09-20 15:26 | `.claude/commands/priority-ticket.md` | Creada la skill `/priority-ticket`: trae un ticket de Jira (por clave o por prioridad en "Por hacer") vía MCP de Atlassian, explora el repo y redacta un plan de implementación sin aplicarlo. Pieza 3 del harness. |
| 2026-09-20 15:26 | `AGENTS.md` | Creado como enlace: remite a `CLAUDE.md` como fuente única de la guía del proyecto. Pieza 8 del harness. |
| 2026-09-20 15:25 | `CLAUDE.md` | Añadida la sección "Reglas de proceso" al final: no commitear directo salvo con `/commit`, correr lint/typecheck antes de dar tarea por terminada, no mezclar backend/frontend sin motivo, seguir el patrón validador→modelo→transformer, no inventar variables/endpoints/credenciales, no tocar `docs/harness/comparacion.md` ni `prompts.md` desde una tarea de código. Pieza 7 del harness. |
| 2026-09-20 15:25 | `CLAUDE.md` | Creado a partir de `Claude.MD` (vacío; se corrigió el nombre a mayúsculas correctas). Contenido generado analizando el repo real: resumen del proyecto, comandos de backend/frontend, arquitectura de rutas/modelo/validadores/transformer del backend, estado del frontend (scaffold de Vite sin tocar) y convenciones de nombrado/imports. Pieza 1 del harness (equivalente a `/init`). |
| 2026-09-20 15:12 | *(conector MCP Atlassian, cuenta de Claude)* | Reconectado el MCP de Atlassian de `mpdnotion.atlassian.net` a `babute.atlassian.net` a petición del usuario (cuenta incorrecta). |

**Nota:** se detectó un problema preexistente no relacionado con el harness: todo el repo tiene un desajuste de saltos de línea (CRLF/LF) entre lo committeado y el working tree (afecta a archivos que este harness no tocó, p. ej. `backend/package.json`, `backend/start/routes.ts`). No se corrigió porque no forma parte del encargo y su arreglo generaría un diff masivo ajeno al harness.
