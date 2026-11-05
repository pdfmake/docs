# Empieza aquí

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/learn/

## Empieza con un documento funcional

No hace falta que leas toda la referencia del documento desde el principio. Sigue estos tres pasos:



- [1. Crea tu primer PDF](/docs/0.3/es/learn/first-pdf/): Comprende la definición, carga las fuentes y ejecuta un ejemplo completo.


- [2. Aprende el modelo de documento](/docs/0.3/es/learn/document-model/): Descubre cuándo usar un párrafo, texto en línea, una pila, columnas o una tabla.


- [3. Lee los errores y corrige el problema adecuado](/docs/0.3/es/guides/errors/): Distingue entre sintaxis JavaScript, estructura del documento, recursos y salida.



## ¿Qué entorno de ejecución necesito?

| Elige | Cuándo | Salida |
| --- | --- | --- |
| [Node.js](/docs/0.3/es/getting-started/server-side/) | Tu API o trabajo en segundo plano crea el archivo | `write()` para archivos; `getBuffer()` para respuestas HTTP |
| [Navegador](/docs/0.3/es/getting-started/client-side/) | El usuario crea el documento en su dispositivo | `download()`, `open()`, `print()` o `getBlob()` |

La definición del documento es compartida. La carga de fuentes y los métodos de salida dependen del entorno. Estas páginas corresponden a la versión **0.3.x**; los ejemplos antiguos que usan `new PdfPrinter(...)` y salida con callbacks pertenecen a [0.1/0.2](/docs/0.3/es/migration-from-0.1/).

## Aprende viendo el resultado

Los ejemplos de este recorrido muestran la definición exacta de JavaScript junto a un PDF generado real. Ábrelos en el entorno de pruebas para editarlos. Su código completo también aparece en el [corpus Markdown](/docs/0.3/es/llms-full.txt), incluido el código que generan los componentes de ejemplo interactivos.
