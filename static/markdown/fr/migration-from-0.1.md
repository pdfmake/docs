# Migration depuis 0.1/0.2

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/migration-from-0.1/

## Mettre à niveau avec précaution

Épinglez la version que vous évaluez. Conservez des PDF représentatifs et les entrées et polices qui les génèrent. Avant une mise à niveau en production, comparez le texte extrait, le nombre de pages et les pages rendues. Une égalité octet par octet est souvent inadaptée, car les métadonnées et identifiants PDF peuvent varier.

## Remplacer l’API de constructeur Node

Les anciens exemples Node instancient `PdfPrinter` et appellent `createPdfKitDocument`. Dans 0.3, utilisez le singleton :

**JavaScript**

```js
const pdfmake = require('pdfmake');
pdfmake.addFonts(fonts);
await pdfmake.createPdf(docDefinition).write('document.pdf');
```

**TypeScript**

```ts
import pdfmake from "pdfmake";
pdfmake.addFonts(fonts);
await pdfmake.createPdf(docDefinition).write('document.pdf');
```

`fonts` doit être une table de familles valide, comme dans le [démarrage Node](/docs/0.3/fr/getting-started/server-side/) et le [guide des polices](/docs/0.3/fr/fonts/). Configurez les règles d’accès et les mises en page au démarrage ; évitez de modifier l’état partagé du singleton à chaque requête.

## Attendre les fonctions de sortie

Remplacez les sorties navigateur basées sur des callbacks par des Promises :

**JavaScript**

```js
const data = await pdfMake.createPdf(docDefinition).getBase64();
```

**TypeScript**

```ts
const data = await pdfMake.createPdf(docDefinition).getBase64();
```

Gérez les rejets des fonctions de sortie. Consultez les [méthodes Node](/docs/0.3/fr/getting-started/server-side/methods/) ou les [méthodes navigateur](/docs/0.3/fr/getting-started/client-side/methods/) selon l’environnement visé.

## Régénérer le stockage des polices du navigateur

Régénérez les fichiers VFS personnalisés et utilisez `addVirtualFileSystem` pour les enregistrer. Ne supposez pas qu’un ancien fichier de polices généré a la même structure que le bundle actuel. Consultez les [polices VFS](/docs/0.3/fr/fonts/custom-fonts-client-side/vfs/).

## Mettre à jour pageBreakBefore

La version 0.1/0.2 transmettait des tableaux de nœuds distincts. La version 0.3 transmet un conteneur de nœuds :

**JavaScript**

```js
var dd = { content: ['Example document'],
pageBreakBefore: function (currentNode, nodeContainer) {
  return currentNode.headlineLevel === 1 &&
    nodeContainer.getFollowingNodesOnPage().length === 0;
}
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: ['Example document'],
pageBreakBefore: function (currentNode, nodeContainer) {
  return currentNode.headlineLevel === 1 &&
    nodeContainer.getFollowingNodesOnPage().length === 0;
}
};
```

Le conteneur propose aussi `getNodesOnNextPage()` et `getPreviousNodesOnPage()`. Cet extrait est une propriété d’une définition, pas du JavaScript autonome. Voir les [sauts de page](/docs/0.3/fr/document-definition-object/page/).

## Configurer l’accès aux ressources

À partir de **0.3.6**, configurez une règle d’accès URL synchrone ; à partir de **0.3.8**, configurez une règle pour les fichiers locaux. Testez les ressources autorisées et refusées. Voir la [sécurité des ressources](/docs/0.3/fr/guides/resource-security/).
