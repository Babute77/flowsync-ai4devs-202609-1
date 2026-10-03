# PRD — FlowSync MVP

> Idea original: «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

## Propuesta

FlowSync es una **lista de tareas compartida de un único espacio, donde cada tarea muestra en qué punto está y quién la lleva, y donde los cambios de los demás aparecen sin refrescar**. Su objetivo es que dos personas no empiecen lo mismo sin saberlo y que nadie tenga que preguntar «¿en qué estás?».

## Problema

Hoy el equipo no puede ver qué está en marcha sin interrumpir a alguien o esperar a la daily. Lo que duele:

- La ronda de «¿en qué estás?» de la daily, que se come la mitad de los 15 minutos.
- El «¿en qué estás?» constante por Slack o chat.
- Descubrir tarde que dos personas iban a lo mismo.

**Episodio concreto:** dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.

## Usuario

- **Quién cobra el valor:** los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a quien descubre tarde que iba a lo mismo y a quien interrumpe para preguntar.
- **Equipos:** remotos y pequeños, de 3 a 10 personas, con roles planos. En el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
- **Primer usuario (caso de estudio):** equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. **Es un caso de estudio, no un cliente real.**

## Qué decisión cambia

1. No empezar algo que otra persona ya está tocando.
2. Elegir lo siguiente sabiendo qué está libre.

Si la única respuesta fuera «sentirse informado», el tiempo real no valdría lo que cuesta.

## Por qué se sostiene

- Actualizar son dos clics sobre una lista ya abierta, sin campos obligatorios y sin decidir sprint ni estimación.
- Quien actualiza cobra en el momento: esa lista es su cola de trabajo, la mira para decidir qué coge y deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no la actualizaría.
- El estado lo teclea la persona que hace la tarea, en segundos.

## Alcance del MVP

1. Crear tareas en FlowSync. Es donde se hace el trabajo, no donde se cuenta: **sustituye al gestor de tareas, no convive con él**.
2. Cada tarea muestra quién la lleva y en qué punto está, con muy pocas opciones y sin campos obligatorios.
3. Cambiar eso en dos clics sobre la lista ya abierta.
4. Ver qué está libre y qué está cogido.
5. Ver lo que se ha movido desde la última vez que miré: **resumen que espera, no aviso que interrumpe**. El caso es llegar por la mañana o volver de una reunión y ver qué ha cambiado.
6. Ver los cambios de los demás sin refrescar ni preguntar.
7. Un único espacio compartido; todos ven y editan lo mismo.

### Qué significa «tiempo real»

Ver los cambios de estado de las tareas sin refrescar ni preguntar. Es **frescura, no presencia**: el estado es de la tarea, no de la persona.

No es chat, ni videollamada, ni colaboración simultánea sobre el mismo documento.

## Fuera del MVP

Por decisión, no por falta de tiempo:

- **Presencia:** «quién está conectado ahora» e indicadores de actividad. Es vigilancia y se rechaza a propósito.
- **Notificaciones push.**
- **Estado derivado de señales externas** (Git/PRs, CI, calendario) y cualquier integración u OAuth de terceros. Es otro producto.
- **Convivir con otro gestor** o importar tareas de él: obligaría a actualizar dos veces, que es como muere esta categoría.
- **Sprints, estimaciones, épicas, backlog priorizado e informes.** Un equipo que necesite eso no es nuestro usuario.
- **Varios equipos**, gente en más de un equipo y la entidad «equipo». Se anota como supuesto, no se construye.
- **Bloqueos.** La daily conserva esa parte y el MVP no la resuelve.

## Qué reunión desaparece

La daily **no desaparece entera**. Desaparece la ronda de «¿en qué estás?». La parte de bloqueos sigue.

## Riesgos y supuestos

De más a menos grave:

1. **Información vieja (riesgo nº 1).** Si el estado se queda desactualizado, el producto pierde el sentido y es peor que preguntar, porque da falsa seguridad. Se asume y se valida desde la primera semana. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
2. **Sustituir al gestor es la apuesta más cara.** Pedir que se abandone la herramienta actual es más difícil que pedir que se pruebe una complementaria. Se decide sustituir por evitar la doble actualización. El coste de migrar queda sin resolver.
3. **El episodio puede no resolverse.** Evita el choque solo si las tareas se describen con el detalle suficiente para que se note que dos tocan lo mismo. El producto no sabe de módulos: es un supuesto de conducta del equipo, no una función.
4. **Tensión entre «tiempo real» y «resumen que espera».** Para volver de una reunión y ver qué se movió, el tiempo real aporta poco. Solo se justifica por la decisión de no empezar algo que otro ya está tocando. Esa decisión es la que debe defender el coste.
5. **Reclamar y liberar tareas.** Si la lista es la cola de trabajo, alguien coge una tarea. Queda por decidir qué pasa con una tarea cogida que nadie toca durante días, porque es otra forma de información vieja.
6. **Acceso al espacio único.** Con un solo espacio, falta decidir quién puede entrar. Hoy cualquiera puede registrarse. Supuesto provisional: el espacio es de una sola instalación y se entra por invitación.

## Cómo sabremos que funciona

- **Señal principal:** en el caso de estudio, la ronda de «¿en qué estás?» desaparece de la daily, que se queda con los bloqueos, y baja el «¿cómo vas?» por chat.
- **Señal de salud:** las tareas en curso reflejan lo que la gente hace de verdad. Se comprueba preguntando a una muestra de personas.
- **Señal de fracaso:** vuelven a preguntar por chat porque no se fían de la lista.

## Punto de partida técnico

Existen registro, login y perfil. Eso cubre solo identidad. Todo lo que hace de FlowSync un producto está por construir: tareas, estado compartido, resumen de cambios y actualización sin refrescar.

Primer corte útil: tareas con responsable y estado visibles para todos. El tiempo real y el resumen de cambios vienen después y se validan por separado.
