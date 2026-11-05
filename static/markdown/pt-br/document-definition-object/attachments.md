# Anexos incorporados

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/attachments/

O pdfmake oferece suporte a anexar arquivos como anotações e como arquivos incorporados. Arquivos incorporados são adicionados ao dicionário `files` e aparecem nos painéis de anexos dos visualizadores de PDF compatíveis. Anexos de arquivo são anotações que apontam para um arquivo.

Todo anexo ou arquivo incorporado precisa fornecer pelo menos `src`; recomenda-se fortemente fornecer um nome de arquivo em `name`. O `src` pode estar no formato dataURL (como no anexo a seguir, obtido em http://www.clipartbest.com/clipart-dT7zx5rT9), mas arquivos locais também são permitidos.

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

## Cache de recursos URL {#url-resource-caching}

Disponível na versão de desenvolvimento original para **0.3.14**; ausente do mecanismo 0.3.13 fixado no playground.

Para `attachments` e `files`, coloque o objeto de recurso com `url`, os `headers` opcionais e `cache` dentro de `src`. A propriedade de cache pertence ao interior de `src`.

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

Novos downloads são armazenados por documento por padrão. `cache: true` armazena novos dados no cache compartilhado em memória para documentos posteriores; `cache: false` ainda permite ler uma entrada compartilhada existente. URLs de texto e objetos sem `cache` usam a configuração global. O cache HTTP do navegador é independente.

Consulte [Cache de recursos URL](/docs/0.3/pt-br/getting-started/server-side/methods/#url-resource-caching) para configuração e segurança do cache.
