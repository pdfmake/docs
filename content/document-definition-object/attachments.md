+++
title = "Attachments embedding"
description = ""
weight = 2300
alwaysopen = true
+++

pdfmake supports attaching files as annotations as well as embedded files.
Embedded files are added in the "files" dictionary and will show up in supported pdf viewers in their respective attachment panels.
File attachments are annotations which link to a file.
Any attachment or embedded file must provide at least a "src", providing a filename through "name" is highly recommended.
The "src" of any attachment can be provided in dataURL format (like the following attachment, taken from http://www.clipartbest.com/clipart-dT7zx5rT9), but local files are allowed as well.

```js
var dd = {
	content: [
		'Any attachment or embedded file must provide at least a "src", providing a filename through "name" is highly recommended.',
		'The "src" of any attachment can be provided in dataURL format (like the following attachment, taken from http://www.clipartbest.com/clipart-dT7zx5rT9), but local files are allowed as well.',
		{
			attachment: {
				src: 'data:image/png;base64,iVBOR....',
				name: 'testImage.png'
			}
		},
		'You can also define an attachment in the "attachments" dictionary and reference it by name.',
		{
			attachment: 'sampleImage'
		},
		'And there are three different standard icons for attachments, "GraphPush", "Paperclip", and "Push" (the default value). Set them with the "icon" option.',
		{
			attachment: 'sampleImage',
			icon: 'GraphPush'
		},
		{
			attachment: 'sampleImage',
			icon: 'Paperclip'
		},
		{
			attachment: 'sampleImage',
			icon: 'Push'
		},
		'For better customization, add an image and attach a file to it with linkToFile:',
		{
			image: 'fonts/sampleImage.jpg',
			width: 150,
			linkToFile: 'sampleImage'
		},
		"You can add a description, which will show in your pdf viewer's attachments panel and as a tooltip when hovering over the attachment.",
		{
			attachment: {
				src: 'data:image/png;base64,iVBOR....',
				name: 'withDescription.png',
				description: 'file description'
			}
		},
		'You can also define the "src" of an attachment or embedded file in the "attachments" and "files" dictionary via URL address.',
	],
	attachments: {
		sampleImage: {
			src: 'fonts/sampleImage.jpg',
			name: 'sampleImage.png'
		}
	},
	files: {
		README: {
			src: 'https://raw.githubusercontent.com/bpampuch/pdfmake/master/README.md',
			name: 'pdfmake README.md'
		}
	}
};
```

#### URL resource caching

{{% alert theme="warning" %}}Minimal version: **0.3.14**{{% /alert %}}

For URL resources in the `attachments` and `files` dictionaries, use an object as `src` to specify `url`, optional `headers`, and `cache`. The `cache` property belongs inside `src` and overrides the global `setUrlResourceCaching()` setting:

```js
var docDefinition = {
  content: [{ attachment: 'report' }],
  attachments: {
    report: {
      src: {
        url: 'https://example.com/report.pdf',
        headers: { Authorization: 'Bearer token' },
        cache: false
      },
      name: 'report.pdf'
    }
  },
  files: {
    guide: {
      src: {
        url: 'https://example.com/guide.pdf',
        cache: true
      },
      name: 'guide.pdf'
    }
  }
};
```

By default, new downloads are stored per document. `cache: true` stores a new download in the shared cache for reuse by subsequent documents. `cache: false` stores a new download only for this document, but can still reuse an existing shared entry.

For details see [URL resource caching](/docs/0.3/getting-started/server-side/methods/#url-resource-caching).
