# Sumário

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/toc/

## Marque títulos para incluí-los

**JavaScript**

```js
var docDefinition = {
  content: [
    { toc: { title: { text: 'Contents', fontSize: 20, bold: true }, numberStyle: { bold: true } } },
    { text: 'Introduction', tocItem: true, fontSize: 18, margin: [0, 20, 0, 10] },
    'Document body',
    { text: 'Details', tocItem: true, pageBreak: 'before', fontSize: 18 }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: [
    { toc: { title: { text: 'Contents', fontSize: 20, bold: true }, numberStyle: { bold: true } } },
    { text: 'Introduction', tocItem: true, fontSize: 18, margin: [0, 20, 0, 10] },
    'Document body',
    { text: 'Details', tocItem: true, pageBreak: 'before', fontSize: 18 }
  ]
};
```

O nó `toc` insere a lista gerada; `tocItem` marca os nós de texto a incluir. Os números de página são calculados durante o layout.

## Vários sumários

Cada sumário é um nó de conteúdo separado. Use IDs para escolher em qual lista cada item aparecerá:

**JavaScript**

```js
var docDefinition = {
  content: [
    { toc: { id: 'main', title: 'All sections' } },
    { toc: { id: 'details', title: 'Detailed sections' } },
    { text: 'Overview', tocItem: 'main' },
    { text: 'Technical details', tocItem: ['main', 'details'], pageBreak: 'before' }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: [
    { toc: { id: 'main', title: 'All sections' } },
    { toc: { id: 'details', title: 'Detailed sections' } },
    { text: 'Overview', tocItem: 'main' },
    { text: 'Technical details', tocItem: ['main', 'details'], pageBreak: 'before' }
  ]
};
```

Não coloque duas chaves `toc` no mesmo objeto; o JavaScript mantém somente o último valor.

## Opções de sumário

| Campo | Tipo | Significado |
| --- | --- | --- |
| `id` | string | Identificador de um sumário nomeado |
| `title` | string ou nó de texto | Título opcional |
| `textStyle`, `numberStyle` | objeto de estilo | Estilos do texto da entrada e do número da página |
| `textMargin` | margem | Espaçamento da entrada |
| `hideEmpty` | booleano | Oculta um sumário vazio; padrão `false`, desde 0.3.3 |
| `sortBy` | `'page'` ou `'title'` | Ordenação; padrão `page`, desde 0.3.3 |
| `sortLocale` | string | Localidade para ordenação; por padrão usa a localidade do runtime, desde 0.3.3 |
| `outlines` | booleano | Inclui entradas nos marcadores PDF; desde 0.3.5 |

Em um nó de texto marcado, `tocItem` aceita `true`, um ID de sumário ou um array de IDs. As propriedades `textStyle`, `numberStyle` e `textMargin` do nó de texto podem personalizar sua entrada. Consulte [contornos](/docs/0.3/pt-br/document-definition-object/outlines/) para controlar marcadores.
