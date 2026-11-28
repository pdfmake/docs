# Capa de fondo

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/document-definition-object/background-layer/

La capa de fondo se añade a todas las páginas.

**JavaScript**

```js
var docDefinition = {
  background: 'simple text',

  content: ['Example document content']
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  background: 'simple text',

  content: ['Example document content']
};
```

También puede contener cualquier otro objeto (imágenes, tablas, etc.) o generarse dinámicamente:

**JavaScript**

```js
var docDefinition = {
  background: function(currentPage, pageSize) {
    return `page ${currentPage} with size ${pageSize.width} x ${pageSize.height}`
  },

  content: ['Example document content']
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  background: function(currentPage, pageSize) {
    return `page ${currentPage} with size ${pageSize.width} x ${pageSize.height}`
  },

  content: ['Example document content']
};
```
