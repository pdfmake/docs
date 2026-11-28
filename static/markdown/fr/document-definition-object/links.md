# Liens

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/links/

Pour ajouter des liens externes ou internes, utilisez la syntaxe suivante :
**JavaScript**

```js
var dd = { content: [
{ text: 'google', link: 'http://google.com' },
{ text: 'Go to page 2', linkToPage: 2 },
{ text: 'Go to Header', linkToDestination: 'header' },
{ text: 'Header content', id: 'header' },
] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [
{ text: 'google', link: 'http://google.com' },
{ text: 'Go to page 2', linkToPage: 2 },
{ text: 'Go to Header', linkToDestination: 'header' },
{ text: 'Header content', id: 'header' },
] };
```
Vous pouvez aussi créer un lien vers un fichier de l’ordinateur local :
**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
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
