+++
sourceDigest = "99fb4e43045381e3fb65fdf81576ac12ed30e6cf3ca5e79f4130207b775a67d0"
title = "Einrichtung"
description = "Installiere pdfmake 0.3 fÃ¼r Node.js oder den Browser und wÃ¤hle die passende Promise-basierte Ausgabe."
weight = 10
+++

## Die Laufzeit entscheidet

- [Node.js](/docs/0.3/de/getting-started/server-side/): PDF-Dateien schreiben oder Bytes an eine API-Antwort Ã¼bergeben.
- [Browser](/docs/0.3/de/getting-started/client-side/): Vorschau Ã¶ffnen oder eine PDF herunterladen.

Beide Laufzeiten verwenden dieselbe [Dokumentdefinition](/docs/0.3/de/document-definition-object/), benÃ¶tigen aber unterschiedliche Imports und Schriftregistrierung. Vermische die Einrichtung nicht mit Ã¤lteren `PdfPrinter`-Beispielen. Die Ausgabe in 0.3 ist Promise-basiert: Fehler mit `await` und `try/catch` behandeln.

[Die erste PDF](/docs/0.3/de/learn/first-pdf/) zeigt den gesamten Ablauf.

## Vor dem Start

Verwende die Dokumentation passend zur installierten Version (`npm ls pdfmake`). Beginne mit einem minimalen Beispiel, bevor du eigene Schriften, entfernte Bilder oder Tabellenlayouts hinzufÃ¼gst. Wenn du eine Anwendung mit Version 0.1/0.2 betreibst, folge der [Migrationsanleitung](/docs/0.3/de/migration-from-0.1/).

## JavaScript und TypeScript

Dieser Entwicklungszweig liefert eigene TypeScript-Deklarationen mit der Library aus und trennt Node- und Browser-APIs. Installiere für den lokal gepackten Zweig TypeScript ohne `@types/pdfmake`. Das veröffentlichte npm-Paket 0.3.13 benötigt weiterhin passende Community-Typen; die hier beschriebenen nativen Deklarationen und die Vorabvalidierung sind noch unveröffentlicht. Geprüft wird mit TypeScript 5.9.3.

```sh
npm install pdfmake@0.3.13
npm install --save-dev typescript@~5.9.3
```

Node.js: Speichere dies als `document.mts`. Mit `NodeNext` bildet der Compiler die tatsÃ¤chlichen Node-Imports ab. Eine CommonJS-Datei mit `.cts` kann stattdessen mit `import pdfmake = require("pdfmake")` beginnen. Verlasse dich nicht auf benannte Laufzeit-Imports.

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

Browser-Bundler: Importiere den fertigen Browser-Einstieg und registriere das VFS direkt. Verwende `module: "ESNext"` und `moduleResolution: "Bundler"` im Bundler-Projekt; diese Optionen benÃ¶tigen einen Bundler und sind nicht zum direkten AusfÃ¼hren der Ausgabe in Node gedacht.

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

Typen bieten Vervollständigung und Prüfungen beim Kompilieren. Sie validieren kein externes JSON und garantieren kein erfolgreiches Layout. Die eigenen Deklarationen unterscheiden Node-`write` von Browser-`getBlob`, `download`, `open` und `print`. Verwende für Bundler explizite Browser-Imports. Playground und eingebettete Beispiele prüfen TypeScript lokal vor dem Rendern. Siehe [Dokumentvalidierung](/docs/0.3/de/guides/errors/) für Laufzeitprüfungen.
