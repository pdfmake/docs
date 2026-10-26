+++
title = "Images"
description = "Embed PNG and JPEG images from data URLs, named resources, files or approved external URLs."
weight = 2100
alwaysopen = true
+++

## Reuse embedded PNG or JPEG data

An image node is `{ image: 'key' }`, where the key resolves through the document's
`images` dictionary. Reuse a key when the same image appears more than once.
PNG and JPEG are supported; use an [SVG node](/docs/0.3/document-definition-object/svgs/)
for SVG content.

{{< example id="images" >}}

## Choose sizing behavior

| Fields on the image node | Result |
| --- | --- |
| No width, height or fit | Use the image's natural dimensions |
| `width: 150` | Scale proportionally to that width |
| `height: 100` | Scale proportionally to that height; since 0.3.2 |
| `width: 150, height: 100` | Force those dimensions, which can stretch the image |
| `fit: [150, 100]` | Fit inside a rectangle while preserving aspect ratio |
| `cover: { width: 150, height: 100, align: 'right', valign: 'bottom' }` | Fill a rectangle with cropping and alignment |

Display dimensions do not reduce the original image payload. Resize oversized
source images before embedding them when output size and memory matter.

## Select a source for your runtime

| Source | Setup |
| --- | --- |
| Data URL | Put a complete PNG/JPEG base64 data URL in `images` or directly on a node |
| Local file | Node.js only, or a file already present in a browser VFS |
| HTTP(S) URL | Use a named `images` entry and allow it through the resource policy |
| URL with headers | Use `{ url, headers }` in the named `images` entry |

```js
var dd = {
  images: {
    logo: '/application-owned/assets/logo.png',
    remote: {
      url: 'https://assets.example.com/photo.jpg',
      headers: { 'X-Example-Header': 'value' }
    }
  },
  content: [
    { image: 'logo', width: 120 },
    { image: 'remote', fit: [200, 150] }
  ]
};
```

This snippet describes source shapes, not a self-contained runnable download.
Supply an existing application-owned file and a real approved URL. In a browser,
the local filename must exist in the VFS; browser URLs also require CORS support.
Do not place private credentials in client-side definitions. The embedded example
above is self-contained and needs no network resource.

## Diagnose missing images

An empty or invalid image value is an error. Check the dictionary key, full data
URL prefix and bytes, file existence, URL response and access policy. Configuring
`setUrlAccessPolicy` does not bypass CORS. A local file policy must allow the actual
resolved file path. See [resource security](/docs/0.3/guides/resource-security/)
and [troubleshooting](/docs/0.3/guides/troubleshooting/).
