+++
title = "Server-side"
description = ""
weight = 12
alwaysopen = true
+++

On server-side you can simply install via npm:
```
npm install pdfmake@0.3.0-beta.1
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

var pdfmake = require('pdfmake');
pdfmake.addFonts(fonts);

var docDefinition = {
  // ...
};

var options = {
  // ...
}

var pdf = pdfmake.createPdf(docDefinition);
pdf.write('document.pdf').then(() => {
  // success event
}, err => {
  // error event
  console.error(err);
});
 ```

Parameters for `createPdfKitDocument`:

* `docDefinition` - object with document definition
* `options` _(optional)_ - advanced options see [options chapter](/docs/0.3/options/)