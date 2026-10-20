# SVG

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/document-definition-object/svgs/

Los SVG se parecen mucho a las [imágenes](/docs/0.3/es/document-definition-object/images/), salvo que actualmente no se pueden referenciar por archivo ni reutilizar desde un diccionario.


> **Note:** El nodo SVG requiere un valor SVG válido. Si el valor no es válido o está vacío, se produce un error.


Para transformar SVG en un documento PDF se usa la biblioteca [SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit).

El valor del nodo `svg` puede ser una cadena o un objeto `SVGElement` (disponible solo en el navegador).


> **Note:** La compatibilidad con objetos `SVGElement` requiere la versión **0.3.1** o posterior.


**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
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
