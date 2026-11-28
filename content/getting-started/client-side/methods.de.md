+++
title = "Ausgabemethoden im Browser"
description = "Lade PDFs herunter, öffne, drucke oder erhalte PDF-Bytes und Blobs mit Promise-basierten Browsermethoden in pdfmake 0.3."
weight = 11
sourceDigest = "f69f5556c2e28d9323b3138c4731cca34aab6db68eb30a591f8dbcd51c05d4a9"
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

## URL-Zugriffsrichtlinie {#url-access-policy}

Seit **0.3.6** akzeptiert `setUrlAccessPolicy(callback)` einen synchronen booleschen Callback. Diese Funktion ist keine vollständige Netzwerksandbox; Weiterleitungen im Browser können stattfinden, bevor die endgültige URL geprüft wird. Siehe [Ressourcensicherheit](/docs/0.3/de/guides/resource-security/).

## URL-Ressourcen zwischenspeichern {#url-resource-caching}

Verfügbar seit **0.3.14**.

`setUrlResourceCaching(enabled)` benötigt einen booleschen Wert und verwendet standardmäßig `false`. Das `cache` eines einzelnen URL-Objekts überschreibt die globale Einstellung. Vorhandene gemeinsame Einträge bleiben mit `cache: false` lesbar; es erzwingt keinen Download.

```js
pdfMake.setUrlResourceCaching(true);
pdfMake.createPdf(docDefinition).download();
```

Neue Downloads werden standardmäßig pro Dokument gespeichert. `cache: true` legt neue Daten im gemeinsamen Arbeitsspeicher-Cache für spätere Dokumente ab; `cache: false` erlaubt weiterhin das Lesen vorhandener gemeinsamer Einträge. URL-Zeichenfolgen und Objekte ohne `cache` verwenden die globale Einstellung. Der HTTP-Cache des Browsers ist davon unabhängig.

Konfiguration und Sicherheit erklärt [URL-Ressourcen zwischenspeichern](/docs/0.3/de/getting-started/server-side/methods/#url-resource-caching).

## URL-Ressourcen-Cache leeren {#clear-url-resource-cache}

Verfügbar seit **0.3.14**.

Rufe `clearUrlResourceCache()` synchron zwischen Generierungen auf, nachdem laufende Arbeiten beendet sind. Die Methode entfernt gemeinsame HTTP/HTTPS-Einträge, erhält andere VFS-Dateien sowie die Cache-Einstellung und leert nicht den HTTP-Cache des Browsers. Siehe [URL-Ressourcen-Cache leeren](/docs/0.3/de/getting-started/server-side/methods/#clear-url-resource-cache).

```js
pdfMake.clearUrlResourceCache();
pdfMake.createPdf(docDefinition).download();
```

## Gleichzeitige URL-Downloads {#url-resource-concurrency}

Upstream-Entwicklungs-API für **0.3.16**; in der festgelegten Playground-Laufzeit 0.3.15 nicht verfügbar.

`setUrlResourceConcurrency(concurrency)` begrenzt gleichzeitige Downloads pro Dokument für Schriften, Bilder, Anhänge und eingebettete Dateien. Das erforderliche Argument muss eine positive ganze Zahl sein; der Standard ist `5`. Änderungen gelten für spätere `createPdf()`-Aufrufe.

```js
pdfMake.setUrlResourceConcurrency(3);
```

## URL-Protokolle {#url-protocols}

Upstream-Entwicklungs-API für **0.3.16**; in der festgelegten Playground-Laufzeit 0.3.15 nicht verfügbar.

`registerUrlProtocol(protocol, handler)` registriert oder ersetzt ein URL-Schema; `unregisterUrlProtocol(protocol)` entfernt es und leert dessen gemeinsamen Cache. HTTP und HTTPS sind anfangs registriert. Schemanamen sind unabhängig von Groß- und Kleinschreibung und erlauben einen abschließenden Doppelpunkt. Ohne Handler wird Fetch verwendet; im Browser unterstützt das auch Schemas wie `blob`.

```js
pdfMake.registerUrlProtocol('blob');
```

Ein Handler erhält `(url, headers, validateUrlAccessPolicy)` und liefert ein Promise mit `{ buffer, url }`. Ohne Request-Header wird ein leeres Objekt übergeben. Gib einen `ArrayBuffer` oder `Uint8Array` (einschließlich Node-`Buffer`) und eine nicht leere endgültige URL zurück; ohne Weiterleitung gilt die ursprüngliche URL.

Die [URL-Zugriffsrichtlinie](#url-access-policy) muss synchron `true` zurückgeben. pdfmake prüft die anfängliche und die zurückgegebene URL. Vor jeder Weiterleitung muss der Handler `validateUrlAccessPolicy(targetUrl)` aufrufen: Die Funktion wirft bei Verweigerung einen Fehler und erlaubt den Zugriff ohne konfigurierte Richtlinie. Eigene Handler müssen lokale Dateibeschränkungen selbst durchsetzen.

Diese Protokolle gelten für Schriften, Bilder, Anhänge und eingebettete Dateien und teilen das [Downloadlimit](#url-resource-concurrency) sowie die [Cache-Einstellungen](#url-resource-caching). Registrierungsänderungen gelten für spätere Generierungen; aktive behalten ihre Handler. Das Entfernen eines überschriebenen HTTP/HTTPS-Handlers stellt Fetch nicht wieder her: Rufe dafür `registerUrlProtocol("https")` auf. Protokollnamen müssen gültige URL-Schemas und übergebene Handler Funktionen sein.

Ein Browser kann `blob` mit dem Standardhandler registrieren. Halte `URL.createObjectURL(imageBlob)` bis zum Ende der Generierung gültig und erlaube die URL in der Zugriffsrichtlinie. Ein eigenes Handler-Beispiel steht unter [URL-Protokolle](/docs/0.3/de/getting-started/server-side/methods/#url-protocols).
