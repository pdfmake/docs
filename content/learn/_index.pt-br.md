+++
title = "Comece por aqui"
description = "Um caminho curto de aprendizado: escolha um ambiente, gere e estilize seu primeiro PDF e resolva problemas."
weight = 5
sourceDigest = "a8635fe5b8817a5c2f610b634abb0689d9672e42eef5a1b0bc6d01f52ba73dbe"
+++

## Comece com um documento funcional

Você não precisa aprender toda a referência do documento primeiro. Siga estes três passos:

<div class="learning-path">
<a href="/docs/0.3/pt-br/learn/first-pdf/"><strong>1. Crie seu primeiro PDF</strong><span>Entenda a definição, carregue fontes e execute um exemplo completo.</span></a>
<a href="/docs/0.3/pt-br/learn/document-model/"><strong>2. Aprenda o modelo do documento</strong><span>Saiba quando usar parágrafo, texto em linha, pilha, colunas ou tabela.</span></a>
<a href="/docs/0.3/pt-br/guides/errors/"><strong>3. Leia os erros e corrija o problema certo</strong><span>Diferencie sintaxe JavaScript, estrutura do documento, recursos e saída.</span></a>
</div>

## De qual ambiente preciso?

| Escolha | Quando usar | Saída |
| --- | --- | --- |
| [Node.js](/docs/0.3/pt-br/getting-started/server-side/) | Sua API ou tarefa em segundo plano cria o arquivo | `write()` para arquivos; `getBuffer()` para respostas HTTP |
| [Navegador](/docs/0.3/pt-br/getting-started/client-side/) | O usuário cria o documento no próprio dispositivo | `download()`, `open()`, `print()` ou `getBlob()` |

A definição do documento é compartilhada. O carregamento de fontes e as funções de saída dependem do ambiente. Estas páginas são para **0.3.x**; exemplos antigos que usam `new PdfPrinter(...)` e saída por callbacks pertencem ao [0.1/0.2](/docs/0.3/pt-br/migration-from-0.1/).

## Aprenda vendo o resultado

Os exemplos deste caminho mostram a definição JavaScript exata ao lado de um PDF realmente gerado. Abra-os no playground para editá-los. O código-fonte completo também está incluído no [corpus Markdown](/docs/0.3/pt-br/llms-full.txt), inclusive o código normalmente gerado pelos componentes interativos de exemplo.
