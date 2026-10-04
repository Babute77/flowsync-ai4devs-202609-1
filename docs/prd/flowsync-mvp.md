# PRD — FlowSync MVP

Base: [`alcance-mvp.md`](alcance-mvp.md). Este documento es de producto: no define modelo de datos, endpoints, arquitectura ni diagramas. Todo lo que no está respaldado por el alcance consensuado ni por el estado del repo se marca como **[SUPUESTO]**.

## 1. Problema y contexto

Los equipos remotos no pueden saber en qué trabaja cada persona sin interrumpir a alguien o esperar a la daily.

- La ronda de «¿en qué estás?» ocupa una parte importante de la daily de 15 minutos. [SUPUESTO] «la mitad», según el caso de estudio; no es un dato medido.
- El «¿en qué estás?» por Slack o chat interrumpe a quien está trabajando.
- Se descubre tarde que dos personas iban a lo mismo. Episodio concreto: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera, con dos días perdidos.

**Contexto.** El primer usuario es un caso de estudio, no un cliente real: un equipo de 6 personas de producto SaaS en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada.

**Lo que este MVP no resuelve.** La daily no desaparece entera: desaparece la ronda de «¿en qué estás?». La parte de bloqueos sigue fuera de FlowSync.

## 2. Usuarios y jobs-to-be-done

**Usuario:** las personas de un equipo remoto de 3 a 10 integrantes, con roles planos. No hay lead ni manager como usuario objetivo. Quien necesite sprints, estimaciones, épicas, backlog priorizado o informes no es nuestro usuario.

| Cuando… | Quiero… | Para… |
|---|---|---|
| voy a coger una tarea | ver qué está libre y qué ya lleva otra persona | no empezar algo que alguien ya está tocando |
| acabo algo y elijo lo siguiente | mirar una sola lista | decidir sin preguntar a nadie |
| empiezo o termino una tarea | dejarlo reflejado en dos clics | que nadie me pregunte cómo voy |
| llego por la mañana o vuelvo de una reunión | abrir la lista y verla al día | saber qué hay sin esperar a la daily |

[SUPUESTO] Estos jobs salen del caso de estudio y del alcance, no de entrevistas a usuarios reales.

## 3. Propuesta de valor

Una única lista de tareas compartida, ya abierta, que dice quién lleva qué y cuyos cambios ven todos al instante, sin refrescar. Actualizarla cuesta dos clics, sin campos obligatorios y sin decidir sprint ni estimación.

**La decisión que cambia:** no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera «sentirse informado», el tiempo real no valdría lo que cuesta.

**Por qué se sostiene:** quien actualiza cobra en el momento. La lista es su cola de trabajo y deja de recibir interrupciones preguntándole cómo va. [SUPUESTO] Todos usan la lista para decidir qué coger; si no, el beneficio recae solo en los demás y la lista se queda vieja.

## 4. Alcance y fuera de alcance

### Dentro

1. Crear tareas en FlowSync, que sustituye al gestor actual en lugar de convivir con él.
2. Cada tarea dice quién la lleva y en qué punto está, con muy pocas opciones y sin campos obligatorios.
3. Cambiarlo en dos clics sobre la lista ya abierta.
4. Ver los cambios de los demás sin refrescar ni preguntar.
5. Un único espacio compartido donde todos ven y editan lo mismo.

«Tiempo real» significa frescura de la lista, no presencia: el estado es de la tarea, no de la persona. No es chat, videollamada ni edición simultánea de un documento.

### Fuera

| Fuera | Por qué |
|---|---|
| Resumen de «qué se ha movido» | Es una comodidad, no la decisión. Si la lista está al día, al abrirla ya se ve el estado. Se añade si el equipo lo pide. |
| Notificaciones push | Un aviso interrumpe, y justo eso queremos evitar. |
| Presencia («quién está conectado») e indicadores de actividad de las personas | Es vigilancia y no cambia ninguna decisión. Rechazado a propósito. |
| Estado derivado de Git/PRs, CI o calendario; integraciones u OAuth de terceros | Es otro producto. Primero se valida que la gente mantiene el estado a mano. |
| Convivir con otro gestor o importar sus tareas | Obliga a la doble actualización, que es como muere esta categoría. |
| Sprints, estimaciones, épicas, backlog priorizado e informes | Quien los necesita no es nuestro usuario. |
| Varios equipos, gente en más de un equipo y la entidad «equipo» | Un único espacio basta para validar. |
| Permisos por rol | Los roles son planos y los permisos añaden fricción. |
| Bloqueos | La daily conserva esa parte. |
| Chat, videollamada y edición simultánea | Es otro producto. |

## 5. Épicas del MVP

- **E1 · Cuentas y acceso:** quién puede entrar al espacio compartido y mantener su sesión.
- **E2 · Gestión de tareas:** crear tareas, ver quién lleva cada una y en qué punto está, y cambiarlo en dos clics.
- **E3 · Actividad del equipo:** ver los cambios de los demás en la lista sin refrescar ni preguntar.

## 6. Requisitos funcionales

### E1 · Cuentas y acceso

- **RF-1.** Una persona puede crear su cuenta, iniciar sesión y cerrarla.
- **RF-2.** Solo las personas con sesión iniciada pueden ver o modificar tareas.
- **RF-3.** [SUPUESTO] Solo pueden entrar al espacio las personas invitadas, no cualquiera que se registre. Hoy el registro es abierto; esta regla está pendiente de decidir antes de abrirlo a un equipo real.
- **RF-4.** [SUPUESTO] Cada persona se identifica por su nombre dentro del espacio, para que se sepa quién lleva cada tarea.
- **RF-4b.** Si una persona recarga o vuelve a abrir FlowSync, sigue dentro sin volver a identificarse. Solo sale cuando cierra sesión. [SUPUESTO] Si la sesión caduca, se avisa y se pide volver a entrar sin perder lo que se estaba haciendo.

### E2 · Gestión de tareas

- **RF-5.** Cualquier persona puede crear una tarea indicando solo un título. No hay otros campos obligatorios. [SUPUESTO] Evitar el choque del episodio depende de que el equipo describa las tareas con detalle suficiente; es conducta del equipo, no una función, y un título mínimo no lo garantiza.
- **RF-6.** La lista muestra, para cada tarea, su título, quién la lleva y en qué punto está.
- **RF-7.** Una tarea puede no tener responsable. La lista presenta las tareas libres y las cogidas con una diferencia visible sin abrir ninguna tarea. Se verifica mostrando la lista a una persona nueva, que debe señalar cuáles están libres sin ayuda.
- **RF-8.** Cualquier persona puede asignarse una tarea libre, dejarla libre de nuevo o cambiar su punto, en no más de dos clics desde la lista abierta, sin abrir otra pantalla.
- **RF-9.** [SUPUESTO] Una tarea tiene un único responsable a la vez.
- **RF-10.** [SUPUESTO] El punto de una tarea se elige entre tres opciones: por hacer, en curso y hecha.
- **RF-8b.** El punto y el responsable los cambia la persona que hace la tarea, en segundos; no se derivan de ninguna otra fuente.
- **RF-11.** [SUPUESTO] Cualquier persona puede editar el título de una tarea y eliminarla.
- **RF-12.** Todas las personas ven las mismas tareas y pueden modificar cualquiera, sin permisos por rol.
- **RF-13.** [SUPUESTO] Las tareas hechas dejan de ocupar la vista principal, pero siguen accesibles. Falta decidir cuánto tiempo.

### E3 · Actividad del equipo

- **RF-14.** Cuando alguien crea, edita, asigna, cambia de punto o elimina una tarea, el resto de personas con la lista abierta ven el cambio sin tener que recargar ni preguntar.
- **RF-15.** Si una persona pierde la conexión mientras tiene la lista abierta, aparece un aviso visible de que la lista puede estar desactualizada. Al recuperarla, el aviso desaparece y la lista queda al día sin acción manual.
- **RF-16.** *Retirado.* Mostrar cuándo se modificó por última vez cada tarea es un indicador de actividad, y el fuera de alcance los excluye; el PRD no puede pedirlo y prohibirlo a la vez. Consecuencia declarada: dentro de la lista no hay ningún medio para saber si un estado está viejo. Solo se descubre preguntando a las personas (métrica 3 de la sección 9), y esa comprobación depende de lo que cada una declare.
- **RF-17.** FlowSync no muestra una indicación de si una persona está conectada y no envía notificaciones push. Se verifica revisando que ninguna pantalla muestra ese dato y que FlowSync no envía avisos fuera de la lista.

## 7. Requisitos no funcionales

- **RNF-1. Rapidez de la edición.** Cambiar el punto o el responsable de una tarea no exige rellenar ningún campo ni confirmar en un paso adicional. Se verifica contando clics.
- **RNF-2. Frescura.** El cambio de una persona aparece en las pantallas abiertas de las demás en un tiempo que no obliga a nadie a refrescar. [SUPUESTO] Objetivo inicial: pocos segundos; la cifra se fija al diseñar.
- **RNF-3. Consistencia.** Si dos personas cambian la misma tarea a la vez, ambas acaban viendo el mismo resultado. [SUPUESTO] Se acepta que prevalezca el cambio más reciente.
- **RNF-4. Privacidad.** Solo las personas del espacio ven sus tareas. Los datos de acceso de una persona no los ve nadie más.
- **RNF-5. [SUPUESTO] Idioma.** Todo lo que ve la persona, incluidos los errores, está en castellano.
- **RNF-6. Escala.** El MVP funciona con 3 a 10 personas. [SUPUESTO] Una lista de decenas de tareas sigue siendo legible; no se promete más.
- **RNF-7. Usabilidad.** Sin formación previa, una persona nueva crea una tarea y se la asigna la primera vez que abre la lista. Se verifica con una prueba con personas del caso de estudio.

## 8. Restricciones

- **Stack actual:** backend AdonisJS 7 y frontend React 19. El MVP se construye sobre ellos.
- **Auth ya existe:** registro, inicio y cierre de sesión y perfil. Cubre solo identidad; las tareas, el estado compartido y la actualización sin refrescar están por construir.
- **Registro abierto hoy:** la regla de acceso de RF-3 no está implementada.
- **Un único espacio:** no hay entidad de equipo, de modo que no se puede separar a personas en grupos.
- **Sustituir, no convivir:** no se importan tareas de otro gestor. El coste de migrar queda sin resolver: qué pasa el primer día con las tareas en curso del gestor anterior es una decisión pendiente.
- **Caso de estudio:** no es un cliente real, por lo que las hipótesis no se contrastan con un equipo que haya aceptado usarlo.

## 9. Métricas de éxito

Todos los umbrales son **[SUPUESTO]**: se fijan con el equipo del caso de estudio antes de empezar a medir.

| Métrica | Cómo se mide | Éxito | Fracaso |
|---|---|---|---|
| La ronda de «¿en qué estás?» desaparece de la daily | Observación de las dailys del caso de estudio durante las primeras semanas | La ronda deja de hacerse y la daily se centra en bloqueos | La ronda sigue haciéndose igual |
| Baja el «¿cómo vas?» por chat | Recuento de esos mensajes antes y después, por una persona del equipo | Descenso claro respecto a la línea base | Se mantiene o vuelve a subir |
| La lista está al día (riesgo nº 1) | Cada semana, se pregunta a una muestra de personas si lo que pone la lista de sus tareas es cierto | La gran mayoría de tareas en curso coincide con lo que la persona hace | Hay tareas en curso que nadie está tocando |
| No hay trabajo duplicado | El equipo anota los casos de dos personas en lo mismo | Ningún caso en el periodo | Se repite un caso como el del episodio |
| Se sustituye al gestor anterior | Pregunta directa al equipo | Dejan de usar el gestor previo para tareas nuevas | Siguen actualizando los dos |

**Señal de fracaso global:** vuelven a preguntar por chat porque no se fían de la lista.

**Decisión asociada [SUPUESTO]:** si la lista se queda vieja desde la primera semana, se revisa si actualizar cuesta de verdad dos clics antes de añadir funciones; no se añaden avisos para forzar el hábito.

## 10. Puntos abiertos

Salen de la revisión adversarial del PR. No se resuelven en este documento: cada uno lleva el argumento resumido y lo que haría falta para decidirlo. Los dos primeros bloques son decisiones de producto; el tercero se puede cerrar durante la construcción.

Resuelto en el propio documento: RF-16 se retiró porque contradecía el fuera de alcance (ver sección 6).

### Decisiones de producto

- **PA-1 · Quién mantiene la lista al día.** Todo el valor depende de que cada persona actualice a mano y sin obligación; con una sola persona que no lo haga, la lista miente. Hace falta un piloto corto con el equipo para medir qué proporción de tareas se mantiene al día, y decidir después si hace falta alguna palanca sobre el hábito (hoy no hay ninguna: sin avisos y sin obligar).
- **PA-2 · Nivel de detalle de las tareas frente al episodio.** El choque fue «dos personas en el mismo módulo» y una tarea con solo título no dice qué módulo toca. Hace falta reconstruir el episodio con tareas reales del equipo y ver si la lista lo habría evitado, y decidir si basta con la conducta del equipo o si la tarea necesita indicar algo más.
- **PA-3 · Si el tiempo real entra en el MVP (E3).** Con 3 husos horarios casi nadie tiene la lista abierta a la vez; puede importar más que el estado guardado sea fiable al abrirla que verlo cambiar en vivo. Hace falta saber cuántas horas de solape tiene el equipo y probar una lista que se actualiza solo al recargar.
- **PA-4 · Abandono del gestor anterior y primer día.** Sin importar tareas, el equipo debe decidir qué hace con lo que tiene en curso. Si siguen actualizando los dos, FlowSync pasa a ser la segunda fuente. Hace falta un acuerdo explícito del equipo y un plan para el día 1.
- **PA-5 · Regla de acceso (RF-3).** Hoy el registro es abierto y RF-2 y RNF-4 prometen privacidad. Decidir quién entra (invitación, enlace, lista cerrada) y quién invita, porque eso introduce un rol que choca con los roles planos. Hace falta decidir también si un equipo real puede abrir el producto antes de que esto esté resuelto.
- **PA-6 · Quién puede cambiar las tareas de otra persona (RF-8, RF-9, RF-12).** Si cualquiera puede soltar o reasignar, «quién la lleva» deja de ser fiable y no queda rastro. Hace falta preguntar al equipo si lo acepta y qué esperaría ver cuando alguien le quita una tarea.
- **PA-7 · Qué se queda en el MVP entre los requisitos añadidos.** Editar y eliminar (RF-11), ocultar las hechas pero mantenerlas accesibles (RF-13), sesión caducada sin perder trabajo (RF-4b), re-sincronizar tras perder la conexión (RF-15) y mostrar el nombre (RF-4) no vienen del alcance consensuado. Hace falta un criterio de necesidad por cada job de la sección 2 para decidir cuáles cuentan.
- **PA-8 · Marca de última modificación (antes RF-16).** Ayudaría a detectar estados viejos, pero es un indicador de actividad. Hace falta decidir si la exclusión admite una marca de la tarea que no identifique a la persona.
- **PA-9 · Nombre de la épica E3.** «Actividad del equipo» promete justo lo que se excluye. Decidir si se renombra y a qué.
- **PA-10 · Qué cuenta como «dos clics» (RF-8).** Cogerse una tarea y marcarla en curso son dos acciones. Hace falta acordar un recorrido concreto y qué se considera fallo.
- **PA-11 · Estado inicial de una tarea nueva (RF-5, RF-7, RF-10).** Define qué es «libre». Hace falta decidir con qué responsable y en qué punto nace una tarea.
- **PA-12 · Métricas de éxito (sección 9).** Faltan línea base previa, quién fija los umbrales y cuándo, y una medida de adopción tomada desde el producto (por ejemplo, proporción de tareas con responsable). Las actuales dependen de la observación y de lo que declaren las personas, y con 6 personas el ruido es alto. Hace falta recoger una o dos semanas de línea base antes de entregar nada.

### Subsanables durante la construcción

- **RF-7.** Falta el umbral de aprobado y el tamaño de la lista de la prueba.
- **RF-13.** Falta cuánto tiempo siguen visibles las tareas hechas.
- **RF-14 y RNF-2.** Falta la cifra de frescura; mientras tanto, la sección 3 dice «al instante» y RNF-2 solo promete unos segundos. Se alinean al fijar la cifra.
- **RF-15.** Faltan el tiempo sin conexión tras el que aparece el aviso y el tiempo de resincronización.
- **RF-17.** «Avisos fuera de la lista» es ambiguo respecto al aviso de sesión caducada de RF-4b.
- **RNF-3.** Falta definir qué pasa con una edición concurrente tras un borrado.
- **RNF-6 y RNF-7.** «Legible» y «la primera vez» no tienen medida; se concretan al preparar la prueba con el caso de estudio.
