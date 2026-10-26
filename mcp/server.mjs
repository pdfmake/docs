import fs from 'node:fs/promises';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { searchPages } from '../scripts/corpus.mjs';

export async function createServer() {
  // Use the exact generated website corpus; no remote fetches, arbitrary paths or code execution.
  const { pages, version } = JSON.parse(await fs.readFile(new URL('../data/docs-all.json', import.meta.url), 'utf8'));
  const byId = new Map(pages.map(page => [page.id, page]));
  const server = new McpServer({ name: 'pdfmake-docs', version: '0.1.0' });
  server.registerTool('search_docs', {
    description: 'Search this snapshot of pdfmake documentation in en (default), de, fr, es or pt-br. Each language contains the complete documentation reference. Returns exact IDs; use get_doc for complete pages.',
    inputSchema: { query: z.string().trim().min(1).max(300), limit: z.number().int().min(1).max(10).default(5), language: z.enum(['en', 'de', 'fr', 'es', 'pt-br']).default('en'), version: z.literal(version).default(version) },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }
  }, async ({ query, limit, language }) => ({ content: [{ type: 'text', text: JSON.stringify(searchPages(pages.filter(page => page.language === language), query, limit).map(p => ({
    id: p.id, language: p.language, title: p.title, version: p.version, url: p.url, uri: p.uri, description: p.description,
    excerpt: p.markdown.slice(0, 1200)
  }))) }] }));
  server.registerTool('get_doc', {
    description: 'Read a complete page from this pdfmake documentation snapshot by its exact search result ID.',
    inputSchema: { id: z.string().min(1).max(200), version: z.literal(version).default(version) },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }
  }, async ({ id }) => {
    const page = byId.get(id);
    return page ? { content: [{ type: 'text', text: page.markdown }] }
      : { isError: true, content: [{ type: 'text', text: 'Unknown page ID. Use search_docs to find a valid ID.' }] };
  });
  for (const page of pages) {
    server.registerResource(page.id, page.uri, {
      title: page.title, description: page.description, mimeType: 'text/markdown'
    }, async uri => ({ contents: [{ uri: uri.href, mimeType: 'text/markdown', text: page.markdown }] }));
  }
  return server;
}

if (process.argv[1] && import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1]).href) {
  try {
    await (await createServer()).connect(new StdioServerTransport());
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
