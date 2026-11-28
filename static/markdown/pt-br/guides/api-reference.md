# Visão geral da API

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/guides/api-reference/

## Configure uma vez, renderize várias vezes

Ambas as entradas expõem um singleton. Configure fontes, políticas e layouts na inicialização da aplicação. Não substitua a configuração compartilhada enquanto houver solicitações simultâneas em renderização.

| Método | Ambiente | Comportamento |
| --- | --- | --- |
| `addFonts(fonts)` | Ambos | Mescla famílias de fontes; uma família fornecida substitui o mapeamento anterior dessa família |
| `setFonts(fonts)` | Ambos | Substitui todo o mapa de fontes |
| `clearFonts()` | Ambos | Limpa as fontes registradas |
| `addTableLayouts(layouts)` | Ambos | Mescla funções de layout nomeadas |
| `setTableLayouts(layouts)` | Ambos | Substitui os layouts nomeados |
| `clearTableLayouts()` | Ambos | Limpa os layouts personalizados |
| `setProgressCallback(callback)` | Ambos | Recebe o progresso da renderização; não é um profiler de layout de páginas |
| `setUrlAccessPolicy(callback)` | Ambos, desde 0.3.6 | Permite URLs de recursos somente quando o callback retorna `true` de forma síncrona |
| `setLocalAccessPolicy(callback)` | Node, desde 0.3.8 | Permite recursos locais somente quando o callback retorna `true` de forma síncrona |
| `addVirtualFileSystem(vfs)` | Navegador | Adiciona dados de fontes/recursos em base64 ao sistema de arquivos virtual |
| `addFontContainer(container)` | Navegador | Registra um contêiner de fontes empacotado |

## Renderize

`createPdf(docDefinition, options?)` aceita objetos e retorna um invólucro de saída. Use [campos do documento](/docs/0.3/pt-br/document-definition-object/) no primeiro argumento e [opções de renderização](/docs/0.3/pt-br/options/) no segundo.

| Saída | Node | Navegador |
| --- | --- | --- |
| `getBuffer()`, `getBase64()`, `getDataUrl()`, `getStream()` | Sim | Sim |
| `write(filename)` | Sim | Não |
| `download(filename?)`, `open(window?)`, `print(window?)`, `getBlob()` | Não | Sim |

Todas as funções de saída retornam Promises. Trate sempre as rejeições. O invólucro retornado por `createPdf` não é uma Promise. Consulte [métodos do Node](/docs/0.3/pt-br/getting-started/server-side/methods/) e [métodos do navegador](/docs/0.3/pt-br/getting-started/client-side/methods/) para detalhes do ciclo de vida.
