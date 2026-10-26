# Hintergrundebene

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/document-definition-object/background-layer/

Die Hintergrundebene wird auf jeder Seite eingefügt.

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

Sie kann auch jedes andere Objekt enthalten (Bilder, Tabellen usw.) oder dynamisch erzeugt werden:

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
