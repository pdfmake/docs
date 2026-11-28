+++
title = "Troubleshooting"
description = "Diagnose common pdfmake 0.3 failures involving imports, fonts, tables, promises, browser windows and resource access."
weight = 5
+++

## Start with version and runtime

Run `npm ls pdfmake` and compare your import to the appropriate quickstart. A browser bundle and the Node entry expose different output helpers. Version 0.1/0.2 examples using `new PdfPrinter(...)` or callbacks do not describe the 0.3 API.

| Symptom | Check | Fix |
| --- | --- | --- |
| Font family or variant is not defined | Family name, bold/italic mapping, default font | Register all used variants and select the family in `defaultStyle` |
| File not found or access denied | Actual resolved font/image path and policy | Use existing application-owned paths and a matching synchronous policy |
| Missing or incorrect glyphs | Selected font's glyph coverage | Embed a font covering the language; test bold and italic too |
| Empty or malformed table | `body`, row lengths and spans | Supply nonempty consistent rows and placeholders for spanned cells |
| `download` is not a function on Node | Imported runtime | Use `write` or `getBuffer` on the Node entry |
| Browser opens no window | User gesture and popup blocker | Open a window directly on click before asynchronous data loading |
| URL is denied despite an allow callback | Callback return type | Return literal boolean `true` synchronously; remove `async` |
| HTTP image request fails | URL, policy, CORS, status and redirects | Check access in the target runtime; browsers enforce CORS |
| File is incomplete or missing | Rejected Promise and writable errors | Await `write()` and handle its rejection before reporting success |
| Output changes after an upgrade | Version, fonts, inputs and defaults | Reproduce with a pinned version and compare extracted text, page counts and rendered pages |

## Reduce the definition

Start with one plain paragraph and known-good fonts. Add your styles, table rows and resources one at a time. Construct a fresh definition per attempt. Keep request and resource errors separate from layout errors.

## Report a useful bug

Include the exact pdfmake and Node/browser versions, operating system, a minimal runnable definition, font setup, expected versus actual behavior and the full relevant stack trace. Remove private content and secrets. For pagination defects include the smallest input that still reproduces the page break.
