# Arrière-plan

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/background-layer/

L’arrière-plan est ajouté à chaque page.

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

Il peut également contenir n’importe quel autre objet (images, tableaux, etc.) ou être généré dynamiquement :

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
