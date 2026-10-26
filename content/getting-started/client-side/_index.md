+++
title = "Browser quickstart"
description = "Load pdfmake 0.3 and its font bundle, then download a PDF from a user action."
weight = 11
+++

## Install and copy the browser assets

```sh
npm install pdfmake@0.3.13
```

Copy `node_modules/pdfmake/build/pdfmake.min.js` and `node_modules/pdfmake/build/vfs_fonts.js` next to this HTML file. Serve the directory with your local development server.

## Generate a PDF

```html
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>My first PDF</title></head>
<body>
  <button id="download" type="button">Download PDF</button>
  <p id="status" role="status"></p>
  <script src="./pdfmake.min.js"></script>
  <script src="./vfs_fonts.js"></script>
  <script>
    document.querySelector('#download').addEventListener('click', async () => {
      try {
        await pdfMake.createPdf({ content: ['Hello from the browser!'] }).download('hello.pdf');
        document.querySelector('#status').textContent = 'PDF prepared';
      } catch (error) {
        document.querySelector('#status').textContent = 'PDF generation failed';
        console.error(error);
      }
    });
  </script>
</body>
</html>
```

Load the engine **before** its font bundle. `vfs_fonts.js` supplies the default Roboto font files. You do not need a server-side rendering API for this example. `download()` resolving means the download has been initiated; it does not confirm a user saved the file.

## Use a bundler

```js
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.addVirtualFileSystem(pdfFonts);
await pdfMake.createPdf({ content: ['Bundled application'] }).download('document.pdf');
```

This code runs inside your application's module or async event handler. Keep imports out of server-only execution when using SSR frameworks. For TypeScript, use declarations compatible with your installed pdfmake version; types do not make an older runtime support the 0.3 API.

## Open and print

Call `open()` or `print()` from a user gesture to avoid popup blocking. When fetching data first, open a window synchronously and pass it to the output method afterward. See [browser methods](/docs/0.3/getting-started/client-side/methods/).

## Next steps

[Custom fonts](/docs/0.3/fonts/custom-fonts-client-side/) · [Browser methods](/docs/0.3/getting-started/client-side/methods/) · [Troubleshooting](/docs/0.3/guides/troubleshooting/)
