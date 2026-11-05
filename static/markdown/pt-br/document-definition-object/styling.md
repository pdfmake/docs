# Estilos

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/styling/

## Aplique estilo a um bloco ou segmento em linha

Uma string é um parágrafo simples. Use um nó de texto para adicionar propriedades. Use um array `text` para segmentos com estilos diferentes dentro do **mesmo parágrafo**; um array `content` ou uma pilha cria blocos separados.



### Runnable example: 04 · Text & named styles

**JavaScript**

```js
var dd = {
  content: [
    { text: 'Style with intent', style: 'heading' },
    { text: ['One paragraph with ', { text: 'bold', bold: true }, ' and ', { text: 'italic', italics: true }, ' inline text.'] },
    { text: 'A reusable note style.', style: 'note' },
    { ul: ['Readable defaults', 'Small style dictionaries', 'Consistent spacing'], margin: [0, 12, 0, 0] }
  ],
  defaultStyle: { fontSize: 12, lineHeight: 1.3 },
  styles: {
    heading: { fontSize: 26, bold: true, color: '#08786b', margin: [0, 0, 0, 18] },
    note: { fontSize: 10, color: '#536771', margin: [0, 12, 0, 0] }
  }
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [
    { text: 'Style with intent', style: 'heading' },
    { text: ['One paragraph with ', { text: 'bold', bold: true }, ' and ', { text: 'italic', italics: true }, ' inline text.'] },
    { text: 'A reusable note style.', style: 'note' },
    { ul: ['Readable defaults', 'Small style dictionaries', 'Consistent spacing'], margin: [0, 12, 0, 0] }
  ],
  defaultStyle: { fontSize: 12, lineHeight: 1.3 },
  styles: {
    heading: { fontSize: 26, bold: true, color: '#08786b', margin: [0, 0, 0, 18] },
    note: { fontSize: 10, color: '#536771', margin: [0, 12, 0, 0] }
  }
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/pt-br/playground/?example=styles)



## Reutilize estilos nomeados

**JavaScript**

```js
var dd = {
  defaultStyle: { fontSize: 11, lineHeight: 1.2 },
  styles: {
    heading: { fontSize: 24, bold: true },
    muted: { color: '#536771' },
    subheading: { extends: 'heading', fontSize: 16 }
  },
  content: [
    { text: 'A heading', style: 'heading' },
    { text: 'A muted heading', style: ['heading', 'muted'] },
    { text: 'An explicit override', style: 'heading', fontSize: 18 },
    { text: 'A subheading', style: 'subheading' }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  defaultStyle: { fontSize: 11, lineHeight: 1.2 },
  styles: {
    heading: { fontSize: 24, bold: true },
    muted: { color: '#536771' },
    subheading: { extends: 'heading', fontSize: 16 }
  },
  content: [
    { text: 'A heading', style: 'heading' },
    { text: 'A muted heading', style: ['heading', 'muted'] },
    { text: 'An explicit override', style: 'heading', fontSize: 18 },
    { text: 'A subheading', style: 'subheading' }
  ]
};
```

`style` aponta para entradas em `styles`. Quando um array contém estilos que definem a mesma propriedade, os estilos posteriores têm precedência. As propriedades explícitas do nó têm precedência sobre seus estilos nomeados. `defaultStyle` fornece os valores padrão do documento. Estilos em contêineres podem ser herdados pelos filhos; propriedades explícitas nos filhos os sobrescrevem.

Estilos nomeados com `extends` estão disponíveis desde a versão **0.3.3**. A propriedade aceita o nome de um único estilo pai ou um array. As propriedades do próprio estilo prevalecem sobre as dos pais; quando vários pais fornecem a mesma propriedade, os itens posteriores do array de pais prevalecem. Mantenha a herança curta e sem ciclos para facilitar a compreensão do resultado.

## Propriedades de texto comuns

| Propriedade | Tipo / valores | Significado |
| --- | --- | --- |
| `font` | Nome da família registrada | Deve corresponder ao mapa de fontes |
| `fontSize` | Número, em pontos | Tamanho do texto |
| `bold`, `italics` | Booleano, padrão `false` | Seleciona a variante de fonte correspondente |
| `alignment` | `'left'`, `'center'`, `'right'`, `'justify'` | Alinhamento do parágrafo |
| `lineHeight` | Número, padrão `1` | Multiplicador da altura da linha |
| `color`, `background` | Nome de cor ou string hexadecimal | Cor do texto e fundo do texto |
| `characterSpacing` | Número, em pontos | Espaçamento adicional entre caracteres |
| `wordBreak` | `'normal'` (padrão), `'break-all'` | Comportamento da quebra de linha |
| `fontFeatures` | Array de strings | Recursos tipográficos específicos da fonte |
| `style` | String ou array de strings | Estilos nomeados a aplicar |
| `markerColor` | Cor | Cor do marcador da lista |

São aceitos nomes de cores e valores hexadecimais, como `'#08786b'`. Os recursos de fonte dependem da fonte selecionada. Usar `bold` ou `italics` requer que a variante correspondente esteja registrada; definir a flag não fornece um arquivo de fonte ausente.

## Decorações

| Propriedade | Tipo / valores |
| --- | --- |
| `decoration` | `'underline'`, `'lineThrough'`, `'overline'` ou um array |
| `decorationStyle` | `'solid'`, `'dashed'`, `'dotted'`, `'double'`, `'wavy'` |
| `decorationColor` | Cor |
| `decorationThickness` | Largura numérica; disponível desde 0.3.3 |

**JavaScript**

```js
var dd = {
  content: [{ text: 'A marked passage', decoration: 'underline', decorationStyle: 'wavy', decorationColor: '#08786b' }]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [{ text: 'A marked passage', decoration: 'underline', decorationStyle: 'wavy', decorationColor: '#08786b' }]
};
```

## Estilos não são CSS

Use os nomes de campos documentados pelo pdfmake. Não há cascata CSS, seletor DOM ou modelo de caixas do navegador. As margens usam valores em pontos e a ordem `[esquerda, superior, direita, inferior]`. Para estilizar vários blocos em conjunto, use uma [pilha](/docs/0.3/pt-br/document-definition-object/stack/). Consulte [fontes](/docs/0.3/pt-br/fonts/) para registrar variantes e verificar a cobertura de caracteres.
