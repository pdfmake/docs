+++
title = "Background-layer"
description = "Configure background-layer in pdfmake 0.3 with examples, options and usage notes."
weight = 2060
alwaysopen = true
+++


The background-layer will be added on every page.

```js
var docDefinition = {
  background: 'simple text',

  content: ['Example document content']
};
```

It may contain any other object as well (images, tables, ...) or be dynamically generated:

```js
var docDefinition = {
  background: function(currentPage, pageSize) {
    return `page ${currentPage} with size ${pageSize.width} x ${pageSize.height}`
  },

  content: ['Example document content']
};
```
