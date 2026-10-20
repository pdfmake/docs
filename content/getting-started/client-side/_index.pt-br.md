+++
title = "Início rápido no navegador"
description = "Carregue o pdfmake 0.3 e seu bundle de fontes e, em seguida, baixe um PDF em resposta a uma ação do usuário."
weight = 11
sourceDigest = "01745b0861d3d7c78def82206112d36936e7fb0d4c4486fbdd53bc321fbb1530"
+++

## Instale e copie os assets do navegador

```sh
npm install pdfmake@0.3.12
```

Copie `node_modules/pdfmake/build/pdfmake.min.js` e `node_modules/pdfmake/build/vfs_fonts.js` para junto deste arquivo HTML. Sirva o diretório usando seu servidor local de desenvolvimento.

## Gere um PDF

```html
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>My first PDF</title></head>
<body>
  <button id="download" type="button">Download PDF</button>
  <p id="status" role="status"></p>
  <script src="./pdfmake.min.js"></script>
  <script src="./vfs_fonts.js"></script>
  <script>
    document.querySelector('#download').addEventListener('click', async () => {
      try {
        await pdfMake.createPdf({ content: ['Hello from the browser!'] }).download('hello.pdf');
        document.querySelector('#status').textContent = 'PDF prepared';
      } catch (error) {
        document.querySelector('#status').textContent = 'PDF generation failed';
        console.error(error);
      }
    });
  </script>
</body>
</html>
```

Carregue o mecanismo **antes** do bundle de fontes. `vfs_fonts.js` fornece os arquivos da fonte Roboto padrão. Este exemplo não exige uma API de renderização no servidor. A resolução de `download()` significa que o download foi iniciado; ela não confirma que o usuário salvou o arquivo.

## Use um bundler

```js
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.addVirtualFileSystem(pdfFonts);
await pdfMake.createPdf({ content: ['Bundled application'] }).download('document.pdf');
```

Este código é executado dentro do módulo da aplicação ou de um manipulador de eventos assíncrono. Ao usar frameworks com SSR, mantenha as importações fora da execução exclusiva do servidor. No TypeScript, use declarações compatíveis com a versão instalada do pdfmake; os tipos não fazem uma versão antiga do runtime aceitar a API 0.3.

## Abra e imprima

Chame `open()` ou `print()` a partir de uma ação do usuário para evitar bloqueios de pop-up. Se primeiro buscar dados, abra uma janela de forma síncrona e passe-a ao método de saída depois. Consulte os [métodos do navegador](/docs/0.3/pt-br/getting-started/client-side/methods/).

## Próximas etapas

[Fontes personalizadas](/docs/0.3/pt-br/fonts/custom-fonts-client-side/) · [Métodos do navegador](/docs/0.3/pt-br/getting-started/client-side/methods/) · [Solução de problemas](/docs/0.3/pt-br/guides/troubleshooting/)
