# Erros e diagnósticos

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/guides/errors/

## Primeiro, identifique a etapa que falhou

Uma definição inválida deve falhar em vez de omitir conteúdo silenciosamente. A pergunta útil é em que etapa ocorreu a falha e como esse erro chega à sua aplicação.

| Etapa | Falha comum | Onde corrigir |
| --- | --- | --- |
| Análise de JavaScript | Vírgula, aspas ou chave de fechamento ausente | Editor-fonte; a biblioteca ainda não foi chamada |
| Execução da definição | `ReferenceError` ou callback que falhou | Código da aplicação que constrói a definição |
| Estrutura do documento | Tipo de nó escrito incorretamente, linhas de tabela ou lista inválidas | Caminho da definição informado |
| Carregamento de recursos | Fonte ausente, URL rejeitada, imagem ilegível | Registro de fontes/recursos e políticas de acesso |
| Layout/renderização | Conteúdo grande demais, dimensões inválidas ou falha de callback | Menor definição que reproduza o problema |
| Saída | Stream fechado, falta de permissão de escrita ou destino indisponível | Tratamento de erros de buffer/stream/arquivo |

## Sempre aguarde a saída

**JavaScript**

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

**TypeScript**

```ts
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

Retorne um erro ao chamador da API ou exiba `error.message` na interface. Não responda com um PDF vazio nem informe sucesso depois de descartar a rejeição. Evite registrar o conteúdo do documento ou credenciais de recursos privados.

## Leia o caminho do documento

O branch local de melhorias da biblioteca adiciona diagnósticos `PDFMAKE_INVALID_DOCUMENT` com `phase: 'preprocess'` e uma propriedade `path`. Por exemplo:

```text
Unrecognized document structure: ...
Document path: content[0].columns[0].ul[1]
```

Isso aponta para o segundo item da lista no primeiro nó do corpo da primeira coluna. Verifique erros de digitação como `{ txt: 'Hello' }` em vez de `{ text: 'Hello' }`. Linhas de tabela malformadas identificam a linha e o número esperado de células. Tabelas vazias explicam que `table.body` precisa conter arrays de linhas não vazios. Mantenha placeholders `{}` para células mescladas. O texto de erro existente é preservado; quando disponíveis, os chamadores devem usar os campos de diagnóstico em vez de analisar strings de mensagem.

Esses diagnósticos estruturados são **novos no branch local de melhorias**; o pacote 0.3.12 publicado ainda não os contém. Erros genéricos continuam tendo uma mensagem. O branch também rejeita streams de buffer fechados prematuramente em vez de deixar a Promise pendente.

## Erros de sintaxe no playground

O editor analisa a definição antes de executá-la, marca o local com erro e exibe linha e coluna. **Go to error in editor** leva o foco ao local. Desfazer/refazer e o painel de erros permitem corrigir o problema sem perder o trabalho. Com a prévia ao vivo, o último PDF gerado com sucesso continua visível durante edições e falhas, mas seu download fica desativado quando ele deixa de corresponder ao código atual.

## Reduza falhas difíceis

Mantenha as mesmas fontes e o mesmo ambiente. Substitua o corpo por um único parágrafo e, em seguida, reintroduza os blocos até o problema voltar. Em tabelas, confira o comprimento das linhas e os spans antes de ajustar as larguras. Para falhas de recursos, comece com uma fonte local conhecida e uma imagem incorporada. Consulte [solução de problemas](/docs/0.3/pt-br/guides/troubleshooting/) para ver outros sintomas.

## Validar a defini��o completa antes da renderiza��o

A API local ainda n�o publicada `validateDocument(input, options)` verifica todas as propriedades declaradas do documento e re�ne v�rios erros com seus caminhos. Tamb�m verifica tabelas, c�lulas mescladas, refer�ncias, intervalos num�ricos e ciclos. N�o modifica a entrada, executa callbacks nem acessa recursos. Propriedades desconhecidas geram avisos; `strict: true` transforma esses avisos em erros.

**JavaScript**

```js
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

**TypeScript**

```ts
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

O resultado cont�m `valid`, `errors`, `warnings`, `deferred` e `truncated`. Cada diagn�stico inclui `path`, `code`, `severity` e `message`. Limites padr�o: 100 diagn�sticos, 100 n�veis e 50.000 valores inspecionados. Um limite esgotado nunca informa sucesso. Os resultados dos callbacks, a disponibilidade e a decodifica��o dos recursos e o layout final continuam sendo verificados durante a renderiza��o. O JavaScript j� precisa ser sintaticamente v�lido antes de chamar esta API de objetos.

Passe `{ validation: true }` como segundo argumento para `createPdf` para rejeitar defini��es inv�lidas antes de carregar recursos. Um documento inv�lido lan�a um `DocumentValidationError` com `code: "PDFMAKE_VALIDATION_ERROR"`, `phase: "validation"` e um array `diagnostics`. As chamadas existentes permanecem compat�veis; a verifica��o pr�via � opcional. O playground local a executa automaticamente com a biblioteca aprimorada.
