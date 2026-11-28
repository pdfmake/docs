+++
title = "Absatzstapel"
description = "Ordne Absätze mit der Stack-Struktur in pdfmake 0.3 untereinander an und formatiere verschachtelte Inhalte."
weight = 2080
alwaysopen = true
sourceDigest = "9fe0fd923768dfa5981b12db404c9abfe438f65b26f6f0bafe27d8c8bb784a5f"
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

## Einen Stack zusammenhalten

Setze `unbreakable: true`, um einen Stack auf einer Seite zusammenzuhalten, sofern er hineinpasst. Fehlt nur auf der aktuellen Seite Platz, wechselt der ganze Stack zur nächsten Seite. Für übergroße Stacks siehe [Überlauf unteilbarer Blöcke](/docs/0.3/de/options/#unbreakable-overflow).

```js
var docDefinition = {
  content: [
    {
      unbreakable: true,
      stack: [
        { text: 'Heading', bold: true },
        'Paragraph kept with the heading.'
      ]
    }
  ]
};
```
