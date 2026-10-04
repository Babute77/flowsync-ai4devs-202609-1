# FS-142 · Filtrar por estado

**Identificador:** FS-142  
**Épica:** E2 «Gestión de tareas»

## Historia

Como persona del equipo, quiero filtrar la lista por estado, para centrarme en lo pendiente y decidir qué coger sin ruido.

## Criterios de aceptación

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
- ENTONCES vuelvo a ver la lista tal como se ve sin filtro. Si las tareas hechas están fuera de la vista principal (RF-13), siguen fuera. Pregunta abierta 7.

**CA-4 · Se aplica sobre la lista ya abierta** — *[PROPUESTA], en línea con el espíritu de «dos clics» de RF-8*
- DADO la lista abierta
- CUANDO quiero filtrar
- ENTONCES lo hago en no más de dos clics, sin abrir otra pantalla.

**CA-5 · El filtro es solo mío** — *[PROPUESTA]*
- DADO que yo filtro la lista
- CUANDO otra persona la tiene abierta
- ENTONCES ella sigue viendo su lista como la tenía y mi filtro no le cambia nada.

### Resultados y mensajes

**CA-6 · Un estado sin tareas no se confunde con un error** — *[PROPUESTA]; el mensaje está en castellano (RNF-5)*
- DADO que filtro por un estado en el que no hay ninguna tarea
- CUANDO miro la lista
- ENTONCES veo un mensaje que dice que no hay tareas en ese estado, distinto del que se muestra cuando todavía no hay ninguna tarea y distinto de un mensaje de error.

**CA-7 · Estado que no existe** — *Origen: encargo del equipo (no del PRD): el sistema debe avisar del error, no mostrar una lista vacía. Es [PROPUESTA] solo que se indiquen los estados disponibles. El caso puede darse con un enlace guardado o si las opciones de estado cambian (RF-10); con opciones cerradas y sin enlaces sería hipotético.*
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

**CA-13 · Sin conexión** — *Origen: PRD (RF-15) para el aviso y la actualización; [PROPUESTA] para lo que ocurre con el filtro al reconectar*
- DADO que tengo un filtro aplicado y pierdo la conexión
- CUANDO miro la lista
- ENTONCES veo el aviso de que la lista puede estar desactualizada, y al recuperarla se actualiza sin acción manual y mi filtro sigue aplicado.

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

## Decisiones pendientes que afectan a estos criterios

0. **Falta el requisito en el PRD (condiciona todo lo demás).** FS-142 sigue «Dentro · sin RF»: necesita un RF en E2 antes de construirse.
1. **¿«Pendiente» es un filtro propio o se eligen varios estados?** CA-2 asume «por hacer» y «en curso» juntos. Decide si se puede elegir más de un estado y si «pendiente» es una opción con nombre.
2. **¿Qué pasa con una tarea que cambia de estado y deja de encajar en el filtro?** CA-11 propone que salga de la vista al instante. La alternativa es que se mantenga hasta que quite el filtro, para no desorientar.
3. **¿Se conserva el filtro al recargar o al volver otro día?** No hay criterio. Si no se conserva, cada mañana empieza con la lista completa.
4. **¿Qué filtro ve una persona nueva al abrir la lista?** Se propone la lista completa, sin filtro.
5. **Fuera de este filtro:** filtrar por persona («mis tareas»), por fecha o por vencidas. No se incluyen; el PRD no los recoge y «mis tareas» roza la vigilancia (sección 4).
6. **Tensión con «una sola lista».** El job de la sección 2 habla de mirar una sola lista. Hay que decidir si un filtro la fragmenta o si basta con que sea un aviso claro de qué se está viendo.
7. **Relación con RF-13.** Si las hechas ya salen de la vista principal, quitar el filtro no devuelve «todas» y el filtro «pendiente» solapa con esa vista. Hay que decidir qué es la lista completa y si FS-142 aporta algo más que RF-13.
