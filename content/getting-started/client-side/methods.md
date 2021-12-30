+++
title = "Methods"
description = ""
weight = 11
alwaysopen = true
+++

#### Download the PDF
```js
pdfMake.createPdf(docDefinition).download();
pdfMake.createPdf(docDefinition).download('file.pdf');
pdfMake.createPdf(docDefinition, options).download();
```
Parameters:

* `filename` _(optional)_ - PDF document file name (default 'file.pdf')
* `options` _(optional)_ - advanced options see [options chapter](/docs/0.3/options/)

#### Open the PDF in a new window
```js
pdfMake.createPdf(docDefinition).open();
pdfMake.createPdf(docDefinition).open(win);
pdfMake.createPdf(docDefinition, options).open();
```
Parameters:

* `win` _(optional)_ - window (when an asynchronous operation)
* `options` _(optional)_ - advanced options see [options chapter](/docs/0.3/options/)

Name can be defined only by using metadata `title` property (see [Document metadata](/docs/0.3/document-definition-object/document-medatadata/)).

Asynchronous example:
```js
$scope.generatePdf = function() {
  // create the window before the callback
  var win = window.open('', '_blank');
  $http.post('/someUrl', data).then(function(response) {
    // pass the "win" argument
    pdfMake.createPdf(docDefinition).open(win);
  });
};
```

Open in same window:
```js
pdfMake.createPdf(docDefinition).open(window);
```

#### Print the PDF
```js
pdfMake.createPdf(docDefinition).print();
pdfMake.createPdf(docDefinition).print(win);
pdfMake.createPdf(docDefinition, options).print();
```
Parameters:

* `win` _(optional)_ - window (when an asynchronous operation)
* `options` _(optional)_ - advanced options see [options chapter](/docs/0.3/options/)

Asynchronous example:
```js
$scope.generatePdf = function() {
  // create the window before the callback
  var win = window.open('', '_blank');
  $http.post('/someUrl', data).then(function(response) {
    // pass the "win" argument
    pdfMake.createPdf(docDefinition).print(win);
  });
};
```

Print in same window:
```js
pdfMake.createPdf(docDefinition).print(window);
```

#### Put the PDF into your own page as URL data
```js
pdfMake.createPdf(docDefinition).getDataUrl().then((dataUrl) => {
	const targetElement = document.querySelector('#iframeContainer');
	const iframe = document.createElement('iframe');
	iframe.src = dataUrl;
	targetElement.appendChild(iframe);
}, err => {
	console.error(err);
});

pdfMake.createPdf(docDefinition).getDataUrl()
```
Parameters:

* `options` _(optional)_ - advanced options see [options chapter](/docs/0.3/options/)

#### Get the PDF as base64 data
```js
pdfMake.createPdf(docDefinition).getBase64().then((data) => {
	alert(data)
}, err => {
	console.error(err);
});

pdfMake.createPdf(docDefinition, options).getBase64()
```
Parameters:

* `options` _(optional)_ - advanced options see [options chapter](/docs/0.3/options/)

#### Get the PDF as buffer
```js
pdfMake.createPdf(docDefinition).getBuffer().then((buffer) => {
	// ...
}, err => {
	console.error(err);
});
```
Parameters:

* `options` _(optional)_ - advanced options see [options chapter](/docs/0.3/options/)

#### Get the PDF as Blob
```js
pdfMake.createPdf(docDefinition).getBlob().then((blob) => {
	// ...
}, err => {
	console.error(err);
});
```
Parameters:

* `options` _(optional)_ - advanced options see [options chapter](/docs/0.3/options/)

#### Get document object as stream

```js
pdfMake.createPdf(docDefinition).getStream().then((stream) => {
	// ...
}, err => {
	console.error(err);
});
```
