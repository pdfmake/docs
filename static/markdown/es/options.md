# Opciones de renderizado

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/options/

## Pasar opciones a createPdf

**JavaScript**

```js
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false,
  unbreakableOverflow: 'allowBreak'
});
```

**TypeScript**

```ts
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false,
  unbreakableOverflow: 'allowBreak'
});
```

El objeto de opciones es independiente de la [definición del documento](/docs/0.3/es/document-definition-object/).

| Opción | Tipo | Valor predeterminado | Significado |
| --- | --- | --- | --- |
| `fontLayoutCache` | boolean | `true` | Activa la caché de maquetación de fuentes de PDFKit |
| `bufferPages` | boolean | `false` | Mantiene las páginas de PDFKit en el búfer en lugar de vaciarlo inmediatamente |
| `unbreakableOverflow` | 'allowBreak' / 'error' | `'allowBreak'` | Controlar bloques indivisibles demasiado grandes; consulta la sección siguiente. |

Conserva los valores predeterminados salvo que tu caso de uso requiera un cambio. El almacenamiento de páginas en búfer puede aumentar el uso de memoria. No hace que la maquetación propia de pdfmake sea diferida ni incremental. Consulta [rendimiento](/docs/0.3/es/guides/performance/) y la [documentación de almacenamiento en búfer de páginas de PDFKit](https://pdfkit.org/docs/getting_started.html).

Las fuentes, las distribuciones de tablas con nombre y las políticas de recursos se configuran en la [API pública](/docs/0.3/es/guides/api-reference/). El tamaño de papel, los márgenes y el contenido pertenecen a la definición.

## Desbordamiento de bloques indivisibles {#unbreakable-overflow}

Desde **0.3.15**, `unbreakableOverflow` controla bloques indivisibles demasiado grandes. Ambos modos conservan un bloque que cabe en una página; si solo falta espacio restante, pasa a la siguiente. Se aplica a `unbreakable`, `dontBreakRows`, `keepWithHeaderRows`, extensiones de filas asociadas y cabeceras repetidas.

| Valor | Comportamiento |
| --- | --- |
| `'allowBreak'` | Reintentar con las restricciones de indivisibilidad admitidas relajadas, dividiendo bloques demasiado grandes cuando sea posible. |
| `'error'` | Rechazar la generación si un bloque indivisible no cabe en una página. |
