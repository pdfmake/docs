+++
title = "Colunas em fluxo contínuo"
description = "Faça o conteúdo fluir entre colunas em estilo de jornal com colunas em fluxo contínuo no pdfmake 0.3."
weight = 2025
alwaysopen = true
sourceDigest = "d3e6aecd99823a11767f72c7ac5e205d78dcb0fcc84bdd4fe9694a3ab50ff869"
+++

{{% alert theme="warning" %}}Versão mínima: **0.3.5**{{% /alert %}}

Colunas em fluxo contínuo (ou colunas em estilo de jornal) são um modo de layout em que o conteúdo flui verticalmente pela primeira coluna e continua no topo da próxima, alternando a direção conforme necessário. Em vez de sempre reiniciar no topo de cada nova linha de colunas, o layout percorre as colunas disponíveis em uma ordem de leitura contínua.

Quando `snakingColumns: true` está ativado, somente a **primeira coluna** deve conter conteúdo. As colunas seguintes servem como espaços vazios para o conteúdo excedente.

```js
var myLongContent = 'A paragraph flowing through snaking columns. '.repeat(120);
var docDefinition = {
    content: [
        {
            columns: [
                {text: myLongContent, width: '*'},  // Content goes here
                {text: '', width: '*'},             // Empty overflow target
                {text: '', width: '*'}              // Empty overflow target
            ],
            snakingColumns: true
        }
    ]
};
```

Não há suporte para aninhar diretamente uma “coluna em fluxo contínuo” dentro de outra (layout recursivo de colunas em fluxo contínuo).

**Recomendação**:
- Evite aninhamento profundo de colunas em fluxo contínuo dentro de outras colunas do mesmo tipo.
- Colunas padrão (sem fluxo contínuo) podem ser aninhadas com segurança dentro de colunas em fluxo contínuo.
- Colunas em fluxo contínuo podem ser aninhadas com segurança dentro de colunas padrão.
