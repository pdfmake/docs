+++
title = "Stile und Formatierung"
description = "Formatiere Text mit benannten Stilen, Schriftvarianten, Ausrichtung, Farben und Vererbung in pdfmake 0.3."
weight = 2010
alwaysopen = true
sourceDigest = "9369a9e17f5173482ecd79123f5aee3a2489a7678b916cec9f9003263fe860ae"
+++

## Blöcke oder Inline-Text formatieren

Eine Zeichenfolge ist ein einfacher Absatz. Verwende einen Textknoten, um Eigenschaften hinzuzufügen. Mit einem `text`-Array kannst du Textsegmente **innerhalb desselben Absatzes** unterschiedlich formatieren; ein `content`-Array oder ein Stapel erzeugt getrennte Blöcke.

{{< example id="styles" >}}

## Benannte Stile wiederverwenden

```js
var dd = {
  defaultStyle: { fontSize: 11, lineHeight: 1.2 },
  styles: {
    heading: { fontSize: 24, bold: true },
    muted: { color: '#536771' },
    subheading: { extends: 'heading', fontSize: 16 }
  },
  content: [
    { text: 'A heading', style: 'heading' },
    { text: 'A muted heading', style: ['heading', 'muted'] },
    { text: 'An explicit override', style: 'heading', fontSize: 18 },
    { text: 'A subheading', style: 'subheading' }
  ]
};
```

`style` verweist auf Einträge in `styles`. Wenn mehrere Stile in einem Array dieselbe Eigenschaft definieren, hat der spätere Stil Vorrang. Explizite Eigenschaften des Knotens haben Vorrang vor seinen benannten Stilen. `defaultStyle` stellt dokumentweite Standardwerte bereit. Stile von Containern können an ihre Kindelemente vererbt werden; explizite Eigenschaften des Kindelements überschreiben sie.

Benannte Stile unterstützen `extends` seit **0.3.3**. Die Eigenschaft akzeptiert einen übergeordneten Namen oder ein Array mit Namen. Die eigenen Eigenschaften eines Stils haben Vorrang vor den übergeordneten; wenn mehrere übergeordnete Stile dieselbe Eigenschaft festlegen, hat der spätere Vorrang. Halte die Vererbung kurz und frei von Zyklen, damit das Ergebnis übersichtlich bleibt.

## Häufige Texteigenschaften

| Eigenschaft | Typ / Werte | Bedeutung |
| --- | --- | --- |
| `font` | Registrierter Familienname | Muss mit deiner Schriftzuordnung übereinstimmen |
| `fontSize` | Zahl, Punkte | Textgröße |
| `bold`, `italics` | Boolean, Standard `false` | Wählt die entsprechende Schriftvariante aus |
| `alignment` | `'left'`, `'center'`, `'right'`, `'justify'` | Absatzausrichtung |
| `lineHeight` | Zahl, Standard 1 | Zeilenhöhenmultiplikator |
| `color`, `background` | Farbname oder Hex-Zeichenfolge | Textfarbe und Texthintergrund |
| `characterSpacing` | Zahl, Punkte | Zusätzlicher Abstand zwischen Zeichen |
| `wordBreak` | `'normal'` (Standard), `'break-all'` | Verhalten beim Zeilenumbruch |
| `fontFeatures` | Array mit Zeichenfolgen | Schriftartspezifische typografische Merkmale |
| `style` | Zeichenfolge oder Array mit Zeichenfolgen | Anzuwendende benannte Stile |
| `markerColor` | Farbe | Farbe des Aufzählungszeichens |

Unterstützt werden benannte Farben und Hexwerte wie `'#08786b'`. Schriftmerkmale hängen von der ausgewählten Schriftart ab. Für `bold` oder `italics` muss die jeweilige Variante registriert sein; das Setzen einer Eigenschaft ersetzt keine fehlende Schriftdatei.

## Auszeichnungen

| Eigenschaft | Typ / Werte |
| --- | --- |
| `decoration` | `'underline'`, `'lineThrough'`, `'overline'` oder ein Array |
| `decorationStyle` | `'solid'`, `'dashed'`, `'dotted'`, `'double'`, `'wavy'` |
| `decorationColor` | Farbe |
| `decorationThickness` | Numerische Breite; seit 0.3.3 |

```js
var dd = {
  content: [{ text: 'A marked passage', decoration: 'underline', decorationStyle: 'wavy', decorationColor: '#08786b' }]
};
```

## Stile sind kein CSS

Verwende die dokumentierten Feldnamen von pdfmake. Es gibt weder CSS-Kaskade noch DOM-Selektor oder Browser-Boxmodell. Ränder werden in Punkten angegeben und folgen der Reihenfolge `[links, oben, rechts, unten]`. Um mehrere Blöcke gemeinsam zu formatieren, verwende einen [Stapel](/docs/0.3/de/document-definition-object/stack/). Informationen zur Registrierung von Schriftvarianten und Zeichenabdeckung findest du unter [Schriften](/docs/0.3/de/fonts/).
