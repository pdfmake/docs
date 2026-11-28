# Contornos e marcadores

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/outlines/

> **Note:** Versão mínima: **0.3.5**


Contornos PDF (também chamados de marcadores) são uma estrutura hierárquica de navegação incorporada em um documento PDF que permite aos usuários ir rapidamente a páginas específicas. Funcionam como um sumário interativo e costumam aparecer no painel de navegação do visualizador de PDF.

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

## Propriedades

- `outline: boolean` - defina como `true` para adicionar aos marcadores
- `outlineText: string` (opcional) - texto personalizado do marcador; caso contrário, usa o texto do nó
- `outlineExpanded: boolean` (opcional) - defina como `true` para deixar o marcador expandido/aberto
- `outlineParentId: string` (opcional) - `id` do marcador pai
