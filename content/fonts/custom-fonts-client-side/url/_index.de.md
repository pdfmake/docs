+++
title = "Über das URL-Protokoll"
description = "Binde Schriftdateien über URL-Adressen in pdfmake ein und registriere sie für die Verwendung in der Browseranwendung."
weight = 16
alwaysopen = true
sourceDigest = "7a21062929c7b5e61fa55fb47082995e80a6dab97f654ad3fa35ab0370e6ceef"
+++

Um eigene Schriften zu verwenden, sind zwei Schritte erforderlich:

1. Weise `pdfMake.addFonts(...)` in JavaScript deine über eine URL erreichbaren Schriftdateien zu.
2. Gib die Schrift in der Dokumentdefinition an.

## 1. Weise `pdfMake.addFonts(...)` in JavaScript die Schriftdateien zu

Schriftdateien müssen über eine URL (mit `https://`- oder `http://`-Protokoll) erreichbar sein. Rufe in deinem Code vor `pdfMake.createPdf(docDefinition)` `pdfMake.addFonts(...)` auf, wie im folgenden Beispiel:

```javascript
var fonts = {
   yourFontName: {
     normal: 'https://example.com/fonts/fontFile.ttf',
     bold: 'https://example.com/fonts/fontFile2.ttf',
     italics: 'https://example.com/fonts/fontFile3.ttf',
     bolditalics: 'https://example.com/fonts/fontFile4.ttf'
   },
   anotherFontName: {

   },

   // download default Roboto font from unpkg.com
   Roboto: {
     normal: 'https://unpkg.com/pdfmake@0.3.13/build/fonts/Roboto/Roboto-Regular.ttf',
     bold: 'https://unpkg.com/pdfmake@0.3.13/build/fonts/Roboto/Roboto-Medium.ttf',
     italics: 'https://unpkg.com/pdfmake@0.3.13/build/fonts/Roboto/Roboto-Italic.ttf',
     bolditalics: 'https://unpkg.com/pdfmake@0.3.13/build/fonts/Roboto/Roboto-MediumItalic.ttf'
   },

   // example of usage fonts in collection
   PingFangSC: {
     normal: ['https://example.com/fonts/pingfang.ttc', 'PingFangSC-Regular'],
     bold: ['https://example.com/fonts/pingfang.ttc', 'PingFangSC-Semibold'],
   }
};

pdfMake.addFonts(fonts);
```

## 2. Gib die Schrift in deiner Dokumentdefinition an

pdfMake verwendet standardmäßig `Roboto`. Damit deine eigene Schrift verwendet wird, musst du sie in der Dokumentdefinition angeben.

Am einfachsten legst du sie global in **`defaultStyle`** fest:

```javascript
var docDefinition = {
  content: ['Example document content'],
  defaultStyle: {
    font: 'yourFontName'
  }
}
```
