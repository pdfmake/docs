+++
title = "Methods"
description = ""
weight = 11
alwaysopen = true
+++

#### Download the PDF
```js
pdfMake.createPdf(docDefinition).download();
```
Parameters:

* `defaultFileName` _(optional)_ - file name
* `cb` _(optional)_ - callback function
* `options` _(optional)_ - advanced options see [options chapter](/docs/options/)

#### Open the PDF in a new window
```js
pdfMake.createPdf(docDefinition).open();
```
Parameters:

* `options` _(optional)_ - advanced options see [options chapter](/docs/options/)
* `win` _(optional)_ - window (when an asynchronous operation)

Name can be defined only by using metadata `title` property (see [Document metadata](/docs/document-definition-object/document-medatadata/)).

Asynchronous example:
```js
$scope.generatePdf = function() {
  // create the window before the callback
  var win = window.open('', '_blank');
  $http.post('/someUrl', data).then(function(response) {
    // pass the "win" argument
    pdfMake.createPdf(docDefinition).open({}, win);
  });
};
```

Open in same window:
```js
pdfMake.createPdf(docDefinition).open({}, window);
```

#### Print the PDF
```js
pdfMake.createPdf(docDefinition).print();
```
Parameters:

* `options` _(optional)_ - advanced options see [options chapter](/docs/options/)
* `win` _(optional)_ - window (when an asynchronous operation)

Asynchronous example:
```js
$scope.generatePdf = function() {
  // create the window before the callback
  var win = window.open('', '_blank');
  $http.post('/someUrl', data).then(function(response) {
    // pass the "win" argument
    pdfMake.createPdf(docDefinition).print({}, win);
  });
};
```

Print in same window:
```js
pdfMake.createPdf(docDefinition).print({}, window);
```

#### Put the PDF into your own page as URL data
```js
const pdfDocGenerator = pdfMake.createPdf(docDefinition);
pdfDocGenerator.getDataUrl((dataUrl) => {
	const targetElement = document.querySelector('#iframeContainer');
	const iframe = document.createElement('iframe');
	iframe.src = dataUrl;
	targetElement.appendChild(iframe);
});
```
Parameters:

* `cb` - callback function
* `options` _(optional)_ - advanced options see [options chapter](/docs/options/)

#### Get the PDF as base64 data
```js
const pdfDocGenerator = pdfMake.createPdf(docDefinition);
pdfDocGenerator.getBase64((data) => {
	alert(data);
});
```
Parameters:

* `cb` - callback function
* `options` _(optional)_ - advanced options see [options chapter](/docs/options/)

#### Get the PDF as buffer
```js
const pdfDocGenerator = pdfMake.createPdf(docDefinition);
pdfDocGenerator.getBuffer((buffer) => {
	// ...
});
```
Parameters:

* `cb` - callback function
* `options` _(optional)_ - advanced options see [options chapter](/docs/options/)

#### Get the PDF as Blob
```js
const pdfDocGenerator = pdfMake.createPdf(docDefinition);
pdfDocGenerator.getBlob((blob) => {
	// ...
});
```
Parameters:

* `cb` - callback function
* `options` _(optional)_ - advanced options see [options chapter](/docs/options/)

#### Get PDFKit document object as stream

##### Asynchronous call

{{% alert theme="warning" %}}Minimal version: **0.1.66**{{% /alert %}}

```js
const pdfDocGenerator = pdfMake.createPdf(docDefinition);
pdfDocGenerator.getStream((document) => {
	// ...
});
```
Parameters:

* `cb` - callback function

##### Synchronous call

{{% alert theme="warning" %}}Minimal version: **0.1.41**{{% /alert %}}

{{% alert theme="warning" %}}**The preferred way is asynchronous call.**{{% /alert %}}

{{% alert theme="warning" %}}**Unable to download real font files from url (https:// or http://). Asynchronous call required.**{{% /alert %}}

```js
const pdfDocGenerator = pdfMake.createPdf(docDefinition);
var document = pdfDocGenerator.getStream();
```