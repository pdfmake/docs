+++
title = "PDF/A"
description = "Créez des documents PDF/A pour l’archivage et la conservation électronique à long terme."
weight = 2310
alwaysopen = true
sourceDigest = "3a4aac84f9ac2fad0a48e377a819ab231184afd5b8138332817198c5125b12c5"
+++

PDF/A est un format spécialisé dans l’archivage et la conservation à long terme des documents électroniques.

La version PDF 1.4 ou ultérieure est requise.

```js
var docDefinition = {
    version: '1.5',
    subset: 'PDF/A-3a',
    tagged: true,
    displayTitle: true,
    info: {
        title: 'Awesome PDF document from pdfmake'
    },
    content: [
        'PDF/A document for archive'
    ]
};
```

Versions PDF prises en charge (propriété `version`) :
- `1.3` - version PDF 1.3 (par défaut), **PDF/A non pris en charge**
- `1.4` - version PDF 1.4
- `1.5` - version PDF 1.5
- `1.6` - version PDF 1.6
- `1.7` - version PDF 1.7
- `1.7ext3` - version PDF 1.7 ExtensionLevel 3

Sous-ensemble du document (propriété `subset`) :
- `PDF/A-1` (raccourci pour PDF/A-1b)
- `PDF/A-1a`
- `PDF/A-1b`
- `PDF/A-2` (raccourci pour PDF/A-2b)
- `PDF/A-2a`
- `PDF/A-2b`
- `PDF/A-3` (raccourci pour PDF/A-3b)
- `PDF/A-3a`
- `PDF/A-3b`
- `PDF/UA`

Marquer le document comme PDF balisé (propriété `tagged`) :
- `true` - activer
- `false` - désactiver

Afficher le titre du document dans la barre de titre de la fenêtre (propriété `displayTitle`) :
- `true` - activer
- `false` - désactiver
