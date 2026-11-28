+++
sourceDigest = "9fe0fd923768dfa5981b12db404c9abfe438f65b26f6f0bafe27d8c8bb784a5f"
title = "Pila de párrafos"
description = "Configura una pila de párrafos en pdfmake 0.3 con ejemplos, opciones y notas de uso."
weight = 2080
alwaysopen = true
+++

Como quizá ya hayas deducido de los ejemplos, si asignas una matriz a la clave `content`, el documento se convierte en una pila de párrafos.

Con frecuencia reutilizarás esta estructura dentro de un elemento anidado, como en este ejemplo:
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

El problema de una matriz es que no puedes añadirle propiedades de estilo (por ejemplo, para cambiar `fontSize`).

La buena noticia es que, en pdfMake, una matriz es un atajo para `{ stack: [] }`. Por tanto, si quieres cambiar el estilo de toda la pila, puedes usar la definición ampliada:
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

## Mantener una pila junta

Usa `unbreakable: true` para mantener una pila en una página si cabe. Si solo falta espacio en la página actual, la pila completa pasa a la siguiente. Para pilas demasiado grandes, consulta [Desbordamiento de bloques indivisibles](/docs/0.3/es/options/#unbreakable-overflow).

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
