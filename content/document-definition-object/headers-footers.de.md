+++
title = "Kopf- und Fußzeilen"
description = "Füge statische oder dynamische Seitenkopf- und Fußzeilen mit Seitenzahlen und Gesamtseitenzahl hinzu und reserviere Platz in den Seitenrändern."
weight = 2050
sourceDigest = "a47e47aa446dfbb4a3b97ade1254c9b6edbe8abfc9b34ac2cd7d2cfaac111b14"
+++

## Statische Kopfzeile hinzufügen

```js
var docDefinition = {
  pageMargins: [40, 65, 40, 55],
  header: { text: 'Example report', margin: [40, 20, 40, 0] },
  footer: { text: 'Example Studio', alignment: 'center', fontSize: 9 },
  content: ['Document content']
};
```

Kopf- und Fußzeilen werden auf den Seiten wiederholt. Reserviere in den oberen und unteren Rändern genügend Platz für ihren Inhalt; die Ränder des Hauptinhalts werden nicht automatisch vergrößert. Zurückgegebener Inhalt verwendet normale pdfmake-Knoten.

## Seitenzahlen hinzufügen

```js
var docDefinition = {
  pageMargins: [40, 65, 40, 55],
  header: function (currentPage, pageCount, pageSize) {
    return {
      text: 'Report · ' + pageSize.width + ' pt wide',
      alignment: currentPage % 2 ? 'left' : 'right',
      margin: [40, 20, 40, 0],
      fontSize: 9
    };
  },
  footer: function (currentPage, pageCount) {
    return { text: currentPage + ' of ' + pageCount, alignment: 'center', fontSize: 9 };
  },
  content: ['First page', { text: 'Second page', pageBreak: 'before' }]
};
```

Callbacks erhalten die aktuelle Seitennummer (beginnend bei 1), die Gesamtseitenzahl und die Seitengröße. Gib bei jedem Aufruf einen neuen Knoten zurück. Sorge für deterministische Callbacks und vermeide Änderungen an gemeinsam genutzten Anwendungsdaten.
