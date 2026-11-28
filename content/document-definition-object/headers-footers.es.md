+++
sourceDigest = "a47e47aa446dfbb4a3b97ade1254c9b6edbe8abfc9b34ac2cd7d2cfaac111b14"
title = "Encabezados y pies de página"
description = "Añade encabezados y pies de página estáticos o dinámicos, con números de página, recuentos totales y espacio reservado en los márgenes."
weight = 2050
+++

## Añadir un encabezado estático

```js
var docDefinition = {
  pageMargins: [40, 65, 40, 55],
  header: { text: 'Example report', margin: [40, 20, 40, 0] },
  footer: { text: 'Example Studio', alignment: 'center', fontSize: 9 },
  content: ['Document content']
};
```

Los encabezados y pies de página se repiten en todas las páginas. Reserva suficiente margen superior e inferior para su contenido; no amplían automáticamente los márgenes del cuerpo. El contenido devuelto usa nodos normales de pdfmake.

## Añadir números de página

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

Las funciones de retorno reciben el número de la página actual (a partir de 1), el número total de páginas y el tamaño de página. Devuelve un nodo nuevo en cada llamada. Mantén las funciones deterministas y evita modificar datos compartidos de la aplicación.
