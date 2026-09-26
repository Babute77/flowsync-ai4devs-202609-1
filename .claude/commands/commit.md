---
description: Prepara un commit atómico y bien descrito de los cambios en curso
---

1. Corre `git status` y `git diff` (staged y unstaged) para ver exactamente qué cambió.
2. Si hay cambios de `backend/` y `frontend/` mezclados sin relación directa, sepáralos en commits distintos.
3. Antes de commitear, corre el `lint` y `typecheck`/`build` del paquete afectado y arregla lo que rompa — no commitees código que no pasa esas comprobaciones.
4. Escribe el mensaje en imperativo, explicando el porqué del cambio, no solo el qué.
5. Añade solo los archivos relevantes de forma explícita (`git add <archivo>`), nunca `git add -A` ni `git add .`.
6. Muestra el mensaje propuesto y espera confirmación antes de ejecutar `git commit`.
