+++
title = "Fuentes y caracteres"
description = "Selecciona y registra fuentes para pdfmake 0.3 que cubran los caracteres y las variantes necesarios en tus documentos."
weight = 25
sourceDigest = "62a4549bbe46519fb6f576d6cab99d9ed5fc071bddcfb1b77fa75f75df6e785b"
+++

## Elige una estrategia de fuentes

| Entorno | Origen de la fuente | Configuración |
| --- | --- | --- |
| Node.js | Archivos de fuente reales | `addFonts` con rutas absolutas |
| Node.js | Fuentes PDF estándar | `require('pdfmake/standard-fonts/Helvetica')` |
| Navegador | VFS de Roboto empaquetado | Carga `build/vfs_fonts.js` |
| Navegador | VFS personalizado o URL | [Fuentes personalizadas para navegador](/docs/0.3/es/fonts/custom-fonts-client-side/) |

La familia predeterminada es `Roboto`. Node.js no registra sus archivos automáticamente. Cada familia debe asignar datos de fuente adecuados a `normal`, `bold`, `italics` y `bolditalics`. Un estilo que seleccione una variante inexistente puede fallar aunque el texto normal se muestre bien.

## Registrar fuentes locales en Node.js

Este ejemplo supone que tienes archivos de fuentes con licencia en un directorio `fonts` junto al script CommonJS:

```js
const path = require('node:path');
const pdfmake = require('pdfmake');
const fonts = {
  Roboto: {
    normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, 'fonts/Roboto-MediumItalic.ttf')
  }
};
const allowed = new Set(Object.values(fonts.Roboto));
pdfmake.addFonts(fonts);
pdfmake.setLocalAccessPolicy(file => allowed.has(path.resolve(file)));
pdfmake.setUrlAccessPolicy(() => false);
```

La lista de permitidos es adecuada para archivos inmutables que pertenezcan a la aplicación. Si las rutas provienen de usuarios no confiables, ten también en cuenta los enlaces simbólicos y los permisos del sistema de archivos. No consideres seguro un prefijo de cadena como `fonts/`.

## Relacionar el texto con la cobertura de glifos

Las fuentes estándar tienen codificaciones limitadas; no cubren Unicode arbitrario. Elige fuentes incrustadas con los glifos necesarios para los idiomas de tus documentos. Una cadena Unicode por sí sola no garantiza que la fuente seleccionada pueda representarla. Comprueba en los PDF generados los caracteres representativos y todas las variantes de negrita/cursiva.

pdfmake incrusta fuentes mediante PDFKit. Incluye solo las familias de fuentes necesarias para el navegador; los datos VFS aumentan el coste de descarga y análisis. Respeta las licencias de redistribución e incrustación de cada fuente.

## Guías relacionadas

[Las 14 fuentes estándar](/docs/0.3/es/fonts/standard-14-fonts/) · [VFS del navegador](/docs/0.3/es/fonts/custom-fonts-client-side/vfs/) · [URL de fuentes](/docs/0.3/es/fonts/custom-fonts-client-side/url/) · [Solución de problemas](/docs/0.3/es/guides/troubleshooting/)
