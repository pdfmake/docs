# Primeiros passos

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/getting-started/

## Escolha o ambiente de execução

- [Node.js](/docs/0.3/pt-br/getting-started/server-side/): grave um arquivo, retorne um Buffer de uma API ou consuma um stream.
- [Navegador](/docs/0.3/pt-br/getting-started/client-side/): baixe, abra, imprima ou obtenha um Blob.

Os dois ambientes usam a mesma [definição de documento](/docs/0.3/pt-br/document-definition-object/). Os métodos de saída retornam Promises. O carregamento de fontes é diferente entre arquivos no Node.js e contêineres de fontes no navegador.

## Antes de começar

Consulte a documentação da versão instalada (`npm ls pdfmake`). Comece com um exemplo mínimo antes de adicionar fontes personalizadas, imagens remotas ou layouts de tabela. Em aplicações 0.1/0.2, siga o [guia de migração](/docs/0.3/pt-br/migration-from-0.1/).

## JavaScript e TypeScript

Esta branch de desenvolvimento inclui declara��es TypeScript pr�prias na biblioteca e separa as APIs do Node e do navegador. Para o pacote gerado localmente, instale TypeScript sem `@types/pdfmake`. O pacote npm publicado 0.3.12 ainda exige os tipos comunit�rios correspondentes; as declara��es nativas e a valida��o pr�via descritas aqui ainda n�o foram publicadas. O compilador verificado � TypeScript 5.9.3.

```sh
npm install pdfmake@0.3.12
npm install --save-dev typescript@~5.9.3
```

Node.js: salve este exemplo como `document.mts`. `NodeNext` permite ao compilador seguir a resolução real do Node. Um arquivo CommonJS `.cts` pode começar com `import pdfmake = require("pdfmake")`. Evite depender de imports nomeados em tempo de execução.

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

Com um bundler para navegador, importe a entrada pré-compilada e registre o VFS diretamente. Use `module: "ESNext"` e `moduleResolution: "Bundler"`; essas opções exigem um bundler e não servem para executar a saída diretamente no Node.

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

Os tipos oferecem preenchimento autom�tico e verifica��es na compila��o. Eles n�o validam JSON externo nem garantem o layout. As declara��es inclu�das distinguem `write` no Node de `getBlob`, `download`, `open` e `print` no navegador. Use imports expl�citos do navegador com bundlers. O playground e os exemplos integrados verificam TypeScript localmente antes da renderiza��o. Consulte a [valida��o de documentos](/docs/0.3/pt-br/guides/errors/) para verifica��es em tempo de execu��o.
