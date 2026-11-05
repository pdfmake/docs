# Métodos de salida en el navegador

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/getting-started/client-side/methods/

## Crear un documento

Después de [cargar el motor y las fuentes](/docs/0.3/es/getting-started/client-side/):

**JavaScript**

```js
const output = pdfMake.createPdf(docDefinition, options);
```

**TypeScript**

```ts
const output = pdfMake.createPdf(docDefinition, options);
```

El segundo argumento opcional contiene las [opciones de renderizado](/docs/0.3/es/options/). `createPdf` devuelve inmediatamente un contenedor de salida. Los métodos de salida devuelven Promises; gestiona sus rechazos.

## Elegir un formato de salida

| Método | Se resuelve como | Comportamiento |
| --- | --- | --- |
| `download(filename?)` | `undefined` | Inicia una descarga; el nombre predeterminado es `file.pdf` |
| `open(window?)` | `undefined` | Navega a un PDF generado en una ventana nueva o proporcionada |
| `print(window?)` | `undefined` | Abre un PDF con una acción de impresión; el comportamiento depende del visor |
| `getBlob()` | `Blob` | Datos binarios con el tipo MIME `application/pdf` |
| `getBuffer()` | Bytes compatibles con Buffer | Bytes PDF sin procesar |
| `getBase64()` | `string` | PDF codificado en Base64 |
| `getDataUrl()` | `string` | URL de datos Base64 |
| `getStream()` | Flujo de PDFKit | Salida de bajo nivel; normalmente conviene usar Blob o bytes |

**JavaScript**

```js
try {
  await pdfMake.createPdf(docDefinition).download('report.pdf');
} catch (error) {
  console.error('PDF generation failed', error);
}
```

**TypeScript**

```ts
try {
  await pdfMake.createPdf(docDefinition).download('report.pdf');
} catch (error) {
  console.error('PDF generation failed', error);
}
```

Que la Promise de descarga se resuelva no confirma que el usuario haya guardado el archivo. La impresión depende del navegador y del visor PDF; no cuentes con una impresión silenciosa.

## Abrir después de un proceso asíncrono

Abre la ventana directamente en el controlador de clic del usuario, antes de esperar los datos. De lo contrario, los bloqueadores de ventanas emergentes podrían impedirlo.

**JavaScript**

```js
async function openReport() {
  const win = window.open('', '_blank');
  if (!win) throw new Error('Allow popups to open the PDF');
  try {
    const response = await fetch('/report-data');
    if (!response.ok) throw new Error('Could not load report data');
    const data = await response.json();
    const definition = { content: [String(data.title)] };
    await pdfMake.createPdf(definition).open(win);
  } catch (error) {
    win.close();
    throw error;
  }
}
```

**TypeScript**

```ts
async function openReport() {
  const win = window.open('', '_blank');
  if (!win) throw new Error('Allow popups to open the PDF');
  try {
    const response = await fetch('/report-data');
    if (!response.ok) throw new Error('Could not load report data');
    const data = await response.json();
    const definition = { content: [String(data.title)] };
    await pdfMake.createPdf(definition).open(win);
  } catch (error) {
    win.close();
    throw error;
  }
}
```

Llama a `openReport` desde el controlador de clic de la aplicación y gestiona el rechazo de su Promise. Para imprimir, sustituye `.open(win)` por `.print(win)`. Pasar `window` navega por la pestaña actual. Establece el [título de los metadatos](/docs/0.3/es/document-definition-object/document-medatadata/) del documento para asignar un nombre al PDF; los nombres y títulos que muestra el visor dependen del navegador.

## Gestionar URL de Blob

**JavaScript**

```js
const blob = await pdfMake.createPdf(docDefinition).getBlob();
const url = URL.createObjectURL(blob);
document.querySelector('#preview').src = url;
// Revoke url when replacing the preview or removing it, after it is no longer needed.
```

**TypeScript**

```ts
const blob = await pdfMake.createPdf(docDefinition).getBlob();
const url = URL.createObjectURL(blob);
document.querySelector('#preview').src = url;
// Revoke url when replacing the preview or removing it, after it is no longer needed.
```

Mantén la URL activa mientras el visor la use. Llama a `URL.revokeObjectURL(url)` durante la limpieza. Usa un contenedor de salida nuevo para cada renderizado. Evita mezclar el consumo manual del flujo con los métodos de búfer o Blob en la misma salida.

## Política de acceso a URL

Desde la versión **0.3.6**, `setUrlAccessPolicy(callback)` acepta una función de retorno síncrono booleano. No es un entorno de red completamente aislado y las redirecciones del navegador pueden producirse antes de que se compruebe la URL final. Consulta [seguridad de recursos](/docs/0.3/es/guides/resource-security/).

## Caché de recursos URL {#url-resource-caching}

Disponible en la rama de desarrollo original para **0.3.14**; no está en el motor 0.3.13 fijado para el playground.

`setUrlResourceCaching(enabled)` requiere un booleano y usa `false` por defecto. El campo `cache` de un objeto URL reemplaza la configuración global. Las entradas compartidas existentes siguen siendo legibles con `cache: false`; no fuerza una descarga.

**JavaScript**

```js
pdfMake.setUrlResourceCaching(true);
pdfMake.createPdf(docDefinition).download();
```

**TypeScript**

```ts
pdfMake.setUrlResourceCaching(true);
pdfMake.createPdf(docDefinition).download();
```

Las nuevas descargas se guardan por documento de forma predeterminada. `cache: true` guarda los nuevos datos en la caché compartida en memoria para documentos posteriores; `cache: false` sigue permitiendo leer una entrada compartida existente. Las URL de texto y los objetos sin `cache` usan la configuración global. La caché HTTP del navegador es independiente.

Consulta [Caché de recursos URL](/docs/0.3/es/getting-started/server-side/methods/#url-resource-caching) para conocer su configuración y seguridad.

## Vaciar la caché de recursos URL {#clear-url-resource-cache}

Disponible en la rama de desarrollo original para **0.3.14**; no está en el motor 0.3.13 fijado para el playground.

Llama a `clearUrlResourceCache()` de forma síncrona entre generaciones, cuando termine el trabajo activo. Elimina entradas HTTP/HTTPS compartidas, conserva otros archivos VFS y la configuración de caché, y no vacía la caché HTTP del navegador. Consulta [Vaciar la caché de recursos URL](/docs/0.3/es/getting-started/server-side/methods/#clear-url-resource-cache).

**JavaScript**

```js
pdfMake.clearUrlResourceCache();
pdfMake.createPdf(docDefinition).download();
```

**TypeScript**

```ts
pdfMake.clearUrlResourceCache();
pdfMake.createPdf(docDefinition).download();
```
