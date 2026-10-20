+++
title = "Die 14 Standardschriften"
description = "Verwende Standardschriftfamilien von PDF in Node.js und Browser-Bundles; beachte die begrenzte Zeichenkodierung."
weight = 15
alwaysopen = true
sourceDigest = "b405dc401267671e4bd1aafcd6aa77046caff49e1ae6ed0019ab6d8f16361c4e"
+++

PDF enthält [14 Standardschriften](http://www.enfocus.com/manuals/ReferenceGuide/PS/18/enUS/en-us/common/pse/concept/c_aa1044513.html).

**Zeichenabdeckung:** Standardschriften verwenden begrenzte Kodierungen und unterstützen nicht beliebige Unicode-Zeichen. Verwende für mehrsprachige Dokumente eingebettete Schriften und prüfe die benötigten Glyphen.

## Verwendung von pdfmake auf dem Server

**Anwendungsbeispiel:**
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

## Verwendung von pdfmake im Browser

Bundles mit Standardschriften sind im Verzeichnis `build/standard-fonts/` des pdfmake-Pakets verfügbar. Binde das Bundle jeder benötigten Schriftfamilie **nach** `pdfmake.min.js` ein. Jedes Bundle registriert seine Schriften automatisch bei `pdfMake`.

Beispiel für Helvetica:

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

Verfügbare Bundles: `Courier.js`, `Helvetica.js`, `Times.js`, `Symbol.js` und `ZapfDingbats.js`. Setze `defaultStyle.font` auf eine registrierte Schriftfamilie, wie oben gezeigt.
