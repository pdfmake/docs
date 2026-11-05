+++
sourceDigest = "6dc77fa5678a9e679efdf6b4bff537f029525cefa55e1030486444fce88c0ea8"
title = "Secciones del documento"
description = "Configura secciones de documentos en pdfmake 0.3 con ejemplos, opciones y notas de uso."
weight = 2090
alwaysopen = true
+++

Las secciones del documento permiten dividirlo en varias partes, cada una con su propia configuración de página.

Cada sección admite:
- tamaño y orientación de página personalizados
- márgenes de página personalizados
- encabezado y pie de página personalizados
- marca de agua personalizada
- fondo personalizado

Definición con todas las propiedades:
```js
var docDefinition = {
    content: [
        {
            header: function (currentPage, pageCount) {
                return currentPage.toString() + ' of ' + pageCount;
            },
            footer: function (currentPage, pageCount) {
                return currentPage.toString() + ' of ' + pageCount;
            },
            background: function () {
                return {text: 'background', alignment: 'right'};
            },
            watermark: 'watermark',
            pageSize: 'A4',
            pageOrientation: 'landscape',
            pageMargins: 5,
            section: [
                'Text in section.'
            ]
        }
    ]
}
```

En la sección siguiente, las propiedades se pueden heredar de la sección anterior:
```js
var docDefinition = {
    content: [
        {
            header: 'inherit',
            footer: 'inherit',
            background: 'inherit',
            watermark: 'inherit',
            pageSize: 'inherit',
            pageOrientation: 'inherit',
            pageMargins: 'inherit',
            section: [
                'Text in section.'
            ]
        }
    ]
}
```

Hay un ejemplo completo en [examples/section.js](https://github.com/bpampuch/pdfmake/blob/master/examples/sections.js).
