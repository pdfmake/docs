+++
title = "Links"
description = "Lege mit Beispielen, Optionen und Anwendungshinweisen Links in pdfmake 0.3 fest."
weight = 2120
alwaysopen = true
sourceDigest = "83e3e95f41aa0ba93449638032a7b8be6d0b6aafa82d1d8384d5364990825ad3"
+++

Für externe oder interne Links verwendest du die folgende Syntax:
```js
{ text: 'google', link: 'http://google.com' }
{ text: 'Go to page 2', linkToPage: 2 }
{ text: 'Go to Header', linkToDestination: 'header' },
{ text: 'Header content', id: 'header' },
```
Oder du verlinkst eine lokale Datei auf dem Computer:
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

## Eigenschaften

- `link` (`string`) – URL zu einer externen Website
- `linkToPage` (`number`) – Link zu einer Seitennummer
- `linkToDestination` (`string`) – Link zu einem Dokumentziel
