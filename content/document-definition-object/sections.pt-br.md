+++
title = "Seções do documento"
description = "Divida o documento em seções com configurações próprias de página, cabeçalho, rodapé e fundo."
weight = 2090
alwaysopen = true
sourceDigest = "6dc77fa5678a9e679efdf6b4bff537f029525cefa55e1030486444fce88c0ea8"
+++

As seções do documento permitem dividi-lo em várias partes, cada uma com suas próprias configurações de página.

Cada seção oferece suporte a:
- tamanho e orientação de página personalizados
- margens de página personalizadas
- cabeçalho e rodapé personalizados
- marca-d'água personalizada
- plano de fundo personalizado

Definição com todas as propriedades:
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

Na seção seguinte, as propriedades podem ser herdadas da seção anterior:
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

O exemplo completo está disponível em [examples/section.js](https://github.com/bpampuch/pdfmake/blob/master/examples/sections.js).
