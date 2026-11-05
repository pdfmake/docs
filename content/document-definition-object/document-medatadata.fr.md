+++
title = "Métadonnées du document"
description = "Définissez le titre, l’auteur, le sujet, les mots-clés et les champs de métadonnées personnalisés du PDF."
weight = 2260
alwaysopen = true
sourceDigest = "7c039db6c37d93f4df69313d60659fa0479cb3f5b47dd4c5ee8b6bd7af11d7ef"
+++

Les documents PDF peuvent être associés à différentes métadonnées, comme leur titre ou leur auteur. Ajoutez ces informations dans la définition du document :

```js
var docDefinition = {
  info: {
	title: 'awesome Document',
	author: 'john doe',
	subject: 'subject of document',
	keywords: 'keywords for document',
  },
  content:  'This is an sample PDF printed with pdfMake'
}
```

Propriétés standard :

* `title` - titre du document
* `author` - nom de l’auteur
* `subject` - sujet du document
* `keywords` - mots-clés associés au document
* `creator` - créateur du document (par défaut, 'pdfmake')
* `producer` - producteur du document (par défaut, 'pdfmake')
* `creationDate` - date de création du document (ajoutée automatiquement par pdfmake)
* `modDate` - date de dernière modification du document
* `trapped` - indicateur précisant si le document PDF a été « piégé », c’est-à-dire corrigé pour compenser de légers défauts de repérage des couleurs

Propriétés personnalisées :

Vous pouvez ajouter des propriétés personnalisées. La clé d’une propriété ne doit pas contenir d’espaces.

## Langue du document

La propriété `language` permet de définir une langue pour le document PDF.

Exemple :
```js
var docDefinition = {
  language: 'cs-CZ',
  content: 'Jednoduchý PDF dokument vytvoření pomocí pdfmake'
}
```
