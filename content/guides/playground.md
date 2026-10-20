+++
title = "Playground guide"
description = "Explore pdfmake examples with a code editor, direct PDF preview, page navigation, local imports and downloadable source."
weight = 0
+++

## Learn by editing

Open the [playground](/docs/0.3/playground/), choose an example and edit the definition
in the left panel. The right panel shows a real PDF rendered through PDF.js.
With **Live preview** enabled, the PDF updates automatically after editing. Select **Run** or press **Ctrl/Command + Enter** for an immediate update.

The CodeMirror 6 editor includes syntax highlighting, line numbers, bracket matching, indentation, Undo/Redo buttons, persistent undo history and syntax diagnostics with line and column. Go to error focuses the offending source location. It also provides completions. Use **Ctrl + Space** to request completions. Suggested field names
are hints; the document reference defines the valid context, type and values.

## Examples

| Example | Explore |
| --- | --- |
| [First document](/docs/0.3/playground/?example=welcome) | Text, spacing and font styles |
| [Invoice](/docs/0.3/playground/?example=invoice) | A table, totals and a page-number footer |
| [Tables](/docs/0.3/playground/?example=tables) | Repeating headers across multiple pages |
| [Text styles](/docs/0.3/playground/?example=styles) | Named styles and inline overrides |
| [Columns](/docs/0.3/playground/?example=columns) | Side-by-side blocks and stacks |
| [Spans](/docs/0.3/playground/?example=spans) | Row and column spans with placeholders |
| [Pages](/docs/0.3/playground/?example=pages) | Page breaks, headers and footers |
| [Vectors](/docs/0.3/playground/?example=vectors) | Embedded SVG and QR codes |
| [Images](/docs/0.3/playground/?example=images) | Embedded PNG data reused by name |
| [Lists](/docs/0.3/playground/?example=lists) | Numbered lists, bullets and links |

An `example` URL parameter selects a known example; it does not accept JavaScript.
Live preview also updates restored workspaces, saved documents and imported files.
Turn **Live preview** off before importing code you want to inspect first.

## Preview and output

Use the arrow buttons to change pages and the zoom menu to change scale. **Page
text** exposes text extracted from the current PDF page for inspection and assistive
technology. **Open PDF** opens the generated file separately; **Download PDF** saves
the same PDF bytes. The footer shows generation time and output size. Generation
time excludes PDF.js preview rendering.

Live preview waits 650 ms after the last edit, then renders in a fresh worker. The old PDF stays visible until the next page has finished rendering off screen; the canvas is then replaced in one step. The selected PDF page and zoom are retained where possible. Downloads are disabled while the visible PDF does not match the current code. Errors keep the last successful preview instead of replacing it with a blank panel.

## Keep your work

**Export code** downloads the current definition as JavaScript. **Import .js** reads
a local file. Files are limited to 500 KB. Disable **Live preview** before importing
code you want to review before running it. Resetting or changing examples asks before replacing edits.

**The current workspace is autosaved locally**, including the definition, editor selection, undo history, example, page and zoom settings. Reloading restores the editor, its Undo/Redo history and the Live preview preference. If Live preview is enabled, the restored PDF renders automatically and subsequent edits update it without pressing Run. If disabled, rendering stays manual, including after a reload.

Give the document a name and choose **Save document** to keep a separate local document. Choosing a new name creates another saved document; saving under the same selected name updates it. The saved-documents menu restores a document and its history. Delete removes that named copy while retaining the current editor contents. Up to 30 named documents can be kept. Browser storage quotas still apply.

**Save draft locally** remains a separate quick snapshot with Restore/Clear controls. **Clear workspace autosave** removes the current autosave and pauses it until you type again. Named documents and quick drafts are separate. If browser storage is disabled or full, the editor still works and code export remains available. No source or PDF is uploaded by this application.

## Rendering boundaries

Each render starts a fresh browser worker. **Cancel** terminates it, including a
blocked JavaScript loop. A ten-second limit stops unexpectedly expensive work.
Simplify large documents or test them in a controlled application when they exceed
the playground limit. The PDF API denies remote URL resources here; use embedded
images and the supplied Roboto fonts.

Custom JavaScript is trusted user code, not a security sandbox. Do not run code from
an unknown source. A worker protects the UI from blocking but is not an isolation
boundary for hostile code. See [resource security](/docs/0.3/guides/resource-security/)
for production API guidance.

## Run the standalone development tool

From a built pdfmake library checkout, run `npm run playground`. This serves the
same UI with that checkout's engine at `http://127.0.0.1:1234/playground/`. It needs
Node >=22.13 for its separate tooling. The published library's runtime requirement
remains Node >=20. The docs site can also preview a local engine using
`PDFMAKE_SOURCE`; see the documentation repository README.
