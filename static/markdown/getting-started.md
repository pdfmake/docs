# Getting started

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/getting-started/

## Choose your runtime

- [Node.js](/docs/0.3/getting-started/server-side/): write a file, return a Buffer from an API, or consume a stream.
- [Browser](/docs/0.3/getting-started/client-side/): download, open, print, or obtain a Blob.

Both runtimes use the same [document definition](/docs/0.3/document-definition-object/). Output helpers return Promises. Font loading differs between Node files and browser font containers.

## Before you begin

Use the docs for your installed version (`npm ls pdfmake`). Start with a minimal example before adding custom fonts, remote images or table layouts. For 0.1/0.2 applications, follow the [migration guide](/docs/0.3/migration-from-0.1/).

## JavaScript and TypeScript

This development branch bundles native TypeScript declarations with the library, with separate Node and browser APIs. Install TypeScript without `@types/pdfmake` when using the locally packed branch. The published npm package 0.3.13 still needs its matching community types; the native declarations and preflight API described here are unreleased. The tested compiler is TypeScript 5.9.3.

```sh
npm install pdfmake@0.3.13
npm install --save-dev typescript@~5.9.3
```

Node.js: save this as `document.mts`. Use `NodeNext` so the compiler models actual Node imports. A CommonJS `.cts` file can instead start with `import pdfmake = require("pdfmake")`. Avoid relying on named runtime imports.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true
  }
}
```

**JavaScript**

```js
import pdfmake from 'pdfmake';
import { strict as assert } from 'node:assert';
pdfmake.addFonts({ Helvetica: { normal: 'Helvetica', bold: 'Helvetica-Bold', italics: 'Helvetica-Oblique', bolditalics: 'Helvetica-BoldOblique' } });
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(name => name.startsWith('Helvetica'));
const definition = { content: [{ table: { body: [['ESM', 'TypeScript'], ['Promise', 'Output']] } }], defaultStyle: { font: 'Helvetica' } };
const buffer = await pdfmake.createPdf(definition).getBuffer();
assert.equal(buffer.subarray(0, 5).toString(), '%PDF-');
```

**TypeScript**

```ts
import pdfmake from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces.js';
import { strict as assert } from 'node:assert';

pdfmake.addFonts({ Helvetica: { normal: 'Helvetica', bold: 'Helvetica-Bold', italics: 'Helvetica-Oblique', bolditalics: 'Helvetica-BoldOblique' } });
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(name => name.startsWith('Helvetica'));
const definition: TDocumentDefinitions = { content: [{ table: { body: [['ESM', 'TypeScript'], ['Promise', 'Output']] } }], defaultStyle: { font: 'Helvetica' } };
const buffer: Buffer = await pdfmake.createPdf(definition).getBuffer();
assert.equal(buffer.subarray(0, 5).toString(), '%PDF-');
```

Browser bundlers: import the prebuilt browser entry and register the VFS directly. Use `module: "ESNext"` and `moduleResolution: "Bundler"` in your bundler project; these options require a bundler and are not a configuration for directly running Node output.

**JavaScript**

```js
import pdfmake from 'pdfmake/build/pdfmake.js';
import vfs from 'pdfmake/build/vfs_fonts.js';
pdfmake.addVirtualFileSystem(vfs);
const definition = { content: [{ text: 'TypeScript browser bundler', bold: true }] };
export async function render() {
    return pdfmake.createPdf(definition).getBlob();
}
```

**TypeScript**

```ts
import pdfmake from 'pdfmake/build/pdfmake.js';
import vfs from 'pdfmake/build/vfs_fonts.js';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

pdfmake.addVirtualFileSystem(vfs);
const definition = { content: [{ text: 'TypeScript browser bundler', bold: true }] } satisfies TDocumentDefinitions;
export async function render(): Promise<Blob> {
  return pdfmake.createPdf(definition).getBlob();
}
```

Types provide completion and compile-time checks. They do not validate external JSON or guarantee a successful layout. The bundled declarations distinguish Node `write` from browser `getBlob`, `download`, `open` and `print`. Use explicit browser imports for bundlers. The playground and inline examples check TypeScript locally before rendering. See [document validation](/docs/0.3/guides/errors/) for runtime checks.
