# Errores y diagnósticos

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/guides/errors/

## Identifica primero la etapa que falla

Una definición no válida debe producir un error, no omitir contenido en silencio. La pregunta útil es en qué punto falló y cómo llega el error a la aplicación.

| Etapa | Fallo habitual | Dónde corregirlo |
| --- | --- | --- |
| Análisis de JavaScript | Falta una coma, una comilla o una llave de cierre | Editor de código; todavía no se ha llamado a la biblioteca |
| Ejecución de la definición | `ReferenceError` o fallo de un callback | Código de la aplicación que construye la definición |
| Estructura del documento | Tipo de nodo mal escrito, fila de tabla o lista no válida | Ruta de definición indicada |
| Carga de recursos | Falta una fuente, URL rechazada, imagen ilegible | Registro de fuentes/recursos y políticas de acceso |
| Maquetación/renderizado | Contenido demasiado grande, dimensiones no válidas o fallo de un callback | Definición más pequeña que reproduzca el problema |
| Salida | Flujo cerrado, permisos de escritura o fallo del destino | Gestión de errores de búfer/flujo/archivo |

## Espera siempre la salida

**JavaScript**

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

**TypeScript**

```ts
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

Devuelve un error a quien llama la API o muestra `error.message` en la interfaz. No respondas con un PDF vacío ni informes de éxito después de descartar el rechazo. Evita registrar el contenido de los documentos o credenciales privadas de recursos.

## Leer una ruta del documento

La rama local de mejoras de la biblioteca añade diagnósticos `PDFMAKE_INVALID_DOCUMENT` con `phase: 'preprocess'` y una propiedad `path`. Por ejemplo:

```text
Unrecognized document structure: ...
Document path: content[0].columns[0].ul[1]
```

Esto apunta al segundo elemento de la lista en la primera columna del primer nodo del cuerpo. Comprueba si hay un error tipográfico, como `{ txt: 'Hello' }` en lugar de `{ text: 'Hello' }`. Las filas de tabla malformadas identifican la fila y el número de celdas esperado. Las tablas vacías explican que `table.body` necesita matrices de filas no vacías. Conserva los marcadores `{}` para las celdas combinadas. Se mantiene el texto de error existente; cuando estén disponibles, los consumidores deben usar los campos de diagnóstico en lugar de analizar las cadenas del mensaje.

Estos diagnósticos estructurados son **nuevos en la rama local de mejoras**; el paquete publicado 0.3.12 todavía no los incluye. Los errores genéricos siguen teniendo un mensaje. La rama también rechaza los flujos de búfer cerrados antes de tiempo, en vez de dejar pendiente su Promise.

## Errores de sintaxis en el entorno de pruebas

El editor analiza la definición antes de ejecutarla, marca la ubicación defectuosa y muestra la línea y la columna. **Go to error in editor** lleva el cursor a esa ubicación. Las funciones Deshacer/Rehacer y el panel de errores permiten corregir el problema sin perder el trabajo. Con la vista previa en directo, el último PDF generado correctamente permanece visible durante las ediciones y los fallos, pero su descarga se desactiva cuando ya no coincide con el código actual.

## Reducir los fallos difíciles

Mantén las mismas fuentes y el mismo entorno de ejecución. Sustituye el cuerpo por un párrafo y luego vuelve a añadir bloques hasta que reaparezca el problema. En las tablas, comprueba la longitud de las filas y las celdas combinadas antes de ajustar los anchos. Si fallan los recursos, empieza con una fuente local conocida y una imagen incrustada. Consulta [solución de problemas](/docs/0.3/es/guides/troubleshooting/) para ver más síntomas.

## Validar la definici�n completa antes del renderizado

La API local a�n no publicada `validateDocument(input, options)` comprueba todas las propiedades declaradas del documento y re�ne varios errores con sus rutas. Tambi�n comprueba tablas, celdas combinadas, referencias, rangos num�ricos y ciclos. No modifica la entrada, ejecuta callbacks ni accede a recursos. Las propiedades desconocidas generan advertencias; `strict: true` las convierte en errores.

**JavaScript**

```js
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

**TypeScript**

```ts
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

El resultado contiene `valid`, `errors`, `warnings`, `deferred` y `truncated`. Cada diagn�stico incluye `path`, `code`, `severity` y `message`. L�mites predeterminados: 100 diagn�sticos, 100 niveles y 50 000 valores inspeccionados. Un l�mite agotado nunca informa de �xito. Los resultados de callbacks, la disponibilidad y decodificaci�n de recursos y el dise�o final se comprueban durante el renderizado. JavaScript debe ser sint�cticamente v�lido antes de llamar a esta API de objetos.

Pasa `{ validation: true }` como segundo argumento a `createPdf` para rechazar definiciones incorrectas antes de cargar recursos. Un documento no v�lido lanza un `DocumentValidationError` con `code: "PDFMAKE_VALIDATION_ERROR"`, `phase: "validation"` y un array `diagnostics`. Los usos existentes siguen siendo compatibles; la comprobaci�n previa es opcional. El playground local la ejecuta autom�ticamente con la biblioteca mejorada.
