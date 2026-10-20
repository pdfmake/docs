# Índice

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/document-definition-object/toc/

## Marcar encabezados para incluirlos

**JavaScript**

```js
var docDefinition = {
  content: [
    { toc: { title: { text: 'Contents', fontSize: 20, bold: true }, numberStyle: { bold: true } } },
    { text: 'Introduction', tocItem: true, fontSize: 18, margin: [0, 20, 0, 10] },
    'Document body',
    { text: 'Details', tocItem: true, pageBreak: 'before', fontSize: 18 }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: [
    { toc: { title: { text: 'Contents', fontSize: 20, bold: true }, numberStyle: { bold: true } } },
    { text: 'Introduction', tocItem: true, fontSize: 18, margin: [0, 20, 0, 10] },
    'Document body',
    { text: 'Details', tocItem: true, pageBreak: 'before', fontSize: 18 }
  ]
};
```

El nodo `toc` inserta la lista generada; `tocItem` marca los nodos de texto que se incluirán. Los números de página se calculan durante la maquetación.

## Varios índices

Cada índice es un nodo de contenido independiente. Usa identificadores para elegir en qué lista aparece cada elemento:

**JavaScript**

```js
var docDefinition = {
  content: [
    { toc: { id: 'main', title: 'All sections' } },
    { toc: { id: 'details', title: 'Detailed sections' } },
    { text: 'Overview', tocItem: 'main' },
    { text: 'Technical details', tocItem: ['main', 'details'], pageBreak: 'before' }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: [
    { toc: { id: 'main', title: 'All sections' } },
    { toc: { id: 'details', title: 'Detailed sections' } },
    { text: 'Overview', tocItem: 'main' },
    { text: 'Technical details', tocItem: ['main', 'details'], pageBreak: 'before' }
  ]
};
```

No pongas dos claves `toc` en el mismo objeto: JavaScript conserva únicamente el último valor.

## Opciones de ToC

| Campo | Tipo | Significado |
| --- | --- | --- |
| `id` | string | Identificador de un índice con nombre |
| `title` | string o nodo de texto | Título opcional |
| `textStyle`, `numberStyle` | objeto de estilo | Estilos del texto de la entrada y del número de página |
| `textMargin` | margen | Espaciado de las entradas |
| `hideEmpty` | boolean | Oculta un índice vacío; predeterminado: false, desde 0.3.3 |
| `sortBy` | `'page'` o `'title'` | Orden; predeterminado: página, desde 0.3.3 |
| `sortLocale` | string | Idioma para ordenar; de forma predeterminada, el idioma de ejecución, desde 0.3.3 |
| `outlines` | boolean | Incluye las entradas en los marcadores del PDF; desde 0.3.5 |

En un nodo de texto marcado, `tocItem` acepta `true`, un identificador de índice o una matriz de identificadores. Las propiedades `textStyle`, `numberStyle` y `textMargin` del nodo de texto permiten personalizar su entrada. Consulta [esquemas](/docs/0.3/es/document-definition-object/outlines/) para controlar los marcadores.
