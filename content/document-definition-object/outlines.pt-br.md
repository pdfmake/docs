+++
title = "Contornos e marcadores"
description = "Crie uma estrutura hierárquica de navegação com contornos e marcadores no PDF usando pdfmake 0.3."
weight = 2235
alwaysopen = true
sourceDigest = "c3e4279bfaad7589de23fa588bc515727f35f2255fa8effd7da1ce56b06a7cb2"
+++

{{% alert theme="warning" %}}Versão mínima: **0.3.5**{{% /alert %}}

Contornos PDF (também chamados de marcadores) são uma estrutura hierárquica de navegação incorporada em um documento PDF que permite aos usuários ir rapidamente a páginas específicas. Funcionam como um sumário interativo e costumam aparecer no painel de navegação do visualizador de PDF.

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

## Propriedades

- `outline: boolean` - defina como `true` para adicionar aos marcadores
- `outlineText: string` (opcional) - texto personalizado do marcador; caso contrário, usa o texto do nó
- `outlineExpanded: boolean` (opcional) - defina como `true` para deixar o marcador expandido/aberto
- `outlineParentId: string` (opcional) - `id` do marcador pai
