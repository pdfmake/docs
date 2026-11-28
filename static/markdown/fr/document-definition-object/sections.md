# Sections du document

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/sections/

Les sections de document permettent de diviser un document en plusieurs parties, chacune avec ses propres paramètres de page.

Chaque section prend en charge :
- un format et une orientation de page personnalisés
- des marges de page personnalisées
- un en-tête et un pied de page personnalisés
- un filigrane personnalisé
- un arrière-plan personnalisé

Définition incluant toutes les propriétés :
**JavaScript**

```js
var docDefinition = {
    content: [
        {
            header: function (currentPage, pageCount) {
                return currentPage.toString() + ' of ' + pageCount;
            },
            footer: function (currentPage, pageCount) {
                return currentPage.toString() + ' of ' + pageCount;
            },
            background: function () {
                return {text: 'background', alignment: 'right'};
            },
            watermark: 'watermark',
            pageSize: 'A4',
            pageOrientation: 'landscape',
            pageMargins: 5,
            section: [
                'Text in section.'
            ]
        }
    ]
}
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
    content: [
        {
            header: function (currentPage, pageCount) {
                return currentPage.toString() + ' of ' + pageCount;
            },
            footer: function (currentPage, pageCount) {
                return currentPage.toString() + ' of ' + pageCount;
            },
            background: function () {
                return {text: 'background', alignment: 'right'};
            },
            watermark: 'watermark',
            pageSize: 'A4',
            pageOrientation: 'landscape',
            pageMargins: 5,
            section: [
                'Text in section.'
            ]
        }
    ]
}
```

Dans la section suivante, les propriétés peuvent être héritées de la section précédente :
**JavaScript**

```js
var docDefinition = {
    content: [
        {
            header: 'inherit',
            footer: 'inherit',
            background: 'inherit',
            watermark: 'inherit',
            pageSize: 'inherit',
            pageOrientation: 'inherit',
            pageMargins: 'inherit',
            section: [
                'Text in section.'
            ]
        }
    ]
}
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
    content: [
        {
            header: 'inherit',
            footer: 'inherit',
            background: 'inherit',
            watermark: 'inherit',
            pageSize: 'inherit',
            pageOrientation: 'inherit',
            pageMargins: 'inherit',
            section: [
                'Text in section.'
            ]
        }
    ]
}
```

Un [exemple complet](https://github.com/bpampuch/pdfmake/blob/master/examples/sections.js) est disponible.
