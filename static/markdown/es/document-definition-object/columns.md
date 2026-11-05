# Columnas

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/document-definition-object/columns/

De forma predeterminada, los párrafos se muestran como una pila vertical de elementos (uno debajo de otro). Sin embargo, es posible dividir el espacio disponible en columnas.

**JavaScript**

```js
var docDefinition = {
  content: [
    'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
    {
      columns: [
        {
          // auto-sized columns have their widths based on their content
          width: 'auto',
          text: 'First column'
        },
        {
          // star-sized columns fill the remaining space
          // if there's more than one star-column, available width is divided equally
          width: '*',
          text: 'Second column'
        },
        {
          // fixed width
          width: 100,
          text: 'Third column'
        },
        {
          // % width
          width: '20%',
          text: 'Fourth column'
        }
      ],
      // optional space between columns
      columnGap: 10
    },
    'This paragraph goes below all columns and has full width'
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: [
    'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
    {
      columns: [
        {
          // auto-sized columns have their widths based on their content
          width: 'auto',
          text: 'First column'
        },
        {
          // star-sized columns fill the remaining space
          // if there's more than one star-column, available width is divided equally
          width: '*',
          text: 'Second column'
        },
        {
          // fixed width
          width: 100,
          text: 'Third column'
        },
        {
          // % width
          width: '20%',
          text: 'Fourth column'
        }
      ],
      // optional space between columns
      columnGap: 10
    },
    'This paragraph goes below all columns and has full width'
  ]
};
```

El contenido de las columnas no se limita a texto sencillo: puede incluir cualquier elemento válido de pdfmake. Consulta el ejemplo COLUMNS en el [entorno de pruebas](/docs/0.3/es/playground/).

## Propiedades

* `columnGap: number`: especifica el espacio entre columnas
* `snakingColumns: boolean`: columnas en flujo serpenteante (estilo periódico); consulta este [artículo](/docs/0.3/es/document-definition-object/snaking-columns/) _(versión mínima: 0.3.5)_
