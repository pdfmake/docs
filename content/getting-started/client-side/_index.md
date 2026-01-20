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

#### CDN

* [https://app.unpkg.com/pdfmake](https://app.unpkg.com/pdfmake@0.3/files/build)
  * `https://unpkg.com/pdfmake@0.3/build/pdfmake.min.js`   
  * `https://unpkg.com/pdfmake@0.3/build/vfs_fonts.js`   
* [https://www.jsdelivr.com/package/npm/pdfmake](https://www.jsdelivr.com/package/npm/pdfmake?tab=files&path=build)
  * `https://cdn.jsdelivr.net/npm/pdfmake@0.3/build/pdfmake.min.js`
  * `https://cdn.jsdelivr.net/npm/pdfmake@0.3/build/vfs_fonts.js`
* https://cdnjs.com/libraries/pdfmake (The service is currently unavailable.)
    
#### npm

```
npm install pdfmake
```

Files for client-side is available here:

* `require('pdfmake/build/pdfmake.js');`
* `require('pdfmake/build/vfs_fonts.js');`

Using javascript frameworks:

```js
var pdfMake = require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js');
```

or

```js
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.addVirtualFileSystem(pdfFonts);
```

or

```js
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
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


#### Composer

You can use asset-packagist.org service, see: [npm-asset/pdfmake](https://asset-packagist.org/package/npm-asset/pdfmake)

Example of composer.json:
```json
{
  "require": {
    "npm-asset/pdfmake": "^0.3.0"
  },
  "replace": {
    "npm-asset/pdfkit": "*",
    "npm-asset/linebreak": "*",
    "npm-asset/svg-to-pdfkit": "*",
    "npm-asset/xmldoc": "*"
  },
  "repositories": [
    {
      "type": "composer",
      "url": "https://asset-packagist.org"
    }
  ]
}
```

#### Repository

Copy them directly from the build directory from the repository. Otherwise you can always [build it version 0.3.x from sources](https://github.com/bpampuch/pdfmake#building-from-sources).
