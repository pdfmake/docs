# O modelo de documento

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/learn/document-model/

## Comece pelo conteúdo

`content` descreve o corpo do PDF. Uma string simples é um parágrafo. Um array `content` é uma sequência vertical de blocos. Um objeto descreve um nó com propriedades adicionais. O pdfmake calcula as posições; normalmente você não informa coordenadas.

**JavaScript**

```js
const dd = {
  content: [
    'One paragraph.',
    { text: 'Another paragraph.', bold: true },
    { text: ['One paragraph with ', { text: 'an emphasized part', italics: true }] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

const dd: TDocumentDefinitions = {
  content: [
    'One paragraph.',
    { text: 'Another paragraph.', bold: true },
    { text: ['One paragraph with ', { text: 'an emphasized part', italics: true }] }
  ]
};
```

O array `text` aninhado cria **trechos em linha dentro do mesmo parágrafo**. Um array `content` ou `stack` cria **blocos separados**. Essa diferença explica muitas quebras de linha inesperadas quando você começa a criar definições.

## Escolha um contêiner

| Necessidade | Nó | Erro comum |
| --- | --- | --- |
| Vários parágrafos que compartilham um estilo | `{ stack: [...] }` | Tentar atribuir propriedades de estilo diretamente a um array |
| Blocos independentes lado a lado | `{ columns: [...] }` | Esperar que as linhas se alinhem como numa tabela |
| Linhas e células alinhadas | `{ table: { body: [...] } }` | Omitir células substitutas depois de `colSpan` ou `rowSpan` |
| Itens com marcadores ou numerados | `{ ul: [...] }` ou `{ ol: [...] }` | Inserir uma string onde se espera um array de itens |
| Estilos mistos na mesma linha | `{ text: [...] }` | Usar uma pilha, que cria blocos separados |



### Runnable example: 05 · Columns & stacks

**JavaScript**

```js
var dd = {
  content: [
    { text: 'Two perspectives', fontSize: 26, bold: true, margin: [0, 0, 0, 20] },
    { columnGap: 24, columns: [
      { width: '*', stack: [{ text: 'The essentials', bold: true }, 'This column takes an equal share of the available width.', { ul: ['Text', 'Lists', 'Nested blocks'] }] },
      { width: '*', stack: [{ text: 'The details', bold: true }, 'Use fixed widths, auto widths or star widths to describe your layout.'] }
    ] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [
    { text: 'Two perspectives', fontSize: 26, bold: true, margin: [0, 0, 0, 20] },
    { columnGap: 24, columns: [
      { width: '*', stack: [{ text: 'The essentials', bold: true }, 'This column takes an equal share of the available width.', { ul: ['Text', 'Lists', 'Nested blocks'] }] },
      { width: '*', stack: [{ text: 'The details', bold: true }, 'Use fixed widths, auto widths or star widths to describe your layout.'] }
    ] }
  ]
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/pt-br/playground/?example=columns)



## Coloque as configurações no nível certo

| Nível | Exemplos | Finalidade |
| --- | --- | --- |
| Configuração da aplicação | `addFonts`, `addTableLayouts`, políticas de recursos | Registrar recursos reutilizáveis antes de iniciar os trabalhos |
| Definição do documento | `content`, `styles`, `defaultStyle`, `pageMargins`, `footer` | Descrever um PDF |
| Nó individual | `text`, `fontSize`, `bold`, `margin`, `pageBreak` | Descrever uma parte do conteúdo |
| Segundo argumento de `createPdf` | `fontLayoutCache`, `bufferPages` | Ajustar opções do motor |

Registre fontes compartilhadas e políticas uma vez em um serviço Node. Crie uma definição nova para cada trabalho: o layout modifica os nós com medidas e posições. Evite alterar a configuração do singleton compartilhado do pdfmake enquanto houver solicitações simultâneas.

## Entenda unidades e larguras

As dimensões usam pontos. Uma margem com quatro valores segue `[esquerda, acima, direita, abaixo]`. Um número de largura representa uma largura fixa em pontos; `'auto'` acompanha o conteúdo; `'*'` compartilha o espaço restante com outras colunas com asterisco. Comece com larguras fixas ou com asterisco e depois introduza dimensionamento baseado no conteúdo quando ele resolver uma necessidade real de layout.

## Continue pela referência

[Estilos](/docs/0.3/pt-br/document-definition-object/styling/) · [Tabelas](/docs/0.3/pt-br/document-definition-object/tables/) · [Imagens](/docs/0.3/pt-br/document-definition-object/images/) · [Layout da página](/docs/0.3/pt-br/document-definition-object/page/)
