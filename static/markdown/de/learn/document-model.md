# Das Dokumentmodell

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/learn/document-model/

## Mit dem Inhalt beginnen

`content` beschreibt den Hauptinhalt des PDFs. Eine einfache Zeichenfolge ist ein Absatz. Ein `content`-Array ist eine vertikale Folge von Blöcken. Ein Objekt beschreibt einen Knoten mit zusätzlichen Eigenschaften. pdfmake berechnet die Positionen; normalerweise musst du keine Koordinaten angeben.

**JavaScript**

```js
const dd = {
  content: [
    'One paragraph.',
    { text: 'Another paragraph.', bold: true },
    { text: ['One paragraph with ', { text: 'an emphasized part', italics: true }] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

const dd: TDocumentDefinitions = {
  content: [
    'One paragraph.',
    { text: 'Another paragraph.', bold: true },
    { text: ['One paragraph with ', { text: 'an emphasized part', italics: true }] }
  ]
};
```

Das verschachtelte `text`-Array erzeugt **Inline-Segmente im selben Absatz**. Ein `content`-Array oder `stack` erzeugt **getrennte Blöcke**. Dieser Unterschied erklärt viele unerwartete Zeilenumbrüche bei den ersten Dokumentdefinitionen.

## Container auswählen

| Bedarf | Knoten | Häufiger Fehler |
| --- | --- | --- |
| Mehrere Absätze mit gemeinsamem Stil | `{ stack: [...] }` | Stil-Eigenschaften direkt einem Array zuweisen wollen |
| Unabhängige Blöcke nebeneinander | `{ columns: [...] }` | Annehmen, dass Zeilen wie in einer Tabelle ausgerichtet werden |
| Ausgerichtete Zeilen und Zellen | `{ table: { body: [...] } }` | Platzhalterzellen nach `colSpan` oder `rowSpan` auslassen |
| Aufzählungs- oder nummerierte Elemente | `{ ul: [...] }` oder `{ ol: [...] }` | Eine Zeichenfolge einsetzen, obwohl ein Array mit Elementen erwartet wird |
| Unterschiedliche Stile innerhalb einer Zeile | `{ text: [...] }` | Einen Stapel verwenden, der getrennte Blöcke erzeugt |



### Runnable example: 05 · Columns & stacks

**JavaScript**

```js
var dd = {
  content: [
    { text: 'Two perspectives', fontSize: 26, bold: true, margin: [0, 0, 0, 20] },
    { columnGap: 24, columns: [
      { width: '*', stack: [{ text: 'The essentials', bold: true }, 'This column takes an equal share of the available width.', { ul: ['Text', 'Lists', 'Nested blocks'] }] },
      { width: '*', stack: [{ text: 'The details', bold: true }, 'Use fixed widths, auto widths or star widths to describe your layout.'] }
    ] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [
    { text: 'Two perspectives', fontSize: 26, bold: true, margin: [0, 0, 0, 20] },
    { columnGap: 24, columns: [
      { width: '*', stack: [{ text: 'The essentials', bold: true }, 'This column takes an equal share of the available width.', { ul: ['Text', 'Lists', 'Nested blocks'] }] },
      { width: '*', stack: [{ text: 'The details', bold: true }, 'Use fixed widths, auto widths or star widths to describe your layout.'] }
    ] }
  ]
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/de/playground/?example=columns)



## Einstellungen auf der passenden Ebene festlegen

| Ebene | Beispiele | Zweck |
| --- | --- | --- |
| Anwendungskonfiguration | `addFonts`, `addTableLayouts`, Ressourcenrichtlinien | Wiederverwendbare Ressourcen vor dem Start von Aufträgen registrieren |
| Dokumentdefinition | `content`, `styles`, `defaultStyle`, `pageMargins`, `footer` | Ein PDF beschreiben |
| Einzelner Knoten | `text`, `fontSize`, `bold`, `margin`, `pageBreak` | Ein Inhaltselement beschreiben |
| Zweites Argument von `createPdf` | `fontLayoutCache`, `bufferPages` | Engine-Optionen anpassen |

Registriere gemeinsam genutzte Schriften und Richtlinien einmal in einem Node.js-Dienst. Erzeuge für jeden Auftrag eine neue Definition: Das Layout fügt Knoten Messwerte und Positionen hinzu und verändert sie damit. Ändere die Konfiguration des gemeinsam genutzten pdfmake-Singletons nicht während paralleler Anfragen.

## Einheiten und Breiten verstehen

Maße werden in Punkten angegeben. Ein Rand mit vier Werten hat die Reihenfolge `[links, oben, rechts, unten]`. Eine numerische Breite ist eine feste Breite in Punkten; `'auto'` richtet sich nach dem Inhalt und `'*'` teilt den verbleibenden Platz mit anderen Sternspalten. Verwende zunächst feste Breiten oder Sternbreiten und ergänze inhaltsabhängige Breiten nur dann, wenn sie ein konkretes Layoutproblem lösen.

## In der Referenz weiterlesen

[Stile](/docs/0.3/de/document-definition-object/styling/) · [Tabellen](/docs/0.3/de/document-definition-object/tables/) · [Bilder](/docs/0.3/de/document-definition-object/images/) · [Seitenlayout](/docs/0.3/de/document-definition-object/page/)
