+++
title = "Methods"
description = ""
weight = 11
alwaysopen = true
+++

#### Base usage

This call will generate a PDF document, methods to get document are described below.

```js
pdfMake.createPdf(docDefinition);
pdfMake.createPdf(docDefinition, options);
```

Parameters:

* `docDefinition` - object with document definition, see [chapter](/docs/0.3/document-definition-object/)
* `options` _(optional)_ - advanced options see [options chapter](/docs/0.3/options/)

#### Download the PDF
```js
pdfMake.createPdf(docDefinition).download();
pdfMake.createPdf(docDefinition).download('file.pdf');
```
Parameters:

* `filename` _(optional)_ - PDF document file name (default 'file.pdf')

#### Open the PDF in a new window
```js
pdfMake.createPdf(docDefinition).open();
pdfMake.createPdf(docDefinition).open(win);
```
Parameters:

* `win` _(optional)_ - window (when an asynchronous operation)

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
```
Parameters:

* `win` _(optional)_ - window (when an asynchronous operation)

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

#### Get the PDF document as URL data

Example of put the PDF document into your own page as URL data:
```js
pdfMake.createPdf(docDefinition).getDataUrl().then((dataUrl) => {
	const targetElement = document.querySelector('#iframeContainer');
	const iframe = document.createElement('iframe');
	iframe.src = dataUrl;
	targetElement.appendChild(iframe);
}, err => {
	console.error(err);
});
```

#### Get the PDF document as base64 data
```js
pdfMake.createPdf(docDefinition).getBase64().then((data) => {
	alert(data);
}, err => {
	console.error(err);
});
```

#### Get the PDF document as Blob
```js
pdfMake.createPdf(docDefinition).getBlob().then((blob) => {
	// ...
}, err => {
	console.error(err);
});
```

#### Get the PDF as buffer
```js
pdfMake.createPdf(docDefinition).getBuffer().then((buffer) => {
	// ...
}, err => {
	console.error(err);
});
```

#### Get the PDF document as stream

```js
pdfMake.createPdf(docDefinition).getStream().then((stream) => {
	// ...
}, err => {
	console.error(err);
});
```

#### URL resource concurrency

{{% alert theme="warning" %}}Minimal version: **0.3.16**{{% /alert %}}

The `setUrlResourceConcurrency(concurrency)` method limits concurrent URL resource downloads per document, including fonts, images, attachments and embedded files. The required value must be a positive integer; the default is `5`. Changes apply to subsequent `createPdf()` calls.

```js
pdfMake.setUrlResourceConcurrency(3);
```

#### URL protocols

{{% alert theme="warning" %}}Minimal version: **0.3.16**{{% /alert %}}

Use `pdfMake.registerUrlProtocol(protocol, handler)` to add a URL scheme or replace its handler, and `pdfMake.unregisterUrlProtocol(protocol)` to remove it and clear its shared resource cache. HTTP and HTTPS are registered by default. Scheme names are case-insensitive and may include a trailing colon. Omitting `handler` registers the default Fetch-based handler, which can be used for schemes supported by the browser's Fetch API, such as `blob`:

```js
pdfMake.registerUrlProtocol('blob');
```

You can then use a blob URL created with `URL.createObjectURL(imageBlob)` in the `images` dictionary. Keep the URL valid until PDF generation finishes and allow it in your [URL Access Policy](#url-access-policy).

A custom handler receives `(url, headers, validateUrlAccessPolicy)` and returns a promise resolving to `{ buffer, url }`, where `buffer` is an `ArrayBuffer` or `Uint8Array` and `url` is a non-empty string identifying the final resource URL. pdfmake checks the initial and returned URLs against the configured policy. Before following each redirect, a custom handler must call `validateUrlAccessPolicy(targetUrl)`, which throws if access is denied. It allows access when no policy is configured.

Registered protocols use the same download limit and caching settings as HTTP/HTTPS. Registration changes apply to subsequent `createPdf()` calls. For a custom handler example and details, see [URL protocols](/docs/0.3/getting-started/server-side/methods/#url-protocols).

#### URL resource caching

{{% alert theme="warning" %}}Minimal version: **0.3.14**{{% /alert %}}

The `setUrlResourceCaching(enabled)` method controls whether new URL downloads are stored in a shared in-memory cache for reuse by subsequent documents. The `enabled` parameter is required and must be a boolean. URL resource caching is disabled by default, so downloads are stored per document by default.

```js
pdfMake.setUrlResourceCaching(true);
pdfMake.createPdf(docDefinition).download();
```

Set `cache: true` or `cache: false` on an individual URL resource object to override the global setting. Existing shared entries can still be read with `cache: false`; it does not force a new download. This setting does not control the browser's HTTP cache.

For resource examples, cache behavior and the change from earlier versions, see [URL resource caching](/docs/0.3/getting-started/server-side/methods/#url-resource-caching).

#### Clear URL resource cache

{{% alert theme="warning" %}}Minimal version: **0.3.14**{{% /alert %}}

The `clearUrlResourceCache()` method synchronously removes shared resources for all currently registered URL schemes without changing the caching setting or removing other VFS files.

Call it between document generations to make subsequent documents download URL resources again:

```js
pdfMake.clearUrlResourceCache();
pdfMake.createPdf(docDefinition).download();
```

This method does not clear the browser's HTTP cache. For details see [Clear URL resource cache](/docs/0.3/getting-started/server-side/methods/#clear-url-resource-cache).

#### URL Access Policy

{{% alert theme="warning" %}}Minimal version: **0.3.6**{{% /alert %}}

The `setUrlAccessPolicy()` method allows you to define a custom security policy for external URLs before they are downloaded.

This can be used to restrict allowed domains, enforce HTTPS, or prevent SSRF attacks by blocking private or internal network addresses.

For details see [documentation](/docs/0.3/getting-started/server-side/methods/#url-access-policy).
