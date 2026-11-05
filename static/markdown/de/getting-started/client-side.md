# Browser-Schnellstart

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/getting-started/client-side/

## Browserressourcen installieren und kopieren

```sh
npm install pdfmake@0.3.13
```

Kopiere `node_modules/pdfmake/build/pdfmake.min.js` und `node_modules/pdfmake/build/vfs_fonts.js` neben diese HTML-Datei. Stelle das Verzeichnis über deinen lokalen Entwicklungsserver bereit.

## PDF erzeugen

```html
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>My first PDF</title></head>
<body>
  <button id="download" type="button">Download PDF</button>
  <p id="status" role="status"></p>
  <script src="./pdfmake.min.js"></script>
  <script src="./vfs_fonts.js"></script>
  <script>
    document.querySelector('#download').addEventListener('click', async () => {
      try {
        await pdfMake.createPdf({ content: ['Hello from the browser!'] }).download('hello.pdf');
        document.querySelector('#status').textContent = 'PDF prepared';
      } catch (error) {
        document.querySelector('#status').textContent = 'PDF generation failed';
        console.error(error);
      }
    });
  </script>
</body>
</html>
```

Lade die Engine **vor** ihrem Schrift-Bundle. `vfs_fonts.js` stellt die standardmäßigen Roboto-Schriftdateien bereit. Für dieses Beispiel benötigst du keine serverseitige Rendering-API. Wenn das Promise von `download()` erfüllt wird, wurde der Download gestartet; es bestätigt nicht, dass der Benutzer die Datei gespeichert hat.

## Einen Bundler verwenden

**JavaScript**

```js
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.addVirtualFileSystem(pdfFonts);
await pdfMake.createPdf({ content: ['Bundled application'] }).download('document.pdf');
```

**TypeScript**

```ts
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.addVirtualFileSystem(pdfFonts);
await pdfMake.createPdf({ content: ['Bundled application'] }).download('document.pdf');
```

Dieser Code wird innerhalb des Moduls oder eines asynchronen Event-Handlers deiner Anwendung ausgeführt. Wenn du ein SSR-Framework nutzt, darf der Import nicht in serverseitig ausgeführten Code geraten. Verwende in TypeScript Typdefinitionen, die zu deiner installierten pdfmake-Version passen; Typen machen eine ältere Laufzeit nicht mit der 0.3-API kompatibel.

## Öffnen und drucken

Rufe `open()` oder `print()` während einer Benutzeraktion auf, um Popup-Blocker zu vermeiden. Wenn du zuerst Daten abrufst, öffne synchron ein Fenster und übergib es anschließend an die Ausgabemethode. Siehe [Browsermethoden](/docs/0.3/de/getting-started/client-side/methods/).

## Nächste Schritte

[Eigene Schriften](/docs/0.3/de/fonts/custom-fonts-client-side/) · [Browsermethoden](/docs/0.3/de/getting-started/client-side/methods/) · [Fehlerbehebung](/docs/0.3/de/guides/troubleshooting/)
