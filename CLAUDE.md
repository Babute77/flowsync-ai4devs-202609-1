# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# FlowSync

## Resumen del proyecto
Gestión de tareas en equipo. Monorepo con dos paquetes independientes:
- `backend/`: API REST en AdonisJS 7 + Lucid ORM + SQLite (better-sqlite3), autenticación por access tokens.
- `frontend/`: SPA en React 19 + Vite 8, actualmente en el scaffold inicial de Vite (sin router, sin cliente HTTP, sin pantallas propias).

## Comandos

### Backend (`backend/`)
- Primer arranque: `npm install && cp .env.example .env && node ace generate:key && node ace migration:run`
- `npm run dev` — servidor con HMR en `http://localhost:3333`
- `npm run test` — tests con Japa. Suites definidas en `adonisrc.ts`: `unit` (`tests/unit/**/*.spec.ts`) y `functional` (`tests/functional/**/*.spec.ts`, arranca el servidor HTTP). Aún no hay ningún test escrito.
  - Una suite: `node ace test functional`
  - Un archivo: `node ace test --files=tests/functional/auth.spec.ts`
  - Un test por título: `node ace test --tests="nombre del test"`
  - Los tests usan `.env.test` (`SESSION_DRIVER=memory`)
- `npm run lint` — ESLint (`@adonisjs/eslint-config`)
- `npm run format` — Prettier (`@adonisjs/prettier-config`)
- `npm run typecheck` — `tsc --noEmit`
- `node ace migration:run` — migraciones
- `node ace generate:key` — genera `APP_KEY`

### Frontend (`frontend/`)
- `npm run dev` — Vite dev server en `http://localhost:5173`
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — oxlint
- `npm run format` — Prettier (añadido por el harness, ver más abajo)
- `npm run preview`

## Arquitectura del backend
- Rutas en `start/routes.ts`, todas bajo `/api/v1`:
  - `POST /api/v1/auth/signup` → `NewAccountController.store`
  - `POST /api/v1/auth/login` → `AccessTokensController.store`
  - `GET /api/v1/account/profile` → `ProfileController.show` (requiere `middleware.auth()`)
  - `POST /api/v1/account/logout` → `AccessTokensController.destroy` (requiere `middleware.auth()`)
- Guard por defecto: `api` (tokens), definido en `config/auth.ts`. También existe el guard `web` (sesión), sin usar todavía.
- Modelo `User` (`app/models/user.ts`): `fullName`, `email`, `password` (hash automático vía `withAuthFinder`), `accessTokens` (`DbAccessTokensProvider`).
- Validadores en `app/validators/user.ts` con VineJS: `signupValidator` (fullName, email, password, passwordConfirmation), `loginValidator` (email, password).
- Las respuestas de usuario pasan siempre por `UserTransformer` (`app/transformers/user_transformer.ts`) — nunca serializar el modelo `User` directamente en un controlador.
- Convención de imports: subpaths definidos en `package.json` (`#controllers/*`, `#models/*`, `#validators/*`, `#transformers/*`, etc.). No usar rutas relativas largas entre carpetas de `app/`.
- Código autogenerado en `backend/.adonisjs/` (no editar a mano): los hooks `indexEntities` y `generateRegistry` (Tuyau) de `adonisrc.ts` lo regeneran al arrancar `dev`/`test`/`build`.
  - `routes.ts` no importa controladores directamente: usa `controllers.X` de `#generated/controllers`. Un controlador nuevo aparece ahí tras el siguiente arranque.
  - `.adonisjs/client/registry` es el registro tipado de rutas (Tuyau), exportado como `backend/registry` y `backend/data`; lo consume `tests/bootstrap.ts` para tipar `apiClient`.
- Middleware (`start/kernel.ts`): `force_json_response` fuerza respuestas JSON en todo el servidor; en el router van bodyparser, session, shield, initialize_auth y `silent_auth`. El único middleware nombrado es `auth`.
- CORS (`config/cors.ts`): en desarrollo acepta cualquier origin; en producción la lista está vacía. `CORS_ORIGIN` de `.env.example` está comentada y la config no la lee.

## Arquitectura del frontend
- Estado actual: scaffold de Vite sin tocar (`App.tsx` es el demo del contador). Todavía no existe:
  - Cliente HTTP hacia el backend
  - Router
  - Pantallas de login/signup
  - Gestión de estado de sesión (token, usuario autenticado)
- Backend disponible en `http://localhost:3333/api/v1` (revisar `backend/config/cors.ts` si hace falta ajustar el origin permitido).
- Linter: `oxlint`, no ESLint — reglas en `frontend/.oxlintrc.json` (`react/rules-of-hooks`, `react/only-export-components`).
- Formateo: Prettier (añadido por este harness), ver `frontend/.prettierrc.json`. El hook `PostToolUse` de `.claude/settings.json` (`.claude/hooks/format-frontend.mjs`) ya formatea con Prettier cada archivo de `frontend/` que se edita; no hace falta lanzarlo a mano.

## Convenciones
- TypeScript estricto en ambos paquetes.
- No mezclar código de `backend/` y `frontend/` en el mismo archivo — son paquetes npm independientes, cada uno con su propio `package.json` y lockfile.
- Los controladores del backend solo acceden a `request`/`response`/`auth` a través de `HttpContext`, siguiendo el patrón ya usado (`request.validateUsing`, `serialize`, `auth.getUserOrFail()`).
- Nombres de archivo del backend en `snake_case` (`access_tokens_controller.ts`); componentes del frontend en `PascalCase` (`App.tsx`).

## Reglas de proceso
- No hagas commit ni push directamente sobre los cambios; prepáralos y deja que la persona los revise, salvo que se use explícitamente la skill `/commit`.
- Antes de dar una tarea por terminada, corre `lint` y `typecheck`/`build` del paquete que tocaste (`backend/` o `frontend/`).
- No toques `backend/` y `frontend/` en el mismo cambio salvo que la tarea lo pida explícitamente (p. ej. un endpoint nuevo + su consumo).
- Cualquier endpoint nuevo del backend debe pasar por un validador VineJS y un transformer, siguiendo el patrón ya existente en `access_tokens_controller.ts` / `new_account_controller.ts`.
- No inventes variables de entorno, endpoints ni credenciales que no existan en el repo: si falta información, pregunta antes de asumir.
- `docs/harness/comparacion.md` y `prompts.md` son entregables del ejercicio, no del código: no los edites como parte de una tarea de implementación.
- Registra todo cambio que hagas en `LogClaude.MD` (fecha y hora, fichero o recurso tocado, motivo). Añade cada ejecución nueva **arriba del todo**, separada con `---` de las anteriores; dentro de una misma ejecución, la fila más reciente va primero. No borres ni reescribas entradas de ejecuciones anteriores.
