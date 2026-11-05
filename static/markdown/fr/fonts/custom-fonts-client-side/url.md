# Par protocole URL

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/fonts/custom-fonts-client-side/url/

L’utilisation de polices personnalisées nécessite deux étapes :

1. Transmettez à `pdfMake.addFonts(...)` les fichiers de polices accessibles par URL depuis votre JavaScript.
2. Spécifiez la police dans la définition du document.

## 1. Transmettre les fichiers de polices à `pdfMake.addFonts(...)` dans votre JavaScript

Les fichiers de polices doivent être accessibles par URL (protocole https:// ou http://). Dans votre code, avant d’appeler `pdfMake.createPdf(docDefinition)`, configurez `pdfMake.addFonts(...)` comme dans l’exemple ci-dessous :

**JavaScript**

```js
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

**TypeScript**

```ts
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

**JavaScript**

```js
var docDefinition = {
  content: ['Example document content'],
  defaultStyle: {
    font: 'yourFontName'
  }
}
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: ['Example document content'],
  defaultStyle: {
    font: 'yourFontName'
  }
}
```

## Cache des ressources URL {#url-resource-caching}

Disponible dans la branche de développement amont pour **0.3.14** ; absent du moteur 0.3.13 fixé pour le playground.

Pour les polices, utilisez un objet ressource avec `url`, les `headers` facultatifs et `cache`. Dans un tuple TrueType Collection, placez cet objet en premier.

**JavaScript**

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

**TypeScript**

```ts
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

Les nouveaux téléchargements sont conservés par document par défaut. `cache: true` stocke les nouvelles données dans le cache mémoire partagé pour les documents suivants ; `cache: false` permet toujours de lire une entrée partagée existante. Les URL textuelles et les objets sans `cache` utilisent le réglage global. Le cache HTTP du navigateur est indépendant.

Consultez [le cache des ressources URL](/docs/0.3/fr/getting-started/server-side/methods/#url-resource-caching) pour la configuration et la sécurité du cache.
