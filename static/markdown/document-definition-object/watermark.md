# Watermark

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/document-definition-object/watermark/

## Properties

* `text` - watermark text
* `color` - color of text
* `opacity` opacity of text
* `bold` - bold style of text
* `italics` - italics style of text
* `fontSize` - own font size of text (ideal size is calculated automatically)
* `angle` - angle of text rotation

## Examples

Example of simple basic usage:
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

Example of font style:
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

Example of own font size:
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

Example of watermark rotation angle:
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
