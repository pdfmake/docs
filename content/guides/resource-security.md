+++
title = "Resource security"
description = "Control external URLs, local files and untrusted document inputs when using pdfmake in server applications."
weight = 3
+++

## Treat definitions as application code

A definition can contain callback functions for headers, footers, table layouts and page breaks. Never evaluate JavaScript submitted by an untrusted caller. Accept validated application data and construct definitions yourself. Limit input size, nesting, table dimensions and image size before rendering.

## Deny resources you do not need

If all resources are supplied as in-memory data, deny string-based resource paths:

```js
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(() => false);
```

The current implementation also passes standard font identifiers (for example `Helvetica-Bold`) through the local policy. Allow the exact registered identifiers when using standard fonts; the [Node quickstart](/docs/0.3/getting-started/server-side/) shows this setup.

URL policies require **0.3.6+** and local policies **0.3.8+**. Configure them before accepting work. An unset policy permits resource loading; it does not mean deny-all.

## Use synchronous policies

The implementation checks `callback(value) === true`. Do not use `async` callbacks, DNS lookups or promises inside these policies. Prefetch approved resources in your application if validation requires asynchronous work, then pass embedded data or an application-owned file.

```js
pdfmake.setUrlAccessPolicy(value => {
  const url = new URL(value);
  return url.protocol === 'https:' && url.hostname === 'assets.example.com' && !url.username && !url.password;
});
```

This hostname example is not complete SSRF protection. DNS changes, redirects, internal address ranges and deployment network permissions also matter. Apply outbound network controls. On Node.js the resolver checks manual redirect hops. Browsers may follow redirects before the final URL policy check; browser policies cannot enforce control of every network hop.

## Local files

Allow exact resolved application-owned paths. See [font configuration](/docs/0.3/fonts/) for a working allowlist. Avoid `startsWith('fonts/')`, which does not resolve traversal or filesystem aliases. Protect approved files from replacement and account for symlinks. Do not let a caller select arbitrary server paths.

## Bound the job

Layout and font work can consume CPU and memory before an output stream is available. Use bounded queues and isolated workers when serving large or untrusted documents. A Promise timeout alone does not interrupt synchronous layout. Add process-level limits if you require hard cancellation.

## PDF encryption is separate

[Passwords and PDF permissions](/docs/0.3/document-definition-object/security/) affect the produced document. They do not secure your server's network, filesystem or callback execution.
