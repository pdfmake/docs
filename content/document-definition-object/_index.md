+++
title = "Document-definition-object"
description = ""
weight = 20
alwaysopen = true
+++

pdfmake follows a declarative approach. It basically means, you'll never have to calculate positions manually or use commands like: ```writeText(text, x, y)```, ```moveDown``` etc..., as you would with a lot of other libraries.

The most fundamental concept to be mastered is the document-definition-object which can be as simple as:

```js
var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
```

or become pretty complex (having multi-level tables, images, lists, paragraphs, margins, styles etc...).

#### Units

All numbers are in points (pt) unit (sometimes labeled as PDF/PostScript points).
