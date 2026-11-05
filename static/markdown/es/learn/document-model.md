# El modelo de documento

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/learn/document-model/

## Empezar por el contenido

`content` describe el cuerpo del PDF. Una cadena sencilla es un párrafo. Una matriz de contenido es una secuencia vertical de bloques. Un objeto describe un nodo con propiedades adicionales. pdfmake calcula las posiciones; por lo general, no hace falta especificar coordenadas.

**JavaScript**

```js
const dd = {
  content: [
    'One paragraph.',
    { text: 'Another paragraph.', bold: true },
    { text: ['One paragraph with ', { text: 'an emphasized part', italics: true }] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

const dd: TDocumentDefinitions = {
  content: [
    'One paragraph.',
    { text: 'Another paragraph.', bold: true },
    { text: ['One paragraph with ', { text: 'an emphasized part', italics: true }] }
  ]
};
```

La matriz `text` anidada crea **segmentos en línea dentro del mismo párrafo**. Una matriz `content` o un `stack` crea **bloques independientes**. Esta distinción explica muchos saltos de línea inesperados al empezar a crear definiciones.

## Elegir un contenedor

| Necesidad | Nodo | Error habitual |
| --- | --- | --- |
| Varios párrafos que comparten un estilo | `{ stack: [...] }` | Intentar asignar propiedades de estilo directamente a una matriz |
| Bloques independientes uno junto a otro | `{ columns: [...] }` | Esperar que las filas queden alineadas como en una tabla |
| Filas y celdas alineadas | `{ table: { body: [...] } }` | Omitir las celdas de marcador de posición tras `colSpan` o `rowSpan` |
| Elementos con viñetas o numerados | `{ ul: [...] }` o `{ ol: [...] }` | Incrustar una cadena donde se espera una matriz de elementos |
| Varios estilos dentro de una línea | `{ text: [...] }` | Usar una pila, que crea bloques independientes |



### Runnable example: 05 · Columns & stacks

**JavaScript**

```js
var dd = {
  content: [
    { text: 'Two perspectives', fontSize: 26, bold: true, margin: [0, 0, 0, 20] },
    { columnGap: 24, columns: [
      { width: '*', stack: [{ text: 'The essentials', bold: true }, 'This column takes an equal share of the available width.', { ul: ['Text', 'Lists', 'Nested blocks'] }] },
      { width: '*', stack: [{ text: 'The details', bold: true }, 'Use fixed widths, auto widths or star widths to describe your layout.'] }
    ] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [
    { text: 'Two perspectives', fontSize: 26, bold: true, margin: [0, 0, 0, 20] },
    { columnGap: 24, columns: [
      { width: '*', stack: [{ text: 'The essentials', bold: true }, 'This column takes an equal share of the available width.', { ul: ['Text', 'Lists', 'Nested blocks'] }] },
      { width: '*', stack: [{ text: 'The details', bold: true }, 'Use fixed widths, auto widths or star widths to describe your layout.'] }
    ] }
  ]
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/es/playground/?example=columns)



## Colocar la configuración en el nivel correcto

| Nivel | Ejemplos | Propósito |
| --- | --- | --- |
| Configuración de la aplicación | `addFonts`, `addTableLayouts`, políticas de recursos | Registra recursos reutilizables antes de iniciar los trabajos |
| Definición del documento | `content`, `styles`, `defaultStyle`, `pageMargins`, `footer` | Describe un PDF |
| Nodo individual | `text`, `fontSize`, `bold`, `margin`, `pageBreak` | Describe una parte del contenido |
| Segundo argumento de `createPdf` | `fontLayoutCache`, `bufferPages` | Ajusta las opciones del motor |

En un servicio Node, registra una vez las fuentes compartidas y las políticas. Crea una definición nueva para cada trabajo: la maquetación modifica los nodos con medidas y posiciones. Evita modificar la configuración del singleton compartido de pdfmake durante solicitudes simultáneas.

## Comprender las unidades y los anchos

Las dimensiones se expresan en puntos. Un margen de cuatro valores sigue el orden `[left, top, right, bottom]` (izquierda, arriba, derecha, abajo). Un ancho numérico es un ancho fijo en puntos; `'auto'` se ajusta al contenido y `'*'` comparte el espacio restante con las demás columnas de asterisco. Empieza con anchos fijos o con asteriscos e introduce el ajuste al contenido cuando resuelva una necesidad real de distribución.

## Continuar con la referencia

[Estilos](/docs/0.3/es/document-definition-object/styling/) · [Tablas](/docs/0.3/es/document-definition-object/tables/) · [Imágenes](/docs/0.3/es/document-definition-object/images/) · [Distribución de páginas](/docs/0.3/es/document-definition-object/page/)
