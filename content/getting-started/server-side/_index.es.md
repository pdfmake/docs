+++
sourceDigest = "8cca67c7aaa82929be7388e0f7844c6250300ff14631cb12f266686f1cae3789"
title = "Inicio rápido con Node.js"
description = "Crea un archivo PDF completo en Node.js con pdfmake 0.3, fuentes estándar y salida basada en Promise."
weight = 12
+++

## Instalar

Usa Node.js **20 o posterior**. Crea una aplicación e instala pdfmake:

```sh
npm init -y
npm install pdfmake@0.3.12
```

La versión exacta hace que el ejemplo sea reproducible. Revisa las notas de la versión y prueba antes de elegir un parche más reciente.

## Escribir tu primer PDF

Guarda este ejemplo completo como `first-pdf.cjs` y ejecútalo con `node first-pdf.cjs`.

```js
// docs-test: node-quickstart
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

`write()` se resuelve cuando el archivo de salida está cerrado. Gestiona el rechazo de las Promises para que un error de generación no produzca en silencio una respuesta de API correcta.

Helvetica no necesita archivos de fuentes locales, por lo que el ejemplo deniega las URL externas y permite solo los identificadores de las fuentes estándar mediante la política local. La implementación actual comprueba estos identificadores aunque no sean rutas de archivo. Las fuentes estándar tienen cobertura de caracteres limitada. Para documentos multilingües, [registra archivos de fuentes adecuados](/docs/0.3/es/fonts/) y permite explícitamente sus rutas resueltas.

## Devolver bytes PDF desde una API

```js
const buffer = await pdfmake.createPdf({
  defaultStyle: { font: 'Helvetica' },
  content: ['API document']
}).getBuffer();

// Adapt these lines to your HTTP framework:
response.setHeader('Content-Type', 'application/pdf');
response.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
response.end(buffer);
```

Este fragmento supone que `pdfmake` está configurado como se indicó antes y que `response` es el objeto de respuesta de tu marco de trabajo. Valida los datos de la solicitud antes de construir una definición. Crea una definición nueva por solicitud; la maquetación la modifica.

## Aplicaciones ESM

El paquete Node exporta un singleton configurado. En una aplicación ESM, usa `import pdfmake from 'pdfmake'`; no lo instancies con `new PdfPrinter(...)` como en los ejemplos antiguos. Registra las fuentes y las políticas una vez al iniciar la aplicación. Evita cambiar la configuración del singleton por cada solicitud simultánea.

## Pasos siguientes

[Métodos de salida](/docs/0.3/es/getting-started/server-side/methods/) · [Acceso a recursos](/docs/0.3/es/guides/resource-security/) · [Receta para una factura](/docs/0.3/es/guides/invoice/)
