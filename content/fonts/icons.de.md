+++
title = "Symbole"
description = "Verwende Icon-Schriften in pdfmake 0.3 mit einer registrierten Schriftfamilie und einem eigenen Stil."
weight = 15
alwaysopen = true
sourceDigest = "389a424f61b90f95836afb77e66802f06435c1b671de3c8b4054b385699698b1"
+++

- Erstelle eine Schriftdatei bei http://fontello.com/ oder einem ähnlichen Dienst und lade sie herunter.

- Erzeuge aus der Schriftdatei (zum Beispiel `.ttf`) eine `vfs_fonts.js`-Datei (siehe [eigene Schriften verwenden](/docs/0.3/de/fonts/custom-fonts-client-side/vfs/)).

- Registriere die Schrift in JavaScript (es kann ausreichen, nur `normal` zu definieren):
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

```
    text: [
        { text: '', style: 'icon' }, //icon gift
        " my present"
    ]
```
Dies gibt Folgendes aus: „[gift icon] my present“.
