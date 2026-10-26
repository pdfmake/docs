# Seu primeiro PDF

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/learn/first-pdf/

## 1. Entenda os dois elementos

O pdfmake precisa de um **motor com fontes** e de uma **definição do documento**. A definição é um objeto JavaScript que descreve o que será impresso. Ela não é HTML e não desenha nada até ser passada a `createPdf` e uma saída ser solicitada.

Na primeira tentativa, use no navegador o exemplo abaixo. O motor e a fonte Roboto já estão configurados. Depois, configure seu ambiente seguindo o passo 3.

## 2. Examine uma definição completa

O resultado abaixo é gerado exatamente a partir deste código. As três entradas de `content` viram três blocos verticais. O texto quebra linhas automaticamente; margens e tamanhos de fonte são medidos em pontos PDF (72 pontos = 1 polegada).



### Runnable example: 01 · First document

**JavaScript**

```js
// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd: TDocumentDefinitions = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/pt-br/playground/?example=welcome)



Altere o título ou o tamanho da fonte no playground. Com **Live preview** ativada, o PDF atualizado aparece quando você pausa a digitação. Você pode desfazer alterações, salvar documentos nomeados no navegador ou exportar um arquivo JavaScript.

## 3. Configure sua aplicação

Escolha **uma** configuração. Não combine a entrada do Node com métodos de saída exclusivos do navegador.

| Ambiente | Configuração | Por que as fontes importam |
| --- | --- | --- |
| API Node.js | [Início rápido completo para Node](/docs/0.3/pt-br/getting-started/server-side/) | Registre arquivos de fontes reais ou uma família padrão antes de renderizar |
| Aplicação no navegador | [Início rápido completo para navegador](/docs/0.3/pt-br/getting-started/client-side/) | Carregue `pdfmake.min.js` e depois um VFS de fontes, ou registre-o no bundler |

O exemplo usa `Roboto`, a fonte padrão do navegador. Se você o usar com a configuração de Helvetica padrão do início rápido para Node, adicione `defaultStyle: { font: 'Helvetica' }` à definição ou registre os arquivos Roboto. Texto Unicode também precisa de uma fonte que cubra os caracteres usados; uma string válida, por si só, não fornece glifos ausentes.

## 4. Solicite uma saída e trate erros

Em uma aplicação de navegador configurada:

**JavaScript**

```js
try {
  await pdfMake.createPdf(dd).download('first-document.pdf');
} catch (error) {
  document.querySelector('#status').textContent = error.message;
}
```

**TypeScript**

```ts
try {
  await pdfMake.createPdf(dd).download('first-document.pdf');
} catch (error) {
  document.querySelector('#status').textContent = error.message;
}
```

Aqui, `dd` é a definição acima e `#status` é um elemento da aplicação. No Node.js, use `await pdfmake.createPdf(dd).write('first-document.pdf')`. `createPdf` retorna um invólucro de saída; o método de saída retorna a Promise que deve ser aguardada. Sem `await` ou `.catch(...)`, uma falha de geração talvez nunca chegue à interface.

## 5. Adicione um conceito por vez

Mantenha o primeiro documento funcional. Em seguida, adicione [estilos nomeados](/docs/0.3/pt-br/document-definition-object/styling/) e depois [tabelas](/docs/0.3/pt-br/document-definition-object/tables/) quando precisar de linhas. Use [o modelo do documento](/docs/0.3/pt-br/learn/document-model/) para escolher um tipo de nó. Se algo falhar, [classifique o erro](/docs/0.3/pt-br/guides/errors/) antes de alterar fontes, layout e recursos todos de uma vez.
