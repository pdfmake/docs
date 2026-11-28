# Seções do documento

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/sections/

As seções do documento permitem dividi-lo em várias partes, cada uma com suas próprias configurações de página.

Cada seção oferece suporte a:
- tamanho e orientação de página personalizados
- margens de página personalizadas
- cabeçalho e rodapé personalizados
- marca-d'água personalizada
- plano de fundo personalizado

Definição com todas as propriedades:
**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
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
**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
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
