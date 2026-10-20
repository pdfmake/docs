+++
title = "Ausgabemethoden im Browser"
description = "Lade PDFs herunter, öffne, drucke oder erhalte PDF-Bytes und Blobs mit Promise-basierten Browsermethoden in pdfmake 0.3."
weight = 11
sourceDigest = "9223df7c21e72e445796980b101e0e55c3724007a9f7b3f7e0888260b13476f1"
+++

## Dokument erstellen

Nachdem du [Engine und Schriften geladen hast](/docs/0.3/de/getting-started/client-side/):

```js
const output = pdfMake.createPdf(docDefinition, options);
```

Das optionale zweite Argument enthält [Rendering-Optionen](/docs/0.3/de/options/). `createPdf` gibt sofort einen Ausgabe-Wrapper zurück. Ausgabemethoden liefern Promises; behandle deren Ablehnungen.

## Ausgabe auswählen

| Methode | Ergebnis | Verhalten |
| --- | --- | --- |
| `download(filename?)` | `undefined` | Startet einen Download; Standarddateiname ist `file.pdf` |
| `open(window?)` | `undefined` | Öffnet das erzeugte PDF in einem neuen oder angegebenen Fenster |
| `print(window?)` | `undefined` | Öffnet ein PDF mit Druckaktion; das Verhalten hängt vom Viewer ab |
| `getBlob()` | `Blob` | Binärdaten mit MIME-Typ `application/pdf` |
| `getBuffer()` | Buffer-kompatible Bytes | Rohe PDF-Bytes |
| `getBase64()` | `string` | Base64-kodiertes PDF |
| `getDataUrl()` | `string` | Base64-Data-URL |
| `getStream()` | PDFKit-Stream | Ausgabe auf niedriger Ebene; verwende normalerweise Blob oder Bytes |

```js
try {
  await pdfMake.createPdf(docDefinition).download('report.pdf');
} catch (error) {
  console.error('PDF generation failed', error);
}
```

Ein erfülltes Download-Promise bestätigt nicht, dass der Benutzer die Datei gespeichert hat. Drucken hängt vom Browser und PDF-Viewer ab; verlasse dich nicht auf stilles Drucken.

## Nach asynchroner Arbeit öffnen

Öffne das Fenster direkt im Click-Handler des Benutzers, bevor du auf Daten wartest. Andernfalls können Popup-Blocker das Öffnen verhindern.

```js
async function openReport() {
  const win = window.open('', '_blank');
  if (!win) throw new Error('Allow popups to open the PDF');
  try {
    const response = await fetch('/report-data');
    if (!response.ok) throw new Error('Could not load report data');
    const data = await response.json();
    const definition = { content: [String(data.title)] };
    await pdfMake.createPdf(definition).open(win);
  } catch (error) {
    win.close();
    throw error;
  }
}
```

Rufe `openReport` im Click-Handler deiner Anwendung auf und behandle das abgelehnte Promise. Ersetze zum Drucken `.open(win)` durch `.print(win)`. Mit `window` navigierst du im aktuellen Tab. Lege den PDF-Titel über die [Dokumentmetadaten](/docs/0.3/de/document-definition-object/document-medatadata/) fest; Dateinamen und Titel im Viewer hängen vom Browser ab.

## Blob-URLs verwalten

```js
const blob = await pdfMake.createPdf(docDefinition).getBlob();
const url = URL.createObjectURL(blob);
document.querySelector('#preview').src = url;
// Revoke url when replacing the preview or removing it, after it is no longer needed.
```

Lass die URL bestehen, solange der Viewer sie verwendet. Rufe beim Aufräumen `URL.revokeObjectURL(url)` auf. Verwende für jeden Renderdurchlauf einen neuen Ausgabe-Wrapper. Kombiniere die manuelle Verarbeitung eines Streams nicht mit Buffer- oder Blob-Hilfsmethoden auf demselben Ausgabe-Wrapper.

## URL-Zugriffsrichtlinie

Seit **0.3.6** akzeptiert `setUrlAccessPolicy(callback)` einen synchronen booleschen Callback. Diese Funktion ist keine vollständige Netzwerksandbox; Weiterleitungen im Browser können stattfinden, bevor die endgültige URL geprüft wird. Siehe [Ressourcensicherheit](/docs/0.3/de/guides/resource-security/).
