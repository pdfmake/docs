# Margins

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/document-definition-object/margins/

Any element in pdfMake can have a margin:

**JavaScript**

```js
var dd = { content: [
// margin: [left, top, right, bottom]
{ text: 'sample', margin: [ 5, 2, 10, 20 ] },

// margin: [horizontal, vertical]
{ text: 'another text', margin: [5, 2] },

// margin: equalLeftTopRightBottom
{ text: 'last one', margin: 5 },

// single-side margins
{ text: 'sample', marginLeft: 5, marginTop: 2, marginRight: 10, marginBottom: 2 },
] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [
// margin: [left, top, right, bottom]
{ text: 'sample', margin: [ 5, 2, 10, 20 ] },

// margin: [horizontal, vertical]
{ text: 'another text', margin: [5, 2] },

// margin: equalLeftTopRightBottom
{ text: 'last one', margin: 5 },

// single-side margins
{ text: 'sample', marginLeft: 5, marginTop: 2, marginRight: 10, marginBottom: 2 },
] };
```
