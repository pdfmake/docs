+++
sourceDigest = "ff68daa138b7259216d53546c431739a03360e22b4e9749840a4eba20c38c633"
title = "Errores y diagnÃ³sticos"
description = "Detecta errores de sintaxis JavaScript, nodos de documento malformados, fallos de recursos e interrupciones de salida con diagnÃ³sticos Ãºtiles."
weight = 2
+++

## Identifica primero la etapa que falla

Una definiciÃ³n no vÃ¡lida debe producir un error, no omitir contenido en silencio. La pregunta Ãºtil es en quÃ© punto fallÃ³ y cÃ³mo llega el error a la aplicaciÃ³n.

| Etapa | Fallo habitual | DÃ³nde corregirlo |
| --- | --- | --- |
| AnÃ¡lisis de JavaScript | Falta una coma, una comilla o una llave de cierre | Editor de cÃ³digo; todavÃ­a no se ha llamado a la biblioteca |
| EjecuciÃ³n de la definiciÃ³n | `ReferenceError` o fallo de un callback | CÃ³digo de la aplicaciÃ³n que construye la definiciÃ³n |
| Estructura del documento | Tipo de nodo mal escrito, fila de tabla o lista no vÃ¡lida | Ruta de definiciÃ³n indicada |
| Carga de recursos | Falta una fuente, URL rechazada, imagen ilegible | Registro de fuentes/recursos y polÃ­ticas de acceso |
| MaquetaciÃ³n/renderizado | Contenido demasiado grande, dimensiones no vÃ¡lidas o fallo de un callback | DefiniciÃ³n mÃ¡s pequeÃ±a que reproduzca el problema |
| Salida | Flujo cerrado, permisos de escritura o fallo del destino | GestiÃ³n de errores de bÃºfer/flujo/archivo |

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

Devuelve un error a quien llama la API o muestra `error.message` en la interfaz. No respondas con un PDF vacÃ­o ni informes de Ã©xito despuÃ©s de descartar el rechazo. Evita registrar el contenido de los documentos o credenciales privadas de recursos.

Desde 0.3.13, `getStream()` rechaza el acceso a un flujo ya consumido. Los métodos basados en un búfer reutilizan los bytes almacenados; `write()` en Node también acepta una salida ya leída con `getBuffer()`, `getBase64()` o `getDataUrl()`. Crea una nueva instancia de salida para obtener otro flujo sin procesar.

## Leer una ruta del documento

La rama local de mejoras de la biblioteca aÃ±ade diagnÃ³sticos `PDFMAKE_INVALID_DOCUMENT` con `phase: 'preprocess'` y una propiedad `path`. Por ejemplo:

```text
Unrecognized document structure: ...
Document path: content[0].columns[0].ul[1]
```

Esto apunta al segundo elemento de la lista en la primera columna del primer nodo del cuerpo. Comprueba si hay un error tipogrÃ¡fico, como `{ txt: 'Hello' }` en lugar de `{ text: 'Hello' }`. Las filas de tabla malformadas identifican la fila y el nÃºmero de celdas esperado. Las tablas vacÃ­as explican que `table.body` necesita matrices de filas no vacÃ­as. Conserva los marcadores `{}` para las celdas combinadas. Se mantiene el texto de error existente; cuando estÃ©n disponibles, los consumidores deben usar los campos de diagnÃ³stico en lugar de analizar las cadenas del mensaje.

Estos diagnÃ³sticos estructurados son **nuevos en la rama local de mejoras**; el paquete publicado 0.3.13 todavÃ­a no los incluye. Los errores genÃ©ricos siguen teniendo un mensaje. La rama tambiÃ©n rechaza los flujos de bÃºfer cerrados antes de tiempo, en vez de dejar pendiente su Promise.

## Errores de sintaxis en el entorno de pruebas

El editor analiza la definiciÃ³n antes de ejecutarla, marca la ubicaciÃ³n defectuosa y muestra la lÃ­nea y la columna. **Go to error in editor** lleva el cursor a esa ubicaciÃ³n. Las funciones Deshacer/Rehacer y el panel de errores permiten corregir el problema sin perder el trabajo. Con la vista previa en directo, el Ãºltimo PDF generado correctamente permanece visible durante las ediciones y los fallos, pero su descarga se desactiva cuando ya no coincide con el cÃ³digo actual.

## Reducir los fallos difÃ­ciles

MantÃ©n las mismas fuentes y el mismo entorno de ejecuciÃ³n. Sustituye el cuerpo por un pÃ¡rrafo y luego vuelve a aÃ±adir bloques hasta que reaparezca el problema. En las tablas, comprueba la longitud de las filas y las celdas combinadas antes de ajustar los anchos. Si fallan los recursos, empieza con una fuente local conocida y una imagen incrustada. Consulta [soluciÃ³n de problemas](/docs/0.3/es/guides/troubleshooting/) para ver mÃ¡s sÃ­ntomas.

## Validar la definición completa antes del renderizado

La API local aún no publicada `validateDocument(input, options)` comprueba todas las propiedades declaradas del documento y reúne varios errores con sus rutas. También comprueba tablas, celdas combinadas, referencias, rangos numéricos y ciclos. No modifica la entrada, ejecuta callbacks ni accede a recursos. Las propiedades desconocidas generan advertencias; `strict: true` las convierte en errores.

```js
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

El resultado contiene `valid`, `errors`, `warnings`, `deferred` y `truncated`. Cada diagnóstico incluye `path`, `code`, `severity` y `message`. Límites predeterminados: 100 diagnósticos, 100 niveles y 50 000 valores inspeccionados. Un límite agotado nunca informa de éxito. Los resultados de callbacks, la disponibilidad y decodificación de recursos y el diseño final se comprueban durante el renderizado. JavaScript debe ser sintácticamente válido antes de llamar a esta API de objetos.

Pasa `{ validation: true }` como segundo argumento a `createPdf` para rechazar definiciones incorrectas antes de cargar recursos. Un documento no válido lanza un `DocumentValidationError` con `code: "PDFMAKE_VALIDATION_ERROR"`, `phase: "validation"` y un array `diagnostics`. Los usos existentes siguen siendo compatibles; la comprobación previa es opcional. El playground local la ejecuta automáticamente con la biblioteca mejorada.
