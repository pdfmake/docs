+++
sourceDigest = "fa3eacf7dfb3dc985a1eb6cf541fdccb9dae9648d423d3d758d78b70eabb4882"
title = "Opciones de renderizado"
description = "Configura la caché de maquetación de fuentes y el almacenamiento en búfer de páginas de PDFKit mediante el segundo argumento de createPdf."
weight = 30
+++

## Pasar opciones a createPdf

```js
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false
});
```

El objeto de opciones es independiente de la [definición del documento](/docs/0.3/es/document-definition-object/).

| Opción | Tipo | Valor predeterminado | Significado |
| --- | --- | --- | --- |
| `fontLayoutCache` | boolean | `true` | Activa la caché de maquetación de fuentes de PDFKit |
| `bufferPages` | boolean | `false` | Mantiene las páginas de PDFKit en el búfer en lugar de vaciarlo inmediatamente |

Conserva los valores predeterminados salvo que tu caso de uso requiera un cambio. El almacenamiento de páginas en búfer puede aumentar el uso de memoria. No hace que la maquetación propia de pdfmake sea diferida ni incremental. Consulta [rendimiento](/docs/0.3/es/guides/performance/) y la [documentación de almacenamiento en búfer de páginas de PDFKit](https://pdfkit.org/docs/getting_started.html).

Las fuentes, las distribuciones de tablas con nombre y las políticas de recursos se configuran en la [API pública](/docs/0.3/es/guides/api-reference/). El tamaño de papel, los márgenes y el contenido pertenecen a la definición.
