+++
title = "SVGs"
description = "Adicione conteúdo vetorial SVG aos documentos pdfmake 0.3 e controle suas dimensões e escala."
weight = 2110
sourceDigest = "1370a9ae1ce49896f1ce3301d0947639f4e5fd7225b9babd15b140e19eed060a"
+++

SVGs são muito parecidos com [imagens](/docs/0.3/pt-br/document-definition-object/images/), mas atualmente não é possível referenciar SVGs por arquivo nem reutilizá-los a partir de um dicionário.

{{% alert theme="warning" %}}O nó SVG espera um valor SVG válido. Se o valor estiver vazio ou for inválido, será lançado um erro.{{% /alert %}}

A biblioteca [SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit) é usada para transformar SVG em um documento PDF.

O valor do nó `svg` pode ser uma string ou um objeto `SVGElement` (disponível somente no navegador).

{{% alert theme="warning" %}}O suporte ao objeto `SVGElement` requer a versão **0.3.1** ou posterior{{% /alert %}}

```js
var docDefinition = {
  content: [
    {
      // If no width/height/fit is used, then dimensions from the svg element is used.
      svg: '<svg width="300" height="200" viewBox="0 0 300 200">...</svg>'
    },
    {
      // if you specify width, svg will scale proportionally
      svg: '<svg width="300" height="200" viewBox="0 0 300 200">...</svg>',
      width: 150
    },
    {
      // if you specify height, svg will scale proportionally
      // Minimal pdfmake version: 0.3.2
      svg: '<svg width="300" height="200" viewBox="0 0 300 200">...</svg>',
      height: 100
    },
    {
      // if you specify both width and height - svg will be stretched
      svg: '<svg width="300" height="200" viewBox="0 0 300 200">...</svg>',
      width: 600,
      height: 400
    },
    {
      // you can also fit the svg inside a rectangle
      svg: '<svg width="300" height="200" viewBox="0 0 300 200">...</svg>',
      fit: [150, 100]
    },
    {
      // if no width/height is specified in SVG element, you must set width and height for node
      svg: '<svg>...</svg>',
      width: 300,
      height: 200
    },
  ]
};
```
