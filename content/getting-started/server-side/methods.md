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

#### URL Access Policy

{{% alert theme="warning" %}}Minimal version: **0.3.6**{{% /alert %}}

The `setUrlAccessPolicy()` method allows you to define a custom security policy for external URLs before they are downloaded.

This can be used to restrict allowed domains, enforce HTTPS, or prevent SSRF attacks by blocking private or internal network addresses.

Basic example:
```js
pdfmake.setUrlAccessPolicy((url) => {
    // check allowed domain
    return url.startsWith("https://example.com/");
});
```

Allow only https urls:
```js
pdfmake.setUrlAccessPolicy((url) => {
  const parsed = new URL(url);

  if (parsed.protocol !== "https:") {
    return false;
  }

  return true;
});
```

Disallow localhost url:
```js
pdfmake.setUrlAccessPolicy(async (url) => {
  const parsed = new URL(url);

  if (parsed.hostname === "localhost") {
    return false;
  }

  return true;
});
```

Example with basic SSRF protection:
```js
import dns from 'dns/promises';

pdfmake.setUrlAccessPolicy(async (url) => {
  const parsed = new URL(url);

  // Resolve hostname to IP address
  const { address } = await dns.lookup(parsed.hostname);

  // Block localhost
  if (address === "127.0.0.1" || address === "::1") {
    return false;
  }

  // Block private IPv4 ranges
  if (
    address.startsWith("10.") ||
    address.startsWith("192.168.") ||
    address.startsWith("172.16.") ||
    address.startsWith("172.17.") ||
    address.startsWith("172.18.") ||
    address.startsWith("172.19.") ||
    address.startsWith("172.2") // 172.20–29
  ) {
    return false;
  }

  return true;
});
```