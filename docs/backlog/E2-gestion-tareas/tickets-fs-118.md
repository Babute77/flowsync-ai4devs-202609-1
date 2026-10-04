# Tickets de FS-118 · Fecha de vencimiento y tareas vencidas

Descomposición de la historia [`us-fechas-vencimiento.md`](us-fechas-vencimiento.md) en tickets. Cada ticket es una unidad de trabajo que una persona termina en una sesión, como máximo media jornada. Si al empezar no cabe, se parte antes de seguir.

## Cómo leerlo

- **Hereda los criterios de la historia.** Cada ticket cita los CA de FS-118 que cubre y no añade criterios nuevos. El texto de cada CA vive en la historia.
- **Definition of Done.** Es la checklist de cómo se entrega: tests, manejo de error y convenciones del repo. Las comunes a cada tipo están en la sección «Definition of Done por tipo»; cada ticket suma solo lo propio.
- **Nombra la capa, no diseña.** El detalle de datos, rutas y códigos de respuesta se decide al implementar.
- **Sin estimaciones.** No hay horas ni puntos.
- **Dependencias.** *Bloqueado por* son otros tickets o historias. *Decisión pendiente* son las decisiones de la historia que hay que cerrar antes de empezar (numeradas como en el fichero de la historia).

## Antes de empezar cualquier ticket

- **Decisión pendiente 0:** FS-118 no tiene todavía un RF en el PRD y todos sus criterios son [PROPUESTA]. Ningún ticket arranca hasta que exista el RF y se acepten los criterios.
- **Base de E2 que aún no existe:** la tarea y la lista de tareas (historias de crear tarea y de ver la lista, sin ID todavía). Es una dependencia externa de todos los tickets.
- **No hay runner de tests en el frontend.** Los tickets de Frontend se verifican a mano contra sus CA. Si se quiere test automático de la interfaz, hace falta un ticket aparte que lo introduzca; no entra aquí.

## Resumen

| ID | Título | Tipo | Bloqueado por | Decisión pendiente |
|---|---|---|---|---|
| FS-118.1 | Guardar la fecha de vencimiento de una tarea | Migración/DB | Base de E2 (tarea) | 0 |
| FS-118.2 | La tarea admite una fecha opcional y válida | Modelo/Dominio | FS-118.1 | 0, 2 |
| FS-118.3 | Regla de «vencida» | Modelo/Dominio | FS-118.2 | 0, 1, 3, 6 |
| FS-118.4 | Poner, cambiar y quitar la fecha | Endpoint/API | FS-118.2 | 0 |
| FS-118.5 | La lectura de tareas incluye fecha y si está vencida | Endpoint/API | FS-118.3, FS-118.4 | 0 |
| FS-118.6 | Los demás ven los cambios de fecha sin recargar | Endpoint/API | FS-118.4, mecanismo de E3 | 0 |
| FS-118.7 | Poner, cambiar y quitar la fecha desde la lista | Frontend | FS-118.4, lista de E2 | 0 |
| FS-118.8 | Mostrar las tareas vencidas en la lista | Frontend | FS-118.5, lista de E2 | 0 |
| FS-118.9 | Una tarea pasa a vencida con la lista abierta | Frontend | FS-118.3, FS-118.8 | 0, 1 |
| FS-118.10 | Errores y falta de conexión al cambiar la fecha | Frontend | FS-118.7 | 0 |
| FS-118.11 | Pruebas de las reglas de negocio de FS-118 | Test | FS-118.4, FS-118.5 | 0 |
| FS-118.12 | Pruebas de las reglas de tiempo | Test | FS-118.3 | 0, 1, 3, 6 |

## Definition of Done por tipo

### Migración/DB

- [ ] Se ejecuta sin error sobre una base de datos limpia y sobre una con tareas ya creadas, y estas siguen sin fecha.
- [ ] Se puede deshacer y volver a aplicar.
- [ ] El esquema generado se ha regenerado y está incluido en el commit, sin editarlo a mano.
- [ ] `npm run typecheck`, `npm run lint` y `npm run format` limpios en el backend.
- [ ] El PR dice qué cambia para quien ya tiene una base de datos local.

### Modelo/Dominio

- [ ] La regla vive en el modelo o la lógica de dominio y no se duplica en controladores ni en la interfaz.
- [ ] Tests unitarios (suite `unit`) que cubren cada CA citado, incluidos los límites que nombra.
- [ ] Los mensajes visibles para la persona están en castellano.
- [ ] `npm run typecheck`, `npm run lint` y `npm test` verdes.

### Endpoint/API

- [ ] Solo las personas con sesión iniciada pueden usarlo.
- [ ] La entrada se valida con los validadores del repo y los errores salen en castellano, sin dejar al cliente adivinar qué falló.
- [ ] La respuesta pasa por un transformer y por `serialize()`, sin devolver el modelo en bruto.
- [ ] Tests funcionales (suite `functional`) con aislamiento de base de datos (`testUtils.db()`) que cubren cada CA citado, incluido el camino de error.
- [ ] El registro generado de rutas y tipos (`.adonisjs/`) se ha regenerado y está incluido en el commit.
- [ ] `npm run typecheck`, `npm run lint` y `npm test` verdes.

### Frontend

- [ ] Las llamadas nuevas al backend están en `lib/api.ts` y no en los componentes.
- [ ] Todo texto visible y todo error está en castellano.
- [ ] Los componentes de interfaz nuevos se traen con el CLI de shadcn y no se editan a mano.
- [ ] `npm run build` (incluye el typecheck) y `npm run lint` sin errores; el formato lo aplica Prettier.
- [ ] Verificado a mano contra cada CA citado, con la lista de comprobaciones adjunta al PR, porque no hay runner de tests.
- [ ] Sin dependencia del color para lo que comunica un estado, donde el CA lo pida.

### Test

- [ ] Cada test lleva en su título el CA que cubre.
- [ ] Deterministas: no dependen de la fecha real ni del orden de ejecución, y aíslan la base de datos.
- [ ] Fallan si se rompe la regla que dicen proteger.
- [ ] `npm test` verde en limpio.

## Tickets

### FS-118.1 · Guardar la fecha de vencimiento de una tarea

- **Tipo:** Migración/DB
- **Capa:** migración de la base de datos
- **Hereda:** CA-1 (la tarea puede existir sin fecha)
- **Bloqueado por:** base de E2 (la tarea existe)
- **Definition of Done:** checklist de Migración/DB, más:
  - [ ] Las tareas anteriores a este cambio siguen existiendo y sin fecha.

### FS-118.2 · La tarea admite una fecha opcional y válida

- **Tipo:** Modelo/Dominio
- **Capa:** modelo de tarea
- **Hereda:** CA-1, CA-16, CA-17 (la regla de validez, no el mensaje en pantalla)
- **Bloqueado por:** FS-118.1
- **Decisión pendiente:** 2 (si se admite una fecha ya pasada)
- **Definition of Done:** checklist de Modelo/Dominio, más:
  - [ ] Una tarea sin fecha es válida y una con fecha que no existe en el calendario no lo es.
  - [ ] El comportamiento ante una fecha pasada queda según lo decidido en la decisión 2.

### FS-118.3 · Regla de «vencida»

- **Tipo:** Modelo/Dominio
- **Capa:** lógica de dominio de la tarea
- **Hereda:** CA-7, CA-8, CA-9, CA-10, CA-11, CA-12, CA-15
- **Bloqueado por:** FS-118.2
- **Decisión pendiente:** 1 (huso del «hoy»), 3 (desde qué momento), 6 (horario de verano y viajes)
- **Definition of Done:** checklist de Modelo/Dominio, más:
  - [ ] Una tarea con fecha pasada y no hecha es vencida; una hecha no lo es; reabrirla la vuelve a marcar.
  - [ ] El día de la fecha todavía no es vencida y deja de serlo según lo decidido en la decisión 3.
  - [ ] Una tarea sin responsable se trata igual que una con responsable.
  - [ ] Hay una única regla de «hoy» para todo el espacio, con tests que fijan la hora y no dependen de la real.

### FS-118.4 · Poner, cambiar y quitar la fecha

- **Tipo:** Endpoint/API
- **Capa:** servicio que recibe el cambio de la fecha de una tarea
- **Hereda:** CA-2, CA-3, CA-4, CA-5, CA-17 (rechazo de fecha no válida con mensaje), CA-18
- **Bloqueado por:** FS-118.2
- **Definition of Done:** checklist de Endpoint/API, más:
  - [ ] Cualquier persona autenticada puede cambiar la fecha de cualquier tarea, sea o no suya (condicionado a PA-6).
  - [ ] Ante una fecha no válida, la tarea conserva la que tenía y el error explica el motivo en castellano.
  - [ ] Dos cambios casi simultáneos dejan la misma fecha a todas las personas: la del cambio más reciente.

### FS-118.5 · La lectura de tareas incluye fecha y si está vencida

- **Tipo:** Endpoint/API
- **Capa:** servicio que entrega la lista de tareas
- **Hereda:** CA-7, CA-9, CA-12, CA-23, CA-24
- **Bloqueado por:** FS-118.3, FS-118.4
- **Definition of Done:** checklist de Endpoint/API, más:
  - [ ] Cada tarea de la lista trae su fecha, si la tiene, y si está vencida según FS-118.3.
  - [ ] La respuesta no incluye ningún recuento ni resumen de vencidas por persona.
  - [ ] Las tareas hechas que no están en la vista principal no cuentan como vencidas (condicionado a PA-7).

### FS-118.6 · Los demás ven los cambios de fecha sin recargar

- **Tipo:** Endpoint/API
- **Capa:** servicio que comunica cambios a las pantallas abiertas
- **Hereda:** CA-6, CA-18, CA-21, CA-22
- **Bloqueado por:** FS-118.4, mecanismo de actualización sin recargar de E3 (RF-14)
- **Definition of Done:** checklist de Endpoint/API, más:
  - [ ] Poner, cambiar o quitar una fecha llega a las pantallas abiertas de las demás personas.
  - [ ] Tras dos cambios casi simultáneos todas las pantallas acaban con la misma fecha.
  - [ ] No se envía ningún aviso fuera de la lista (sin notificaciones push).
  - [ ] Si la tarea se elimina a la vez que cambia su fecha, nadie ve una tarea con la fecha nueva (condicionado a PA-7).

### FS-118.7 · Poner, cambiar y quitar la fecha desde la lista

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-2, CA-3, CA-4, CA-5
- **Bloqueado por:** FS-118.4, lista de tareas de E2
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Se hace en no más de dos clics y sin abrir otra pantalla.
  - [ ] La fecha nueva reemplaza a la anterior en la lista; al quitarla, la tarea queda sin fecha.
  - [ ] Se puede hacer también sobre las tareas de otras personas (condicionado a PA-6).

### FS-118.8 · Mostrar las tareas vencidas en la lista

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-7, CA-12, CA-13, CA-23, CA-24
- **Bloqueado por:** FS-118.5, lista de tareas de E2
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Las vencidas se distinguen a simple vista sin abrir la tarea, y no solo por el color.
  - [ ] Una tarea libre vencida se ve igual que una cogida.
  - [ ] No hay ningún recuento ni resumen de vencidas por persona en pantalla.
  - [ ] Las tareas hechas ocultas no aparecen como vencidas en la vista principal.

### FS-118.9 · Una tarea pasa a vencida con la lista abierta

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-14
- **Bloqueado por:** FS-118.3, FS-118.8
- **Decisión pendiente:** 0, 1 (el «hoy» depende del huso)
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Al terminar el día de la fecha, la tarea pasa a vencida sin recargar, con la lista abierta.
  - [ ] Dos personas en husos distintos ven la misma tarea vencida o no vencida, según la regla de FS-118.3.

### FS-118.10 · Errores y falta de conexión al cambiar la fecha

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-17 (mensaje en pantalla), CA-20
- **Bloqueado por:** FS-118.7
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Ante una fecha no válida se explica en castellano y la tarea conserva la fecha que tenía.
  - [ ] Sin conexión se ve el aviso de que la lista puede estar desactualizada.
  - [ ] Sin conexión, el cambio de fecha no se da por guardado hasta recuperarla.

### FS-118.11 · Pruebas de las reglas de negocio de FS-118

- **Tipo:** Test
- **Capa:** tests funcionales del backend
- **Hereda:** CA-1, CA-2, CA-3, CA-4, CA-5, CA-9, CA-10, CA-11, CA-12, CA-16, CA-18, CA-19, CA-22
- **Bloqueado por:** FS-118.4, FS-118.5
- **Definition of Done:** checklist de Test, más:
  - [ ] Hay un test por cada CA citado, con la historia completa de la persona (poner, cambiar, quitar).
  - [ ] CA-19 y CA-22 cubren la eliminación de una tarea con fecha, condicionados a PA-7.

### FS-118.12 · Pruebas de las reglas de tiempo

- **Tipo:** Test
- **Capa:** tests unitarios y funcionales con hora controlada
- **Hereda:** CA-8, CA-14, CA-15
- **Bloqueado por:** FS-118.3
- **Decisión pendiente:** 1, 3, 6
- **Definition of Done:** checklist de Test, más:
  - [ ] Cubre el último momento del día de la fecha y el primero del siguiente.
  - [ ] Cubre personas en husos horarios distintos mirando la misma tarea.
  - [ ] Cubre el cambio de horario de verano, una vez decidida la decisión 6.

## Trazabilidad: dónde se cubre cada criterio

| CA | Tickets |
|---|---|
| CA-1 | FS-118.1, FS-118.2, FS-118.11 |
| CA-2 | FS-118.4, FS-118.7, FS-118.11 |
| CA-3 | FS-118.4, FS-118.7, FS-118.11 |
| CA-4 | FS-118.4, FS-118.7, FS-118.11 |
| CA-5 | FS-118.4, FS-118.7, FS-118.11 |
| CA-6 | FS-118.6 |
| CA-7 | FS-118.3, FS-118.5, FS-118.8 |
| CA-8 | FS-118.3, FS-118.12 |
| CA-9 | FS-118.3, FS-118.5, FS-118.11 |
| CA-10 | FS-118.3, FS-118.11 |
| CA-11 | FS-118.3, FS-118.11 |
| CA-12 | FS-118.3, FS-118.5, FS-118.8, FS-118.11 |
| CA-13 | FS-118.8 |
| CA-14 | FS-118.9, FS-118.12 |
| CA-15 | FS-118.3, FS-118.9, FS-118.12 |
| CA-16 | FS-118.2, FS-118.11 |
| CA-17 | FS-118.2, FS-118.4, FS-118.10 |
| CA-18 | FS-118.4, FS-118.6, FS-118.11 |
| CA-19 | FS-118.11 |
| CA-20 | FS-118.10 |
| CA-21 | FS-118.6 |
| CA-22 | FS-118.6, FS-118.11 |
| CA-23 | FS-118.5, FS-118.8 |
| CA-24 | FS-118.5, FS-118.8 |
