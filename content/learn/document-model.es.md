+++
sourceDigest = "7e8645b7aacec49012239058169490a59be9441a27c94823fc6aa528cef81064"
title = "El modelo de documento"
description = "Elige entre párrafos, texto en línea, pilas, columnas y tablas, y descubre dónde corresponde cada configuración."
weight = 2
+++

## Empezar por el contenido

`content` describe el cuerpo del PDF. Una cadena sencilla es un párrafo. Una matriz de contenido es una secuencia vertical de bloques. Un objeto describe un nodo con propiedades adicionales. pdfmake calcula las posiciones; por lo general, no hace falta especificar coordenadas.

```js
const dd = {
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

{{< example id="columns" >}}

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
