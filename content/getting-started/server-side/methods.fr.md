+++
title = "Méthodes de sortie Node.js"
description = "Référence de createPdf, Buffer, base64, sortie fichier, flux et politiques de ressources dans pdfmake 0.3."
weight = 12
sourceDigest = "f0daec88513f195e653aeface6a0c5a92da517ba092a13919c74940aa3169a09"
+++

## Créer un document

```js
const output = pdfmake.createPdf(docDefinition, options);
```

`docDefinition` est une [définition de document](/docs/0.3/fr/document-definition-object/). `options` est un [objet d’options](/docs/0.3/fr/options/) facultatif. `createPdf` renvoie immédiatement un objet de sortie ; les erreurs de génération rejettent la Promise de la méthode de sortie. Des types d’arguments invalides peuvent provoquer une exception synchrone.

## Méthodes de sortie

| Méthode | Valeur résolue | Utilisation |
| --- | --- | --- |
| `write(filename)` | `undefined` | Écrit un fichier et attend sa fermeture |
| `getBuffer()` | `Buffer` | Renvoie les octets PDF depuis une API |
| `getBase64()` | `string` | Encode les octets en base64 |
| `getDataUrl()` | `string` | Préfixe le base64 avec `data:application/pdf;base64,` |
| `getStream()` | Flux de document PDFKit | Gère directement un flux |

```js
try {
  const output = pdfmake.createPdf(docDefinition);
  const bytes = await output.getBuffer();
  // Send or store bytes here.
} catch (error) {
  // Report generation failure to your caller.
}
```

`getBuffer()` met sa Promise en cache ; `getBase64()` et `getDataUrl()` réutilisent ces octets. Créez un nouvel objet de sortie pour chaque rendu indépendant. Ne combinez pas la lecture manuelle d’un flux avec les méthodes de sortie buffer ou fichier sur le même objet.

## Consommer un flux

```js
const stream = await pdfmake.createPdf(docDefinition).getStream();
stream.on('error', error => { /* Handle generation errors. */ });
destination.on('error', error => { /* Handle destination errors. */ });
stream.pipe(destination);
stream.end();
```

`destination` doit être un flux inscriptible géré par votre application. Ajoutez les écouteurs avant d’appeler `end()`. Pour écrire simplement un fichier, préférez `write()`. La sortie en flux ne rend pas la mise en page incrémentale : pdfmake compose le document avant de renvoyer ce flux.

## Politique d’accès aux URL

Disponible depuis la version **0.3.6**. Configurez cette politique avant de créer les documents :

```js
pdfmake.setUrlAccessPolicy(url => {
  const parsed = new URL(url);
  return parsed.protocol === 'https:' && parsed.hostname === 'assets.example.com';
});
```

La fonction de rappel doit renvoyer **synchroniquement** la valeur booléenne `true` pour autoriser une URL. Une fonction `async` renvoie une Promise et est rejetée par l’implémentation actuelle. Une liste d’autorisation n’est qu’une couche de protection contre les SSRF ; utilisez des contrôles réseau ou fournissez des octets validés si vous traitez des entrées non fiables. Consultez la [sécurité des ressources](/docs/0.3/fr/guides/resource-security/).

## Politique d’accès aux fichiers locaux

Disponible depuis la version **0.3.8**. Refusez l’accès aux fichiers locaux lorsque toutes les ressources sont intégrées :

```js
pdfmake.setLocalAccessPolicy(() => false);
```

Pour les polices ou images locales, autorisez des chemins résolus exacts plutôt qu’un préfixe de chaîne. Consultez la [configuration complète des polices locales](/docs/0.3/fr/fonts/). `undefined` efface une politique configurée ; l’absence de politique ne signifie pas que tout accès est refusé.
