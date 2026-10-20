+++
sourceDigest = "1faae2f9f0ec8989f3aac23e9c10b8b8c91998d2830d52b4558b2ff3f8beafe9"
title = "Código QR"
description = "Configura códigos QR en pdfmake 0.3 con ejemplos, opciones y notas de uso."
weight = 2220
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
    { qr: 'text in QR', fit: 500 },
  ]
}
```

Propiedades:

* `qr`: `string`, texto del código QR
* `foreground`: `string` (opcional, valor predeterminado: negro), color del primer plano
* `background`: `string` (opcional, valor predeterminado: blanco), color del fondo
* `fit`: `integer` (opcional), tamaño al que ajustar la imagen QR de salida
* `version`: `integer` (opcional), versión del código QR entre 1 y 40 (para más detalles, consulta [Wikipedia](https://en.wikipedia.org/wiki/QR_code#Storage))
* `eccLevel`: `string` (opcional, valor predeterminado: L), capacidad de corrección de errores (para más detalles, consulta [Wikipedia](https://en.wikipedia.org/wiki/QR_code#Error_correction)); valores posibles:
  * _L_: nivel L (bajo), se puede recuperar aproximadamente el 7 % de las palabras de código
  * _M_: nivel M (medio), se puede recuperar aproximadamente el 15 % de las palabras de código
  * _Q_: nivel Q (cuartil), se puede recuperar aproximadamente el 25 % de las palabras de código
  * _H_: nivel H (alto), se puede recuperar aproximadamente el 30 % de las palabras de código
* `mode`: `string` (opcional), modo de codificación; valores posibles: _numeric_, _alphanumeric_, _octet_ (para más detalles, consulta [Wikipedia](https://en.wikipedia.org/wiki/QR_code#Storage))
* `mask`: `integer` (opcional), patrón de máscara, intervalo de 0 a 7 (para más detalles, consulta [Wikipedia](https://en.wikipedia.org/wiki/QR_code#Encoding))
