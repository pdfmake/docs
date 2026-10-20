+++
title = "Solução de problemas"
description = "Diagnostique falhas comuns do pdfmake 0.3 relacionadas a imports, fontes, tabelas, Promises, janelas do navegador e acesso a recursos."
weight = 5
sourceDigest = "5159bc06095c71b8ab0b613c4df51b538e163232b5543aa4bb809f90b91021bb"
+++

## Comece pela versão e pelo ambiente

Execute `npm ls pdfmake` e compare seu import com o início rápido adequado. Um bundle de navegador e a entrada do Node expõem funções de saída diferentes. Exemplos das versões 0.1/0.2 que usam `new PdfPrinter(...)` ou callbacks não descrevem a API 0.3.

| Sintoma | Verifique | Correção |
| --- | --- | --- |
| Família ou variante de fonte não definida | Nome da família, mapeamento de negrito/itálico e fonte padrão | Registre todas as variantes usadas e selecione a família em `defaultStyle` |
| Arquivo não encontrado ou acesso negado | Caminho realmente resolvido da fonte/imagem e política | Use caminhos existentes pertencentes à aplicação e uma política síncrona correspondente |
| Glifos ausentes ou incorretos | Cobertura de glifos da fonte selecionada | Incorpore uma fonte que cubra o idioma; teste também negrito e itálico |
| Tabela vazia ou malformada | `body`, comprimento das linhas e spans | Forneça linhas não vazias e consistentes, com células substitutas para células mescladas |
| `download` não é função no Node | Ambiente importado | Use `write` ou `getBuffer` na entrada do Node |
| Navegador não abre janela | Gesto do usuário e bloqueador de pop-ups | Abra a janela diretamente no clique, antes de carregar dados de forma assíncrona |
| URL negada apesar do callback de permissão | Tipo de retorno do callback | Retorne o booleano literal `true` de forma síncrona; remova `async` |
| Falha na solicitação HTTP da imagem | URL, política, CORS, status e redirecionamentos | Verifique o acesso no ambiente de destino; navegadores aplicam CORS |
| Arquivo incompleto ou ausente | Promise rejeitada e erros de escrita | Aguarde `write()` e trate sua rejeição antes de informar sucesso |
| Saída mudou após atualização | Versão, fontes, entradas e padrões | Reproduza com uma versão fixada e compare texto extraído, número de páginas e páginas renderizadas |

## Reduza a definição

Comece com um parágrafo simples e fontes conhecidas como válidas. Adicione estilos, linhas da tabela e recursos um de cada vez. Monte uma definição nova a cada tentativa. Mantenha separados os erros de solicitação e de recursos dos erros de layout.

## Relate um bug útil

Inclua as versões exatas do pdfmake e do Node/navegador, o sistema operacional, uma definição mínima executável, a configuração de fontes, o comportamento esperado e o observado, e o stack trace completo relevante. Remova conteúdo privado e segredos. Para falhas de paginação, inclua a menor entrada que ainda reproduz a quebra de página.
