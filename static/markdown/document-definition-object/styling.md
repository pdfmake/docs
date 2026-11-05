# Styling

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/document-definition-object/styling/

## Style a block or an inline run

A string is a plain paragraph. Use a text node to add properties. Use a `text`
array for differently styled runs within the **same paragraph**; a content array
or stack creates separate blocks.



### Runnable example: 04 · Text & named styles

**JavaScript**

```js
var dd = {
  content: [
    { text: 'Style with intent', style: 'heading' },
    { text: ['One paragraph with ', { text: 'bold', bold: true }, ' and ', { text: 'italic', italics: true }, ' inline text.'] },
    { text: 'A reusable note style.', style: 'note' },
    { ul: ['Readable defaults', 'Small style dictionaries', 'Consistent spacing'], margin: [0, 12, 0, 0] }
  ],
  defaultStyle: { fontSize: 12, lineHeight: 1.3 },
  styles: {
    heading: { fontSize: 26, bold: true, color: '#08786b', margin: [0, 0, 0, 18] },
    note: { fontSize: 10, color: '#536771', margin: [0, 12, 0, 0] }
  }
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [
    { text: 'Style with intent', style: 'heading' },
    { text: ['One paragraph with ', { text: 'bold', bold: true }, ' and ', { text: 'italic', italics: true }, ' inline text.'] },
    { text: 'A reusable note style.', style: 'note' },
    { ul: ['Readable defaults', 'Small style dictionaries', 'Consistent spacing'], margin: [0, 12, 0, 0] }
  ],
  defaultStyle: { fontSize: 12, lineHeight: 1.3 },
  styles: {
    heading: { fontSize: 26, bold: true, color: '#08786b', margin: [0, 0, 0, 18] },
    note: { fontSize: 10, color: '#536771', margin: [0, 12, 0, 0] }
  }
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/playground/?example=styles)



## Reuse named styles

**JavaScript**

```js
var dd = {
  defaultStyle: { fontSize: 11, lineHeight: 1.2 },
  styles: {
    heading: { fontSize: 24, bold: true },
    muted: { color: '#536771' },
    subheading: { extends: 'heading', fontSize: 16 }
  },
  content: [
    { text: 'A heading', style: 'heading' },
    { text: 'A muted heading', style: ['heading', 'muted'] },
    { text: 'An explicit override', style: 'heading', fontSize: 18 },
    { text: 'A subheading', style: 'subheading' }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  defaultStyle: { fontSize: 11, lineHeight: 1.2 },
  styles: {
    heading: { fontSize: 24, bold: true },
    muted: { color: '#536771' },
    subheading: { extends: 'heading', fontSize: 16 }
  },
  content: [
    { text: 'A heading', style: 'heading' },
    { text: 'A muted heading', style: ['heading', 'muted'] },
    { text: 'An explicit override', style: 'heading', fontSize: 18 },
    { text: 'A subheading', style: 'subheading' }
  ]
};
```

`style` refers to entries in `styles`. Later styles in an array take precedence
when they define the same property. Explicit node properties take precedence over
its named styles. `defaultStyle` supplies document defaults. Styles on containers
can be inherited by their children; explicit child properties override them.

Named-style `extends` is available since **0.3.3**. It accepts one parent name or
an array. A style's own properties win over its parents; later parent entries
take precedence when several parents supply the same property. Keep inheritance
short and acyclic so the result is easy to understand.

## Common text properties

| Property | Type / values | Meaning |
| --- | --- | --- |
| `font` | Registered family name | Must match your font map |
| `fontSize` | Number, points | Text size |
| `bold`, `italics` | Boolean, default false | Select the corresponding font variant |
| `alignment` | `'left'`, `'center'`, `'right'`, `'justify'` | Paragraph alignment |
| `lineHeight` | Number, default 1 | Line-height multiplier |
| `color`, `background` | Color name or hex string | Text color and text background |
| `characterSpacing` | Number, points | Additional spacing between characters |
| `wordBreak` | `'normal'` (default), `'break-all'` | Wrapping behavior |
| `fontFeatures` | String array | Font-specific typographic features |
| `style` | String or string array | Named styles to apply |
| `markerColor` | Color | Bullet marker color |

Named colors and hex values such as `'#08786b'` are supported. Font features
depend on the selected font. Selecting `bold` or `italics` requires the variant
to be registered; setting a flag does not supply a missing font file.

## Decorations

| Property | Type / values |
| --- | --- |
| `decoration` | `'underline'`, `'lineThrough'`, `'overline'`, or an array |
| `decorationStyle` | `'solid'`, `'dashed'`, `'dotted'`, `'double'`, `'wavy'` |
| `decorationColor` | Color |
| `decorationThickness` | Numeric width; since 0.3.3 |

**JavaScript**

```js
var dd = {
  content: [{ text: 'A marked passage', decoration: 'underline', decorationStyle: 'wavy', decorationColor: '#08786b' }]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [{ text: 'A marked passage', decoration: 'underline', decorationStyle: 'wavy', decorationColor: '#08786b' }]
};
```

## Styles are not CSS

Use pdfmake's documented field names. There is no CSS cascade, DOM selector or
browser box model. Margins use point values and `[left, top, right, bottom]` order.
To style several blocks together, use a [stack](/docs/0.3/document-definition-object/stack/).
See [fonts](/docs/0.3/fonts/) for variant registration and character coverage.
