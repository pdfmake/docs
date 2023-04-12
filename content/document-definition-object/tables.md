+++
title = "Tables"
description = ""
weight = 23
alwaysopen = true
+++


Conceptually tables are similar to columns. They can however have headers, borders and cells spanning over multiple columns/rows.

{{% alert theme="warning" %}}The table node expects a valid table value. If the value is invalid or empty, an error is thrown. This includes the table.body property as well.{{% /alert %}}

```js
var docDefinition = {
  content: [
    {
      layout: 'lightHorizontalLines', // optional
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ '*', 'auto', 100, '*' ],

        body: [
          [ 'First', 'Second', 'Third', 'The last one' ],
          [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
          [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
        ]
      }
    }
  ]
};
```

##### Table-cell properties

* `fillColor: string`: the background color of a table cell
* `fillOpacity: string`: the background opacity of a table cell


##### Table layouts

Can be used `layout` property for set table layout.

Available table layouts:

* `noBorders`
* `headerLineOnly`
* `lightHorizontalLines`

##### Own table layouts

Own table layouts must be defined before calling `pdfMake.createPdf(docDefinition)`.
```js
pdfMake.tableLayouts = {
  exampleLayout: {
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return (i === node.table.headerRows) ? 2 : 1;
    },
    vLineWidth: function (i) {
      return 0;
    },
    hLineColor: function (i) {
      return i === 1 ? 'black' : '#aaa';
    },
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8;
    },
    paddingRight: function (i, node) {
      return (i === node.table.widths.length - 1) ? 0 : 8;
    }
  }
};

// download the PDF
pdfMake.createPdf(docDefinition).download();
```

Alternatively, you can pass the tableLayouts directly to `createPdf` without changing the global value:

- On the client side:

```js
pdfMake.createPdf(docDefinition, tableLayouts).download();

// The full signature of createPdf looks like this.
// tableLayouts, fonts and vfs are all optional - falsy values will cause
// pdfMake.tableLayouts, pdfMake.fonts or pdfMake.vfs to be used.
pdfMake.createPdf(docDefinition, tableLayouts, fonts, vfs)
```

- On the server side:

```js
var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);

// Declaring your layout
var myTableLayouts = {
    exampleLayout: {
        /*
        Your layout here.
        */
    }
};

// Building the PDF
var pdfDoc = printer.createPdfKitDocument(docDefinition, {tableLayouts: myTableLayouts});

// Writing it to disk
pdfDoc.pipe(fs.createWriteStream('document.pdf'));
pdfDoc.end();
```

All concepts related to tables are covered by TABLES example in [playground](http://pdfmake.org/playground.html).
