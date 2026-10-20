+++
sourceDigest = "48bc3047dc6a23638e82fe81a22c544d203aad3bebf645cdee21772c669cefae"
title = "Tablas"
description = "Crea tablas coherentes con filas, encabezados repetidos, bordes personalizados, anchos y celdas combinadas."
weight = 2030
alwaysopen = true
+++

## Empezar con filas y un encabezado repetido

Usa una tabla cuando haya que alinear celdas de distintas filas. `body` es una matriz de matrices que representan filas. Todas las filas deben tener el mismo número de celdas; las celdas pueden contener texto u otros nodos de pdfmake. `headerRows: 1` repite la primera fila cuando la tabla continúa en otra página.

{{< example id="tables" >}}

## Elegir los anchos

| Ancho | Significado | Útil cuando |
| --- | --- | --- |
| Un número, por ejemplo `80` | Puntos fijos | Códigos, cantidades o una columna de etiquetas predecible |
| `'*'` | Comparte el ancho restante | Una descripción debe ocupar el espacio disponible |
| `'auto'` | Mide el contenido | Las etiquetas cortas deben usar solo el ancho que necesitan |
| Una cadena de porcentaje | Ancho basado en porcentajes | Se necesita una distribución proporcional; prueba con cuidado los anchos mixtos |

Los bordes, el relleno, los márgenes de página y las demás columnas también consumen espacio. Empieza con anchos fijos y con `*`; luego usa `auto` cuando quieras deliberadamente un ajuste según el contenido. Evita añadir anchos fijos grandes que superen el área de contenido.

## Campos de tabla y celda

| Campo | Dónde | Tipo / propósito |
| --- | --- | --- |
| `body` | `table` | Matrices de filas no vacías |
| `widths` | `table` | Descriptores de ancho, uno por columna |
| `headerRows` | `table` | Número de filas iniciales que se repiten como encabezados |
| `dontBreakRows` | `table` | Evita dividir una fila individual entre páginas |
| `keepWithHeaderRows` | `table` | Número de filas siguientes que se mantienen junto al encabezado |
| `layout` | Nodo, junto a `table` | Nombre de una distribución integrada, nombre personalizado registrado u objeto de distribución |
| `colSpan`, `rowSpan` | Celda | Número positivo de columnas/filas que se abarcan; también se requieren celdas de marcador |
| `verticalAlignment` | Celda | `'top'` (predeterminado), `'middle'` o `'bottom'` |
| `border` | Celda | Cuatro booleanos: izquierda, arriba, derecha, abajo |
| `borderColor` | Celda | Cuatro colores en el mismo orden |
| `fillColor` | Celda | Color de fondo o tupla de patrón compatible |
| `fillOpacity` | Celda | Opacidad numérica del fondo |
| `overlayPattern`, `overlayOpacity` | Celda | Tupla de patrón y opacidad numérica que se pinta sobre el contenido |

Mantener una fila unida no permite que una fila demasiado grande quepa en una página. Prueba las descripciones largas y el contenido anidado con el tamaño de página y las fuentes reales.

## Combinar celdas sin cambiar la longitud de las filas

```js
var dd = {
  content: [{
    table: {
      widths: ['*', '*', '*'],
      body: [
        [{ text: 'A heading across three columns', colSpan: 3, bold: true }, {}, {}],
        [{ text: 'Two rows', rowSpan: 2 }, 'A', 'B'],
        [{}, 'C', 'D']
      ]
    }
  }]
};
```

Los objetos vacíos ocupan las celdas abarcadas por `span`. Si los omites, la fila tendrá una longitud incoherente. No uses `undefined` como marcador de posición. El [ejemplo de celdas combinadas del entorno de pruebas](/docs/0.3/es/playground/?example=spans) muestra esta definición.

## Usar una distribución integrada

`noBorders`, `headerLineOnly` y `lightHorizontalLines` están disponibles por nombre. Coloca `layout` junto a `table`, no dentro:

```js
var dd = {
  content: [{
    layout: 'lightHorizontalLines',
    table: { headerRows: 1, widths: ['*', 'auto'], body: [['Item', 'Qty'], ['Notebook', 3]] }
  }]
};
```

## Registrar una distribución personalizada

Registra las distribuciones antes de crear el documento. En Node, usa el singleton de `pdfmake` configurado; en el navegador, usa `pdfMake`.

```js
pdfMake.addTableLayouts({
  compact: {
    hLineWidth: function (index, node) {
      return index === node.table.headerRows ? 1 : 0;
    },
    vLineWidth: function () { return 0; },
    hLineColor: function () { return '#b7cfc4'; },
    paddingLeft: function () { return 6; },
    paddingRight: function () { return 6; }
  }
});

var dd = {
  content: [{ layout: 'compact', table: { headerRows: 1, body: [['Item', 'Qty'], ['Notebook', 3]] } }]
};
```

El fragmento supone que el motor del navegador y las fuentes ya están cargados. Definir una variable de distribución no la registra. Prefiere callbacks deterministas y evita mutar la configuración compartida durante trabajos simultáneos de Node.

## Diagnosticar tablas malformadas

Comprueba `body` antes de cambiar los bordes o los anchos: debe contener matrices de filas con longitudes coherentes. Luego comprueba los marcadores de posición de las celdas combinadas. En la rama de mejoras local, los diagnósticos identifican la ruta de la definición problemática y el número de celdas esperado. Consulta [errores y diagnósticos](/docs/0.3/es/guides/errors/).
