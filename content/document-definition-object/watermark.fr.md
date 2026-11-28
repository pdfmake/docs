+++
title = "Filigrane"
description = "Configurez un filigrane dans pdfmake 0.3 avec ses propriétés et des exemples."
weight = 2240
alwaysopen = true
sourceDigest = "6282ba69e28519af356033aef8c20701350b760f1926f0c1d592767e5cde5c02"
+++

## Propriétés

* `text` - texte du filigrane
* `color` - couleur du texte
* `opacity` - opacité du texte
* `bold` - style gras du texte
* `italics` - style italique du texte
* `fontSize` - taille de police personnalisée du texte (la taille idéale est calculée automatiquement)
* `angle` - angle de rotation du texte

## Exemples

Exemple d’utilisation simple :
```js
var docDefinition = {
  watermark: 'test watermark',
  content: [
    '...'
  ]
};
```

Exemple de style de police :
```js
var docDefinition = {
  watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
  content: [
    '...'
  ]
};
```

Exemple avec une taille de police personnalisée :
```js
var docDefinition = {
  watermark: { text: 'test watermark', fontSize: 20 },
  content: [
    '...'
  ]
};
```

Exemple d’angle de rotation du filigrane :
```js
var docDefinition = {
  watermark: { text: 'test watermark', angle: 70 },
  content: [
    '...'
  ]
};
```
