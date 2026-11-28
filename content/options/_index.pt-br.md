+++
title = "Opções de renderização"
description = "Configure o cache de layout de fontes e o armazenamento temporário de páginas do PDFKit pelo segundo argumento de createPdf."
weight = 30
sourceDigest = "c32b0c6709d2d0a715a0e2f2b837333ea0201c7aacac1cbbd12d9ee1240e0423"
+++

## Passe opções para createPdf

```js
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false,
  unbreakableOverflow: 'allowBreak'
});
```

O objeto de opções é separado da [definição do documento](/docs/0.3/pt-br/document-definition-object/).

| Opção | Tipo | Padrão | Significado |
| --- | --- | --- | --- |
| `fontLayoutCache` | boolean | `true` | Ativa o cache de layout de fontes do PDFKit |
| `bufferPages` | boolean | `false` | Mantém as páginas do PDFKit em buffer em vez de descarregá-las imediatamente |
| `unbreakableOverflow` | 'allowBreak' / 'error' | `'allowBreak'` | Controlar blocos indivisíveis grandes demais; veja a seção abaixo. |

Mantenha os padrões, a menos que seu caso de uso exija uma alteração. O armazenamento de páginas em buffer pode aumentar o uso de memória. Ele não torna o layout do próprio pdfmake preguiçoso ou incremental. Consulte [desempenho](/docs/0.3/pt-br/guides/performance/) e a [documentação de armazenamento de páginas em buffer do PDFKit](https://pdfkit.org/docs/getting_started.html).

Fontes, layouts de tabela nomeados e políticas de recursos são configurados na [API pública](/docs/0.3/pt-br/guides/api-reference/). Tamanho do papel, margens e conteúdo pertencem à definição.

## Excesso de blocos indivisíveis {#unbreakable-overflow}

Desde **0.3.15**, `unbreakableOverflow` controla blocos indivisíveis grandes demais. Ambos os modos preservam um bloco que cabe em uma página; se faltar apenas espaço restante, ele vai para a próxima. Isso abrange `unbreakable`, `dontBreakRows`, `keepWithHeaderRows`, extensões de linhas associadas e cabeçalhos repetidos.

| Valor | Comportamento |
| --- | --- |
| `'allowBreak'` | Tentar novamente com as restrições de indivisibilidade compatíveis relaxadas, dividindo blocos grandes demais quando possível. |
| `'error'` | Rejeitar a geração se um bloco indivisível não couber em uma página. |
