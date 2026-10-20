+++
title = "Migration from 0.1/0.2"
description = "Migrate older pdfmake integrations to the 0.3 singleton API, Promise output methods, font registration and page-break callbacks."
weight = 40
+++

## Upgrade deliberately

Pin the version you are evaluating. Keep representative existing PDFs and the inputs/fonts used to generate them. Compare extracted text, page counts and rendered pages before upgrading production. Byte equality is often unsuitable because PDF metadata and identifiers can vary.

## Replace the Node constructor API

Older Node examples construct `PdfPrinter` and call `createPdfKitDocument`. In 0.3 use the singleton:

```js
const pdfmake = require('pdfmake');
pdfmake.addFonts(fonts);
await pdfmake.createPdf(docDefinition).write('document.pdf');
```

`fonts` must be a valid family map, as shown in the [Node quickstart](/docs/0.3/getting-started/server-side/) and [fonts guide](/docs/0.3/fonts/). Configure policies and layouts during startup, and avoid per-request changes to shared singleton state.

## Await output helpers

Replace callback-based browser output with Promises:

```js
const data = await pdfMake.createPdf(docDefinition).getBase64();
```

Handle rejections from output methods. Use [Node methods](/docs/0.3/getting-started/server-side/methods/) or [browser methods](/docs/0.3/getting-started/client-side/methods/) for the runtime you target.

## Regenerate browser font storage

Regenerate custom VFS files and update registration to `addVirtualFileSystem`. Do not assume the shape of an older generated font file matches the current bundle. See [VFS fonts](/docs/0.3/fonts/custom-fonts-client-side/vfs/).

## Update pageBreakBefore

Version 0.1/0.2 passed separate node arrays. Version 0.3 passes a node container:

```js
pageBreakBefore: function (currentNode, nodeContainer) {
  return currentNode.headlineLevel === 1 &&
    nodeContainer.getFollowingNodesOnPage().length === 0;
}
```

The container also offers `getNodesOnNextPage()` and `getPreviousNodesOnPage()`. This snippet is a property inside a definition, not standalone JavaScript. See [page breaks](/docs/0.3/document-definition-object/page/).

## Configure resource access

For **0.3.6+**, configure a synchronous URL access policy; for **0.3.8+**, configure a local file policy. Test both permitted and rejected resources. See [resource security](/docs/0.3/guides/resource-security/).
