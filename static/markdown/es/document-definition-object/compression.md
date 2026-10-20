# Compresión

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/document-definition-object/compression/

## Comportamiento predeterminado

La compresión de los flujos PDF está activada de forma predeterminada. Para desactivarla durante una inspección:

**JavaScript**

```js
var docDefinition = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

`compress` es un campo de la definición del documento, no del objeto de opciones de `createPdf`. Al desactivarlo, el tamaño de salida suele aumentar. No elimina la incrustación de fuentes ni los datos de imagen, y no sirve para reducir la memoria de maquetación. Consulta [rendimiento](/docs/0.3/es/guides/performance/) para obtener indicaciones sobre cómo medirlo.
