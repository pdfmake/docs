+++
title = "Table of contents"
description = "Generate one or more tables of contents from marked nodes, with sorting, styles and optional PDF outlines."
weight = 2230
+++

## Mark headings for inclusion

```js
var docDefinition = {
  content: [
    { toc: { title: { text: 'Contents', fontSize: 20, bold: true }, numberStyle: { bold: true } } },
    { text: 'Introduction', tocItem: true, fontSize: 18, margin: [0, 20, 0, 10] },
    'Document body',
    { text: 'Details', tocItem: true, pageBreak: 'before', fontSize: 18 }
  ]
};
```

The `toc` node inserts the generated list; `tocItem` marks text nodes for inclusion. Page numbers are calculated during layout.

## Multiple tables of contents

Each ToC is a separate content node. Use IDs to choose which list receives each item:

```js
var docDefinition = {
  content: [
    { toc: { id: 'main', title: 'All sections' } },
    { toc: { id: 'details', title: 'Detailed sections' } },
    { text: 'Overview', tocItem: 'main' },
    { text: 'Technical details', tocItem: ['main', 'details'], pageBreak: 'before' }
  ]
};
```

Do not put two `toc` keys on the same object; JavaScript retains only the last value.

## ToC options

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | string | Identifier for a named ToC |
| `title` | string or text node | Optional title |
| `textStyle`, `numberStyle` | style object | Entry text and page-number styling |
| `textMargin` | margin | Entry spacing |
| `hideEmpty` | boolean | Hide an empty ToC; default false, since 0.3.3 |
| `sortBy` | `'page'` or `'title'` | Ordering; default page, since 0.3.3 |
| `sortLocale` | string | Locale for sorting; runtime locale by default, since 0.3.3 |
| `outlines` | boolean | Include entries in PDF bookmarks; since 0.3.5 |

On a marked text node, `tocItem` accepts `true`, one ToC ID or an array of IDs. Text-node `textStyle`, `numberStyle` and `textMargin` can customize its entry. See [outlines](/docs/0.3/document-definition-object/outlines/) for bookmark controls.
