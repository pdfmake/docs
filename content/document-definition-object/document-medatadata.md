+++
title = "Document Metadata"
description = ""
weight = 295
alwaysopen = true
+++


PDF documents can have various metadata associated with them, such as the title, or author
of the document. You can add that information by adding it to the document definition

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

Standard properties:

* `title` - the title of the document
* `author` - the name of the author
* `subject` - the subject of the document
* `keywords` - keywords associated with the document
* `creator` - the creator of the document (default is 'pdfmake')
* `producer` - the producer of the document (default is 'pdfmake')
* `creationDate` - the date the document was created (added automatically by pdfmake)
* `modDate` - the date the document was last modified
* `trapped` - the trapped flag in a PDF document indicates whether the document has been "trapped", i.e. corrected for slight color misregistrations

Custom properties:

You can add custom properties. Key of property not contain spaces.

#### Document language

PDF document can have custom language set via `language` property.

Example:
```js
var docDefinition = {
  language: 'cs-CZ'
  content: 'Jednoduchý PDF dokument vytvoření pomocí pdfmake'
}
```