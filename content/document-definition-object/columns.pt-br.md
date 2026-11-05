+++
title = "Colunas"
description = "Organize conteúdo em colunas de larguras automáticas, proporcionais ou fixas no pdfmake 0.3."
weight = 2020
alwaysopen = true
sourceDigest = "c5cad4de1cdcd5bc45a17a7f4bc373478b5f7e877859ca80db4facadca0459da"
+++

Por padrão, os parágrafos são renderizados como uma pilha vertical de elementos, um abaixo do outro. Também é possível dividir o espaço disponível em colunas.

```js
var docDefinition = {
  content: [
    'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
    {
      columns: [
        {
          // auto-sized columns have their widths based on their content
          width: 'auto',
          text: 'First column'
        },
        {
          // star-sized columns fill the remaining space
          // if there's more than one star-column, available width is divided equally
          width: '*',
          text: 'Second column'
        },
        {
          // fixed width
          width: 100,
          text: 'Third column'
        },
        {
          // % width
          width: '20%',
          text: 'Fourth column'
        }
      ],
      // optional space between columns
      columnGap: 10
    },
    'This paragraph goes below all columns and has full width'
  ]
};
```

O conteúdo de uma coluna não se limita a texto simples. Pode conter qualquer elemento válido do pdfmake. Confira o exemplo COLUMNS no [playground](/docs/0.3/pt-br/playground/).

## Propriedades

* `columnGap: number` especifica o intervalo (espaço) entre as colunas
* `snakingColumns: boolean` ativa colunas em fluxo contínuo (estilo jornal); consulte [este artigo](/docs/0.3/pt-br/document-definition-object/snaking-columns/) _(versão mínima: 0.3.5)_
