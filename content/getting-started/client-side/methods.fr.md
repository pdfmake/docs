+++
title = "Méthodes de sortie du navigateur"
description = "Téléchargez, ouvrez ou imprimez des PDF et obtenez leurs octets ou Blob avec les méthodes Promise de pdfmake 0.3 pour navigateur."
weight = 11
sourceDigest = "f69f5556c2e28d9323b3138c4731cca34aab6db68eb30a591f8dbcd51c05d4a9"
+++

## Créer un document

Après avoir [chargé le moteur et les polices](/docs/0.3/fr/getting-started/client-side/) :

```js
const output = pdfMake.createPdf(docDefinition, options);
```

Le deuxième argument facultatif contient les [options de rendu](/docs/0.3/fr/options/). `createPdf` renvoie immédiatement un objet de sortie. Les méthodes de sortie renvoient des Promises ; gérez leurs rejets.

## Choisir une sortie

| Méthode | Valeur résolue | Comportement |
| --- | --- | --- |
| `download(filename?)` | `undefined` | Lance un téléchargement ; le nom de fichier par défaut est `file.pdf` |
| `open(window?)` | `undefined` | Navigue vers le PDF généré dans une nouvelle fenêtre ou une fenêtre fournie |
| `print(window?)` | `undefined` | Ouvre un PDF avec une action d’impression ; le comportement varie selon le lecteur |
| `getBlob()` | `Blob` | Données binaires avec le type MIME `application/pdf` |
| `getBuffer()` | Octets compatibles avec Buffer | Octets PDF bruts |
| `getBase64()` | `string` | PDF encodé en base64 |
| `getDataUrl()` | `string` | URL de données base64 |
| `getStream()` | Flux PDFKit | Sortie de bas niveau ; préférez généralement Blob ou les octets |

```js
try {
  await pdfMake.createPdf(docDefinition).download('report.pdf');
} catch (error) {
  console.error('PDF generation failed', error);
}
```

La résolution de la Promise de téléchargement ne confirme pas que l’utilisateur a enregistré le fichier. L’impression dépend du navigateur et du lecteur PDF ; ne vous fiez pas à l’impression silencieuse.

## Ouvrir après une opération asynchrone

Ouvrez la fenêtre directement dans le gestionnaire de clic de l’utilisateur, avant d’attendre les données. Sinon, le bloqueur de fenêtres surgissantes peut refuser l’ouverture.

```js
async function openReport() {
  const win = window.open('', '_blank');
  if (!win) throw new Error('Allow popups to open the PDF');
  try {
    const response = await fetch('/report-data');
    if (!response.ok) throw new Error('Could not load report data');
    const data = await response.json();
    const definition = { content: [String(data.title)] };
    await pdfMake.createPdf(definition).open(win);
  } catch (error) {
    win.close();
    throw error;
  }
}
```

Appelez `openReport` depuis le gestionnaire de clic de votre application et gérez le rejet de sa Promise. Pour imprimer, remplacez `.open(win)` par `.print(win)`. Le passage de `window` navigue dans l’onglet actuel. Définissez le [titre des métadonnées](/docs/0.3/fr/document-definition-object/document-medatadata/) du document pour identifier le PDF ; le nom de fichier et le titre affichés par le lecteur dépendent du navigateur.

## Gérer les URL Blob

```js
const blob = await pdfMake.createPdf(docDefinition).getBlob();
const url = URL.createObjectURL(blob);
document.querySelector('#preview').src = url;
// Revoke url when replacing the preview or removing it, after it is no longer needed.
```

Conservez l’URL tant que le lecteur l’utilise. Appelez `URL.revokeObjectURL(url)` lors du nettoyage. Utilisez un nouvel objet de sortie pour chaque rendu. Évitez de mélanger la lecture manuelle d’un flux avec les méthodes buffer ou Blob sur la même sortie.

## Politique d’accès aux URL {#url-access-policy}

Depuis la version **0.3.6**, `setUrlAccessPolicy(callback)` accepte une fonction synchrone qui renvoie un booléen. Elle ne constitue pas un bac à sable réseau complet, et les redirections du navigateur peuvent avoir lieu avant la vérification de l’URL finale. Consultez la [sécurité des ressources](/docs/0.3/fr/guides/resource-security/).

## Cache des ressources URL {#url-resource-caching}

Disponible depuis **0.3.14**.

`setUrlResourceCaching(enabled)` exige un booléen et vaut `false` par défaut. Le champ `cache` d’un objet URL remplace le réglage global. Les entrées partagées existantes restent lisibles avec `cache: false` ; cette valeur ne force pas un téléchargement.

```js
pdfMake.setUrlResourceCaching(true);
pdfMake.createPdf(docDefinition).download();
```

Les nouveaux téléchargements sont conservés par document par défaut. `cache: true` stocke les nouvelles données dans le cache mémoire partagé pour les documents suivants ; `cache: false` permet toujours de lire une entrée partagée existante. Les URL textuelles et les objets sans `cache` utilisent le réglage global. Le cache HTTP du navigateur est indépendant.

Consultez [le cache des ressources URL](/docs/0.3/fr/getting-started/server-side/methods/#url-resource-caching) pour la configuration et la sécurité du cache.

## Vider le cache des ressources URL {#clear-url-resource-cache}

Disponible depuis **0.3.14**.

Appelez `clearUrlResourceCache()` synchroniquement entre les générations, après la fin des opérations actives. Elle supprime les entrées HTTP/HTTPS partagées, conserve les autres fichiers VFS et le réglage du cache, et ne vide pas le cache HTTP du navigateur. Voir [Vider le cache des ressources URL](/docs/0.3/fr/getting-started/server-side/methods/#clear-url-resource-cache).

```js
pdfMake.clearUrlResourceCache();
pdfMake.createPdf(docDefinition).download();
```

## Téléchargements URL simultanés {#url-resource-concurrency}

API de développement amont pour **0.3.16** ; indisponible dans le moteur 0.3.15 fixé pour le playground.

`setUrlResourceConcurrency(concurrency)` limite les téléchargements simultanés par document pour les polices, images, pièces jointes et fichiers intégrés. L’argument obligatoire est un entier positif ; la valeur par défaut est `5`. Les modifications concernent les appels `createPdf()` suivants.

```js
pdfMake.setUrlResourceConcurrency(3);
```

## Protocoles URL {#url-protocols}

API de développement amont pour **0.3.16** ; indisponible dans le moteur 0.3.15 fixé pour le playground.

`registerUrlProtocol(protocol, handler)` enregistre ou remplace un schéma URL ; `unregisterUrlProtocol(protocol)` le supprime et vide son cache partagé. HTTP et HTTPS sont enregistrés initialement. Les noms sont insensibles à la casse et acceptent un deux-points final. Sans gestionnaire, Fetch est utilisé ; dans le navigateur, cela permet aussi des schémas comme `blob`.

```js
pdfMake.registerUrlProtocol('blob');
```

Un gestionnaire reçoit `(url, headers, validateUrlAccessPolicy)` et renvoie une promesse de `{ buffer, url }`. Les en-têtes absents deviennent un objet vide. Renvoyez un `ArrayBuffer` ou `Uint8Array` (y compris un `Buffer` Node) et une URL finale non vide, ou l’URL initiale en l’absence de redirection.

La [règle d’accès URL](#url-access-policy) doit renvoyer `true` synchroniquement. pdfmake vérifie les URL initiale et renvoyée. Avant chaque redirection, le gestionnaire doit appeler `validateUrlAccessPolicy(targetUrl)` : cette fonction lève une exception en cas de refus et autorise l’accès sans règle configurée. Les gestionnaires personnalisés doivent imposer eux-mêmes les restrictions sur les fichiers locaux.

Ces protocoles concernent polices, images, pièces jointes et fichiers intégrés et partagent la [limite de téléchargement](#url-resource-concurrency) et les [réglages du cache](#url-resource-caching). Les modifications d’enregistrement concernent les générations suivantes ; celles en cours conservent leurs gestionnaires. Supprimer un gestionnaire HTTP/HTTPS remplacé ne rétablit pas Fetch : appelez `registerUrlProtocol("https")`. Les noms doivent être des schémas URL valides et les gestionnaires fournis des fonctions.

Un navigateur peut enregistrer `blob` avec le gestionnaire par défaut. Gardez `URL.createObjectURL(imageBlob)` valide jusqu’à la fin de la génération et autorisez l’URL dans la règle d’accès. Consultez [Protocoles URL](/docs/0.3/fr/getting-started/server-side/methods/#url-protocols) pour un exemple personnalisé.
