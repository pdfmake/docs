+++
title = "API at a glance"
description = "Find configuration methods, rendering options and output helpers for the pdfmake 0.3 Node.js and browser APIs."
weight = 2
+++

## Configure once, render many

Both entry points expose a singleton. Configure fonts, policies and layouts at application startup. Do not replace shared configuration while concurrent requests are rendering.

| Method | Runtime | Behavior |
| --- | --- | --- |
| `addFonts(fonts)` | Both | Merge font families; a supplied family replaces the previous family mapping |
| `setFonts(fonts)` | Both | Replace the whole font map |
| `clearFonts()` | Both | Clear registered fonts |
| `addTableLayouts(layouts)` | Both | Merge named layout functions |
| `setTableLayouts(layouts)` | Both | Replace named layouts |
| `clearTableLayouts()` | Both | Clear custom layouts |
| `setProgressCallback(callback)` | Both | Receive rendering progress; not a page-layout profiler |
| `setUrlAccessPolicy(callback)` | Both, since 0.3.6 | Allow resource URLs only when callback returns `true` synchronously |
| `setLocalAccessPolicy(callback)` | Node, since 0.3.8 | Allow local resources only when callback returns `true` synchronously |
| `addVirtualFileSystem(vfs)` | Browser | Add base64 font/resource data to the virtual filesystem |
| `addFontContainer(container)` | Browser | Register a packaged font container |

## Render

`createPdf(docDefinition, options?)` accepts objects and returns an output wrapper. Use [document fields](/docs/0.3/document-definition-object/) in the first argument and [render options](/docs/0.3/options/) in the second.

| Output | Node | Browser |
| --- | --- | --- |
| `getBuffer()`, `getBase64()`, `getDataUrl()`, `getStream()` | Yes | Yes |
| `write(filename)` | Yes | No |
| `download(filename?)`, `open(window?)`, `print(window?)`, `getBlob()` | No | Yes |

All output helpers return Promises. Always handle rejection. The `createPdf` wrapper itself is not a Promise. See [Node methods](/docs/0.3/getting-started/server-side/methods/) and [browser methods](/docs/0.3/getting-started/client-side/methods/) for lifecycle details.
