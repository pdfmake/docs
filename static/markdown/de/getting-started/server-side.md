# Node.js-Schnellstart

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/getting-started/server-side/

## Installieren

Verwende **Node.js 20 oder neuer**. Erstelle eine Anwendung und installiere pdfmake:

```sh
npm init -y
npm install pdfmake@0.3.12
```

Die genaue Version macht das Beispiel reproduzierbar. Prüfe die Versionshinweise und teste, bevor du ein neueres Patch-Release auswählst.

## Erste PDF-Datei schreiben

Speichere das vollständige Beispiel als `first-pdf.cjs` und führe `node first-pdf.cjs` aus.

**JavaScript**

```js
// docs-test: node-quickstart
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
// docs-test: node-quickstart
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

`write()` wird erfüllt, wenn die Ausgabedatei geschlossen ist. Behandle abgelehnte Promises, damit eine fehlgeschlagene Generierung nicht unbemerkt zu einer erfolgreichen API-Antwort führt.

Helvetica benötigt keine lokalen Schriftdateien. Daher sperrt das Beispiel externe URLs und erlaubt über die lokale Richtlinie nur Standard-Schriftkennungen. Die aktuelle Implementierung prüft diese Kennungen, obwohl sie keine Dateipfade sind. Standardschriften haben eine begrenzte Zeichenabdeckung. Für mehrsprachige Dokumente [registriere geeignete Schriftdateien](/docs/0.3/de/fonts/) und erlaube ihre aufgelösten Pfade ausdrücklich.

## PDF-Bytes über eine API zurückgeben

**JavaScript**

```js
const buffer = await pdfmake.createPdf({
  defaultStyle: { font: 'Helvetica' },
  content: ['API document']
}).getBuffer();

// Adapt these lines to your HTTP framework:
response.setHeader('Content-Type', 'application/pdf');
response.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
response.end(buffer);
```

**TypeScript**

```ts
const buffer = await pdfmake.createPdf({
  defaultStyle: { font: 'Helvetica' },
  content: ['API document']
}).getBuffer();

// Adapt these lines to your HTTP framework:
response.setHeader('Content-Type', 'application/pdf');
response.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
response.end(buffer);
```

Dieses Snippet setzt voraus, dass `pdfmake` wie oben konfiguriert und `response` das Response-Objekt deines Frameworks ist. Prüfe Anfragedaten, bevor du eine Definition erstellst. Erzeuge für jede Anfrage eine neue Definition; das Layout verändert sie.

## ESM-Anwendungen

Das Node.js-Paket exportiert ein konfiguriertes Singleton. Verwende in einer ESM-Anwendung `import pdfmake from 'pdfmake'`; erstelle keine Instanz mit `new PdfPrinter(...)` wie in älteren Beispielen. Registriere Schriften und Richtlinien einmal beim Anwendungsstart. Ändere die Singleton-Konfiguration nicht für parallele Anfragen.

## Nächste Schritte

[Ausgabemethoden](/docs/0.3/de/getting-started/server-side/methods/) · [Ressourcenzugriff](/docs/0.3/de/guides/resource-security/) · [Rezept: Rechnung](/docs/0.3/de/guides/invoice/)
