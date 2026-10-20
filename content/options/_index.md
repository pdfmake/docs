+++
title = "Rendering options"
description = "Configure font layout caching and PDFKit page buffering through the second createPdf argument."
weight = 30
+++

## Pass options to createPdf

```js
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false
});
```

The options object is separate from the [document definition](/docs/0.3/document-definition-object/).

| Option | Type | Default | Meaning |
| --- | --- | --- | --- |
| `fontLayoutCache` | boolean | `true` | Enable PDFKit's font layout cache |
| `bufferPages` | boolean | `false` | Keep PDFKit pages buffered rather than flushing them immediately |

Keep defaults unless your use case requires a change. Page buffering can increase memory use. It does not make pdfmake's own layout lazy or incremental. See [performance](/docs/0.3/guides/performance/) and [PDFKit's page buffering documentation](https://pdfkit.org/docs/getting_started.html).

Fonts, named table layouts and resource policies are configured on the [public API](/docs/0.3/guides/api-reference/). Paper size, margins and content belong in the definition.
