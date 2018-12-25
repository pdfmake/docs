+++
title = "Client-side"
description = ""
weight = 11
alwaysopen = true
+++

To begin in browser with the default configuration, you should include two files:

* **pdfmake.min.js**,
* **vfs_fonts.js** - default font definition (it contains Roboto, you can however [use custom fonts instead](https://github.com/bpampuch/pdfmake/wiki/Custom-Fonts---client-side))

```html
<!doctype html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <title>my first pdfmake example</title>
  <script src='build/pdfmake.min.js'></script>
  <script src='build/vfs_fonts.js'></script>
</head>
<body>
...
```

You can get both files:

* using cdnjs:
 * https://cdnjs.com/libraries/pdfmake
* using bower:
 * ```
   bower install pdfmake
   ```
* using npm (primarily server-side):
 * ```
   npm install pdfmake
   ```
   `require('pdfmake/build/pdfmake.js');` and `require('pdfmake/build/vfs_fonts.js');`

or copy them directly from the build directory from the repository. Otherwise you can always [build it from sources](https://github.com/bpampuch/pdfmake#building-from-sources).

#### Supported browsers

See [issue](https://github.com/bpampuch/pdfmake/issues/800).