# Migração do 0.1/0.2

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/migration-from-0.1/

## Faça a atualização com cuidado

Fixe a versão que está avaliando. Mantenha PDFs existentes representativos e as entradas e fontes usadas para gerá-los. Compare texto extraído, número de páginas e páginas renderizadas antes de atualizar a produção. Igualdade byte a byte costuma ser inadequada, pois metadados e identificadores do PDF podem variar.

## Substitua a API de construtor do Node

Exemplos antigos para Node criam `PdfPrinter` e chamam `createPdfKitDocument`. Na versão 0.3, use o singleton:

**JavaScript**

```js
const pdfmake = require('pdfmake');
pdfmake.addFonts(fonts);
await pdfmake.createPdf(docDefinition).write('document.pdf');
```

**TypeScript**

```ts
import pdfmake from "pdfmake";
pdfmake.addFonts(fonts);
await pdfmake.createPdf(docDefinition).write('document.pdf');
```

`fonts` precisa ser um mapa válido de famílias, como mostrado no [início rápido para Node](/docs/0.3/pt-br/getting-started/server-side/) e no [guia de fontes](/docs/0.3/pt-br/fonts/). Configure políticas e layouts durante a inicialização e evite alterações por solicitação no estado compartilhado do singleton.

## Aguarde as funções de saída

Substitua a saída do navegador baseada em callbacks por Promises:

**JavaScript**

```js
const data = await pdfMake.createPdf(docDefinition).getBase64();
```

**TypeScript**

```ts
const data = await pdfMake.createPdf(docDefinition).getBase64();
```

Trate as rejeições dos métodos de saída. Consulte [métodos do Node](/docs/0.3/pt-br/getting-started/server-side/methods/) ou [métodos do navegador](/docs/0.3/pt-br/getting-started/client-side/methods/) para o ambiente escolhido.

## Gere novamente o armazenamento de fontes do navegador

Gere novamente os arquivos VFS personalizados e atualize o registro para `addVirtualFileSystem`. Não presuma que o formato de um arquivo de fonte gerado por uma versão antiga seja igual ao do bundle atual. Consulte [fontes VFS](/docs/0.3/pt-br/fonts/custom-fonts-client-side/vfs/).

## Atualize `pageBreakBefore`

As versões 0.1/0.2 passavam arrays de nós separados. A versão 0.3 passa um contêiner de nós:

**JavaScript**

```js
var dd = { content: ['Example document'],
pageBreakBefore: function (currentNode, nodeContainer) {
  return currentNode.headlineLevel === 1 &&
    nodeContainer.getFollowingNodesOnPage().length === 0;
}
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: ['Example document'],
pageBreakBefore: function (currentNode, nodeContainer) {
  return currentNode.headlineLevel === 1 &&
    nodeContainer.getFollowingNodesOnPage().length === 0;
}
};
```

O contêiner também oferece `getNodesOnNextPage()` e `getPreviousNodesOnPage()`. Este trecho é uma propriedade dentro de uma definição, não JavaScript independente. Consulte [quebras de página](/docs/0.3/pt-br/document-definition-object/page/).

## Configure o acesso a recursos

Para **0.3.6 ou superior**, configure uma política síncrona de acesso a URLs; para **0.3.8 ou superior**, configure uma política de arquivos locais. Teste recursos permitidos e negados. Consulte [segurança de recursos](/docs/0.3/pt-br/guides/resource-security/).
