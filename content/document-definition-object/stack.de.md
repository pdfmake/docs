+++
title = "Absatzstapel"
description = "Ordne Absätze mit der Stack-Struktur in pdfmake 0.3 untereinander an und formatiere verschachtelte Inhalte."
weight = 2080
alwaysopen = true
sourceDigest = "04c569677571b5807400b3610efeeabd2981f70fae31c778b9a5337c0abe6c26"
+++

An den Beispielen hast du wahrscheinlich schon erkannt: Wenn du `content` auf ein Array setzt, wird das Dokument als Stapel von Absätzen dargestellt.

Diese Struktur kannst du häufig in einem verschachtelten Element wiederverwenden, wie im folgenden Beispiel:
```js
var docDefinition = {
  content: [
    'paragraph 1',
    'paragraph 2',
    {
      columns: [
        'first column is a simple text',
        [
          // second column consists of paragraphs
          'paragraph A',
          'paragraph B',
          'these paragraphs will be rendered one below another inside the column'
        ]
      ]
    }
  ]
};
```

Ein Array hat den Nachteil, dass du ihm keine Formatierungseigenschaften hinzufügen kannst (zum Beispiel, um `fontSize` zu ändern).

Die gute Nachricht: In pdfMake ist ein Array nur eine Kurzform für `{ stack: [] }`. Wenn du den ganzen Stapel anders formatieren möchtest, kannst du die ausführliche Definition verwenden:
```js
var docDefinition = {
  content: [
    'paragraph 1',
    'paragraph 2',
    {
      columns: [
        'first column is a simple text',
        {
          stack: [
            // second column consists of paragraphs
            'paragraph A',
            'paragraph B',
            'these paragraphs will be rendered one below another inside the column'
          ],
          fontSize: 15
        }
      ]
    }
  ]
};
```
