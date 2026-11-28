+++
sourceDigest = "bea37c79f0184516d0fe4a72f5f5c7b3dfb11fa1b76e3eb1d2b51e41c2128cb2"
title = "Fuentes personalizadas con VFS"
description = "Crea un sistema de archivos virtual para fuentes fuera de node_modules, registra variantes de fuente y usa una familia personalizada en los PDF del navegador."
weight = 15
+++

## Crear el contenedor de fuentes

Usa archivos de fuentes con licencia que cubran los idiomas de destino. Colócalos en el directorio `fonts/` de la aplicación y genera un archivo VFS desde la raíz del proyecto:

```sh
node node_modules/pdfmake/build-vfs.js ./fonts ./vfs_fonts.js
```

Esto incrusta **todos los archivos** del directorio proporcionado como entradas Base64. Mantén los recursos generados de la aplicación fuera de `node_modules` para que una instalación no sobrescriba tus fuentes personalizadas. Vuelve a generar el VFS cada vez que cambien los archivos de fuente. El VFS del navegador no es necesario para las [rutas de fuentes normales de Node](/docs/0.3/es/fonts/).

## Cargar y registrar

Carga el motor antes del script VFS generado. El script generado registra sus archivos cuando `pdfMake` ya está disponible. En un empaquetador, importa el objeto VFS y llama explícitamente a `addVirtualFileSystem`:

```js
import pdfMake from 'pdfmake/build/pdfmake';
import customVfs from './vfs_fonts';

pdfMake.addVirtualFileSystem(customVfs);
pdfMake.addFonts({
  MyFont: {
    normal: 'MyFont-Regular.ttf',
    bold: 'MyFont-Bold.ttf',
    italics: 'MyFont-Italic.ttf',
    bolditalics: 'MyFont-BoldItalic.ttf'
  }
});

await pdfMake.createPdf({
  defaultStyle: { font: 'MyFont' },
  content: ['A document using my font.']
}).download('document.pdf');
```

Sustituye estos nombres por las claves exactas del VFS generado. Los nombres de familias de fuente como `MyFont` se usan en los estilos; las claves de archivo identifican los archivos incrustados. Define cada variante que uses. Puedes asignar varias variantes a un solo archivo si es intencional, pero eso no crea una variante real en negrita o cursiva.

## Colecciones de fuentes

Para una colección TrueType compatible, el descriptor puede ser `[filename, faceName]`:

```js
pdfMake.addFonts({
  PingFangSC: {
    normal: ['pingfang.ttc', 'PingFangSC-Regular'],
    bold: ['pingfang.ttc', 'PingFangSC-Semibold']
  }
});
```

Incrusta la colección y usa nombres de variantes válidos. Este ejemplo solo registra normal y negrita; añade las variantes cursivas antes de usarlas.

## Errores frecuentes

Si no se encuentra un archivo, compara el nombre del descriptor con las claves del VFS generado. Si una fuente no está definida, compara `defaultStyle.font` con el mapa de familias. Si faltan caracteres, comprueba la cobertura de glifos de la fuente. Si el paquete del navegador es grande, elimina del directorio de entrada VFS las familias y los archivos que no uses.
