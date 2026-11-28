+++
title = "Liens"
description = "Ajoutez des liens vers des pages externes, des pages du document, des destinations ou des fichiers locaux."
weight = 2120
alwaysopen = true
sourceDigest = "83e3e95f41aa0ba93449638032a7b8be6d0b6aafa82d1d8384d5364990825ad3"
+++

Pour ajouter des liens externes ou internes, utilisez la syntaxe suivante :
```js
{ text: 'google', link: 'http://google.com' }
{ text: 'Go to page 2', linkToPage: 2 }
{ text: 'Go to Header', linkToDestination: 'header' },
{ text: 'Header content', id: 'header' },
```
Vous pouvez aussi créer un lien vers un fichier de l’ordinateur local :
```js
var dd = {
	content: [
		{
		    text: 'link',
		    link: 'file:///c:/testFile.txt'
		}
	]
};
```

## Propriétés

- `link` (`string`) - URL d’un site externe
- `linkToPage` (`number`) - lien vers un numéro de page
- `linkToDestination` (`string`) - lien vers une destination du document
