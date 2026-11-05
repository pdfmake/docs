+++
title = "Cabeçalhos e rodapés"
description = "Adicione cabeçalhos e rodapés de página estáticos ou dinâmicos, com números, total de páginas e espaço reservado nas margens."
weight = 2050
sourceDigest = "a47e47aa446dfbb4a3b97ade1254c9b6edbe8abfc9b34ac2cd7d2cfaac111b14"
+++

## Adicione um cabeçalho estático

```js
var docDefinition = {
  pageMargins: [40, 65, 40, 55],
  header: { text: 'Example report', margin: [40, 20, 40, 0] },
  footer: { text: 'Example Studio', alignment: 'center', fontSize: 9 },
  content: ['Document content']
};
```

Os cabeçalhos e rodapés se repetem nas páginas. Reserve margem superior e inferior suficiente para o conteúdo; eles não aumentam automaticamente as margens do corpo. O conteúdo retornado usa os nós normais do pdfmake.

## Adicione números de página

```js
var docDefinition = {
  pageMargins: [40, 65, 40, 55],
  header: function (currentPage, pageCount, pageSize) {
    return {
      text: 'Report · ' + pageSize.width + ' pt wide',
      alignment: currentPage % 2 ? 'left' : 'right',
      margin: [40, 20, 40, 0],
      fontSize: 9
    };
  },
  footer: function (currentPage, pageCount) {
    return { text: currentPage + ' of ' + pageCount, alignment: 'center', fontSize: 9 };
  },
  content: ['First page', { text: 'Second page', pageBreak: 'before' }]
};
```

Os callbacks recebem o número da página atual (começando em 1), a contagem total de páginas e o tamanho da página. Retorne um nó novo a cada chamada. Mantenha os callbacks determinísticos e evite alterar dados compartilhados da aplicação.
