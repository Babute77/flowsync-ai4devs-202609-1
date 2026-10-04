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
| FS-142 | Como persona del equipo, quiero filtrar la lista por estado, para centrarme en lo pendiente y decidir qué coger sin ruido. | Ninguno | Dentro · sin RF |
| HU-9 | Como persona del equipo, quiero corregir el título de una tarea, para arreglar un error o precisarlo. | RF-11 | Dentro · condicionada (PA-7) |
| HU-10 | Como persona del equipo, quiero eliminar una tarea, para quitar de la lista lo que ya no tiene sentido. | RF-11 | Dentro · condicionada (PA-7) |
| HU-11 | Como persona del equipo, quiero que las tareas hechas salgan de la vista principal pero sigan accesibles, para centrarme en lo que queda sin perderlas. | RF-13 | Dentro · condicionada (PA-7; falta decidir el plazo) |
| HU-12 | Como persona del equipo, quiero cambiar el responsable de una tarea que lleva otra persona, para cubrir una ausencia sin esperar a que ella lo haga. | RF-12 | Dentro · condicionada (PA-6: no está decidido que cualquiera pueda hacerlo) |

### Notas sobre FS-118 (antes HU-7) y FS-142 (antes HU-8)

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

- **Independientes:** salvo HU-1, que ha de existir antes que las demás, ninguna exige otra. HU-4 a HU-6 trabajan sobre tareas ya creadas, y FS-142 sobre la lista de HU-2.
- **Negociables:** ninguna fija la pantalla ni el mecanismo; solo la acción y el beneficio.
- **Valiosas:** cada una responde a un job de la sección 2 del PRD. HU-9, HU-10, HU-11 y HU-12 aportan menos y por eso son condicionadas.
- **Estimables:** FS-118, FS-142 y HU-12 no lo son todavía por las decisiones pendientes que se indican arriba.
- **Pequeñas:** una acción cada una; editar y eliminar van separadas, y coger y soltar también.
- **Testables:** las dos primeras y HU-3 ya tienen verificación en RF-5 a RF-7. Para el resto se escriben criterios después.

## Criterios de aceptación — FS-118 «Fecha de vencimiento y tareas vencidas»

**Historia.** Como persona del equipo, quiero poner, cambiar y quitar una fecha de vencimiento opcional en una tarea, y ver cuáles se han pasado de plazo, para saber cuándo hay que tenerla y qué va con retraso.

**Cómo leerlos.** Cada criterio es una regla de negocio observable. La línea *Origen* dice si sale de un requisito firme del PRD, de un [SUPUESTO] del PRD o si es una **[PROPUESTA]** pendiente de revisión. Una propuesta no es un requisito hasta que se acepte.

**Estado del bloque.** Todo este bloque es propuesta mientras el PRD no tenga un RF para la fecha de vencimiento y no se cierren las preguntas abiertas 1 a 3, porque los criterios sobre «vencida» dependen de ellas.

### Camino feliz

**CA-1 · La fecha es opcional** — *Origen: PRD (RF-5, sin campos obligatorios)*
- DADO que creo una tarea con solo el título
- CUANDO la guardo
- ENTONCES la tarea existe sin fecha de vencimiento y no se me pide ninguna.

**CA-2 · Poner una fecha** — *[PROPUESTA]: extiende a la fecha lo que RF-8 pide para responsable y punto*
- DADO una tarea sin fecha en la lista
- CUANDO le pongo una fecha de vencimiento
- ENTONCES la tarea muestra esa fecha en la lista, sin abrir otra pantalla, y lo consigo en no más de dos clics.

**CA-3 · Cambiar la fecha** — *[PROPUESTA]*
- DADO una tarea con fecha de vencimiento
- CUANDO elijo otra fecha
- ENTONCES la lista muestra la fecha nueva en lugar de la anterior.

**CA-4 · Quitar la fecha** — *[PROPUESTA]*
- DADO una tarea con fecha de vencimiento
- CUANDO la quito
- ENTONCES la tarea queda sin fecha y deja de contar como vencida, si lo estaba.

**CA-5 · Cualquiera puede ponerla o cambiarla** — *[PROPUESTA]: extiende RF-12 (sin permisos por rol) a la fecha. Condicionada a PA-6. Quien cambia la fecha de una tarea ajena no deja rastro.*
- DADO una tarea que lleva otra persona
- CUANDO yo le cambio la fecha
- ENTONCES el cambio se aplica, sea o no mía la tarea.

**CA-6 · Los demás lo ven sin recargar** — *[PROPUESTA]: RF-14 cubre «edita» y se entiende que incluye la fecha. Condicionada a PA-3.*
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
- DADO que intento guardar una fecha que no existe, como un 31 de febrero, si la forma de elegirla lo permite
- CUANDO intento guardarla
- ENTONCES se me explica en castellano que la fecha no es válida y la tarea conserva la que tenía.

**CA-18 · Dos personas cambian la fecha a la vez** — *Origen: [SUPUESTO] del PRD (RNF-3: prevalece el cambio más reciente)*
- DADO que dos personas cambian la fecha de la misma tarea casi a la vez
- CUANDO ambas guardan
- ENTONCES las dos acaban viendo la misma fecha, la del cambio más reciente.

**CA-19 · Se elimina una tarea con fecha** — *[PROPUESTA]. Condicionada a PA-7.*
- DADO una tarea vencida
- CUANDO alguien la elimina
- ENTONCES desaparece de la lista y deja de contar como vencida para todas las personas.

**CA-20 · Sin conexión no se pierde un cambio en silencio** — *Origen: PRD (RF-15) para el aviso; [PROPUESTA] para que el cambio no se dé por guardado*
- DADO que pierdo la conexión con la lista abierta
- CUANDO intento cambiar una fecha
- ENTONCES veo el aviso de que la lista puede estar desactualizada y el cambio no se da por guardado hasta recuperar la conexión.

**CA-21 · Nadie recibe avisos por vencer** — *[PROPUESTA]: consecuencia de excluir las notificaciones push (RF-17)*
- DADO una tarea que vence o ha vencido
- CUANDO llega o pasa su fecha
- ENTONCES nadie recibe ningún aviso fuera de la lista; el único indicio es lo que se ve en ella.

**CA-22 · Se elimina la tarea mientras otra persona le cambia la fecha** — *[PROPUESTA]. Condicionada a PA-7; el PRD deja sin definir esta concurrencia (RNF-3).*
- DADO que una persona elimina una tarea y otra le cambia la fecha casi a la vez
- CUANDO ambas guardan
- ENTONCES la tarea queda eliminada para todas y nadie ve una tarea con la fecha nueva.

**CA-23 · Las tareas hechas ocultas no cuentan como vencidas** — *[PROPUESTA]. Condicionada a PA-7 (RF-13).*
- DADO una tarea hecha, con fecha pasada, que ya no está en la vista principal
- CUANDO miro la lista principal
- ENTONCES no aparece ni se cuenta como vencida; solo vuelve a hacerlo si se reabre (CA-10).

**CA-24 · «Vencida» es de la tarea, no una evaluación de la persona** — *[PROPUESTA], para no contradecir el rechazo a la vigilancia (sección 4 y PA-8)*
- DADO varias tareas vencidas de distintas personas
- CUANDO miro la lista
- ENTONCES no veo ningún recuento ni resumen de vencidas por persona.

### Preguntas abiertas para revisión

0. **Falta el requisito en el PRD (condiciona todo lo demás).** FS-118 sigue «Dentro · sin RF»: necesita un RF en E2 antes de construirse.

1. **¿De quién es el huso horario del «hoy»?** Con 3 husos horarios, «vencida» cambia de día en momentos distintos. Propongo una regla única para todo el espacio (CA-15), pero hay que decidir cuál.
2. **¿Se admite una fecha ya pasada?** CA-16 la acepta; la alternativa es impedirla. Decide si importa que se pueda poner por error.
3. **¿Desde qué momento es «vencida»?** CA-8 propone el día siguiente a la fecha. Hay que decidir si hace falta una hora de corte.
4. **¿Se muestra antes de vencer algo que indique que se acerca?** No lo he incluido: sería un aviso más y roza las notificaciones excluidas.
5. **¿Hay un filtro de «solo vencidas»?** No lo he incluido, para no colar un filtro nuevo; FS-142 filtra solo por estado.
6. **Cambio de horario de verano y viajes.** Una persona que viaja o un cambio de hora pueden mover el «hoy». Pendiente de decidir junto con la pregunta 1.

## Criterios de aceptación — FS-142 «Filtrar por estado»

**Historia.** Como persona del equipo, quiero filtrar la lista por estado, para centrarme en lo pendiente y decidir qué coger sin ruido.

**Vocabulario.** En el PRD el estado de una tarea se llama «punto» y sus opciones (por hacer, en curso, hecha) son un [SUPUESTO] (RF-10). Los criterios dicen «estado» y dependen de que esas opciones se confirmen.

**Cómo leerlos.** Igual que en FS-118: la línea *Origen* distingue requisito firme del PRD, [SUPUESTO] del PRD y **[PROPUESTA]** pendiente de revisión. FS-142 sigue «Dentro · sin RF»; el bloque es propuesta hasta que el PRD tenga un RF para el filtro y se cierren las preguntas abiertas.

### Camino feliz

**CA-1 · Ver solo un estado** — *[PROPUESTA]*
- DADO una lista con tareas en distintos estados
- CUANDO filtro por un estado, por ejemplo «por hacer»
- ENTONCES veo solo las tareas de ese estado y se ve qué filtro tengo aplicado.

**CA-2 · Centrarme en lo pendiente** — *[PROPUESTA]. Pregunta abierta 1.*
- DADO una lista con tareas por hacer, en curso y hechas
- CUANDO pido ver lo pendiente
- ENTONCES veo las que están por hacer y en curso, sin las hechas.

**CA-3 · Quitar el filtro** — *[PROPUESTA]*
- DADO que tengo un filtro aplicado
- CUANDO lo quito
- ENTONCES vuelvo a ver la lista completa de tareas.

**CA-4 · Se aplica sobre la lista ya abierta** — *[PROPUESTA], en línea con el espíritu de «dos clics» de RF-8*
- DADO la lista abierta
- CUANDO quiero filtrar
- ENTONCES lo hago en no más de dos clics, sin abrir otra pantalla.

**CA-5 · El filtro es solo mío** — *[PROPUESTA]*
- DADO que yo filtro la lista
- CUANDO otra persona la tiene abierta
- ENTONCES ella sigue viendo su lista como la tenía y mi filtro no le cambia nada.

### Resultados y mensajes

**CA-6 · Ningún estado vacío se confunde con un error** — *[PROPUESTA]*
- DADO que filtro por un estado en el que no hay ninguna tarea
- CUANDO miro la lista
- ENTONCES veo un mensaje que dice que no hay tareas en ese estado, distinto del que se muestra cuando todavía no hay ninguna tarea y distinto de un mensaje de error.

**CA-7 · Estado que no existe** — *[PROPUESTA]. Pedida expresamente: el sistema debe avisar, no mostrar una lista vacía.*
- DADO que se pide ver las tareas de un estado que no existe, por ejemplo desde un enlace antiguo o guardado
- CUANDO se intenta aplicar ese filtro
- ENTONCES se avisa en castellano de que ese estado no existe, se indican los estados disponibles y no se muestra una lista vacía como si no hubiera tareas.

**CA-8 · Varios estados, uno de ellos inexistente** — *[PROPUESTA]*
- DADO que se piden dos estados y uno no existe
- CUANDO se intenta aplicar el filtro
- ENTONCES se avisa del estado que no existe y no se aplica un filtro parcial sin decirlo.

**CA-9 · El aviso no borra lo que ya veía** — *[PROPUESTA]*
- DADO que tenía un filtro válido aplicado
- CUANDO pido uno que no existe
- ENTONCES se me avisa del error y sigo viendo el filtro válido anterior.

### Cambios mientras filtro

**CA-10 · Los cambios de otras personas respetan mi filtro** — *Origen: PRD (RF-14, condicionada a PA-3) para que se vea sin recargar; [PROPUESTA] para la regla del filtro*
- DADO que tengo filtrada la lista y otra persona cambia una tarea
- CUANDO el cambio hace que la tarea encaje o deje de encajar en mi filtro
- ENTONCES aparece o desaparece de mi vista sin recargar ni preguntar.

**CA-11 · Cambio de estado de una tarea mía con el filtro puesto** — *[PROPUESTA]. Pregunta abierta 2.*
- DADO que filtro por «por hacer» y paso una de esas tareas a «en curso»
- CUANDO lo hago
- ENTONCES la tarea sale de mi vista filtrada y no se pierde: sigue en la lista completa.

**CA-12 · Creo una tarea que mi filtro no muestra** — *[PROPUESTA]*
- DADO que tengo un filtro que no incluye el estado con el que nace una tarea
- CUANDO creo una tarea
- ENTONCES se me indica que se ha creado aunque mi filtro no la muestre, para que no parezca que ha fallado.

**CA-13 · Sin conexión** — *Origen: PRD (RF-15)*
- DADO que tengo un filtro aplicado y pierdo la conexión
- CUANDO miro la lista
- ENTONCES veo el aviso de que la lista puede estar desactualizada, y al recuperarla se actualiza sin acción manual.

### Relación con otras reglas

**CA-14 · Las hechas ocultas siguen accesibles** — *[PROPUESTA]. Condicionada a PA-7 (RF-13, [SUPUESTO]).*
- DADO que las tareas hechas no aparecen en la vista principal
- CUANDO filtro por «hecha»
- ENTONCES veo esas tareas.

**CA-15 · El filtro no cambia lo libre ni lo cogido** — *[PROPUESTA]*
- DADO una lista filtrada
- CUANDO la miro
- ENTONCES las tareas libres y las cogidas se siguen distinguiendo igual que sin filtro (RF-7).

**CA-16 · Filtrar no modifica las tareas** — *[PROPUESTA]*
- DADO cualquier filtro
- CUANDO lo aplico o lo quito
- ENTONCES ninguna tarea cambia de estado, responsable ni título.

### Preguntas abiertas para revisión

0. **Falta el requisito en el PRD (condiciona todo lo demás).** FS-142 sigue «Dentro · sin RF»: necesita un RF en E2 antes de construirse.
1. **¿«Pendiente» es un filtro propio o se eligen varios estados?** CA-2 asume «por hacer» y «en curso» juntos. Decide si se puede elegir más de un estado y si «pendiente» es una opción con nombre.
2. **¿Qué pasa con una tarea que cambia de estado y deja de encajar en el filtro?** CA-11 propone que salga de la vista al instante. La alternativa es que se mantenga hasta que quite el filtro, para no desorientar.
3. **¿Se conserva el filtro al recargar o al volver otro día?** No hay criterio. Si no se conserva, cada mañana empieza con la lista completa.
4. **¿Qué filtro ve una persona nueva al abrir la lista?** Se propone la lista completa, sin filtro.
5. **Fuera de este filtro:** filtrar por persona («mis tareas»), por fecha o por vencidas. No se incluyen; el PRD no los recoge y «mis tareas» roza la vigilancia (sección 4).
6. **Tensión con «una sola lista».** El job de la sección 2 habla de mirar una sola lista. Hay que decidir si un filtro la fragmenta o si basta con que sea un aviso claro de qué se está viendo.
