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

#### Supported Node.js versions

* 6 LTS (End-of-life: April 2019)
* 8 LTS
* 10 LTS

#### Example:
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
 
var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('document.pdf'));
pdfDoc.end();
 ```
