+++
title = "Styles et mise en forme"
description = "Mettez en forme le texte avec des styles nommés, des variantes de police, l’alignement, les couleurs et l’héritage dans pdfmake 0.3."
weight = 2010
alwaysopen = true
sourceDigest = "9369a9e17f5173482ecd79123f5aee3a2489a7678b916cec9f9003263fe860ae"
+++

## Mettre en forme un bloc ou un segment en ligne

Une chaîne est un paragraphe simple. Utilisez un nœud de texte pour lui ajouter des propriétés. Un tableau `text` permet de définir des segments de styles différents au sein du **même paragraphe** ; un tableau `content` ou une pile crée des blocs distincts.

{{< example id="styles" >}}

## Réutiliser des styles nommés

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

```js
var dd = {
  content: [{ text: 'A marked passage', decoration: 'underline', decorationStyle: 'wavy', decorationColor: '#08786b' }]
};
```

## Les styles ne sont pas du CSS

Utilisez les noms de champs documentés par pdfmake. Il n’existe ni cascade CSS, ni sélecteur DOM, ni modèle de boîte du navigateur. Les marges sont exprimées en points et suivent l’ordre `[gauche, haut, droite, bas]`. Pour mettre en forme plusieurs blocs ensemble, utilisez une [pile](/docs/0.3/fr/document-definition-object/stack/). Consultez [Polices](/docs/0.3/fr/fonts/) pour l’enregistrement des variantes et la couverture des caractères.
