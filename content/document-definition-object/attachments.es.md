+++
sourceDigest = "07215ee9c2cfa04df91eb2226c07a45d85d1f1c0b5e5a4c5d37577e766747ae7"
title = "Incrustación de archivos adjuntos"
description = "Configura la incrustación de archivos adjuntos en pdfmake 0.3 con ejemplos, opciones y notas de uso."
weight = 2300
alwaysopen = true
+++

pdfmake permite adjuntar archivos como anotaciones y como archivos incrustados. Los archivos incrustados se añaden al diccionario `files` y aparecen en los paneles de archivos adjuntos de los visores PDF compatibles. Los adjuntos de archivo son anotaciones que enlazan a un archivo. Todo archivo adjunto o incrustado debe proporcionar al menos un `src`; se recomienda encarecidamente indicar el nombre mediante `name`. El `src` de cualquier adjunto puede estar en formato data URL (como el siguiente adjunto, tomado de http://www.clipartbest.com/clipart-dT7zx5rT9), aunque también se permiten archivos locales.

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

## Caché de recursos URL {#url-resource-caching}

Disponible en la rama de desarrollo original para **0.3.14**; no está en el motor 0.3.13 fijado para el playground.

Para `attachments` y `files`, coloca el objeto de recurso con `url`, las `headers` opcionales y `cache` dentro de `src`. La propiedad de caché pertenece al interior de `src`.

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

Las nuevas descargas se guardan por documento de forma predeterminada. `cache: true` guarda los nuevos datos en la caché compartida en memoria para documentos posteriores; `cache: false` sigue permitiendo leer una entrada compartida existente. Las URL de texto y los objetos sin `cache` usan la configuración global. La caché HTTP del navegador es independiente.

Consulta [Caché de recursos URL](/docs/0.3/es/getting-started/server-side/methods/#url-resource-caching) para conocer su configuración y seguridad.
