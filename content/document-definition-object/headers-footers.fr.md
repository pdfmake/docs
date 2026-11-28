+++
title = "En-têtes et pieds de page"
description = "Ajoutez des en-têtes et pieds de page statiques ou dynamiques avec les numéros de page, le nombre total de pages et les marges réservées."
weight = 2050
sourceDigest = "a47e47aa446dfbb4a3b97ade1254c9b6edbe8abfc9b34ac2cd7d2cfaac111b14"
+++

## Ajouter un en-tête statique

```js
var docDefinition = {
  pageMargins: [40, 65, 40, 55],
  header: { text: 'Example report', margin: [40, 20, 40, 0] },
  footer: { text: 'Example Studio', alignment: 'center', fontSize: 9 },
  content: ['Document content']
};
```

Les en-têtes et pieds de page sont répétés sur toutes les pages. Réservez une marge supérieure et inférieure suffisante pour leur contenu : ils n’agrandissent pas automatiquement les marges du corps. Le contenu renvoyé utilise les nœuds pdfmake habituels.

## Ajouter les numéros de page

```js
var docDefinition = {
  pageMargins: [40, 65, 40, 55],
  header: function (currentPage, pageCount, pageSize) {
    return {
      text: 'Report · ' + pageSize.width + ' pt wide',
      alignment: currentPage % 2 ? 'left' : 'right',
      margin: [40, 20, 40, 0],
      fontSize: 9
    };
  },
  footer: function (currentPage, pageCount) {
    return { text: currentPage + ' of ' + pageCount, alignment: 'center', fontSize: 9 };
  },
  content: ['First page', { text: 'Second page', pageBreak: 'before' }]
};
```

Les fonctions de rappel reçoivent le numéro de la page courante (à partir de 1), le nombre total de pages et le format de page. Renvoyez un nouveau nœud à chaque appel. Gardez ces fonctions déterministes et évitez de modifier des données partagées de l’application.
