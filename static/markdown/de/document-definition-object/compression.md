# Komprimierung

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/document-definition-object/compression/

## Standardverhalten

PDF-Datenströme werden standardmäßig komprimiert. So deaktivierst du die Komprimierung zur Überprüfung:

**JavaScript**

```js
var docDefinition = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

`compress` ist ein boolesches Feld der Dokumentdefinition und gehört nicht zum Optionsobjekt von `createPdf`. Wenn du die Komprimierung deaktivierst, wird die Ausgabedatei in der Regel größer. Eingebettete Schriften oder Bilddaten werden dadurch nicht entfernt; auch der für das Layout benötigte Speicher wird nicht reduziert. Hinweise zur Messung findest du unter [Leistung](/docs/0.3/de/guides/performance/).
