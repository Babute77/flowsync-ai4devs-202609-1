# Proposal

## Why

FlowSync ya permite entrar y tener cuenta, pero todavía no hay nada que hacer dentro: el equipo no puede anotar tareas ni ver en qué anda cada persona. Las historias E3-1 (lista compartida) y E2-1 a E2-4 (crear con solo título, título obligatorio, nace mía y pendiente, cambiar estado desde la lista) son el sustrato mínimo de la gestión de tareas y se entregan juntas porque sin lista no hay dónde crear ni dónde cambiar un estado.

## What Changes

- **Nueva capacidad de tareas, full-stack** (API en `backend/` e interfaz en `frontend/`).
- API con exactamente tres operaciones, todas exigiendo sesión: listar todas las tareas, crear una y actualizarla.
- Una tarea tiene título, estado y responsable. Los estados viajan como `pending`, `in_progress` y `done` (conjunto cerrado; cualquier otro valor se rechaza con 422) y se pintan como Pendiente, En curso y Hecho.
- Crear pide únicamente el título (obligatorio, sin contar espacios, máximo 255 caracteres; si se pasa se avisa, nunca se recorta). La tarea nace en pendiente y con quien la crea como responsable.
- Actualizar permite cambiar el estado y el responsable de cualquier tarea, sea de quien sea, sin permisos ni advertencias.
- Nueva pantalla con la lista única y compartida: cada fila muestra título, responsable (por nombre, «Sin nombre» si no lo tiene) y estado, que se cambia desde la propia fila. Incluye estado vacío con explicación y formulario de un solo campo para crear.
- La lista pasa a ser la pantalla de inicio: tras iniciar sesión o registrarse, y ante cualquier dirección desconocida, se lleva a la lista en lugar de al perfil. Hay enlaces entre lista y perfil.
- Sin tests y sin dependencias nuevas: la interfaz reutiliza los componentes de `components/ui/` y el patrón de páginas y rutas del login.

## Capabilities

### New Capabilities
- `tasks`: lista única y compartida de tareas del equipo; creación con solo título, título obligatorio, responsable y estado por defecto, y cambio de estado desde la lista.

### Modified Capabilities
- `auth`: la pantalla de aterrizaje de las personas con sesión deja de ser el perfil y pasa a ser la lista de tareas (rutas públicas/protegidas, registro e inicio de sesión correctos).

## Fuera de alcance

- Fecha de vencimiento: la tarea no la tiene, la lista no muestra fechas ni marcas de vencida y no se deja preparada en el modelo.
- Lectura individual de una tarea, borrado y endpoints de equipo.
- Tareas privadas, vista «mis tareas», filtros y agrupación por persona.
- Reasignar el responsable desde la interfaz (la API sí lo admite; la pantalla solo cambia el estado).
- Refresco automático de la lista cuando otra persona cambia algo (historia aparte, E3-2) y señales de presencia (CA-12 de E3-1, criterio negativo).
- Roles o permisos diferenciados.
- Tests y base de pruebas.

## Puntos abiertos

- **Orden de la lista (PA-3).** No hay regla decidida: este change no inventa criterio ni ordena de forma explícita; la lista sale en el orden en que la entrega la base de datos, que no es un contrato. CA-5 de E3-1 (enumerar el trabajo de cada persona) no queda garantizado hasta que se decida el orden o la agrupación.
- **Transiciones de estado (PA-7).** Ningún requisito declara qué transiciones son legales; se admite cualquier cambio entre los tres estados, incluida la vuelta atrás desde Hecho, sin confirmación.
- **Límite de tareas «En curso» por persona (PA-4)** y **qué ve quien tiene abierta una tarea que cambia de manos (PA-8)**: sin decidir y sin efecto en este change.
- **Coste del gesto (PA-9).** «2 interacciones o menos» no está definido; se cambia el estado con un único gesto en la propia fila.
- Decisión tomada aquí y no del backlog: el título admite hasta 255 caracteres (PA-9 no fijaba umbral).

## Impact

- **Backend:** migración de la tabla de tareas (regenera `database/schema.ts` y `.adonisjs/`), modelo, controlador, validadores, transformer y tres rutas bajo el prefijo `/api/v1` y el middleware de autenticación existente.
- **Frontend:** página de tareas, llamadas nuevas en `lib/api.ts`, tipos, traducción de errores del título y estado, y cambios en las rutas existentes (inicio, redirecciones).
- **Specs:** nueva `tasks`; delta `MODIFIED` sobre `auth`.
- **Dependencias:** ninguna nueva.
