+++
title = "Images"
description = "Intégrez des images PNG et JPEG depuis des URL de données, des ressources nommées, des fichiers ou des URL externes autorisées."
weight = 2100
alwaysopen = true
sourceDigest = "e0419b93231e1257dc4fafa17f5b9f74c214b95807240b77511d32bfe7c0da6d"
+++

## Réutiliser des données PNG ou JPEG intégrées

Un nœud d’image s’écrit `{ image: 'key' }` : la clé correspond à une entrée du dictionnaire `images` du document. Réutilisez une même clé lorsqu’une image apparaît plusieurs fois. Les formats PNG et JPEG sont pris en charge ; pour du SVG, utilisez un [nœud SVG](/docs/0.3/fr/document-definition-object/svgs/).

{{< example id="images" >}}

## Choisir le comportement de dimensionnement

| Champs du nœud d’image | Résultat |
| --- | --- |
| Aucun `width`, `height` ni `fit` | Utilise les dimensions naturelles de l’image |
| `width: 150` | Met l’image à l’échelle proportionnellement à cette largeur |
| `height: 100` | Met l’image à l’échelle proportionnellement à cette hauteur ; depuis la version 0.3.2 |
| `width: 150, height: 100` | Impose ces dimensions, ce qui peut étirer l’image |
| `fit: [150, 100]` | Ajuste l’image dans un rectangle en préservant son rapport hauteur/largeur |
| `cover: { width: 150, height: 100, align: 'right', valign: 'bottom' }` | Remplit un rectangle en recadrant et en alignant l’image |

Les dimensions d’affichage ne réduisent pas la charge utile de l’image originale. Redimensionnez les images sources trop grandes avant de les intégrer lorsque la taille de sortie et la mémoire sont importantes.

## Choisir une source adaptée à l’environnement d’exécution

| Source | Configuration |
| --- | --- |
| URL de données | Placez une URL complète de données PNG/JPEG en base64 dans `images` ou directement sur un nœud |
| Fichier local | Node.js uniquement, ou fichier déjà présent dans un VFS de navigateur |
| URL HTTP(S) | Utilisez une entrée nommée dans `images` et autorisez-la via la politique de ressources |
| URL avec en-têtes | Utilisez `{ url, headers }` dans l’entrée nommée de `images` |

```js
var dd = {
  images: {
    logo: '/application-owned/assets/logo.png',
    remote: {
      url: 'https://assets.example.com/photo.jpg',
      headers: { 'X-Example-Header': 'value' }
    }
  },
  content: [
    { image: 'logo', width: 120 },
    { image: 'remote', fit: [200, 150] }
  ]
};
```

Cet extrait décrit les formes des sources ; il ne constitue pas un exemple autonome de téléchargement. Fournissez un fichier existant appartenant à l’application et une URL réelle autorisée. Dans un navigateur, le nom de fichier local doit exister dans le VFS ; les URL utilisées dans le navigateur nécessitent également la prise en charge de CORS. Ne placez pas d’identifiants privés dans les définitions côté client. L’exemple intégré ci-dessus est autonome et ne nécessite aucune ressource réseau.

## Diagnostiquer les images manquantes

Une valeur d’image vide ou invalide provoque une erreur. Vérifiez la clé du dictionnaire, le préfixe complet de l’URL de données et ses octets, l’existence du fichier, la réponse URL et la politique d’accès. La configuration de `setUrlAccessPolicy` ne contourne pas CORS. Une politique de fichiers locaux doit autoriser le chemin de fichier effectivement résolu. Consultez la [sécurité des ressources](/docs/0.3/fr/guides/resource-security/) et le [guide de dépannage](/docs/0.3/fr/guides/troubleshooting/).
