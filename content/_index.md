+++
title = "pdfmake documentation"
description = "Generate PDFs with pdfmake 0.3 in Node.js and browsers. Start with tested examples and explore the document reference."
weight = 0
+++

Build a PDF in three steps: configure the runtime, describe the content, then request an output.

## 1. Choose your runtime

<div class="runtime-picker" data-runtime-picker role="tablist" aria-label="Runtime"><button type="button" role="tab" id="runtime-node" aria-controls="panel-node" data-runtime="node" aria-selected="true">Node.js / API</button><button type="button" role="tab" id="runtime-browser" aria-controls="panel-browser" data-runtime="browser" aria-selected="false">Browser</button></div>
<div data-runtime-panel="node" role="tabpanel" id="panel-node" aria-labelledby="runtime-node">

Use Node.js 20 or later. Install the pinned version below, save the complete example as `first-pdf.cjs`, then run `node first-pdf.cjs`.

```sh
npm install pdfmake@0.3.12
```

```js
const pdfmake = require('pdfmake');

const fonts = require('pdfmake/standard-fonts/Helvetica');
pdfmake.addFonts(fonts);
pdfmake.setUrlAccessPolicy(() => false);
const standardNames = new Set(Object.values(fonts.Helvetica));
pdfmake.setLocalAccessPolicy(name => standardNames.has(name));

async function main() {
  const definition = {
    defaultStyle: { font: 'Helvetica' },
    content: [
      { text: 'Hello, pdfmake!', fontSize: 24, bold: true },
      'Your first PDF, generated in Node.js.'
    ]
  };
  await pdfmake.createPdf(definition).write('document.pdf');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
```

[Node.js quickstart](/docs/0.3/getting-started/server-side/)

</div>
<div data-runtime-panel="browser" role="tabpanel" id="panel-browser" aria-labelledby="runtime-browser">

The browser needs the engine and fonts, loaded in that order. The complete quickstart includes a download button and error handling.

[Browser quickstart](/docs/0.3/getting-started/client-side/)

</div>

## 2. Understand the definition

A definition is a JavaScript object, not HTML. `content` lists blocks in reading order. This example generates exactly the PDF shown. Open it in the playground to edit it, then return here without losing your workspace.

{{< example id="welcome" >}}

## 3. Continue with the right building block

- [Your first PDF](/docs/0.3/learn/first-pdf/)
- [The document model](/docs/0.3/learn/document-model/)
- [Styling](/docs/0.3/document-definition-object/styling/)
- [Tables](/docs/0.3/document-definition-object/tables/)
- [Fonts and character coverage](/docs/0.3/fonts/)
- [Errors and diagnostics](/docs/0.3/guides/errors/)

Use a fresh definition for every generation; layout mutates the object. Output methods return Promises: await them and handle failures.
