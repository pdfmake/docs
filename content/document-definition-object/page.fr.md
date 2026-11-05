+++
title = "Dimensions, orientation et marges des pages"
description = "Définissez le format, l’orientation et les marges des pages, et contrôlez les sauts de page automatiques ou explicites."
weight = 2250
alwaysopen = true
sourceDigest = "433a428f2dbdb4d2db7e93f3a845e24637a4e34c5631c1d97f53c9f666b00de9"
+++

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

Si vous définissez `pageSize` sous forme de chaîne, vous pouvez utiliser l’une des valeurs suivantes :

* `'4A0'`, `'2A0'`, `'A0'`, `'A1'`, `'A2'`, `'A3'`, `'A4'`, `'A5'`, `'A6'`, `'A7'`, `'A8'`, `'A9'`, `'A10'`,
* `'B0'`, `'B1'`, `'B2'`, `'B3'`, `'B4'`, `'B5'`, `'B6'`, `'B7'`, `'B8'`, `'B9'`, `'B10'`,
* `'C0'`, `'C1'`, `'C2'`, `'C3'`, `'C4'`, `'C5'`, `'C6'`, `'C7'`, `'C8'`, `'C9'`, `'C10'`,
* `'RA0'`, `'RA1'`, `'RA2'`, `'RA3'`, `'RA4'`,
* `'SRA0'`, `'SRA1'`, `'SRA2'`, `'SRA3'`, `'SRA4'`,
* `'EXECUTIVE'`, `'FOLIO'`, `'LEGAL'`, `'LETTER'`, `'TABLOID'`

Pour changer l’orientation au sein d’un document, insérez un saut de page avec la nouvelle orientation.

```js
{
  pageOrientation: 'portrait',
  content: [
    {text: 'Text on Portrait'},
    {text: 'Text on Landscape', pageOrientation: 'landscape', pageBreak: 'before'},
    {text: 'Text on Landscape 2', pageOrientation: 'portrait', pageBreak: 'after'},
    {text: 'Text on Portrait 2'},
  ]
}
```

Hauteur de page automatique :

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

## Contrôler dynamiquement les sauts de page, par exemple pour éviter les titres orphelins

Vous pouvez spécifier une fonction `pageBreakBefore` qui détermine si un saut de page doit être inséré avant un nœud. Pour appliquer une règle « pas de titre orphelin », utilisez une définition comme celle-ci :

``` javascript
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

Si `pageBreakBefore` renvoie `true`, un saut de page est ajouté avant `currentNode`. Les informations suivantes sont attachées au nœud courant :

``` javascript
{
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
}
```
