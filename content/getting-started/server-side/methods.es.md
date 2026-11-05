+++
sourceDigest = "ff47a732e18c9c08cfc98efcc0de158311bc3d96ebe7d1ca0c1d2deea2cf6c72"
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

Disponible en la rama de desarrollo original para **0.3.14**; no está en el motor 0.3.13 fijado para el playground.

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

Disponible en la rama de desarrollo original para **0.3.14**; no está en el motor 0.3.13 fijado para el playground.

`clearUrlResourceCache()` no recibe parámetros y elimina de forma síncrona las entradas compartidas que empiezan por `http://` o `https://`, sin distinguir mayúsculas. Conserva otros archivos VFS, recursos propios del documento y la configuración global de caché. Llámalo entre generaciones cuando termine el trabajo activo; no cancela descargas en curso ni vacía la caché HTTP del navegador.

```js
pdfmake.clearUrlResourceCache();
pdfmake.createPdf(docDefinition).write('document.pdf');
```
