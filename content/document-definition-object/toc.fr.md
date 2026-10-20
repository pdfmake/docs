+++
title = "Table des matières"
description = "Générez une ou plusieurs tables des matières depuis des nœuds marqués, avec tri, styles et signets PDF facultatifs."
weight = 2230
sourceDigest = "54b38f6844726a1c78499e217c2cf64d2cebd568ef974973ac6c9a7ee39cac11"
+++

## Marquer les titres à inclure

```js
var docDefinition = {
  content: [
    { toc: { title: { text: 'Contents', fontSize: 20, bold: true }, numberStyle: { bold: true } } },
    { text: 'Introduction', tocItem: true, fontSize: 18, margin: [0, 20, 0, 10] },
    'Document body',
    { text: 'Details', tocItem: true, pageBreak: 'before', fontSize: 18 }
  ]
};
```

Le nœud `toc` insère la liste générée ; `tocItem` marque les nœuds texte à inclure. Les numéros de page sont calculés pendant la mise en page.

## Plusieurs tables des matières

Chaque ToC est un nœud de contenu distinct. Utilisez des identifiants pour sélectionner la liste à laquelle chaque élément appartient :

```js
var docDefinition = {
  content: [
    { toc: { id: 'main', title: 'All sections' } },
    { toc: { id: 'details', title: 'Detailed sections' } },
    { text: 'Overview', tocItem: 'main' },
    { text: 'Technical details', tocItem: ['main', 'details'], pageBreak: 'before' }
  ]
};
```

Ne placez pas deux clés `toc` dans le même objet : JavaScript ne conserve que la dernière valeur.

## Options de la table des matières

| Champ | Type | Signification |
| --- | --- | --- |
| `id` | string | Identifiant de la ToC nommée |
| `title` | string ou nœud texte | Titre facultatif |
| `textStyle`, `numberStyle` | objet de style | Style du texte et des numéros de page des entrées |
| `textMargin` | marge | Espacement des entrées |
| `hideEmpty` | boolean | Masque une ToC vide ; false par défaut, depuis 0.3.3 |
| `sortBy` | `'page'` ou `'title'` | Ordre ; page par défaut, depuis 0.3.3 |
| `sortLocale` | string | Paramètre régional de tri ; celui de l’environnement par défaut, depuis 0.3.3 |
| `outlines` | boolean | Inclut les entrées dans les signets PDF ; depuis 0.3.5 |

Sur un nœud texte marqué, `tocItem` accepte `true`, un identifiant ou un tableau d’identifiants. Les propriétés `textStyle`, `numberStyle` et `textMargin` du nœud peuvent personnaliser son entrée. Consultez les [plans de document](/docs/0.3/fr/document-definition-object/outlines/) pour les options de signets.
