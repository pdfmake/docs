+++
title = "Metadados do documento"
description = "Defina título, autor, assunto, palavras-chave e campos de metadados personalizados do PDF."
weight = 2260
alwaysopen = true
sourceDigest = "7c039db6c37d93f4df69313d60659fa0479cb3f5b47dd4c5ee8b6bd7af11d7ef"
+++

Documentos PDF podem ter vários metadados associados, como título e autor. Adicione essas informações à definição do documento:

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

Propriedades padrão:

* `title` - título do documento
* `author` - nome do autor
* `subject` - assunto do documento
* `keywords` - palavras-chave associadas ao documento
* `creator` - criador do documento (padrão: `'pdfmake'`)
* `producer` - produtor do documento (padrão: `'pdfmake'`)
* `creationDate` - data em que o documento foi criado (adicionada automaticamente pelo pdfmake)
* `modDate` - data da última modificação do documento
* `trapped` - sinalizador de trapping do PDF, que indica se o documento passou por trapping, isto é, correção de pequenas falhas de registro de cores

Propriedades personalizadas:

Você pode adicionar propriedades personalizadas. A chave da propriedade não pode conter espaços.

## Idioma do documento

O idioma de um documento PDF pode ser definido com a propriedade `language`.

Exemplo:
```js
var docDefinition = {
  language: 'cs-CZ',
  content: 'Jednoduchý PDF dokument vytvoření pomocí pdfmake'
}
```
