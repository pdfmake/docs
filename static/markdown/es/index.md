# Resumen

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/

Crea un PDF en tres pasos: configura el entorno, describe el contenido y solicita una salida.

## 1. Elige el entorno




Usa Node.js 20 o posterior. Instala la versión fija indicada, guarda el ejemplo completo como `first-pdf.cjs` y ejecuta `node first-pdf.cjs`.

```sh
npm install pdfmake@0.3.13
```

**JavaScript**

```js
const pdfmake = require('pdfmake');

const fonts = require('pdfmake/standard-fonts/Helvetica');
pdfmake.addFonts(fonts);
pdfmake.setUrlAccessPolicy(() => false);
const standardNames = new Set(Object.values(fonts.Helvetica));
pdfmake.setLocalAccessPolicy(name => standardNames.has(name));

async function main() {
  const definition = {
    defaultStyle: { font: 'Helvetica' },
    content: [
      { text: 'Hello, pdfmake!', fontSize: 24, bold: true },
      'Your first PDF, generated in Node.js.'
    ]
  };
  await pdfmake.createPdf(definition).write('document.pdf');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfmake from "pdfmake";

const fonts = require('pdfmake/standard-fonts/Helvetica');
pdfmake.addFonts(fonts);
pdfmake.setUrlAccessPolicy(() => false);
const standardNames = new Set(Object.values(fonts.Helvetica));
pdfmake.setLocalAccessPolicy(name => standardNames.has(name));

async function main() {
  const definition: TDocumentDefinitions = {
    defaultStyle: { font: 'Helvetica' },
    content: [
      { text: 'Hello, pdfmake!', fontSize: 24, bold: true },
      'Your first PDF, generated in Node.js.'
    ]
  };
  await pdfmake.createPdf(definition).write('document.pdf');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
```

[Inicio rápido con Node.js](/docs/0.3/es/getting-started/server-side/)




El navegador necesita el motor y después las fuentes. La guía completa incluye un botón de descarga y gestión de errores.

[Inicio rápido en el navegador](/docs/0.3/es/getting-started/client-side/)



## 2. Entiende la definición

Una definición es un objeto JavaScript, no HTML. `content` enumera bloques en orden de lectura. Este ejemplo genera exactamente el PDF mostrado. Modifícalo en el playground y vuelve aquí sin perder tu espacio de trabajo.



### Runnable example: 01 · First document

**JavaScript**

```js
// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd: TDocumentDefinitions = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/es/playground/?example=welcome)



## 3. Elige el siguiente elemento

- [Tu primer PDF](/docs/0.3/es/learn/first-pdf/)
- [El modelo de documento](/docs/0.3/es/learn/document-model/)
- [Estilos y formato](/docs/0.3/es/document-definition-object/styling/)
- [Tablas](/docs/0.3/es/document-definition-object/tables/)
- [Fuentes y caracteres](/docs/0.3/es/fonts/)
- [Reconocer y gestionar errores](/docs/0.3/es/guides/errors/)

Usa una definición nueva para cada generación porque la composición modifica el objeto. Las salidas devuelven Promises: espéralas con `await` y gestiona errores.
