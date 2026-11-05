# Dateianhänge einbetten

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/document-definition-object/attachments/

pdfmake unterstützt sowohl Dateianhänge als Anmerkungen als auch eingebettete Dateien. Eingebettete Dateien werden dem Wörterbuch `files` hinzugefügt und erscheinen in den Anhangbereichen unterstützter PDF-Viewer.

Dateianhänge sind Anmerkungen, die auf eine Datei verweisen.

Jeder Anhang und jede eingebettete Datei muss mindestens `src` angeben. Es wird dringend empfohlen, über `name` einen Dateinamen anzugeben.

Der `src` eines Anhangs kann als Data-URL angegeben werden (wie beim folgenden Anhang von http://www.clipartbest.com/clipart-dT7zx5rT9); lokale Dateien sind ebenfalls möglich.

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

## URL-Ressourcen zwischenspeichern {#url-resource-caching}

Im Upstream-Entwicklungszweig für **0.3.14** verfügbar; nicht in der festgelegten Playground-Laufzeit 0.3.13.

Bei `attachments` und `files` gehört das Ressourcenobjekt mit `url`, optionalen `headers` und `cache` in `src`. Die Cache-Eigenschaft muss innerhalb von `src` stehen.

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

Neue Downloads werden standardmäßig pro Dokument gespeichert. `cache: true` legt neue Daten im gemeinsamen Arbeitsspeicher-Cache für spätere Dokumente ab; `cache: false` erlaubt weiterhin das Lesen vorhandener gemeinsamer Einträge. URL-Zeichenfolgen und Objekte ohne `cache` verwenden die globale Einstellung. Der HTTP-Cache des Browsers ist davon unabhängig.

Konfiguration und Sicherheit erklärt [URL-Ressourcen zwischenspeichern](/docs/0.3/de/getting-started/server-side/methods/#url-resource-caching).
