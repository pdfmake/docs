+++
title = "Document sections"
description = ""
weight = 2090
alwaysopen = true
+++

{{% alert theme="warning" %}}Minimal version: **0.3.0-beta.18**{{% /alert %}}


Document sections allow you to divide a document into multiple parts, each with its own page settings.

Each section support:
- custom page size and orientation
- custom page margin
- custom header/footer
- custom watermark
- custom background

Definition including all properties:
```js
var docDefinition = {
    content: [
        {
            header: function (currentPage, pageCount) {
                return currentPage.toString() + ' of ' + pageCount;
            },
            footer: function (currentPage, pageCount) {
                return currentPage.toString() + ' of ' + pageCount;
            },
            background: function () {
                return {text: 'background', alignment: 'right'};
            },
            watermark: 'watermark',
            pageSize: 'A4',
            pageOrientation: 'landscape',
            pageMargins: 5,
            section: [
                'Text in section.'
            ]
        }
    ]
}
```

In the next section, properties can be inherited from the previous section:
```js
var docDefinition = {
    content: [
        {
            header: 'inherit',
            footer: 'inherit',
            background: 'inherit',
            watermark: 'inherit',
            pageSize: 'inherit',
            pageOrientation: 'inherit',
            pageMargins: 'inherit',
            section: [
                'Text in section.'
            ]
        }
    ]
}
```

Full example is available in [examples/section.js](https://github.com/bpampuch/pdfmake/blob/master/examples/sections.js).
