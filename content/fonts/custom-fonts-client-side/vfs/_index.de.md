+++
title = "Eigene Schriften mit VFS"
description = "Erstelle ein virtuelles Schriftdateisystem außerhalb von node_modules, registriere Schriftvarianten und verwende eine eigene Familie in Browser-PDFs."
weight = 15
sourceDigest = "bea37c79f0184516d0fe4a72f5f5c7b3dfb11fa1b76e3eb1d2b51e41c2128cb2"
+++

## Schriftcontainer erstellen

Verwende lizenzierte Schriftdateien, die die benötigten Sprachen abdecken. Lege sie im Verzeichnis `fonts/` deiner Anwendung ab und erzeuge vom Projektstamm aus eine VFS-Datei:

```sh
node node_modules/pdfmake/build-vfs.js ./fonts ./vfs_fonts.js
```

Alle Dateien im angegebenen Verzeichnis werden als Base64-Einträge eingebettet. Lege erzeugte Anwendungsressourcen außerhalb von `node_modules` ab, damit eine Installation deine eigenen Schriften nicht überschreibt. Erzeuge die VFS-Datei neu, sobald sich die Schriftdateien ändern. Für normale [Schriftpfade in Node.js](/docs/0.3/de/fonts/) ist keine Browser-VFS erforderlich.

## Laden und registrieren

Lade die Engine vor dem erzeugten VFS-Skript. Wenn `pdfMake` bereits verfügbar ist, registriert das erzeugte Skript seine Dateien. In einem Bundler importierst du das VFS-Objekt und rufst `addVirtualFileSystem` explizit auf:

```js
import pdfMake from 'pdfmake/build/pdfmake';
import customVfs from './vfs_fonts';

pdfMake.addVirtualFileSystem(customVfs);
pdfMake.addFonts({
  MyFont: {
    normal: 'MyFont-Regular.ttf',
    bold: 'MyFont-Bold.ttf',
    italics: 'MyFont-Italic.ttf',
    bolditalics: 'MyFont-BoldItalic.ttf'
  }
});

await pdfMake.createPdf({
  defaultStyle: { font: 'MyFont' },
  content: ['A document using my font.']
}).download('document.pdf');
```

Ersetze die Namen durch die exakten Schlüssel in deiner erzeugten VFS-Datei. Schriftfamiliennamen wie `MyFont` verwendest du in Stilen; Dateischlüssel verweisen auf eingebettete Dateien. Definiere jede verwendete Variante. Du kannst mehrere Varianten derselben Datei zuordnen, wenn das beabsichtigt ist; dadurch entsteht aber keine echte fette oder kursive Schrift.

## Schriftsammlungen

Für unterstützte TrueType-Sammlungen kann ein Deskriptor als `[filename, faceName]` angegeben werden:

```js
pdfMake.addFonts({
  PingFangSC: {
    normal: ['pingfang.ttc', 'PingFangSC-Regular'],
    bold: ['pingfang.ttc', 'PingFangSC-Semibold']
  }
});
```

Bette die Sammlung ein und verwende gültige Namen für die Schriftschnitte. Dieses Beispiel registriert nur normale und fette Schrift; ergänze kursive Varianten, bevor du sie verwendest.

## Häufige Fehler

Wenn eine Datei nicht gefunden wird, vergleiche den Dateinamen im Deskriptor mit den Schlüsseln der erzeugten VFS-Datei. Wenn eine Schrift nicht definiert ist, vergleiche `defaultStyle.font` mit der Schriftfamilienzuordnung. Wenn Zeichen fehlen, prüfe die Glyphenabdeckung der Schrift. Wenn das Browser-Bundle zu groß ist, entferne nicht verwendete Familien und Dateien aus dem Eingabeverzeichnis der VFS.
