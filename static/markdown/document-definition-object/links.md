# Links

Version: pdfmake 0.3.x
Language: en
Source: https://pdfmake.github.io/docs/0.3/document-definition-object/links/

To add external or internal links, use the following syntax:
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
Or link to local computer file:
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

## Properties

- `link` (`string`) - URL to external site
- `linkToPage` (`number`) - link to page number
- `linkToDestination` (`string`) - link to document destination
