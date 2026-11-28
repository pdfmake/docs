# Rendering options

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/options/

## Pass options to createPdf

**JavaScript**

```js
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false,
  unbreakableOverflow: 'allowBreak'
});
```

**TypeScript**

```ts
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false,
  unbreakableOverflow: 'allowBreak'
});
```

The options object is separate from the [document definition](/docs/0.3/document-definition-object/).

| Option | Type | Default | Meaning |
| --- | --- | --- | --- |
| `fontLayoutCache` | boolean | `true` | Enable PDFKit's font layout cache |
| `bufferPages` | boolean | `false` | Keep PDFKit pages buffered rather than flushing them immediately |
| `unbreakableOverflow` | 'allowBreak' / 'error' | `'allowBreak'` | Control oversized unbreakable blocks; see the section below. |

Keep defaults unless your use case requires a change. Page buffering can increase memory use. It does not make pdfmake's own layout lazy or incremental. See [performance](/docs/0.3/guides/performance/) and [PDFKit's page buffering documentation](https://pdfkit.org/docs/getting_started.html).

Fonts, named table layouts and resource policies are configured on the [public API](/docs/0.3/guides/api-reference/). Paper size, margins and content belong in the definition.

## Unbreakable overflow {#unbreakable-overflow}

Since **0.3.15**, `unbreakableOverflow` controls oversized unbreakable blocks. Both modes preserve a block that fits on a page; insufficient remaining space simply moves it to the next page. It applies to `unbreakable`, `dontBreakRows`, `keepWithHeaderRows`, associated row spans and repeating headers.

| Value | Behavior |
| --- | --- |
| `'allowBreak'` | Retry with supported unbreakability constraints relaxed, splitting oversized blocks when possible. |
| `'error'` | Reject generation when an unbreakable block cannot fit within one page. |
