+++
title = "Node.js quickstart"
description = "Create a complete PDF file in Node.js using pdfmake 0.3, standard fonts and Promise-based output."
weight = 12
+++

## Install

Use Node.js **20 or later**. Create an application and install pdfmake:

```sh
npm init -y
npm install pdfmake@0.3.13
```

The exact version makes this example reproducible. Check release notes and test before choosing a newer patch.

## Write your first PDF

Save this complete example as `first-pdf.cjs`, then run `node first-pdf.cjs`.

```js
// docs-test: node-quickstart
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

`write()` resolves when the output file has closed. Handle rejected Promises so failed generation cannot silently produce a successful API response.

Helvetica needs no local font files, so the example denies external URLs and allows only the standard font identifiers through the local policy. The current implementation checks these identifiers even though they are not file paths. Standard fonts have limited character coverage. For multilingual documents, [register suitable font files](/docs/0.3/fonts/) and explicitly allow their resolved paths.

## Return PDF bytes from an API

```js
const buffer = await pdfmake.createPdf({
  defaultStyle: { font: 'Helvetica' },
  content: ['API document']
}).getBuffer();

// Adapt these lines to your HTTP framework:
response.setHeader('Content-Type', 'application/pdf');
response.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
response.end(buffer);
```

This snippet assumes `pdfmake` is configured as above and `response` is your framework's response object. Validate request data before building a definition. Construct a fresh definition for each request; layout mutates it.

## ESM applications

The Node package exports a configured singleton. In an ESM application use `import pdfmake from 'pdfmake'`; do not instantiate it with `new PdfPrinter(...)` as in older examples. Register fonts and policies once during application startup. Avoid changing singleton configuration per concurrent request.

## Next steps

[Output methods](/docs/0.3/getting-started/server-side/methods/) · [Resource access](/docs/0.3/guides/resource-security/) · [Invoice recipe](/docs/0.3/guides/invoice/)
