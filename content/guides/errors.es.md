+++
sourceDigest = "e4dda1a91f9ef3e34e7b45d6b46a0bc638ea75a858d155ea73e148259ff35728"
title = "Errores y diagn贸sticos"
description = "Detecta errores de sintaxis JavaScript, nodos de documento malformados, fallos de recursos e interrupciones de salida con diagn贸sticos 煤tiles."
weight = 2
+++

## Identifica primero la etapa que falla

Una definici贸n no v谩lida debe producir un error, no omitir contenido en silencio. La pregunta 煤til es en qu茅 punto fall贸 y c贸mo llega el error a la aplicaci贸n.

| Etapa | Fallo habitual | D贸nde corregirlo |
| --- | --- | --- |
| An谩lisis de JavaScript | Falta una coma, una comilla o una llave de cierre | Editor de c贸digo; todav铆a no se ha llamado a la biblioteca |
| Ejecuci贸n de la definici贸n | `ReferenceError` o fallo de un callback | C贸digo de la aplicaci贸n que construye la definici贸n |
| Estructura del documento | Tipo de nodo mal escrito, fila de tabla o lista no v谩lida | Ruta de definici贸n indicada |
| Carga de recursos | Falta una fuente, URL rechazada, imagen ilegible | Registro de fuentes/recursos y pol铆ticas de acceso |
| Maquetaci贸n/renderizado | Contenido demasiado grande, dimensiones no v谩lidas o fallo de un callback | Definici贸n m谩s peque帽a que reproduzca el problema |
| Salida | Flujo cerrado, permisos de escritura o fallo del destino | Gesti贸n de errores de b煤fer/flujo/archivo |

## Espera siempre la salida

```js
async function generateReport(pdfmake, definition) {
  try {
    return await pdfmake.createPdf(definition).getBuffer();
  } catch (error) {
    console.error('PDF generation failed', {
      message: error.message,
      code: error.code,
      phase: error.phase,
      path: error.path
    });
    throw error;
  }
}
```

Devuelve un error a quien llama la API o muestra `error.message` en la interfaz. No respondas con un PDF vac铆o ni informes de 茅xito despu茅s de descartar el rechazo. Evita registrar el contenido de los documentos o credenciales privadas de recursos.

## Leer una ruta del documento

La rama local de mejoras de la biblioteca a帽ade diagn贸sticos `PDFMAKE_INVALID_DOCUMENT` con `phase: 'preprocess'` y una propiedad `path`. Por ejemplo:

```text
Unrecognized document structure: ...
Document path: content[0].columns[0].ul[1]
```

Esto apunta al segundo elemento de la lista en la primera columna del primer nodo del cuerpo. Comprueba si hay un error tipogr谩fico, como `{ txt: 'Hello' }` en lugar de `{ text: 'Hello' }`. Las filas de tabla malformadas identifican la fila y el n煤mero de celdas esperado. Las tablas vac铆as explican que `table.body` necesita matrices de filas no vac铆as. Conserva los marcadores `{}` para las celdas combinadas. Se mantiene el texto de error existente; cuando est茅n disponibles, los consumidores deben usar los campos de diagn贸stico en lugar de analizar las cadenas del mensaje.

Estos diagn贸sticos estructurados son **nuevos en la rama local de mejoras**; el paquete publicado 0.3.12 todav铆a no los incluye. Los errores gen茅ricos siguen teniendo un mensaje. La rama tambi茅n rechaza los flujos de b煤fer cerrados antes de tiempo, en vez de dejar pendiente su Promise.

## Errores de sintaxis en el entorno de pruebas

El editor analiza la definici贸n antes de ejecutarla, marca la ubicaci贸n defectuosa y muestra la l铆nea y la columna. **Go to error in editor** lleva el cursor a esa ubicaci贸n. Las funciones Deshacer/Rehacer y el panel de errores permiten corregir el problema sin perder el trabajo. Con la vista previa en directo, el 煤ltimo PDF generado correctamente permanece visible durante las ediciones y los fallos, pero su descarga se desactiva cuando ya no coincide con el c贸digo actual.

## Reducir los fallos dif铆ciles

Mant茅n las mismas fuentes y el mismo entorno de ejecuci贸n. Sustituye el cuerpo por un p谩rrafo y luego vuelve a a帽adir bloques hasta que reaparezca el problema. En las tablas, comprueba la longitud de las filas y las celdas combinadas antes de ajustar los anchos. Si fallan los recursos, empieza con una fuente local conocida y una imagen incrustada. Consulta [soluci贸n de problemas](/docs/0.3/es/guides/troubleshooting/) para ver m谩s s铆ntomas.

## Validar la definici髇 completa antes del renderizado

La API local a鷑 no publicada `validateDocument(input, options)` comprueba todas las propiedades declaradas del documento y re鷑e varios errores con sus rutas. Tambi閚 comprueba tablas, celdas combinadas, referencias, rangos num閞icos y ciclos. No modifica la entrada, ejecuta callbacks ni accede a recursos. Las propiedades desconocidas generan advertencias; `strict: true` las convierte en errores.

```js
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

El resultado contiene `valid`, `errors`, `warnings`, `deferred` y `truncated`. Cada diagn髎tico incluye `path`, `code`, `severity` y `message`. L韒ites predeterminados: 100 diagn髎ticos, 100 niveles y 50 000 valores inspeccionados. Un l韒ite agotado nunca informa de 閤ito. Los resultados de callbacks, la disponibilidad y decodificaci髇 de recursos y el dise駉 final se comprueban durante el renderizado. JavaScript debe ser sint醕ticamente v醠ido antes de llamar a esta API de objetos.

Pasa `{ validation: true }` como segundo argumento a `createPdf` para rechazar definiciones incorrectas antes de cargar recursos. Un documento no v醠ido lanza un `DocumentValidationError` con `code: "PDFMAKE_VALIDATION_ERROR"`, `phase: "validation"` y un array `diagnostics`. Los usos existentes siguen siendo compatibles; la comprobaci髇 previa es opcional. El playground local la ejecuta autom醫icamente con la biblioteca mejorada.
