+++
title = "Visão geral"
description = "Crie PDFs com pdfmake 0.3: guias passo a passo, exemplos executáveis e referência para aplicações JavaScript."
weight = 0
sourceDigest = "3be141146a4c948512e50597ef37f878749e249c98a65a0af17c20b1e7cc62b3"
+++

Crie um PDF em três passos: configure o ambiente, descreva o conteúdo e solicite uma saída.

## 1. Escolha o ambiente

<div class="runtime-picker" data-runtime-picker role="tablist" aria-label="Ambiente de execução"><button type="button" role="tab" id="runtime-node" aria-controls="panel-node" data-runtime="node" aria-selected="true">Node.js / API</button><button type="button" role="tab" id="runtime-browser" aria-controls="panel-browser" data-runtime="browser" aria-selected="false">Navegador</button></div>
<div data-runtime-panel="node" role="tabpanel" id="panel-node" aria-labelledby="runtime-node">

Use Node.js 20 ou superior. Instale a versão fixa abaixo, salve o exemplo completo como `first-pdf.cjs` e execute `node first-pdf.cjs`.

```sh
npm install pdfmake@0.3.13
```

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

[Início rápido com Node.js](/docs/0.3/pt-br/getting-started/server-side/)

</div>
<div data-runtime-panel="browser" role="tabpanel" id="panel-browser" aria-labelledby="runtime-browser">

O navegador precisa do motor e depois das fontes. O guia completo inclui um botão de download e tratamento de erros.

[Início rápido no navegador](/docs/0.3/pt-br/getting-started/client-side/)

</div>

## 2. Entenda a definição

Uma definição é um objeto JavaScript, não HTML. `content` lista os blocos na ordem de leitura. Este exemplo gera exatamente o PDF exibido. Edite-o no playground e volte aqui sem perder seu espaço de trabalho.

{{< example id="welcome" >}}

## 3. Escolha o próximo elemento

- [Seu primeiro PDF](/docs/0.3/pt-br/learn/first-pdf/)
- [O modelo de documento](/docs/0.3/pt-br/learn/document-model/)
- [Estilos e formatação](/docs/0.3/pt-br/document-definition-object/styling/)
- [Tabelas](/docs/0.3/pt-br/document-definition-object/tables/)
- [Fontes e caracteres](/docs/0.3/pt-br/fonts/)
- [Reconhecer e tratar erros](/docs/0.3/pt-br/guides/errors/)

Crie uma definição nova a cada geração, pois a composição modifica o objeto. As saídas retornam Promises: aguarde com `await` e trate falhas.
