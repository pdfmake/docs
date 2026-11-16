+++
title = "Options"
description = ""
weight = 30
alwaysopen = true
+++

Advanced options for creating document used in [client-side methods](/docs/0.3/getting-started/client-side/methods/) or [server-side method](/docs/0.3/getting-started/server-side/).

Options:

- `fontLayoutCache` - option to disable font layout cache (_default_: `true` - cache enabled)
- `bufferPages` -  allows you to control when pages are flushed to the output file (see [pdfkit documentation](http://pdfkit.org/docs/getting_started.html)) (_default_: `false` - buffer disabled)
- `unbreakableOverflow` - controls what happens when an unbreakable block cannot fit within the available space on a single page (_default_: `'allowBreak'`). See [Unbreakable overflow](#unbreakable-overflow).

#### Unbreakable overflow

{{% alert theme="warning" %}}Minimal version: **0.3.15**{{% /alert %}}

| Value | Behavior |
| --- | --- |
| `'allowBreak'` (default) | Retries layout with supported unbreakability constraints relaxed, allowing oversized blocks to split across pages when possible. |
| `'error'` | Rejects generation when the layout detects that an unbreakable block cannot fit on a single page within the available space. |

Both modes keep a block together if it fits. If only the remaining space on the current page is insufficient, the block can move intact to the next page without causing an overflow error.

The option covers nodes with `unbreakable: true` and table constraints such as `dontBreakRows`, `keepWithHeaderRows`, associated row spans and repeating table headers.
