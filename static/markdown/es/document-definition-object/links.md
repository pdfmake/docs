# Enlaces

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/document-definition-object/links/

Para añadir enlaces externos o internos, usa esta sintaxis:
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
También puedes enlazar a un archivo del equipo local:
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

## Propiedades

- `link` (`string`): URL a un sitio externo
- `linkToPage` (`number`): enlace a un número de página
- `linkToDestination` (`string`): enlace a un destino del documento
