# Desempenho e memória

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/guides/performance/

## Meça sua carga de trabalho

Faça benchmark de documentos representativos com a mesma versão do Node, as mesmas fontes e os mesmos dados de entrada. Registre a latência mediana e de cauda, o pico de memória, o número de páginas e o tamanho da saída. Separe a inicialização fria e o carregamento das fontes das renderizações repetidas. Compare documentos com muitas tabelas, textos longos e muitas imagens separadamente.

**JavaScript**

```js
const start = performance.now();
const bytes = await pdfmake.createPdf(makeFreshDefinition()).getBuffer();
console.log({ milliseconds: performance.now() - start, bytes: bytes.length });
```

**TypeScript**

```ts
const start = performance.now();
const bytes = await pdfmake.createPdf(makeFreshDefinition()).getBuffer();
console.log({ milliseconds: performance.now() - start, bytes: bytes.length });
```

`makeFreshDefinition()` é uma função criada por você. Não reutilize uma definição que já foi modificada pelo layout. Além da velocidade, verifique o texto, o número de páginas e páginas renderizadas representativas.

## Reduza trabalho evitável

- Coloque imagens repetidas no dicionário `images` e faça referência a elas pela chave. Redimensione imagens-fonte grandes antes de incorporá-las; as dimensões de exibição não reduzem o conteúdo original.
- Prefira larguras fixas quando o layout permitir. Larguras `auto` calculadas pelo conteúdo exigem medição de texto; faça benchmark antes de redesenhar tabelas.
- Registre fontes uma vez. Em aplicações de navegador, inclua somente as famílias e variantes necessárias.
- Mantenha `fontLayoutCache` ativado, a menos que um problema de compatibilidade medido exija desativá-lo. Consulte [opções de renderização](/docs/0.3/pt-br/options/).
- Evite base64 quando sua API puder retornar bytes binários do PDF. Base64 representa cada três bytes com quatro caracteres e também aloca uma string.
- Use `write()` ou consuma o stream diretamente para evitar o Buffer concatenado adicional produzido por `getBuffer()` quando você só precisa de um arquivo ou stream. O layout ainda ocorre antes do consumo da saída.

## Controle a concorrência

Mais trabalhos de PDF simultâneos podem aumentar o uso de memória e o atraso do event loop. Limite as renderizações simultâneas e teste a carga e a vazão, em vez de medir apenas uma solicitação. Use worker threads ou processos separados quando o trabalho bloqueante afetar a capacidade de resposta da API. Não altere configurações mutáveis do singleton por solicitação.

## Benchmark de desenvolvimento da biblioteca

O branch de melhorias da biblioteca inclui `npm run benchmark:text` depois de `npm run build:node`. Ele compara a conversão de arrays de texto com o algoritmo anterior usando entradas mistas determinísticas e verifica resultados equivalentes. O loop otimizado evita cópias repetidas do prefixo. O ganho medido se aplica somente a esse helper; não é uma afirmação sobre o tempo total de geração do PDF.

Limites de tempo foram deliberadamente excluídos da CI porque runners compartilhados têm resultados ruidosos. Use testes de correção como critérios e mantenha os resultados dos benchmarks junto com detalhes do ambiente para revisão.
