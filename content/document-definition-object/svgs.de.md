+++
title = "SVGs"
description = "Binde SVG-Inhalte in pdfmake 0.3 als Text oder SVGElement ein und skaliere sie proportional oder passend in ein Rechteck."
weight = 2110
alwaysopen = true
sourceDigest = "1370a9ae1ce49896f1ce3301d0947639f4e5fd7225b9babd15b140e19eed060a"
+++

SVGs ähneln [Bildern](/docs/0.3/de/document-definition-object/images/), derzeit können sie jedoch weder über eine Datei eingebunden noch aus einem Wörterbuch wiederverwendet werden.

{{% alert theme="warning" %}}Der SVG-Knoten erwartet einen gültigen SVG-Wert. Ist der Wert ungültig oder leer, wird ein Fehler ausgelöst.{{% /alert %}}

Für die Umwandlung von SVG in ein PDF-Dokument wird die Bibliothek [SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit) verwendet.

Der Wert des Knotens `svg` kann eine Zeichenfolge oder ein `SVGElement`-Objekt sein (letzteres ist nur im Browser verfügbar).

{{% alert theme="warning" %}}`SVGElement`-Objekte werden ab Version **0.3.1** unterstützt.{{% /alert %}}

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
