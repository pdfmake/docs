+++
sourceDigest = "6282ba69e28519af356033aef8c20701350b760f1926f0c1d592767e5cde5c02"
title = "Marca de agua"
description = "Configura marcas de agua en pdfmake 0.3 con ejemplos, opciones y notas de uso."
weight = 2240
alwaysopen = true
+++

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
```js
var docDefinition = {
  watermark: 'test watermark',
  content: [
    '...'
  ]
};
```

Ejemplo de estilo de fuente:
```js
var docDefinition = {
  watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
  content: [
    '...'
  ]
};
```

Ejemplo de tamaño de fuente propio:
```js
var docDefinition = {
  watermark: { text: 'test watermark', fontSize: 20 },
  content: [
    '...'
  ]
};
```

Ejemplo de ángulo de rotación de la marca de agua:
```js
var docDefinition = {
  watermark: { text: 'test watermark', angle: 70 },
  content: [
    '...'
  ]
};
```
