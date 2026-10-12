# auth Specification

## Purpose

Cuentas y acceso de FlowSync: registro de personas usuarias, inicio y cierre de sesión, mantenimiento de la sesión entre visitas y consulta del perfil propio. Describe el comportamiento actual, tanto de la API HTTP como de las pantallas.

## Requirements

### Requirement: Registro de cuenta por API

El sistema SHALL permitir crear una cuenta mediante una petición de registro con nombre completo (clave obligatoria, aunque su valor puede ser nulo), email, contraseña y confirmación de contraseña, y SHALL devolver la persona creada junto con un token de acceso, de modo que quede autenticada desde el primer momento.

#### Scenario: Registro correcto

- **WHEN** se envía un registro con un email válido y no registrado, una contraseña de entre 8 y 32 caracteres y una confirmación idéntica
- **THEN** la respuesta indica éxito y contiene, bajo `data`, el usuario (identificador, nombre completo, email, fechas de creación y actualización e iniciales) y un token de acceso

#### Scenario: Registro sin nombre

- **WHEN** se envía un registro válido con el nombre completo a nulo o como cadena vacía
- **THEN** la cuenta se crea y el usuario devuelto tiene el nombre completo a nulo

#### Scenario: Email con distinta capitalización

- **WHEN** se registra un email que solo difiere en mayúsculas de otro ya registrado
- **THEN** se crea una cuenta distinta, porque la unicidad del email distingue mayúsculas

#### Scenario: La contraseña nunca se devuelve

- **WHEN** se completa cualquier registro o inicio de sesión
- **THEN** la respuesta no incluye la contraseña ni nada derivado de ella

### Requirement: Validación del registro

El sistema SHALL rechazar los registros inválidos con un error de validación (HTTP 422) que identifique cada campo incorrecto y la regla incumplida, sin crear ninguna cuenta.

#### Scenario: Email ya registrado

- **WHEN** se envía un registro con un email que ya pertenece a otra cuenta
- **THEN** la respuesta es un 422 con un error sobre el campo `email` por unicidad y no se crea ninguna cuenta

#### Scenario: Email con formato inválido o demasiado largo

- **WHEN** se envía un registro cuyo email no tiene formato de email o supera los 254 caracteres
- **THEN** la respuesta es un 422 con un error sobre el campo `email`

#### Scenario: Contraseña fuera de longitud

- **WHEN** se envía un registro con una contraseña de menos de 8 o de más de 32 caracteres
- **THEN** la respuesta es un 422 con un error sobre el campo `password`; si la confirmación tampoco cumple esa longitud, también con un error sobre `passwordConfirmation`

#### Scenario: Confirmación distinta

- **WHEN** se envía un registro cuya confirmación de contraseña no coincide con la contraseña
- **THEN** la respuesta es un 422 con un error sobre el campo `passwordConfirmation`

#### Scenario: Varios campos incorrectos a la vez

- **WHEN** se envía un registro con más de un campo incorrecto
- **THEN** la respuesta es un 422 cuya lista de errores contiene uno o más errores por cada campo incorrecto

### Requirement: Inicio de sesión por API

El sistema SHALL permitir iniciar sesión con email y contraseña y SHALL devolver la persona usuaria y un token de acceso nuevo; cada inicio de sesión genera un token distinto.

#### Scenario: Credenciales correctas

- **WHEN** se envía un inicio de sesión con el email y la contraseña de una cuenta existente
- **THEN** la respuesta contiene, bajo `data`, el usuario y un token de acceso válido

#### Scenario: Contraseña incorrecta o cuenta inexistente

- **WHEN** se envía un inicio de sesión con una contraseña que no corresponde al email, o con un email sin cuenta
- **THEN** la respuesta es un error de credenciales inválidas (HTTP 400), idéntico en ambos casos, y no se entrega ningún token

#### Scenario: Datos de acceso mal formados

- **WHEN** se envía un inicio de sesión sin contraseña o con un email que no tiene formato de email
- **THEN** la respuesta es un 422 con un error sobre el campo incorrecto

### Requirement: Acceso autenticado por token

El sistema SHALL exigir un token de acceso válido, enviado como credencial `Bearer`, en las operaciones de perfil y de cierre de sesión, y SHALL responder con 401 cuando falte o no sea válido.

#### Scenario: Petición sin token

- **WHEN** se solicita el perfil o el cierre de sesión sin credencial
- **THEN** la respuesta es un 401

#### Scenario: Token desconocido o malformado

- **WHEN** se solicita el perfil con un token que el sistema no reconoce
- **THEN** la respuesta es un 401

### Requirement: Consulta del perfil por API

El sistema SHALL devolver los datos de la persona autenticada cuando se solicita su perfil con un token válido.

#### Scenario: Perfil de la persona autenticada

- **WHEN** se solicita el perfil con un token válido
- **THEN** la respuesta contiene, bajo `data`, su identificador, nombre completo, email, fechas de creación y actualización e iniciales

#### Scenario: Iniciales con nombre de dos o más palabras

- **WHEN** el nombre completo tiene dos o más palabras, por ejemplo «Ada Lovelace»
- **THEN** las iniciales son la primera letra de las dos primeras palabras, separadas por un único espacio, en mayúsculas («AL»)

#### Scenario: Iniciales con nombre de una sola palabra

- **WHEN** el nombre completo es una sola palabra, por ejemplo «Ada»
- **THEN** las iniciales son sus dos primeras letras en mayúsculas («AD»)

#### Scenario: Iniciales sin nombre

- **WHEN** la cuenta no tiene nombre completo, por ejemplo con el email «ada@example.com»
- **THEN** las iniciales son la primera letra de la parte local del email seguida de la primera letra de su dominio, en mayúsculas («AE»)

### Requirement: Cierre de sesión por API

El sistema SHALL revocar el token con el que se hace la petición de cierre de sesión, de modo que deje de ser válido, sin afectar a los demás tokens de la misma cuenta.

#### Scenario: Cierre de sesión correcto

- **WHEN** se solicita el cierre de sesión con un token válido
- **THEN** la respuesta confirma el cierre con un mensaje fijo en inglés («Logged out successfully»), sin objeto `data`, y el token deja de ser aceptado

#### Scenario: Token revocado reutilizado

- **WHEN** tras cerrar sesión se vuelve a pedir el perfil con ese mismo token
- **THEN** la respuesta es un 401

#### Scenario: Otras sesiones de la misma cuenta

- **WHEN** una cuenta tiene dos tokens y se cierra sesión con uno de ellos
- **THEN** el otro token sigue siendo válido

### Requirement: Respuestas siempre en JSON

El sistema SHALL responder en JSON a todas las peticiones de la API, con independencia de la cabecera `Accept` enviada, y SHALL envolver en un objeto `data` las respuestas correctas que devuelven datos (registro, inicio de sesión y perfil); la confirmación de cierre de sesión no va envuelta.

#### Scenario: Petición que pide otro formato

- **WHEN** se hace una petición a una operación de cuentas indicando que se prefiere HTML
- **THEN** la respuesta sigue siendo JSON

### Requirement: Rutas públicas y rutas protegidas en pantalla

La aplicación SHALL ofrecer las pantallas de inicio de sesión (`/login`) y de registro (`/register`) solo a quien no tiene sesión, y la pantalla de perfil (`/profile`) solo a quien la tiene.

#### Scenario: Visitante sin sesión pide el perfil

- **WHEN** una persona sin sesión abre la pantalla de perfil
- **THEN** se la lleva a la pantalla de inicio de sesión

#### Scenario: Persona con sesión pide login o registro

- **WHEN** una persona con sesión abre la pantalla de inicio de sesión o la de registro
- **THEN** se la lleva a su perfil

#### Scenario: Dirección desconocida

- **WHEN** se abre una dirección que no existe en la aplicación
- **THEN** se la lleva al perfil y, si no tiene sesión, a continuación a la pantalla de inicio de sesión

### Requirement: Registro desde la pantalla

La aplicación SHALL ofrecer un formulario de registro con los campos nombre completo (marcado como opcional), email, contraseña (con la indicación «Entre 8 y 32 caracteres») y repetición de contraseña, y SHALL iniciar la sesión automáticamente al registrarse con éxito.

#### Scenario: Registro correcto

- **WHEN** la persona rellena el formulario con datos válidos y pulsa «Crear cuenta»
- **THEN** su cuenta queda creada, tiene sesión iniciada y ve su pantalla de perfil

#### Scenario: Envío en curso

- **WHEN** la persona pulsa «Crear cuenta»
- **THEN** el botón muestra «Creando cuenta…» y permanece desactivado hasta que llega la respuesta

#### Scenario: Contraseñas distintas

- **WHEN** la contraseña y su repetición no coinciden al pulsar «Crear cuenta»
- **THEN** se muestra «Las contraseñas no coinciden.» junto al campo de repetición, sin enviar nada al servidor

#### Scenario: Nombre en blanco

- **WHEN** la persona deja el nombre vacío o solo con espacios
- **THEN** la cuenta se crea sin nombre y en el perfil figura «Sin nombre»

#### Scenario: Email ya registrado

- **WHEN** el email ya pertenece a otra cuenta
- **THEN** junto al campo de email se muestra «Ese email ya está registrado. Inicia sesión en su lugar.»

#### Scenario: Errores de validación del servidor

- **WHEN** el servidor rechaza campos del formulario por su formato o longitud
- **THEN** cada mensaje, en castellano, aparece junto a su campo (por ejemplo «Introduce una dirección de email válida.»), sin mostrar además un aviso general

#### Scenario: Enlace a inicio de sesión

- **WHEN** la persona pulsa «Inicia sesión» bajo el formulario
- **THEN** pasa a la pantalla de inicio de sesión

### Requirement: Inicio de sesión desde la pantalla

La aplicación SHALL ofrecer un formulario de inicio de sesión con email y contraseña y SHALL explicar en castellano el motivo de cualquier fallo: los de credenciales, conexión o servidor en un aviso destacado y los de validación junto al campo afectado.

#### Scenario: Acceso correcto

- **WHEN** la persona introduce unas credenciales correctas y pulsa «Entrar»
- **THEN** tiene sesión iniciada y ve su pantalla de perfil

#### Scenario: Envío en curso

- **WHEN** la persona pulsa «Entrar»
- **THEN** el botón muestra «Entrando…» y permanece desactivado hasta que llega la respuesta

#### Scenario: Credenciales incorrectas

- **WHEN** el email o la contraseña no son correctos
- **THEN** se muestra el aviso «El email o la contraseña no son correctos.» y la persona permanece en la pantalla

#### Scenario: Campos vacíos o con formato inválido

- **WHEN** el servidor rechaza el email o la contraseña por vacíos o mal formados
- **THEN** el mensaje (por ejemplo «Introduce una dirección de email válida.» o «Falta rellenar la contraseña.») aparece junto a su campo y no en el aviso destacado

#### Scenario: Servidor inalcanzable

- **WHEN** no se puede contactar con el servidor
- **THEN** se muestra un aviso indicando que no se pudo conectar y que se compruebe que el backend está arrancado

#### Scenario: Error del servidor

- **WHEN** el servidor responde con un error inesperado
- **THEN** se muestra un aviso genérico pidiendo reintentar en un momento

#### Scenario: Enlace a registro

- **WHEN** la persona pulsa «Crea una» bajo el formulario
- **THEN** pasa a la pantalla de registro

### Requirement: Persistencia y restauración de la sesión

La aplicación SHALL conservar la sesión entre recargas y visitas, y SHALL validarla contra el servidor al arrancar antes de darla por buena.

#### Scenario: Recarga con sesión válida

- **WHEN** una persona con sesión recarga la página o vuelve a abrir la aplicación
- **THEN** se muestra una pantalla de carga mientras se valida la sesión y después continúa en la pantalla solicitada, sin pasar por el inicio de sesión

#### Scenario: Sesión rechazada por el servidor

- **WHEN** al arrancar el servidor no reconoce la sesión guardada
- **THEN** la sesión se descarta, se lleva a la persona al inicio de sesión y allí se le explica que su sesión ha caducado

#### Scenario: Servidor caído al arrancar

- **WHEN** al arrancar no se puede validar la sesión por un fallo de conexión o del servidor
- **THEN** se lleva a la persona al inicio de sesión con un aviso del motivo, pero la sesión guardada no se descarta, de modo que recargar cuando el servidor vuelva la restaura

#### Scenario: Aviso de sesión perdida y nuevo intento

- **WHEN** se muestra en el inicio de sesión el motivo de una sesión perdida y la persona vuelve a intentar entrar
- **THEN** si el nuevo intento falla se muestra el error del intento, y si tiene éxito el aviso desaparece

### Requirement: Perfil en pantalla

La aplicación SHALL mostrar a la persona autenticada su perfil con sus iniciales, su nombre (o «Sin nombre» si no lo tiene), su email y la fecha desde la que es miembro, en formato largo en castellano.

#### Scenario: Perfil con nombre

- **WHEN** una persona con nombre abre su perfil
- **THEN** ve sus iniciales, su nombre, su email y «Miembro desde» seguido de la fecha de creación de la cuenta, por ejemplo «12 de octubre de 2026»

#### Scenario: Perfil sin nombre

- **WHEN** una persona sin nombre abre su perfil
- **THEN** en lugar del nombre ve «Sin nombre»

### Requirement: Cierre de sesión desde la pantalla

La aplicación SHALL permitir cerrar sesión desde el perfil con el botón «Cerrar sesión», y SHALL dejar a la persona sin sesión aunque el servidor no responda.

#### Scenario: Cierre correcto

- **WHEN** la persona pulsa «Cerrar sesión»
- **THEN** la sesión se cierra de inmediato y se la lleva a la pantalla de inicio de sesión sin aviso de error

#### Scenario: Servidor no disponible al cerrar

- **WHEN** la persona pulsa «Cerrar sesión» y la petición al servidor falla
- **THEN** igualmente queda sin sesión local y es llevada al inicio de sesión, aunque el token puede seguir siendo válido en el servidor

#### Scenario: Sesión cerrada no se recupera

- **WHEN** tras cerrar sesión la persona recarga la página
- **THEN** sigue sin sesión y ve el inicio de sesión
