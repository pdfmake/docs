+++
title = "Arrière-plan"
description = "Ajoutez un arrière-plan à chaque page à l’aide d’un texte, d’un objet ou d’une fonction."
weight = 2060
alwaysopen = true
sourceDigest = "5c5dac8a66e0c2a715ca9e59b03966f51840300097a5d71e3ae1d62e553f883a"
+++

L’arrière-plan est ajouté à chaque page.

```js
var docDefinition = {
  background: 'simple text',

  content: ['Example document content']
};
```

Il peut également contenir n’importe quel autre objet (images, tableaux, etc.) ou être généré dynamiquement :

```js
var docDefinition = {
  background: function(currentPage, pageSize) {
    return `page ${currentPage} with size ${pageSize.width} x ${pageSize.height}`
  },

  content: ['Example document content']
};
```
