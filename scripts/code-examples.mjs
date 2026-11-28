import ts from 'typescript';
import { createHash } from 'node:crypto';

export const codeKey = source => createHash('sha256').update(source.trim().replaceAll('\r\n', '\n')).digest('hex');
export function createCodeExample(source, language = 'js') {
  source = source.trim().replaceAll('\r\n', '\n');
  const isTypeScript = /^(ts|typescript)$/.test(language);
  let javascript = isTypeScript ? ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText.trim() : source;
  let typescript = source;
  const leading = source.replace(/^(?:\s*\/\/[^\n]*\n)*/, '').trimStart();
  if (!isTypeScript && leading.startsWith('{')) {
    if (source.includes('<as specified in doc definition>')) javascript = 'const currentNode = ' + source + ';';
    else if (/\bcontent\s*:/.test(source)) javascript = 'var dd = ' + source.replace(/,\s*$/, '') + ';';
    else if (/\btype:\s*['"](?:rect|line|ellipse)/.test(source)) javascript = 'var dd = { content: [{ canvas: [\n' + source + '\n] }] };';
    else javascript = 'var dd = { content: [\n' + source.replace(/}\s*\n\s*{/g, '},\n{') + '\n] };';
    typescript = javascript;
  } else if (!isTypeScript && /^pageBreakBefore\s*:/.test(leading)) {
    javascript = "var dd = { content: ['Example document'],\n" + source + '\n};';
    typescript = javascript;
  } else if (!isTypeScript && /^text\s*:/.test(leading)) {
    javascript = 'var dd = { content: [{\n' + source + '\n}] };';
    typescript = javascript;
  }
  const declaration = /\b(var|const|let)\s+(dd|docDefinition)\s*=\s*\{/;
  if (!isTypeScript && declaration.test(javascript)) {
    typescript = 'import type { TDocumentDefinitions } from "pdfmake/interfaces";\n\n' + javascript.replace(declaration, '$1 $2: TDocumentDefinitions = {');
    if (/\bpdfMake\./.test(javascript)) typescript = 'import pdfMake from "pdfmake/build/pdfmake.js";\n' + typescript;
    typescript = typescript.replace('var items = [', 'var items: Array<[string, number, number]> = [');
    if (/overlayPattern:/.test(source)) {
      typescript = 'import type { ContentText } from "pdfmake/interfaces";\n\n'
        + '// Cell properties are included in the bundled pdfmake declarations.\n'
        + 'const cell = ' + source + ' satisfies ContentText;\n';
    }
  }
  if (!isTypeScript && /const pdfmake = require\(['"]pdfmake['"]\)/.test(source)) {
    typescript = source.replace(/const pdfmake = require\(['"]pdfmake['"]\);?/, 'import pdfmake from "pdfmake";');
    if (/const definition = \{/.test(typescript)) {
      typescript = 'import type { TDocumentDefinitions } from "pdfmake/interfaces";\n' + typescript.replace('const definition = {', 'const definition: TDocumentDefinitions = {');
    }
    typescript = typescript.replace('const money = cents =>', 'const money = (cents: number) =>');
  }
  const runnable = declaration.test(javascript) && !/\brequire\s*\(|^\s*import\s|fontello|yourFontName|style:\s*['"]icon['"]|attachments|embeddedFiles|application-owned|https:\/\/example\.com/m.test(javascript)
    && (!/stripe45d/.test(source) || /patterns\s*:/.test(source));
  const context = runnable ? 'definition' : /\brequire\s*\(|node:|\.write\(/.test(javascript) ? 'node' : 'context';
  return { javascript, typescript, runnable, context };
}
