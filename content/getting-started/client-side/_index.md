+++
title = "Client-side"
description = ""
weight = 11
alwaysopen = true
+++

To begin in browser with the default configuration, you should include two files:

* **pdfmake.min.js**,
* **vfs_fonts.js** - default font definition (it contains Roboto, you can however [use custom fonts instead](/docs/0.3/fonts/custom-fonts-client-side/))

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

### Library sources

#### cdnjs

https://cdnjs.com/libraries/pdfmake

#### npm

```
npm install pdfmake@0.3.0-beta.1
```

Files for client-side is available here:

* `require('pdfmake/build/pdfmake.js');`
* `require('pdfmake/build/vfs_fonts.js');`

Using javascript frameworks:

```js
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.addVirtualFileSystem(pdfFonts);
```

or

```js
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.addVirtualFileSystem(pdfFonts);
```

TypeScript:

```js
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);
```

For Ionic and Angular see [issue](https://github.com/bpampuch/pdfmake/issues/1030).

If a **Cannot read property 'TYPED_ARRAY_SUPPORT' of undefined** error is thrown, add this to webpack config:
```
exclude: [ /node_modules/, /pdfmake.js$/ ]
```
(see [issue](https://github.com/bpampuch/pdfmake/issues/1100#issuecomment-336728521))


#### Repository

Copy them directly from the build directory from the repository. Otherwise you can always [build it version 0.3.x from sources](https://github.com/bpampuch/pdfmake#building-from-sources).
