# Spec Delta

## MODIFIED Requirements

### Requirement: Rutas públicas y rutas protegidas en pantalla

La aplicación SHALL ofrecer las pantallas de inicio de sesión (`/login`) y de registro (`/register`) solo a quien no tiene sesión, y las pantallas de perfil (`/profile`) y de lista de tareas (`/tasks`) solo a quien tiene sesión. La lista de tareas SHALL ser la pantalla de inicio de la aplicación.

#### Scenario: Visitante sin sesión pide el perfil

- **WHEN** una persona sin sesión abre la pantalla de perfil
- **THEN** se la lleva a la pantalla de inicio de sesión

#### Scenario: Persona con sesión pide login o registro

- **WHEN** una persona con sesión abre la pantalla de inicio de sesión o la de registro
- **THEN** se la lleva a la lista de tareas

#### Scenario: Dirección desconocida

- **WHEN** se abre una dirección que no existe en la aplicación
- **THEN** se la lleva a la lista de tareas y, si no tiene sesión, a continuación a la pantalla de inicio de sesión

### Requirement: Registro desde la pantalla

La aplicación SHALL ofrecer un formulario de registro con los campos nombre completo (marcado como opcional), email, contraseña (con la indicación «Entre 8 y 32 caracteres») y repetición de contraseña, y SHALL iniciar la sesión automáticamente al registrarse con éxito.

#### Scenario: Registro correcto

- **WHEN** la persona rellena el formulario con datos válidos y pulsa «Crear cuenta»
- **THEN** su cuenta queda creada, tiene sesión iniciada y ve la lista de tareas

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
- **THEN** tiene sesión iniciada y ve la lista de tareas

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
