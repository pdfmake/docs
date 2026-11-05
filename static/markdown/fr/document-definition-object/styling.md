# Styles et mise en forme

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/styling/

## Mettre en forme un bloc ou un segment en ligne

Une chaîne est un paragraphe simple. Utilisez un nœud de texte pour lui ajouter des propriétés. Un tableau `text` permet de définir des segments de styles différents au sein du **même paragraphe** ; un tableau `content` ou une pile crée des blocs distincts.



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

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/fr/playground/?example=styles)



## Réutiliser des styles nommés

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

`style` fait référence aux entrées de `styles`. Lorsqu’elles définissent la même propriété, les styles placés plus tard dans un tableau sont prioritaires. Les propriétés explicites du nœud priment sur ses styles nommés. `defaultStyle` fournit les valeurs par défaut du document. Les styles des conteneurs peuvent être hérités par leurs enfants ; les propriétés explicites d’un enfant les remplacent.

L’héritage des styles nommés avec `extends` est disponible depuis **0.3.3**. Il accepte le nom d’un parent ou un tableau de noms. Les propriétés propres au style priment sur celles de ses parents ; si plusieurs parents définissent la même propriété, celles du parent placé plus tard sont prioritaires. Gardez une hiérarchie courte et sans cycle pour qu’elle reste facile à comprendre.

## Propriétés de texte courantes

| Propriété | Type / valeurs | Signification |
| --- | --- | --- |
| `font` | Nom de famille enregistrée | Doit correspondre à votre configuration de polices |
| `fontSize` | Nombre, en points | Taille du texte |
| `bold`, `italics` | Booléen, `false` par défaut | Sélectionne la variante de police correspondante |
| `alignment` | `'left'`, `'center'`, `'right'`, `'justify'` | Alignement du paragraphe |
| `lineHeight` | Nombre, 1 par défaut | Multiplicateur de hauteur de ligne |
| `color`, `background` | Nom de couleur ou chaîne hexadécimale | Couleur du texte et arrière-plan du texte |
| `characterSpacing` | Nombre, en points | Espacement supplémentaire entre les caractères |
| `wordBreak` | `'normal'` (par défaut), `'break-all'` | Comportement du retour à la ligne |
| `fontFeatures` | Tableau de chaînes | Fonctionnalités typographiques propres à la police |
| `style` | Chaîne ou tableau de chaînes | Styles nommés à appliquer |
| `markerColor` | Couleur | Couleur de la puce |

Les noms de couleurs et les valeurs hexadécimales comme `'#08786b'` sont pris en charge. Les fonctionnalités typographiques dépendent de la police sélectionnée. Pour utiliser `bold` ou `italics`, la variante correspondante doit être enregistrée ; activer l’option ne fournit pas le fichier de police manquant.

## Décorations

| Propriété | Type / valeurs |
| --- | --- |
| `decoration` | `'underline'`, `'lineThrough'`, `'overline'` ou un tableau |
| `decorationStyle` | `'solid'`, `'dashed'`, `'dotted'`, `'double'`, `'wavy'` |
| `decorationColor` | Couleur |
| `decorationThickness` | Épaisseur numérique ; depuis 0.3.3 |

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

## Les styles ne sont pas du CSS

Utilisez les noms de champs documentés par pdfmake. Il n’existe ni cascade CSS, ni sélecteur DOM, ni modèle de boîte du navigateur. Les marges sont exprimées en points et suivent l’ordre `[gauche, haut, droite, bas]`. Pour mettre en forme plusieurs blocs ensemble, utilisez une [pile](/docs/0.3/fr/document-definition-object/stack/). Consultez [Polices](/docs/0.3/fr/fonts/) pour l’enregistrement des variantes et la couverture des caractères.
