# Design

## Context

Backend AdonisJS 7 / Lucid 22 con esquema autogenerado y frontend React 19 con un único punto de contacto con la API (`lib/api.ts`). Hoy solo existe auth: modelo `User`, rutas bajo `/api/v1` y guard `api` por tokens. No hay modelo, tabla ni UI de tareas. Motivación y alcance en `proposal.md`; requisitos en `specs/`.

**Migración: sí.** Hay una migración nueva (tabla `tasks`); al ejecutarla se regenera `backend/database/schema.ts`, y al tocar controladores y rutas se regenera `backend/.adonisjs/` (arrancar el dev server). Ambos diffs se commitean.

## Goals / Non-Goals

**Goals:**
- Tres operaciones de API (listar, crear, actualizar) con el patrón existente: `serialize()` + transformer + validador VineJS.
- Una página `/tasks` que sigue el patrón de las páginas de login y perfil.

**Non-Goals:**
- Fecha de vencimiento (ni columna «por si acaso»), orden, paginación, borrado, refresco automático, tests.
- Componentes shadcn nuevos: añadirlos puede traer dependencias.

## Decisions

1. **Tabla `tasks`**: `id`, `title` (string 255, no nulo), `status` (string, no nulo, por defecto `pending`), `assignee_id` (FK a `users.id`, no nula), `created_at`, `updated_at`. El modelo `Task` extiende `TaskSchema` generado y solo añade la relación `assignee` (`belongsTo`).
   *Alternativa descartada:* enum nativo de BD (SQLite no lo soporta; la validación ya cierra el conjunto en el borde).
2. **Estado cerrado en el validador**: `vine.enum(['pending', 'in_progress', 'done'])` en el validador de actualización; una constante compartida con los tres valores evita repetirlos. Valores en inglés como identificador; el castellano vive solo en el frontend.
3. **Rutas** bajo `/api/v1/tasks` en el grupo protegido con `middleware.auth()`: `GET /` (index), `POST /` (store), `PATCH /:id` (update). Sin `show` ni `destroy`; un controlador `TasksController` con esos tres métodos. `PATCH` porque se actualizan campos sueltos.
4. **Crear**: el validador solo declara `title` (`trim`, no vacío, máx. 255); VineJS descarta propiedades no declaradas, así que `status` y `assigneeId` enviados al crear se ignoran. El controlador fija `status = 'pending'` y `assigneeId = auth.user.id`. Comprobar al implementar que un título de solo espacios falla (el orden `trim` / `required` en VineJS 4).
5. **Actualizar**: `status` y `assigneeId` opcionales; `assigneeId` con regla `exists` sobre `users.id`. Tarea inexistente → 404 (`findOrFail`). Una petición sin ningún campo no cambia nada y devuelve la tarea (supuesto, no cubierto por criterios).
6. **Listar**: `Task.query().preload('assignee')` **sin `orderBy`** (restricción del change: no hay regla de orden). El frontend no reordena. Sin paginación (RNF-5 prevé ~200 tareas).
7. **Qué se expone del responsable**: `TaskTransformer` devuelve `id`, `title`, `status` y `assignee: { fullName }`, nada más (sin `id` ni `email` del usuario). Consecuencia asumida: un cliente no puede descubrir ids de personas, por lo que `assigneeId` en la actualización queda como capacidad de API sin uso desde la UI en este change.
8. **Frontend**:
   - `lib/types.ts`: tipos `Task` y `TaskStatus`; `lib/api.ts`: `listTasks`, `createTask`, `updateTask` (con `PATCH` añadido a `RequestOptions.method`), más etiquetas de error del título/estado en `FIELD_LABELS` y `translate` (el `minLength` de un título en blanco debe leerse «Escribe un título.», no «al menos 1 caracteres»).
   - `pages/tasks-page.tsx`: carga con `useEffect` y token de `useAuth`, estado local de la lista, formulario de un campo (reutiliza `useAuthForm` para errores por campo) y filas con `Card`, `Input`, `Button`, `Alert`, `Label`.
   - Cambio de estado con un `<select>` nativo estilizado con los tokens de Tailwind existentes (no hay componente Select y añadirlo implica dependencia). Actualización optimista con vuelta al valor anterior si la petición falla.
   - Etiquetas Pendiente / En curso / Hecho en un mapa único del frontend.
   - Rutas: `/tasks` dentro de `ProtectedRoute`; `*` y `PublicOnlyRoute` redirigen a `/tasks`; enlaces mutuos entre `/tasks` y `/profile`.
9. **Sin tests**: la verificación se hace con `typecheck`, `lint`, `build`, `node ace list:routes` y una prueba manual en el navegador.

## Risks / Trade-offs

- **Sin orden explícito, el orden es incidental** → no se promete en la spec; se anota como punto abierto (PA-3) y se decidirá en un change aparte.
- **Cualquier transición vale, incluida volver desde Hecho, sin confirmación (PA-7)** → marcar Hecho por error es fácil, pero se puede deshacer con el mismo selector.
- **Los tests functional comparten la BD de desarrollo**: irrelevante aquí al no haber tests, pero la migración se aplica sobre la misma BD.
- **Actualización optimista** → si falla la petición, la fila revierte y se avisa; un fallo de red no deja un estado falso.
- **Cambiar el aterrizaje a `/tasks`** modifica la spec `auth`; cualquier enlace o marcador a `/profile` sigue funcionando.
