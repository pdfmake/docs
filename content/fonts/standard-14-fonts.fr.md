+++
title = "Les 14 polices standard"
description = "Utilisez les familles de polices PDF standard dans les bundles Node.js et navigateur, avec leurs encodages de caractères limités."
weight = 15
alwaysopen = true
sourceDigest = "201689392ed36c1d4a7a653265576461a8802566860caae2b86967ad9d9e0367"
+++

Les PDF contiennent [14 polices standard](http://www.enfocus.com/manuals/ReferenceGuide/PS/18/enUS/en-us/common/pse/concept/c_aa1044513.html).

**Couverture des caractères :** les polices standard utilisent des encodages limités et ne prennent pas en charge l’ensemble des caractères Unicode. Pour les documents multilingues, utilisez des polices incorporées et testez les glyphes nécessaires.

## Utiliser pdfmake côté serveur

**Exemple d’utilisation :**
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


## Utiliser pdfmake côté client

Les bundles des polices standard sont disponibles dans le répertoire `build/standard-fonts/` du package pdfmake. Incluez le bundle de chaque famille dont vous avez besoin **après** `pdfmake.min.js`. Chaque bundle enregistre automatiquement ses polices auprès de `pdfMake`.

Par exemple, pour utiliser Helvetica :

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

Les bundles disponibles sont `Courier.js`, `Helvetica.js`, `Times.js`, `Symbol.js` et `ZapfDingbats.js`. Définissez `defaultStyle.font` avec le nom d’une famille enregistrée, comme dans l’exemple ci-dessus.
