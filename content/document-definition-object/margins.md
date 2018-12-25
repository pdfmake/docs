+++
title = "Margins"
description = ""
weight = 27
alwaysopen = true
+++


Any element in pdfMake can have a margin:

```js
(...)
// margin: [left, top, right, bottom]
{ text: 'sample', margin: [ 5, 2, 10, 20 ] },

// margin: [horizontal, vertical]
{ text: 'another text', margin: [5, 2] },

// margin: equalLeftTopRightBottom
{ text: 'last one', margin: 5 }
(...)
```