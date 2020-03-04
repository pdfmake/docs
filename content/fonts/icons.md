+++
title = "Icons"
description = ""
weight = 15
alwaysopen = true
+++

- make a font at http://fontello.com/ or something and download it

- from font file (for example .ttf) create vfs_fonts.js file (see how to [use custom fonts](/docs/fonts/custom-fonts-client-side/#1-create-a-new-vfs-fonts-js-containing-your-font-files))

- define font in js (just defining normal might be enough):
    ```js
    pdfMake.fonts = {
        Fontello: {
            normal: 'fontello.ttf',
            bold: 'fontello.ttf',
            italics: 'fontello.ttf',
            bolditalics: 'fontello.ttf'
        }
    }
    ```

- add a style for icons:
`            icon: {
                font: 'Fontello'
            }`
- make a text paragraph:
`
            { text: '', style: 'icon' }, //icon wifi`
- as the text you copy from the fontello-codes.css from the comments (not the escaped value)

---

If you need an icon within text, you need to nest text objects:

```
    text: [
        { text: '', style: 'icon' }, //icon gift
        " my present"
    ]
```
this puts out: "[gift icon] my present"
