+++
title = "Outlines / Bookmarks"
description = ""
weight = 2235
alwaysopen = true
+++

{{% alert theme="warning" %}}Minimal version: **0.3.5**{{% /alert %}}

PDF Outlines (also called Bookmarks) are a hierarchical navigation structure embedded in a PDF document that allows users to quickly jump to specific pages. They function as an interactive table of contents, typically displayed in the PDF viewer’s navigation panel.

```js
var docDefinition = {
  content: [
    {
      text: 'First header in bookmarks',
      outline: true,
    },
    {
      text: 'Second header with custom bookmark',
      outline: true,
      outlineText: 'Custom bookmark text',
    },
    {
      text: 'Structured bookmarks',
      id: 'structured-bookmarks',
      outline: true,
      outlineExpanded: true
    },
    {
      text: 'First subheader',
      outline: true,
      outlineParentId: 'structured-bookmarks'
    },
    {
      text: 'Second subheader',
      outline: true,
      outlineParentId: 'structured-bookmarks'
    },
    {
      text: 'Third subheader',
      outline: true,
      outlineParentId: 'structured-bookmarks',
      id: 'third-subheader'
    }
  ]
};
```

#### Properties

- `outline: boolean` - set to `true` for add to bookmarks
- `outlineText: string` (optional) - set custom bookmark text, otherwise text from node
- `outlineExpanded: boolean` (optional) - set to `true` for expanded/opened bookmark
- `outlineParentId: string` (optional) - parent bookmark `id`