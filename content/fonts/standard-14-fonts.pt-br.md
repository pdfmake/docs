+++
title = "As 14 fontes padrão"
description = "Use famílias de fontes PDF padrão no Node.js e em bundles de navegador, considerando as codificações de caracteres limitadas."
weight = 15
alwaysopen = true
sourceDigest = "201689392ed36c1d4a7a653265576461a8802566860caae2b86967ad9d9e0367"
+++

O PDF inclui as [14 fontes padrão](http://www.enfocus.com/manuals/ReferenceGuide/PS/18/enUS/en-us/common/pse/concept/c_aa1044513.html).

**Cobertura de caracteres:** as fontes padrão usam codificações limitadas e não oferecem suporte a Unicode arbitrário. Para documentos multilíngues, use fontes incorporadas e teste os glifos necessários.

## Uso do pdfmake no servidor

**Exemplo de uso:**
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


## Uso do pdfmake no cliente

Os bundles de fontes padrão estão disponíveis no diretório `build/standard-fonts/` do pacote pdfmake. Inclua o bundle de cada família necessária **depois** de `pdfmake.min.js`. Cada bundle registra automaticamente suas fontes em `pdfMake`.

Por exemplo, para usar Helvetica:

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

Os bundles disponíveis são `Courier.js`, `Helvetica.js`, `Times.js`, `Symbol.js` e `ZapfDingbats.js`. Defina `defaultStyle.font` como uma família registrada, conforme mostrado acima.
