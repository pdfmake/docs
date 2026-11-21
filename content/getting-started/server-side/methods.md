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

#### URL resource concurrency

{{% alert theme="warning" %}}Minimal version: **0.3.15**{{% /alert %}}

The `setUrlResourceConcurrency(concurrency)` method limits concurrent URL resource downloads per document, including fonts, images, attachments and embedded files. The required value must be a positive integer; the default is `5`. Changes apply to subsequent `createPdf()` calls.

```js
pdfmake.setUrlResourceConcurrency(3);
```

#### URL protocols

{{% alert theme="warning" %}}Minimal version: **0.3.15**{{% /alert %}}

Use `registerUrlProtocol(protocol, handler)` to add a URL scheme or replace its handler. HTTP and HTTPS are registered by default. Scheme names are case-insensitive and may include a trailing colon. Omitting `handler` registers the default Fetch-based handler.

A handler receives `(url, headers, validateUrlAccessPolicy)` and returns a promise resolving to `{ buffer, url }`. `headers` contains the resource's request headers, or an empty object if none were specified. `buffer` must be an `ArrayBuffer` or `Uint8Array` (including a Node.js `Buffer`), and `url` must be a non-empty string identifying the final resource URL, or the original URL if there were no redirects.

For example, map application URLs to known local files:

```js
var fs = require('fs').promises;
var path = require('path');
var assets = {
  'asset://logo': path.join(__dirname, 'images/logo.png')
};

pdfmake.setUrlAccessPolicy(url => Object.prototype.hasOwnProperty.call(assets, url));
pdfmake.registerUrlProtocol('asset', async (url, headers, validateUrlAccessPolicy) => {
  var buffer = await fs.readFile(assets[url]);
  // This handler reads a local file and does not follow redirects.
  return { buffer: buffer, url: url };
});

var docDefinition = {
  content: [{ image: 'logo' }],
  images: { logo: { url: 'asset://logo', cache: true } }
};

pdfmake.createPdf(docDefinition).write('document.pdf');
```

The [URL Access Policy](#url-access-policy) checks the initial URL before the handler runs and the returned URL before data is stored. The policy must return `true` synchronously to allow access. If a custom handler follows redirects, it must call `validateUrlAccessPolicy(targetUrl)` before following each redirect. This validator throws if access is denied; it does not return a boolean. When no policy is configured, the validator allows access.

Registered protocols can be used in font, image, attachment and embedded file definitions. They use the same [download limit](#url-resource-concurrency) and [caching settings](#url-resource-caching) as HTTP/HTTPS. Custom handlers are responsible for any local file access they perform.

Call `pdfmake.unregisterUrlProtocol('asset')` to remove a handler and clear shared cache entries for that scheme. Removing an overridden HTTP/HTTPS handler does not restore the default; call `pdfmake.registerUrlProtocol('https')` to restore it. Protocol names must be valid URL schemes, such as `asset` or `https:`, and a supplied handler must be a function. Registration changes apply to subsequent `createPdf()` calls; documents already being generated keep their handlers.

#### URL resource caching

{{% alert theme="warning" %}}Minimal version: **0.3.14**{{% /alert %}}

The `setUrlResourceCaching(enabled)` method controls whether new URL downloads are stored in a shared in-memory cache for reuse by subsequent documents. The `enabled` parameter is required and must be a boolean. URL resource caching is disabled by default.

By default, downloaded fonts, images, attachments and embedded files are stored per document. To enable sharing between documents:

```js
pdfmake.setUrlResourceCaching(true);

var docDefinition = {
  content: [{ image: 'logo' }, { image: 'photo' }],
  images: {
    // Uses the global caching setting.
    logo: 'https://example.com/logo.png',
    photo: {
      url: 'https://example.com/photo.png',
      headers: { Authorization: 'Bearer token' },
      // Store a new download only for this document.
      cache: false
    }
  }
};

pdfmake.createPdf(docDefinition).write('document.pdf');
```

Set `cache: true` or `cache: false` on an individual `{ url, headers, cache }` resource object to override the global setting. The `headers` property is optional. This applies to font definitions, entries in the `images` dictionary, and `src` objects in the `attachments` and `files` dictionaries. Plain URL strings and resource objects without `cache` use the global setting.

Calling `pdfmake.setUrlResourceCaching(false)` restores the default for subsequent `createPdf()` calls. It does not change a generation already started, and an explicit `cache: true` still takes precedence.

{{% alert theme="warning" %}}These settings control where newly downloaded data is stored. Existing shared entries can still be read with `cache: false`; it does not force a new download. Changing the global setting does not clear previously cached resources.{{% /alert %}}

Shared entries are keyed by URL only, regardless of request headers, including `Authorization`. Reusing a cached entry does not contact the origin server or recheck authorization there. Avoid sharing resources whose content or authorization depends on request headers. The [URL Access Policy](#url-access-policy) applies to actual network downloads, not cache reads.

This setting controls pdfmake's in-memory cache. It does not control the browser's HTTP cache.

Before version 0.3.14, URL downloads were automatically shared between documents. Use `pdfmake.setUrlResourceCaching(true)` to restore that behavior.

#### Clear URL resource cache

{{% alert theme="warning" %}}Minimal version: **0.3.14**{{% /alert %}}

The `clearUrlResourceCache()` method synchronously removes shared resources for all currently registered URL schemes without changing the caching setting or removing other VFS files.

Call it between document generations to make subsequent documents download URL resources again:

```js
pdfmake.clearUrlResourceCache();
pdfmake.createPdf(docDefinition).write('document.pdf');
```

Clearing the cache does not change the `setUrlResourceCaching()` setting or remove resources stored only for an individual document. Use it after active document generations have finished; it does not cancel downloads already in progress. It does not clear the browser's HTTP cache.

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

**Sample only - change it according to your own protection requirements.**

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

#### Local file Access Policy

{{% alert theme="warning" %}}Minimal version: **0.3.8**{{% /alert %}}

The `setLocalAccessPolicy()` method allows you to define a custom security policy for local files.

This can be used to restrict allowed local paths.

Basic example:
```js
pdfmake.setLocalAccessPolicy((path) => {
    // check allowed local file path
    return path.startsWith("fonts/");
});
```
