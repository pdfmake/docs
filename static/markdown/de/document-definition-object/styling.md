# Stile und Formatierung

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/document-definition-object/styling/

## Blöcke oder Inline-Text formatieren

Eine Zeichenfolge ist ein einfacher Absatz. Verwende einen Textknoten, um Eigenschaften hinzuzufügen. Mit einem `text`-Array kannst du Textsegmente **innerhalb desselben Absatzes** unterschiedlich formatieren; ein `content`-Array oder ein Stapel erzeugt getrennte Blöcke.



### Runnable example: 04 · Text & named styles

**JavaScript**

```js
var dd = {
  content: [
    { text: 'Style with intent', style: 'heading' },
    { text: ['One paragraph with ', { text: 'bold', bold: true }, ' and ', { text: 'italic', italics: true }, ' inline text.'] },
    { text: 'A reusable note style.', style: 'note' },
    { ul: ['Readable defaults', 'Small style dictionaries', 'Consistent spacing'], margin: [0, 12, 0, 0] }
  ],
  defaultStyle: { fontSize: 12, lineHeight: 1.3 },
  styles: {
    heading: { fontSize: 26, bold: true, color: '#08786b', margin: [0, 0, 0, 18] },
    note: { fontSize: 10, color: '#536771', margin: [0, 12, 0, 0] }
  }
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [
    { text: 'Style with intent', style: 'heading' },
    { text: ['One paragraph with ', { text: 'bold', bold: true }, ' and ', { text: 'italic', italics: true }, ' inline text.'] },
    { text: 'A reusable note style.', style: 'note' },
    { ul: ['Readable defaults', 'Small style dictionaries', 'Consistent spacing'], margin: [0, 12, 0, 0] }
  ],
  defaultStyle: { fontSize: 12, lineHeight: 1.3 },
  styles: {
    heading: { fontSize: 26, bold: true, color: '#08786b', margin: [0, 0, 0, 18] },
    note: { fontSize: 10, color: '#536771', margin: [0, 12, 0, 0] }
  }
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/de/playground/?example=styles)



## Benannte Stile wiederverwenden

**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
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

**JavaScript**

```js
var dd = {
  content: [{ text: 'A marked passage', decoration: 'underline', decorationStyle: 'wavy', decorationColor: '#08786b' }]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [{ text: 'A marked passage', decoration: 'underline', decorationStyle: 'wavy', decorationColor: '#08786b' }]
};
```

## Stile sind kein CSS

Verwende die dokumentierten Feldnamen von pdfmake. Es gibt weder CSS-Kaskade noch DOM-Selektor oder Browser-Boxmodell. Ränder werden in Punkten angegeben und folgen der Reihenfolge `[links, oben, rechts, unten]`. Um mehrere Blöcke gemeinsam zu formatieren, verwende einen [Stapel](/docs/0.3/de/document-definition-object/stack/). Informationen zur Registrierung von Schriftvarianten und Zeichenabdeckung findest du unter [Schriften](/docs/0.3/de/fonts/).
