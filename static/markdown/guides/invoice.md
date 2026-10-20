# Invoice recipe

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/guides/invoice/

## Run the example

Install `pdfmake@0.3.12`, save this as `invoice.cjs`, and run `node invoice.cjs`. It uses standard Helvetica with ASCII content to avoid external resources. Use embedded fonts for wider language coverage.

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

## Adapt it to your application

This is a layout example, not a tax or accounting implementation. Validate quantities and prices before generating the definition. Amounts use integer cents to avoid decimal accumulation in this example; apply your domain's rounding rules separately. For an HTTP response, replace `write()` with `getBuffer()` as shown in the [Node.js quickstart](/docs/0.3/getting-started/server-side/).

`headerRows: 1` repeats the table header when rows continue onto a new page. Keep each row the same length as `widths`. Make a fresh definition for every invoice.
