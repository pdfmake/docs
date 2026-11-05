# Intégration des pièces jointes

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/attachments/

pdfmake permet de joindre des fichiers sous forme d’annotations ou de fichiers incorporés.
Les fichiers incorporés sont ajoutés au dictionnaire « files » et apparaissent dans le panneau des pièces jointes des lecteurs PDF compatibles.
Les pièces jointes sont des annotations qui renvoient vers un fichier.
Toute pièce jointe ou tout fichier incorporé doit fournir au minimum un « src » ; il est vivement recommandé d’indiquer un nom de fichier avec « name ».
Le « src » d’une pièce jointe peut être fourni au format dataURL (comme la pièce jointe suivante, provenant de http://www.clipartbest.com/clipart-dT7zx5rT9), mais les fichiers locaux sont également autorisés.

**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = {
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

sourceDigest = "07215ee9c2cfa04df91eb2226c07a45d85d1f1c0b5e5a4c5d37577e766747ae7"

## Cache des ressources URL {#url-resource-caching}

Disponible dans la branche de développement amont pour **0.3.14** ; absent du moteur 0.3.13 fixé pour le playground.

Pour `attachments` et `files`, placez l’objet ressource contenant `url`, les `headers` facultatifs et `cache` dans `src`. La propriété de cache doit être à l’intérieur de `src`.

**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
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

Les nouveaux téléchargements sont conservés par document par défaut. `cache: true` stocke les nouvelles données dans le cache mémoire partagé pour les documents suivants ; `cache: false` permet toujours de lire une entrée partagée existante. Les URL textuelles et les objets sans `cache` utilisent le réglage global. Le cache HTTP du navigateur est indépendant.

Consultez [le cache des ressources URL](/docs/0.3/fr/getting-started/server-side/methods/#url-resource-caching) pour la configuration et la sécurité du cache.
