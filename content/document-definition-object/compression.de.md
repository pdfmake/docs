+++
title = "Komprimierung"
description = "Steuere die Komprimierung von PDF-Datenströmen mit dem Dokumentfeld compress; standardmäßig ist sie aktiviert."
weight = 2280
sourceDigest = "92de3279ae232bb95314ce206d2d5914ca81723e46208aabd408dce25d90db55"
+++

## Standardverhalten

PDF-Datenströme werden standardmäßig komprimiert. So deaktivierst du die Komprimierung zur Überprüfung:

```js
var docDefinition = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

`compress` ist ein boolesches Feld der Dokumentdefinition und gehört nicht zum Optionsobjekt von `createPdf`. Wenn du die Komprimierung deaktivierst, wird die Ausgabedatei in der Regel größer. Eingebettete Schriften oder Bilddaten werden dadurch nicht entfernt; auch der für das Layout benötigte Speicher wird nicht reduziert. Hinweise zur Messung findest du unter [Leistung](/docs/0.3/de/guides/performance/).
