# Plano de fundo

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/background-layer/

O plano de fundo é adicionado a todas as páginas.

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

Ele também pode conter qualquer outro objeto, como imagens e tabelas, ou ser gerado dinamicamente:

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
