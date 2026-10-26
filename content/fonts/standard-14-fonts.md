+++
title = "Standard 14 fonts"
description = "Use standard PDF font families in Node.js and browser bundles, with limited character encodings."
weight = 15
alwaysopen = true
+++

PDF contains [standard 14 fonts](http://www.enfocus.com/manuals/ReferenceGuide/PS/18/enUS/en-us/common/pse/concept/c_aa1044513.html).

**Character coverage:** Standard fonts use limited encodings and do not support arbitrary Unicode. Use embedded fonts for multilingual documents and test the glyphs you need.

## Use in pdfmake on the server side

**Example of usage:**
```js
var fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
  Symbol: {
    normal: 'Symbol'
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats'
  }
};

var pdfmake = require('pdfmake');
pdfmake.addFonts(fonts);

var docDefinition = {
  content: ['First paragraph', 'Another paragraph'],
  defaultStyle: {
    font: 'Helvetica'
  }
};

var pdf = pdfmake.createPdf(docDefinition);
pdf.write('test.pdf').then(() => {
  // success event
}, err => {
  console.error(err);
});
```


## Use in pdfmake on the client side

Standard font bundles are available in the pdfmake package's `build/standard-fonts/` directory. Include the bundle for each font family you need **after** `pdfmake.min.js`. Each bundle automatically registers its fonts with `pdfMake`.

For example, to use Helvetica:

```html
<script src="https://unpkg.com/pdfmake@0.3.13/build/pdfmake.min.js"></script>
<script src="https://unpkg.com/pdfmake@0.3.13/build/standard-fonts/Helvetica.js"></script>
<script>
  var docDefinition = {
    content: ['First paragraph', 'Another paragraph'],
    defaultStyle: {
      font: 'Helvetica'
    }
  };

  pdfMake.createPdf(docDefinition).download('document.pdf');
</script>
```

The available bundles are `Courier.js`, `Helvetica.js`, `Times.js`, `Symbol.js` and `ZapfDingbats.js`. Set `defaultStyle.font` to a registered font family, as shown above.
