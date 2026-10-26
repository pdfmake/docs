# Wasserzeichen

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/document-definition-object/watermark/

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
**JavaScript**

```js
var docDefinition = {
  watermark: 'test watermark',
  content: [
    '...'
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  watermark: 'test watermark',
  content: [
    '...'
  ]
};
```

Beispiel mit Schriftformatierung:
**JavaScript**

```js
var docDefinition = {
  watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
  content: [
    '...'
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
  content: [
    '...'
  ]
};
```

Beispiel mit eigener Schriftgröße:
**JavaScript**

```js
var docDefinition = {
  watermark: { text: 'test watermark', fontSize: 20 },
  content: [
    '...'
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  watermark: { text: 'test watermark', fontSize: 20 },
  content: [
    '...'
  ]
};
```

Beispiel für den Drehwinkel des Wasserzeichens:
**JavaScript**

```js
var docDefinition = {
  watermark: { text: 'test watermark', angle: 70 },
  content: [
    '...'
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  watermark: { text: 'test watermark', angle: 70 },
  content: [
    '...'
  ]
};
```
