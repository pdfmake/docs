+++
title = "Gliederungen und Lesezeichen"
description = "Erstelle hierarchische PDF-Lesezeichen mit pdfmake 0.3 und steuere ihre Beschriftung, Elternknoten und den geöffneten Zustand."
weight = 2235
alwaysopen = true
sourceDigest = "c3e4279bfaad7589de23fa588bc515727f35f2255fa8effd7da1ce56b06a7cb2"
+++

{{% alert theme="warning" %}}Mindestversion: **0.3.5**{{% /alert %}}

PDF-Gliederungen (auch Lesezeichen genannt) sind eine hierarchische Navigationsstruktur im PDF-Dokument. Damit können Benutzer direkt zu bestimmten Seiten springen. Sie funktionieren wie ein interaktives Inhaltsverzeichnis und werden normalerweise im Navigationsbereich des PDF-Viewers angezeigt.

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

## Eigenschaften

- `outline: boolean` – auf `true` setzen, um den Knoten in die Lesezeichen aufzunehmen
- `outlineText: string` (optional) – benutzerdefinierter Lesezeichentext; andernfalls wird der Text des Knotens verwendet
- `outlineExpanded: boolean` (optional) – auf `true` setzen, damit das Lesezeichen geöffnet angezeigt wird
- `outlineParentId: string` (optional) – `id` des übergeordneten Lesezeichens
