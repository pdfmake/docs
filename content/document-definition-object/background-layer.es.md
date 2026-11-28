+++
sourceDigest = "5c5dac8a66e0c2a715ca9e59b03966f51840300097a5d71e3ae1d62e553f883a"
title = "Capa de fondo"
description = "Configura la capa de fondo en pdfmake 0.3 con ejemplos, opciones y notas de uso."
weight = 2060
alwaysopen = true
+++

La capa de fondo se añade a todas las páginas.

```js
var docDefinition = {
  background: 'simple text',

  content: ['Example document content']
};
```

También puede contener cualquier otro objeto (imágenes, tablas, etc.) o generarse dinámicamente:

```js
var docDefinition = {
  background: function(currentPage, pageSize) {
    return `page ${currentPage} with size ${pageSize.width} x ${pageSize.height}`
  },

  content: ['Example document content']
};
```
