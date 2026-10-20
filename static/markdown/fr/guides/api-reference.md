# API en bref

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/guides/api-reference/

## Configurer une fois, générer plusieurs fois

Les deux points d’entrée exposent un singleton. Configurez les polices, les règles d’accès et les mises en page au démarrage de l’application. Ne remplacez pas la configuration partagée pendant le rendu de requêtes concurrentes.

| Méthode | Environnement | Comportement |
| --- | --- | --- |
| `addFonts(fonts)` | Les deux | Fusionne les familles de polices ; une famille fournie remplace le mappage précédent de cette famille |
| `setFonts(fonts)` | Les deux | Remplace l’ensemble de la table de polices |
| `clearFonts()` | Les deux | Efface les polices enregistrées |
| `addTableLayouts(layouts)` | Les deux | Fusionne les fonctions de mise en page nommées |
| `setTableLayouts(layouts)` | Les deux | Remplace les mises en page nommées |
| `clearTableLayouts()` | Les deux | Efface les mises en page personnalisées |
| `setProgressCallback(callback)` | Les deux | Reçoit la progression du rendu ; ce n’est pas un profileur de mise en page |
| `setUrlAccessPolicy(callback)` | Les deux, depuis 0.3.6 | Autorise les URL de ressources uniquement si la fonction renvoie `true` de façon synchrone |
| `setLocalAccessPolicy(callback)` | Node, depuis 0.3.8 | Autorise les ressources locales uniquement si la fonction renvoie `true` de façon synchrone |
| `addVirtualFileSystem(vfs)` | Navigateur | Ajoute des données de police ou de ressource encodées en base64 au système de fichiers virtuel |
| `addFontContainer(container)` | Navigateur | Enregistre un conteneur de polices empaqueté |

## Générer

`createPdf(docDefinition, options?)` accepte des objets et renvoie un conteneur de sortie. Utilisez les [champs de document](/docs/0.3/fr/document-definition-object/) dans le premier argument et les [options de rendu](/docs/0.3/fr/options/) dans le second.

| Sortie | Node | Navigateur |
| --- | --- | --- |
| `getBuffer()`, `getBase64()`, `getDataUrl()`, `getStream()` | Oui | Oui |
| `write(filename)` | Oui | Non |
| `download(filename?)`, `open(window?)`, `print(window?)`, `getBlob()` | Non | Oui |

Toutes les fonctions de sortie renvoient des Promises. Gérez toujours leur rejet. Le conteneur renvoyé par `createPdf` n’est pas une Promise. Consultez les détails du cycle de vie pour les [méthodes Node](/docs/0.3/fr/getting-started/server-side/methods/) et les [méthodes navigateur](/docs/0.3/fr/getting-started/client-side/methods/).
