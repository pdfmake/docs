+++
title = "QR code"
description = ""
weight = 292
alwaysopen = true
+++

```js
var docDefinition = {
  content: [
    // basic usage
    { qr: 'text in QR' },

    // colored QR
    { qr: 'text in QR', foreground: 'red', background: 'yellow' },
  ]
}
```

Properties:

* _qr_ - text in QR code
* _foreground_ (optional) -
* _background_ (optional) -
* _fit_ (optional) -
* _version_ (optional) -
* _eccLevel_ (optional, default L) - possible values: L, M, Q, H
* _mode_ (optional) - possible values: numeric, alphanumeric, octet
* _mask_ (optional) -
