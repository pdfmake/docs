# PDF/A

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/pdfa/

PDF/A é um formato especializado para arquivamento e preservação de longo prazo de documentos eletrônicos.

É necessária a versão 1.4 ou superior do PDF.

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

Versões de PDF compatíveis (propriedade `version`):
- `1.3` - versão PDF 1.3 (padrão), **não compatível com PDF/A**
- `1.4` - versão PDF 1.4
- `1.5` - versão PDF 1.5
- `1.6` - versão PDF 1.6
- `1.7` - versão PDF 1.7
- `1.7ext3` - extensão nível 3 da versão PDF 1.7

Subconjunto do documento (propriedade `subset`):
- `PDF/A-1` (atalho para PDF/A-1b)
- `PDF/A-1a`
- `PDF/A-1b`
- `PDF/A-2` (atalho para PDF/A-2b)
- `PDF/A-2a`
- `PDF/A-2b`
- `PDF/A-3` (atalho para PDF/A-3b)
- `PDF/A-3a`
- `PDF/A-3b`
- `PDF/UA`

Marque o documento como PDF marcado (propriedade `tagged`):
- `true` - ativado
- `false` - desativado

Exibição do título do documento na barra de título da janela (propriedade `displayTitle`):
- `true` - ativada
- `false` - desativada
