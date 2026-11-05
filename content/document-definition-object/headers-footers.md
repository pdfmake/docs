+++
title = "Headers and footers"
description = "Add static or dynamic page headers and footers, with page numbers, total page counts and room reserved in page margins."
weight = 2050
+++

## Add a static header

```js
var docDefinition = {
  pageMargins: [40, 65, 40, 55],
  header: { text: 'Example report', margin: [40, 20, 40, 0] },
  footer: { text: 'Example Studio', alignment: 'center', fontSize: 9 },
  content: ['Document content']
};
```

Headers and footers repeat on pages. Reserve enough top and bottom margin for their contents; they do not automatically enlarge the body margins. Returned content uses normal pdfmake nodes.

## Add page numbers

```js
var docDefinition = {
  pageMargins: [40, 65, 40, 55],
  header: function (currentPage, pageCount, pageSize) {
    return {
      text: 'Report · ' + pageSize.width + ' pt wide',
      alignment: currentPage % 2 ? 'left' : 'right',
      margin: [40, 20, 40, 0],
      fontSize: 9
    };
  },
  footer: function (currentPage, pageCount) {
    return { text: currentPage + ' of ' + pageCount, alignment: 'center', fontSize: 9 };
  },
  content: ['First page', { text: 'Second page', pageBreak: 'before' }]
};
```

Callbacks receive the current page number (starting at 1), total page count and page size. Return a fresh node for each invocation. Keep callbacks deterministic and avoid modifying shared application data.
