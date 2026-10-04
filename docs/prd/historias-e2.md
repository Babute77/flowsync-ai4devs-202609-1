# Historias de usuario — E2 «Gestión de tareas»

Descomposición de la épica E2 de [`flowsync-mvp.md`](flowsync-mvp.md). Solo el listado: los criterios de aceptación se escriben después.

Hay un único rol, «persona del equipo», porque los roles son planos y no hay permisos por rol.

## Cómo leer la validación

Cada historia se contrasta con el alcance del PRD (secciones 4 y 6) y recibe una de estas marcas:

- **Dentro:** respaldada por un requisito del PRD que no está en discusión.
- **Dentro · condicionada:** respaldada por un requisito marcado [SUPUESTO] o por un punto abierto de la sección 10. Se construye solo si ese punto se decide a favor.
- **Dentro · sin RF:** el encargo la da por dentro del MVP y de E2, pero el PRD todavía no tiene un requisito que la respalde. Hay que añadirlo antes de construir.
- **Fuera de alcance MVP:** el PRD la excluye o no la respalda. No se cuela en E2.

## Historias dentro del MVP

| ID | Historia | Respaldo en el PRD | Marca |
|---|---|---|---|
| HU-1 | Como persona del equipo, quiero crear una tarea escribiendo solo su título, para dejarla en la lista sin rellenar nada más. | RF-5 | Dentro |
| HU-2 | Como persona del equipo, quiero ver en una única lista el título, el responsable y el punto de cada tarea, para saber de un vistazo qué hay y quién lleva qué. | RF-6, alcance 2 | Dentro |
| HU-3 | Como persona del equipo, quiero distinguir a simple vista las tareas libres de las que ya lleva alguien, para no empezar algo que otra persona está tocando. | RF-7 | Dentro |
| HU-4 | Como persona del equipo, quiero cogerme una tarea libre, para que el resto sepa que la llevo yo. | RF-8, RF-9 | Dentro · condicionada (RF-9 es [SUPUESTO]: un único responsable) |
| HU-5 | Como persona del equipo, quiero soltar una tarea que llevo, para que otra persona pueda cogerla. | RF-8 | Dentro |
| HU-6 | Como persona del equipo, quiero cambiar el punto de una tarea que llevo, para reflejar en qué estoy sin que nadie me lo pregunte. | RF-8, RF-8b, RF-10 | Dentro · condicionada (RF-10 es [SUPUESTO]: tres puntos) |
| HU-7 | Como persona del equipo, quiero poner una fecha de vencimiento opcional a una tarea, para saber cuándo hay que tenerla. | Ninguno | Dentro · sin RF |
| HU-8 | Como persona del equipo, quiero filtrar la lista por punto, para ver solo lo que está por hacer, en curso o hecho. | Ninguno | Dentro · sin RF |
| HU-9 | Como persona del equipo, quiero corregir el título de una tarea, para arreglar un error o precisarlo. | RF-11 | Dentro · condicionada (PA-7) |
| HU-10 | Como persona del equipo, quiero eliminar una tarea, para quitar de la lista lo que ya no tiene sentido. | RF-11 | Dentro · condicionada (PA-7) |
| HU-11 | Como persona del equipo, quiero que las tareas hechas salgan de la vista principal pero sigan accesibles, para centrarme en lo que queda sin perderlas. | RF-13 | Dentro · condicionada (PA-7; falta decidir el plazo) |
| HU-12 | Como persona del equipo, quiero cambiar el responsable de una tarea que lleva otra persona, para cubrir una ausencia sin esperar a que ella lo haga. | RF-12 | Dentro · condicionada (PA-6: no está decidido que cualquiera pueda hacerlo) |

### Notas sobre HU-7 y HU-8

- Se mantienen dentro de E2 por decisión, aunque el PRD no los recoge todavía.
- La fecha de vencimiento debe ser opcional, porque el MVP no admite campos obligatorios más allá del título (RF-5).
- Hay que decidir qué es «vencida» y si la fecha se ve en la lista o solo al abrir la tarea, antes de escribir criterios.
- El filtro por punto depende de la decisión sobre los puntos disponibles (RF-10).

## Historias fuera de alcance MVP

No forman parte de E2 en este MVP. Se dejan anotadas para que no se cuelen.

| ID | Historia | Por qué queda fuera |
|---|---|---|
| FA-1 | Como persona del equipo, quiero importar mis tareas desde mi gestor anterior, para no empezar con la lista vacía. | El PRD excluye convivir con otro gestor e importar tareas; obliga a la doble actualización. |
| FA-2 | Como persona del equipo, quiero ver cuándo se cambió una tarea por última vez, para saber si su estado está viejo. | Es un indicador de actividad y está excluido (RF-16 retirado; reabrir es PA-8). |
| FA-3 | Como persona del equipo, quiero recibir un aviso cuando me asignen una tarea, para enterarme sin abrir la lista. | Las notificaciones push están excluidas: un aviso interrumpe. |
| FA-4 | Como persona del equipo, quiero ver un resumen de lo que se ha movido desde la última vez que miré, para ponerme al día tras una reunión. | El resumen de cambios está excluido del MVP; se añade si el equipo lo pide. |
| FA-5 | Como persona del equipo, quiero estimar el esfuerzo y priorizar las tareas en un backlog, para planificar el trabajo. | Sprints, estimaciones y backlog priorizado están excluidos; quien los necesita no es el usuario. |
| FA-6 | Como persona del equipo, quiero comentar en una tarea, para discutirla con quien la lleva. | Es chat. El MVP solo muestra el estado de la lista y no incluye conversación. |

## Comprobación INVEST

- **Independientes:** salvo HU-1, que ha de existir antes que las demás, ninguna exige otra. HU-4 a HU-6 trabajan sobre tareas ya creadas, y HU-8 sobre la lista de HU-2.
- **Negociables:** ninguna fija la pantalla ni el mecanismo; solo la acción y el beneficio.
- **Valiosas:** cada una responde a un job de la sección 2 del PRD. HU-9, HU-10, HU-11 y HU-12 aportan menos y por eso son condicionadas.
- **Estimables:** HU-7, HU-8 y HU-12 no lo son todavía por las decisiones pendientes que se indican arriba.
- **Pequeñas:** una acción cada una; editar y eliminar van separadas, y coger y soltar también.
- **Testables:** las dos primeras y HU-3 ya tienen verificación en RF-5 a RF-7. Para el resto se escriben criterios después.
