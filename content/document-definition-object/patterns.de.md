+++
title = "Muster"
description = "Definiere und verwende Kachelmuster für Text, Vektoren und Tabellenzellen in pdfmake 0.3."
weight = 2270
alwaysopen = true
sourceDigest = "85d5a2f40ac8d6ba0cd8c74c4dd5d7261674b55739b2309aa929c3410047b331"
+++

Muster lassen sich als Wörterbuch vordefinierter Muster in der Dokumentdefinition angeben.

Unterstützt werden nur Kachelmuster.

## Musterdefinition

Jedes Muster wird mit folgenden Eigenschaften definiert:

- `boundingBox` – Begrenzungsrahmen zum Beschneiden der Musterzelle
- `xStep` – horizontaler Abstand zwischen Zellen
- `yStep` – vertikaler Abstand zwischen Zellen
- `pattern` – PDF-Datenstrom mit den Operationen zum Zeichnen der Grafiken und des Textes in der Zelle

Weitere Informationen zu den Eigenschaften und Mustern im Allgemeinen findest du in der [PDF-Referenz](https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/pdf_reference_archives/PDFReference.pdf), insbesondere in Abschnitt 4.6 und 4.6.2 zu Kachelmustern.

## Beispiel einer Musterdefinition

Ein einfaches Muster mit Streifen im 45°-Winkel:

```js
var docDefinition = {
  content: ["..."],
  patterns: {
    stripe45d: {
      boundingBox: [1, 1, 4, 4],
      xStep: 3,
      yStep: 3,
      pattern: "1 w 0 1 m 4 5 l s 2 0 m 5 3 l s",
    },
  },
};
```

Die Ausgabe ist im Vektorbeispiel zu sehen.

## Verwendung in Vektoren, Tabellen und Text

Die folgenden Eigenschaften stehen zur Verfügung.

Für Text:

- `background` – als Texthintergrund setzen (siehe Beispiel `styling_properties`)

Für Vektoren:

- `color` – als Füllung eines Vektors setzen (siehe das Rechteck im Vektorbeispiel)

Für Tabellenzellen:

- `fillColor` – Füllfarbe der Zelle (Hintergrund)
- `overlayPattern` – Muster über den Zellinhalt legen
- `overlayOpacity` – Deckkraft der Überlagerung

Jede dieser Eigenschaften wird als Tupel `[string, string]` angegeben. Das erste Element ist der Schlüssel im Musterwörterbuch, das zweite die Farbe, mit der das Muster gezeichnet wird.

## Beispiele

Text:

```js
{ text: 'Insert lorem. And ipsum', background: ['stripe45d', 'gray'] }
```

Vektor:

```js
{
  type: 'rect',
  x: 10, y: 250, w: 50, h: 30,
  color: ['stripe45d', 'blue'],
}
```

Tabelle (wie in Tabellenzellen verwendet):

```js
{
  text: 'Sample value',
  fillOpacity: 0.85,
  fillColor: ['stripe45d', 'blue']
}
```

```js
{
  text: 'Sample value',
  fillOpacity: 0.15,
  fillColor: 'blue',
  overlayPattern: ['stripe45d', 'gray'],
  overlayOpacity: 0.15
}
```
