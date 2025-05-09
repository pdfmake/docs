+++
title = "Patterns"
description = ""
weight = 2270
alwaysopen = true
+++

Patterns can be defined as a dictionary of predefined patterns in the document definition.

Only tiling patterns are supported.

#### Pattern definition

Each pattern is defined using:

- `boundingBox` - bounding box used to clip the pattern cell
- `xStep` - horizontal spacing between cells
- `yStep` - vertical spacing between cells
- `pattern` - a PDF stream of operations that render the graphics/text of the cell

For more information on each property and patterns in general see the [PDF reference](https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/pdf_reference_archives/PDFReference.pdf), section 4.6 and 4.6.2 specifically on tiling patterns.

#### Pattern definition example

Basic pattern that produces a 45° stripe pattern:

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

The output can be seen in the vector example.

#### Usage in vectors, tables and text

The following properties are available.

For text:

- `background` - set as background for text (see styling_properties example)

For vectors:

- `color` - set as fill for a vector (see the rectangle in vector example)

For table cells:

- `fillColor` - cell (background) fill color
- `overlayPattern` - overlay for a cell, painted over the contents
- `overlayOpacity` - the opacity of the overlay

Each of the above properties is defined as a tuple `[string, string]`. The first element is the key in the patterns dictionary and the second is the color to use to paint the pattern.

#### Examples

Text:

```js
{ text: 'Insert lorem. And ipsum', background: ['stripe45d', 'gray'] }
```

Vector:

```js
{
  type: 'rect',
  x: 10, y: 250, w: 50, h: 30,
  color: ['stripe45d', 'blue'],
}
```

Table (as used in table cells):

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
