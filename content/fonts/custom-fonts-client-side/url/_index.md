+++
title = "via URL protocol"
description = ""
weight = 16
alwaysopen = true
+++

{{% alert theme="warning" %}}This feature is available only in **client-side** (in browser).{{% /alert %}}

To use custom fonts, 2 steps are required:

1. assign `pdfMake.fonts` your font files accessible via url address in your javascript
2. specify the font in your doc-definition

## 1. assign `pdfMake.fonts` your font files in your javascript

Font files must be accessible via url address (https:// or http:// protocol). In your code, before calling `pdfMake.createPdf(docDefinition)` set `pdfMake.fonts` as in the example below:

```javascript
pdfMake.fonts = {
   yourFontName: {
     normal: 'https://example.com/fonts/fontFile.ttf',
     bold: 'https://example.com/fonts/fontFile2.ttf',
     italics: 'https://example.com/fonts/fontFile3.ttf',
     bolditalics: 'https://example.com/fonts/fontFile4.ttf'
   },
   anotherFontName: {
     (...)
   },

   // download default Roboto font from cdnjs.com
   Roboto: {
     normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
     bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
     italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
     bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
   },

   // example of usage fonts in collection
   PingFangSC: {
     normal: ['https://example.com/fonts/pingfang.ttc', 'PingFangSC-Regular'],
     bold: ['https://example.com/fonts/pingfang.ttc', 'PingFangSC-Semibold'],
   }
}
```

Alternatively, instead of changing the global value, you can pass the `fonts` object directly to `createPdf`:

```javascript
pdfMake.createPdf(docDefinition, null, fonts)
```

## 2. specify the font in your doc-definition

pdfMake uses 'Roboto' as default font, so in order to use your font, you should specify it in your doc-definition object.

The easiest way is to set it globally in the **defaultStyle**

```javascript
var docDefinition = {
  content: (...),
  defaultStyle: {
    font: 'yourFontName'
  }
}
```
