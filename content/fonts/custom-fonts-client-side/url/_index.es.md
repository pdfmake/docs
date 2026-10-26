+++
sourceDigest = "7a21062929c7b5e61fa55fb47082995e80a6dab97f654ad3fa35ab0370e6ceef"
title = "Mediante protocolo URL"
description = "Configura fuentes personalizadas mediante el protocolo URL en pdfmake 0.3 con ejemplos, opciones y notas de uso."
weight = 16
alwaysopen = true
+++

Para usar fuentes personalizadas, se requieren dos pasos:

1. Asigna a `pdfMake.addFonts(...)` los archivos de fuente accesibles mediante URL en JavaScript.
2. Especifica la fuente en la definición del documento.

## 1. Asigna a `pdfMake.addFonts(...)` los archivos de fuente en JavaScript

Los archivos de fuente deben ser accesibles mediante una URL con protocolo https:// o http://. En tu código, antes de llamar a `pdfMake.createPdf(docDefinition)`, asigna `pdfMake.addFonts(...)` como en el siguiente ejemplo:

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

## 2. Especifica la fuente en la definición del documento

pdfMake usa `Roboto` como fuente predeterminada. Por tanto, para usar tu fuente, debes especificarla en el objeto de definición del documento.

La forma más sencilla es establecerla globalmente en `defaultStyle`:

```javascript
var docDefinition = {
  content: ['Example document content'],
  defaultStyle: {
    font: 'yourFontName'
  }
}
```
