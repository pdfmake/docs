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

    // resized QR
    { qr: 'text in QR', fit: '500' },
  ]
}
```

Properties:

* `qr`: `string` - text in QR code
* `foreground`: `string` (optional, default black) - foreground color
* `background`: `string` (optional, default white) - background color
* `fit`: `integer` (optional) - fit the output QR image
* `version`: `integer` (optional) - QR version range from 1 to 40 (for details see [wikipedia.org](https://en.wikipedia.org/wiki/QR_code#Storage)
* `eccLevel`: `string` (optional, default L) - error correction capability (for details see [wikipedia.org](https://en.wikipedia.org/wiki/QR_code#Error_correction)), possible values:
  * _L_ - Level L (Low), approx 7% of codewords can be restored
  * _M_ - Level M (Medium), approx 15% of codewords can be restored
  * _Q_ - Level Q (Quartile), approx 25% of codewords can be restored
  * _H_ - Level H (High), approx 30% of codewords can be restored
* `mode`: `string` (optional) - encoding mode, possible values: _numeric_, _alphanumeric, octet_ (for details see [wikipedia.org](https://en.wikipedia.org/wiki/QR_code#Storage))
* `mask`: `integer` (optional) - mask pattern, range from 0 to 7 (for details see [wikipedia.org](https://en.wikipedia.org/wiki/QR_code#Encoding))
