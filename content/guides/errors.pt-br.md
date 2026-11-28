+++
title = "Erros e diagnÃ³sticos"
description = "Encontre erros de sintaxe JavaScript, nÃ³s de documento malformados, falhas de recursos e interrupÃ§Ãµes de saÃ­da com diagnÃ³sticos Ãºteis."
weight = 2
sourceDigest = "ff68daa138b7259216d53546c431739a03360e22b4e9749840a4eba20c38c633"
+++

## Primeiro, identifique a etapa que falhou

Uma definiÃ§Ã£o invÃ¡lida deve falhar em vez de omitir conteÃºdo silenciosamente. A pergunta Ãºtil Ã© em que etapa ocorreu a falha e como esse erro chega Ã  sua aplicaÃ§Ã£o.

| Etapa | Falha comum | Onde corrigir |
| --- | --- | --- |
| AnÃ¡lise de JavaScript | VÃ­rgula, aspas ou chave de fechamento ausente | Editor-fonte; a biblioteca ainda nÃ£o foi chamada |
| ExecuÃ§Ã£o da definiÃ§Ã£o | `ReferenceError` ou callback que falhou | CÃ³digo da aplicaÃ§Ã£o que constrÃ³i a definiÃ§Ã£o |
| Estrutura do documento | Tipo de nÃ³ escrito incorretamente, linhas de tabela ou lista invÃ¡lidas | Caminho da definiÃ§Ã£o informado |
| Carregamento de recursos | Fonte ausente, URL rejeitada, imagem ilegÃ­vel | Registro de fontes/recursos e polÃ­ticas de acesso |
| Layout/renderizaÃ§Ã£o | ConteÃºdo grande demais, dimensÃµes invÃ¡lidas ou falha de callback | Menor definiÃ§Ã£o que reproduza o problema |
| SaÃ­da | Stream fechado, falta de permissÃ£o de escrita ou destino indisponÃ­vel | Tratamento de erros de buffer/stream/arquivo |

## Sempre aguarde a saÃ­da

```js
async function generateReport(pdfmake, definition) {
  try {
    return await pdfmake.createPdf(definition).getBuffer();
  } catch (error) {
    console.error('PDF generation failed', {
      message: error.message,
      code: error.code,
      phase: error.phase,
      path: error.path
    });
    throw error;
  }
}
```

Retorne um erro ao chamador da API ou exiba `error.message` na interface. NÃ£o responda com um PDF vazio nem informe sucesso depois de descartar a rejeiÃ§Ã£o. Evite registrar o conteÃºdo do documento ou credenciais de recursos privados.

Desde 0.3.13, `getStream()` rejeita o acesso a um stream já consumido. Os métodos baseados em buffer reutilizam os bytes armazenados; `write()` no Node também aceita saídas já lidas com `getBuffer()`, `getBase64()` ou `getDataUrl()`. Crie outra instância de saída quando precisar de um novo stream bruto.

## Leia o caminho do documento

O branch local de melhorias da biblioteca adiciona diagnÃ³sticos `PDFMAKE_INVALID_DOCUMENT` com `phase: 'preprocess'` e uma propriedade `path`. Por exemplo:

```text
Unrecognized document structure: ...
Document path: content[0].columns[0].ul[1]
```

Isso aponta para o segundo item da lista no primeiro nÃ³ do corpo da primeira coluna. Verifique erros de digitaÃ§Ã£o como `{ txt: 'Hello' }` em vez de `{ text: 'Hello' }`. Linhas de tabela malformadas identificam a linha e o nÃºmero esperado de cÃ©lulas. Tabelas vazias explicam que `table.body` precisa conter arrays de linhas nÃ£o vazios. Mantenha placeholders `{}` para cÃ©lulas mescladas. O texto de erro existente Ã© preservado; quando disponÃ­veis, os chamadores devem usar os campos de diagnÃ³stico em vez de analisar strings de mensagem.

Esses diagnÃ³sticos estruturados sÃ£o **novos no branch local de melhorias**; o pacote 0.3.13 publicado ainda nÃ£o os contÃ©m. Erros genÃ©ricos continuam tendo uma mensagem. O branch tambÃ©m rejeita streams de buffer fechados prematuramente em vez de deixar a Promise pendente.

## Erros de sintaxe no playground

O editor analisa a definiÃ§Ã£o antes de executÃ¡-la, marca o local com erro e exibe linha e coluna. **Go to error in editor** leva o foco ao local. Desfazer/refazer e o painel de erros permitem corrigir o problema sem perder o trabalho. Com a prÃ©via ao vivo, o Ãºltimo PDF gerado com sucesso continua visÃ­vel durante ediÃ§Ãµes e falhas, mas seu download fica desativado quando ele deixa de corresponder ao cÃ³digo atual.

## Reduza falhas difÃ­ceis

Mantenha as mesmas fontes e o mesmo ambiente. Substitua o corpo por um Ãºnico parÃ¡grafo e, em seguida, reintroduza os blocos atÃ© o problema voltar. Em tabelas, confira o comprimento das linhas e os spans antes de ajustar as larguras. Para falhas de recursos, comece com uma fonte local conhecida e uma imagem incorporada. Consulte [soluÃ§Ã£o de problemas](/docs/0.3/pt-br/guides/troubleshooting/) para ver outros sintomas.

## Validar a definição completa antes da renderização

A API local ainda não publicada `validateDocument(input, options)` verifica todas as propriedades declaradas do documento e reúne vários erros com seus caminhos. Também verifica tabelas, células mescladas, referências, intervalos numéricos e ciclos. Não modifica a entrada, executa callbacks nem acessa recursos. Propriedades desconhecidas geram avisos; `strict: true` transforma esses avisos em erros.

```js
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

O resultado contém `valid`, `errors`, `warnings`, `deferred` e `truncated`. Cada diagnóstico inclui `path`, `code`, `severity` e `message`. Limites padrão: 100 diagnósticos, 100 níveis e 50.000 valores inspecionados. Um limite esgotado nunca informa sucesso. Os resultados dos callbacks, a disponibilidade e a decodificação dos recursos e o layout final continuam sendo verificados durante a renderização. O JavaScript já precisa ser sintaticamente válido antes de chamar esta API de objetos.

Passe `{ validation: true }` como segundo argumento para `createPdf` para rejeitar definições inválidas antes de carregar recursos. Um documento inválido lança um `DocumentValidationError` com `code: "PDFMAKE_VALIDATION_ERROR"`, `phase: "validation"` e um array `diagnostics`. As chamadas existentes permanecem compatíveis; a verificação prévia é opcional. O playground local a executa automaticamente com a biblioteca aprimorada.
