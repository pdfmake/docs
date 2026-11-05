# Migration von 0.1/0.2

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/migration-from-0.1/

## Geplant aktualisieren

Fixiere die Version, die du prüfst. Bewahre repräsentative bestehende PDFs und die Eingaben und Schriften auf, mit denen sie erzeugt wurden. Vergleiche vor dem Upgrade in der Produktion den extrahierten Text, die Seitenzahl und gerenderte Seiten. Bytegenau identische Ausgaben sind oft ungeeignet, weil sich PDF-Metadaten und Kennungen unterscheiden können.

## Node-Konstruktor-API ersetzen

Ältere Node.js-Beispiele erstellen `PdfPrinter` und rufen `createPdfKitDocument` auf. Verwende in 0.3 das Singleton:

**JavaScript**

```js
const pdfmake = require('pdfmake');
pdfmake.addFonts(fonts);
await pdfmake.createPdf(docDefinition).write('document.pdf');
```

**TypeScript**

```ts
import pdfmake from "pdfmake";
pdfmake.addFonts(fonts);
await pdfmake.createPdf(docDefinition).write('document.pdf');
```

`fonts` muss eine gültige Zuordnung von Schriftfamilien sein, wie in der [Node.js-Schnellstartanleitung](/docs/0.3/de/getting-started/server-side/) und im [Schriftenleitfaden](/docs/0.3/de/fonts/) gezeigt. Konfiguriere Richtlinien und Layouts beim Start und vermeide Änderungen am gemeinsam genutzten Singleton pro Anfrage.

## Auf Ausgabemethoden warten

Ersetze callbackbasierte Browserausgabe durch Promises:

**JavaScript**

```js
const data = await pdfMake.createPdf(docDefinition).getBase64();
```

**TypeScript**

```ts
const data = await pdfMake.createPdf(docDefinition).getBase64();
```

Behandle Ablehnungen der Ausgabemethoden. Verwende die [Node.js-Methoden](/docs/0.3/de/getting-started/server-side/methods/) oder [Browsermethoden](/docs/0.3/de/getting-started/client-side/methods/) für die jeweilige Zielumgebung.

## Browser-Schriftdateien neu erzeugen

Erzeuge benutzerdefinierte VFS-Dateien neu und passe die Registrierung auf `addVirtualFileSystem` an. Nimm nicht an, dass das Format einer älteren generierten Schriftdatei mit dem aktuellen Bundle übereinstimmt. Siehe [VFS-Schriften](/docs/0.3/de/fonts/custom-fonts-client-side/vfs/).

## `pageBreakBefore` aktualisieren

Version 0.1/0.2 übergab separate Knoten-Arrays. Version 0.3 übergibt einen Knotenkontainer:

**JavaScript**

```js
var dd = { content: ['Example document'],
pageBreakBefore: function (currentNode, nodeContainer) {
  return currentNode.headlineLevel === 1 &&
    nodeContainer.getFollowingNodesOnPage().length === 0;
}
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: ['Example document'],
pageBreakBefore: function (currentNode, nodeContainer) {
  return currentNode.headlineLevel === 1 &&
    nodeContainer.getFollowingNodesOnPage().length === 0;
}
};
```

Der Kontainer bietet außerdem `getNodesOnNextPage()` und `getPreviousNodesOnPage()`. Dieses Snippet ist eine Eigenschaft innerhalb einer Definition, kein eigenständiges JavaScript. Siehe [Seitenumbrüche](/docs/0.3/de/document-definition-object/page/).

## Ressourcenzugriff konfigurieren

Konfiguriere für **0.3.6+** eine synchrone URL-Zugriffsrichtlinie und für **0.3.8+** eine Richtlinie für lokale Dateien. Prüfe sowohl erlaubte als auch abgelehnte Ressourcen. Siehe [Ressourcensicherheit](/docs/0.3/de/guides/resource-security/).
