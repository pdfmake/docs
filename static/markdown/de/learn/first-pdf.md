# Deine erste PDF

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/learn/first-pdf/

## 1. Die zwei Zutaten verstehen

pdfmake benötigt eine **Engine mit Schriften** und eine **Dokumentdefinition**. Die Definition ist ein JavaScript-Objekt, das den zu druckenden Inhalt beschreibt. Sie ist kein HTML und erzeugt erst dann etwas, wenn du sie an `createPdf` übergibst und eine Ausgabe anforderst.

Probiere zunächst das folgende Beispiel im Browser aus. Engine und Roboto-Schrift sind bereits eingerichtet. Richte anschließend in Schritt 3 deine Laufzeit ein.

## 2. Eine vollständige Definition ansehen

Das folgende Ergebnis wird exakt mit diesem Code erzeugt. Drei Einträge in `content` ergeben drei Blöcke untereinander. Text wird automatisch umgebrochen; Ränder und Schriftgrößen werden in PDF-Punkten gemessen (72 Punkte = 1 Zoll).



### Runnable example: 01 · First document

**JavaScript**

```js
// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd: TDocumentDefinitions = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/de/playground/?example=welcome)



Ändere im Playground die Überschrift oder Schriftgröße. Bei aktivierter **Live-Vorschau** erscheint die neue PDF, wenn du mit dem Tippen pausierst. Änderungen lassen sich rückgängig machen; du kannst benannte Dokumente im Browser speichern oder eine JavaScript-Datei exportieren.

## 3. Deine Anwendung einrichten

Wähle **eine** Einrichtung. Kombiniere den Node.js-Einstieg nicht mit Browser-Ausgabemethoden.

| Laufzeit | Einrichtung | Warum Schriften wichtig sind |
| --- | --- | --- |
| Node.js-API | [Vollständiger Node.js-Schnellstart](/docs/0.3/de/getting-started/server-side/) | Registriere echte Schriftdateien oder eine Standardschriftfamilie vor dem Rendern |
| Browseranwendung | [Vollständiger Browser-Schnellstart](/docs/0.3/de/getting-started/client-side/) | Lade `pdfmake.min.js` und anschließend ein Schrift-VFS oder registriere es im Bundler |

Das Beispiel verwendet `Roboto`, die Standardschrift im Browser. Wenn du die Definition mit der Helvetica-Einrichtung aus dem Node.js-Schnellstart verwendest, ergänze `defaultStyle: { font: 'Helvetica' }` oder registriere Roboto-Dateien. Unicode-Text benötigt außerdem eine Schrift, die die verwendeten Zeichen enthält; eine gültige Zeichenfolge liefert keine fehlenden Glyphen mit.

## 4. Ausgabe anfordern und Fehler behandeln

In einer eingerichteten Browseranwendung:

**JavaScript**

```js
try {
  await pdfMake.createPdf(dd).download('first-document.pdf');
} catch (error) {
  document.querySelector('#status').textContent = error.message;
}
```

**TypeScript**

```ts
try {
  await pdfMake.createPdf(dd).download('first-document.pdf');
} catch (error) {
  document.querySelector('#status').textContent = error.message;
}
```

Hier ist `dd` die oben gezeigte Definition und `#status` ein Element deiner Anwendung. Verwende in Node.js stattdessen `await pdfmake.createPdf(dd).write('first-document.pdf')`. `createPdf` gibt einen Ausgabe-Wrapper zurück; die Ausgabemethode liefert das Promise, auf das du warten musst. Ohne `await` oder `.catch(...)` erreicht ein Generierungsfehler möglicherweise nie deine Benutzeroberfläche.

## 5. Jeweils ein Konzept ergänzen

Behalte das erste funktionierende Dokument. Ergänze anschließend [benannte Stile](/docs/0.3/de/document-definition-object/styling/) und danach [Tabellen](/docs/0.3/de/document-definition-object/tables/), wenn du Zeilen brauchst. Verwende das [Dokumentmodell](/docs/0.3/de/learn/document-model/), um den passenden Knotentyp auszuwählen. Wenn ein Fehler auftritt, [ordne ihn zunächst einer Fehlerklasse zu](/docs/0.3/de/guides/errors/), bevor du gleichzeitig Schriften, Layout und Ressourcen änderst.
