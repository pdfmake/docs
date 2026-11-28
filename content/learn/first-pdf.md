+++
title = "Your first PDF"
description = "Build one working pdfmake 0.3 document in five small steps, with the source and its actual rendered PDF."
weight = 1
+++

## 1. Understand the two ingredients

pdfmake needs an **engine with fonts** and a **document definition**. The definition
is a JavaScript object describing what to print. It is not HTML and does not draw
anything until you pass it to `createPdf` and request an output.

For your first attempt, use the example below in the browser. It already has the
engine and Roboto font configured. Then use the runtime setup in step 3.

## 2. Look at a complete definition

The result below is generated from exactly this code. Three `content` entries
become three vertical blocks. Text wraps automatically; margins and font sizes
are measured in PDF points (72 points = 1 inch).

{{< example id="welcome" >}}

Change the heading or font size in the playground. With **Live preview** enabled,
the next PDF appears after you pause typing. You can undo changes, save named
documents in your browser, or export a JavaScript file.

## 3. Configure your own application

Choose **one** setup. Do not combine the Node entry with browser-only output methods.

| Runtime | Setup | Why fonts matter |
| --- | --- | --- |
| Node.js API | [Complete Node quickstart](/docs/0.3/getting-started/server-side/) | Register real font files or a standard family before rendering |
| Browser application | [Complete browser quickstart](/docs/0.3/getting-started/client-side/) | Load `pdfmake.min.js`, then a font VFS, or register it in your bundler |

The example uses `Roboto`, the browser default. If you use it with the Node
quickstart's standard Helvetica setup, add `defaultStyle: { font: 'Helvetica' }`
to the definition or register Roboto files. Unicode text also needs a font covering
the characters you use; a valid string alone does not supply missing glyphs.

## 4. Request an output and handle errors

In a configured browser application:

```js
try {
  await pdfMake.createPdf(dd).download('first-document.pdf');
} catch (error) {
  document.querySelector('#status').textContent = error.message;
}
```

Here `dd` is the definition above and `#status` is an element in your application.
For Node.js, use `await pdfmake.createPdf(dd).write('first-document.pdf')` instead.
`createPdf` returns an output wrapper; the output method returns the Promise to
await. Without `await` or `.catch(...)`, a generation failure may never reach your UI.

## 5. Add one concept at a time

Keep the first working document. Add [named styles](/docs/0.3/document-definition-object/styling/)
next, then [tables](/docs/0.3/document-definition-object/tables/) when you need rows.
Use [the document model](/docs/0.3/learn/document-model/) to choose a node type.
If something fails, [classify the error](/docs/0.3/guides/errors/) before changing fonts,
layout and resources all at once.
