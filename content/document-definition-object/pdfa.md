+++
title = "PDF/A"
description = ""
weight = 2310
alwaysopen = true
+++

{{% alert theme="warning" %}}Minimal version: **0.3.0-beta.12**{{% /alert %}}

PDF/A is specialized for use in the archiving and long-term preservation of electronic documents.

PDF version 1.4 or above is required.

```js
var docDefinition = {
    version: '1.5',
    subset: 'PDF/A-3a',
    tagged: true,
    displayTitle: true,
    info: {
        title: 'Awesome PDF document from pdfmake'
    },
    content: [
        'PDF/A document for archive'
    ]
};
```

Supported PDF versions (property `version`):
- `1.3` - PDF version 1.3 (default) **not supported PDF/A**
- `1.4` - PDF version 1.4
- `1.5` - PDF version 1.5
- `1.6` - PDF version 1.6
- `1.7` - PDF version 1.7
- `1.7ext3` - PDF version 1.7 ExtensionLevel 3

Subset of document (property `subset`):
- `PDF/A-1` (shortcut for PDF/A-1b)  
- `PDF/A-1a`
- `PDF/A-1b`
- `PDF/A-2` (shortcut for PDF/A-2b)
- `PDF/A-2a`
- `PDF/A-2b`
- `PDF/A-3` (shortcut for PDF/A-3b)
- `PDF/A-3a`
- `PDF/A-3b`
- `PDF/UA`

Mark document as Tagged PDF (property `tagged`)
- `true` - enable
- `false` - disable

Display of document title in window title (property `displayTitle`)
- `true` - enable
- `false` - disable