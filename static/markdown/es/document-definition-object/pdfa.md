# PDF/A

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/document-definition-object/pdfa/

PDF/A está especializado en el archivado y la conservación a largo plazo de documentos electrónicos.

Se requiere la versión 1.4 de PDF o posterior.

**JavaScript**

```js
var docDefinition = {
    version: '1.5',
    subset: 'PDF/A-3a',
    tagged: true,
    displayTitle: true,
    info: {
        title: 'Awesome PDF document from pdfmake'
    },
    content: [
        'PDF/A document for archive'
    ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
    version: '1.5',
    subset: 'PDF/A-3a',
    tagged: true,
    displayTitle: true,
    info: {
        title: 'Awesome PDF document from pdfmake'
    },
    content: [
        'PDF/A document for archive'
    ]
};
```

Versiones PDF compatibles (propiedad `version`):
- `1.3`: PDF 1.3 (predeterminada), **no compatible con PDF/A**
- `1.4`: PDF 1.4
- `1.5`: PDF 1.5
- `1.6`: PDF 1.6
- `1.7`: PDF 1.7
- `1.7ext3`: PDF 1.7 ExtensionLevel 3

Subconjunto del documento (propiedad `subset`):
- `PDF/A-1` (atajo de PDF/A-1b)
- `PDF/A-1a`
- `PDF/A-1b`
- `PDF/A-2` (atajo de PDF/A-2b)
- `PDF/A-2a`
- `PDF/A-2b`
- `PDF/A-3` (atajo de PDF/A-3b)
- `PDF/A-3a`
- `PDF/A-3b`
- `PDF/UA`

Marcar el documento como PDF etiquetado (propiedad `tagged`):
- `true`: activar
- `false`: desactivar

Mostrar el título del documento en el título de la ventana (propiedad `displayTitle`):
- `true`: activar
- `false`: desactivar
