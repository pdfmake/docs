# Compression

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/compression/

## Comportement par défaut

La compression des flux PDF est activée par défaut. Pour la désactiver lors d’une inspection :

**JavaScript**

```js
var docDefinition = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  compress: false,
  content: ['An uncompressed example document.']
};
```

`compress` est un booléen de la définition du document, pas de l’objet d’options de `createPdf`. La désactivation augmente généralement la taille du fichier. Elle ne supprime ni l’incorporation des polices ni les données d’image et ne réduit pas la mémoire utilisée pour la mise en page. Consultez [les performances](/docs/0.3/fr/guides/performance/) pour savoir comment mesurer les résultats.
