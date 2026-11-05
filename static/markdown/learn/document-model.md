# The document model

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/learn/document-model/

## Start from content

`content` describes the body of the PDF. A plain string is a paragraph. A content
array is a vertical sequence of blocks. An object describes a node with additional
properties. pdfmake calculates positions; you usually do not specify coordinates.

**JavaScript**

```js
const dd = {
  content: [
    'One paragraph.',
    { text: 'Another paragraph.', bold: true },
    { text: ['One paragraph with ', { text: 'an emphasized part', italics: true }] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

const dd: TDocumentDefinitions = {
  content: [
    'One paragraph.',
    { text: 'Another paragraph.', bold: true },
    { text: ['One paragraph with ', { text: 'an emphasized part', italics: true }] }
  ]
};
```

The nested `text` array creates **inline runs in the same paragraph**. A `content`
array or `stack` creates **separate blocks**. This distinction explains many
surprising line breaks when you first build definitions.

## Choose a container

| Need | Node | Common mistake |
| --- | --- | --- |
| Several paragraphs sharing a style | `{ stack: [...] }` | Trying to assign style properties directly to an array |
| Independent blocks side by side | `{ columns: [...] }` | Expecting rows to line up as in a table |
| Aligned rows and cells | `{ table: { body: [...] } }` | Omitting placeholder cells after `colSpan` or `rowSpan` |
| Bullet or numbered items | `{ ul: [...] }` or `{ ol: [...] }` | Embedding a string where an item array is expected |
| Mixed styles within one line | `{ text: [...] }` | Using a stack, which creates separate blocks |



### Runnable example: 05 · Columns & stacks

**JavaScript**

```js
var dd = {
  content: [
    { text: 'Two perspectives', fontSize: 26, bold: true, margin: [0, 0, 0, 20] },
    { columnGap: 24, columns: [
      { width: '*', stack: [{ text: 'The essentials', bold: true }, 'This column takes an equal share of the available width.', { ul: ['Text', 'Lists', 'Nested blocks'] }] },
      { width: '*', stack: [{ text: 'The details', bold: true }, 'Use fixed widths, auto widths or star widths to describe your layout.'] }
    ] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [
    { text: 'Two perspectives', fontSize: 26, bold: true, margin: [0, 0, 0, 20] },
    { columnGap: 24, columns: [
      { width: '*', stack: [{ text: 'The essentials', bold: true }, 'This column takes an equal share of the available width.', { ul: ['Text', 'Lists', 'Nested blocks'] }] },
      { width: '*', stack: [{ text: 'The details', bold: true }, 'Use fixed widths, auto widths or star widths to describe your layout.'] }
    ] }
  ]
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/playground/?example=columns)



## Put settings at the right level

| Level | Examples | Purpose |
| --- | --- | --- |
| Application configuration | `addFonts`, `addTableLayouts`, resource policies | Register reusable resources before jobs start |
| Document definition | `content`, `styles`, `defaultStyle`, `pageMargins`, `footer` | Describe one PDF |
| Individual node | `text`, `fontSize`, `bold`, `margin`, `pageBreak` | Describe one piece of content |
| Second `createPdf` argument | `fontLayoutCache`, `bufferPages` | Adjust engine options |

Register shared fonts and policies once in a Node service. Build a fresh definition
for every job: layout mutates nodes with measurements and positions. Avoid modifying
the shared pdfmake singleton's configuration during concurrent requests.

## Learn the units and widths

Dimensions use points. A four-value margin is `[left, top, right, bottom]`.
A width number is a fixed point width; `'auto'` follows content; `'*'` shares
remaining space with other star columns. Use fixed or star widths first, then
introduce content-driven sizing when it solves a real layout need.

## Continue with the reference

[Styling](/docs/0.3/document-definition-object/styling/) · [Tables](/docs/0.3/document-definition-object/tables/)
· [Images](/docs/0.3/document-definition-object/images/) · [Page layout](/docs/0.3/document-definition-object/page/)
