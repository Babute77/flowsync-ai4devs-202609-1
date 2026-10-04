# Backlog de E2 «Gestión de tareas»

Backlog construido para las dos historias de E2 que ya tienen criterios de aceptación, FS-118 y FS-142. Reúne sus tickets, el grafo de dependencias, el orden de implementación, la matriz de impacto frente a complejidad de las historias de E2 y el orden de backlog priorizado.

## 1. Cómo leerlo

- **Fuentes:** historias [`us-fechas-vencimiento.md`](E2-gestion-tareas/us-fechas-vencimiento.md) (FS-118) y [`us-filtrar-por-estado.md`](E2-gestion-tareas/us-filtrar-por-estado.md) (FS-142); tickets en [`tickets-fs-118.md`](E2-gestion-tareas/tickets-fs-118.md) y [`tickets-fs-142.md`](E2-gestion-tareas/tickets-fs-142.md), que incluyen además la trazabilidad de cada criterio. Los identificadores HU-n y FA-n de la matriz, y las referencias RF, RNF, PA y «sección n», están en [`historias-e2.md`](../prd/historias-e2.md) y [`flowsync-mvp.md`](../prd/flowsync-mvp.md). Si hay diferencias, mandan los ficheros `us-*.md` para los criterios y los `tickets-*.md` para los tickets.
- **Numeración de decisiones.** «Decisión n» es la decisión pendiente de la historia a la que pertenece el ticket (FS-118 o FS-142) y no es comparable entre historias: la decisión 2 de FS-118 es la fecha ya pasada y la de FS-142 es qué pasa con una tarea que deja de encajar en el filtro. El texto de cada una está al final de su fichero `us-*.md`. PA-n son los puntos abiertos del PRD.
- **Los tickets heredan los criterios de su historia.** No añaden criterios nuevos, y la Definition of Done es una checklist de cómo se entrega.
- **Nombran la capa, no diseñan.** Los tipos de dato, las rutas y los códigos de respuesta se deciden al implementar.
- **Sin estimaciones.** No hay horas ni puntos.
- **Estado:** todos los criterios de FS-118 y FS-142 son [PROPUESTA] y las dos historias siguen «Dentro · sin RF». Nada de este backlog es compromiso hasta que el PRD tenga el RF correspondiente y se cierren las decisiones pendientes.

## 2. Definition of Done por tipo

Es común a los tickets de las dos historias. FS-142 no usa Migración/DB.

### Migración/DB

- [ ] Se ejecuta con `node ace migration:run` sin error sobre una base de datos limpia y sobre una con tareas ya creadas, si las hay, que siguen existiendo.
- [ ] Se puede deshacer y volver a aplicar.
- [ ] El esquema generado se ha regenerado y está incluido en el commit, sin editarlo a mano.
- [ ] `npm run typecheck`, `npm run lint` y `npm run format` limpios en el backend.
- [ ] El PR dice qué cambia para quien ya tiene una base de datos local.

### Modelo/Dominio

- [ ] La regla vive en el modelo o la lógica de dominio y no se duplica en controladores ni en la interfaz.
- [ ] Tests (suite `unit`, o `functional` si necesitan base de datos) que cubren cada CA citado, incluidos los límites que nombra.
- [ ] Los imports usan los alias de subpath del repo.
- [ ] Los mensajes visibles para la persona están en castellano.
- [ ] `npm run typecheck`, `npm run lint` y `npm test` verdes.

### Endpoint/API

- [ ] Solo las personas con sesión iniciada pueden usarlo.
- [ ] Los imports usan los alias de subpath del repo.
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

## 3. Tickets de FS-118 · Fecha de vencimiento y tareas vencidas

### Antes de empezar

- **Decisión pendiente 0:** FS-118 no tiene todavía un RF en el PRD y todos sus criterios son [PROPUESTA]. Ningún ticket arranca hasta que exista el RF y se acepten los criterios.
- **Base de E2 que aún no existe:** la tarea y la lista de tareas (historias de crear tarea y de ver la lista, sin ID todavía). Es una dependencia externa de todos los tickets.
- **No hay runner de tests en el frontend.** Los tickets de Frontend se verifican a mano contra sus CA. Si se quiere test automático de la interfaz, hace falta un ticket aparte que lo introduzca; no entra aquí.

### Resumen

| ID | Título | Tipo | Bloqueado por | Decisión pendiente |
|---|---|---|---|---|
| FS-118.1 | Guardar la fecha de vencimiento de una tarea | Migración/DB | Base de E2 (tarea) | 0 |
| FS-118.2 | La tarea admite una fecha opcional y válida | Modelo/Dominio | FS-118.1 | 0, 2 |
| FS-118.3 | Regla de «vencida» | Modelo/Dominio | FS-118.2 | 0, 1, 3, 6 |
| FS-118.4 | Poner, cambiar y quitar la fecha | Endpoint/API | FS-118.2 | 0, 2 |
| FS-118.5 | La lectura de tareas permite conocer la fecha y si está vencida | Endpoint/API | FS-118.3, eliminar tarea de E2 | 0 |
| FS-118.6 | Los demás ven los cambios de fecha sin recargar | Endpoint/API | FS-118.4, mecanismo de E3 | 0 |
| FS-118.7 | Poner, cambiar y quitar la fecha desde la lista | Frontend | FS-118.4, lista de E2 | 0 |
| FS-118.8 | Mostrar las tareas vencidas en la lista | Frontend | FS-118.5, lista de E2 | 0 |
| FS-118.9 | Una tarea pasa a vencida con la lista abierta | Frontend | FS-118.3, FS-118.8, mecanismo de E3 | 0, 1, 3 |
| FS-118.10 | Errores y falta de conexión al cambiar la fecha | Frontend | FS-118.7, mecanismo de conexión de E3 (RF-15) | 0 |
| FS-118.11 | Pruebas de poner, cambiar y quitar la fecha | Test | FS-118.4 | 0, 2 |
| FS-118.12 | Pruebas de las reglas de tiempo | Test | FS-118.3, FS-118.5 | 0, 1, 3, 6 |
| FS-118.13 | Pruebas de la regla de vencida y de la eliminación | Test | FS-118.3, FS-118.5, FS-118.6 | 0 |

### Detalle

#### FS-118.1 · Guardar la fecha de vencimiento de una tarea

- **Tipo:** Migración/DB
- **Capa:** migración de la base de datos
- **Hereda:** CA-1 (la tarea puede existir sin fecha)
- **Bloqueado por:** base de E2 (la tarea existe)
- **Definition of Done:** checklist de Migración/DB, sin ítems propios.

#### FS-118.2 · La tarea admite una fecha opcional y válida

- **Tipo:** Modelo/Dominio
- **Capa:** modelo de tarea
- **Hereda:** CA-1, CA-16, CA-17 (la regla de validez, no el mensaje en pantalla)
- **Bloqueado por:** FS-118.1
- **Decisión pendiente:** 2 (si se admite una fecha ya pasada)
- **Definition of Done:** checklist de Modelo/Dominio, más:
  - [ ] Una tarea sin fecha es válida y una con fecha que no existe en el calendario no lo es.
  - [ ] El comportamiento ante una fecha pasada queda según lo decidido en la decisión 2.

#### FS-118.3 · Regla de «vencida»

- **Tipo:** Modelo/Dominio
- **Capa:** lógica de dominio de la tarea
- **Hereda:** CA-7, CA-8, CA-9, CA-10, CA-11, CA-12, CA-15
- **Bloqueado por:** FS-118.2, estado «hecha» y responsable de la tarea (base de E2)
- **Decisión pendiente:** 1 (huso del «hoy»), 3 (desde qué momento), 6 (horario de verano y viajes)
- **Definition of Done:** checklist de Modelo/Dominio, más:
  - [ ] Una tarea con fecha pasada y no hecha es vencida; una hecha no lo es; reabrirla la vuelve a marcar.
  - [ ] El día de la fecha todavía no es vencida y deja de serlo según lo decidido en la decisión 3.
  - [ ] Una tarea sin responsable se trata igual que una con responsable.
  - [ ] La regla de «hoy» sigue lo decidido en la decisión 1, con tests que fijan la hora y no dependen de la real.

#### FS-118.4 · Poner, cambiar y quitar la fecha

- **Tipo:** Endpoint/API
- **Capa:** servicio que recibe el cambio de la fecha de una tarea
- **Hereda:** CA-2, CA-3, CA-4, CA-5, CA-16, CA-17 (rechazo de fecha no válida con mensaje), CA-18
- **Bloqueado por:** FS-118.2
- **Decisión pendiente:** 2 (fecha ya pasada); PA-6 (quién puede cambiar tareas ajenas)
- **Definition of Done:** checklist de Endpoint/API, más:
  - [ ] Cualquier persona autenticada puede cambiar la fecha de cualquier tarea, sea o no suya (condicionado a PA-6).
  - [ ] Ante una fecha no válida, la tarea conserva la que tenía y el error explica el motivo en castellano.
  - [ ] Dos cambios casi simultáneos dejan la misma fecha a todas las personas: la del cambio más reciente.
  - [ ] Una fecha ya pasada se acepta o se rechaza según lo decidido en la decisión 2.

#### FS-118.5 · La lectura de tareas permite conocer la fecha y si está vencida

- **Tipo:** Endpoint/API
- **Capa:** servicio que entrega la lista de tareas
- **Hereda:** CA-7, CA-9, CA-12, CA-19, CA-23, CA-24
- **Bloqueado por:** FS-118.3, eliminar tarea de E2 (historia sin ID)
- **Decisión pendiente:** PA-7 (eliminar y ocultar las hechas)
- **Definition of Done:** checklist de Endpoint/API, más:
  - [ ] Para cada tarea de la lista se puede saber su fecha, si la tiene, y si está vencida según FS-118.3.
  - [ ] Una tarea eliminada deja de aparecer y de contar como vencida para todas las personas.
  - [ ] La respuesta no incluye ningún recuento ni resumen de vencidas por persona.
  - [ ] Las tareas hechas que no están en la vista principal no cuentan como vencidas (condicionado a PA-7).

#### FS-118.6 · Los demás ven los cambios de fecha sin recargar

- **Tipo:** Endpoint/API
- **Capa:** servicio que comunica cambios a las pantallas abiertas
- **Hereda:** CA-6, CA-18, CA-21, CA-22
- **Bloqueado por:** FS-118.4, mecanismo de actualización sin recargar de E3 (RF-14)
- **Decisión pendiente:** PA-3 (si el tiempo real entra), PA-7 (eliminación)
- **Definition of Done:** checklist de Endpoint/API, más:
  - [ ] Poner, cambiar o quitar una fecha llega a las pantallas abiertas de las demás personas.
  - [ ] Tras dos cambios casi simultáneos todas las pantallas acaban con la misma fecha.
  - [ ] No se envía ningún aviso fuera de la lista (sin notificaciones push).
  - [ ] Si la tarea se elimina a la vez que cambia su fecha, nadie ve una tarea con la fecha nueva (condicionado a PA-7).

#### FS-118.7 · Poner, cambiar y quitar la fecha desde la lista

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-2, CA-3, CA-4, CA-5
- **Bloqueado por:** FS-118.4, lista de tareas de E2
- **Decisión pendiente:** PA-6
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Poner la fecha se hace en no más de dos clics y sin abrir otra pantalla; cambiarla y quitarla no añaden pasos.
  - [ ] La fecha nueva reemplaza a la anterior en la lista; al quitarla, la tarea queda sin fecha.
  - [ ] Se puede hacer también sobre las tareas de otras personas (condicionado a PA-6).

#### FS-118.8 · Mostrar las tareas vencidas en la lista

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-7, CA-12, CA-13, CA-23, CA-24
- **Bloqueado por:** FS-118.5, lista de tareas de E2
- **Decisión pendiente:** PA-7 (hechas ocultas)
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Las vencidas se distinguen a simple vista sin abrir la tarea, y no solo por el color.
  - [ ] Una tarea libre vencida se ve igual que una cogida.
  - [ ] No hay ningún recuento ni resumen de vencidas por persona en pantalla.
  - [ ] Las tareas hechas ocultas no aparecen como vencidas en la vista principal.

#### FS-118.9 · Una tarea pasa a vencida con la lista abierta

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-14, CA-15
- **Bloqueado por:** FS-118.3, FS-118.8, mecanismo de actualización sin recargar de E3 (para que la pantalla se entere del cambio de día)
- **Decisión pendiente:** 1 (el «hoy» depende del huso), 3
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Al terminar el día de la fecha, la tarea pasa a vencida sin recargar, con la lista abierta.
  - [ ] La pantalla obtiene cuándo una tarea pasa a vencida de la regla de FS-118.3 y no la duplica.
  - [ ] Dos personas en husos distintos ven la misma tarea vencida o no vencida, según la regla de FS-118.3.

#### FS-118.10 · Errores y falta de conexión al cambiar la fecha

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-17 (mensaje en pantalla), CA-20
- **Bloqueado por:** FS-118.7
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Ante una fecha no válida se explica en castellano y la tarea conserva la fecha que tenía.
  - [ ] Sin conexión se ve el aviso de que la lista puede estar desactualizada.
  - [ ] Sin conexión, el cambio de fecha no se da por guardado hasta recuperarla.

#### FS-118.11 · Pruebas de poner, cambiar y quitar la fecha

- **Tipo:** Test
- **Capa:** tests funcionales del backend
- **Hereda:** CA-1, CA-2, CA-3, CA-4, CA-5, CA-16, CA-17, CA-18
- **Bloqueado por:** FS-118.4
- **Decisión pendiente:** 2; PA-6
- **Definition of Done:** checklist de Test, más:
  - [ ] Hay un test por cada CA citado, incluido el camino de error de CA-17.

#### FS-118.12 · Pruebas de las reglas de tiempo

- **Tipo:** Test
- **Capa:** tests unitarios y funcionales con hora controlada
- **Hereda:** CA-8, CA-15
- **Bloqueado por:** FS-118.3, FS-118.5
- **Decisión pendiente:** 1, 3, 6
- **Definition of Done:** checklist de Test, más:
  - [ ] Cubre el último momento del día de la fecha y el primero del siguiente.
  - [ ] Cubre personas en husos horarios distintos mirando la misma tarea.
  - [ ] Los casos de horario de verano y viajes se añaden cuando se cierre la decisión 6.

#### FS-118.13 · Pruebas de la regla de vencida y de la eliminación

- **Tipo:** Test
- **Capa:** tests funcionales del backend
- **Hereda:** CA-9, CA-10, CA-11, CA-12, CA-19, CA-22, CA-23, CA-24
- **Bloqueado por:** FS-118.3, FS-118.5, FS-118.6
- **Decisión pendiente:** PA-7
- **Definition of Done:** checklist de Test, más:
  - [ ] Hay un test por cada CA citado.
  - [ ] CA-19, CA-22 y CA-23 quedan condicionados a PA-7.

## 4. Tickets de FS-142 · Filtrar por estado

### Antes de empezar

- **Decisión pendiente 0:** FS-142 no tiene todavía un RF en el PRD y todos sus criterios son [PROPUESTA]. Ningún ticket arranca hasta que exista el RF y se acepten los criterios.
- **Base de E2 que aún no existe:** la tarea con su estado (RF-10, un [SUPUESTO]) y la lista de tareas. Es una dependencia externa de todos los tickets.
- **No hay ticket de Migración/DB.** El estado de la tarea lo aporta la base de E2 y FS-142 no guarda nada nuevo. Si la decisión pendiente 3 acuerda que el filtro se conserve entre sesiones, hará falta un ticket nuevo, que no existe todavía.
- **Dónde se filtra se decide al implementar** (en adelante, «decisión previa de capa»). Los tickets FS-142.1, FS-142.2, FS-142.3 y FS-142.7 están condicionados a ella: si se filtra solo en la pantalla, FS-142.2 y FS-142.7 se reducen o desaparecen y la regla de FS-142.1 pasa a vivir en la interfaz. Hay que decidirlo antes de empezar FS-142.1, y los CA no cambian.
- **Los estados dependen de RF-10,** que es un [SUPUESTO]. Si las opciones cambian, cambia lo que cubren varios CA.
- **Las suites de tests `unit` y `functional` aún no existen.** El primer ticket que lleve tests crea la estructura.
- **No hay runner de tests en el frontend.** Los tickets de Frontend se verifican a mano contra sus CA. Un test automático de la interfaz requeriría un ticket aparte.

### Resumen

| ID | Título | Tipo | Bloqueado por | Decisión pendiente |
|---|---|---|---|---|
| FS-142.1 | Reglas de los estados que se pueden pedir | Modelo/Dominio | Estado de la tarea (base de E2), decisión previa de capa | 0, 1; RF-10 |
| FS-142.2 | Pedir las tareas de uno o varios estados | Endpoint/API | FS-142.1, decisión previa de capa | 0, 1, 7; PA-7 |
| FS-142.3 | Aplicar y quitar el filtro desde la lista | Frontend | FS-142.2, lista de E2 | 0, 1, 3, 4, 6, 7; PA-7 |
| FS-142.4 | Mensajes de resultado y de error del filtro | Frontend | FS-142.3 | 0, 1, 3 |
| FS-142.5 | El filtro ante los cambios de otras personas | Frontend | FS-142.3, mecanismo de actualización de E3 (RF-14) | 0, 7; PA-3 |
| FS-142.6 | El filtro ante mis propios cambios | Frontend | FS-142.3, crear tarea y cambiar estado de E2 | 0, 2, 7; PA-11 |
| FS-142.7 | Pruebas del filtro por estado | Test | FS-142.2 | 0, 1; PA-7 |
| FS-142.8 | El filtro ante la falta de conexión | Frontend | FS-142.3, aviso de conexión de E3 (RF-15) | 0; PA-7 |

### Detalle

#### FS-142.1 · Reglas de los estados que se pueden pedir

- **Tipo:** Modelo/Dominio
- **Capa:** lógica de dominio de la tarea
- **Hereda:** CA-2, CA-7, CA-8
- **Bloqueado por:** estado de la tarea (base de E2), decisión previa de capa
- **Decisión pendiente:** 1 («pendiente» y selección de varios estados); RF-10 (opciones de estado, [SUPUESTO])
- **Definition of Done:** checklist de Modelo/Dominio, más:
  - [ ] Se sabe qué estados existen y se reconoce uno que no existe.
  - [ ] «Pendiente» corresponde a por hacer y en curso, y deja fuera las hechas, según lo decidido en la decisión 1.
  - [ ] Si de varios estados pedidos uno no existe, se identifica cuál.

#### FS-142.2 · Pedir las tareas de uno o varios estados

- **Tipo:** Endpoint/API
- **Capa:** servicio que entrega la lista de tareas filtrada
- **Hereda:** CA-1, CA-2, CA-5, CA-6, CA-7, CA-8, CA-14, CA-15, CA-16
- **Bloqueado por:** FS-142.1, decisión previa de capa
- **Decisión pendiente:** 1; 7 (qué es la lista sin filtro frente a RF-13); PA-7
- **Definition of Done:** checklist de Endpoint/API, más:
  - [ ] Pedir un estado devuelve solo las tareas de ese estado.
  - [ ] La respuesta permite distinguir un estado sin tareas de que no haya ninguna tarea y de un error.
  - [ ] Pedir un estado que no existe responde con un error y no con una lista vacía; el error permite saber qué estados hay disponibles.
  - [ ] Pedir varios estados con uno inexistente da error y no devuelve un resultado parcial sin avisar.
  - [ ] Cada tarea devuelta mantiene lo que distingue libre de cogida.
  - [ ] Pedir un filtro no modifica ninguna tarea ni cambia lo que ven las demás personas.
  - [ ] Las tareas hechas son accesibles pidiendo ese estado, aunque no estén en la vista principal (condicionado a PA-7).

#### FS-142.3 · Aplicar y quitar el filtro desde la lista

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-1, CA-2, CA-3, CA-4, CA-5, CA-14, CA-15, CA-16
- **Bloqueado por:** FS-142.2, lista de tareas de E2
- **Decisión pendiente:** 1, 3 (si el filtro se conserva), 4 (qué ve una persona nueva), 6 (tensión con «una sola lista»), 7; PA-7. Si la decisión previa de capa lo asigna aquí, este ticket recibe también el filtro pedido desde un enlace antiguo o guardado, sin imponer su forma.
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Se aplica y se quita sobre la lista ya abierta, en no más de dos clics y sin abrir otra pantalla.
  - [ ] Se ve qué filtro está aplicado.
  - [ ] Al quitar el filtro, la lista vuelve a verse como sin filtro, según lo decidido en la decisión 7.
  - [ ] El filtro de una persona no cambia lo que ven las demás.
  - [ ] Libre y cogida se distinguen igual con y sin filtro.
  - [ ] Aplicar o quitar un filtro no modifica ninguna tarea.

#### FS-142.4 · Mensajes de resultado y de error del filtro

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-6, CA-7, CA-8, CA-9
- **Bloqueado por:** FS-142.3
- **Decisión pendiente:** 1, 3
- **Definition of Done:** checklist de Frontend, más:
  - [ ] El texto del aviso de estado inexistente tiene una única fuente: no se redacta a la vez en la pantalla y en el servicio.
  - [ ] Un estado sin tareas muestra un mensaje distinto del de «todavía no hay tareas» y del de error.
  - [ ] Un estado inexistente muestra un aviso en castellano con los estados disponibles, y nunca una lista vacía como si no hubiera tareas.
  - [ ] Con varios estados y uno inexistente, el aviso dice cuál y no se aplica un filtro parcial en silencio.
  - [ ] Tras un aviso de error se sigue viendo el filtro válido anterior.

#### FS-142.5 · El filtro ante los cambios de otras personas

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-10
- **Bloqueado por:** FS-142.3, mecanismo de actualización sin recargar de E3 (RF-14)
- **Decisión pendiente:** 7; PA-3 (si el tiempo real entra en el MVP)
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Si otra persona cambia una tarea y esta encaja o deja de encajar en mi filtro, aparece o desaparece de mi vista sin recargar.

#### FS-142.6 · El filtro ante mis propios cambios

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-11, CA-12
- **Bloqueado por:** FS-142.3, crear tarea y cambiar el estado de una tarea de E2
- **Decisión pendiente:** 2 (si la tarea sale de la vista al instante o se mantiene), 7; PA-11 (con qué estado nace una tarea)
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Al cambiar el estado de una tarea mía, esta se comporta con el filtro según lo decidido en la decisión 2 y no se pierde: sigue en la lista sin filtro.
  - [ ] Al crear una tarea que mi filtro no muestra, se me indica que se ha creado.

#### FS-142.7 · Pruebas del filtro por estado

- **Tipo:** Test
- **Capa:** tests funcionales del backend
- **Hereda:** CA-1, CA-2, CA-5, CA-6, CA-7, CA-8, CA-14, CA-15, CA-16
- **Bloqueado por:** FS-142.2
- **Decisión pendiente:** 1; PA-7
- **Definition of Done:** checklist de Test, más:
  - [ ] Hay un test por cada CA citado, incluidos los dos casos de estado inexistente.
  - [ ] Cubre el recorrido completo y no repite los tests de regla de FS-142.1 y FS-142.2.
  - [ ] CA-14 queda condicionado a PA-7.

#### FS-142.8 · El filtro ante la falta de conexión

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-13
- **Bloqueado por:** FS-142.3, aviso de conexión de E3 (RF-15)
- **Decisión pendiente:** PA-7 (re-sincronizar tras perder la conexión)
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Sin conexión se ve el aviso de que la lista puede estar desactualizada.
  - [ ] Al recuperar la conexión la lista se actualiza sin acción manual y el filtro sigue aplicado.

## 5. Grafo de dependencias y orden de implementación

Una flecha `A → B` significa que A bloquea a B.

### FS-118

```
Base de E2 (tarea, lista, estado «hecha», responsable) + decisión 0 (RF en el PRD)
   │
   ▼
FS-118.1  Migración: guardar la fecha
   │
   ▼
FS-118.2  Modelo: fecha opcional y válida
   ├────────────────────────────┐
   ▼                            ▼
FS-118.3  Regla de «vencida»    FS-118.4  API: poner, cambiar y quitar
   │  (necesita estado «hecha»)    │
   │                               ├──► FS-118.7  UI: poner/cambiar/quitar ──► FS-118.10  UI: errores y sin conexión
   │                               │         (necesita lista de E2)               (necesita aviso de conexión de E3)
   │                               ├──► FS-118.6  API: difusión a los demás (necesita mecanismo de E3)
   │                               └──► FS-118.11 Test: poner/cambiar/quitar
   ▼
FS-118.5  API: lectura con fecha y vencida (necesita «eliminar tarea» de E2)
   ├──► FS-118.8  UI: mostrar vencidas (necesita lista de E2) ──► FS-118.9  UI: pasa a vencida con la lista abierta
   │                                                               (depende también de FS-118.3 y del mecanismo de E3)
   ├──► FS-118.12 Test: reglas de tiempo (también FS-118.3)
   └──► FS-118.13 Test: vencida y eliminación (también FS-118.3 y FS-118.6)
```

| Ola | Tickets | Qué permite empezar |
|---|---|---|
| 0 | Base de E2 y decisión 0 | Todo lo demás |
| 1 | FS-118.1 | FS-118.2 |
| 2 | FS-118.2 | FS-118.3 y FS-118.4 |
| 3 | FS-118.4 y FS-118.3 en paralelo | FS-118.3 puede esperar a las decisiones 1, 3 y 6 de FS-118 (ver notas) |
| 4 | FS-118.7, FS-118.11 (tras .4) y FS-118.5 (tras .3) | La parte visible |
| 5 | FS-118.8, FS-118.10, FS-118.6 y FS-118.12 | Cierre de UI y tiempo |
| 6 | FS-118.9 y FS-118.13 | Lo último |

- **Aristas que el dibujo no muestra:** FS-118.3 → .9, .12 y .13; FS-118.5 → .12; FS-118.6 → .13.
- **Camino crítico interno:** FS-118.1 → .2 → .3 → .5 → .8 → .9. No incluye las dependencias externas.
- **Decisiones que bloquean FS-118.3:** 1 (huso del «hoy»), 3 (desde cuándo es vencida) y 6 (horario de verano y viajes). Si siguen abiertas al llegar a la ola 3, se empieza por FS-118.4 y su rama (.7 y .11), que solo espera a la decisión 2.
- **Dependencias de E3:** FS-118.6, .9 y .10 necesitan el mecanismo de actualización sin recargar y el aviso de conexión. Aplazarlas no bloquea FS-118.1 a .5, .7, .8 ni .11, pero deja sin hacer FS-118.13, que depende de .6, y con él los tests de CA-22.
- **Dependencia externa de FS-118.5:** «eliminar tarea» de E2, historia sin ID todavía.

### FS-142

El grafo se deriva de las dependencias de los tickets.

```
Base de E2 (tarea con estado, lista) + decisión 0 + decisión previa de capa
   │
   ▼
FS-142.1  Dominio: estados que se pueden pedir
   │
   ▼
FS-142.2  API: pedir tareas de uno o varios estados
   ├──► FS-142.7  Test del filtro
   ▼
FS-142.3  UI: aplicar y quitar el filtro (necesita lista de E2)
   ├──► FS-142.4  UI: mensajes de resultado y de error
   ├──► FS-142.5  UI: ante cambios de otras personas (necesita mecanismo de E3)
   ├──► FS-142.6  UI: ante mis propios cambios (necesita crear tarea y cambiar estado de E2)
   └──► FS-142.8  UI: ante la falta de conexión (necesita aviso de conexión de E3)
```

La decisión previa de capa bloquea FS-142.1. Orden: FS-142.1, FS-142.2, luego FS-142.3 y FS-142.7 en paralelo, y después FS-142.4, .5, .6 y .8. Si se decide filtrar solo en la pantalla, FS-142.2 y FS-142.7 se reducen o desaparecen.

## 6. Matriz impacto frente a complejidad

Las historias de E2, las que quedaron fuera del MVP y la sincronización en tiempo real de E3. Es cualitativa: el **impacto** se mide contra la decisión que el producto quiere cambiar (no empezar lo que otra persona ya está tocando y saber qué está libre) y contra el riesgo nº 1, que la lista se quede vieja. La **complejidad** sale de los tickets, las decisiones abiertas y las dependencias externas; la de los ítems fuera del MVP no tiene tickets y es un juicio aproximado.

| | **Baja complejidad** | **Alta complejidad** |
|---|---|---|
| **Alto impacto** | **Quick wins:** HU-1 crear, HU-2 ver la lista, HU-3 libre frente a cogida, HU-4 cogerme una tarea, HU-6 cambiar el punto | **Apuesta grande:** E3 sincronización en tiempo real |
| **Impacto medio o bajo** | **Relleno:** HU-5 soltar, HU-9 corregir título, HU-10 eliminar, HU-11 hechas fuera de la vista, FS-142 filtrar por estado (condicionado, ver abajo) | **Evitar o aplazar:** FS-118 fecha de vencimiento y vencidas, HU-12 cambiar responsable de otra persona |

### Fuera del MVP

Están por decisión y no entran en el orden de backlog.

| Ítem | Impacto | Complejidad | Por qué sigue fuera |
|---|---|---|---|
| FA-1 importar del gestor anterior | Alto para adoptar | Alta | Obliga a la doble actualización. Es el mayor riesgo de abandono y el PRD lo deja sin resolver (PA-4). |
| FA-2 ver cuándo cambió una tarea | Medio | Baja | Técnicamente barato, pero es un indicador de actividad (PA-8). No es un quick win, porque está excluido. |
| FA-3 avisos al asignarme | Bajo | Media | Contradice «resumen que espera, no aviso que interrumpe». |
| FA-4 resumen de lo que se movió | Medio | Media | Se añade si el equipo lo pide. |
| FA-5 estimar y priorizar | Bajo | Alta | Quien lo necesita no es el usuario. |
| FA-6 comentar en una tarea | Medio | Alta | Es chat. |

### Por qué cada posición

- **Los quick wins son el ciclo básico.** Crear, ver, cogerse y cambiar el punto son la lista compartida. Sin ellos no hay producto y son la parte más barata. HU-3 sale casi gratis con HU-2. Están condicionados: HU-4 depende de RF-9 y HU-6 de RF-10, que son [SUPUESTO] del PRD.
- **E3 es la apuesta grande, no un quick win.** Su impacto es alto solo si el equipo tiene la lista abierta a la vez, y con 3 husos horarios eso está en duda (PA-3). Depende de un mecanismo que aún no existe y arrastra a FS-118.6, .9 y .10.
- **FS-118 es, a juicio de esta matriz, la de peor relación valor-coste.** Tiene 13 tickets, tres decisiones de tiempo abiertas y no responde de forma directa a ninguno de los jobs de la sección 2 del PRD. Está dentro del MVP por decisión, y la matriz sugiere dejarla para el final.
- **FS-142 queda en «relleno», condicionado.** Podría subir a quick win si se filtra solo en la pantalla. Y puede resultar innecesario si las decisiones 6 y 7 de FS-142 salen mal: si las hechas ya salen de la vista principal por RF-13, el filtro aporta poco.
- **HU-12 espera a PA-6.** Cambiar el responsable de una tarea ajena choca con RF-8b y no está decidido.

## 7. Orden de backlog priorizado

1. **Previos:** E1 acceso (RF-3) antes de abrirlo a un equipo real, no antes de construir. Decidir con qué estado nace una tarea (PA-11), que define qué es «libre» y condiciona HU-1, HU-3 y FS-142.6.
2. **Primer corte, el ciclo básico:** HU-1, HU-2 (con HU-3), HU-4 y HU-6. Permite probar el riesgo nº 1 sin tiempo real.
3. **Puerta de decisión, con datos del piloto:** ¿el equipo mantiene la lista al día (PA-1) y hace falta ver los cambios en vivo (PA-3)? De la respuesta depende si E3 entra.
4. **Relleno barato:** HU-5, FS-142 (salvo .5 y .8, que esperan a E3; y sujeto a las decisiones 6 y 7 de FS-142), HU-11, HU-10 y HU-9.
5. **E3 sincronización en tiempo real,** solo si pasa la puerta.
6. **FS-118,** al final (salvo .6, .9 y .10, que esperan a E3). Gana urgencia si el equipo la pide con datos; entonces conviene cerrar antes las decisiones 1, 3 y 6.
7. **HU-12,** solo después de resolver PA-6.

**Dependencias de E3 en el orden.** FS-142.5 y FS-142.8, y FS-118.6, .9 y .10, no pueden construirse antes de E3. Si E3 pasa la puerta, entran con ella; si no, esos cinco tickets quedan fuera y hay que decidir aparte qué pasa con RF-14 (ver cambios sin recargar) y RF-15 (aviso de conexión).

**Qué cambiaría con datos.** Si el piloto muestra que la lista se queda vieja, E3 sube, porque la frescura sería el problema. Si muestra que se mantiene al día sin tiempo real, E3 baja y puede salir del MVP.
