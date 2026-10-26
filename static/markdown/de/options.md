# Rendering-Optionen

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/options/

## Optionen an `createPdf` übergeben

**JavaScript**

```js
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false
});
```

**TypeScript**

```ts
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
