+++
title = "PDF/A"
description = "Lege mit Beispielen, Optionen und Anwendungshinweisen PDF/A in pdfmake 0.3 fest."
weight = 2310
alwaysopen = true
sourceDigest = "3a4aac84f9ac2fad0a48e377a819ab231184afd5b8138332817198c5125b12c5"
+++

PDF/A ist ein spezielles Format zur Archivierung und langfristigen Aufbewahrung elektronischer Dokumente.

Erforderlich ist PDF-Version 1.4 oder höher.

```js
var docDefinition = {
    version: '1.5',
    subset: 'PDF/A-3a',
    tagged: true,
    displayTitle: true,
    info: {
        title: 'Awesome PDF document from pdfmake'
    },
    content: [
        'PDF/A document for archive'
    ]
};
```

Unterstützte PDF-Versionen (Eigenschaft `version`):
- `1.3` – PDF-Version 1.3 (Standard), **für PDF/A nicht unterstützt**
- `1.4` – PDF-Version 1.4
- `1.5` – PDF-Version 1.5
- `1.6` – PDF-Version 1.6
- `1.7` – PDF-Version 1.7
- `1.7ext3` – PDF-Version 1.7 ExtensionLevel 3

Konformitätsstufe des Dokuments (Eigenschaft `subset`):
- `PDF/A-1` (Kurzform für PDF/A-1b)
- `PDF/A-1a`
- `PDF/A-1b`
- `PDF/A-2` (Kurzform für PDF/A-2b)
- `PDF/A-2a`
- `PDF/A-2b`
- `PDF/A-3` (Kurzform für PDF/A-3b)
- `PDF/A-3a`
- `PDF/A-3b`
- `PDF/UA`

Dokument als getaggtes PDF kennzeichnen (Eigenschaft `tagged`):
- `true` – aktivieren
- `false` – deaktivieren

Dokumenttitel in der Titelleiste des Fensters anzeigen (Eigenschaft `displayTitle`):
- `true` – aktivieren
- `false` – deaktivieren
