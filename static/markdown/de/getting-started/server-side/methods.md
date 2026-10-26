# Ausgabemethoden in Node.js

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/getting-started/server-side/methods/

## Dokument erstellen

**JavaScript**

```js
const output = pdfmake.createPdf(docDefinition, options);
```

**TypeScript**

```ts
const output = pdfmake.createPdf(docDefinition, options);
```

`docDefinition` ist eine [Dokumentdefinition](/docs/0.3/de/document-definition-object/). `options` ist ein optionales [Optionsobjekt](/docs/0.3/de/options/). `createPdf` gibt sofort einen Ausgabe-Wrapper zurück; Fehler bei der Generierung lehnen das Promise der Ausgabemethode ab. Ungültige Argumenttypen können synchron einen Fehler auslösen.

## Ausgabemethoden

| Methode | Ergebnis | Verwendung |
| --- | --- | --- |
| `write(filename)` | `undefined` | Datei schreiben und auf das Schließen warten |
| `getBuffer()` | `Buffer` | PDF-Bytes für eine API zurückgeben |
| `getBase64()` | `string` | Bytes als Base64 kodieren |
| `getDataUrl()` | `string` | Base64 das Präfix `data:application/pdf;base64,` voranstellen |
| `getStream()` | PDFKit-Dokumentstream | Stream direkt verwalten |

**JavaScript**

```js
try {
  const output = pdfmake.createPdf(docDefinition);
  const bytes = await output.getBuffer();
  // Send or store bytes here.
} catch (error) {
  // Report generation failure to your caller.
}
```

**TypeScript**

```ts
try {
  const output = pdfmake.createPdf(docDefinition);
  const bytes = await output.getBuffer();
  // Send or store bytes here.
} catch (error) {
  // Report generation failure to your caller.
}
```

`getBuffer()` speichert sein Promise zwischen; `getBase64()` und `getDataUrl()` verwenden dieselben Bytes wieder. Erzeuge für einen unabhängigen Renderdurchlauf einen neuen Ausgabe-Wrapper. Kombiniere die manuelle Streamverarbeitung nicht mit Buffer- oder Dateihilfsmethoden auf demselben Wrapper.

## Stream verarbeiten

**JavaScript**

```js
const stream = await pdfmake.createPdf(docDefinition).getStream();
stream.on('error', error => { /* Handle generation errors. */ });
destination.on('error', error => { /* Handle destination errors. */ });
stream.pipe(destination);
stream.end();
```

**TypeScript**

```ts
const stream = await pdfmake.createPdf(docDefinition).getStream();
stream.on('error', error => { /* Handle generation errors. */ });
destination.on('error', error => { /* Handle destination errors. */ });
stream.pipe(destination);
stream.end();
```

`destination` muss ein von deiner Anwendung verwalteter beschreibbarer Stream sein. Registriere Ereignis-Listener, bevor du `end()` aufrufst. Für eine einfache Datei ist `write()` vorzuziehen. Streaming macht das Dokumentlayout nicht inkrementell: pdfmake legt das Dokumentlayout fertig, bevor der Stream zurückgegeben wird.

## URL-Zugriffsrichtlinie

Verfügbar seit **0.3.6**. Konfiguriere sie vor dem Erstellen von Dokumenten:

**JavaScript**

```js
pdfmake.setUrlAccessPolicy(url => {
  const parsed = new URL(url);
  return parsed.protocol === 'https:' && parsed.hostname === 'assets.example.com';
});
```

**TypeScript**

```ts
pdfmake.setUrlAccessPolicy(url => {
  const parsed = new URL(url);
  return parsed.protocol === 'https:' && parsed.hostname === 'assets.example.com';
});
```

Der Callback muss synchron den booleschen Wert `true` zurückgeben, damit eine URL erlaubt wird. Eine `async`-Funktion gibt ein Promise zurück und wird in der aktuellen Implementierung abgelehnt. Eine Zulassungsliste ist nur eine Schutzmaßnahme gegen SSRF; setze Netzwerkregeln ein oder verwende geprüfte Bytes, wenn du nicht vertrauenswürdige Eingaben verarbeitest. Siehe [Ressourcensicherheit](/docs/0.3/de/guides/resource-security/).

## Zugriff auf lokale Dateien

Verfügbar seit **0.3.8**. Wenn alle Ressourcen eingebettet sind, kannst du lokale Dateien sperren:

**JavaScript**

```js
pdfmake.setLocalAccessPolicy(() => false);
```

**TypeScript**

```ts
pdfmake.setLocalAccessPolicy(() => false);
```

Erlaube für lokale Schriften oder Bilder exakt aufgelöste Pfade statt eines Zeichenfolgenpräfixes. Siehe die [vollständige Einrichtung lokaler Schriften](/docs/0.3/de/fonts/). `undefined` löscht eine konfigurierte Richtlinie; eine nicht gesetzte Richtlinie sperrt nicht automatisch alle Zugriffe.
