+++
title = "Wasserzeichen"
description = "Lege Wasserzeichen in pdfmake 0.3 mit Beispielen, Optionen und Anwendungshinweisen fest."
weight = 2240
alwaysopen = true
sourceDigest = "6282ba69e28519af356033aef8c20701350b760f1926f0c1d592767e5cde5c02"
+++

## Eigenschaften

* `text` – Text des Wasserzeichens
* `color` – Textfarbe
* `opacity` – Deckkraft des Textes
* `bold` – fette Textformatierung
* `italics` – kursive Textformatierung
* `fontSize` – eigene Schriftgröße des Textes (die ideale Größe wird automatisch berechnet)
* `angle` – Drehwinkel des Textes

## Beispiele

Ein einfaches Beispiel für die Verwendung:
```js
var docDefinition = {
  watermark: 'test watermark',
  content: [
    '...'
  ]
};
```

Beispiel mit Schriftformatierung:
```js
var docDefinition = {
  watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
  content: [
    '...'
  ]
};
```

Beispiel mit eigener Schriftgröße:
```js
var docDefinition = {
  watermark: { text: 'test watermark', fontSize: 20 },
  content: [
    '...'
  ]
};
```

Beispiel für den Drehwinkel des Wasserzeichens:
```js
var docDefinition = {
  watermark: { text: 'test watermark', angle: 70 },
  content: [
    '...'
  ]
};
```
