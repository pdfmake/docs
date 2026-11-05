# Colonnes en serpentin

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/snaking-columns/

> **Note:** Version minimale : **0.3.5**


Les colonnes en serpentin (ou colonnes de style journal) sont un mode de mise en page où le contenu descend dans la première colonne, puis continue en haut de la colonne suivante, en alternant si nécessaire. Au lieu de recommencer en haut à chaque nouvelle rangée de colonnes, le contenu suit les colonnes disponibles dans un ordre de lecture continu.

Lorsque `snakingColumns: true` est activé, seul le contenu de la **première colonne** doit être renseigné. Les colonnes suivantes servent de cibles de débordement vides.

**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var myLongContent = 'A paragraph flowing through snaking columns. '.repeat(120);
var docDefinition: TDocumentDefinitions = {
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
