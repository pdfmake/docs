+++
title = "Colonnes en serpentin"
description = "Faites circuler le contenu verticalement d’une colonne à l’autre dans une mise en page en colonnes."
weight = 2025
alwaysopen = true
sourceDigest = "d3e6aecd99823a11767f72c7ac5e205d78dcb0fcc84bdd4fe9694a3ab50ff869"
+++

{{% alert theme="warning" %}}Version minimale : **0.3.5**{{% /alert %}}

Les colonnes en serpentin (ou colonnes de style journal) sont un mode de mise en page où le contenu descend dans la première colonne, puis continue en haut de la colonne suivante, en alternant si nécessaire. Au lieu de recommencer en haut à chaque nouvelle rangée de colonnes, le contenu suit les colonnes disponibles dans un ordre de lecture continu.

Lorsque `snakingColumns: true` est activé, seul le contenu de la **première colonne** doit être renseigné. Les colonnes suivantes servent de cibles de débordement vides.

```js
var myLongContent = 'A paragraph flowing through snaking columns. '.repeat(120);
var docDefinition = {
    content: [
        {
            columns: [
                {text: myLongContent, width: '*'},  // Content goes here
                {text: '', width: '*'},             // Empty overflow target
                {text: '', width: '*'}              // Empty overflow target
            ],
            snakingColumns: true
        }
    ]
};
```

L’imbrication directe d’une colonne en serpentin dans une autre colonne en serpentin (mise en page récursive en serpentin) n’est pas prise en charge.

**Recommandations :**
- Évitez d’imbriquer profondément des colonnes en serpentin les unes dans les autres.
- Les colonnes standard (sans serpentin) peuvent être imbriquées sans risque dans des colonnes en serpentin.
- Les colonnes en serpentin peuvent être imbriquées sans risque dans des colonnes standard.
