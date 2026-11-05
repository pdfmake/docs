# Gliederungen und Lesezeichen

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/document-definition-object/outlines/

> **Note:** Mindestversion: **0.3.5**


PDF-Gliederungen (auch Lesezeichen genannt) sind eine hierarchische Navigationsstruktur im PDF-Dokument. Damit können Benutzer direkt zu bestimmten Seiten springen. Sie funktionieren wie ein interaktives Inhaltsverzeichnis und werden normalerweise im Navigationsbereich des PDF-Viewers angezeigt.

**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
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
