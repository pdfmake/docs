# Estilos

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/document-definition-object/styling/

## Aplicar estilo a un bloque o segmento en línea

Una cadena es un párrafo sencillo. Usa un nodo de texto para añadir propiedades. Usa una matriz `text` para dar estilos distintos a segmentos dentro del **mismo párrafo**; una matriz de contenido o una pila crea bloques separados.



### Runnable example: 04 · Text & named styles

**JavaScript**

```js
var dd = {
  content: [
    { text: 'Style with intent', style: 'heading' },
    { text: ['One paragraph with ', { text: 'bold', bold: true }, ' and ', { text: 'italic', italics: true }, ' inline text.'] },
    { text: 'A reusable note style.', style: 'note' },
    { ul: ['Readable defaults', 'Small style dictionaries', 'Consistent spacing'], margin: [0, 12, 0, 0] }
  ],
  defaultStyle: { fontSize: 12, lineHeight: 1.3 },
  styles: {
    heading: { fontSize: 26, bold: true, color: '#08786b', margin: [0, 0, 0, 18] },
    note: { fontSize: 10, color: '#536771', margin: [0, 12, 0, 0] }
  }
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [
    { text: 'Style with intent', style: 'heading' },
    { text: ['One paragraph with ', { text: 'bold', bold: true }, ' and ', { text: 'italic', italics: true }, ' inline text.'] },
    { text: 'A reusable note style.', style: 'note' },
    { ul: ['Readable defaults', 'Small style dictionaries', 'Consistent spacing'], margin: [0, 12, 0, 0] }
  ],
  defaultStyle: { fontSize: 12, lineHeight: 1.3 },
  styles: {
    heading: { fontSize: 26, bold: true, color: '#08786b', margin: [0, 0, 0, 18] },
    note: { fontSize: 10, color: '#536771', margin: [0, 12, 0, 0] }
  }
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/es/playground/?example=styles)



## Reutilizar estilos con nombre

**JavaScript**

```js
var dd = {
  defaultStyle: { fontSize: 11, lineHeight: 1.2 },
  styles: {
    heading: { fontSize: 24, bold: true },
    muted: { color: '#536771' },
    subheading: { extends: 'heading', fontSize: 16 }
  },
  content: [
    { text: 'A heading', style: 'heading' },
    { text: 'A muted heading', style: ['heading', 'muted'] },
    { text: 'An explicit override', style: 'heading', fontSize: 18 },
    { text: 'A subheading', style: 'subheading' }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  defaultStyle: { fontSize: 11, lineHeight: 1.2 },
  styles: {
    heading: { fontSize: 24, bold: true },
    muted: { color: '#536771' },
    subheading: { extends: 'heading', fontSize: 16 }
  },
  content: [
    { text: 'A heading', style: 'heading' },
    { text: 'A muted heading', style: ['heading', 'muted'] },
    { text: 'An explicit override', style: 'heading', fontSize: 18 },
    { text: 'A subheading', style: 'subheading' }
  ]
};
```

`style` hace referencia a las entradas de `styles`. Cuando varias entradas de una matriz definen la misma propiedad, prevalece la última. Las propiedades explícitas del nodo prevalecen sobre sus estilos con nombre. `defaultStyle` proporciona los valores predeterminados del documento. Los estilos de los contenedores se pueden heredar por sus hijos; las propiedades explícitas de los hijos los sobrescriben.

La propiedad `extends` para estilos con nombre está disponible desde la versión **0.3.3**. Acepta el nombre de un estilo principal o una matriz de nombres. Las propiedades del propio estilo prevalecen sobre las de sus estilos principales; si hay varios estilos principales, las entradas posteriores tienen prioridad cuando más de uno proporciona la misma propiedad. Mantén la herencia breve y sin ciclos para facilitar su comprensión.

## Propiedades de texto habituales

| Propiedad | Tipo / valores | Significado |
| --- | --- | --- |
| `font` | Nombre de familia registrada | Debe coincidir con el mapa de fuentes |
| `fontSize` | Número, puntos | Tamaño del texto |
| `bold`, `italics` | Boolean, predeterminado false | Selecciona la variante correspondiente de la fuente |
| `alignment` | `'left'`, `'center'`, `'right'`, `'justify'` | Alineación del párrafo |
| `lineHeight` | Número, predeterminado 1 | Multiplicador de la altura de línea |
| `color`, `background` | Nombre de color o cadena hexadecimal | Color del texto y su fondo |
| `characterSpacing` | Número, puntos | Espaciado adicional entre caracteres |
| `wordBreak` | `'normal'` (predeterminado), `'break-all'` | Comportamiento de ajuste de línea |
| `fontFeatures` | Matriz de cadenas | Funciones tipográficas específicas de la fuente |
| `style` | Cadena o matriz de cadenas | Estilos con nombre que se aplicarán |
| `markerColor` | Color | Color de la viñeta |

Se admiten nombres de colores y valores hexadecimales como `'#08786b'`. Las funciones de fuente dependen de la fuente seleccionada. Activar `bold` o `italics` requiere que se haya registrado esa variante; establecer el indicador no proporciona un archivo de fuente que falte.

## Decoraciones

| Propiedad | Tipo / valores |
| --- | --- |
| `decoration` | `'underline'`, `'lineThrough'`, `'overline'` o una matriz |
| `decorationStyle` | `'solid'`, `'dashed'`, `'dotted'`, `'double'`, `'wavy'` |
| `decorationColor` | Color |
| `decorationThickness` | Ancho numérico; desde 0.3.3 |

**JavaScript**

```js
var dd = {
  content: [{ text: 'A marked passage', decoration: 'underline', decorationStyle: 'wavy', decorationColor: '#08786b' }]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [{ text: 'A marked passage', decoration: 'underline', decorationStyle: 'wavy', decorationColor: '#08786b' }]
};
```

## Los estilos no son CSS

Usa los nombres de campo documentados por pdfmake. No hay cascada CSS, selector DOM ni modelo de caja del navegador. Los márgenes usan valores en puntos y el orden `[izquierda, arriba, derecha, abajo]`. Para aplicar estilo a varios bloques juntos, usa una [pila](/docs/0.3/es/document-definition-object/stack/). Consulta [fuentes](/docs/0.3/es/fonts/) para el registro de variantes y la cobertura de caracteres.
