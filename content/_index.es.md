+++
title = "Resumen"
description = "Crea PDF con pdfmake 0.3: guías paso a paso, ejemplos ejecutables y referencia para aplicaciones JavaScript."
weight = 0
sourceDigest = "3be141146a4c948512e50597ef37f878749e249c98a65a0af17c20b1e7cc62b3"
+++

Crea un PDF en tres pasos: configura el entorno, describe el contenido y solicita una salida.

## 1. Elige el entorno

<div class="runtime-picker" data-runtime-picker role="tablist" aria-label="Runtime"><button type="button" role="tab" id="runtime-node" aria-controls="panel-node" data-runtime="node" aria-selected="true">Node.js / API</button><button type="button" role="tab" id="runtime-browser" aria-controls="panel-browser" data-runtime="browser" aria-selected="false">Navegador</button></div>
<div data-runtime-panel="node" role="tabpanel" id="panel-node" aria-labelledby="runtime-node">

Usa Node.js 20 o posterior. Instala la versión fija indicada, guarda el ejemplo completo como `first-pdf.cjs` y ejecuta `node first-pdf.cjs`.

```sh
npm install pdfmake@0.3.13
```

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

[Inicio rápido con Node.js](/docs/0.3/es/getting-started/server-side/)

</div>
<div data-runtime-panel="browser" role="tabpanel" id="panel-browser" aria-labelledby="runtime-browser">

El navegador necesita el motor y después las fuentes. La guía completa incluye un botón de descarga y gestión de errores.

[Inicio rápido en el navegador](/docs/0.3/es/getting-started/client-side/)

</div>

## 2. Entiende la definición

Una definición es un objeto JavaScript, no HTML. `content` enumera bloques en orden de lectura. Este ejemplo genera exactamente el PDF mostrado. Modifícalo en el playground y vuelve aquí sin perder tu espacio de trabajo.

{{< example id="welcome" >}}

## 3. Elige el siguiente elemento

- [Tu primer PDF](/docs/0.3/es/learn/first-pdf/)
- [El modelo de documento](/docs/0.3/es/learn/document-model/)
- [Estilos y formato](/docs/0.3/es/document-definition-object/styling/)
- [Tablas](/docs/0.3/es/document-definition-object/tables/)
- [Fuentes y caracteres](/docs/0.3/es/fonts/)
- [Reconocer y gestionar errores](/docs/0.3/es/guides/errors/)

Usa una definición nueva para cada generación porque la composición modifica el objeto. Las salidas devuelven Promises: espéralas con `await` y gestiona errores.
