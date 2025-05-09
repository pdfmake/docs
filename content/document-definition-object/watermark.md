+++
title = "Watermark"
description = ""
weight = 2240
alwaysopen = true
+++

#### Properties

* `text` - watermark text
* `color` - color of text
* `opacity` opacity of text
* `bold` - bold style of text
* `italics` - italics style of text
* `fontSize` - own font size of text (ideal size is calculated automatically)
* `angle` - angle of text rotation

#### Examples

Example of simple basic usage:
```js
var docDefinition = {
  watermark: 'test watermark',
  content: [
    '...'
  ]
};
```

Example of font style:
```js
var docDefinition = {
  watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
  content: [
    '...'
  ]
};
```

Example of own font size:
```js
var docDefinition = {
  watermark: { text: 'test watermark', fontSize: 20 },
  content: [
    '...'
  ]
};
```

Example of watermark rotation angle:
```js
var docDefinition = {
  watermark: { text: 'test watermark', angle: 70 },
  content: [
    '...'
  ]
};
```