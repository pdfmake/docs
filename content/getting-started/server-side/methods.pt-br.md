+++
title = "Métodos de saída no Node.js"
description = "Referência de createPdf, Buffer, base64, gravação de arquivos, streams e políticas de acesso a recursos no pdfmake 0.3."
weight = 12
sourceDigest = "f0daec88513f195e653aeface6a0c5a92da517ba092a13919c74940aa3169a09"
+++

## Crie um documento

```js
const output = pdfmake.createPdf(docDefinition, options);
```

`docDefinition` é uma [definição de documento](/docs/0.3/pt-br/document-definition-object/). `options` é um [objeto de opções](/docs/0.3/pt-br/options/) opcional. `createPdf` retorna imediatamente um wrapper de saída; erros de geração rejeitam a Promise do método de saída. Tipos de argumentos inválidos podem lançar uma exceção síncrona.

## Métodos de saída

| Método | Valor resolvido | Uso |
| --- | --- | --- |
| `write(filename)` | `undefined` | Grava um arquivo e aguarda seu fechamento |
| `getBuffer()` | `Buffer` | Retorna bytes do PDF para uma API |
| `getBase64()` | `string` | Codifica os bytes em base64 |
| `getDataUrl()` | `string` | Prefixa base64 com `data:application/pdf;base64,` |
| `getStream()` | Stream de documento PDFKit | Gerencia diretamente um stream |

```js
try {
  const output = pdfmake.createPdf(docDefinition);
  const bytes = await output.getBuffer();
  // Send or store bytes here.
} catch (error) {
  // Report generation failure to your caller.
}
```

`getBuffer()` armazena sua Promise em cache; `getBase64()` e `getDataUrl()` reutilizam esses bytes. Crie um novo wrapper de saída para uma renderização independente. Não combine o consumo manual do stream com métodos de buffer ou gravação de arquivo no mesmo wrapper.

## Consuma um stream

```js
const stream = await pdfmake.createPdf(docDefinition).getStream();
stream.on('error', error => { /* Handle generation errors. */ });
destination.on('error', error => { /* Handle destination errors. */ });
stream.pipe(destination);
stream.end();
```

`destination` precisa ser um stream gravável gerenciado pela aplicação. Adicione os listeners antes de chamar `end()`. Para gravar um arquivo simples, prefira `write()`. A saída por stream não torna o layout incremental: o pdfmake ainda organiza o documento antes de retornar esse stream.

## Política de acesso a URLs

Disponível desde a versão **0.3.6**. Configure-a antes de criar documentos:

```js
pdfmake.setUrlAccessPolicy(url => {
  const parsed = new URL(url);
  return parsed.protocol === 'https:' && parsed.hostname === 'assets.example.com';
});
```

A função de callback deve retornar o booleano `true` **sincronamente** para permitir uma URL. Uma função `async` retorna uma Promise e é rejeitada pela implementação atual. Uma lista de permissões é apenas uma camada de proteção contra SSRF; use controles de rede ou forneça bytes validados ao processar entradas não confiáveis. Consulte [segurança de recursos](/docs/0.3/pt-br/guides/resource-security/).

## Política de acesso a arquivos locais

Disponível desde a versão **0.3.8**. Se todos os recursos estiverem incorporados, bloqueie arquivos locais:

```js
pdfmake.setLocalAccessPolicy(() => false);
```

Para fontes ou imagens locais, permita os caminhos resolvidos exatos em vez de um prefixo de texto. Consulte a [configuração completa de fontes locais](/docs/0.3/pt-br/fonts/). `undefined` remove uma política configurada; uma política omitida não bloqueia tudo.
