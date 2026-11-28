# LLM and MCP integration

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/guides/llm-and-mcp/

## Use documentation without MCP

Every page is available as generated Markdown. The same source produces:

- [llms.txt](/docs/0.3/llms.txt): page index with descriptions and Markdown links.
- [llms-full.txt](/docs/0.3/llms-full.txt): the complete versioned Markdown corpus.
- [docs-index.json](/docs/0.3/docs-index.json): page IDs, titles, descriptions, source URLs and full Markdown.

These are discovery aids, not a search-engine or model-indexing guarantee. Keep the installed library version in your prompt. Ask the model to cite the page and use Promise output methods. The library's `AGENTS.md` explains its source pipeline and test commands to coding agents.

## Run the local MCP server

Clone the documentation repository, install its dependencies, generate the corpus and start the server:

```sh
git clone https://github.com/pdfmake/docs.git
cd docs
npm ci
npm run docs:generate
node mcp/server.mjs
```

This server is part of the local improvement branch until accepted upstream. Start it through your MCP client's stdio configuration, using absolute paths:

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

Replace the example path with your clone's path. On Windows JSON paths must use `/` or escaped `\\`. Client configuration locations vary. The server writes protocol messages to stdout and errors to stderr. It does not require an API key, model account or network connection after dependency installation.

## Tools and resources

| Capability | Input | Result |
| --- | --- | --- |
| `search_docs` | `query`, optional `limit` (1–10), optional `language` | Ranked pages with exact IDs, language, version, source URLs and excerpts |
| `get_doc` | Exact `id` from search | Complete Markdown page |
| MCP resources | `pdfmake://docs/0.3/<id>` | The same versioned Markdown page |

The server can only read its bundled documentation corpus. It cannot render PDFs, evaluate code, read caller-selected filesystem paths or browse remote URLs. Re-run generation and restart it after editing documentation.

`language` accepts `en` (default), `de`, `fr`, `es` and `pt-br`. Every supported language contains the same complete set of documentation pages. Search never silently mixes languages. A translated ID such as `de/learn/first-pdf` can be read with `get_doc` or the resource `pdfmake://docs/0.3/de/learn/first-pdf`. Each language also has its own discovery files, for example `/docs/0.3/de/llms.txt` and `/docs/0.3/de/llms-full.txt`.

## Suggested prompt

> I use pdfmake 0.3.x in Node.js. Search the matching documentation before generating code. Use the Node singleton API, register fonts, configure synchronous resource policies, await output, and cite the page IDs used. Build a fresh document definition per request.
