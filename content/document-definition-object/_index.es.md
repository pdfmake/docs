+++
sourceDigest = "4ba6505e4e79830c1a75f138d92099725eb693602811b878dcbb870190e10ec7"
title = "Referencia de la definición del documento"
description = "Describe el contenido PDF, los estilos, las páginas y los metadatos con el objeto declarativo de definición de documento de pdfmake 0.3."
weight = 20
+++

## Estructura de una definición

```js
const docDefinition = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [40, 50, 40, 50],
  defaultStyle: { fontSize: 12 },
  styles: { heading: { fontSize: 20, bold: true } },
  info: { title: 'Example document', author: 'Example author' },
  content: [
    { text: 'Document heading', style: 'heading' },
    'A plain string becomes a paragraph.',
    { ul: ['First item', 'Second item'] }
  ]
};
```

Pasa la definición al método `createPdf` del entorno de ejecución después de configurar las fuentes. Todas las dimensiones numéricas usan **puntos** (72 puntos por pulgada). Los márgenes siguen el orden **izquierda, arriba, derecha, abajo**. La matriz `content` forma una pila vertical. Crea un objeto nuevo para cada renderizado; el proceso de maquetación añade medidas y posiciones internas.

## Nodos de contenido

| Nodo | Propósito | Referencia |
| --- | --- | --- |
| `{ text: '...' }` | Párrafo o segmentos en línea | [Estilos](/docs/0.3/es/document-definition-object/styling/) |
| `{ stack: [...] }` | Agrupa bloques y aplica un estilo compartido | [Pilas](/docs/0.3/es/document-definition-object/stack/) |
| `{ columns: [...] }` | Contenido en paralelo | [Columnas](/docs/0.3/es/document-definition-object/columns/) |
| `{ table: { body: [...] } }` | Filas, celdas y encabezados repetidos | [Tablas](/docs/0.3/es/document-definition-object/tables/) |
| `{ ul: [...] }`, `{ ol: [...] }` | Listas con viñetas y numeradas | [Listas](/docs/0.3/es/document-definition-object/lists/) |
| `{ image: 'key' }` | PNG o JPEG | [Imágenes](/docs/0.3/es/document-definition-object/images/) |
| `{ svg: '<svg>...</svg>' }` | Contenido vectorial SVG | [SVG](/docs/0.3/es/document-definition-object/svgs/) |
| `{ qr: '...' }` | Código QR | [QR](/docs/0.3/es/document-definition-object/qr/) |

## Configuración del documento

- [Tamaño, orientación y saltos de página](/docs/0.3/es/document-definition-object/page/), [márgenes](/docs/0.3/es/document-definition-object/margins/) y [secciones](/docs/0.3/es/document-definition-object/sections/).
- [Encabezados y pies de página](/docs/0.3/es/document-definition-object/headers-footers/), [fondos](/docs/0.3/es/document-definition-object/background-layer/) y [marcas de agua](/docs/0.3/es/document-definition-object/watermark/).
- [Metadatos](/docs/0.3/es/document-definition-object/document-medatadata/), [enlaces](/docs/0.3/es/document-definition-object/links/), [índices](/docs/0.3/es/document-definition-object/toc/) y [esquemas](/docs/0.3/es/document-definition-object/outlines/).
- [Archivos adjuntos](/docs/0.3/es/document-definition-object/attachments/), [cifrado](/docs/0.3/es/document-definition-object/security/), [PDF/A](/docs/0.3/es/document-definition-object/pdfa/) y [compresión](/docs/0.3/es/document-definition-object/compression/).

## Definición y opciones de renderizado

El contenido y la configuración visual pertenecen a la definición. `fontLayoutCache` y `bufferPages` pertenecen al segundo argumento de `createPdf`. Las fuentes, los registros de distribuciones de tablas y las políticas de recursos se configuran en la API de pdfmake. Consulta la [referencia de la API](/docs/0.3/es/guides/api-reference/).
