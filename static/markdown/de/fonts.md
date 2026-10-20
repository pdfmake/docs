# Schriften und Zeichensatzabdeckung

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/fonts/

## Schriftstrategie auswählen

| Laufzeit | Schriftquelle | Einrichtung |
| --- | --- | --- |
| Node.js | Echte Schriftdateien | `addFonts` mit absoluten Pfaden |
| Node.js | PDF-Standardschriften | `require('pdfmake/standard-fonts/Helvetica')` |
| Browser | Gebündeltes Roboto-VFS | `build/vfs_fonts.js` laden |
| Browser | Benutzerdefiniertes VFS oder URLs | [Eigene Browser-Schriften](/docs/0.3/de/fonts/custom-fonts-client-side/) |

Die Standardschriftfamilie ist `Roboto`. In Node.js werden die Dateien nicht automatisch registriert. Jede Familie sollte `normal`, `bold`, `italics` und `bolditalics` passenden Schriftdaten zuordnen. Ein Stil, der eine nicht registrierte Variante auswählt, kann fehlschlagen, obwohl normaler Text funktioniert.

## Lokale Schriften in Node.js registrieren

Dieses Beispiel setzt voraus, dass sich lizenzierte Schriftdateien in einem Verzeichnis `fonts` neben deinem CommonJS-Skript befinden:

**JavaScript**

```js
const path = require('node:path');
const pdfmake = require('pdfmake');
const fonts = {
  Roboto: {
    normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, 'fonts/Roboto-MediumItalic.ttf')
  }
};
const allowed = new Set(Object.values(fonts.Roboto));
pdfmake.addFonts(fonts);
pdfmake.setLocalAccessPolicy(file => allowed.has(path.resolve(file)));
pdfmake.setUrlAccessPolicy(() => false);
```

**TypeScript**

```ts
const path = require('node:path');
import pdfmake from "pdfmake";
const fonts = {
  Roboto: {
    normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, 'fonts/Roboto-MediumItalic.ttf')
  }
};
const allowed = new Set(Object.values(fonts.Roboto));
pdfmake.addFonts(fonts);
pdfmake.setLocalAccessPolicy(file => allowed.has(path.resolve(file)));
pdfmake.setUrlAccessPolicy(() => false);
```

Die Zulassungsliste eignet sich für unveränderliche Dateien, die deiner Anwendung gehören. Wenn Pfade von nicht vertrauenswürdigen Benutzern kommen, musst du auch symbolische Links und Dateisystemberechtigungen berücksichtigen. Ein Zeichenfolgenpräfix wie `fonts/` ist keine sichere Zugriffsschranke.

## Text auf Glyphenabdeckung abstimmen

Standardschriften haben begrenzte Kodierungen und decken nicht beliebige Unicode-Zeichen ab. Wähle eingebettete Schriften mit den benötigten Glyphen deiner tatsächlichen Sprachen. Eine Unicode-Zeichenfolge allein garantiert nicht, dass die ausgewählte Schrift sie darstellen kann. Prüfe repräsentative Zeichen und alle fetten und kursiven Varianten in erzeugten PDFs.

pdfmake bettet Schriften über PDFKit ein. Binde im Browser nur benötigte Schriftfamilien ein; VFS-Daten erhöhen Download- und Verarbeitungskosten. Beachte die Lizenz zur Weitergabe und Einbettung jeder Schrift.

## Verwandte Anleitungen

[14 Standardschriften](/docs/0.3/de/fonts/standard-14-fonts/) · [Browser-VFS](/docs/0.3/de/fonts/custom-fonts-client-side/vfs/) · [Schrift-URLs](/docs/0.3/de/fonts/custom-fonts-client-side/url/) · [Fehlerbehebung](/docs/0.3/de/guides/troubleshooting/)
