# Background-layer

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/document-definition-object/background-layer/

The background-layer will be added on every page.

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

It may contain any other object as well (images, tables, ...) or be dynamically generated:

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
