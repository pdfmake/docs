# Metadatos del documento

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/document-definition-object/document-medatadata/

Los documentos PDF pueden tener diversos metadatos asociados, como el título o el autor. Puedes añadir esta información a la definición del documento.

**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
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
**JavaScript**

```js
var docDefinition = {
  language: 'cs-CZ',
  content: 'Jednoduchý PDF dokument vytvoření pomocí pdfmake'
}
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  language: 'cs-CZ',
  content: 'Jednoduchý PDF dokument vytvoření pomocí pdfmake'
}
```
