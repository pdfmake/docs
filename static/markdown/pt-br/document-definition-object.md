# Referência da definição do documento

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/

## Estrutura de uma definição

**JavaScript**

```js
const docDefinition = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [40, 50, 40, 50],
  defaultStyle: { fontSize: 12 },
  styles: { heading: { fontSize: 20, bold: true } },
  info: { title: 'Example document', author: 'Example author' },
  content: [
    { text: 'Document heading', style: 'heading' },
    'A plain string becomes a paragraph.',
    { ul: ['First item', 'Second item'] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

const docDefinition: TDocumentDefinitions = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [40, 50, 40, 50],
  defaultStyle: { fontSize: 12 },
  styles: { heading: { fontSize: 20, bold: true } },
  info: { title: 'Example document', author: 'Example author' },
  content: [
    { text: 'Document heading', style: 'heading' },
    'A plain string becomes a paragraph.',
    { ul: ['First item', 'Second item'] }
  ]
};
```

Depois de configurar as fontes, passe a definição ao método `createPdf` do seu ambiente. Todas as dimensões numéricas usam **pontos** (72 pontos por polegada). As margens seguem a ordem **esquerda, superior, direita, inferior**. O array `content` forma uma pilha vertical. Crie um objeto novo para cada renderização; o processo de layout adiciona medidas e posições internas.

## Nós de conteúdo

| Nó | Finalidade | Referência |
| --- | --- | --- |
| `{ text: '...' }` | Parágrafo ou segmentos de texto em linha | [Estilos](/docs/0.3/pt-br/document-definition-object/styling/) |
| `{ stack: [...] }` | Agrupar blocos e aplicar um estilo compartilhado | [Pilhas](/docs/0.3/pt-br/document-definition-object/stack/) |
| `{ columns: [...] }` | Conteúdo lado a lado | [Colunas](/docs/0.3/pt-br/document-definition-object/columns/) |
| `{ table: { body: [...] } }` | Linhas, células e cabeçalhos repetidos | [Tabelas](/docs/0.3/pt-br/document-definition-object/tables/) |
| `{ ul: [...] }`, `{ ol: [...] }` | Listas com marcadores e numeradas | [Listas](/docs/0.3/pt-br/document-definition-object/lists/) |
| `{ image: 'key' }` | PNG ou JPEG | [Imagens](/docs/0.3/pt-br/document-definition-object/images/) |
| `{ svg: '<svg>...</svg>' }` | Conteúdo vetorial SVG | [SVGs](/docs/0.3/pt-br/document-definition-object/svgs/) |
| `{ qr: '...' }` | Código QR | [QR](/docs/0.3/pt-br/document-definition-object/qr/) |

## Configurações do documento

- [Tamanho, orientação e quebras de página](/docs/0.3/pt-br/document-definition-object/page/), [margens](/docs/0.3/pt-br/document-definition-object/margins/) e [seções](/docs/0.3/pt-br/document-definition-object/sections/).
- [Cabeçalhos e rodapés](/docs/0.3/pt-br/document-definition-object/headers-footers/), [planos de fundo](/docs/0.3/pt-br/document-definition-object/background-layer/) e [marcas-d'água](/docs/0.3/pt-br/document-definition-object/watermark/).
- [Metadados](/docs/0.3/pt-br/document-definition-object/document-medatadata/), [links](/docs/0.3/pt-br/document-definition-object/links/), [sumário](/docs/0.3/pt-br/document-definition-object/toc/) e [contornos](/docs/0.3/pt-br/document-definition-object/outlines/).
- [Anexos](/docs/0.3/pt-br/document-definition-object/attachments/), [criptografia](/docs/0.3/pt-br/document-definition-object/security/), [PDF/A](/docs/0.3/pt-br/document-definition-object/pdfa/) e [compactação](/docs/0.3/pt-br/document-definition-object/compression/).

## Definição e opções de renderização

O conteúdo e as configurações visuais pertencem à definição. `fontLayoutCache` e `bufferPages` pertencem ao segundo argumento de `createPdf`. Fontes, registros de layout de tabela e políticas de recursos pertencem à API do pdfmake. Consulte a [referência da API](/docs/0.3/pt-br/guides/api-reference/).
