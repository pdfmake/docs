+++
title = "Hintergrundebene"
description = "Lege mit Beispielen, Optionen und Anwendungshinweisen die Hintergrundebene in pdfmake 0.3 fest."
weight = 2060
alwaysopen = true
sourceDigest = "5c5dac8a66e0c2a715ca9e59b03966f51840300097a5d71e3ae1d62e553f883a"
+++

Die Hintergrundebene wird auf jeder Seite eingefügt.

```js
var docDefinition = {
  background: 'simple text',

  content: ['Example document content']
};
```

Sie kann auch jedes andere Objekt enthalten (Bilder, Tabellen usw.) oder dynamisch erzeugt werden:

```js
var docDefinition = {
  background: function(currentPage, pageSize) {
    return `page ${currentPage} with size ${pageSize.width} x ${pageSize.height}`
  },

  content: ['Example document content']
};
```
