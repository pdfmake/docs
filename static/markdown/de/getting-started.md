# Einrichtung

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/getting-started/

## Die Laufzeit entscheidet

- [Node.js](/docs/0.3/de/getting-started/server-side/): PDF-Dateien schreiben oder Bytes an eine API-Antwort übergeben.
- [Browser](/docs/0.3/de/getting-started/client-side/): Vorschau öffnen oder eine PDF herunterladen.

Beide Laufzeiten verwenden dieselbe [Dokumentdefinition](/docs/0.3/de/document-definition-object/), benötigen aber unterschiedliche Imports und Schriftregistrierung. Vermische die Einrichtung nicht mit älteren `PdfPrinter`-Beispielen. Die Ausgabe in 0.3 ist Promise-basiert: Fehler mit `await` und `try/catch` behandeln.

[Die erste PDF](/docs/0.3/de/learn/first-pdf/) zeigt den gesamten Ablauf.

## Vor dem Start

Verwende die Dokumentation passend zur installierten Version (`npm ls pdfmake`). Beginne mit einem minimalen Beispiel, bevor du eigene Schriften, entfernte Bilder oder Tabellenlayouts hinzufügst. Wenn du eine Anwendung mit Version 0.1/0.2 betreibst, folge der [Migrationsanleitung](/docs/0.3/de/migration-from-0.1/).

## JavaScript und TypeScript

Dieser Entwicklungszweig liefert eigene TypeScript-Deklarationen mit der Library aus und trennt Node- und Browser-APIs. Installiere f�r den lokal gepackten Zweig TypeScript ohne `@types/pdfmake`. Das ver�ffentlichte npm-Paket 0.3.12 ben�tigt weiterhin passende Community-Typen; die hier beschriebenen nativen Deklarationen und die Vorabvalidierung sind noch unver�ffentlicht. Gepr�ft wird mit TypeScript 5.9.3.

```sh
npm install pdfmake@0.3.12
npm install --save-dev typescript@~5.9.3
```

Node.js: Speichere dies als `document.mts`. Mit `NodeNext` bildet der Compiler die tatsächlichen Node-Imports ab. Eine CommonJS-Datei mit `.cts` kann stattdessen mit `import pdfmake = require("pdfmake")` beginnen. Verlasse dich nicht auf benannte Laufzeit-Imports.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true
  }
}
```

**JavaScript**

```js
import pdfmake from 'pdfmake';
import { strict as assert } from 'node:assert';
pdfmake.addFonts({ Helvetica: { normal: 'Helvetica', bold: 'Helvetica-Bold', italics: 'Helvetica-Oblique', bolditalics: 'Helvetica-BoldOblique' } });
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(name => name.startsWith('Helvetica'));
const definition = { content: [{ table: { body: [['ESM', 'TypeScript'], ['Promise', 'Output']] } }], defaultStyle: { font: 'Helvetica' } };
const buffer = await pdfmake.createPdf(definition).getBuffer();
assert.equal(buffer.subarray(0, 5).toString(), '%PDF-');
```

**TypeScript**

```ts
import pdfmake from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces.js';
import { strict as assert } from 'node:assert';

pdfmake.addFonts({ Helvetica: { normal: 'Helvetica', bold: 'Helvetica-Bold', italics: 'Helvetica-Oblique', bolditalics: 'Helvetica-BoldOblique' } });
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(name => name.startsWith('Helvetica'));
const definition: TDocumentDefinitions = { content: [{ table: { body: [['ESM', 'TypeScript'], ['Promise', 'Output']] } }], defaultStyle: { font: 'Helvetica' } };
const buffer: Buffer = await pdfmake.createPdf(definition).getBuffer();
assert.equal(buffer.subarray(0, 5).toString(), '%PDF-');
```

Browser-Bundler: Importiere den fertigen Browser-Einstieg und registriere das VFS direkt. Verwende `module: "ESNext"` und `moduleResolution: "Bundler"` im Bundler-Projekt; diese Optionen benötigen einen Bundler und sind nicht zum direkten Ausführen der Ausgabe in Node gedacht.

**JavaScript**

```js
import pdfmake from 'pdfmake/build/pdfmake.js';
import vfs from 'pdfmake/build/vfs_fonts.js';
pdfmake.addVirtualFileSystem(vfs);
const definition = { content: [{ text: 'TypeScript browser bundler', bold: true }] };
export async function render() {
    return pdfmake.createPdf(definition).getBlob();
}
```

**TypeScript**

```ts
import pdfmake from 'pdfmake/build/pdfmake.js';
import vfs from 'pdfmake/build/vfs_fonts.js';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

pdfmake.addVirtualFileSystem(vfs);
const definition = { content: [{ text: 'TypeScript browser bundler', bold: true }] } satisfies TDocumentDefinitions;
export async function render(): Promise<Blob> {
  return pdfmake.createPdf(definition).getBlob();
}
```

Typen bieten Vervollst�ndigung und Pr�fungen beim Kompilieren. Sie validieren kein externes JSON und garantieren kein erfolgreiches Layout. Die eigenen Deklarationen unterscheiden Node-`write` von Browser-`getBlob`, `download`, `open` und `print`. Verwende f�r Bundler explizite Browser-Imports. Playground und eingebettete Beispiele pr�fen TypeScript lokal vor dem Rendern. Siehe [Dokumentvalidierung](/docs/0.3/de/guides/errors/) f�r Laufzeitpr�fungen.
