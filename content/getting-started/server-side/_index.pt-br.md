+++
title = "Início rápido no Node.js"
description = "Crie um arquivo PDF completo no Node.js com pdfmake 0.3, fontes padrão e saída baseada em Promises."
weight = 12
sourceDigest = "a943d71f035716932810834880e3bf5c02cde041ecc0cf438373b27e0c62157d"
+++

## Instale

Use Node.js **20 ou posterior**. Crie uma aplicação e instale o pdfmake:

```sh
npm init -y
npm install pdfmake@0.3.13
```

A versão exata torna o exemplo reproduzível. Consulte as notas de versão e teste antes de escolher uma atualização.

## Gere seu primeiro PDF

Salve este exemplo completo como `first-pdf.cjs` e execute `node first-pdf.cjs`.

```js
// docs-test: node-quickstart
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

`write()` resolve quando o arquivo de saída é fechado. Trate Promises rejeitadas para que uma falha na geração não produza silenciosamente uma resposta de API bem-sucedida.

O Helvetica não precisa de arquivos de fonte locais, então o exemplo bloqueia URLs externas e permite, pela política local, apenas os identificadores das fontes padrão. A implementação atual verifica esses identificadores mesmo que eles não sejam caminhos de arquivo. As fontes padrão têm cobertura limitada de caracteres. Para documentos multilíngues, [registre arquivos de fonte adequados](/docs/0.3/pt-br/fonts/) e permita explicitamente os caminhos resolvidos.

## Retorne bytes de PDF por uma API

```js
const buffer = await pdfmake.createPdf({
  defaultStyle: { font: 'Helvetica' },
  content: ['API document']
}).getBuffer();

// Adapt these lines to your HTTP framework:
response.setHeader('Content-Type', 'application/pdf');
response.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
response.end(buffer);
```

Este trecho pressupõe que `pdfmake` foi configurado como acima e que `response` é o objeto de resposta do seu framework. Valide os dados da requisição antes de criar a definição. Crie uma definição nova para cada requisição; o layout a altera.

## Aplicações ESM

O pacote Node.js exporta um singleton configurado. Em uma aplicação ESM, use `import pdfmake from 'pdfmake'`; não o instancie com `new PdfPrinter(...)` como nos exemplos antigos. Registre fontes e políticas uma vez na inicialização da aplicação. Evite mudar a configuração do singleton por requisição concorrente.

## Próximas etapas

[Métodos de saída](/docs/0.3/pt-br/getting-started/server-side/methods/) · [Acesso a recursos](/docs/0.3/pt-br/guides/resource-security/) · [Receita para faturas](/docs/0.3/pt-br/guides/invoice/)
