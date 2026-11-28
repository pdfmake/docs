# Marca-d'água

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/watermark/

## Propriedades

* `text` - texto da marca-d'água
* `color` - cor do texto
* `opacity` - opacidade do texto
* `bold` - estilo em negrito do texto
* `italics` - estilo em itálico do texto
* `fontSize` - tamanho próprio da fonte (o tamanho ideal é calculado automaticamente)
* `angle` - ângulo de rotação do texto

## Exemplos

Exemplo de uso básico simples:
**JavaScript**

```js
var docDefinition = {
  watermark: 'test watermark',
  content: [
    '...'
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  watermark: 'test watermark',
  content: [
    '...'
  ]
};
```

Exemplo de estilo de fonte:
**JavaScript**

```js
var docDefinition = {
  watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
  content: [
    '...'
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
  content: [
    '...'
  ]
};
```

Exemplo de tamanho próprio da fonte:
**JavaScript**

```js
var docDefinition = {
  watermark: { text: 'test watermark', fontSize: 20 },
  content: [
    '...'
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  watermark: { text: 'test watermark', fontSize: 20 },
  content: [
    '...'
  ]
};
```

Exemplo do ângulo de rotação da marca-d'água:
**JavaScript**

```js
var docDefinition = {
  watermark: { text: 'test watermark', angle: 70 },
  content: [
    '...'
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  watermark: { text: 'test watermark', angle: 70 },
  content: [
    '...'
  ]
};
```
