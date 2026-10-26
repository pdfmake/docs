+++
title = "SVG"
description = "Configurez les SVG dans pdfmake 0.3 avec des exemples, des options et des notes d’utilisation."
weight = 2110
alwaysopen = true
sourceDigest = "1370a9ae1ce49896f1ce3301d0947639f4e5fd7225b9babd15b140e19eed060a"
+++

Les SVG ressemblent beaucoup aux [images](/docs/0.3/fr/document-definition-object/images/), mais il n’est actuellement pas possible de les référencer par fichier ni de les réutiliser depuis un dictionnaire.

{{% alert theme="warning" %}}Le nœud SVG exige une valeur SVG valide. Une valeur invalide ou vide provoque une erreur.{{% /alert %}}

La bibliothèque [SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit) est utilisée pour convertir les SVG en documents PDF.

La valeur du nœud `svg` peut être une chaîne ou un objet `SVGElement` (disponible uniquement dans le navigateur).

{{% alert theme="warning" %}}La prise en charge de l’objet `SVGElement` nécessite la version **0.3.1** ou ultérieure.{{% /alert %}}

```js
var docDefinition = {
  content: [
    {
      // If no width/height/fit is used, then dimensions from the svg element is used.
      svg: '<svg width="300" height="200" viewBox="0 0 300 200">...</svg>'
    },
    {
      // if you specify width, svg will scale proportionally
      svg: '<svg width="300" height="200" viewBox="0 0 300 200">...</svg>',
      width: 150
    },
    {
      // if you specify height, svg will scale proportionally
      // Minimal pdfmake version: 0.3.2
      svg: '<svg width="300" height="200" viewBox="0 0 300 200">...</svg>',
      height: 100
    },
    {
      // if you specify both width and height - svg will be stretched
      svg: '<svg width="300" height="200" viewBox="0 0 300 200">...</svg>',
      width: 600,
      height: 400
    },
    {
      // you can also fit the svg inside a rectangle
      svg: '<svg width="300" height="200" viewBox="0 0 300 200">...</svg>',
      fit: [150, 100]
    },
    {
      // if no width/height is specified in SVG element, you must set width and height for node
      svg: '<svg>...</svg>',
      width: 300,
      height: 200
    },
  ]
};
```
