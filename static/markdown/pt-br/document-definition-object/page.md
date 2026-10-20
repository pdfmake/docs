# Dimensões, orientação e margens da página

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/page/

**JavaScript**

```js
var docDefinition = {
  // a string or { width: number, height: number }
  pageSize: 'A5',

  // by default we use portrait, you can change it to landscape if you wish
  pageOrientation: 'landscape',

  // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
  pageMargins: [ 40, 60, 40, 60 ],
  content: ['Page size, orientation and margins.']
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  // a string or { width: number, height: number }
  pageSize: 'A5',

  // by default we use portrait, you can change it to landscape if you wish
  pageOrientation: 'landscape',

  // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
  pageMargins: [ 40, 60, 40, 60 ],
  content: ['Page size, orientation and margins.']
};
```

Se você definir `pageSize` como uma string, pode usar um dos valores a seguir:

* `'4A0'`, `'2A0'`, `'A0'`, `'A1'`, `'A2'`, `'A3'`, `'A4'`, `'A5'`, `'A6'`, `'A7'`, `'A8'`, `'A9'`, `'A10'`,
* `'B0'`, `'B1'`, `'B2'`, `'B3'`, `'B4'`, `'B5'`, `'B6'`, `'B7'`, `'B8'`, `'B9'`, `'B10'`,
* `'C0'`, `'C1'`, `'C2'`, `'C3'`, `'C4'`, `'C5'`, `'C6'`, `'C7'`, `'C8'`, `'C9'`, `'C10'`,
* `'RA0'`, `'RA1'`, `'RA2'`, `'RA3'`, `'RA4'`,
* `'SRA0'`, `'SRA1'`, `'SRA2'`, `'SRA3'`, `'SRA4'`,
* `'EXECUTIVE'`, `'FOLIO'`, `'LEGAL'`, `'LETTER'`, `'TABLOID'`

Para mudar a orientação da página durante o documento, adicione uma quebra de página com a nova orientação.

**JavaScript**

```js
var dd = {
  pageOrientation: 'portrait',
  content: [
    {text: 'Text on Portrait'},
    {text: 'Text on Landscape', pageOrientation: 'landscape', pageBreak: 'before'},
    {text: 'Text on Landscape 2', pageOrientation: 'portrait', pageBreak: 'after'},
    {text: 'Text on Portrait 2'},
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  pageOrientation: 'portrait',
  content: [
    {text: 'Text on Portrait'},
    {text: 'Text on Landscape', pageOrientation: 'landscape', pageBreak: 'before'},
    {text: 'Text on Landscape 2', pageOrientation: 'portrait', pageBreak: 'after'},
    {text: 'Text on Portrait 2'},
  ]
};
```

Altura automática da página:

**JavaScript**

```js
var dd = {
  pageSize: {
    width: 595.28,
    height: 'auto'
  },
  content: [
    // ...
  ]
}
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  pageSize: {
    width: 595.28,
    height: 'auto'
  },
  content: [
    // ...
  ]
}
```

## Controle dinamicamente as quebras de página, por exemplo, para evitar títulos órfãos

É possível especificar uma função `pageBreakBefore` para determinar se uma quebra de página deve ser inserida antes de um nó. Para implementar uma regra que evite um título órfão, use uma definição como esta:

**JavaScript**

```js
var dd = {
    content: [
       {text: '1 Headline', headlineLevel: 1},
       'Some long text of variable length ...',
       {text: '2 Headline', headlineLevel: 1},
       'Some long text of variable length ...',
       {text: '3 Headline', headlineLevel: 1},
       'Some long text of variable length ...',
    ],
  pageBreakBefore: function(currentNode, nodeContainer) {
    // nodeContainer.getFollowingNodesOnPage();
    // nodeContainer.getNodesOnNextPage();
    // nodeContainer.getPreviousNodesOnPage();

    return currentNode.headlineLevel === 1 && nodeContainer.getFollowingNodesOnPage().length === 0;
  }
}
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
    content: [
       {text: '1 Headline', headlineLevel: 1},
       'Some long text of variable length ...',
       {text: '2 Headline', headlineLevel: 1},
       'Some long text of variable length ...',
       {text: '3 Headline', headlineLevel: 1},
       'Some long text of variable length ...',
    ],
  pageBreakBefore: function(currentNode, nodeContainer) {
    // nodeContainer.getFollowingNodesOnPage();
    // nodeContainer.getNodesOnNextPage();
    // nodeContainer.getPreviousNodesOnPage();

    return currentNode.headlineLevel === 1 && nodeContainer.getFollowingNodesOnPage().length === 0;
  }
}
```

Se `pageBreakBefore` retornar `true`, será adicionada uma quebra de página antes de `currentNode`. O nó atual tem as informações a seguir:

**JavaScript**

```js
const currentNode = {
   id: '<as specified in doc definition>',
   headlineLevel: '<as specified in doc definition>',
   text: '<as specified in doc definition>',
   ul: '<as specified in doc definition>',
   ol: '<as specified in doc definition>',
   table: '<as specified in doc definition>',
   image: '<as specified in doc definition>',
   qr: '<as specified in doc definition>',
   canvas: '<as specified in doc definition>',
   columns: '<as specified in doc definition>',
   style: '<as specified in doc definition>',
   pageOrientation: '<as specified in doc definition>',
   pageNumbers: [2, 3], // The pages this element is visible on (e.g. multi-line text could be on more than one page)
   pages: 6, // the total number of pages of this document
   stack: false, // if this is an element which encapsulates multiple sub-objects
   startPosition: {
     pageNumber: 2, // the page this node starts on
     pageOrientation: 'landscape', // the orientation of this page
     left: 60, // the left position
     right: 60, // the right position
     verticalRatio: 0.2, // the ratio of space used vertically in this document (excluding margins)
     horizontalRatio: 0.0  // the ratio of space used horizontally in this document (excluding margins)
   }
};
```

**TypeScript**

```ts
const currentNode = {
   id: '<as specified in doc definition>',
   headlineLevel: '<as specified in doc definition>',
   text: '<as specified in doc definition>',
   ul: '<as specified in doc definition>',
   ol: '<as specified in doc definition>',
   table: '<as specified in doc definition>',
   image: '<as specified in doc definition>',
   qr: '<as specified in doc definition>',
   canvas: '<as specified in doc definition>',
   columns: '<as specified in doc definition>',
   style: '<as specified in doc definition>',
   pageOrientation: '<as specified in doc definition>',
   pageNumbers: [2, 3], // The pages this element is visible on (e.g. multi-line text could be on more than one page)
   pages: 6, // the total number of pages of this document
   stack: false, // if this is an element which encapsulates multiple sub-objects
   startPosition: {
     pageNumber: 2, // the page this node starts on
     pageOrientation: 'landscape', // the orientation of this page
     left: 60, // the left position
     right: 60, // the right position
     verticalRatio: 0.2, // the ratio of space used vertically in this document (excluding margins)
     horizontalRatio: 0.0  // the ratio of space used horizontally in this document (excluding margins)
   }
};
```
