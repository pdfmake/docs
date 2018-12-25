+++
title = "Headers and footers"
description = ""
weight = 25
alwaysopen = true
+++


Page headers and footers in pdfmake can be: *static* or *dynamic*.

They use the same syntax:

```js
var docDefinition = {
  header: 'simple text',

  footer: {
    columns: [
      'Left part',
      { text: 'Right part', alignment: 'right' }
    ]
  },

  content: (...)
};
```

For dynamically generated content (including page numbers, page count and page size) you can pass a function to the header or footer:

```js
var docDefinition = {
  footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
  header: function(currentPage, pageCount, pageSize) {
    // you can apply any logic and return any valid pdfmake element

    return [
      { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
      { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
    ]
  },
  (...)
};
```