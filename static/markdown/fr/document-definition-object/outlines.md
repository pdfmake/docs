# Plans du document et signets

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/outlines/

> **Note:** Version minimale : **0.3.5**


Les plans de document PDF (également appelés signets) sont une structure de navigation hiérarchique intégrée au PDF, qui permet d’accéder rapidement à des pages précises. Ils fonctionnent comme une table des matières interactive, généralement affichée dans le panneau de navigation du lecteur PDF.

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

## Propriétés

- `outline: boolean` - indiquez `true` pour ajouter un signet
- `outlineText: string` (facultatif) - texte personnalisé du signet ; sinon, le texte du nœud est utilisé
- `outlineExpanded: boolean` (facultatif) - indiquez `true` pour que le signet soit développé à l’ouverture
- `outlineParentId: string` (facultatif) - `id` du signet parent
