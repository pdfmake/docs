# Columnas en flujo serpenteante

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/document-definition-object/snaking-columns/

> **Note:** Versión mínima: **0.3.5**


Las columnas en flujo serpenteante (o columnas de estilo periódico) son un modo de disposición en que el contenido fluye verticalmente por la primera columna y continúa en la parte superior de la columna siguiente, alternando la dirección cuando hace falta. En vez de volver siempre al principio de cada fila de columnas, la disposición serpentea de forma continua por las columnas disponibles, en orden de lectura.

Cuando `snakingColumns: true` está activado, solo la **primera columna** debe contener contenido. Las columnas siguientes actúan como espacios vacíos para el desbordamiento.

**JavaScript**

```js
var myLongContent = 'A paragraph flowing through snaking columns. '.repeat(120);
var docDefinition = {
    content: [
        {
            columns: [
                {text: myLongContent, width: '*'},  // Content goes here
                {text: '', width: '*'},             // Empty overflow target
                {text: '', width: '*'}              // Empty overflow target
            ],
            snakingColumns: true
        }
    ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var myLongContent = 'A paragraph flowing through snaking columns. '.repeat(120);
var docDefinition: TDocumentDefinitions = {
    content: [
        {
            columns: [
                {text: myLongContent, width: '*'},  // Content goes here
                {text: '', width: '*'},             // Empty overflow target
                {text: '', width: '*'}              // Empty overflow target
            ],
            snakingColumns: true
        }
    ]
};
```

No se admite anidar directamente una «columna serpenteante» dentro de otra (una disposición serpenteante recursiva).

**Recomendación:**
- Evita anidar profundamente columnas serpenteantes dentro de otras columnas serpenteantes.
- Las columnas estándar (no serpenteantes) se pueden anidar dentro de columnas serpenteantes.
- Las columnas serpenteantes se pueden anidar dentro de columnas estándar.
