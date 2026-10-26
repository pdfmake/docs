# Padrões

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/patterns/

Os padrões podem ser definidos como um dicionário de padrões predefinidos na definição do documento.

Há suporte somente a padrões de ladrilhamento.

## Definição de padrão

Cada padrão é definido com:

- `boundingBox` - caixa delimitadora usada para recortar a célula do padrão
- `xStep` - espaçamento horizontal entre as células
- `yStep` - espaçamento vertical entre as células
- `pattern` - fluxo PDF de operações que renderizam os gráficos/texto da célula

Para obter mais informações sobre cada propriedade e padrões em geral, consulte a [referência do PDF](https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/pdf_reference_archives/PDFReference.pdf), especialmente as seções 4.6 e 4.6.2 sobre padrões de ladrilhamento.

## Exemplo de definição de padrão

Padrão básico que produz listras a 45°:

**JavaScript**

```js
var docDefinition = {
  content: ["..."],
  patterns: {
    stripe45d: {
      boundingBox: [1, 1, 4, 4],
      xStep: 3,
      yStep: 3,
      pattern: "1 w 0 1 m 4 5 l s 2 0 m 5 3 l s",
    },
  },
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: ["..."],
  patterns: {
    stripe45d: {
      boundingBox: [1, 1, 4, 4],
      xStep: 3,
      yStep: 3,
      pattern: "1 w 0 1 m 4 5 l s 2 0 m 5 3 l s",
    },
  },
};
```

O resultado pode ser visto no exemplo vetorial.

## Uso em vetores, tabelas e texto

As propriedades a seguir estão disponíveis.

Para texto:

- `background` - define o fundo do texto (consulte o exemplo styling_properties)

Para vetores:

- `color` - define o preenchimento de um vetor (consulte o retângulo no exemplo vetorial)

Para células de tabela:

- `fillColor` - cor de preenchimento da célula (fundo)
- `overlayPattern` - sobreposição da célula, desenhada sobre o conteúdo
- `overlayOpacity` - opacidade da sobreposição

Cada uma das propriedades acima é definida como uma tupla `[string, string]`. O primeiro elemento é a chave no dicionário `patterns`; o segundo é a cor usada para desenhar o padrão.

## Exemplos

Texto:

**JavaScript**

```js
var dd = { content: [
{ text: 'Insert lorem. And ipsum', background: ['stripe45d', 'gray'] }
] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [
{ text: 'Insert lorem. And ipsum', background: ['stripe45d', 'gray'] }
] };
```

Vetor:

**JavaScript**

```js
var dd = { content: [{ canvas: [
{
  type: 'rect',
  x: 10, y: 250, w: 50, h: 30,
  color: ['stripe45d', 'blue'],
}
] }] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [{ canvas: [
{
  type: 'rect',
  x: 10, y: 250, w: 50, h: 30,
  color: ['stripe45d', 'blue'],
}
] }] };
```

Tabela (usado em células da tabela):

**JavaScript**

```js
var dd = { content: [
{
  text: 'Sample value',
  fillOpacity: 0.85,
  fillColor: ['stripe45d', 'blue']
}
] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [
{
  text: 'Sample value',
  fillOpacity: 0.85,
  fillColor: ['stripe45d', 'blue']
}
] };
```

**JavaScript**

```js
var dd = { content: [
{
  text: 'Sample value',
  fillOpacity: 0.15,
  fillColor: 'blue',
  overlayPattern: ['stripe45d', 'gray'],
  overlayOpacity: 0.15
}
] };
```

**TypeScript**

```ts
import type { ContentText } from "pdfmake/interfaces";

// Cell properties are included in the bundled pdfmake declarations.
const cell = {
  text: 'Sample value',
  fillOpacity: 0.15,
  fillColor: 'blue',
  overlayPattern: ['stripe45d', 'gray'],
  overlayOpacity: 0.15
} satisfies ContentText;

```
