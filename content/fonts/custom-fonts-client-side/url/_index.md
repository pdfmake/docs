+++
title = "via URL protocol"
description = ""
weight = 16
alwaysopen = true
+++

To use custom fonts, 2 steps are required:

1. assign `pdfMake.addFonts(...)` your font files accessible via url address in your javascript
2. specify the font in your doc-definition

## 1. assign `pdfMake.addFonts(...)` your font files in your javascript

Font files must be accessible via url address (https:// or http:// protocol). In your code, before calling `pdfMake.createPdf(docDefinition)` set `pdfMake.addFonts(...)` as in the example below:

```javascript
var fonts = {
   yourFontName: {
     normal: 'https://example.com/fonts/fontFile.ttf',
     bold: 'https://example.com/fonts/fontFile2.ttf',
     italics: 'https://example.com/fonts/fontFile3.ttf',
     bolditalics: 'https://example.com/fonts/fontFile4.ttf'
   },
   anotherFontName: {
     (...)
   },

   // download default Roboto font from unpkg.com
   Roboto: {
     normal: 'https://unpkg.com/pdfmake@0.3/build/fonts/Roboto/Roboto-Regular.ttf',
     bold: 'https://unpkg.com/pdfmake@0.3/build/fonts/Roboto/Roboto-Medium.ttf',
     italics: 'https://unpkg.com/pdfmake@0.3/build/fonts/Roboto/Roboto-Italic.ttf',
     bolditalics: 'https://unpkg.com/pdfmake@0.3/build/fonts/Roboto/Roboto-MediumItalic.ttf'
   },

   // example of usage fonts in collection
   PingFangSC: {
     normal: ['https://example.com/fonts/pingfang.ttc', 'PingFangSC-Regular'],
     bold: ['https://example.com/fonts/pingfang.ttc', 'PingFangSC-Semibold'],
   }
};

pdfMake.addFonts(fonts);
```

### URL resource caching

{{% alert theme="warning" %}}Minimal version: **0.3.14**{{% /alert %}}

A font URL can also be specified as an object with `url`, optional `headers`, and `cache`. Set `cache: true` or `cache: false` to override the global `setUrlResourceCaching()` setting for that font file. For TrueType Collections, place the URL object in the first element of the array:

```js
pdfMake.addFonts({
  yourFontName: {
    normal: {
      url: 'https://example.com/fonts/regular.ttf',
      cache: true
    }
  },
  PingFangSC: {
    normal: [
      { url: 'https://example.com/fonts/pingfang.ttc', cache: true },
      'PingFangSC-Regular'
    ]
  }
});
```

By default, new font downloads are stored per document. `cache: true` stores a new download in the shared cache for reuse by subsequent documents. `cache: false` can still reuse an existing shared entry. URL strings and objects without `cache` use the global setting.

For details see [URL resource caching](/docs/0.3/getting-started/server-side/methods/#url-resource-caching).

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
