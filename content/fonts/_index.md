+++
title = "Fonts and character coverage"
description = "Register font families and variants in Node.js or browsers, and choose fonts that cover your document languages."
weight = 25
+++

## Choose a font strategy

| Runtime | Font source | Setup |
| --- | --- | --- |
| Node.js | Real font files | `addFonts` with absolute paths |
| Node.js | Standard PDF fonts | `require('pdfmake/standard-fonts/Helvetica')` |
| Browser | Bundled Roboto VFS | Load `build/vfs_fonts.js` |
| Browser | Custom VFS or URLs | [Custom browser fonts](/docs/0.3/fonts/custom-fonts-client-side/) |

The default family is `Roboto`. Node.js does not automatically register its files. Every family should map `normal`, `bold`, `italics` and `bolditalics` to appropriate font data. A style selecting a missing variant can fail even if normal text works.

## Register local fonts in Node.js

This example assumes you have licensed font files in a `fonts` directory beside your CommonJS script:

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

The allowlist is appropriate for application-owned, immutable files. When paths come from untrusted users, also account for symlinks and filesystem permissions. Do not treat a string prefix such as `fonts/` as a secure boundary.

## Match text to glyph coverage

Standard fonts have limited encodings; they do not cover arbitrary Unicode. Choose embedded fonts with the glyphs your actual languages need. A Unicode string alone does not guarantee the selected font can render it. Verify representative characters and all bold/italic variants in generated PDFs.

pdfmake embeds fonts through PDFKit. Include only the browser font families you need; VFS data increases download and parse costs. Respect each font's redistribution and embedding license.

## Related guides

[Standard 14 fonts](/docs/0.3/fonts/standard-14-fonts/) · [Browser VFS](/docs/0.3/fonts/custom-fonts-client-side/vfs/) · [Font URLs](/docs/0.3/fonts/custom-fonts-client-side/url/) · [Troubleshooting](/docs/0.3/guides/troubleshooting/)
