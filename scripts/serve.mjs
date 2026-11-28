import { basePath } from './versions.mjs';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export async function serve(directory, port = 0, { collection = false } = {}) {
  const root = path.resolve(directory);
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml' };
  const server = http.createServer(async (req, res) => {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
    try {
      const url = new URL(req.url, 'http://localhost');
      const relative = decodeURIComponent(!collection && url.pathname.startsWith(basePath) ? '/' + url.pathname.slice(basePath.length) : url.pathname);
      let file = path.resolve(root, '.' + relative);
      if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
      if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
      const data = await fs.readFile(file);
      res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      if (path.basename(file) === 'worker.js') res.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'self' 'unsafe-eval'; connect-src 'none'");
      res.writeHead(200).end(req.method === 'HEAD' ? undefined : data);
    } catch { res.writeHead(404).end('Not found'); }
  });
  await new Promise(resolve => server.listen(port, '127.0.0.1', resolve));
  return server;
}

if (process.argv[1] && import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1]).href) {
  const server = await serve(process.argv[2] || fileURLToPath(new URL('../public/', import.meta.url)), Number(process.env.PORT || 1313), { collection: process.argv.includes('--collection') });
  console.log(`Documentation: http://127.0.0.1:${server.address().port}${basePath}`);
}
