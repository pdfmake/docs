+++
title = "Recette de facture"
description = "Générez un PDF de facture complet avec styles réutilisables, en-tête de tableau répété, totaux et numéros de page."
weight = 1
sourceDigest = "834285f04d4a3a792e6f17f99a72113c67334451ebcb39a498d27c528c9f8cc4"
+++

## Exécuter l’exemple

Installez `pdfmake@0.3.12`, enregistrez ce fichier sous `invoice.cjs` et lancez `node invoice.cjs`. L’exemple utilise Helvetica standard et du contenu ASCII afin d’éviter les ressources externes. Pour une couverture linguistique plus large, utilisez des polices incorporées.

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

## Adapter l’exemple à votre application

Il s’agit d’un exemple de mise en page, pas d’une implémentation fiscale ou comptable. Validez les quantités et les prix avant de générer la définition. Cet exemple utilise des centimes entiers pour éviter l’accumulation d’erreurs décimales ; appliquez séparément les règles d’arrondi de votre domaine. Pour une réponse HTTP, remplacez `write()` par `getBuffer()`, comme dans le [démarrage rapide Node.js](/docs/0.3/fr/getting-started/server-side/).

`headerRows: 1` répète l’en-tête du tableau lorsque les lignes se poursuivent sur une nouvelle page. Chaque ligne doit avoir la même longueur que `widths`. Créez une nouvelle définition pour chaque facture.
