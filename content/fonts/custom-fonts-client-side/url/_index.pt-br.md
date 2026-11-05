+++
title = "Por URL"
description = "Configure fontes personalizadas acessíveis por URL no pdfmake 0.3."
weight = 16
alwaysopen = true
sourceDigest = "85c02ba46019f225861ea08b049de89a318e044021508c54b2cc266714435900"
+++

Para usar fontes personalizadas, são necessárias duas etapas:

1. atribua a `pdfMake.addFonts(...)` os arquivos de fonte acessíveis por URL no JavaScript;
2. especifique a fonte na definição do documento.

## 1. Atribua a `pdfMake.addFonts(...)` os arquivos de fonte no JavaScript

Os arquivos de fonte precisam estar acessíveis por URL (protocolo `https://` ou `http://`). No código, antes de chamar `pdfMake.createPdf(docDefinition)`, configure `pdfMake.addFonts(...)` como no exemplo:

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

## 2. Especifique a fonte na definição do documento

O pdfMake usa `Roboto` como fonte padrão. Para usar sua fonte, especifique-a no objeto de definição do documento.

A maneira mais simples é defini-la globalmente em **`defaultStyle`**:

```javascript
var docDefinition = {
  content: ['Example document content'],
  defaultStyle: {
    font: 'yourFontName'
  }
}
```

## Cache de recursos URL {#url-resource-caching}

Disponível na versão de desenvolvimento original para **0.3.14**; ausente do mecanismo 0.3.13 fixado no playground.

Para fontes, use um objeto de recurso com `url`, os `headers` opcionais e `cache`. Em uma tupla TrueType Collection, coloque esse objeto no primeiro elemento.

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

Novos downloads são armazenados por documento por padrão. `cache: true` armazena novos dados no cache compartilhado em memória para documentos posteriores; `cache: false` ainda permite ler uma entrada compartilhada existente. URLs de texto e objetos sem `cache` usam a configuração global. O cache HTTP do navegador é independente.

Consulte [Cache de recursos URL](/docs/0.3/pt-br/getting-started/server-side/methods/#url-resource-caching) para configuração e segurança do cache.
