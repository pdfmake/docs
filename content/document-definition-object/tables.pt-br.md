+++
title = "Tabelas"
description = "Crie tabelas com linhas consistentes, cabeçalhos repetidos, bordas personalizadas, larguras e células mescladas."
weight = 2030
alwaysopen = true
sourceDigest = "48bc3047dc6a23638e82fe81a22c544d203aad3bebf645cdee21772c669cefae"
+++

## Comece com linhas e um cabeçalho repetido

Use uma tabela quando as células de linhas diferentes precisam ficar alinhadas. `body` é um array de arrays de linhas. Cada linha precisa ter o mesmo número de células; as células podem conter texto ou outros nós do pdfmake. `headerRows: 1` repete a primeira linha quando a tabela continua em outra página.

{{< example id="tables" >}}

## Escolha as larguras

| Largura | Significado | Útil quando |
| --- | --- | --- |
| Um número, por exemplo `80` | Pontos fixos | Códigos, quantidades ou uma coluna de rótulos previsível |
| `'*'` | Compartilha a largura restante | Uma descrição deve ocupar o espaço disponível |
| `'auto'` | Mede o conteúdo | Rótulos curtos devem usar apenas a largura necessária |
| Uma string percentual | Largura baseada em porcentagem | É necessário um layout proporcional; teste cuidadosamente larguras combinadas |

Bordas, preenchimento interno, margens da página e outras colunas também consomem espaço. Comece com larguras fixas e com asterisco; use `auto` quando o dimensionamento pelo conteúdo for intencional. Evite adicionar larguras fixas grandes que ultrapassem a área de conteúdo.

## Campos da tabela e das células

| Campo | Onde | Tipo / finalidade |
| --- | --- | --- |
| `body` | `table` | Arrays de linhas não vazios |
| `widths` | `table` | Descritores de largura, um por coluna |
| `headerRows` | `table` | Número de linhas iniciais repetidas como cabeçalhos |
| `dontBreakRows` | `table` | Impede que uma linha individual seja dividida entre páginas |
| `keepWithHeaderRows` | `table` | Número de linhas seguintes que devem permanecer junto ao cabeçalho |
| `layout` | Nó, ao lado de `table` | Nome de layout integrado, nome registrado ou objeto de layout |
| `colSpan`, `rowSpan` | Célula | Número positivo de colunas/linhas ocupadas; ainda são necessários marcadores de posição |
| `verticalAlignment` | Célula | `'top'` (padrão), `'middle'` ou `'bottom'` |
| `border` | Célula | Quatro booleanos: esquerda, superior, direita, inferior |
| `borderColor` | Célula | Quatro cores na mesma ordem |
| `fillColor` | Célula | Cor de fundo ou tupla de padrão compatível |
| `fillOpacity` | Célula | Opacidade numérica do fundo |
| `overlayPattern`, `overlayOpacity` | Célula | Tupla de padrão e opacidade numérica desenhados sobre o conteúdo |

Manter uma linha inteira junta não faz uma linha alta demais caber na página. Teste descrições longas e conteúdo aninhado com o tamanho de página e as fontes que você realmente usa.

## Mescle células sem alterar o tamanho da linha

```js
var dd = {
  content: [{
    table: {
      widths: ['*', '*', '*'],
      body: [
        [{ text: 'A heading across three columns', colSpan: 3, bold: true }, {}, {}],
        [{ text: 'Two rows', rowSpan: 2 }, 'A', 'B'],
        [{}, 'C', 'D']
      ]
    }
  }]
};
```

Os objetos vazios ocupam as células cobertas por um intervalo mesclado. Omiti-los produz uma linha inconsistente. Não use `undefined` como marcador de posição. O [exemplo de intervalos mesclados no playground](/docs/0.3/pt-br/playground/?example=spans) mostra essa definição.

## Use um layout integrado

`noBorders`, `headerLineOnly` e `lightHorizontalLines` podem ser usados pelo nome. Coloque `layout` ao lado de `table`, e não dentro dele:

```js
var dd = {
  content: [{
    layout: 'lightHorizontalLines',
    table: { headerRows: 1, widths: ['*', 'auto'], body: [['Item', 'Qty'], ['Notebook', 3]] }
  }]
};
```

## Registre um layout personalizado

Registre os layouts antes de criar o documento. No Node, use a instância configurada de `pdfmake`; no navegador, use `pdfMake`.

```js
pdfMake.addTableLayouts({
  compact: {
    hLineWidth: function (index, node) {
      return index === node.table.headerRows ? 1 : 0;
    },
    vLineWidth: function () { return 0; },
    hLineColor: function () { return '#b7cfc4'; },
    paddingLeft: function () { return 6; },
    paddingRight: function () { return 6; }
  }
});

var dd = {
  content: [{ layout: 'compact', table: { headerRows: 1, body: [['Item', 'Qty'], ['Notebook', 3]] } }]
};
```

O trecho pressupõe que o mecanismo do navegador e as fontes foram carregados. Apenas definir uma variável de layout não a registra. Prefira callbacks determinísticos; evite alterar configuração compartilhada durante tarefas simultâneas do Node.

## Diagnostique tabelas malformadas

Verifique `body` antes de alterar bordas ou larguras: ele deve conter arrays de linhas com comprimentos consistentes. Em seguida, confira os marcadores de posição dos intervalos mesclados. No branch local de melhorias, os diagnósticos identificam o caminho da definição com problema e o número esperado de células. Consulte [erros e diagnósticos](/docs/0.3/pt-br/guides/errors/).
