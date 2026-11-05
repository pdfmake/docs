+++
title = "Node.js output methods"
description = "Reference for createPdf, Buffer, base64, file output, streams and resource policies in pdfmake 0.3."
weight = 12
+++

## Create a document

```js
const output = pdfmake.createPdf(docDefinition, options);
```

`docDefinition` is a [document definition](/docs/0.3/document-definition-object/). `options` is an optional [options object](/docs/0.3/options/). `createPdf` returns an output wrapper immediately; generation errors reject the output method's Promise. Invalid argument types can throw synchronously.

## Output helpers

| Method | Resolves to | Use |
| --- | --- | --- |
| `write(filename)` | `undefined` | Write a file and wait for it to close |
| `getBuffer()` | `Buffer` | Return PDF bytes from an API |
| `getBase64()` | `string` | Encode the bytes as base64 |
| `getDataUrl()` | `string` | Prefix base64 with `data:application/pdf;base64,` |
| `getStream()` | PDFKit document stream | Manage a stream directly |

```js
try {
  const output = pdfmake.createPdf(docDefinition);
  const bytes = await output.getBuffer();
  // Send or store bytes here.
} catch (error) {
  // Report generation failure to your caller.
}
```

`getBuffer()` caches its Promise; `getBase64()` and `getDataUrl()` reuse those bytes. Create a new output wrapper for an independent render. Do not combine manual stream consumption with buffer/file helpers on the same wrapper.

## Consume a stream

```js
const stream = await pdfmake.createPdf(docDefinition).getStream();
stream.on('error', error => { /* Handle generation errors. */ });
destination.on('error', error => { /* Handle destination errors. */ });
stream.pipe(destination);
stream.end();
```

`destination` must be a writable stream managed by your application. Attach listeners before calling `end()`. Prefer `write()` for a simple file. Streaming output does not make document layout incremental: pdfmake still lays out the document before returning this stream.

## URL access policy {#url-access-policy}

Available since **0.3.6**. Configure it before creating documents:

```js
pdfmake.setUrlAccessPolicy(url => {
  const parsed = new URL(url);
  return parsed.protocol === 'https:' && parsed.hostname === 'assets.example.com';
});
```

The callback must return the boolean `true` **synchronously** to allow a URL. An `async` function returns a Promise and is rejected by the current implementation. An allowlist is only one layer of SSRF protection; use network controls or supply validated bytes when processing untrusted input. See [resource security](/docs/0.3/guides/resource-security/).

## Local file access policy

Available since **0.3.8**. Deny local files when all resources are embedded:

```js
pdfmake.setLocalAccessPolicy(() => false);
```

For local fonts or images, allow exact resolved paths rather than a string prefix. See the [complete local font setup](/docs/0.3/fonts/). `undefined` clears a configured policy; an omitted policy is not a deny-all policy.

## URL resource caching {#url-resource-caching}

Available in the upstream development branch for **0.3.14**; not in the pinned 0.3.13 playground runtime.

Use `setUrlResourceCaching(enabled)` with a required boolean to share new URL downloads across documents. It defaults to `false`. An individual `{ url, headers, cache }` resource overrides that setting; `headers` is optional. This applies to fonts, images, attachment sources and embedded file sources. Setting `false` affects subsequent generations, preserves existing cache entries and does not override an explicit `cache: true`. Before 0.3.14, downloads were automatically shared; `true` restores that behavior.

```js
pdfmake.setUrlResourceCaching(true);

var docDefinition = {
  content: [{ image: 'logo' }, { image: 'photo' }],
  images: {
    // Uses the global caching setting.
    logo: 'https://example.com/logo.png',
    photo: {
      url: 'https://example.com/photo.png',
      headers: { Authorization: 'Bearer token' },
      // Store a new download only for this document.
      cache: false
    }
  }
};

pdfmake.createPdf(docDefinition).write('document.pdf');
```

New downloads are stored per document by default. `cache: true` stores new data in the shared in-memory cache for later documents; `cache: false` still allows reading an existing shared entry. URL strings and objects without `cache` use the global setting. The browser HTTP cache is independent.

Shared resources are keyed only by URL, including when `Authorization` or other headers differ. A cache read neither contacts the origin nor rechecks authorization there. Avoid shared caching for resources whose content or authorization depends on headers. The [URL access policy](#url-access-policy) applies to network downloads, not cache reads.

## Clear URL resource cache {#clear-url-resource-cache}

Available in the upstream development branch for **0.3.14**; not in the pinned 0.3.13 playground runtime.

`clearUrlResourceCache()` takes no parameters and synchronously removes shared entries starting with `http://` or `https://`, case-insensitively. It preserves other VFS files, per-document resources and the global caching setting. Call it between generations, after active work has finished; it does not cancel downloads in progress or clear the browser HTTP cache.

```js
pdfmake.clearUrlResourceCache();
pdfmake.createPdf(docDefinition).write('document.pdf');
```
