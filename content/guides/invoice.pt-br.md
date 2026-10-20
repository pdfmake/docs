+++
title = "Exemplo de fatura"
description = "Gere um PDF de fatura completo com estilos reutilizáveis, cabeçalho de tabela repetido, totais e numeração de páginas."
weight = 1
sourceDigest = "834285f04d4a3a792e6f17f99a72113c67334451ebcb39a498d27c528c9f8cc4"
+++

## Execute o exemplo

Instale `pdfmake@0.3.12`, salve este código como `invoice.cjs` e execute `node invoice.cjs`. Ele usa Helvetica padrão com conteúdo ASCII para evitar recursos externos. Para maior cobertura de idiomas, use fontes incorporadas.

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

## Adapte à sua aplicação

Este é um exemplo de layout, não uma implementação fiscal ou contábil. Valide quantidades e preços antes de gerar a definição. Neste exemplo, os valores usam centavos inteiros para evitar o acúmulo de erros decimais; aplique separadamente as regras de arredondamento do seu domínio. Para uma resposta HTTP, substitua `write()` por `getBuffer()`, como no [início rápido para Node.js](/docs/0.3/pt-br/getting-started/server-side/).

`headerRows: 1` repete o cabeçalho da tabela quando as linhas continuam em uma página seguinte. Mantenha o mesmo número de células em cada linha e em `widths`. Crie uma definição nova para cada fatura.
