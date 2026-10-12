# Spec Delta

## Purpose

Lista única y compartida de las tareas del equipo: cualquier persona con sesión las ve todas, crea una con solo el título y cambia el estado de cualquiera desde la propia lista.

## ADDED Requirements

### Requirement: Operaciones de la API de tareas

El sistema SHALL ofrecer exactamente tres operaciones sobre tareas, todas exigiendo sesión: listar todas las tareas, crear una y actualizarla. No SHALL existir lectura individual de una tarea, borrado ni operaciones de equipo.

#### Scenario: Sin sesión no hay acceso

- **WHEN** se invoca cualquiera de las tres operaciones sin token válido
- **THEN** la respuesta es un 401 y no se devuelve ni se modifica ninguna tarea

#### Scenario: Operaciones inexistentes

- **WHEN** se intenta leer una tarea individual o borrarla
- **THEN** el sistema responde que esa operación no existe y la tarea no cambia

### Requirement: Contenido de una tarea

El sistema SHALL representar cada tarea con su identificador, título, estado y responsable. El responsable SHALL identificarse solo por su nombre, sin exponer su correo ni su identificador. La tarea NO SHALL tener fecha de vencimiento.

#### Scenario: Forma de la tarea

- **WHEN** se devuelve una tarea en cualquier respuesta
- **THEN** incluye identificador, título, estado y el nombre del responsable, y no incluye correo, identificador del responsable ni fechas de vencimiento

#### Scenario: Responsable sin nombre

- **WHEN** el responsable de una tarea no tiene nombre completo
- **THEN** el nombre del responsable viene vacío (nulo) en la respuesta, nunca sustituido por su correo

### Requirement: Estados cerrados de una tarea

El sistema SHALL admitir únicamente los estados `pending`, `in_progress` y `done`, mostrados en pantalla como Pendiente, En curso y Hecho, y SHALL rechazar con un 422 cualquier otro valor. Nadie SHALL poder añadir, renombrar ni eliminar estados.

#### Scenario: Valor de estado desconocido

- **WHEN** se actualiza una tarea con un estado distinto de `pending`, `in_progress` o `done`, incluidos los nombres en castellano
- **THEN** la respuesta es un 422 con un error sobre el campo de estado y la tarea no cambia

#### Scenario: Cada tarea está en un solo estado

- **WHEN** se consulta cualquier tarea en cualquier momento
- **THEN** está en exactamente uno de los tres estados

### Requirement: Creación con solo el título

El sistema SHALL crear una tarea a partir únicamente de su título, dejándola en estado `pending` y con quien la crea como responsable, y SHALL devolverla completa. Cualquier estado o responsable enviado en la creación SHALL ignorarse.

#### Scenario: Creación correcta

- **WHEN** una persona con sesión crea una tarea enviando solo un título válido
- **THEN** la respuesta contiene la tarea con ese título, estado `pending` y el nombre de quien la creó como responsable

#### Scenario: Estado o responsable enviados al crear

- **WHEN** la creación incluye además un estado distinto de `pending` o un responsable distinto de quien crea
- **THEN** la tarea creada queda igualmente en `pending` y a nombre de quien la creó

#### Scenario: La tarea creada aparece en la lista

- **WHEN** tras crear una tarea se pide la lista
- **THEN** la lista contiene la tarea creada

### Requirement: Título obligatorio y acotado

El sistema SHALL rechazar con un 422 la creación sin título, con un título compuesto solo por espacios o con más de 255 caracteres, indicando el campo del título, y NO SHALL crear la tarea ni guardar nunca una versión recortada del título.

#### Scenario: Título ausente

- **WHEN** se crea una tarea sin título
- **THEN** la respuesta es un 422 con un error sobre el título y no se crea ninguna tarea

#### Scenario: Título en blanco

- **WHEN** se crea una tarea con un título formado solo por espacios
- **THEN** se rechaza igual que si faltara y no aparece ninguna tarea sin texto en la lista

#### Scenario: Título demasiado largo

- **WHEN** se crea una tarea con un título de más de 255 caracteres
- **THEN** la respuesta es un 422 con un error sobre el título y no se guarda ninguna versión recortada

#### Scenario: Título en el límite

- **WHEN** se crea una tarea con un título de exactamente 255 caracteres
- **THEN** la tarea se crea con el título completo

### Requirement: Actualización de cualquier tarea

El sistema SHALL permitir a cualquier persona con sesión cambiar el estado y el responsable de cualquier tarea, sea quien sea su responsable actual, sin permisos especiales ni advertencias, y SHALL devolver la tarea actualizada.

#### Scenario: Cambio de estado de una tarea ajena

- **WHEN** una persona cambia el estado de una tarea cuyo responsable es otra persona
- **THEN** el cambio se aplica igual que en una tarea propia y la respuesta contiene la tarea con el nuevo estado

#### Scenario: Cualquier transición entre estados

- **WHEN** se cambia una tarea a cualquiera de los tres estados, incluida la vuelta desde `done`
- **THEN** el cambio se aplica

#### Scenario: Cambio de responsable

- **WHEN** se actualiza una tarea indicando como responsable a otra persona registrada
- **THEN** la tarea pasa a mostrar el nombre de esa persona como responsable

#### Scenario: Responsable inexistente

- **WHEN** se actualiza una tarea indicando un responsable que no existe
- **THEN** la respuesta es un 422 con un error sobre el responsable y la tarea no cambia

#### Scenario: Tarea inexistente

- **WHEN** se actualiza una tarea que no existe
- **THEN** la respuesta es un 404 y no se crea ninguna tarea

### Requirement: Lista única y compartida

El sistema SHALL devolver siempre todas las tareas del espacio a cualquier persona con sesión, sin distinción de rol, y NO SHALL existir forma de crear una tarea que otros no puedan ver ni una vista de tareas propias separada. Consultar la lista NO SHALL modificar ninguna tarea.

#### Scenario: Mismo contenido para todos

- **WHEN** dos personas distintas piden la lista sin que nada cambie entre medias
- **THEN** reciben exactamente el mismo conjunto de tareas

#### Scenario: Tarea ajena visible

- **WHEN** otra persona crea una tarea y se la asigna a sí misma
- **THEN** aparece en la lista de cualquier otra persona con sesión

#### Scenario: Consultar no modifica

- **WHEN** se pide la lista repetidas veces
- **THEN** ninguna tarea cambia de estado ni de responsable

#### Scenario: Sin orden garantizado

- **WHEN** se pide la lista
- **THEN** el sistema devuelve todas las tareas sin garantizar ningún orden concreto

### Requirement: Pantalla de la lista de tareas

La aplicación SHALL ofrecer en la dirección `/tasks` la lista de tareas a las personas con sesión, mostrando en cada fila el título, el responsable por su nombre y el estado, sin necesidad de abrir la tarea. No SHALL mostrar fechas, marcas de vencida ni señales de presencia.

#### Scenario: Fila completa

- **WHEN** una persona con sesión abre la lista y hay tareas
- **THEN** cada fila muestra el título, el nombre del responsable y el estado como Pendiente, En curso o Hecho

#### Scenario: Responsable sin nombre

- **WHEN** el responsable de una tarea no tiene nombre
- **THEN** la fila muestra «Sin nombre» y nunca su correo ni su identificador

#### Scenario: Sin fechas ni presencia

- **WHEN** se recorre la lista
- **THEN** no aparece ninguna fecha, marca de vencida ni indicación de quién está conectado

#### Scenario: Sin vista separada

- **WHEN** la persona busca otras vistas de tareas
- **THEN** no existe ninguna vista «mis tareas» distinta de la lista del equipo

#### Scenario: Sin sesión

- **WHEN** una persona sin sesión intenta abrir la lista
- **THEN** se la lleva al inicio de sesión y no ve ninguna tarea

#### Scenario: Carga de la lista

- **WHEN** la lista se está cargando
- **THEN** se indica que está cargando y no se muestra el estado vacío

#### Scenario: Fallo al cargar

- **WHEN** no se puede cargar la lista
- **THEN** se muestra un aviso del problema en castellano y no se presenta como si no hubiera tareas

### Requirement: Estado vacío de la lista

La aplicación SHALL explicar, cuando no existe ninguna tarea, qué es la lista y SHALL ofrecer crear la primera, en lugar de mostrar una lista vacía sin más.

#### Scenario: Espacio sin tareas

- **WHEN** una persona abre la lista y no hay ninguna tarea
- **THEN** ve una explicación de para qué sirve la lista y el formulario para crear la primera tarea

#### Scenario: Primera tarea creada

- **WHEN** desde el estado vacío se crea la primera tarea
- **THEN** la explicación desaparece y la tarea aparece en la lista

### Requirement: Crear una tarea desde la pantalla

La aplicación SHALL ofrecer un formulario cuyo único campo es el título, sin ofrecer ni sugerir responsable, estado, fecha ni otro dato, y SHALL mostrar la tarea creada en la lista sin recargar ni cambiar de pantalla.

#### Scenario: Formulario de un solo campo

- **WHEN** una persona recorre el formulario de creación
- **THEN** solo se le pide el título y no se le ofrece ni sugiere responsable, estado ni fecha

#### Scenario: Creación correcta

- **WHEN** escribe un título y pulsa «Crear tarea»
- **THEN** la tarea aparece en la lista como Pendiente y con su propio nombre como responsable, el campo queda vacío y no ha cambiado de pantalla

#### Scenario: Envío en curso

- **WHEN** pulsa «Crear tarea»
- **THEN** el botón muestra «Creando…» y permanece desactivado hasta que llega la respuesta

#### Scenario: Título vacío o en blanco

- **WHEN** intenta crear la tarea sin título o solo con espacios
- **THEN** no se crea ninguna tarea y junto al campo se le explica en lenguaje corriente que debe escribir un título

#### Scenario: Título demasiado largo

- **WHEN** intenta crear una tarea con un título de más de 255 caracteres
- **THEN** junto al campo se le avisa de que supera los 255 caracteres, no se crea la tarea y el texto escrito se conserva sin recortar

#### Scenario: Sin conexión al crear

- **WHEN** falla la petición de creación por falta de conexión o por un error del servidor
- **THEN** se muestra un aviso en castellano y el título escrito se conserva

### Requirement: Cambiar el estado desde la lista

La aplicación SHALL permitir cambiar el estado de cualquier tarea desde su propia fila, ofreciendo como únicos destinos Pendiente, En curso y Hecho, y reflejando el cambio de inmediato sin abrir la tarea, pedir confirmación ni rellenar campos.

#### Scenario: Cambio desde la fila

- **WHEN** la persona elige otro estado en la fila de una tarea
- **THEN** la fila muestra de inmediato el nuevo estado, sin diálogo de confirmación ni cambio de pantalla

#### Scenario: Tarea de otra persona

- **WHEN** cambia el estado de una tarea cuyo responsable es otra persona
- **THEN** el cambio se aplica igual, sin permiso especial ni advertencia

#### Scenario: Destinos ofrecidos

- **WHEN** la persona despliega las opciones de estado de una tarea
- **THEN** solo encuentra Pendiente, En curso y Hecho, y la tarea queda en exactamente uno de ellos

#### Scenario: Vuelta atrás desde Hecho

- **WHEN** cambia una tarea desde Hecho a Pendiente o En curso
- **THEN** el cambio se aplica sin confirmación

#### Scenario: Fallo al cambiar el estado

- **WHEN** la petición de cambio falla
- **THEN** la fila vuelve al estado anterior y se avisa en castellano de que no se pudo cambiar

### Requirement: Navegación entre lista y perfil

La aplicación SHALL ofrecer, a quien tiene sesión, un enlace desde la lista de tareas a su perfil y otro desde el perfil a la lista.

#### Scenario: De la lista al perfil

- **WHEN** la persona pulsa el enlace al perfil en la lista
- **THEN** ve su pantalla de perfil

#### Scenario: Del perfil a la lista

- **WHEN** la persona pulsa el enlace a las tareas en el perfil
- **THEN** ve la lista de tareas
