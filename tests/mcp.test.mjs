import { activeVersion } from '../scripts/versions.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

test('MCP stdio handshake, tools, errors and resources match the docs corpus', async () => {
  const client = new Client({ name: 'pdfmake-docs-test', version: '1.0.0' });
  const transport = new StdioClientTransport({ command: process.execPath,
    args: [fileURLToPath(new URL('../mcp/server.mjs', import.meta.url))], stderr: 'pipe' });
  try {
    await client.connect(transport);
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map(t => t.name).sort(), ['get_doc', 'search_docs']);
    assert.ok(tools.every(t => t.annotations.readOnlyHint));
    const search = await client.callTool({ name: 'search_docs', arguments: { query: 'tables', limit: 3 } });
    const hits = JSON.parse(search.content[0].text);
    const hit = hits.find(p => p.id === 'document-definition-object/tables');
    assert.ok(hit);
    const doc = await client.callTool({ name: 'get_doc', arguments: { id: hit.id } });
    assert.match(doc.content[0].text, /headerRows/);
    assert.ok(doc.content[0].text.includes(`Version: pdfmake ${activeVersion.label}`));
    const localizedSearch = await client.callTool({ name: 'search_docs', arguments: { query: 'Tabellen', language: 'de', limit: 3 } });
    const localizedHits = JSON.parse(localizedSearch.content[0].text);
    assert.ok(localizedHits.every(page => page.language === 'de'));
    assert.ok(localizedHits.some(page => page.id === 'de/document-definition-object/tables'));
    const translatedDoc = await client.callTool({ name: 'get_doc', arguments: { id: 'de/learn/first-pdf' } });
    assert.match(translatedDoc.content[0].text, /Deine erste PDF/);
    assert.match(translatedDoc.content[0].text, /Language: de/);
    const wrongVersion = await client.callTool({ name: 'search_docs', arguments: { query: 'table', version: '999.0' } });
    assert.equal(wrongVersion.isError, true, 'A snapshot must not silently answer for another version');
    const wrongDocVersion = await client.callTool({ name: 'get_doc', arguments: { id: hit.id, version: '999.0' } });
    assert.equal(wrongDocVersion.isError, true);
    const invalidLanguage = await client.callTool({ name: 'search_docs', arguments: { query: 'table', language: 'xx' } });
    assert.equal(invalidLanguage.isError, true);
    const invalid = await client.callTool({ name: 'get_doc', arguments: { id: '../../package.json' } });
    assert.equal(invalid.isError, true);
    const badLimit = await client.callTool({ name: 'search_docs', arguments: { query: 'font', limit: 100 } });
    assert.equal(badLimit.isError, true);
    const resources = await client.listResources();
    assert.ok(resources.resources.length >= 50);
    const resource = await client.readResource({ uri: hit.uri });
    assert.equal(resource.contents[0].text, doc.content[0].text);
  } finally {
    await client.close();
  }
});
