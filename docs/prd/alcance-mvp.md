# Alcance del MVP de FlowSync

Alcance consensuado, base del PRD. Se queda en producto: no fija modelo de datos, estados internos, endpoints ni latencias, que se deciden más adelante.

## 1. Problema

Los equipos remotos no pueden saber en qué trabaja cada persona sin interrumpir a alguien o esperar a la daily.

- La ronda de «¿en qué estás?» se come la mitad de los 15 minutos de la daily.
- El «¿en qué estás?» constante por Slack o chat interrumpe a quien trabaja.
- Se descubre tarde que dos personas iban a lo mismo. **Episodio concreto:** dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.

La daily **no desaparece entera**: desaparece la ronda de «¿en qué estás?». La parte de bloqueos sigue y este MVP no la resuelve.

## 2. Usuarios

- **Quién cobra el valor:** los pares de un equipo remoto, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a quien descubre tarde que iba a lo mismo y a quien interrumpe para preguntar.
- **Equipos:** pequeños, de 3 a 10 personas. Roles planos: todos ven y editan lo mismo, sin jerarquía de permisos.
- **Caso de estudio:** equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. **Es un caso de estudio, no un cliente real.**
- **Quién no es usuario:** el equipo que necesita sprints, estimaciones, épicas, backlog priorizado o informes.

## 3. Propuesta de valor

Una única lista de tareas compartida, ya abierta, que dice quién lleva qué y cuyos cambios ven todos al instante, sin refrescar. Actualizarla cuesta dos clics, sin campos obligatorios y sin decidir sprint ni estimación.

**La decisión que cambia:** no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera «sentirse informado», el tiempo real no valdría lo que cuesta.

**Por qué se sostiene:** quien actualiza cobra en el momento. Esa misma lista es su cola de trabajo, la mira para decidir qué coge y deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no la actualizaría.

## 4. Alcance (dentro)

1. **Crear tareas en FlowSync.** Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no convive con él.
2. **Cada tarea dice quién la lleva y en qué punto está.** Muy pocas opciones y sin campos obligatorios.
3. **Cambiarlo en dos clics sobre la lista ya abierta.**
4. **Ver los cambios de los demás sin refrescar ni preguntar.**

Todo ocurre en un único espacio compartido, donde todos ven y editan lo mismo.

**Qué significa «tiempo real»:** frescura de la lista, no presencia. El estado es de la tarea, no de la persona. No es chat, ni videollamada, ni edición simultánea de un documento.

**Qué estado:** lo teclea la persona que hace la tarea, en segundos.

**Supuestos a validar:**

- **Información vieja (riesgo nº 1).** Si el estado se queda desactualizado, el producto pierde el sentido y es peor que preguntar. Se asume y se valida desde la primera semana. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- **Sustituir al gestor es la apuesta más cara.** Se decide así por evitar la doble actualización. El coste de migrar queda sin resolver.
- **Acceso al espacio único.** Hoy el registro es abierto, así que cualquiera que se registre vería y editaría todo. Supuesto provisional: espacio de una sola instalación con gente invitada. Es una decisión pendiente antes de abrirlo a un equipo real.
- **Descripción de las tareas.** Evitar el choque del episodio depende de que las tareas se describan con el detalle suficiente para notar que dos tocan lo mismo. Es conducta del equipo, no una función.

**Cómo sabremos que funciona:** en el caso de estudio desaparece la ronda de «¿en qué estás?» de la daily y baja el «¿cómo vas?» por chat. Es señal de fracaso que vuelvan a preguntar por chat porque no se fían de la lista.

## 5. NO-alcance (fuera) y por qué

| Fuera | Por qué |
|---|---|
| Resumen de «qué se ha movido» | Es una comodidad, no la decisión. Si la lista está al día, al abrirla ya se ve el estado. Se añade si el equipo lo pide. |
| Notificaciones push | Un aviso interrumpe, y justo eso queremos evitar. |
| Presencia («quién está conectado») e indicadores de actividad | Es vigilancia y no cambia ninguna decisión. Rechazado a propósito. |
| Estado derivado de Git/PRs, CI o calendario, e integraciones u OAuth de terceros | Es otro producto. Primero se valida que la gente mantiene el estado a mano. |
| Convivir con otro gestor o importar sus tareas | Obliga a la doble actualización, que es como muere esta categoría. |
| Sprints, estimaciones, épicas, backlog priorizado e informes | Quien los necesita no es nuestro usuario, y estorban a los dos clics. |
| Varios equipos, gente en más de un equipo y la entidad «equipo» | Un único espacio basta para validar. Se anota como supuesto, no se construye. |
| Permisos por rol | Los roles son planos, y los permisos añaden fricción sin resolver el problema. |
| Bloqueos | La daily conserva esa parte. Prometerlo sobrevendería el MVP. |
| Chat, videollamada y edición simultánea | Es otro producto. |
