# Migrar desde 0.1/0.2

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/migration-from-0.1/

## Actualizar de forma deliberada

Fija la versión que estés evaluando. Conserva algunos PDF representativos existentes y las entradas y fuentes usadas para generarlos. Antes de actualizar producción, compara el texto extraído, el número de páginas y las páginas renderizadas. La igualdad byte a byte suele ser inadecuada porque los metadatos y los identificadores del PDF pueden variar.

## Sustituir la API constructora de Node

Los ejemplos antiguos de Node crean una instancia de `PdfPrinter` y llaman a `createPdfKitDocument`. En 0.3, usa el singleton:

**JavaScript**

```js
const pdfmake = require('pdfmake');
pdfmake.addFonts(fonts);
await pdfmake.createPdf(docDefinition).write('document.pdf');
```

**TypeScript**

```ts
import pdfmake from "pdfmake";
pdfmake.addFonts(fonts);
await pdfmake.createPdf(docDefinition).write('document.pdf');
```

`fonts` debe ser un mapa de familias válido, como se muestra en el [inicio rápido de Node](/docs/0.3/es/getting-started/server-side/) y en la [guía de fuentes](/docs/0.3/es/fonts/). Configura las políticas y distribuciones durante el inicio, y evita cambiar por solicitud el estado compartido del singleton.

## Esperar los métodos de salida

Sustituye la salida del navegador basada en callbacks por Promises:

**JavaScript**

```js
const data = await pdfMake.createPdf(docDefinition).getBase64();
```

**TypeScript**

```ts
const data = await pdfMake.createPdf(docDefinition).getBase64();
```

Gestiona los rechazos de los métodos de salida. Consulta los [métodos de Node](/docs/0.3/es/getting-started/server-side/methods/) o los [métodos del navegador](/docs/0.3/es/getting-started/client-side/methods/) según el entorno de ejecución de destino.

## Volver a generar el almacenamiento de fuentes del navegador

Vuelve a generar los archivos VFS personalizados y actualiza el registro para usar `addVirtualFileSystem`. No des por sentado que el formato de un archivo de fuentes generado antiguo coincida con el paquete actual. Consulta [fuentes VFS](/docs/0.3/es/fonts/custom-fonts-client-side/vfs/).

## Actualizar pageBreakBefore

Las versiones 0.1/0.2 pasaban matrices de nodos separadas. La versión 0.3 pasa un contenedor de nodos:

**JavaScript**

```js
var dd = { content: ['Example document'],
pageBreakBefore: function (currentNode, nodeContainer) {
  return currentNode.headlineLevel === 1 &&
    nodeContainer.getFollowingNodesOnPage().length === 0;
}
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: ['Example document'],
pageBreakBefore: function (currentNode, nodeContainer) {
  return currentNode.headlineLevel === 1 &&
    nodeContainer.getFollowingNodesOnPage().length === 0;
}
};
```

El contenedor también ofrece `getNodesOnNextPage()` y `getPreviousNodesOnPage()`. Este fragmento es una propiedad de una definición, no código JavaScript independiente. Consulta [saltos de página](/docs/0.3/es/document-definition-object/page/).

## Configurar el acceso a recursos

Para la versión **0.3.6 o posterior**, configura una política síncrona de acceso a URL; para la **0.3.8 o posterior**, configura una política de archivos locales. Prueba tanto los recursos permitidos como los rechazados. Consulta [seguridad de recursos](/docs/0.3/es/guides/resource-security/).
