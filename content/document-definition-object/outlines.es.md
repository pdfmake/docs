+++
sourceDigest = "c3e4279bfaad7589de23fa588bc515727f35f2255fa8effd7da1ce56b06a7cb2"
title = "Esquemas / marcadores"
description = "Configura esquemas y marcadores en pdfmake 0.3 con ejemplos, opciones y notas de uso."
weight = 2235
alwaysopen = true
+++

{{% alert theme="warning" %}}Versión mínima: **0.3.5**{{% /alert %}}

Los esquemas PDF (también llamados marcadores) son una estructura de navegación jerárquica incrustada en un documento PDF que permite saltar rápidamente a páginas concretas. Funcionan como un índice interactivo y suelen aparecer en el panel de navegación del visor PDF.

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

## Propiedades

- `outline: boolean`: establece `true` para añadir el elemento a los marcadores
- `outlineText: string` (opcional): establece el texto personalizado del marcador; si no, se usa el texto del nodo
- `outlineExpanded: boolean` (opcional): establece `true` para que el marcador aparezca expandido/abierto
- `outlineParentId: string` (opcional): `id` del marcador principal
