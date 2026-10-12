# Tasks

## 1. Backend: modelo de datos

- [ ] 1.1 Crear la migración de la tabla `tasks` (título, estado con valor por defecto `pending`, responsable con FK a `users`, marcas de tiempo; sin fecha de vencimiento). Se verifica con `node ace migration:run`, que crea la tabla y regenera `database/schema.ts`
- [ ] 1.2 Crear el modelo `Task` extendiendo `TaskSchema`, con la relación `assignee`, y una constante compartida con los tres estados. Se verifica con `npm run typecheck`

## 2. Backend: API

- [ ] 2.1 Crear los validadores de creación (solo `title`: recortado, obligatorio, máx. 255) y de actualización (`status` como enum cerrado y `assigneeId` existente, ambos opcionales). Se verifica con `npm run typecheck`
- [ ] 2.2 Crear `TaskTransformer` que exponga `id`, `title`, `status` y `assignee: { fullName }` sin id ni correo del usuario. Se verifica con `npm run typecheck`
- [ ] 2.3 Crear `TasksController` con `index` (sin `orderBy`, con `assignee` precargado), `store` (estado `pending` y responsable quien crea) y `update` (404 si no existe), todos respondiendo con `serialize()`. Se verifica con `npm run typecheck`
- [ ] 2.4 Registrar `GET`, `POST` y `PATCH /:id` bajo `/api/v1/tasks` con `.as('tasks')` en el grupo con `middleware.auth()`, sin `show` ni `destroy`. Se verifica con `node ace list:routes`, que muestra exactamente esas tres rutas de tareas (la de listar aparece como `GET|HEAD`)
- [ ] 2.5 Arrancar el dev server para regenerar `.adonisjs/` y comprobar a mano con `curl` y un token: 401 sin token; crear con solo título devuelve `pending` y al creador; título vacío, en blanco y de 256 caracteres dan 422; estado `pendiente` da 422; cambiar estado de una tarea ajena funciona; `GET` lista todas; y el JSON de una tarea contiene `assignee` solo con `fullName` (sin id ni correo)

## 3. Frontend: acceso a la API y rutas

- [ ] 3.1 Añadir los tipos `Task` y `TaskStatus` en `lib/types.ts` y las llamadas `listTasks`, `createTask` y `updateTask` en `lib/api.ts` (incluido el método `PATCH`), con traducción de los errores del título (`required` y `minLength` como «Escribe un título.») y del estado. Se verifica con `npm run build`
- [ ] 3.2 Añadir la ruta `/tasks` dentro de `ProtectedRoute` y cambiar a `/tasks` el destino de `*` y de la redirección de `PublicOnlyRoute`. Se verifica en el navegador: tras iniciar sesión o registrarse se llega a `/tasks` y una dirección desconocida lleva a `/tasks`
- [ ] 3.3 Hacer que el contexto de auth exponga una función para descartar la sesión ante un 401 y usarla en la pantalla de tareas (reutiliza el motivo «Tu sesión ha caducado»). Se verifica en el navegador revocando el token desde otra pestaña: la siguiente acción lleva a `/login` con el aviso

## 4. Frontend: pantalla de tareas

- [ ] 4.1 Crear `pages/tasks-page.tsx` con carga de la lista, indicador de carga, aviso de fallo y filas con título, nombre del responsable («Sin nombre» si es nulo) y estado, sin fechas ni presencia ni reordenación. Se verifica en el navegador con varias tareas de personas distintas
- [ ] 4.2 Añadir el formulario de creación de un solo campo («Crear tarea», «Creando…»), con errores junto al campo, título conservado ante fallo y la nueva tarea añadida a la lista sin recargar. Se verifica en el navegador con título válido, vacío, en blanco y de 256 caracteres, y que la tarea nueva queda al final
- [ ] 4.3 Añadir el estado vacío con explicación y el formulario como oferta de crear la primera tarea. Se verifica en el navegador con una base sin tareas
- [ ] 4.4 Añadir el selector de estado en cada fila (Pendiente, En curso, Hecho) con actualización inmediata, reversión y aviso si falla la petición. con el selector de la fila desactivado mientras la petición está en vuelo. Se verifica en el navegador cambiando una tarea propia y una ajena, y parando el backend para ver la reversión
- [ ] 4.5 Añadir los enlaces entre `/tasks` y `/profile`. Se verifica en el navegador pulsando ambos

## 5. Verificación de integración

- [ ] 5.1 Ejecutar `npm run typecheck` y `npm run lint` en `backend/` y `npm run build` y `npm run lint` en `frontend/`; todos deben terminar sin errores
- [ ] 5.2 Recorrer a mano los escenarios de `specs/tasks/spec.md` y `specs/auth/spec.md` con dos cuentas distintas y confirmar que ambas ven la misma lista y que el diff de `database/schema.ts` y `.adonisjs/` está commiteado
- [ ] 5.3 Ejecutar `openspec validate add-task-list --strict` sin errores
