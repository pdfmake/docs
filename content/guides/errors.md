+++
title = "Errors and diagnostics"
description = "Find JavaScript syntax mistakes, malformed document nodes, resource failures and interrupted output, with actionable diagnostics."
weight = 2
+++

## First identify the failing stage

An invalid definition should fail rather than silently omit content. The useful
question is where it failed and how that error reaches your application.

| Stage | Typical failure | Where to fix it |
| --- | --- | --- |
| JavaScript parsing | Missing comma, quote or closing brace | Source editor; the library has not been called yet |
| Definition execution | `ReferenceError` or a failing callback | Application code constructing the definition |
| Document structure | Misspelled node type, invalid table rows or list | The reported definition path |
| Resource loading | Missing font, rejected URL, unreadable image | Font/resource registration and access policies |
| Layout/rendering | Content too large, invalid dimensions or callback failure | The smallest reproducing definition |
| Output | Closed stream, write permissions or destination failure | Buffer/stream/file error handling |

## Always await the output

```js
async function generateReport(pdfmake, definition) {
  try {
    return await pdfmake.createPdf(definition).getBuffer();
  } catch (error) {
    console.error('PDF generation failed', {
      message: error.message,
      code: error.code,
      phase: error.phase,
      path: error.path
    });
    throw error;
  }
}
```

Return an error to the API caller or display `error.message` in the UI. Do not
respond with an empty PDF or report success after swallowing the rejection.
Avoid logging document contents or private resource credentials.

## Read a document path

The local library improvement branch adds `PDFMAKE_INVALID_DOCUMENT` diagnostics
with `phase: 'preprocess'` and a `path` property. For example:

```text
Unrecognized document structure: ...
Document path: content[0].columns[0].ul[1]
```

This points to the second list item in the first column of the first body node.
Check for a typo such as `{ txt: 'Hello' }` instead of `{ text: 'Hello' }`.
Malformed table rows identify the row and expected number of cells. Empty tables
explain that `table.body` needs nonempty row arrays. Retain `{}` placeholders for
spanned cells. Existing error text is retained; callers should use the diagnostic
fields when present instead of parsing message strings.

These structured diagnostics are **new in the local improvement branch**; the
published 0.3.12 package does not yet contain them. Generic errors still have a
message. The branch also rejects prematurely closed buffer streams instead of
leaving their Promise pending.

## Syntax errors in the playground

The editor parses the definition before executing it, marks the faulty location,
and displays a line and column. **Go to error in editor** focuses the location.
Undo/redo and the error panel let you correct a mistake without losing work.
With live preview, the last successful PDF stays visible during edits and failures,
but its download is disabled when it no longer matches the current source.

## Reduce difficult failures

Keep the same fonts and runtime. Replace the body with a single paragraph, then
add blocks back until the issue returns. For tables, check row lengths and spans
before adjusting widths. For resource failures, start with a known local font and
embedded image. See [troubleshooting](/docs/0.3/guides/troubleshooting/) for more symptoms.

## Validate the complete definition before rendering

The local, unreleased API `validateDocument(input, options)` checks all declared document properties and collects multiple errors with paths. It also checks tables, spans, references, numeric ranges and circular structures. It does not mutate input, execute callbacks or access resources. Unknown properties are warnings by default; use `strict: true` to treat them as errors.

```js
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

The result contains `valid`, `errors`, `warnings`, `deferred` and `truncated`. Each diagnostic includes `path`, `code`, `severity` and `message`. Defaults: 100 diagnostics, 100 nesting levels and 50,000 inspected values. An exhausted limit never reports success. Callback results, resource availability/decoding and final layout remain render-time checks. JavaScript syntax must already parse before this object API can run.

Pass `{ validation: true }` as the second argument to `createPdf` to reject invalid definitions before resource loading. An invalid document throws a `DocumentValidationError` with `code: "PDFMAKE_VALIDATION_ERROR"`, `phase: "validation"` and a `diagnostics` array. Existing calls remain compatible; automatic preflight is opt-in. The local playground runs this check automatically when using the improved library.
