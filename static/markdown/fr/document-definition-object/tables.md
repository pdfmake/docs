# Tableaux

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/tables/

## Commencer par des lignes et un en-tête répété

Utilisez un tableau lorsque les cellules de différentes lignes doivent s’aligner. `body` est un tableau de lignes, elles-mêmes représentées par des tableaux. Chaque ligne doit contenir le même nombre de cellules ; une cellule peut contenir du texte ou d’autres nœuds pdfmake. `headerRows: 1` répète la première ligne si le tableau se poursuit sur une autre page.



### Runnable example: 03 · Tables & repeating headers

**JavaScript**

```js
var rows = Array.from({ length: 65 }, (_, i) => [
  'Item ' + (i + 1), 'A row that can continue across pages', String(i + 1)
]);
var dd = {
  content: [
    { text: 'A longer table', fontSize: 24, bold: true, margin: [0, 0, 0, 16] },
    { layout: 'lightHorizontalLines', table: {
      headerRows: 1, widths: [70, '*', 40],
      body: [[{ text: 'Item', bold: true }, { text: 'Description', bold: true }, { text: 'Qty', bold: true }], ...rows]
    } }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var rows = Array.from({ length: 65 }, (_, i) => [
  'Item ' + (i + 1), 'A row that can continue across pages', String(i + 1)
]);
var dd: TDocumentDefinitions = {
  content: [
    { text: 'A longer table', fontSize: 24, bold: true, margin: [0, 0, 0, 16] },
    { layout: 'lightHorizontalLines', table: {
      headerRows: 1, widths: [70, '*', 40],
      body: [[{ text: 'Item', bold: true }, { text: 'Description', bold: true }, { text: 'Qty', bold: true }], ...rows]
    } }
  ]
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/fr/playground/?example=tables)



## Choisir les largeurs

| Largeur | Signification | Utile lorsque |
| --- | --- | --- |
| Un nombre, par exemple `80` | Largeur fixe en points | Pour des codes, des quantités ou une colonne d’intitulés de largeur prévisible |
| `'*'` | Partage la largeur restante | Pour qu’une description occupe l’espace disponible |
| `'auto'` | Mesure le contenu | Pour que des intitulés courts n’occupent que la largeur nécessaire |
| Une chaîne en pourcentage | Largeur proportionnelle | Pour une mise en page proportionnelle ; testez soigneusement les largeurs mixtes |

Les bordures, le remplissage, les marges de page et les autres colonnes consomment aussi de l’espace. Commencez par des largeurs fixes et étoilées, puis utilisez `auto` lorsque le dimensionnement selon le contenu est voulu. Évitez les grandes largeurs fixes qui dépassent la zone de contenu.

## Propriétés des tableaux et des cellules

| Propriété | Emplacement | Type / rôle |
| --- | --- | --- |
| `body` | `table` | Tableaux non vides représentant les lignes |
| `widths` | `table` | Descripteurs de largeur, un par colonne |
| `headerRows` | `table` | Nombre de lignes initiales répétées comme en-têtes |
| `dontBreakRows` | `table` | Empêche une ligne individuelle de se couper entre deux pages |
| `keepWithHeaderRows` | `table` | Nombre de lignes suivantes à garder avec l’en-tête |
| `layout` | Nœud, à côté de `table` | Nom de disposition intégrée, nom personnalisé enregistré ou objet de disposition |
| `tableAlignment` | Nœud à côté de `table` | Alignement horizontal du tableau entier : `left`, `center`, `right` ; depuis 0.3.13 |
| `colSpan`, `rowSpan` | Cellule | Nombre positif de colonnes ou lignes couvertes ; les cellules de remplacement restent nécessaires |
| `verticalAlignment` | Cellule | `'top'` (par défaut), `'middle'` ou `'bottom'` |
| `border` | Cellule | Quatre booléens : gauche, haut, droite, bas |
| `borderColor` | Cellule | Quatre couleurs dans le même ordre |
| `fillColor` | Cellule | Couleur d’arrière-plan ou tuple de motif pris en charge |
| `fillOpacity` | Cellule | Opacité numérique de l’arrière-plan |
| `overlayPattern`, `overlayOpacity` | Cellule | Tuple de motif et opacité numérique appliqués par-dessus le contenu |

Garder une ligne entière ne permet pas de faire tenir une ligne trop grande sur une page. Testez les descriptions longues et les contenus imbriqués avec le format de page et les polices réellement utilisés.

## Aligner le tableau entier

**Depuis 0.3.13.** Placez `tableAlignment` sur le nœud à côté de `table`. Les valeurs possibles sont `left` (par défaut), `center` et `right`. Cette propriété positionne le tableau entier dans la largeur disponible ; utilisez séparément `alignment` pour le texte des cellules.

**JavaScript**

```js
var docDefinition = {
  content: [{
    tableAlignment: 'center',
    alignment: 'left',
    table: {
      widths: ['auto', 'auto'],
      body: [['Item', 'Quantity'], ['Example', '2']]
    }
  }]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: [{
    tableAlignment: 'center',
    alignment: 'left',
    table: {
      widths: ['auto', 'auto'],
      body: [['Item', 'Quantity'], ['Example', '2']]
    }
  }]
};
```

L’exemple centre le tableau tout en gardant son texte aligné à gauche. Utilisez `tableAlignment: 'right'` pour un tableau aligné à droite. L’alignement est visible si le tableau est plus étroit que la largeur disponible, par exemple avec `auto` ou des largeurs de colonnes fixes. Les tableaux qui remplissent ou dépassent cette largeur restent à gauche. Les marges et la colonne ou cellule qui contient le tableau déterminent la largeur disponible.

## Fusionner des cellules sans modifier la longueur des lignes

**JavaScript**

```js
var dd = {
  content: [{
    table: {
      widths: ['*', '*', '*'],
      body: [
        [{ text: 'A heading across three columns', colSpan: 3, bold: true }, {}, {}],
        [{ text: 'Two rows', rowSpan: 2 }, 'A', 'B'],
        [{}, 'C', 'D']
      ]
    }
  }]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [{
    table: {
      widths: ['*', '*', '*'],
      body: [
        [{ text: 'A heading across three columns', colSpan: 3, bold: true }, {}, {}],
        [{ text: 'Two rows', rowSpan: 2 }, 'A', 'B'],
        [{}, 'C', 'D']
      ]
    }
  }]
};
```

Les objets vides occupent les cellules couvertes par une fusion. Les omettre rend la ligne incohérente. N’utilisez pas `undefined` comme valeur de remplacement. L’[exemple de fusion dans le playground](/docs/0.3/fr/playground/?example=spans) présente cette définition.

## Utiliser une disposition intégrée

Les dispositions `noBorders`, `headerLineOnly` et `lightHorizontalLines` sont disponibles par leur nom. Placez `layout` à côté de `table`, et non à l’intérieur :

**JavaScript**

```js
var dd = {
  content: [{
    layout: 'lightHorizontalLines',
    table: { headerRows: 1, widths: ['*', 'auto'], body: [['Item', 'Qty'], ['Notebook', 3]] }
  }]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
  content: [{
    layout: 'lightHorizontalLines',
    table: { headerRows: 1, widths: ['*', 'auto'], body: [['Item', 'Qty'], ['Notebook', 3]] }
  }]
};
```

## Enregistrer une disposition personnalisée

Enregistrez les dispositions avant de créer le document. Dans Node, utilisez votre instance `pdfmake` configurée ; dans le navigateur, utilisez `pdfMake`.

**JavaScript**

```js
pdfMake.addTableLayouts({
  compact: {
    hLineWidth: function (index, node) {
      return index === node.table.headerRows ? 1 : 0;
    },
    vLineWidth: function () { return 0; },
    hLineColor: function () { return '#b7cfc4'; },
    paddingLeft: function () { return 6; },
    paddingRight: function () { return 6; }
  }
});

var dd = {
  content: [{ layout: 'compact', table: { headerRows: 1, body: [['Item', 'Qty'], ['Notebook', 3]] } }]
};
```

**TypeScript**

```ts
import pdfMake from "pdfmake/build/pdfmake.js";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

pdfMake.addTableLayouts({
  compact: {
    hLineWidth: function (index, node) {
      return index === node.table.headerRows ? 1 : 0;
    },
    vLineWidth: function () { return 0; },
    hLineColor: function () { return '#b7cfc4'; },
    paddingLeft: function () { return 6; },
    paddingRight: function () { return 6; }
  }
});

var dd: TDocumentDefinitions = {
  content: [{ layout: 'compact', table: { headerRows: 1, body: [['Item', 'Qty'], ['Notebook', 3]] } }]
};
```

Cet extrait suppose que le moteur du navigateur et les polices sont chargés. Déclarer une variable de disposition ne suffit pas à l’enregistrer. Préférez des fonctions de rappel déterministes ; évitez de modifier une configuration partagée pendant des tâches Node concurrentes.

## Diagnostiquer les tableaux mal formés

Vérifiez `body` avant de modifier les bordures ou les largeurs : il doit contenir des tableaux de lignes dont les longueurs concordent. Vérifiez ensuite les cellules de remplacement des fusions. Dans la branche locale d’amélioration, les diagnostics indiquent le chemin de définition fautif et le nombre de cellules attendu. Consultez [Erreurs et diagnostics](/docs/0.3/fr/guides/errors/).
