+++
title = "Columns"
description = ""
weight = 22
alwaysopen = true
+++


By default paragraphs are rendered as a vertical stack of elements (one below another). It is possible however to divide available space into columns.

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

Column content is not limited to a simple text. It can actually contain any valid pdfmake element. Make sure to look at the COLUMNS example in [playground](http://pdfmake.org/playground.html).


##### Properties

* `columnGap: number` specify gap (space) between columns