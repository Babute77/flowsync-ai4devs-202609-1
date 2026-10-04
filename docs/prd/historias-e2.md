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
| FS-118 | Como persona del equipo, quiero poner, cambiar y quitar una fecha de vencimiento opcional en una tarea, y ver cuáles se han pasado de plazo, para saber cuándo hay que tenerla y qué va con retraso. | Ninguno | Dentro · sin RF |
| HU-8 | Como persona del equipo, quiero filtrar la lista por punto, para ver solo lo que está por hacer, en curso o hecho. | Ninguno | Dentro · sin RF |
| HU-9 | Como persona del equipo, quiero corregir el título de una tarea, para arreglar un error o precisarlo. | RF-11 | Dentro · condicionada (PA-7) |
| HU-10 | Como persona del equipo, quiero eliminar una tarea, para quitar de la lista lo que ya no tiene sentido. | RF-11 | Dentro · condicionada (PA-7) |
| HU-11 | Como persona del equipo, quiero que las tareas hechas salgan de la vista principal pero sigan accesibles, para centrarme en lo que queda sin perderlas. | RF-13 | Dentro · condicionada (PA-7; falta decidir el plazo) |
| HU-12 | Como persona del equipo, quiero cambiar el responsable de una tarea que lleva otra persona, para cubrir una ausencia sin esperar a que ella lo haga. | RF-12 | Dentro · condicionada (PA-6: no está decidido que cualquiera pueda hacerlo) |

### Notas sobre FS-118 (antes HU-7) y HU-8

- Se mantienen dentro de E2 por decisión, aunque el PRD no los recoge todavía.
- FS-118 reúne en una sola historia poner, cambiar y quitar la fecha y ver las tareas vencidas. El listado anterior solo tenía la primera mitad; el «vencida» no estaba como historia aparte.
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
- **Estimables:** FS-118, HU-8 y HU-12 no lo son todavía por las decisiones pendientes que se indican arriba.
- **Pequeñas:** una acción cada una; editar y eliminar van separadas, y coger y soltar también.
- **Testables:** las dos primeras y HU-3 ya tienen verificación en RF-5 a RF-7. Para el resto se escriben criterios después.

## Criterios de aceptación — FS-118 «Fecha de vencimiento y tareas vencidas»

**Historia.** Como persona del equipo, quiero poner, cambiar y quitar una fecha de vencimiento opcional en una tarea, y ver cuáles se han pasado de plazo, para saber cuándo hay que tenerla y qué va con retraso.

**Cómo leerlos.** Cada criterio es una regla de negocio observable. La columna *Origen* dice si sale del PRD o si es una **[PROPUESTA]** mía para tu revisión. Hasta que la revises, ninguna propuesta es un requisito.

### Camino feliz

**CA-1 · La fecha es opcional** — *Origen: PRD (RF-5, sin campos obligatorios)*
- DADO que creo una tarea con solo el título
- CUANDO la guardo
- ENTONCES la tarea existe sin fecha de vencimiento y no se me pide ninguna.

**CA-2 · Poner una fecha** — *Origen: PRD (RF-8, dos clics sobre la lista) y [PROPUESTA] en el detalle*
- DADO una tarea sin fecha en la lista
- CUANDO le pongo una fecha de vencimiento
- ENTONCES la tarea muestra esa fecha en la lista, sin abrir otra pantalla, y lo consigo en no más de dos clics.

**CA-3 · Cambiar la fecha** — *[PROPUESTA]*
- DADO una tarea con fecha de vencimiento
- CUANDO elijo otra fecha
- ENTONCES la lista muestra solo la nueva y la anterior no se conserva en ningún sitio visible.

**CA-4 · Quitar la fecha** — *[PROPUESTA]*
- DADO una tarea con fecha de vencimiento
- CUANDO la quito
- ENTONCES la tarea queda sin fecha y deja de contar como vencida, si lo estaba.

**CA-5 · Cualquiera puede ponerla o cambiarla** — *Origen: PRD (RF-12, sin permisos por rol). Condicionada a PA-6.*
- DADO una tarea que lleva otra persona
- CUANDO yo le cambio la fecha
- ENTONCES el cambio se aplica, sea o no mía la tarea.

**CA-6 · Los demás lo ven sin recargar** — *Origen: PRD (RF-14)*
- DADO que otra persona tiene la lista abierta
- CUANDO yo pongo, cambio o quito la fecha de una tarea
- ENTONCES ella ve el cambio sin recargar ni preguntar.

### Qué es «vencida»

**CA-7 · Una tarea se considera vencida cuando su fecha ya pasó y no está hecha** — *[PROPUESTA]*
- DADO una tarea con fecha de vencimiento anterior a hoy y que no está hecha
- CUANDO miro la lista
- ENTONCES se distingue a simple vista de las que no han vencido, sin abrirla.

**CA-8 · El día de la fecha todavía no está vencida** — *[PROPUESTA]*
- DADO una tarea cuya fecha de vencimiento es hoy
- CUANDO miro la lista durante ese día
- ENTONCES no aparece como vencida; pasa a estarlo cuando termina el día.

**CA-9 · Una tarea hecha no cuenta como vencida** — *[PROPUESTA]*
- DADO una tarea con fecha pasada
- CUANDO la marco como hecha
- ENTONCES deja de aparecer como vencida y conserva su fecha.

**CA-10 · Reabrir una tarea vencida la vuelve a marcar** — *[PROPUESTA]*
- DADO una tarea hecha con fecha ya pasada
- CUANDO le cambio el punto a uno que no sea «hecha»
- ENTONCES vuelve a aparecer como vencida.

**CA-11 · Una fecha futura quita el aviso de vencida** — *[PROPUESTA]*
- DADO una tarea vencida
- CUANDO le pongo una fecha posterior a hoy
- ENTONCES deja de aparecer como vencida.

**CA-12 · También vencen las tareas sin responsable** — *[PROPUESTA]*
- DADO una tarea libre con fecha pasada
- CUANDO miro la lista
- ENTONCES aparece como vencida igual que las demás, porque el plazo es de la tarea y no de la persona.

**CA-13 · Lo vencido se distingue sin depender del color** — *[PROPUESTA]*
- DADO una tarea vencida
- CUANDO la veo en la lista
- ENTONCES se reconoce como vencida por algo más que su color.

### Edge cases y errores

**CA-14 · Pasa la medianoche con la lista abierta** — *[PROPUESTA], por coherencia con RF-14*
- DADO que tengo la lista abierta y una tarea con fecha de hoy
- CUANDO termina el día
- ENTONCES la tarea pasa a vencida sin que yo recargue.

**CA-15 · Todas las personas ven lo mismo en un equipo con varios husos horarios** — *[PROPUESTA]. Pregunta abierta 1.*
- DADO un equipo repartido en varios husos horarios
- CUANDO dos personas miran la misma tarea a la vez
- ENTONCES ambas la ven como vencida o ambas como no vencida.

**CA-16 · Fecha en el pasado al crearla o ponerla** — *[PROPUESTA]. Pregunta abierta 2.*
- DADO que pongo una fecha anterior a hoy
- CUANDO la guardo
- ENTONCES se acepta y la tarea aparece como vencida de inmediato, y no se me bloquea.

**CA-17 · Fecha no válida** — *[PROPUESTA]*
- DADO que escribo algo que no es una fecha real, como un 31 de febrero
- CUANDO intento guardarla
- ENTONCES se me explica en castellano que la fecha no es válida y la tarea conserva la que tenía.

**CA-18 · Dos personas cambian la fecha a la vez** — *Origen: PRD (RNF-3, supuesto de que prevalece el más reciente)*
- DADO que dos personas cambian la fecha de la misma tarea casi a la vez
- CUANDO ambas guardan
- ENTONCES las dos acaban viendo la misma fecha, la del cambio más reciente.

**CA-19 · Se elimina una tarea con fecha** — *[PROPUESTA]. Condicionada a PA-7.*
- DADO una tarea vencida
- CUANDO alguien la elimina
- ENTONCES desaparece de la lista y deja de contar como vencida para todas las personas.

**CA-20 · Sin conexión no se pierde un cambio en silencio** — *Origen: PRD (RF-15) y [PROPUESTA]*
- DADO que pierdo la conexión con la lista abierta
- CUANDO intento cambiar una fecha
- ENTONCES veo el aviso de que la lista puede estar desactualizada y no parece que el cambio se haya guardado si no lo está.

**CA-21 · Nadie recibe avisos por vencer** — *Origen: PRD (notificaciones push excluidas, RF-17)*
- DADO una tarea que vence o ha vencido
- CUANDO llega o pasa su fecha
- ENTONCES nadie recibe ningún aviso fuera de la lista; el único indicio es lo que se ve en ella.

### Preguntas abiertas para tu revisión

1. **¿De quién es el huso horario del «hoy»?** Con 3 husos horarios, «vencida» cambia de día en momentos distintos. Propongo una regla única para todo el espacio (CA-15), pero hay que decidir cuál.
2. **¿Se admite una fecha ya pasada?** CA-16 la acepta; la alternativa es impedirla. Decide si importa que se pueda poner por error.
3. **¿Cuántos días tiene «ya vencida»?** Propongo que sea vencida desde el día siguiente (CA-8). ¿Cuenta una hora de corte?
4. **¿Se muestra antes de vencer algo que indique que se acerca?** No lo he incluido: sería un aviso más y roza las notificaciones excluidas.
5. **¿Hay un filtro de «solo vencidas»?** No lo he incluido, para no colar un filtro nuevo; HU-8 filtra solo por punto.
6. **Falta el requisito en el PRD.** FS-118 sigue «Dentro · sin RF»: necesita un RF en E2 antes de construirse.
