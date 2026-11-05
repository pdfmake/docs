+++
title = "Dokumentabschnitte"
description = "Lege für einzelne Dokumentabschnitte in pdfmake 0.3 Seiteneinstellungen, Kopf- und Fußzeilen, Wasserzeichen sowie Hintergründe fest."
weight = 2090
alwaysopen = true
sourceDigest = "6dc77fa5678a9e679efdf6b4bff537f029525cefa55e1030486444fce88c0ea8"
+++

Mit Dokumentabschnitten kannst du ein Dokument in mehrere Teile mit jeweils eigenen Seiteneinstellungen aufteilen.

Jeder Abschnitt kann Folgendes festlegen:
- eigene Seitengröße und Ausrichtung
- eigene Seitenränder
- eigene Kopf- und Fußzeile
- eigenes Wasserzeichen
- eigenen Hintergrund

Eine Definition mit allen Eigenschaften:
```js
var docDefinition = {
    content: [
        {
            header: function (currentPage, pageCount) {
                return currentPage.toString() + ' of ' + pageCount;
            },
            footer: function (currentPage, pageCount) {
                return currentPage.toString() + ' of ' + pageCount;
            },
            background: function () {
                return {text: 'background', alignment: 'right'};
            },
            watermark: 'watermark',
            pageSize: 'A4',
            pageOrientation: 'landscape',
            pageMargins: 5,
            section: [
                'Text in section.'
            ]
        }
    ]
}
```

Im nächsten Abschnitt können Eigenschaften vom vorherigen Abschnitt übernommen werden:
```js
var docDefinition = {
    content: [
        {
            header: 'inherit',
            footer: 'inherit',
            background: 'inherit',
            watermark: 'inherit',
            pageSize: 'inherit',
            pageOrientation: 'inherit',
            pageMargins: 'inherit',
            section: [
                'Text in section.'
            ]
        }
    ]
}
```

Ein vollständiges Beispiel findest du unter [examples/section.js](https://github.com/bpampuch/pdfmake/blob/master/examples/sections.js).
