+++
title = "Plano de fundo"
description = "Defina um plano de fundo estático ou dinâmico aplicado a todas as páginas do documento pdfmake 0.3."
weight = 2060
alwaysopen = true
sourceDigest = "5c5dac8a66e0c2a715ca9e59b03966f51840300097a5d71e3ae1d62e553f883a"
+++

O plano de fundo é adicionado a todas as páginas.

```js
var docDefinition = {
  background: 'simple text',

  content: ['Example document content']
};
```

Ele também pode conter qualquer outro objeto, como imagens e tabelas, ou ser gerado dinamicamente:

```js
var docDefinition = {
  background: function(currentPage, pageSize) {
    return `page ${currentPage} with size ${pageSize.width} x ${pageSize.height}`
  },

  content: ['Example document content']
};
```
