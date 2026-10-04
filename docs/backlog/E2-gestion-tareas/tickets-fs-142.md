# Tickets de FS-142 · Filtrar por estado

Descomposición de la historia [`us-filtrar-por-estado.md`](us-filtrar-por-estado.md) en tickets, con la misma convención que [`tickets-fs-118.md`](tickets-fs-118.md). Cada ticket es una unidad de trabajo que una persona termina en una sesión, como máximo media jornada. Si al empezar no cabe, se parte antes de seguir.

## Cómo leerlo

- **Hereda los criterios de la historia.** Cada ticket cita los CA de FS-142 que cubre y no añade criterios nuevos. El texto de cada CA vive en la historia.
- **Definition of Done.** Es la checklist de cómo se entrega: tests, manejo de error y convenciones del repo. Las comunes a cada tipo están en la sección «Definition of Done por tipo»; cada ticket suma solo lo propio.
- **Nombra la capa, no diseña.** El detalle de datos, rutas y códigos de respuesta se decide al implementar.
- **Sin estimaciones.** No hay horas ni puntos.
- **Dependencias.** *Bloqueado por* son otros tickets o historias. *Decisión pendiente* son las decisiones de la historia (numeradas como en su fichero) o los puntos abiertos del PRD (PA-n) que hay que cerrar antes de empezar.

## Antes de empezar cualquier ticket

- **Decisión pendiente 0:** FS-142 no tiene todavía un RF en el PRD y todos sus criterios son [PROPUESTA]. Ningún ticket arranca hasta que exista el RF y se acepten los criterios.
- **Base de E2 que aún no existe:** la tarea con su estado (RF-10, un [SUPUESTO]) y la lista de tareas. Es una dependencia externa de todos los tickets.
- **No hay ticket de Migración/DB.** El estado de la tarea lo aporta la base de E2 y FS-142 no guarda nada nuevo. Si la decisión pendiente 3 acuerda que el filtro se conserve entre sesiones, hará falta un ticket nuevo, que no existe todavía.
- **Dónde se filtra se decide al implementar** (en adelante, «decisión previa de capa»). Los tickets FS-142.1, FS-142.2, FS-142.3 y FS-142.7 están condicionados a ella: si se filtra solo en la pantalla, FS-142.2 y FS-142.7 se reducen o desaparecen y la regla de FS-142.1 pasa a vivir en la interfaz. Hay que decidirlo antes de empezar FS-142.1, y los CA no cambian.
- **Los estados dependen de RF-10,** que es un [SUPUESTO]. Si las opciones cambian, cambia lo que cubren varios CA.
- **Las suites de tests `unit` y `functional` aún no existen.** El primer ticket que lleve tests crea la estructura.
- **No hay runner de tests en el frontend.** Los tickets de Frontend se verifican a mano contra sus CA. Un test automático de la interfaz requeriría un ticket aparte.

## Resumen

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

## Definition of Done por tipo

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

## Tickets

### FS-142.1 · Reglas de los estados que se pueden pedir

- **Tipo:** Modelo/Dominio
- **Capa:** lógica de dominio de la tarea
- **Hereda:** CA-2, CA-7, CA-8
- **Bloqueado por:** estado de la tarea (base de E2), decisión previa de capa
- **Decisión pendiente:** 1 («pendiente» y selección de varios estados); RF-10 (opciones de estado, [SUPUESTO])
- **Definition of Done:** checklist de Modelo/Dominio, más:
  - [ ] Se sabe qué estados existen y se reconoce uno que no existe.
  - [ ] «Pendiente» corresponde a por hacer y en curso, y deja fuera las hechas, según lo decidido en la decisión 1.
  - [ ] Si de varios estados pedidos uno no existe, se identifica cuál.

### FS-142.2 · Pedir las tareas de uno o varios estados

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

### FS-142.3 · Aplicar y quitar el filtro desde la lista

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

### FS-142.4 · Mensajes de resultado y de error del filtro

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

### FS-142.5 · El filtro ante los cambios de otras personas

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-10
- **Bloqueado por:** FS-142.3, mecanismo de actualización sin recargar de E3 (RF-14)
- **Decisión pendiente:** 7; PA-3 (si el tiempo real entra en el MVP)
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Si otra persona cambia una tarea y esta encaja o deja de encajar en mi filtro, aparece o desaparece de mi vista sin recargar.

### FS-142.6 · El filtro ante mis propios cambios

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-11, CA-12
- **Bloqueado por:** FS-142.3, crear tarea y cambiar el estado de una tarea de E2
- **Decisión pendiente:** 2 (si la tarea sale de la vista al instante o se mantiene), 7; PA-11 (con qué estado nace una tarea)
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Al cambiar el estado de una tarea mía, esta se comporta con el filtro según lo decidido en la decisión 2 y no se pierde: sigue en la lista sin filtro.
  - [ ] Al crear una tarea que mi filtro no muestra, se me indica que se ha creado.

### FS-142.7 · Pruebas del filtro por estado

- **Tipo:** Test
- **Capa:** tests funcionales del backend
- **Hereda:** CA-1, CA-2, CA-5, CA-6, CA-7, CA-8, CA-14, CA-15, CA-16
- **Bloqueado por:** FS-142.2
- **Decisión pendiente:** 1; PA-7
- **Definition of Done:** checklist de Test, más:
  - [ ] Hay un test por cada CA citado, incluidos los dos casos de estado inexistente.
  - [ ] Cubre el recorrido completo y no repite los tests de regla de FS-142.1 y FS-142.2.
  - [ ] CA-14 queda condicionado a PA-7.

### FS-142.8 · El filtro ante la falta de conexión

- **Tipo:** Frontend
- **Capa:** interfaz de la lista de tareas
- **Hereda:** CA-13
- **Bloqueado por:** FS-142.3, aviso de conexión de E3 (RF-15)
- **Decisión pendiente:** PA-7 (re-sincronizar tras perder la conexión)
- **Definition of Done:** checklist de Frontend, más:
  - [ ] Sin conexión se ve el aviso de que la lista puede estar desactualizada.
  - [ ] Al recuperar la conexión la lista se actualiza sin acción manual y el filtro sigue aplicado.

## Trazabilidad: dónde se cubre cada criterio

| CA | Tickets |
|---|---|
| CA-1 | FS-142.2, FS-142.3, FS-142.7 |
| CA-2 | FS-142.1, FS-142.2, FS-142.3, FS-142.7 |
| CA-3 | FS-142.3 |
| CA-4 | FS-142.3 |
| CA-5 | FS-142.2, FS-142.3, FS-142.7 |
| CA-6 | FS-142.2, FS-142.4, FS-142.7 |
| CA-7 | FS-142.1, FS-142.2, FS-142.4, FS-142.7 |
| CA-8 | FS-142.1, FS-142.2, FS-142.4, FS-142.7 |
| CA-9 | FS-142.4 |
| CA-10 | FS-142.5 |
| CA-11 | FS-142.6 |
| CA-12 | FS-142.6 |
| CA-13 | FS-142.8 |
| CA-14 | FS-142.2, FS-142.3, FS-142.7 |
| CA-15 | FS-142.2, FS-142.3, FS-142.7 |
| CA-16 | FS-142.2, FS-142.3, FS-142.7 |
