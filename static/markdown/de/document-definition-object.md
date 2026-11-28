# Referenz zur Dokumentdefinition

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/document-definition-object/

## Aufbau einer Definition

**JavaScript**

```js
const docDefinition = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [40, 50, 40, 50],
  defaultStyle: { fontSize: 12 },
  styles: { heading: { fontSize: 20, bold: true } },
  info: { title: 'Example document', author: 'Example author' },
  content: [
    { text: 'Document heading', style: 'heading' },
    'A plain string becomes a paragraph.',
    { ul: ['First item', 'Second item'] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

const docDefinition: TDocumentDefinitions = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [40, 50, 40, 50],
  defaultStyle: { fontSize: 12 },
  styles: { heading: { fontSize: 20, bold: true } },
  info: { title: 'Example document', author: 'Example author' },
  content: [
    { text: 'Document heading', style: 'heading' },
    'A plain string becomes a paragraph.',
    { ul: ['First item', 'Second item'] }
  ]
};
```

Übergib die Definition nach der Schriftkonfiguration an die `createPdf`-Methode deiner Laufzeit. Alle numerischen Maße werden in **Punkten** angegeben (72 Punkte pro Zoll). Die Reihenfolge der Seitenränder ist **links, oben, rechts, unten**. Ein `content`-Array bildet einen vertikalen Stapel. Erzeuge für jeden Renderdurchlauf ein neues Objekt; beim Layout werden interne Messwerte und Positionen hinzugefügt.

## Inhaltsknoten

| Knoten | Zweck | Referenz |
| --- | --- | --- |
| `{ text: '...' }` | Absatz oder Inline-Textsegmente | [Stile](/docs/0.3/de/document-definition-object/styling/) |
| `{ stack: [...] }` | Blöcke gruppieren und einen gemeinsamen Stil anwenden | [Stapel](/docs/0.3/de/document-definition-object/stack/) |
| `{ columns: [...] }` | Inhalte nebeneinander anordnen | [Spalten](/docs/0.3/de/document-definition-object/columns/) |
| `{ table: { body: [...] } }` | Zeilen, Zellen und wiederholte Kopfzeilen | [Tabellen](/docs/0.3/de/document-definition-object/tables/) |
| `{ ul: [...] }`, `{ ol: [...] }` | Aufzählungs- und nummerierte Listen | [Listen](/docs/0.3/de/document-definition-object/lists/) |
| `{ image: 'key' }` | PNG oder JPEG | [Bilder](/docs/0.3/de/document-definition-object/images/) |
| `{ svg: '<svg>...</svg>' }` | SVG-Vektorgrafik | [SVGs](/docs/0.3/de/document-definition-object/svgs/) |
| `{ qr: '...' }` | QR-Code | [QR-Code](/docs/0.3/de/document-definition-object/qr/) |

## Dokumentweite Einstellungen

- [Seitengröße, Ausrichtung und Umbrüche](/docs/0.3/de/document-definition-object/page/), [Ränder](/docs/0.3/de/document-definition-object/margins/) und [Abschnitte](/docs/0.3/de/document-definition-object/sections/).
- [Kopf- und Fußzeilen](/docs/0.3/de/document-definition-object/headers-footers/), [Hintergründe](/docs/0.3/de/document-definition-object/background-layer/) und [Wasserzeichen](/docs/0.3/de/document-definition-object/watermark/).
- [Metadaten](/docs/0.3/de/document-definition-object/document-medatadata/), [Links](/docs/0.3/de/document-definition-object/links/), [Inhaltsverzeichnis](/docs/0.3/de/document-definition-object/toc/) und [Gliederungen](/docs/0.3/de/document-definition-object/outlines/).
- [Anhänge](/docs/0.3/de/document-definition-object/attachments/), [Verschlüsselung](/docs/0.3/de/document-definition-object/security/), [PDF/A](/docs/0.3/de/document-definition-object/pdfa/) und [Komprimierung](/docs/0.3/de/document-definition-object/compression/).

## Definition und Rendering-Optionen

Inhalt und visuelle Einstellungen gehören in die Definition. `fontLayoutCache` und `bufferPages` gehören in das zweite Argument von `createPdf`. Schriften, Tabellenlayoutregistrierungen und Ressourcenrichtlinien werden über die pdfmake-API festgelegt. Siehe [API-Übersicht](/docs/0.3/de/guides/api-reference/).
