+++
title = "Marges"
description = "Configurez les marges des éléments dans pdfmake 0.3 avec les quatre côtés, les valeurs horizontale et verticale ou une valeur unique."
weight = 2070
alwaysopen = true
sourceDigest = "f331bdfb9263dd2a8867f8ed754a7e6eedb9072c8a27a47f57313fb56c0159cb"
+++

Chaque élément de pdfmake peut avoir une marge :

```js
// margin: [left, top, right, bottom]
{ text: 'sample', margin: [ 5, 2, 10, 20 ] },

// margin: [horizontal, vertical]
{ text: 'another text', margin: [5, 2] },

// margin: equalLeftTopRightBottom
{ text: 'last one', margin: 5 },

// single-side margins
{ text: 'sample', marginLeft: 5, marginTop: 2, marginRight: 10, marginBottom: 2 },
```
