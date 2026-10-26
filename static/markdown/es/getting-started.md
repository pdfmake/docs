# InstalaciÃ³n

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/getting-started/

## Elige el entorno de ejecuciÃ³n

- [Node.js](/docs/0.3/es/getting-started/server-side/): escribir un archivo, devolver un Buffer desde una API o consumir un flujo.
- [Navegador](/docs/0.3/es/getting-started/client-side/): descargar, abrir, imprimir u obtener un Blob.

Ambos entornos usan la misma [definiciÃ³n del documento](/docs/0.3/es/document-definition-object/). Los mÃ©todos de salida devuelven Promises. La carga de fuentes es distinta entre archivos de Node y contenedores de fuentes del navegador.

## Antes de empezar

Usa la documentaciÃ³n correspondiente a la versiÃ³n instalada (`npm ls pdfmake`). Empieza con un ejemplo mÃ­nimo antes de aÃ±adir fuentes personalizadas, imÃ¡genes remotas o distribuciones de tablas. Para aplicaciones 0.1/0.2, sigue la [guÃ­a de migraciÃ³n](/docs/0.3/es/migration-from-0.1/).

## JavaScript y TypeScript

Esta rama de desarrollo incluye declaraciones TypeScript propias con la biblioteca y separa las API de Node y navegador. Para el paquete construido localmente, instala TypeScript sin `@types/pdfmake`. El paquete npm publicado 0.3.13 aún necesita sus tipos comunitarios correspondientes; las declaraciones nativas y la validación previa descritas aquí todavía no están publicadas. El compilador comprobado es TypeScript 5.9.3.

```sh
npm install pdfmake@0.3.13
npm install --save-dev typescript@~5.9.3
```

Node.js: guarda este ejemplo como `document.mts`. `NodeNext` permite al compilador seguir la resoluciÃ³n real de Node. Un archivo CommonJS `.cts` puede empezar con `import pdfmake = require("pdfmake")`. Evita depender de imports de ejecuciÃ³n con nombre.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true
  }
}
```

**JavaScript**

```js
import pdfmake from 'pdfmake';
import { strict as assert } from 'node:assert';
pdfmake.addFonts({ Helvetica: { normal: 'Helvetica', bold: 'Helvetica-Bold', italics: 'Helvetica-Oblique', bolditalics: 'Helvetica-BoldOblique' } });
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(name => name.startsWith('Helvetica'));
const definition = { content: [{ table: { body: [['ESM', 'TypeScript'], ['Promise', 'Output']] } }], defaultStyle: { font: 'Helvetica' } };
const buffer = await pdfmake.createPdf(definition).getBuffer();
assert.equal(buffer.subarray(0, 5).toString(), '%PDF-');
```

**TypeScript**

```ts
import pdfmake from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces.js';
import { strict as assert } from 'node:assert';

pdfmake.addFonts({ Helvetica: { normal: 'Helvetica', bold: 'Helvetica-Bold', italics: 'Helvetica-Oblique', bolditalics: 'Helvetica-BoldOblique' } });
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(name => name.startsWith('Helvetica'));
const definition: TDocumentDefinitions = { content: [{ table: { body: [['ESM', 'TypeScript'], ['Promise', 'Output']] } }], defaultStyle: { font: 'Helvetica' } };
const buffer: Buffer = await pdfmake.createPdf(definition).getBuffer();
assert.equal(buffer.subarray(0, 5).toString(), '%PDF-');
```

Con un bundler para el navegador, importa el punto de entrada precompilado y registra directamente el VFS. Usa `module: "ESNext"` y `moduleResolution: "Bundler"`; estas opciones requieren un bundler y no sirven para ejecutar la salida directamente en Node.

**JavaScript**

```js
import pdfmake from 'pdfmake/build/pdfmake.js';
import vfs from 'pdfmake/build/vfs_fonts.js';
pdfmake.addVirtualFileSystem(vfs);
const definition = { content: [{ text: 'TypeScript browser bundler', bold: true }] };
export async function render() {
    return pdfmake.createPdf(definition).getBlob();
}
```

**TypeScript**

```ts
import pdfmake from 'pdfmake/build/pdfmake.js';
import vfs from 'pdfmake/build/vfs_fonts.js';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

pdfmake.addVirtualFileSystem(vfs);
const definition = { content: [{ text: 'TypeScript browser bundler', bold: true }] } satisfies TDocumentDefinitions;
export async function render(): Promise<Blob> {
  return pdfmake.createPdf(definition).getBlob();
}
```

Los tipos ofrecen autocompletado y comprobaciones al compilar. No validan JSON externo ni garantizan el diseño. Las declaraciones incluidas distinguen `write` en Node de `getBlob`, `download`, `open` y `print` en el navegador. Usa imports explícitos del navegador con bundlers. El playground y los ejemplos integrados comprueban TypeScript localmente antes del renderizado. Consulta la [validación de documentos](/docs/0.3/es/guides/errors/) para las comprobaciones en ejecución.
