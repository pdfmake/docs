+++
title = "Dokumentmetadaten"
description = "Lege PDF-Titel, Autor, Thema, Schlüsselwörter und benutzerdefinierte Metadatenfelder fest."
weight = 2260
alwaysopen = true
sourceDigest = "7c039db6c37d93f4df69313d60659fa0479cb3f5b47dd4c5ee8b6bd7af11d7ef"
+++

PDF-Dokumente können verschiedene Metadaten enthalten, beispielsweise Titel und Autor. Füge diese Angaben der Dokumentdefinition hinzu:

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

Standardfelder:

* `title` – Titel des Dokuments
* `author` – Name des Autors
* `subject` – Thema des Dokuments
* `keywords` – mit dem Dokument verknüpfte Schlüsselwörter
* `creator` – Ersteller (Standard ist `'pdfmake'`)
* `producer` – erzeugende Software (Standard ist `'pdfmake'`)
* `creationDate` – Erstellungsdatum (wird automatisch von pdfmake hinzugefügt)
* `modDate` – Datum der letzten Änderung
* `trapped` – Kennzeichen, das angibt, ob das Dokument für den Druck durch Farbkorrekturen (Trapping) vorbereitet wurde

Benutzerdefinierte Felder:

Du kannst benutzerdefinierte Felder hinzufügen. Der Feldschlüssel darf keine Leerzeichen enthalten.

## Dokumentsprache

Über die Eigenschaft `language` kannst du eine Sprache für das PDF-Dokument festlegen.

Beispiel:
```js
var docDefinition = {
  language: 'cs-CZ',
  content: 'Jednoduchý PDF dokument vytvoření pomocí pdfmake'
}
```
