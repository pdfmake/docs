# Links

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/document-definition-object/links/

Für externe oder interne Links verwendest du die folgende Syntax:
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
Oder du verlinkst eine lokale Datei auf dem Computer:
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

## Eigenschaften

- `link` (`string`) – URL zu einer externen Website
- `linkToPage` (`number`) – Link zu einer Seitennummer
- `linkToDestination` (`string`) – Link zu einem Dokumentziel
