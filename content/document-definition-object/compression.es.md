+++
sourceDigest = "92de3279ae232bb95314ce206d2d5914ca81723e46208aabd408dce25d90db55"
title = "Compresión"
description = "Controla la compresión de los flujos PDF mediante el indicador compress del documento, activado de forma predeterminada."
weight = 2280
+++

## Comportamiento predeterminado

La compresión de los flujos PDF está activada de forma predeterminada. Para desactivarla durante una inspección:

```js
var docDefinition = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

`compress` es un campo de la definición del documento, no del objeto de opciones de `createPdf`. Al desactivarlo, el tamaño de salida suele aumentar. No elimina la incrustación de fuentes ni los datos de imagen, y no sirve para reducir la memoria de maquetación. Consulta [rendimiento](/docs/0.3/es/guides/performance/) para obtener indicaciones sobre cómo medirlo.
