+++
title = "SVGs"
description = ""
weight = 2110
alwaysopen = true
+++

SVGs are much like [images](/docs/0.3/document-definition-object/images/) except it is not currently possible to refer to SVGs by file or re-use from a dictionary.

{{% alert theme="warning" %}}The SVG node expects a valid SVG value. If the value is invalid or empty, an error is thrown.{{% /alert %}}

Library [SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit) is used to transformation from SVG to PDF document.

Node `svg` value can be string or `SVGElement` object (is available only in browser).

{{% alert theme="warning" %}}Support of `SVGElement` object required version **0.3.1** or later{{% /alert %}}

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
