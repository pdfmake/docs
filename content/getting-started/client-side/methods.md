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

## URL resource caching {#url-resource-caching}

Available in the upstream development branch for **0.3.14**; not in the pinned 0.3.13 playground runtime.

`setUrlResourceCaching(enabled)` requires a boolean and defaults to `false`. Set an individual URL object’s `cache` to override the global setting. Existing shared entries remain readable with `cache: false`; it does not force a download.

```js
pdfMake.setUrlResourceCaching(true);
pdfMake.createPdf(docDefinition).download();
```

New downloads are stored per document by default. `cache: true` stores new data in the shared in-memory cache for later documents; `cache: false` still allows reading an existing shared entry. URL strings and objects without `cache` use the global setting. The browser HTTP cache is independent.

See [URL resource caching](/docs/0.3/getting-started/server-side/methods/#url-resource-caching) for configuration and cache security.

## Clear URL resource cache {#clear-url-resource-cache}

Available in the upstream development branch for **0.3.14**; not in the pinned 0.3.13 playground runtime.

Use `clearUrlResourceCache()` synchronously between generations after active work has finished. It removes shared HTTP/HTTPS entries, preserves other VFS files and the caching setting, and does not clear the browser HTTP cache. See [Clear URL resource cache](/docs/0.3/getting-started/server-side/methods/#clear-url-resource-cache).

```js
pdfMake.clearUrlResourceCache();
pdfMake.createPdf(docDefinition).download();
```
