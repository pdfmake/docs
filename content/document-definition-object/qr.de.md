+++
title = "QR-Code"
description = "Erzeuge QR-Codes in pdfmake 0.3 und passe Farbe, Größe, Version, Fehlerkorrektur, Kodierung und Maskenmuster an."
weight = 2220
alwaysopen = true
sourceDigest = "1faae2f9f0ec8989f3aac23e9c10b8b8c91998d2830d52b4558b2ff3f8beafe9"
+++

```js
var docDefinition = {
  content: [
    // basic usage
    { qr: 'text in QR' },

    // colored QR
    { qr: 'text in QR', foreground: 'red', background: 'yellow' },

    // resized QR
    { qr: 'text in QR', fit: 500 },
  ]
}
```

Eigenschaften:

* `qr`: `string` – Text im QR-Code
* `foreground`: `string` (optional, Standard schwarz) – Vordergrundfarbe
* `background`: `string` (optional, Standard weiß) – Hintergrundfarbe
* `fit`: `integer` (optional) – Größe des ausgegebenen QR-Bildes anpassen
* `version`: `integer` (optional) – QR-Version von 1 bis 40 (Details siehe [wikipedia.org](https://en.wikipedia.org/wiki/QR_code#Storage))
* `eccLevel`: `string` (optional, Standard L) – Fehlerkorrekturstufe (Details siehe [wikipedia.org](https://en.wikipedia.org/wiki/QR_code#Error_correction)); mögliche Werte:
  * _L_ – Stufe L (niedrig), ungefähr 7 % der Codewörter können wiederhergestellt werden
  * _M_ – Stufe M (mittel), ungefähr 15 % der Codewörter können wiederhergestellt werden
  * _Q_ – Stufe Q (Quartil), ungefähr 25 % der Codewörter können wiederhergestellt werden
  * _H_ – Stufe H (hoch), ungefähr 30 % der Codewörter können wiederhergestellt werden
* `mode`: `string` (optional) – Kodierungsmodus; mögliche Werte: _numeric_, _alphanumeric_, _octet_ (Details siehe [wikipedia.org](https://en.wikipedia.org/wiki/QR_code#Storage))
* `mask`: `integer` (optional) – Maskenmuster von 0 bis 7 (Details siehe [wikipedia.org](https://en.wikipedia.org/wiki/QR_code#Encoding))
