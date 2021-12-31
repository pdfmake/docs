+++
title = "via Virtual file system (VFS)"
description = ""
weight = 15
alwaysopen = true
+++

{{% alert theme="info" %}}This article is only for **client-side usage** (in browser)! For server-side use **real font files**.{{% /alert %}}

## TL;DR

pdfmake uses a 2nd file: `vfs_fonts.js` for fonts (and other files) you wish to embed into your generated PDFs.

When you run command `node build-vfs.js "./examples/fonts"` in the pdfmake package directory a new `build/vfs_fonts.js` file is created containing an **embedded copy** of all files from the local `examples/fonts` subdirectory (in a key/value object `pdfMake.vfs`).

# Detailed Instructions

To use custom fonts, 3 steps are required:

1. create a new `vfs_fonts.js` file containing your font files
1. assign `pdfMake.fonts` in your javascript
1. specify the font in your doc-definition


## 1. create a new `vfs_fonts.js` containing your font files

* Install pdfmake `npm install pdfmake`
* Go to package directory `./node_modules/pdfmake/`
* Create the `examples/fonts` subdirectory in your pdfmake code directory, if it doesn't already exist.
* Copy your fonts (and other files you wish to embed) into the `examples/fonts` subdirectory.
* Run command `node build-vfs.js "./examples/fonts"`. Or run `node build-vfs.js` to show help.
* Include your new **build/vfs_fonts.js** file in your code (in the same way you include `pdfmake.js` or `pdfmake.min.js`).

The above steps embeds **all** files from `examples/fonts` (into a local key/value variable `pdfMake.vfs`) - not only fonts. Which means you could put images in there, run `node build-vfs.js "./examples/fonts`, and reference them by filename in your doc-definition object.

You don't need to reference the files in ```examples/fonts``` anymore because all files have been copied to the `vfs_fonts.js`.

Other ways:

* [Building font file via shell script](/docs/0.3/fonts/custom-fonts-client-side/vfs/shell/)
* [Building font file via PHP script](/docs/0.3/fonts/custom-fonts-client-side/vfs/php/)

## 2. assign `pdfMake.fonts` in your javascript

In your code, before calling `pdfMake.createPdf(docDefinition)` set `pdfMake.fonts` as in the example below (notice we don't specify paths, just filenames):

```javascript
pdfMake.fonts = {
  yourFontName: {
    normal: 'fontFile.ttf',
    bold: 'fontFile2.ttf',
    italics: 'fontFile3.ttf',
    bolditalics: 'fontFile4.ttf'
  },
  anotherFontName: {
    (...)
  },

  // example of usage fonts in collection
  PingFangSC: {
    normal: ['pingfang.ttc', 'PingFangSC-Regular'],
    bold: ['pingfang.ttc', 'PingFangSC-Semibold'],
  }
}
```

The keys defined here will be used as font names in your doc-definition styles.

Each font-family defines 4 properties: normal, bold, italics and bolditalics referring to appropriate files (the ones you embedded from `examples/fonts/`). You should define all 4 components (even if they all point to the same font file).

By default pdfmake uses the following font structure:

```javascript
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
};
```

Alternatively, instead of changing the global value, you can pass the `fonts` object directly to `createPdf`:

```javascript
pdfMake.createPdf(docDefinition, null, fonts)

// The full signature of createPdf looks like this.
// tableLayouts, fonts and vfs are all optional - falsy values will cause
// pdfMake.tableLayouts, pdfMake.fonts or pdfMake.vfs to be used.
pdfMake.createPdf(docDefinition, tableLayouts, fonts, vfs)
```

## 3. specify the font in your doc-definition

pdfMake uses 'Roboto' as default font, so in order to use your font, you should specify it in your doc-definition object.

The easiest way is to set it globally in the **defaultStyle**

```javascript
var docDefinition = {
  content: (...),
  defaultStyle: {
    font: 'yourFontName'
  }
}
```
