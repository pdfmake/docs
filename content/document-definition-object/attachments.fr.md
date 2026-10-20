+++
title = "Intégration des pièces jointes"
description = "Configurez les pièces jointes dans pdfmake 0.3 à l’aide d’exemples, d’options et de notes d’utilisation."
weight = 2300
alwaysopen = true
sourceDigest = "fa2ac7caf1087dd025de26934674d3e7f4d0c75f51fbfb900170400b914fb224"
+++

pdfmake permet de joindre des fichiers sous forme d’annotations ou de fichiers incorporés.
Les fichiers incorporés sont ajoutés au dictionnaire « files » et apparaissent dans le panneau des pièces jointes des lecteurs PDF compatibles.
Les pièces jointes sont des annotations qui renvoient vers un fichier.
Toute pièce jointe ou tout fichier incorporé doit fournir au minimum un « src » ; il est vivement recommandé d’indiquer un nom de fichier avec « name ».
Le « src » d’une pièce jointe peut être fourni au format dataURL (comme la pièce jointe suivante, provenant de http://www.clipartbest.com/clipart-dT7zx5rT9), mais les fichiers locaux sont également autorisés.

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

sourceDigest = "fa2ac7caf1087dd025de26934674d3e7f4d0c75f51fbfb900170400b914fb224"
