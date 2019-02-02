+++
title = "Encryption and access privileges"
description = ""
weight = 296
alwaysopen = true
+++

```js
var docDefinition = {
  userPassword: '123',
  ownerPassword: '123456',
  permissions: {
    printing: 'highResolution', //'lowResolution'
    modifying: false,
    copying: false,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true
  },
  content: [
    '...'
  ]
};
```

Description is available [here](https://github.com/foliojs/pdfkit/blob/master/docs/getting_started.md#encryption-and-access-privileges).