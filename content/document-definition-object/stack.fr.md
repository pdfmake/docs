+++
title = "Pile de paragraphes"
description = "Utilisez des tableaux ou la propriété `stack` pour empiler des paragraphes et appliquer un style à l’ensemble."
weight = 2080
alwaysopen = true
sourceDigest = "9fe0fd923768dfa5981b12db404c9abfe438f65b26f6f0bafe27d8c8bb784a5f"
+++

Vous avez pu constater dans les exemples que si vous définissez la clé `content` comme un tableau, le document devient une pile de paragraphes.

Vous réutiliserez souvent cette structure dans un élément imbriqué, comme dans l’exemple suivant :
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

Avec un tableau, vous ne pouvez pas ajouter de propriétés de style (pour modifier `fontSize`, par exemple).

Heureusement, un tableau est simplement un raccourci pdfMake pour `{ stack: [] }`. Pour appliquer un nouveau style à toute la pile, utilisez la définition développée :
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

## Garder une pile ensemble

Définissez `unbreakable: true` pour conserver une pile sur une page si elle tient. Si seule la place restante est insuffisante, la pile entière passe à la page suivante. Pour les piles trop grandes, voir [Débordement des blocs insécables](/docs/0.3/fr/options/#unbreakable-overflow).

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
