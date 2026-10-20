+++
title = "Document definition reference"
description = "Describe PDF content, styles, pages and metadata with the declarative pdfmake 0.3 document definition object."
weight = 20
+++

## Shape of a definition

```js
const docDefinition = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [40, 50, 40, 50],
  defaultStyle: { fontSize: 12 },
  styles: { heading: { fontSize: 20, bold: true } },
  info: { title: 'Example document', author: 'Example author' },
  content: [
    { text: 'Document heading', style: 'heading' },
    'A plain string becomes a paragraph.',
    { ul: ['First item', 'Second item'] }
  ]
};
```

Pass the definition to your runtime's `createPdf` method after configuring fonts. All numeric dimensions use **points** (72 points per inch). Margins use the order **left, top, right, bottom**. A content array is a vertical stack. Create a fresh object for each render; the layout process adds internal measurements and positions.

## Content nodes

| Node | Purpose | Reference |
| --- | --- | --- |
| `{ text: '...' }` | Paragraph or inline runs | [Styling](/docs/0.3/document-definition-object/styling/) |
| `{ stack: [...] }` | Group blocks and apply a shared style | [Stacks](/docs/0.3/document-definition-object/stack/) |
| `{ columns: [...] }` | Side-by-side content | [Columns](/docs/0.3/document-definition-object/columns/) |
| `{ table: { body: [...] } }` | Rows, cells and repeating headers | [Tables](/docs/0.3/document-definition-object/tables/) |
| `{ ul: [...] }`, `{ ol: [...] }` | Bullet and numbered lists | [Lists](/docs/0.3/document-definition-object/lists/) |
| `{ image: 'key' }` | PNG or JPEG | [Images](/docs/0.3/document-definition-object/images/) |
| `{ svg: '<svg>...</svg>' }` | SVG vector content | [SVGs](/docs/0.3/document-definition-object/svgs/) |
| `{ qr: '...' }` | QR code | [QR](/docs/0.3/document-definition-object/qr/) |

## Document-level settings

- [Page size, orientation and breaks](/docs/0.3/document-definition-object/page/), [margins](/docs/0.3/document-definition-object/margins/) and [sections](/docs/0.3/document-definition-object/sections/).
- [Headers and footers](/docs/0.3/document-definition-object/headers-footers/), [backgrounds](/docs/0.3/document-definition-object/background-layer/) and [watermarks](/docs/0.3/document-definition-object/watermark/).
- [Metadata](/docs/0.3/document-definition-object/document-medatadata/), [links](/docs/0.3/document-definition-object/links/), [table of contents](/docs/0.3/document-definition-object/toc/) and [outlines](/docs/0.3/document-definition-object/outlines/).
- [Attachments](/docs/0.3/document-definition-object/attachments/), [encryption](/docs/0.3/document-definition-object/security/), [PDF/A](/docs/0.3/document-definition-object/pdfa/) and [compression](/docs/0.3/document-definition-object/compression/).

## Definition versus rendering options

Content and visual settings belong in the definition. `fontLayoutCache` and `bufferPages` belong in the second `createPdf` argument. Fonts, table layout registrations and resource policies belong on the pdfmake API. See [API reference](/docs/0.3/guides/api-reference/).
