# Node.js output methods

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/getting-started/server-side/methods/

## Create a document

**JavaScript**

```js
const output = pdfmake.createPdf(docDefinition, options);
```

**TypeScript**

```ts
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

**JavaScript**

```js
try {
  const output = pdfmake.createPdf(docDefinition);
  const bytes = await output.getBuffer();
  // Send or store bytes here.
} catch (error) {
  // Report generation failure to your caller.
}
```

**TypeScript**

```ts
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

**JavaScript**

```js
const stream = await pdfmake.createPdf(docDefinition).getStream();
stream.on('error', error => { /* Handle generation errors. */ });
destination.on('error', error => { /* Handle destination errors. */ });
stream.pipe(destination);
stream.end();
```

**TypeScript**

```ts
const stream = await pdfmake.createPdf(docDefinition).getStream();
stream.on('error', error => { /* Handle generation errors. */ });
destination.on('error', error => { /* Handle destination errors. */ });
stream.pipe(destination);
stream.end();
```

`destination` must be a writable stream managed by your application. Attach listeners before calling `end()`. Prefer `write()` for a simple file. Streaming output does not make document layout incremental: pdfmake still lays out the document before returning this stream.

## URL access policy

Available since **0.3.6**. Configure it before creating documents:

**JavaScript**

```js
pdfmake.setUrlAccessPolicy(url => {
  const parsed = new URL(url);
  return parsed.protocol === 'https:' && parsed.hostname === 'assets.example.com';
});
```

**TypeScript**

```ts
pdfmake.setUrlAccessPolicy(url => {
  const parsed = new URL(url);
  return parsed.protocol === 'https:' && parsed.hostname === 'assets.example.com';
});
```

The callback must return the boolean `true` **synchronously** to allow a URL. An `async` function returns a Promise and is rejected by the current implementation. An allowlist is only one layer of SSRF protection; use network controls or supply validated bytes when processing untrusted input. See [resource security](/docs/0.3/guides/resource-security/).

## Local file access policy

Available since **0.3.8**. Deny local files when all resources are embedded:

**JavaScript**

```js
pdfmake.setLocalAccessPolicy(() => false);
```

**TypeScript**

```ts
pdfmake.setLocalAccessPolicy(() => false);
```

For local fonts or images, allow exact resolved paths rather than a string prefix. See the [complete local font setup](/docs/0.3/fonts/). `undefined` clears a configured policy; an omitted policy is not a deny-all policy.
