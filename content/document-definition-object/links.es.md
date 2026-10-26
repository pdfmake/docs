+++
sourceDigest = "83e3e95f41aa0ba93449638032a7b8be6d0b6aafa82d1d8384d5364990825ad3"
title = "Enlaces"
description = "Configura enlaces en pdfmake 0.3 con ejemplos, opciones y notas de uso."
weight = 2120
alwaysopen = true
+++

Para añadir enlaces externos o internos, usa esta sintaxis:
```js
{ text: 'google', link: 'http://google.com' }
{ text: 'Go to page 2', linkToPage: 2 }
{ text: 'Go to Header', linkToDestination: 'header' },
{ text: 'Header content', id: 'header' },
```
También puedes enlazar a un archivo del equipo local:
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

## Propiedades

- `link` (`string`): URL a un sitio externo
- `linkToPage` (`number`): enlace a un número de página
- `linkToDestination` (`string`): enlace a un destino del documento
