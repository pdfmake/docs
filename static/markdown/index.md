# pdfmake documentation

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/

Build a PDF in three steps: configure the runtime, describe the content, then request an output.

## 1. Choose your runtime




Use Node.js 20 or later. Install the pinned version below, save the complete example as `first-pdf.cjs`, then run `node first-pdf.cjs`.

```sh
npm install pdfmake@0.3.13
```

**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfmake from "pdfmake";

const fonts = require('pdfmake/standard-fonts/Helvetica');
pdfmake.addFonts(fonts);
pdfmake.setUrlAccessPolicy(() => false);
const standardNames = new Set(Object.values(fonts.Helvetica));
pdfmake.setLocalAccessPolicy(name => standardNames.has(name));

async function main() {
  const definition: TDocumentDefinitions = {
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




The browser needs the engine and fonts, loaded in that order. The complete quickstart includes a download button and error handling.

[Browser quickstart](/docs/0.3/getting-started/client-side/)



## 2. Understand the definition

A definition is a JavaScript object, not HTML. `content` lists blocks in reading order. This example generates exactly the PDF shown. Open it in the playground to edit it, then return here without losing your workspace.



### Runnable example: 01 · First document

**JavaScript**

```js
// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd: TDocumentDefinitions = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/playground/?example=welcome)



## 3. Continue with the right building block

- [Your first PDF](/docs/0.3/learn/first-pdf/)
- [The document model](/docs/0.3/learn/document-model/)
- [Styling](/docs/0.3/document-definition-object/styling/)
- [Tables](/docs/0.3/document-definition-object/tables/)
- [Fonts and character coverage](/docs/0.3/fonts/)
- [Errors and diagnostics](/docs/0.3/guides/errors/)

Use a fresh definition for every generation; layout mutates the object. Output methods return Promises: await them and handle failures.
