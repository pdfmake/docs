+++
title = "Compactação"
description = "Controle a compactação dos fluxos PDF com a propriedade compress da definição do documento; ela fica ativada por padrão."
weight = 2280
sourceDigest = "92de3279ae232bb95314ce206d2d5914ca81723e46208aabd408dce25d90db55"
+++

## Comportamento padrão

A compactação dos fluxos PDF fica ativada por padrão. Para desativá-la durante uma inspeção:

```js
var docDefinition = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

`compress` é um campo booleano da definição do documento, não do objeto de opções de `createPdf`. Desativá-lo geralmente aumenta o tamanho da saída. Isso não remove a incorporação de fontes nem os dados de imagem e não reduz o uso de memória do layout. Consulte [desempenho](/docs/0.3/pt-br/guides/performance/) para orientações de medição.
