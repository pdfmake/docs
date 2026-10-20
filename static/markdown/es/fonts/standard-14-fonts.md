# Las 14 fuentes estándar

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/fonts/standard-14-fonts/

PDF incluye las [14 fuentes estándar](http://www.enfocus.com/manuals/ReferenceGuide/PS/18/enUS/en-us/common/pse/concept/c_aa1044513.html).

**Cobertura de caracteres:** las fuentes estándar usan codificaciones limitadas y no admiten Unicode arbitrario. Para documentos multilingües, usa fuentes incrustadas y prueba los glifos que necesites.

## Uso de pdfmake en el servidor

**Ejemplo de uso:**
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

## Uso de pdfmake en el cliente

Los paquetes de fuentes estándar están disponibles en el directorio `build/standard-fonts/` del paquete pdfmake. Incluye el paquete de cada familia que necesites **después** de `pdfmake.min.js`. Cada paquete registra automáticamente sus fuentes en `pdfMake`.

Por ejemplo, para usar Helvetica:

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

Los paquetes disponibles son `Courier.js`, `Helvetica.js`, `Times.js`, `Symbol.js` y `ZapfDingbats.js`. Asigna `defaultStyle.font` a una familia de fuentes registrada, como se muestra arriba.
