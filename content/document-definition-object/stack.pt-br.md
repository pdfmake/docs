+++
title = "Pilha de parágrafos"
description = "Agrupe parágrafos e elementos em uma pilha vertical no pdfmake 0.3."
weight = 2080
alwaysopen = true
sourceDigest = "9fe0fd923768dfa5981b12db404c9abfe438f65b26f6f0bafe27d8c8bb784a5f"
+++

Como você já deve ter percebido pelos exemplos, quando a chave `content` recebe um array, o documento se torna uma pilha de parágrafos.

É comum reutilizar essa estrutura em um elemento aninhado, como no exemplo a seguir:

```js
var docDefinition = {
  content: [
    'paragraph 1',
    'paragraph 2',
    {
      columns: [
        'first column is a simple text',
        [
          // second column consists of paragraphs
          'paragraph A',
          'paragraph B',
          'these paragraphs will be rendered one below another inside the column'
        ]
      ]
    }
  ]
};
```

O problema de um array é que não é possível adicionar propriedades de estilo diretamente a ele (por exemplo, para alterar `fontSize`).

A boa notícia é que o array é apenas um atalho do pdfmake para `{ stack: [] }`. Portanto, para reaplicar estilo à pilha inteira, use a definição expandida:

```js
var docDefinition = {
  content: [
    'paragraph 1',
    'paragraph 2',
    {
      columns: [
        'first column is a simple text',
        {
          stack: [
            // second column consists of paragraphs
            'paragraph A',
            'paragraph B',
            'these paragraphs will be rendered one below another inside the column'
          ],
          fontSize: 15
        }
      ]
    }
  ]
};
```

## Manter uma pilha junta

Use `unbreakable: true` para manter uma pilha em uma página quando couber. Se faltar apenas espaço na página atual, a pilha inteira vai para a próxima. Para pilhas grandes demais, consulte [Excesso de blocos indivisíveis](/docs/0.3/pt-br/options/#unbreakable-overflow).

```js
var docDefinition = {
  content: [
    {
      unbreakable: true,
      stack: [
        { text: 'Heading', bold: true },
        'Paragraph kept with the heading.'
      ]
    }
  ]
};
```
