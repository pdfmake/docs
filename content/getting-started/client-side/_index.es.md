+++
sourceDigest = "7427dae21c26c2f61d3836ce87ed99ce36fd9d5558ac2b6d0e6b7a7570fd7a83"
title = "Inicio rápido en el navegador"
description = "Carga pdfmake 0.3 y su paquete de fuentes y descarga un PDF mediante una acción del usuario."
weight = 11
+++

## Instalar y copiar los recursos del navegador

```sh
npm install pdfmake@0.3.13
```

Copia `node_modules/pdfmake/build/pdfmake.min.js` y `node_modules/pdfmake/build/vfs_fonts.js` junto a este archivo HTML. Sirve el directorio con tu servidor de desarrollo local.

## Generar un PDF

```html
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>My first PDF</title></head>
<body>
  <button id="download" type="button">Download PDF</button>
  <p id="status" role="status"></p>
  <script src="./pdfmake.min.js"></script>
  <script src="./vfs_fonts.js"></script>
  <script>
    document.querySelector('#download').addEventListener('click', async () => {
      try {
        await pdfMake.createPdf({ content: ['Hello from the browser!'] }).download('hello.pdf');
        document.querySelector('#status').textContent = 'PDF prepared';
      } catch (error) {
        document.querySelector('#status').textContent = 'PDF generation failed';
        console.error(error);
      }
    });
  </script>
</body>
</html>
```

Carga el motor **antes** del paquete de fuentes. `vfs_fonts.js` proporciona los archivos de la fuente Roboto predeterminada. Este ejemplo no requiere una API de renderizado en el servidor. Si la Promise de `download()` se resuelve, significa que se inició la descarga; no confirma que el usuario guardase el archivo.

## Usar un empaquetador

```js
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.addVirtualFileSystem(pdfFonts);
await pdfMake.createPdf({ content: ['Bundled application'] }).download('document.pdf');
```

Este código se ejecuta dentro del módulo de la aplicación o de un controlador de eventos asíncrono. Si usas un marco SSR, mantén las importaciones fuera de la ejecución exclusiva del servidor. Para TypeScript, utiliza declaraciones compatibles con la versión de pdfmake instalada; los tipos no hacen que un entorno de ejecución anterior admita la API 0.3.

## Abrir e imprimir

Llama a `open()` o `print()` como respuesta a un gesto del usuario para evitar que el navegador bloquee ventanas emergentes. Si primero cargas datos, abre una ventana de forma síncrona y pásala después al método de salida. Consulta los [métodos del navegador](/docs/0.3/es/getting-started/client-side/methods/).

## Pasos siguientes

[Fuentes personalizadas](/docs/0.3/es/fonts/custom-fonts-client-side/) · [Métodos del navegador](/docs/0.3/es/getting-started/client-side/methods/) · [Solución de problemas](/docs/0.3/es/guides/troubleshooting/)
