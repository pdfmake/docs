+++
title = "Snaking columns"
description = "Configure snaking columns in pdfmake 0.3 with examples, options and usage notes."
weight = 2025
alwaysopen = true
+++

{{% alert theme="warning" %}}Minimal version: **0.3.5**{{% /alert %}}

Snaking columns (or newspaper-style columns) are a column layout mode where content flows vertically through the first column, then continues at the top of the next column, alternating direction as needed. Instead of always restarting at the top for each new row of columns, the layout "snakes" through the available columns in a continuous reading order.

When `snakingColumns: true` is enabled, only the **first column** should contain content. Subsequent columns serve as empty placeholders for overflow.

```js
var myLongContent = 'A paragraph flowing through snaking columns. '.repeat(120);
var docDefinition = {
    content: [
        {
            columns: [
                {text: myLongContent, width: '*'},  // Content goes here
                {text: '', width: '*'},             // Empty overflow target
                {text: '', width: '*'}              // Empty overflow target
            ],
            snakingColumns: true
        }
    ]
};
```

Nesting a "snaking column" directly inside another "snaking column" (a recursive snaking layout) is not supported.

**Recommendation**:
- Avoid deep nesting of snaking columns within other snaking columns.
- Standard columns (non-snaking) _can_ be safely nested inside snaking columns.
- Snaking columns _can_ be safely nested inside standard columns.
