+++
sourceDigest = "04c569677571b5807400b3610efeeabd2981f70fae31c778b9a5337c0abe6c26"
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
