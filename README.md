# FM-radio
radio

## Versión de PC (radio de madera)

`pc.html` se ve igual que la imagen de referencia: la radio de madera es la imagen `pc-skin.webp` (1536 × 1024) y todos los controles están ubicados encima, en las mismas coordenadas. `pc.js` escala todo junto para que entre en cualquier ventana.

- **Aguja del dial:** se mueve sola según la frecuencia de la emisora.
- **Logos:** carpeta `logos/`. Para sumar uno, copiá la imagen cuadrada ahí y agregá una línea en la lista `LOGOS` de `pc.js`.
- **Actualizar:** lo maneja `update.js`. Cada vez que subas cambios, subí también el número de `CACHE` en `sw.js`.
- **Móvil:** sigue siendo `index.html`, no se tocó.
