+++
title = "Server-side"
description = ""
weight = 12
alwaysopen = true
+++

On server-side you can simply install via npm:
```
npm install pdfmake
```

#### Example of usage:
```js
// Define font files
var fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

var docDefinition = {
  // ...
};

var options = {
  // ...
}

var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
pdfDoc.pipe(fs.createWriteStream('document.pdf'));
pdfDoc.end();
 ```

Parameters for `createPdfKitDocument`:

* `docDefinition` - object with document definition
* `options` _(optional)_ - advanced options see [options chapter](/docs/0.1/options/)