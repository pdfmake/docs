# Übersicht

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/

Erstelle eine PDF in drei Schritten: Laufzeit einrichten, Inhalt beschreiben und Ausgabe anfordern.

## 1. Laufzeit auswählen




Verwende Node.js 20 oder neuer. Installiere die folgende feste Version, speichere das vollständige Beispiel als `first-pdf.cjs` und starte `node first-pdf.cjs`.

```sh
npm install pdfmake@0.3.12
```

**JavaScript**

```js
const pdfmake = require('pdfmake');

const fonts = require('pdfmake/standard-fonts/Helvetica');
pdfmake.addFonts(fonts);
pdfmake.setUrlAccessPolicy(() => false);
const standardNames = new Set(Object.values(fonts.Helvetica));
pdfmake.setLocalAccessPolicy(name => standardNames.has(name));

async function main() {
  const definition = {
    defaultStyle: { font: 'Helvetica' },
    content: [
      { text: 'Hello, pdfmake!', fontSize: 24, bold: true },
      'Your first PDF, generated in Node.js.'
    ]
  };
  await pdfmake.createPdf(definition).write('document.pdf');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfmake from "pdfmake";

const fonts = require('pdfmake/standard-fonts/Helvetica');
pdfmake.addFonts(fonts);
pdfmake.setUrlAccessPolicy(() => false);
const standardNames = new Set(Object.values(fonts.Helvetica));
pdfmake.setLocalAccessPolicy(name => standardNames.has(name));

async function main() {
  const definition: TDocumentDefinitions = {
    defaultStyle: { font: 'Helvetica' },
    content: [
      { text: 'Hello, pdfmake!', fontSize: 24, bold: true },
      'Your first PDF, generated in Node.js.'
    ]
  };
  await pdfmake.createPdf(definition).write('document.pdf');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
```

[Node.js-Schnellstart](/docs/0.3/de/getting-started/server-side/)




Im Browser brauchst du Engine und Schriften in dieser Reihenfolge. Der vollständige Schnellstart enthält einen Download-Button und Fehlerbehandlung.

[Browser-Schnellstart](/docs/0.3/de/getting-started/client-side/)



## 2. Die Definition verstehen

Die Definition ist ein JavaScript-Objekt, kein HTML. `content` enthält Blöcke in Lesereihenfolge. Dieses Beispiel erzeugt genau die sichtbare PDF. Bearbeite es im Playground und kehre hierher zurück, ohne deinen Arbeitsbereich zu verlieren.



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



## 3. Mit dem passenden Baustein weitermachen

- [Deine erste PDF](/docs/0.3/de/learn/first-pdf/)
- [Das Dokumentmodell](/docs/0.3/de/learn/document-model/)
- [Stile und Formatierung](/docs/0.3/de/document-definition-object/styling/)
- [Tabellen](/docs/0.3/de/document-definition-object/tables/)
- [Schriften und Zeichensätze](/docs/0.3/de/fonts/)
- [Fehler erkennen und behandeln](/docs/0.3/de/guides/errors/)

Verwende bei jeder Generierung eine neue Definition, weil das Layout das Objekt verändert. Ausgabemethoden liefern Promises: Warte mit `await` und behandle Fehler.
