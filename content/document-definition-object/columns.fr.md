+++
title = "Colonnes"
description = "Répartissez l’espace disponible en colonnes de largeurs automatiques, proportionnelles, fixes ou en pourcentage."
weight = 2020
alwaysopen = true
sourceDigest = "c5cad4de1cdcd5bc45a17a7f4bc373478b5f7e877859ca80db4facadca0459da"
+++

Par défaut, les paragraphes sont rendus sous forme d’une pile verticale d’éléments, les uns sous les autres. Il est toutefois possible de répartir l’espace disponible en colonnes.

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

Le contenu des colonnes ne se limite pas à du texte simple. Il peut contenir n’importe quel élément pdfmake valide. Consultez l’exemple COLUMNS dans le [playground](/docs/0.3/fr/playground/).

## Propriétés

* `columnGap: number` définit l’espace entre les colonnes
* `snakingColumns: boolean` active les colonnes en serpentin (style journal) ; consultez cet [article](/docs/0.3/fr/document-definition-object/snaking-columns/) _(version minimale : 0.3.5)_
