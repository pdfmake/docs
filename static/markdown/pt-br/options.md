# Opções de renderização

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/options/

## Passe opções para createPdf

**JavaScript**

```js
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false
});
```

**TypeScript**

```ts
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false
});
```

O objeto de opções é separado da [definição do documento](/docs/0.3/pt-br/document-definition-object/).

| Opção | Tipo | Padrão | Significado |
| --- | --- | --- | --- |
| `fontLayoutCache` | boolean | `true` | Ativa o cache de layout de fontes do PDFKit |
| `bufferPages` | boolean | `false` | Mantém as páginas do PDFKit em buffer em vez de descarregá-las imediatamente |

Mantenha os padrões, a menos que seu caso de uso exija uma alteração. O armazenamento de páginas em buffer pode aumentar o uso de memória. Ele não torna o layout do próprio pdfmake preguiçoso ou incremental. Consulte [desempenho](/docs/0.3/pt-br/guides/performance/) e a [documentação de armazenamento de páginas em buffer do PDFKit](https://pdfkit.org/docs/getting_started.html).

Fontes, layouts de tabela nomeados e políticas de recursos são configurados na [API pública](/docs/0.3/pt-br/guides/api-reference/). Tamanho do papel, margens e conteúdo pertencem à definição.
