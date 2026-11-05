# Marca de agua

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/document-definition-object/watermark/

## Propiedades

* `text`: texto de la marca de agua
* `color`: color del texto
* `opacity`: opacidad del texto
* `bold`: estilo en negrita del texto
* `italics`: estilo en cursiva del texto
* `fontSize`: tamaño de fuente propio (el tamaño ideal se calcula automáticamente)
* `angle`: ángulo de rotación del texto

## Ejemplos

Ejemplo de uso básico:
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

Ejemplo de estilo de fuente:
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

Ejemplo de tamaño de fuente propio:
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

Ejemplo de ángulo de rotación de la marca de agua:
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
