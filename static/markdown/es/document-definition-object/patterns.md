# Patrones

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/document-definition-object/patterns/

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

**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
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

**JavaScript**

```js
var dd = { content: [
{ text: 'Insert lorem. And ipsum', background: ['stripe45d', 'gray'] }
] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [
{ text: 'Insert lorem. And ipsum', background: ['stripe45d', 'gray'] }
] };
```

Vector:

**JavaScript**

```js
var dd = { content: [{ canvas: [
{
  type: 'rect',
  x: 10, y: 250, w: 50, h: 30,
  color: ['stripe45d', 'blue'],
}
] }] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [{ canvas: [
{
  type: 'rect',
  x: 10, y: 250, w: 50, h: 30,
  color: ['stripe45d', 'blue'],
}
] }] };
```

Tabla (en celdas):

**JavaScript**

```js
var dd = { content: [
{
  text: 'Sample value',
  fillOpacity: 0.85,
  fillColor: ['stripe45d', 'blue']
}
] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [
{
  text: 'Sample value',
  fillOpacity: 0.85,
  fillColor: ['stripe45d', 'blue']
}
] };
```

**JavaScript**

```js
var dd = { content: [
{
  text: 'Sample value',
  fillOpacity: 0.15,
  fillColor: 'blue',
  overlayPattern: ['stripe45d', 'gray'],
  overlayOpacity: 0.15
}
] };
```

**TypeScript**

```ts
import type { ContentText } from "pdfmake/interfaces";

// Cell properties are included in the bundled pdfmake declarations.
const cell = {
  text: 'Sample value',
  fillOpacity: 0.15,
  fillColor: 'blue',
  overlayPattern: ['stripe45d', 'gray'],
  overlayOpacity: 0.15
} satisfies ContentText;

```
