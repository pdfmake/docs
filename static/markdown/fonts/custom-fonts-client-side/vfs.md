# Custom fonts with VFS

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/fonts/custom-fonts-client-side/vfs/

## Build the font container

Use licensed font files that cover your target languages. Place them in your application's `fonts/` directory and generate a VFS file from your project root:

```sh
node node_modules/pdfmake/build-vfs.js ./fonts ./vfs_fonts.js
```

This embeds **all files** in the supplied directory as base64 entries. Keep generated application assets outside `node_modules` so an install cannot overwrite your custom fonts. Rebuild the VFS whenever the font files change. Browser VFS is unnecessary for normal [Node font paths](/docs/0.3/fonts/).

## Load and register

Load the engine before your generated VFS script. The generated script registers its files when `pdfMake` is already available. In a bundler, import the VFS object and call `addVirtualFileSystem` explicitly:

**JavaScript**

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

**TypeScript**

```ts
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

Replace these names with the exact keys in your generated VFS. Font family names such as `MyFont` are the names you use in styles; file keys identify embedded files. Define every variant you use. You can map multiple variants to one file when that is intentional, but this does not create a real bold or italic face.

## Font collections

For a supported TrueType collection, a descriptor can be `[filename, faceName]`:

**JavaScript**

```js
pdfMake.addFonts({
  PingFangSC: {
    normal: ['pingfang.ttc', 'PingFangSC-Regular'],
    bold: ['pingfang.ttc', 'PingFangSC-Semibold']
  }
});
```

**TypeScript**

```ts
pdfMake.addFonts({
  PingFangSC: {
    normal: ['pingfang.ttc', 'PingFangSC-Regular'],
    bold: ['pingfang.ttc', 'PingFangSC-Semibold']
  }
});
```

Embed the collection and use valid face names. This example registers normal and bold only; add italic variants before using them.

## Common failures

If a file cannot be found, compare the descriptor filename to the generated VFS keys. If a font is undefined, compare `defaultStyle.font` to the family map. If characters are missing, test the font's glyph coverage. If the browser bundle is large, remove unused families and files from the VFS input directory.
