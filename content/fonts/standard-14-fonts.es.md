+++
sourceDigest = "201689392ed36c1d4a7a653265576461a8802566860caae2b86967ad9d9e0367"
title = "Las 14 fuentes estándar"
description = "Usa familias de fuentes PDF estándar en Node.js y en los paquetes para navegador, con codificaciones de caracteres limitadas."
weight = 15
alwaysopen = true
+++

PDF incluye las [14 fuentes estándar](http://www.enfocus.com/manuals/ReferenceGuide/PS/18/enUS/en-us/common/pse/concept/c_aa1044513.html).

**Cobertura de caracteres:** las fuentes estándar usan codificaciones limitadas y no admiten Unicode arbitrario. Para documentos multilingües, usa fuentes incrustadas y prueba los glifos que necesites.

## Uso de pdfmake en el servidor

**Ejemplo de uso:**
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

## Uso de pdfmake en el cliente

Los paquetes de fuentes estándar están disponibles en el directorio `build/standard-fonts/` del paquete pdfmake. Incluye el paquete de cada familia que necesites **después** de `pdfmake.min.js`. Cada paquete registra automáticamente sus fuentes en `pdfMake`.

Por ejemplo, para usar Helvetica:

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

Los paquetes disponibles son `Courier.js`, `Helvetica.js`, `Times.js`, `Symbol.js` y `ZapfDingbats.js`. Asigna `defaultStyle.font` a una familia de fuentes registrada, como se muestra arriba.
