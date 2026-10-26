+++
sourceDigest = "3be141146a4c948512e50597ef37f878749e249c98a65a0af17c20b1e7cc62b3"
title = "Übersicht"
description = "PDFs mit pdfmake 0.3 erstellen: verständliche Anleitungen, ausführbare Beispiele und Referenz für JavaScript."
weight = 0
+++

Erstelle eine PDF in drei Schritten: Laufzeit einrichten, Inhalt beschreiben und Ausgabe anfordern.

## 1. Laufzeit auswählen

<div class="runtime-picker" data-runtime-picker role="tablist" aria-label="Runtime"><button type="button" role="tab" id="runtime-node" aria-controls="panel-node" data-runtime="node" aria-selected="true">Node.js / API</button><button type="button" role="tab" id="runtime-browser" aria-controls="panel-browser" data-runtime="browser" aria-selected="false">Browser</button></div>
<div data-runtime-panel="node" role="tabpanel" id="panel-node" aria-labelledby="runtime-node">

Verwende Node.js 20 oder neuer. Installiere die folgende feste Version, speichere das vollständige Beispiel als `first-pdf.cjs` und starte `node first-pdf.cjs`.

```sh
npm install pdfmake@0.3.13
```

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

[Node.js-Schnellstart](/docs/0.3/de/getting-started/server-side/)

</div>
<div data-runtime-panel="browser" role="tabpanel" id="panel-browser" aria-labelledby="runtime-browser">

Im Browser brauchst du Engine und Schriften in dieser Reihenfolge. Der vollständige Schnellstart enthält einen Download-Button und Fehlerbehandlung.

[Browser-Schnellstart](/docs/0.3/de/getting-started/client-side/)

</div>

## 2. Die Definition verstehen

Die Definition ist ein JavaScript-Objekt, kein HTML. `content` enthält Blöcke in Lesereihenfolge. Dieses Beispiel erzeugt genau die sichtbare PDF. Bearbeite es im Playground und kehre hierher zurück, ohne deinen Arbeitsbereich zu verlieren.

{{< example id="welcome" >}}

## 3. Mit dem passenden Baustein weitermachen

- [Deine erste PDF](/docs/0.3/de/learn/first-pdf/)
- [Das Dokumentmodell](/docs/0.3/de/learn/document-model/)
- [Stile und Formatierung](/docs/0.3/de/document-definition-object/styling/)
- [Tabellen](/docs/0.3/de/document-definition-object/tables/)
- [Schriften und Zeichensätze](/docs/0.3/de/fonts/)
- [Fehler erkennen und behandeln](/docs/0.3/de/guides/errors/)

Verwende bei jeder Generierung eine neue Definition, weil das Layout das Objekt verändert. Ausgabemethoden liefern Promises: Warte mit `await` und behandle Fehler.
