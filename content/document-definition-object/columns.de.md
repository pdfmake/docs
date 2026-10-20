+++
title = "Spalten"
description = "Lege mit Beispielen, Optionen und Anwendungshinweisen Spalten in pdfmake 0.3 fest."
weight = 2020
alwaysopen = true
sourceDigest = "c5cad4de1cdcd5bc45a17a7f4bc373478b5f7e877859ca80db4facadca0459da"
+++

Absätze werden standardmäßig als vertikaler Stapel von Elementen ausgegeben. Du kannst den verfügbaren Platz jedoch auch in Spalten aufteilen.

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

Der Inhalt einer Spalte ist nicht auf einfachen Text beschränkt. Er kann jedes gültige pdfmake-Element enthalten. Sieh dir dazu das Beispiel COLUMNS im [Playground](/docs/0.3/de/playground/) an.

## Eigenschaften

* `columnGap: number` legt den Abstand zwischen Spalten fest.
* `snakingColumns: boolean` aktiviert Spalten im Zeitungsstil. Siehe [diesen Artikel](/docs/0.3/de/document-definition-object/snaking-columns/) _(Mindestversion: 0.3.5)_
