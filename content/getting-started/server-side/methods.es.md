+++
sourceDigest = "f0daec88513f195e653aeface6a0c5a92da517ba092a13919c74940aa3169a09"
title = "Métodos de salida en Node.js"
description = "Referencia de createPdf, Buffer, base64, salida a archivos, flujos y políticas de recursos en pdfmake 0.3."
weight = 12
+++

## Crear un documento

```js
const output = pdfmake.createPdf(docDefinition, options);
```

`docDefinition` es una [definición de documento](/docs/0.3/es/document-definition-object/). `options` es un [objeto de opciones](/docs/0.3/es/options/) opcional. `createPdf` devuelve inmediatamente un contenedor de salida; los errores de generación rechazan la Promise del método de salida. Los tipos de argumentos no válidos pueden producir una excepción síncrona.

## Métodos de salida

| Método | Se resuelve como | Uso |
| --- | --- | --- |
| `write(filename)` | `undefined` | Escribe un archivo y espera a que se cierre |
| `getBuffer()` | `Buffer` | Devuelve bytes PDF desde una API |
| `getBase64()` | `string` | Codifica los bytes en Base64 |
| `getDataUrl()` | `string` | Antepone `data:application/pdf;base64,` a Base64 |
| `getStream()` | Flujo de documento PDFKit | Gestiona directamente un flujo |

```js
try {
  const output = pdfmake.createPdf(docDefinition);
  const bytes = await output.getBuffer();
  // Send or store bytes here.
} catch (error) {
  // Report generation failure to your caller.
}
```

`getBuffer()` almacena en caché su Promise; `getBase64()` y `getDataUrl()` reutilizan esos bytes. Crea un contenedor de salida nuevo para un renderizado independiente. No combines el consumo manual del flujo con los métodos de búfer o archivo en el mismo contenedor.

## Consumir un flujo

```js
const stream = await pdfmake.createPdf(docDefinition).getStream();
stream.on('error', error => { /* Handle generation errors. */ });
destination.on('error', error => { /* Handle destination errors. */ });
stream.pipe(destination);
stream.end();
```

`destination` debe ser un flujo escribible gestionado por la aplicación. Añade los listeners antes de llamar a `end()`. Para un archivo sencillo, es preferible usar `write()`. La salida en flujo no hace que la maquetación del documento sea incremental: pdfmake sigue maquetando el documento antes de devolver este flujo.

## Política de acceso a URL

Disponible desde la versión **0.3.6**. Configúrala antes de crear documentos:

```js
pdfmake.setUrlAccessPolicy(url => {
  const parsed = new URL(url);
  return parsed.protocol === 'https:' && parsed.hostname === 'assets.example.com';
});
```

Para permitir una URL, el callback debe devolver el valor booleano `true` **de forma síncrona**. Una función `async` devuelve una Promise y la implementación actual la rechaza. Una lista de permitidos es solo una capa de protección contra SSRF; usa controles de red o proporciona bytes validados cuando proceses entradas que no sean de confianza. Consulta [seguridad de recursos](/docs/0.3/es/guides/resource-security/).

## Política de acceso a archivos locales

Disponible desde la versión **0.3.8**. Si todos los recursos están incrustados, deniega el acceso a archivos locales:

```js
pdfmake.setLocalAccessPolicy(() => false);
```

Para fuentes o imágenes locales, permite las rutas resueltas exactas en lugar de un prefijo de cadena. Consulta la [configuración completa de fuentes locales](/docs/0.3/es/fonts/). `undefined` borra una política configurada; omitir la política no equivale a denegar todo.
