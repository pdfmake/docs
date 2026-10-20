# Compression

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/document-definition-object/compression/

## Default behavior

PDF stream compression is enabled by default. To disable it for inspection:

**JavaScript**

```js
var docDefinition = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

`compress` is a boolean field on the document definition, not the `createPdf` options object. Disabling it generally increases output size. It does not remove font embedding or image data and is not a way to reduce layout memory. See [performance](/docs/0.3/guides/performance/) for measurement guidance.
