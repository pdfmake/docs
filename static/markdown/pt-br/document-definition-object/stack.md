# Pilha de parágrafos

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/stack/

Como você já deve ter percebido pelos exemplos, quando a chave `content` recebe um array, o documento se torna uma pilha de parágrafos.

É comum reutilizar essa estrutura em um elemento aninhado, como no exemplo a seguir:

**JavaScript**

```js
var docDefinition = {
  content: [
    'paragraph 1',
    'paragraph 2',
    {
      columns: [
        'first column is a simple text',
        [
          // second column consists of paragraphs
          'paragraph A',
          'paragraph B',
          'these paragraphs will be rendered one below another inside the column'
        ]
      ]
    }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: [
    'paragraph 1',
    'paragraph 2',
    {
      columns: [
        'first column is a simple text',
        [
          // second column consists of paragraphs
          'paragraph A',
          'paragraph B',
          'these paragraphs will be rendered one below another inside the column'
        ]
      ]
    }
  ]
};
```

O problema de um array é que não é possível adicionar propriedades de estilo diretamente a ele (por exemplo, para alterar `fontSize`).

A boa notícia é que o array é apenas um atalho do pdfmake para `{ stack: [] }`. Portanto, para reaplicar estilo à pilha inteira, use a definição expandida:

**JavaScript**

```js
var docDefinition = {
  content: [
    'paragraph 1',
    'paragraph 2',
    {
      columns: [
        'first column is a simple text',
        {
          stack: [
            // second column consists of paragraphs
            'paragraph A',
            'paragraph B',
            'these paragraphs will be rendered one below another inside the column'
          ],
          fontSize: 15
        }
      ]
    }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: [
    'paragraph 1',
    'paragraph 2',
    {
      columns: [
        'first column is a simple text',
        {
          stack: [
            // second column consists of paragraphs
            'paragraph A',
            'paragraph B',
            'these paragraphs will be rendered one below another inside the column'
          ],
          fontSize: 15
        }
      ]
    }
  ]
};
```
