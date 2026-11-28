# Guía del entorno de pruebas

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/guides/playground/

## Aprende editando

Abre el [entorno de pruebas](/docs/0.3/es/playground/), elige un ejemplo y edita la definición en el panel izquierdo. El panel derecho muestra un PDF real renderizado mediante PDF.js. Con **Live preview** activada, el PDF se actualiza automáticamente después de editar. Selecciona **Run** o pulsa **Ctrl/Command + Enter** para actualizarlo de inmediato.

El editor CodeMirror 6 incluye resaltado de sintaxis, números de línea, coincidencia de llaves, sangría, botones Deshacer/Rehacer, historial de deshacer persistente y diagnósticos de sintaxis con línea y columna. **Go to error** enfoca la ubicación problemática en el código. También ofrece autocompletado. Usa **Ctrl + Space** para solicitar sugerencias. Los nombres de campos que aparecen son pistas; la referencia del documento define el contexto, el tipo y los valores válidos.

## Ejemplos

| Ejemplo | Explora |
| --- | --- |
| [Primer documento](/docs/0.3/es/playground/?example=welcome) | Texto, espaciado y estilos de fuente |
| [Factura](/docs/0.3/es/playground/?example=invoice) | Una tabla, totales y pie con número de página |
| [Tablas](/docs/0.3/es/playground/?example=tables) | Encabezados repetidos en varias páginas |
| [Estilos de texto](/docs/0.3/es/playground/?example=styles) | Estilos con nombre y anulaciones en línea |
| [Columnas](/docs/0.3/es/playground/?example=columns) | Bloques y pilas uno junto a otro |
| [Celdas combinadas](/docs/0.3/es/playground/?example=spans) | Celdas que abarcan filas y columnas con marcadores de posición |
| [Páginas](/docs/0.3/es/playground/?example=pages) | Saltos de página, encabezados y pies de página |
| [Vectores](/docs/0.3/es/playground/?example=vectors) | SVG incrustados y códigos QR |
| [Imágenes](/docs/0.3/es/playground/?example=images) | Datos PNG incrustados y reutilizados por nombre |
| [Listas](/docs/0.3/es/playground/?example=lists) | Listas numeradas, viñetas y enlaces |

El parámetro URL `example` selecciona un ejemplo conocido; no acepta JavaScript. La vista previa en directo también actualiza los espacios de trabajo restaurados, los documentos guardados y los archivos importados. Desactiva **Live preview** antes de importar código que quieras revisar primero.

## Vista previa y salida

Usa los botones de flecha para cambiar de página y el menú de zoom para cambiar la escala. **Page text** muestra el texto extraído de la página PDF actual para inspeccionarlo y para tecnologías de asistencia. **Open PDF** abre el archivo generado por separado; **Download PDF** guarda los mismos bytes PDF. El pie muestra el tiempo de generación y el tamaño de salida. El tiempo de generación no incluye el renderizado de la vista previa con PDF.js.

La vista previa en directo espera 650 ms después de la última edición y luego renderiza en un trabajador nuevo. El PDF anterior permanece visible hasta que termina el renderizado de la página nueva fuera de pantalla; entonces el lienzo se sustituye en un solo paso. Cuando es posible, se conservan la página PDF seleccionada y el nivel de zoom. Las descargas se desactivan mientras el PDF visible no coincida con el código actual. Los errores conservan la última vista previa correcta en lugar de sustituirla por un panel en blanco.

## Conservar el trabajo

**Export code** descarga la definición actual como JavaScript. **Import .js** lee un archivo local; el límite es de 500 KB. Desactiva **Live preview** antes de importar código que quieras revisar antes de ejecutarlo. Al reiniciar o cambiar de ejemplo se pregunta antes de sustituir las ediciones.

**El espacio de trabajo actual se guarda automáticamente en el almacenamiento local**, incluida la definición, la selección del editor, el historial de deshacer, el ejemplo y la configuración de página y zoom. Al recargar, se restaura el editor, su historial de Deshacer/Rehacer y la preferencia de Live preview. Si la vista previa en directo está activada, el PDF restaurado se vuelve a renderizar automáticamente y las siguientes ediciones se actualizan sin pulsar Run. Si está desactivada, el renderizado sigue siendo manual incluso después de recargar.

Asigna un nombre al documento y selecciona **Save document** para conservarlo como documento local independiente. Si le asignas un nombre nuevo, se crea otra entrada; si lo guardas con el mismo nombre seleccionado, se actualiza esa entrada. El menú de documentos guardados restaura un documento y su historial. Eliminar quita esa copia con nombre y conserva el contenido actual del editor. Se pueden guardar hasta 30 documentos con nombre. El almacenamiento del navegador también tiene cuotas.

**Save draft locally** sigue siendo una instantánea rápida independiente con controles Restaurar/Borrar. **Clear workspace autosave** elimina el guardado automático actual y lo pausa hasta que vuelvas a escribir. Los documentos con nombre y los borradores rápidos son independientes. Si el almacenamiento del navegador está desactivado o lleno, el editor sigue funcionando y se puede exportar el código. Esta aplicación no sube el código ni el PDF.

## Límites del renderizado

Cada renderizado inicia un trabajador nuevo del navegador. **Cancel** lo termina, incluso si hay un bucle JavaScript bloqueado. Un límite de diez segundos detiene el trabajo inesperadamente costoso. Simplifica los documentos grandes o pruébalos en una aplicación controlada si superan el límite del entorno de pruebas. Aquí, la API PDF deniega los recursos de URL remotas; usa imágenes incrustadas y las fuentes Roboto suministradas.

El JavaScript personalizado es código de confianza del usuario, no una caja de arena de seguridad. No ejecutes código de origen desconocido. Un trabajador protege la interfaz de usuario frente a bloqueos, pero no aísla el código malicioso. Consulta [seguridad de recursos](/docs/0.3/es/guides/resource-security/) para obtener recomendaciones sobre API en producción.

## Ejecutar la herramienta de desarrollo independiente

Desde una copia compilada de la biblioteca pdfmake, ejecuta `npm run playground`. Esto sirve la misma interfaz con el motor de esa copia en `http://127.0.0.1:1234/playground/`. Sus herramientas independientes requieren Node >=22.13. El requisito de ejecución de la biblioteca publicada sigue siendo Node >=20. El sitio de documentación también puede probar un motor local mediante `PDFMAKE_SOURCE`; consulta el README del repositorio de documentación.
