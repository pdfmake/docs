+++
title = "Par protocole URL"
description = "Configurez l’utilisation des polices par protocole URL dans pdfmake 0.3 avec des exemples, des options et des notes d’utilisation."
weight = 16
alwaysopen = true
sourceDigest = "7a21062929c7b5e61fa55fb47082995e80a6dab97f654ad3fa35ab0370e6ceef"
+++

L’utilisation de polices personnalisées nécessite deux étapes :

1. Transmettez à `pdfMake.addFonts(...)` les fichiers de polices accessibles par URL depuis votre JavaScript.
2. Spécifiez la police dans la définition du document.

## 1. Transmettre les fichiers de polices à `pdfMake.addFonts(...)` dans votre JavaScript

Les fichiers de polices doivent être accessibles par URL (protocole https:// ou http://). Dans votre code, avant d’appeler `pdfMake.createPdf(docDefinition)`, configurez `pdfMake.addFonts(...)` comme dans l’exemple ci-dessous :

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

## 2. Spécifier la police dans la définition du document

pdfMake utilise « Roboto » par défaut. Pour employer une autre police, spécifiez-la dans l’objet de définition du document.

Le plus simple consiste à la définir globalement dans **defaultStyle** :

```javascript
var docDefinition = {
  content: ['Example document content'],
  defaultStyle: {
    font: 'yourFontName'
  }
}
```
