# Listes

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/lists/

pdfmake prend en charge les listes numérotées et à puces :

**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
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
