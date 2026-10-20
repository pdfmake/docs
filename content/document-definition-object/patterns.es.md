+++
sourceDigest = "85d5a2f40ac8d6ba0cd8c74c4dd5d7261674b55739b2309aa929c3410047b331"
title = "Patrones"
description = "Configura patrones en pdfmake 0.3 con ejemplos, opciones y notas de uso."
weight = 2270
alwaysopen = true
+++

Los patrones se pueden definir como un diccionario de patrones predefinidos en la definición del documento.

Solo se admiten patrones de mosaico.

## Definición de patrones

Cada patrón se define mediante:

- `boundingBox`: caja delimitadora que recorta la celda del patrón
- `xStep`: espaciado horizontal entre celdas
- `yStep`: espaciado vertical entre celdas
- `pattern`: flujo PDF de operaciones que dibujan los gráficos o el texto de la celda

Para obtener más información sobre cada propiedad y los patrones en general, consulta la [referencia PDF](https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/pdf_reference_archives/PDFReference.pdf), en especial las secciones 4.6 y 4.6.2 sobre patrones de mosaico.

## Ejemplo de definición de patrón

Patrón básico que crea rayas a 45°:

```js
var docDefinition = {
  content: ["..."],
  patterns: {
    stripe45d: {
      boundingBox: [1, 1, 4, 4],
      xStep: 3,
      yStep: 3,
      pattern: "1 w 0 1 m 4 5 l s 2 0 m 5 3 l s",
    },
  },
};
```

El resultado se puede ver en el ejemplo vectorial.

## Uso en vectores, tablas y texto

Están disponibles las propiedades siguientes.

Para texto:

- `background`: se establece como fondo del texto (consulta el ejemplo styling_properties)

Para vectores:

- `color`: se establece como relleno de un vector (consulta el rectángulo del ejemplo vectorial)

Para celdas de tabla:

- `fillColor`: color de relleno de fondo de la celda
- `overlayPattern`: patrón superpuesto sobre el contenido de la celda
- `overlayOpacity`: opacidad de la superposición

Cada una de estas propiedades se define como una tupla `[string, string]`. El primer elemento es la clave del diccionario de patrones y el segundo es el color con el que se pinta el patrón.

## Ejemplos

Texto:

```js
{ text: 'Insert lorem. And ipsum', background: ['stripe45d', 'gray'] }
```

Vector:

```js
{
  type: 'rect',
  x: 10, y: 250, w: 50, h: 30,
  color: ['stripe45d', 'blue'],
}
```

Tabla (en celdas):

```js
{
  text: 'Sample value',
  fillOpacity: 0.85,
  fillColor: ['stripe45d', 'blue']
}
```

```js
{
  text: 'Sample value',
  fillOpacity: 0.15,
  fillColor: 'blue',
  overlayPattern: ['stripe45d', 'gray'],
  overlayOpacity: 0.15
}
```
