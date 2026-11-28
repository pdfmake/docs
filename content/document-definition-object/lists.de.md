+++
title = "Listen"
description = "Erstelle nummerierte und Aufzählungslisten in pdfmake 0.3 und passe Farben und Aufzählungszeichen an."
weight = 2040
alwaysopen = true
sourceDigest = "5a9a9e5b03459677b99b2dbeeb26d15d6298dfb3e0c88a8c5e2b43ed48383e8f"
+++

pdfmake unterstützt sowohl nummerierte Listen als auch Aufzählungslisten:

```js
var docDefinition = {
  content: [
    'Bulleted list example:',
    {
      // to treat a paragraph as a bulleted list, set an array of items under the ul key
      ul: [
        'Item 1',
        'Item 2',
        'Item 3',
        { text: 'Item 4', bold: true },
      ]
    },

    'Numbered list example:',
    {
      // for numbered lists set the ol key
      ol: [
        'Item 1',
        'Item 2',
        'Item 3'
      ]
    },

    'Colored unordered list:',
    {
      color: 'blue',
      ul: [
          'item 1',
          'item 2',
          'item 3'
      ]
    },

    'Colored unordered list with own marker color:',
    {
      color: 'blue',
      markerColor: 'red',
      ul: [
          'item 1',
          'item 2',
          { text: 'item 3 with custom marker color', markerColor: 'lime' } // Minimal pdfmake version: 0.3.2
      ]
    },

    'Colored ordered list',
    {
      color: 'blue',
      ol: [
          'item 1',
          'item 2',
          'item 3'
      ]
    },
    'Colored ordered list with own marker color:',
    {
      color: 'blue',
      markerColor: 'red',
      ol: [
          'item 1',
          'item 2',
          { text: 'item 3 with custom marker color', markerColor: 'lime' } // Minimal pdfmake version: 0.3.2
      ]
    },
  ]
};
```
