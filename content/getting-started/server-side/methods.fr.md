+++
title = "Méthodes de sortie Node.js"
description = "Référence de createPdf, Buffer, base64, sortie fichier, flux et politiques de ressources dans pdfmake 0.3."
weight = 12
sourceDigest = "ff47a732e18c9c08cfc98efcc0de158311bc3d96ebe7d1ca0c1d2deea2cf6c72"
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

## Politique d’accès aux URL {#url-access-policy}

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

## Cache des ressources URL {#url-resource-caching}

Disponible dans la branche de développement amont pour **0.3.14** ; absent du moteur 0.3.13 fixé pour le playground.

Appelez `setUrlResourceCaching(enabled)` avec un booléen obligatoire pour partager les nouveaux téléchargements URL entre documents. La valeur par défaut est `false`. Un objet ressource `{ url, headers, cache }` remplace ce réglage ; `headers` est facultatif. Cela concerne les polices, images, sources de pièces jointes et fichiers intégrés. La valeur `false` affecte les générations suivantes, conserve les entrées existantes et ne remplace pas un `cache: true` explicite. Avant 0.3.14, les téléchargements étaient automatiquement partagés ; `true` rétablit ce comportement.

```js
pdfmake.setUrlResourceCaching(true);

var docDefinition = {
  content: [{ image: 'logo' }, { image: 'photo' }],
  images: {
    // Uses the global caching setting.
    logo: 'https://example.com/logo.png',
    photo: {
      url: 'https://example.com/photo.png',
      headers: { Authorization: 'Bearer token' },
      // Store a new download only for this document.
      cache: false
    }
  }
};

pdfmake.createPdf(docDefinition).write('document.pdf');
```

Les nouveaux téléchargements sont conservés par document par défaut. `cache: true` stocke les nouvelles données dans le cache mémoire partagé pour les documents suivants ; `cache: false` permet toujours de lire une entrée partagée existante. Les URL textuelles et les objets sans `cache` utilisent le réglage global. Le cache HTTP du navigateur est indépendant.

La clé des ressources partagées est uniquement leur URL, même si `Authorization` ou les autres en-têtes diffèrent. Une lecture du cache ne contacte pas le serveur et ne vérifie pas de nouveau les autorisations auprès de celui-ci. Évitez le cache partagé si le contenu ou les autorisations dépendent des en-têtes. La [règle d’accès URL](#url-access-policy) concerne les téléchargements réseau, pas les lectures du cache.

## Vider le cache des ressources URL {#clear-url-resource-cache}

Disponible dans la branche de développement amont pour **0.3.14** ; absent du moteur 0.3.13 fixé pour le playground.

`clearUrlResourceCache()` ne prend aucun paramètre et supprime synchroniquement les entrées partagées commençant par `http://` ou `https://`, sans distinction de casse. Les autres fichiers VFS, ressources propres au document et réglages globaux sont conservés. Appelez-la entre les générations, après la fin des opérations actives ; elle n’annule pas les téléchargements en cours et ne vide pas le cache HTTP du navigateur.

```js
pdfmake.clearUrlResourceCache();
pdfmake.createPdf(docDefinition).write('document.pdf');
```
