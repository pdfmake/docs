+++
title = "Compression"
description = "Control PDF stream compression with the document-level compress flag; enabled by default."
weight = 2280
+++

## Default behavior

PDF stream compression is enabled by default. To disable it for inspection:

```js
var docDefinition = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

`compress` is a boolean field on the document definition, not the `createPdf` options object. Disabling it generally increases output size. It does not remove font embedding or image data and is not a way to reduce layout memory. See [performance](/docs/0.3/guides/performance/) for measurement guidance.
