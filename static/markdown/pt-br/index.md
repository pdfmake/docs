# Visão geral

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/

Crie um PDF em três passos: configure o ambiente, descreva o conteúdo e solicite uma saída.

## 1. Escolha o ambiente




Use Node.js 20 ou superior. Instale a versão fixa abaixo, salve o exemplo completo como `first-pdf.cjs` e execute `node first-pdf.cjs`.

```sh
npm install pdfmake@0.3.13
```

**JavaScript**

```js
const pdfmake = require('pdfmake');

const fonts = require('pdfmake/standard-fonts/Helvetica');
pdfmake.addFonts(fonts);
pdfmake.setUrlAccessPolicy(() => false);
const standardNames = new Set(Object.values(fonts.Helvetica));
pdfmake.setLocalAccessPolicy(name => standardNames.has(name));

async function main() {
  const definition = {
    defaultStyle: { font: 'Helvetica' },
    content: [
      { text: 'Hello, pdfmake!', fontSize: 24, bold: true },
      'Your first PDF, generated in Node.js.'
    ]
  };
  await pdfmake.createPdf(definition).write('document.pdf');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfmake from "pdfmake";

const fonts = require('pdfmake/standard-fonts/Helvetica');
pdfmake.addFonts(fonts);
pdfmake.setUrlAccessPolicy(() => false);
const standardNames = new Set(Object.values(fonts.Helvetica));
pdfmake.setLocalAccessPolicy(name => standardNames.has(name));

async function main() {
  const definition: TDocumentDefinitions = {
    defaultStyle: { font: 'Helvetica' },
    content: [
      { text: 'Hello, pdfmake!', fontSize: 24, bold: true },
      'Your first PDF, generated in Node.js.'
    ]
  };
  await pdfmake.createPdf(definition).write('document.pdf');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
```

[Início rápido com Node.js](/docs/0.3/pt-br/getting-started/server-side/)




O navegador precisa do motor e depois das fontes. O guia completo inclui um botão de download e tratamento de erros.

[Início rápido no navegador](/docs/0.3/pt-br/getting-started/client-side/)



## 2. Entenda a definição

Uma definição é um objeto JavaScript, não HTML. `content` lista os blocos na ordem de leitura. Este exemplo gera exatamente o PDF exibido. Edite-o no playground e volte aqui sem perder seu espaço de trabalho.



### Runnable example: 01 · First document

**JavaScript**

```js
// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd: TDocumentDefinitions = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/pt-br/playground/?example=welcome)



## 3. Escolha o próximo elemento

- [Seu primeiro PDF](/docs/0.3/pt-br/learn/first-pdf/)
- [O modelo de documento](/docs/0.3/pt-br/learn/document-model/)
- [Estilos e formatação](/docs/0.3/pt-br/document-definition-object/styling/)
- [Tabelas](/docs/0.3/pt-br/document-definition-object/tables/)
- [Fontes e caracteres](/docs/0.3/pt-br/fonts/)
- [Reconhecer e tratar erros](/docs/0.3/pt-br/guides/errors/)

Crie uma definição nova a cada geração, pois a composição modifica o objeto. As saídas retornam Promises: aguarde com `await` e trate falhas.
