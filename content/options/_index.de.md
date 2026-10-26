+++
title = "Rendering-Optionen"
description = "Steuere den Font-Layout-Cache und die Seitenausgabe von PDFKit über das zweite Argument von createPdf."
weight = 30
sourceDigest = "fa3eacf7dfb3dc985a1eb6cf541fdccb9dae9648d423d3d758d78b70eabb4882"
+++

## Optionen an `createPdf` übergeben

```js
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false
});
```

Das Optionsobjekt ist getrennt von der [Dokumentdefinition](/docs/0.3/de/document-definition-object/).

| Option | Typ | Standard | Bedeutung |
| --- | --- | --- | --- |
| `fontLayoutCache` | boolean | `true` | Font-Layout-Cache von PDFKit aktivieren |
| `bufferPages` | boolean | `false` | PDFKit-Seiten puffern, statt sie sofort auszugeben |

Behalte die Standardwerte bei, sofern dein Anwendungsfall keine Änderung erfordert. Das Puffern von Seiten kann den Speicherverbrauch erhöhen. Es macht das Layout von pdfmake nicht verzögert oder inkrementell. Siehe [Leistung](/docs/0.3/de/guides/performance/) und die [Dokumentation zur Seitenausgabe von PDFKit](https://pdfkit.org/docs/getting_started.html).

Schriften, benannte Tabellenlayouts und Ressourcenrichtlinien werden über die [öffentliche API](/docs/0.3/de/guides/api-reference/) konfiguriert. Papierformat, Ränder und Inhalt gehören in die Definition.
