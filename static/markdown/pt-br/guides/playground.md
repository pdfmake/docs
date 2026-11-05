# Guia do playground

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/guides/playground/

## Aprenda editando

Abra o [playground · inglês](/docs/0.3/pt-br/playground/), escolha um exemplo e edite a definição no painel esquerdo. O painel direito mostra um PDF real renderizado pelo PDF.js. Com **Live preview** ativada, o PDF é atualizado automaticamente após a edição. Selecione **Run** ou pressione **Ctrl/Command + Enter** para atualizar imediatamente.

O editor CodeMirror 6 inclui realce de sintaxe, números de linha, pareamento de colchetes, indentação, botões Undo/Redo, histórico persistente de desfazer e diagnósticos de sintaxe com linha e coluna. **Go to error** leva o foco ao local incorreto no código-fonte. O editor também oferece sugestões de preenchimento; use **Ctrl + Espaço** para solicitá-las. Os nomes de campos sugeridos são dicas: a referência do documento define o contexto, o tipo e os valores válidos.

## Exemplos

| Exemplo | Explore |
| --- | --- |
| [Primeiro documento](/docs/0.3/pt-br/playground/?example=welcome) | Texto, espaçamento e estilos de fonte |
| [Fatura](/docs/0.3/pt-br/playground/?example=invoice) | Tabela, totais e rodapé com número de página |
| [Tabelas](/docs/0.3/pt-br/playground/?example=tables) | Cabeçalhos repetidos em várias páginas |
| [Estilos de texto](/docs/0.3/pt-br/playground/?example=styles) | Estilos nomeados e substituições em linha |
| [Colunas](/docs/0.3/pt-br/playground/?example=columns) | Blocos lado a lado e pilhas |
| [Mesclagens](/docs/0.3/pt-br/playground/?example=spans) | Mesclagens de linhas e colunas com placeholders |
| [Páginas](/docs/0.3/pt-br/playground/?example=pages) | Quebras de página, cabeçalhos e rodapés |
| [Vetores](/docs/0.3/pt-br/playground/?example=vectors) | SVG incorporado e códigos QR |
| [Imagens](/docs/0.3/pt-br/playground/?example=images) | Dados PNG incorporados e reutilizados por nome |
| [Listas](/docs/0.3/pt-br/playground/?example=lists) | Listas numeradas, marcadores e links |

Um parâmetro `example` na URL seleciona um exemplo conhecido; ele não aceita JavaScript. A prévia ao vivo também atualiza espaços de trabalho restaurados, documentos salvos e arquivos importados. Desative **Live preview** antes de importar código que queira inspecionar primeiro.

## Prévia e saída

Use as setas para mudar de página e o menu de zoom para mudar a escala. **Page text** exibe o texto extraído da página atual do PDF para inspeção e tecnologias assistivas. **Open PDF** abre o arquivo gerado em outra janela; **Download PDF** salva os mesmos bytes do PDF. O rodapé mostra o tempo de geração e o tamanho da saída. O tempo de geração não inclui a renderização da prévia pelo PDF.js.

A prévia ao vivo aguarda 650 ms depois da última edição e então renderiza em um worker novo. O PDF anterior permanece visível até que a página seguinte termine de ser renderizada fora da tela; o canvas é substituído em uma única etapa. Quando possível, a página selecionada e o zoom do PDF são preservados. Os downloads ficam desativados enquanto o PDF visível não corresponder ao código atual. Em caso de erro, a última prévia bem-sucedida continua visível em vez de ser substituída por um painel vazio.

## Mantenha seu trabalho

**Export code** baixa a definição atual como JavaScript. **Import .js** lê um arquivo local. O limite dos arquivos é 500 KB. Desative **Live preview** antes de importar código que queira revisar antes de executar. Ao redefinir ou trocar exemplos, o playground pede confirmação antes de substituir suas edições.

**O espaço de trabalho atual é salvo automaticamente no navegador**, incluindo definição, seleção do editor, histórico de desfazer, exemplo, página e configurações de zoom. Ao recarregar, o editor, o histórico Undo/Redo e a preferência de prévia ao vivo são restaurados. Se a prévia estiver ativada, o PDF restaurado será renderizado automaticamente e as edições seguintes o atualizarão sem pressionar Run. Se estiver desativada, a renderização permanece manual, inclusive após recarregar a página.

Dê um nome ao documento e escolha **Save document** para manter uma cópia local separada. Escolher um nome novo cria outro documento salvo; salvar com o nome selecionado atualiza esse documento. O menu de documentos salvos restaura o documento e seu histórico. A opção de excluir remove essa cópia nomeada e mantém o conteúdo atual do editor. É possível manter até 30 documentos nomeados. As cotas de armazenamento do navegador continuam valendo.

**Save draft locally** continua sendo uma cópia rápida separada, com controles Restore/Clear. **Clear workspace autosave** remove o salvamento automático atual e o pausa até você digitar novamente. Documentos nomeados e rascunhos rápidos são separados. Se o armazenamento do navegador estiver desativado ou cheio, o editor continua funcionando e a exportação de código permanece disponível. Esta aplicação não envia o código-fonte nem o PDF.

## Limites de renderização

Cada renderização inicia um worker de navegador novo. **Cancel** encerra esse worker, inclusive se ele estiver preso em um loop JavaScript. Um limite de dez segundos interrompe trabalhos inesperadamente custosos. Simplifique documentos grandes ou teste-os em uma aplicação controlada se ultrapassarem o limite do playground. A API de PDF bloqueia recursos de URLs remotas neste ambiente; use imagens incorporadas e as fontes Roboto fornecidas.

JavaScript personalizado é código confiável do usuário, não um sandbox de segurança. Não execute código de origem desconhecida. Um worker protege a interface contra bloqueios, mas não é uma barreira de isolamento contra código malicioso. Consulte [segurança de recursos](/docs/0.3/pt-br/guides/resource-security/) para recomendações sobre APIs de produção.

## Execute a ferramenta de desenvolvimento independente

Em um checkout compilado da biblioteca pdfmake, execute `npm run playground`. Ele serve a mesma interface com o motor desse checkout em `http://127.0.0.1:1234/playground/`. Essa ferramenta separada exige Node >=22.13. O requisito de execução da biblioteca publicada continua sendo Node >=20. O site de documentação também pode pré-visualizar um motor local por meio de `PDFMAKE_SOURCE`; consulte o README do repositório de documentação.
