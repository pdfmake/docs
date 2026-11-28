# Inhaltsverzeichnis

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/document-definition-object/toc/

## Überschriften zur Aufnahme markieren

**JavaScript**

```js
var docDefinition = {
  content: [
    { toc: { title: { text: 'Contents', fontSize: 20, bold: true }, numberStyle: { bold: true } } },
    { text: 'Introduction', tocItem: true, fontSize: 18, margin: [0, 20, 0, 10] },
    'Document body',
    { text: 'Details', tocItem: true, pageBreak: 'before', fontSize: 18 }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: [
    { toc: { title: { text: 'Contents', fontSize: 20, bold: true }, numberStyle: { bold: true } } },
    { text: 'Introduction', tocItem: true, fontSize: 18, margin: [0, 20, 0, 10] },
    'Document body',
    { text: 'Details', tocItem: true, pageBreak: 'before', fontSize: 18 }
  ]
};
```

Der `toc`-Knoten fügt das erzeugte Verzeichnis ein; `tocItem` markiert Textknoten, die darin aufgeführt werden sollen. Die Seitenzahlen werden während des Layouts berechnet.

## Mehrere Inhaltsverzeichnisse

Jedes Inhaltsverzeichnis ist ein eigener Inhaltsknoten. Mit IDs legst du fest, in welchen Listen die einzelnen Einträge erscheinen:

**JavaScript**

```js
var docDefinition = {
  content: [
    { toc: { id: 'main', title: 'All sections' } },
    { toc: { id: 'details', title: 'Detailed sections' } },
    { text: 'Overview', tocItem: 'main' },
    { text: 'Technical details', tocItem: ['main', 'details'], pageBreak: 'before' }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: [
    { toc: { id: 'main', title: 'All sections' } },
    { toc: { id: 'details', title: 'Detailed sections' } },
    { text: 'Overview', tocItem: 'main' },
    { text: 'Technical details', tocItem: ['main', 'details'], pageBreak: 'before' }
  ]
};
```

Füge nicht zwei `toc`-Schlüssel in dasselbe Objekt ein; JavaScript behält nur den letzten Wert.

## Optionen des Inhaltsverzeichnisses

| Feld | Typ | Bedeutung |
| --- | --- | --- |
| `id` | string | Kennung für ein benanntes Inhaltsverzeichnis |
| `title` | string oder Textknoten | Optionaler Titel |
| `textStyle`, `numberStyle` | Stilobjekt | Formatierung des Eintragstextes und der Seitenzahl |
| `textMargin` | Abstand | Abstand des Eintrags |
| `hideEmpty` | boolean | Leeres Inhaltsverzeichnis ausblenden; Standard `false`, seit 0.3.3 |
| `sortBy` | `'page'` oder `'title'` | Sortierreihenfolge; Standard `page`, seit 0.3.3 |
| `sortLocale` | string | Gebietsschema für die Sortierung; standardmäßig das Laufzeitgebietsschema, seit 0.3.3 |
| `outlines` | boolean | Einträge in PDF-Lesezeichen aufnehmen; seit 0.3.5 |

Bei einem markierten Textknoten akzeptiert `tocItem` den Wert `true`, eine ToC-ID oder ein Array mit IDs. Mit `textStyle`, `numberStyle` und `textMargin` des Textknotens kannst du den Eintrag formatieren. Steuere Lesezeichen über [Gliederungen](/docs/0.3/de/document-definition-object/outlines/).
