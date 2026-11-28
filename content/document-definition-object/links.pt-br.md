+++
title = "Links"
description = "Adicione links externos, internos e para arquivos locais nos documentos pdfmake 0.3."
weight = 2120
sourceDigest = "83e3e95f41aa0ba93449638032a7b8be6d0b6aafa82d1d8384d5364990825ad3"
+++

Para adicionar links externos ou internos, use a sintaxe a seguir:

```js
{ text: 'google', link: 'http://google.com' }
{ text: 'Go to page 2', linkToPage: 2 }
{ text: 'Go to Header', linkToDestination: 'header' },
{ text: 'Header content', id: 'header' },
```

Ou crie um link para um arquivo no computador local:

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

## Propriedades

- `link` (`string`) - URL de um site externo
- `linkToPage` (`number`) - link para um número de página
- `linkToDestination` (`string`) - link para um destino no documento
