# FS-118 · Fecha de vencimiento y tareas vencidas

**Identificador:** FS-118  
**Épica:** E2 «Gestión de tareas»

## Historia

Como persona del equipo, quiero poner, cambiar y quitar una fecha de vencimiento opcional en una tarea, y ver cuáles se han pasado de plazo, para saber cuándo hay que tenerla y qué va con retraso.

## Criterios de aceptación

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

## Decisiones pendientes que afectan a estos criterios

0. **Falta el requisito en el PRD (condiciona todo lo demás).** FS-118 sigue «Dentro · sin RF»: necesita un RF en E2 antes de construirse.

1. **¿De quién es el huso horario del «hoy»?** Con 3 husos horarios, «vencida» cambia de día en momentos distintos. Propongo una regla única para todo el espacio (CA-15), pero hay que decidir cuál.
2. **¿Se admite una fecha ya pasada?** CA-16 la acepta; la alternativa es impedirla. Decide si importa que se pueda poner por error.
3. **¿Desde qué momento es «vencida»?** CA-8 propone el día siguiente a la fecha. Hay que decidir si hace falta una hora de corte.
4. **¿Se muestra antes de vencer algo que indique que se acerca?** No lo he incluido: sería un aviso más y roza las notificaciones excluidas.
5. **¿Hay un filtro de «solo vencidas»?** No lo he incluido, para no colar un filtro nuevo; FS-142 filtra solo por estado.
6. **Cambio de horario de verano y viajes.** Una persona que viaja o un cambio de hora pueden mover el «hoy». Pendiente de decidir junto con la pregunta 1.
