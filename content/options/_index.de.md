+++
title = "Rendering-Optionen"
description = "Steuere den Font-Layout-Cache und die Seitenausgabe von PDFKit über das zweite Argument von createPdf."
weight = 30
sourceDigest = "c32b0c6709d2d0a715a0e2f2b837333ea0201c7aacac1cbbd12d9ee1240e0423"
+++

## Optionen an `createPdf` übergeben

```js
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false,
  unbreakableOverflow: 'allowBreak'
});
```

Das Optionsobjekt ist getrennt von der [Dokumentdefinition](/docs/0.3/de/document-definition-object/).

| Option | Typ | Standard | Bedeutung |
| --- | --- | --- | --- |
| `fontLayoutCache` | boolean | `true` | Font-Layout-Cache von PDFKit aktivieren |
| `bufferPages` | boolean | `false` | PDFKit-Seiten puffern, statt sie sofort auszugeben |
| `unbreakableOverflow` | 'allowBreak' / 'error' | `'allowBreak'` | Übergroße unteilbare Blöcke steuern; siehe den Abschnitt unten. |

Behalte die Standardwerte bei, sofern dein Anwendungsfall keine Änderung erfordert. Das Puffern von Seiten kann den Speicherverbrauch erhöhen. Es macht das Layout von pdfmake nicht verzögert oder inkrementell. Siehe [Leistung](/docs/0.3/de/guides/performance/) und die [Dokumentation zur Seitenausgabe von PDFKit](https://pdfkit.org/docs/getting_started.html).

Schriften, benannte Tabellenlayouts und Ressourcenrichtlinien werden über die [öffentliche API](/docs/0.3/de/guides/api-reference/) konfiguriert. Papierformat, Ränder und Inhalt gehören in die Definition.

## Überlauf unteilbarer Blöcke {#unbreakable-overflow}

Seit **0.3.15** steuert `unbreakableOverflow` übergroße unteilbare Blöcke. Beide Modi halten einen Block zusammen, der auf eine Seite passt; fehlt nur der verbleibende Platz, wechselt er zur nächsten Seite. Das betrifft `unbreakable`, `dontBreakRows`, `keepWithHeaderRows`, zugehörige Zeilenspannen und wiederholte Kopfzeilen.

| Wert | Verhalten |
| --- | --- |
| `'allowBreak'` | Layout mit unterstützten gelockerten Unteilbarkeitsregeln wiederholen und übergroße Blöcke nach Möglichkeit aufteilen. |
| `'error'` | Generierung ablehnen, wenn ein unteilbarer Block nicht auf eine Seite passt. |
