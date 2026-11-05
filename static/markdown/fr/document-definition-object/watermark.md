# Filigrane

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/watermark/

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

Exemple de style de police :
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

Exemple avec une taille de police personnalisée :
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

Exemple d’angle de rotation du filigrane :
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
