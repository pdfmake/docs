+++
title = "Integração com LLM e MCP"
description = "Use recursos Markdown versionados, llms.txt e um servidor MCP local e somente leitura para a documentação do pdfmake 0.3."
weight = 6
sourceDigest = "f369b718c3c46a1865fd7a38d3ccd5b001b457935d5a0a4bd9fccb22d194bbd3"
+++

## Consulte a documentação sem MCP

Cada página também está disponível como Markdown gerado. A mesma fonte produz:

- [llms.txt](/docs/0.3/pt-br/llms.txt): índice de páginas com descrições e links Markdown.
- [llms-full.txt](/docs/0.3/pt-br/llms-full.txt): corpus Markdown completo e versionado.
- [docs-index.json](/docs/0.3/pt-br/docs-index.json): IDs de páginas, títulos, descrições, URLs de origem e Markdown completo.

Esses arquivos ajudam na descoberta; eles não garantem indexação por mecanismos de busca ou modelos. Informe ao modelo a versão da biblioteca instalada. Peça que cite as páginas e use métodos de saída baseados em Promise. O `AGENTS.md` da biblioteca explica o pipeline do código-fonte e os comandos de teste usados por agentes de programação.

## Execute o servidor MCP local

Clone o repositório da documentação, instale as dependências, gere o corpus e inicie o servidor:

```sh
git clone https://github.com/pdfmake/docs.git
cd docs
npm ci
npm run docs:generate
node mcp/server.mjs
```

Este servidor faz parte do branch local de melhorias até ser aceito upstream. Inicie-o pela configuração stdio do seu cliente MCP, usando caminhos absolutos:

```json
{
  "mcpServers": {
    "pdfmake-docs": {
      "command": "node",
      "args": ["/absolute/path/to/docs/mcp/server.mjs"]
    }
  }
}
```

Substitua o caminho de exemplo pelo caminho do seu clone. Em JSON no Windows, use `/` ou `\\` escapado. O local da configuração varia conforme o cliente. O servidor escreve mensagens do protocolo em stdout e erros em stderr. Depois de instalar as dependências, ele não precisa de chave de API, conta de modelo nem conexão de rede.

## Ferramentas e recursos

| Recurso | Entrada | Resultado |
| --- | --- | --- |
| `search_docs` | `query`, `limit` opcional (1–10), `language` opcional | Páginas ordenadas por relevância, com IDs exatos, idioma, versão, URLs de origem e trechos |
| `get_doc` | `id` exato obtido na busca | Página Markdown completa |
| Recursos MCP | `pdfmake://docs/0.3/<id>` | A mesma página Markdown versionada |

O servidor só lê o corpus de documentação empacotado. Ele não renderiza PDFs, executa código, lê caminhos do sistema de arquivos escolhidos pelo chamador nem acessa URLs remotas. Gere novamente o corpus e reinicie o servidor depois de editar a documentação.

`language` aceita `en` (padrão), `de`, `fr`, `es` e `pt-br`. Cada idioma compatível contém o mesmo conjunto completo de páginas da documentação. A busca nunca mistura idiomas sem avisar. Um ID traduzido como `de/learn/first-pdf` pode ser lido com `get_doc` ou pelo recurso `pdfmake://docs/0.3/de/learn/first-pdf`. Cada idioma também tem seus próprios arquivos de descoberta, por exemplo `/docs/0.3/de/llms.txt` e `/docs/0.3/de/llms-full.txt`.

## Sugestão de prompt

> Uso pdfmake 0.3.x no Node.js. Consulte a documentação correspondente antes de gerar código. Use a API singleton do Node, registre as fontes, configure políticas síncronas de recursos, aguarde a saída e cite os IDs das páginas usados. Crie uma definição de documento nova para cada solicitação.
