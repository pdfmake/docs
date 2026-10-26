# Colunas em fluxo contínuo

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/snaking-columns/

> **Note:** Versão mínima: **0.3.5**


Colunas em fluxo contínuo (ou colunas em estilo de jornal) são um modo de layout em que o conteúdo flui verticalmente pela primeira coluna e continua no topo da próxima, alternando a direção conforme necessário. Em vez de sempre reiniciar no topo de cada nova linha de colunas, o layout percorre as colunas disponíveis em uma ordem de leitura contínua.

Quando `snakingColumns: true` está ativado, somente a **primeira coluna** deve conter conteúdo. As colunas seguintes servem como espaços vazios para o conteúdo excedente.

**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var myLongContent = 'A paragraph flowing through snaking columns. '.repeat(120);
var docDefinition: TDocumentDefinitions = {
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
