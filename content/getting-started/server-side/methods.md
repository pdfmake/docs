+++
title = "Methods"
description = ""
weight = 12
alwaysopen = true
+++

#### Base usage

This call will generate a PDF document, methods to get document are described below.

```js
pdfmake.createPdf(docDefinition);
pdfmake.createPdf(docDefinition, options);
```

Parameters:

* `docDefinition` - object with document definition, see [chapter](/docs/0.3/document-definition-object/)
* `options` _(optional)_ - advanced options see [options chapter](/docs/0.3/options/)

#### Write the PDF document as file
```js
pdfmake.createPdf(docDefinition).write(filename).then(() => {
	// finished
}, err => {
	console.error(err);
});
```
Parameters:

* `filename` - PDF document file name
* `options` _(optional)_ - advanced options see [options chapter](/docs/0.3/options/)

#### Get the PDF document as URL data

```js
pdfmake.createPdf(docDefinition).getDataUrl().then((dataUrl) => {
	// ...
}, err => {
	console.error(err);
});
```

#### Get the PDF document as base64 data
```js
pdfmake.createPdf(docDefinition).getBase64().then((data) => {
	console.log(data);
}, err => {
	console.error(err);
});
```

#### Get the PDF document as buffer
```js
pdfmake.createPdf(docDefinition).getBuffer().then((buffer) => {
	// ...
}, err => {
	console.error(err);
});
```

#### Get the PDF document as stream

```js
pdfmake.createPdf(docDefinition).getStream().then((stream) => {
	// ...
}, err => {
	console.error(err);
});
```