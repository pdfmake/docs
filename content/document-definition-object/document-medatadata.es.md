+++
sourceDigest = "7c039db6c37d93f4df69313d60659fa0479cb3f5b47dd4c5ee8b6bd7af11d7ef"
title = "Metadatos del documento"
description = "Define el título, el autor, el asunto, las palabras clave y los campos de metadatos personalizados del PDF."
weight = 2260
alwaysopen = true
+++

Los documentos PDF pueden tener diversos metadatos asociados, como el título o el autor. Puedes añadir esta información a la definición del documento.

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

Propiedades estándar:

* `title`: título del documento
* `author`: nombre del autor
* `subject`: asunto del documento
* `keywords`: palabras clave asociadas al documento
* `creator`: creador del documento (el valor predeterminado es `'pdfmake'`)
* `producer`: productor del documento (el valor predeterminado es `'pdfmake'`)
* `creationDate`: fecha de creación del documento (pdfmake la añade automáticamente)
* `modDate`: fecha de la última modificación del documento
* `trapped`: el indicador `trapped` de un documento PDF especifica si se ha corregido para compensar pequeñas desalineaciones de color

Propiedades personalizadas:

Puedes añadir propiedades personalizadas. La clave de la propiedad no debe contener espacios.

## Idioma del documento

Puedes establecer el idioma personalizado de un documento PDF mediante la propiedad `language`.

Ejemplo:
```js
var docDefinition = {
  language: 'cs-CZ',
  content: 'Jednoduchý PDF dokument vytvoření pomocí pdfmake'
}
```
