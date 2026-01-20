+++
title = "Client-side"
description = ""
weight = 11
alwaysopen = true
+++

To begin in browser with the default configuration, you should include two files:

* **pdfmake.min.js**,
* **vfs_fonts.js** - default font definition (it contains Roboto, you can however [use custom fonts instead](/docs/0.1/fonts/custom-fonts-client-side/))

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

* [https://app.unpkg.com/pdfmake](https://app.unpkg.com/pdfmake@0.2/files/build)
  * Version 0.2:
  * `https://unpkg.com/pdfmake@0.2/build/pdfmake.min.js`
  * `https://unpkg.com/pdfmake@0.2/build/vfs_fonts.js`
  * Version 0.1:
  * `https://unpkg.com/pdfmake@0.1/build/pdfmake.min.js`
  * `https://unpkg.com/pdfmake@0.1/build/vfs_fonts.js`
* [https://www.jsdelivr.com/package/npm/pdfmake](https://www.jsdelivr.com/package/npm/pdfmake?tab=files&path=build)
  * Version 0.2:
  * `https://cdn.jsdelivr.net/npm/pdfmake@0.2/build/pdfmake.min.js`
  * `https://cdn.jsdelivr.net/npm/pdfmake@0.2/build/vfs_fonts.js`
  * Version 0.1:
  * `https://cdn.jsdelivr.net/npm/pdfmake@0.1/build/pdfmake.min.js`
  * `https://cdn.jsdelivr.net/npm/pdfmake@0.1/build/vfs_fonts.js`
* https://cdnjs.com/libraries/pdfmake (The service is currently unavailable.)

#### bower (deprecated)

```
bower install pdfmake
```

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

If you are using rollup, and a **Cannot read property 'pdfMake' of undefined at vfs_fonts.js** error is thrown, add this to rollup config:
```js
moduleContext: {
  './node_modules/pdfmake/build/vfs_fonts.js': 'window',
},
```
Then, if console outputs a **Illegal reassignment to import 'pdfMake'**, do not assign vfs manually, just import fonts like this:
```js
import 'pdfmake/build/vfs_fonts';
```

#### Composer

You can use asset-packagist.org service, see: [npm-asset/pdfmake](https://asset-packagist.org/package/npm-asset/pdfmake)

Example of composer.json:
```json
{
  "require": {
    "npm-asset/pdfmake": "^0.2.20"
  },
  "replace": {
    "npm-asset/pdfkit": "*",
    "npm-asset/linebreak": "*",
    "npm-asset/iconv-lite": "*",
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

Copy them directly from the build directory from the repository. Otherwise you can always build it from sources:
-  [instructions for version 0.2.x](https://github.com/bpampuch/pdfmake/tree/0.2#building-from-sources-version-02x)
-  [instructions for version 0.1.x](https://github.com/bpampuch/pdfmake/tree/0.1#building-from-sources-version-01x)
