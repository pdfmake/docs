+++
title = "Marca-d'água"
description = "Configure marcas-d'água de texto no pdfmake 0.3."
weight = 2240
alwaysopen = true
sourceDigest = "6282ba69e28519af356033aef8c20701350b760f1926f0c1d592767e5cde5c02"
+++

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
```js
var docDefinition = {
  watermark: 'test watermark',
  content: [
    '...'
  ]
};
```

Exemplo de estilo de fonte:
```js
var docDefinition = {
  watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
  content: [
    '...'
  ]
};
```

Exemplo de tamanho próprio da fonte:
```js
var docDefinition = {
  watermark: { text: 'test watermark', fontSize: 20 },
  content: [
    '...'
  ]
};
```

Exemplo do ângulo de rotação da marca-d'água:
```js
var docDefinition = {
  watermark: { text: 'test watermark', angle: 70 },
  content: [
    '...'
  ]
};
```
