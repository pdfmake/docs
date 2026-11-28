+++
sourceDigest = "14fe2c5c6678f215704170d8fb9d4c48cc2b4e79f68e0c221b0f901e5c7b3dfa"
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

## Política de acceso a URL {#url-access-policy}

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

## Caché de recursos URL {#url-resource-caching}

Disponible desde **0.3.14**.

Usa `setUrlResourceCaching(enabled)` con un booleano obligatorio para compartir nuevas descargas URL entre documentos. El valor predeterminado es `false`. Un objeto de recurso `{ url, headers, cache }` reemplaza esa configuración; `headers` es opcional. Se aplica a fuentes, imágenes, orígenes de adjuntos y archivos incrustados. `false` afecta a generaciones posteriores, conserva las entradas existentes y no reemplaza un `cache: true` explícito. Antes de 0.3.14, las descargas se compartían automáticamente; `true` recupera ese comportamiento.

```js
pdfmake.setUrlResourceCaching(true);

var docDefinition = {
  content: [{ image: 'logo' }, { image: 'photo' }],
  images: {
    // Uses the global caching setting.
    logo: 'https://example.com/logo.png',
    photo: {
      url: 'https://example.com/photo.png',
      headers: { Authorization: 'Bearer token' },
      // Store a new download only for this document.
      cache: false
    }
  }
};

pdfmake.createPdf(docDefinition).write('document.pdf');
```

Las nuevas descargas se guardan por documento de forma predeterminada. `cache: true` guarda los nuevos datos en la caché compartida en memoria para documentos posteriores; `cache: false` sigue permitiendo leer una entrada compartida existente. Las URL de texto y los objetos sin `cache` usan la configuración global. La caché HTTP del navegador es independiente.

La clave de los recursos compartidos es solo la URL, aunque cambien `Authorization` u otras cabeceras. Leer la caché no contacta con el servidor de origen ni vuelve a comprobar allí la autorización. Evita compartir recursos cuyo contenido o autorización dependa de las cabeceras. La [política de acceso URL](#url-access-policy) se aplica a las descargas de red, no a las lecturas de caché.

## Vaciar la caché de recursos URL {#clear-url-resource-cache}

Disponible desde **0.3.14**.

En 0.3.14/0.3.15, la limpieza elimina recursos HTTP/HTTPS compartidos. A partir de **0.3.16**, afecta a todos los esquemas URL registrados actualmente. Conserva otros archivos VFS, recursos propios del documento y la configuración de caché. Llámala entre generaciones, cuando termine el trabajo activo; no cancela descargas ni vacía la caché HTTP del navegador.

```js
pdfmake.clearUrlResourceCache();
pdfmake.createPdf(docDefinition).write('document.pdf');
```

## Descargas URL simultáneas {#url-resource-concurrency}

API de desarrollo original para **0.3.16**; no está disponible en el motor 0.3.15 fijado para el playground.

`setUrlResourceConcurrency(concurrency)` limita las descargas simultáneas por documento de fuentes, imágenes, adjuntos y archivos incrustados. El argumento obligatorio debe ser un entero positivo; el valor predeterminado es `5`. Los cambios afectan a llamadas posteriores a `createPdf()`.

```js
pdfmake.setUrlResourceConcurrency(3);
```

## Protocolos URL {#url-protocols}

API de desarrollo original para **0.3.16**; no está disponible en el motor 0.3.15 fijado para el playground.

`registerUrlProtocol(protocol, handler)` registra o reemplaza un esquema URL; `unregisterUrlProtocol(protocol)` lo elimina y vacía su caché compartida. HTTP y HTTPS están registrados inicialmente. Los nombres no distinguen mayúsculas y admiten dos puntos finales. Sin manejador se usa Fetch; en el navegador también permite esquemas como `blob`.

```js
var fs = require('fs').promises;
var path = require('path');
var assets = {
  'asset://logo': path.join(__dirname, 'images/logo.png')
};

pdfmake.setUrlAccessPolicy(url => Object.prototype.hasOwnProperty.call(assets, url));
pdfmake.registerUrlProtocol('asset', async (url, headers, validateUrlAccessPolicy) => {
  var buffer = await fs.readFile(assets[url]);
  // This handler reads a local file and does not follow redirects.
  return { buffer: buffer, url: url };
});

var docDefinition = {
  content: [{ image: 'logo' }],
  images: { logo: { url: 'asset://logo', cache: true } }
};

pdfmake.createPdf(docDefinition).write('document.pdf');
```

Un manejador recibe `(url, headers, validateUrlAccessPolicy)` y devuelve una promesa de `{ buffer, url }`. Las cabeceras ausentes se pasan como un objeto vacío. Devuelve un `ArrayBuffer` o `Uint8Array` (incluido un `Buffer` de Node) y una URL final no vacía, usando la original si no hubo redirecciones.

La [política de acceso URL](#url-access-policy) debe devolver `true` de forma síncrona. pdfmake comprueba la URL inicial y la devuelta. Antes de cada redirección, el manejador debe llamar a `validateUrlAccessPolicy(targetUrl)`: lanza una excepción si se deniega el acceso y lo permite si no hay política. Los manejadores personalizados deben imponer sus propias restricciones para archivos locales.

Estos protocolos sirven para fuentes, imágenes, adjuntos y archivos incrustados y comparten el [límite de descarga](#url-resource-concurrency) y la [configuración de caché](#url-resource-caching). Los cambios de registro afectan a generaciones posteriores; las activas conservan sus manejadores. Eliminar un manejador HTTP/HTTPS reemplazado no restaura Fetch: llama a `registerUrlProtocol("https")`. Los nombres deben ser esquemas URL válidos y los manejadores proporcionados deben ser funciones.
