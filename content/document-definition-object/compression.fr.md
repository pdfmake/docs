+++
title = "Compression"
description = "Contrôlez la compression des flux PDF avec le champ `compress` de la définition du document, activé par défaut."
weight = 2280
sourceDigest = "92de3279ae232bb95314ce206d2d5914ca81723e46208aabd408dce25d90db55"
+++

## Comportement par défaut

La compression des flux PDF est activée par défaut. Pour la désactiver lors d’une inspection :

```js
var docDefinition = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

`compress` est un booléen de la définition du document, pas de l’objet d’options de `createPdf`. La désactivation augmente généralement la taille du fichier. Elle ne supprime ni l’incorporation des polices ni les données d’image et ne réduit pas la mémoire utilisée pour la mise en page. Consultez [les performances](/docs/0.3/fr/guides/performance/) pour savoir comment mesurer les résultats.
