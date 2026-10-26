# Primeiros passos

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/getting-started/

## Escolha o ambiente de execuÃ§Ã£o

- [Node.js](/docs/0.3/pt-br/getting-started/server-side/): grave um arquivo, retorne um Buffer de uma API ou consuma um stream.
- [Navegador](/docs/0.3/pt-br/getting-started/client-side/): baixe, abra, imprima ou obtenha um Blob.

Os dois ambientes usam a mesma [definiÃ§Ã£o de documento](/docs/0.3/pt-br/document-definition-object/). Os mÃ©todos de saÃ­da retornam Promises. O carregamento de fontes Ã© diferente entre arquivos no Node.js e contÃªineres de fontes no navegador.

## Antes de comeÃ§ar

Consulte a documentaÃ§Ã£o da versÃ£o instalada (`npm ls pdfmake`). Comece com um exemplo mÃ­nimo antes de adicionar fontes personalizadas, imagens remotas ou layouts de tabela. Em aplicaÃ§Ãµes 0.1/0.2, siga o [guia de migraÃ§Ã£o](/docs/0.3/pt-br/migration-from-0.1/).

## JavaScript e TypeScript

Esta branch de desenvolvimento inclui declarações TypeScript próprias na biblioteca e separa as APIs do Node e do navegador. Para o pacote gerado localmente, instale TypeScript sem `@types/pdfmake`. O pacote npm publicado 0.3.13 ainda exige os tipos comunitários correspondentes; as declarações nativas e a validação prévia descritas aqui ainda não foram publicadas. O compilador verificado é TypeScript 5.9.3.

```sh
npm install pdfmake@0.3.13
npm install --save-dev typescript@~5.9.3
```

Node.js: salve este exemplo como `document.mts`. `NodeNext` permite ao compilador seguir a resoluÃ§Ã£o real do Node. Um arquivo CommonJS `.cts` pode comeÃ§ar com `import pdfmake = require("pdfmake")`. Evite depender de imports nomeados em tempo de execuÃ§Ã£o.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true
  }
}
```

**JavaScript**

```js
import pdfmake from 'pdfmake';
import { strict as assert } from 'node:assert';
pdfmake.addFonts({ Helvetica: { normal: 'Helvetica', bold: 'Helvetica-Bold', italics: 'Helvetica-Oblique', bolditalics: 'Helvetica-BoldOblique' } });
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(name => name.startsWith('Helvetica'));
const definition = { content: [{ table: { body: [['ESM', 'TypeScript'], ['Promise', 'Output']] } }], defaultStyle: { font: 'Helvetica' } };
const buffer = await pdfmake.createPdf(definition).getBuffer();
assert.equal(buffer.subarray(0, 5).toString(), '%PDF-');
```

**TypeScript**

```ts
import pdfmake from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces.js';
import { strict as assert } from 'node:assert';

pdfmake.addFonts({ Helvetica: { normal: 'Helvetica', bold: 'Helvetica-Bold', italics: 'Helvetica-Oblique', bolditalics: 'Helvetica-BoldOblique' } });
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(name => name.startsWith('Helvetica'));
const definition: TDocumentDefinitions = { content: [{ table: { body: [['ESM', 'TypeScript'], ['Promise', 'Output']] } }], defaultStyle: { font: 'Helvetica' } };
const buffer: Buffer = await pdfmake.createPdf(definition).getBuffer();
assert.equal(buffer.subarray(0, 5).toString(), '%PDF-');
```

Com um bundler para navegador, importe a entrada prÃ©-compilada e registre o VFS diretamente. Use `module: "ESNext"` e `moduleResolution: "Bundler"`; essas opÃ§Ãµes exigem um bundler e nÃ£o servem para executar a saÃ­da diretamente no Node.

**JavaScript**

```js
import pdfmake from 'pdfmake/build/pdfmake.js';
import vfs from 'pdfmake/build/vfs_fonts.js';
pdfmake.addVirtualFileSystem(vfs);
const definition = { content: [{ text: 'TypeScript browser bundler', bold: true }] };
export async function render() {
    return pdfmake.createPdf(definition).getBlob();
}
```

**TypeScript**

```ts
import pdfmake from 'pdfmake/build/pdfmake.js';
import vfs from 'pdfmake/build/vfs_fonts.js';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

pdfmake.addVirtualFileSystem(vfs);
const definition = { content: [{ text: 'TypeScript browser bundler', bold: true }] } satisfies TDocumentDefinitions;
export async function render(): Promise<Blob> {
  return pdfmake.createPdf(definition).getBlob();
}
```

Os tipos oferecem preenchimento automático e verificações na compilação. Eles não validam JSON externo nem garantem o layout. As declarações incluídas distinguem `write` no Node de `getBlob`, `download`, `open` e `print` no navegador. Use imports explícitos do navegador com bundlers. O playground e os exemplos integrados verificam TypeScript localmente antes da renderização. Consulte a [validação de documentos](/docs/0.3/pt-br/guides/errors/) para verificações em tempo de execução.
