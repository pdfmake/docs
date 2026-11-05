# Rezept: Rechnung

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/guides/invoice/

## Beispiel ausführen

Installiere `pdfmake@0.3.13`, speichere den folgenden Inhalt als `invoice.cjs` und führe `node invoice.cjs` aus. Das Beispiel verwendet die Standardschrift Helvetica mit ASCII-Inhalt, um externe Ressourcen zu vermeiden. Für eine größere Sprachenabdeckung solltest du eingebettete Schriften verwenden.

**JavaScript**

```js
// docs-test: invoice
const pdfmake = require('pdfmake');
const fonts = require('pdfmake/standard-fonts/Helvetica');
pdfmake.addFonts(fonts);
pdfmake.setUrlAccessPolicy(() => false);
const standardNames = new Set(Object.values(fonts.Helvetica));
pdfmake.setLocalAccessPolicy(name => standardNames.has(name));

async function main() {
  const items = [
    { description: 'Design services', quantity: 2, unitPriceCents: 12500 },
    { description: 'Document review', quantity: 1, unitPriceCents: 7500 }
  ];
  const money = cents => (cents / 100).toFixed(2) + ' EUR';
  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPriceCents, 0);
  const definition = {
    defaultStyle: { font: 'Helvetica', fontSize: 10 },
    pageMargins: [40, 50, 40, 50],
    info: { title: 'Invoice INV-001', author: 'Example Studio' },
    footer: (page, pages) => ({ text: `Page ${page} of ${pages}`, alignment: 'center', fontSize: 9 }),
    content: [
      { text: 'INVOICE', style: 'title' },
      { columns: ['Example Studio', { text: 'INV-001', alignment: 'right' }], margin: [0, 0, 0, 20] },
      { layout: 'lightHorizontalLines', table: {
        headerRows: 1,
        widths: ['*', 'auto', 'auto', 'auto'],
        body: [
          ['Description', 'Qty', 'Unit price', 'Amount'].map(text => ({ text, bold: true })),
          ...items.map(item => [item.description, item.quantity, money(item.unitPriceCents),
            { text: money(item.quantity * item.unitPriceCents), alignment: 'right' }])
        ]
      } },
      { text: 'Total: ' + money(total), alignment: 'right', bold: true, margin: [0, 16, 0, 0] }
    ],
    styles: { title: { fontSize: 28, bold: true, margin: [0, 0, 0, 16] } }
  };
  await pdfmake.createPdf(definition).write('invoice.pdf');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";
// docs-test: invoice
import pdfmake from "pdfmake";
const fonts = require('pdfmake/standard-fonts/Helvetica');
pdfmake.addFonts(fonts);
pdfmake.setUrlAccessPolicy(() => false);
const standardNames = new Set(Object.values(fonts.Helvetica));
pdfmake.setLocalAccessPolicy(name => standardNames.has(name));

async function main() {
  const items = [
    { description: 'Design services', quantity: 2, unitPriceCents: 12500 },
    { description: 'Document review', quantity: 1, unitPriceCents: 7500 }
  ];
  const money = (cents: number) => (cents / 100).toFixed(2) + ' EUR';
  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPriceCents, 0);
  const definition: TDocumentDefinitions = {
    defaultStyle: { font: 'Helvetica', fontSize: 10 },
    pageMargins: [40, 50, 40, 50],
    info: { title: 'Invoice INV-001', author: 'Example Studio' },
    footer: (page, pages) => ({ text: `Page ${page} of ${pages}`, alignment: 'center', fontSize: 9 }),
    content: [
      { text: 'INVOICE', style: 'title' },
      { columns: ['Example Studio', { text: 'INV-001', alignment: 'right' }], margin: [0, 0, 0, 20] },
      { layout: 'lightHorizontalLines', table: {
        headerRows: 1,
        widths: ['*', 'auto', 'auto', 'auto'],
        body: [
          ['Description', 'Qty', 'Unit price', 'Amount'].map(text => ({ text, bold: true })),
          ...items.map(item => [item.description, item.quantity, money(item.unitPriceCents),
            { text: money(item.quantity * item.unitPriceCents), alignment: 'right' }])
        ]
      } },
      { text: 'Total: ' + money(total), alignment: 'right', bold: true, margin: [0, 16, 0, 0] }
    ],
    styles: { title: { fontSize: 28, bold: true, margin: [0, 0, 0, 16] } }
  };
  await pdfmake.createPdf(definition).write('invoice.pdf');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
```

## An deine Anwendung anpassen

Dies ist ein Layoutbeispiel und keine Steuer- oder Buchhaltungslösung. Prüfe Mengen und Preise, bevor du die Definition erzeugst. In diesem Beispiel werden Beträge als ganzzahlige Cent-Werte gespeichert, um Dezimalfehler durch wiederholte Addition zu vermeiden; wende deine fachlichen Rundungsregeln separat an. Ersetze für eine HTTP-Antwort `write()` durch `getBuffer()`, wie in der [Node.js-Schnellstartanleitung](/docs/0.3/de/getting-started/server-side/) gezeigt.

`headerRows: 1` wiederholt die Tabellenkopfzeile, wenn die Zeilen auf einer neuen Seite fortgesetzt werden. Jede Zeile muss dieselbe Länge wie `widths` haben. Erzeuge für jede Rechnung eine neue Definition.
