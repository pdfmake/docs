# Schlangenförmige Spalten

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/document-definition-object/snaking-columns/

> **Note:** Mindestversion: **0.3.5**


Schlangenförmige Spalten (Spalten im Zeitungsstil) sind ein Layoutmodus, bei dem der Inhalt zunächst vertikal durch die erste Spalte und anschließend am oberen Rand der nächsten Spalte weiterfließt. Der Inhalt bewegt sich bei Bedarf abwechselnd durch die Spalten. Anders als bei Spalten, die für jede neue Zeile wieder oben beginnen, läuft die Reihenfolge fortlaufend durch alle verfügbaren Spalten.

Wenn `snakingColumns: true` aktiviert ist, sollte nur die **erste Spalte** Inhalt enthalten. Die folgenden Spalten dienen als leere Platzhalter für den überlaufenden Inhalt.

**JavaScript**

```js
var myLongContent = 'A paragraph flowing through snaking columns. '.repeat(120);
var docDefinition = {
    content: [
        {
            columns: [
                {text: myLongContent, width: '*'},  // Content goes here
                {text: '', width: '*'},             // Empty overflow target
                {text: '', width: '*'}              // Empty overflow target
            ],
            snakingColumns: true
        }
    ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var myLongContent = 'A paragraph flowing through snaking columns. '.repeat(120);
var docDefinition: TDocumentDefinitions = {
    content: [
        {
            columns: [
                {text: myLongContent, width: '*'},  // Content goes here
                {text: '', width: '*'},             // Empty overflow target
                {text: '', width: '*'}              // Empty overflow target
            ],
            snakingColumns: true
        }
    ]
};
```

Eine schlangenförmige Spalte direkt in eine weitere schlangenförmige Spalte einzubetten (rekursives Schlangenlayout) wird nicht unterstützt.

**Empfehlungen:**
- Vermeide tiefe Verschachtelungen schlangenförmiger Spalten.
- Normale Spalten (ohne Schlangenlayout) können sicher in schlangenförmige Spalten verschachtelt werden.
- Schlangenförmige Spalten können sicher in normalen Spalten verschachtelt werden.
