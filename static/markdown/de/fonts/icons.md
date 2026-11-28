# Symbole

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/fonts/icons/

- Erstelle eine Schriftdatei bei http://fontello.com/ oder einem ähnlichen Dienst und lade sie herunter.

- Erzeuge aus der Schriftdatei (zum Beispiel `.ttf`) eine `vfs_fonts.js`-Datei (siehe [eigene Schriften verwenden](/docs/0.3/de/fonts/custom-fonts-client-side/vfs/)).

- Registriere die Schrift in JavaScript (es kann ausreichen, nur `normal` zu definieren):
**JavaScript**

```js
pdfMake.fonts = {
    Fontello: {
        normal: 'fontello.ttf',
        bold: 'fontello.ttf',
        italics: 'fontello.ttf',
        bolditalics: 'fontello.ttf'
    }
}
```

**TypeScript**

```ts
pdfMake.fonts = {
    Fontello: {
        normal: 'fontello.ttf',
        bold: 'fontello.ttf',
        italics: 'fontello.ttf',
        bolditalics: 'fontello.ttf'
    }
}
```

- Lege einen Stil für Symbole an:
`            icon: {
                font: 'Fontello'
            }`
- Erstelle einen Textabsatz:
`
            { text: '', style: 'icon' }, //icon wifi`
- Verwende als Text das Zeichen aus den Kommentaren in `fontello-codes.css`, nicht den Escape-Wert.

---

Wenn du ein Symbol innerhalb eines Textes brauchst, musst du Textobjekte verschachteln:

**JavaScript**

```js
var dd = { content: [{
text: [
        { text: '', style: 'icon' }, //icon gift
        " my present"
    ]
}] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [{
text: [
        { text: '', style: 'icon' }, //icon gift
        " my present"
    ]
}] };
```
Dies gibt Folgendes aus: „[gift icon] my present“.
