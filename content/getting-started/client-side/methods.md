+++
title = "Browser output methods"
description = "Download, open, print or obtain PDF bytes and Blobs with Promise-based pdfmake 0.3 browser methods."
weight = 11
+++

## Create a document

After [loading the engine and fonts](/docs/0.3/getting-started/client-side/):

```js
const output = pdfMake.createPdf(docDefinition, options);
```

The optional second argument contains [rendering options](/docs/0.3/options/). `createPdf` returns an output wrapper immediately. Output helpers return Promises; handle their rejection.

## Choose an output

| Method | Resolves to | Behavior |
| --- | --- | --- |
| `download(filename?)` | `undefined` | Initiate a download; filename defaults to `file.pdf` |
| `open(window?)` | `undefined` | Navigate a new or supplied window to the generated PDF |
| `print(window?)` | `undefined` | Open a PDF carrying a print action; viewer behavior varies |
| `getBlob()` | `Blob` | Binary data with MIME type `application/pdf` |
| `getBuffer()` | Buffer-compatible bytes | Raw PDF bytes |
| `getBase64()` | `string` | Base64-encoded PDF |
| `getDataUrl()` | `string` | Base64 data URL |
| `getStream()` | PDFKit stream | Low-level output; usually prefer Blob or bytes |

```js
try {
  await pdfMake.createPdf(docDefinition).download('report.pdf');
} catch (error) {
  console.error('PDF generation failed', error);
}
```

A resolved download Promise does not confirm that the user saved the file. Printing depends on the browser and PDF viewer; do not rely on silent printing.

## Open after asynchronous work

Open the window directly inside a user click handler, before awaiting data. Otherwise popup blockers may reject it.

```js
async function openReport() {
  const win = window.open('', '_blank');
  if (!win) throw new Error('Allow popups to open the PDF');
  try {
    const response = await fetch('/report-data');
    if (!response.ok) throw new Error('Could not load report data');
    const data = await response.json();
    const definition = { content: [String(data.title)] };
    await pdfMake.createPdf(definition).open(win);
  } catch (error) {
    win.close();
    throw error;
  }
}
```

Call `openReport` from your application's click handler and handle its rejected Promise. For printing, replace `.open(win)` with `.print(win)`. Passing `window` navigates the current tab. Set the document's [metadata title](/docs/0.3/document-definition-object/document-medatadata/) to label the PDF; viewer filenames and titles remain browser-dependent.

## Manage Blob URLs

```js
const blob = await pdfMake.createPdf(docDefinition).getBlob();
const url = URL.createObjectURL(blob);
document.querySelector('#preview').src = url;
// Revoke url when replacing the preview or removing it, after it is no longer needed.
```

Keep the URL alive while the viewer uses it. Call `URL.revokeObjectURL(url)` during cleanup. Use a fresh output wrapper for each render. Avoid mixing manual stream consumption with buffer or Blob helpers on the same output.

## URL access policy

Since **0.3.6**, `setUrlAccessPolicy(callback)` accepts a synchronous boolean callback. It is not a complete network sandbox, and browser redirects may happen before the final URL is checked. See [resource security](/docs/0.3/guides/resource-security/).
