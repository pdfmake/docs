# Links

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/links/

Para adicionar links externos ou internos, use a sintaxe a seguir:

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

Ou crie um link para um arquivo no computador local:

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

## Propriedades

- `link` (`string`) - URL de um site externo
- `linkToPage` (`number`) - link para um número de página
- `linkToDestination` (`string`) - link para um destino no documento
