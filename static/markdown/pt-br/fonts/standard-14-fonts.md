# As 14 fontes padrão

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/fonts/standard-14-fonts/

O PDF inclui as [14 fontes padrão](http://www.enfocus.com/manuals/ReferenceGuide/PS/18/enUS/en-us/common/pse/concept/c_aa1044513.html).

**Cobertura de caracteres:** as fontes padrão usam codificações limitadas e não oferecem suporte a Unicode arbitrário. Para documentos multilíngues, use fontes incorporadas e teste os glifos necessários.

## Uso do pdfmake no servidor

**Exemplo de uso:**
**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

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

var docDefinition: TDocumentDefinitions = {
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
<script src="https://unpkg.com/pdfmake@0.3.12/build/pdfmake.min.js"></script>
<script src="https://unpkg.com/pdfmake@0.3.12/build/standard-fonts/Helvetica.js"></script>
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
