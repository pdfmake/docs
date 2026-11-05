# Métodos de saída no Node.js

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/getting-started/server-side/methods/

## Crie um documento

**JavaScript**

```js
const output = pdfmake.createPdf(docDefinition, options);
```

**TypeScript**

```ts
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

**JavaScript**

```js
try {
  const output = pdfmake.createPdf(docDefinition);
  const bytes = await output.getBuffer();
  // Send or store bytes here.
} catch (error) {
  // Report generation failure to your caller.
}
```

**TypeScript**

```ts
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

**JavaScript**

```js
const stream = await pdfmake.createPdf(docDefinition).getStream();
stream.on('error', error => { /* Handle generation errors. */ });
destination.on('error', error => { /* Handle destination errors. */ });
stream.pipe(destination);
stream.end();
```

**TypeScript**

```ts
const stream = await pdfmake.createPdf(docDefinition).getStream();
stream.on('error', error => { /* Handle generation errors. */ });
destination.on('error', error => { /* Handle destination errors. */ });
stream.pipe(destination);
stream.end();
```

`destination` precisa ser um stream gravável gerenciado pela aplicação. Adicione os listeners antes de chamar `end()`. Para gravar um arquivo simples, prefira `write()`. A saída por stream não torna o layout incremental: o pdfmake ainda organiza o documento antes de retornar esse stream.

## Política de acesso a URLs {#url-access-policy}

Disponível desde a versão **0.3.6**. Configure-a antes de criar documentos:

**JavaScript**

```js
pdfmake.setUrlAccessPolicy(url => {
  const parsed = new URL(url);
  return parsed.protocol === 'https:' && parsed.hostname === 'assets.example.com';
});
```

**TypeScript**

```ts
pdfmake.setUrlAccessPolicy(url => {
  const parsed = new URL(url);
  return parsed.protocol === 'https:' && parsed.hostname === 'assets.example.com';
});
```

A função de callback deve retornar o booleano `true` **sincronamente** para permitir uma URL. Uma função `async` retorna uma Promise e é rejeitada pela implementação atual. Uma lista de permissões é apenas uma camada de proteção contra SSRF; use controles de rede ou forneça bytes validados ao processar entradas não confiáveis. Consulte [segurança de recursos](/docs/0.3/pt-br/guides/resource-security/).

## Política de acesso a arquivos locais

Disponível desde a versão **0.3.8**. Se todos os recursos estiverem incorporados, bloqueie arquivos locais:

**JavaScript**

```js
pdfmake.setLocalAccessPolicy(() => false);
```

**TypeScript**

```ts
pdfmake.setLocalAccessPolicy(() => false);
```

Para fontes ou imagens locais, permita os caminhos resolvidos exatos em vez de um prefixo de texto. Consulte a [configuração completa de fontes locais](/docs/0.3/pt-br/fonts/). `undefined` remove uma política configurada; uma política omitida não bloqueia tudo.

## Cache de recursos URL {#url-resource-caching}

Disponível na versão de desenvolvimento original para **0.3.14**; ausente do mecanismo 0.3.13 fixado no playground.

Use `setUrlResourceCaching(enabled)` com um booleano obrigatório para compartilhar novos downloads URL entre documentos. O padrão é `false`. Um objeto de recurso `{ url, headers, cache }` substitui essa configuração; `headers` é opcional. Isso se aplica a fontes, imagens, origens de anexos e arquivos incorporados. `false` afeta gerações posteriores, preserva entradas existentes e não substitui um `cache: true` explícito. Antes de 0.3.14, os downloads eram compartilhados automaticamente; `true` restaura esse comportamento.

**JavaScript**

```js
pdfmake.setUrlResourceCaching(true);

var docDefinition = {
  content: [{ image: 'logo' }, { image: 'photo' }],
  images: {
    // Uses the global caching setting.
    logo: 'https://example.com/logo.png',
    photo: {
      url: 'https://example.com/photo.png',
      headers: { Authorization: 'Bearer token' },
      // Store a new download only for this document.
      cache: false
    }
  }
};

pdfmake.createPdf(docDefinition).write('document.pdf');
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

pdfmake.setUrlResourceCaching(true);

var docDefinition: TDocumentDefinitions = {
  content: [{ image: 'logo' }, { image: 'photo' }],
  images: {
    // Uses the global caching setting.
    logo: 'https://example.com/logo.png',
    photo: {
      url: 'https://example.com/photo.png',
      headers: { Authorization: 'Bearer token' },
      // Store a new download only for this document.
      cache: false
    }
  }
};

pdfmake.createPdf(docDefinition).write('document.pdf');
```

Novos downloads são armazenados por documento por padrão. `cache: true` armazena novos dados no cache compartilhado em memória para documentos posteriores; `cache: false` ainda permite ler uma entrada compartilhada existente. URLs de texto e objetos sem `cache` usam a configuração global. O cache HTTP do navegador é independente.

A chave dos recursos compartilhados é apenas a URL, mesmo quando `Authorization` ou outros cabeçalhos diferem. Uma leitura do cache não contata o servidor de origem nem verifica novamente a autorização nele. Evite compartilhar recursos cujo conteúdo ou autorização dependa de cabeçalhos. A [política de acesso a URLs](#url-access-policy) se aplica a downloads de rede, não a leituras do cache.

## Limpar o cache de recursos URL {#clear-url-resource-cache}

Disponível na versão de desenvolvimento original para **0.3.14**; ausente do mecanismo 0.3.13 fixado no playground.

`clearUrlResourceCache()` não recebe parâmetros e remove de forma síncrona entradas compartilhadas que começam com `http://` ou `https://`, sem distinguir maiúsculas. Preserva outros arquivos VFS, recursos por documento e a configuração global do cache. Chame entre gerações, após o término das operações ativas; não cancela downloads em andamento nem limpa o cache HTTP do navegador.

**JavaScript**

```js
pdfmake.clearUrlResourceCache();
pdfmake.createPdf(docDefinition).write('document.pdf');
```

**TypeScript**

```ts
pdfmake.clearUrlResourceCache();
pdfmake.createPdf(docDefinition).write('document.pdf');
```
