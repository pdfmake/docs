+++
title = "Sections du document"
description = "Divisez un document en sections dotées de paramètres de page, d’en-têtes, de pieds de page, de filigranes et d’arrière-plans distincts."
weight = 2090
alwaysopen = true
sourceDigest = "6dc77fa5678a9e679efdf6b4bff537f029525cefa55e1030486444fce88c0ea8"
+++

Les sections de document permettent de diviser un document en plusieurs parties, chacune avec ses propres paramètres de page.

Chaque section prend en charge :
- un format et une orientation de page personnalisés
- des marges de page personnalisées
- un en-tête et un pied de page personnalisés
- un filigrane personnalisé
- un arrière-plan personnalisé

Définition incluant toutes les propriétés :
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

Dans la section suivante, les propriétés peuvent être héritées de la section précédente :
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

Un [exemple complet](https://github.com/bpampuch/pdfmake/blob/master/examples/sections.js) est disponible.
