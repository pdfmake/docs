+++
title = "Tables"
description = "Build tables with consistent rows, repeating headers, custom borders, widths and merged cells."
weight = 2030
alwaysopen = true
+++

## Start with rows and a repeating header

Use a table when cells in different rows need to align. `body` is an array of row
arrays. Each row must have the same number of cells; cells can contain text or
other pdfmake nodes. `headerRows: 1` repeats the first row when the table continues
onto another page.

{{< example id="tables" >}}

## Choose widths

| Width | Meaning | Useful when |
| --- | --- | --- |
| A number, for example `80` | Fixed points | Codes, counts or a predictable label column |
| `'*'` | Share the remaining width | A description should fill the available space |
| `'auto'` | Measure the content | Short labels should use only the width they need |
| A percentage string | Percentage-based width | A proportional layout is required; test mixed widths carefully |

Borders, padding, page margins and other columns consume space too. Start with
fixed and star widths, then use `auto` where content-based sizing is intentional.
Avoid adding large fixed widths that exceed the content area.

## Table and cell fields

| Field | Where | Type / purpose |
| --- | --- | --- |
| `body` | `table` | Nonempty row arrays |
| `widths` | `table` | Width descriptors, one per column |
| `headerRows` | `table` | Number of leading rows repeated as headers |
| `dontBreakRows` | `table` | Keep an individual row from splitting across pages |
| `keepWithHeaderRows` | `table` | Number of following rows to keep with the header |
| `layout` | Node, beside `table` | Built-in layout name, registered custom name, or layout object |
| `colSpan`, `rowSpan` | Cell | Positive number of columns/rows covered; placeholders are still required |
| `verticalAlignment` | Cell | `'top'` (default), `'middle'` or `'bottom'` |
| `border` | Cell | Four booleans: left, top, right, bottom |
| `borderColor` | Cell | Four colors in the same order |
| `fillColor` | Cell | Background color or a supported pattern tuple |
| `fillOpacity` | Cell | Numeric background opacity |
| `overlayPattern`, `overlayOpacity` | Cell | Pattern tuple and numeric opacity painted over the contents |

Keeping a row together cannot make an oversized row fit on a page. Test long
descriptions and nested content with your actual page size and fonts.

## Merge cells without changing the row length

```js
var dd = {
  content: [{
    table: {
      widths: ['*', '*', '*'],
      body: [
        [{ text: 'A heading across three columns', colSpan: 3, bold: true }, {}, {}],
        [{ text: 'Two rows', rowSpan: 2 }, 'A', 'B'],
        [{}, 'C', 'D']
      ]
    }
  }]
};
```

The empty objects occupy the cells covered by a span. Leaving them out produces
an inconsistent row. Do not use `undefined` as a placeholder. The
[spans playground example](/docs/0.3/playground/?example=spans) shows this definition.

## Use a built-in layout

`noBorders`, `headerLineOnly` and `lightHorizontalLines` are available by name.
Put `layout` beside `table`, not inside it:

```js
var dd = {
  content: [{
    layout: 'lightHorizontalLines',
    table: { headerRows: 1, widths: ['*', 'auto'], body: [['Item', 'Qty'], ['Notebook', 3]] }
  }]
};
```

## Register a custom layout

Register layouts before creating the document. In Node use your configured
`pdfmake` singleton; in the browser use `pdfMake`.

```js
pdfMake.addTableLayouts({
  compact: {
    hLineWidth: function (index, node) {
      return index === node.table.headerRows ? 1 : 0;
    },
    vLineWidth: function () { return 0; },
    hLineColor: function () { return '#b7cfc4'; },
    paddingLeft: function () { return 6; },
    paddingRight: function () { return 6; }
  }
});

var dd = {
  content: [{ layout: 'compact', table: { headerRows: 1, body: [['Item', 'Qty'], ['Notebook', 3]] } }]
};
```

The snippet assumes the browser engine and fonts are loaded. Defining a layout
variable alone does not register it. Prefer deterministic callbacks; avoid
mutating shared configuration during concurrent Node jobs.

## Diagnose malformed tables

Check `body` before changing borders or widths: it must contain row arrays with
consistent lengths. Check span placeholders next. In the local improvement branch,
diagnostics identify the offending definition path and expected number of cells.
See [errors and diagnostics](/docs/0.3/guides/errors/).
