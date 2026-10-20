# Receta para una factura

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/guides/invoice/

## Ejecutar el ejemplo

Instala `pdfmake@0.3.12`, guarda el siguiente código como `invoice.cjs` y ejecútalo con `node invoice.cjs`. Usa Helvetica estándar con contenido ASCII para evitar recursos externos. Para una cobertura más amplia de idiomas, usa fuentes incrustadas.

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

## Adaptarlo a tu aplicación

Este ejemplo se centra en la maquetación; no implementa impuestos ni contabilidad. Valida las cantidades y los precios antes de generar la definición. Aquí los importes se expresan en céntimos enteros para evitar acumular errores decimales; aplica por separado las reglas de redondeo de tu dominio. Para una respuesta HTTP, sustituye `write()` por `getBuffer()`, como se muestra en el [inicio rápido de Node.js](/docs/0.3/es/getting-started/server-side/).

`headerRows: 1` repite el encabezado de la tabla cuando las filas continúan en una página nueva. Mantén la misma longitud en cada fila que en `widths`. Crea una definición nueva para cada factura.
