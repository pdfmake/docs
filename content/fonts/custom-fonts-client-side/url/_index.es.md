+++
sourceDigest = "85c02ba46019f225861ea08b049de89a318e044021508c54b2cc266714435900"
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

## Caché de recursos URL {#url-resource-caching}

Disponible en la rama de desarrollo original para **0.3.14**; no está en el motor 0.3.13 fijado para el playground.

Para las fuentes, usa un objeto de recurso con `url`, las `headers` opcionales y `cache`. En una tupla TrueType Collection, coloca ese objeto en el primer elemento.

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

Las nuevas descargas se guardan por documento de forma predeterminada. `cache: true` guarda los nuevos datos en la caché compartida en memoria para documentos posteriores; `cache: false` sigue permitiendo leer una entrada compartida existente. Las URL de texto y los objetos sin `cache` usan la configuración global. La caché HTTP del navegador es independiente.

Consulta [Caché de recursos URL](/docs/0.3/es/getting-started/server-side/methods/#url-resource-caching) para conocer su configuración y seguridad.
