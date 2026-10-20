# Bien démarrer

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/getting-started/

## Choisir votre environnement

- [Node.js](/docs/0.3/fr/getting-started/server-side/) : écrire un fichier, renvoyer un Buffer depuis une API ou consommer un flux.
- [Navigateur](/docs/0.3/fr/getting-started/client-side/) : télécharger, ouvrir, imprimer ou obtenir un Blob.

Les deux environnements utilisent la même [définition de document](/docs/0.3/fr/document-definition-object/). Les méthodes de sortie renvoient des Promises. Le chargement des polices diffère entre les fichiers Node et les conteneurs de polices du navigateur.

## Avant de commencer

Consultez la documentation correspondant à la version installée (`npm ls pdfmake`). Commencez par un exemple minimal avant d’ajouter des polices personnalisées, des images distantes ou des dispositions de tableau. Pour les applications 0.1/0.2, suivez le [guide de migration](/docs/0.3/fr/migration-from-0.1/).

## JavaScript et TypeScript

Cette branche de d�veloppement fournit ses propres d�clarations TypeScript avec la biblioth�que et s�pare les API Node et navigateur. Pour le paquet construit localement, installez TypeScript sans `@types/pdfmake`. Le paquet npm publi� 0.3.12 n�cessite encore les types communautaires correspondants ; les d�clarations natives et la validation pr�alable pr�sent�es ici ne sont pas encore publi�es. Le compilateur v�rifi� est TypeScript 5.9.3.

```sh
npm install pdfmake@0.3.12
npm install --save-dev typescript@~5.9.3
```

Node.js : enregistrez cet exemple dans `document.mts`. `NodeNext` permet au compilateur de suivre la résolution réelle de Node. Un fichier CommonJS `.cts` peut commencer par `import pdfmake = require("pdfmake")`. Évitez les imports nommés à l’exécution.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true
  }
}
```

**JavaScript**

```js
import pdfmake from 'pdfmake';
import { strict as assert } from 'node:assert';
pdfmake.addFonts({ Helvetica: { normal: 'Helvetica', bold: 'Helvetica-Bold', italics: 'Helvetica-Oblique', bolditalics: 'Helvetica-BoldOblique' } });
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(name => name.startsWith('Helvetica'));
const definition = { content: [{ table: { body: [['ESM', 'TypeScript'], ['Promise', 'Output']] } }], defaultStyle: { font: 'Helvetica' } };
const buffer = await pdfmake.createPdf(definition).getBuffer();
assert.equal(buffer.subarray(0, 5).toString(), '%PDF-');
```

**TypeScript**

```ts
import pdfmake from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces.js';
import { strict as assert } from 'node:assert';

pdfmake.addFonts({ Helvetica: { normal: 'Helvetica', bold: 'Helvetica-Bold', italics: 'Helvetica-Oblique', bolditalics: 'Helvetica-BoldOblique' } });
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(name => name.startsWith('Helvetica'));
const definition: TDocumentDefinitions = { content: [{ table: { body: [['ESM', 'TypeScript'], ['Promise', 'Output']] } }], defaultStyle: { font: 'Helvetica' } };
const buffer: Buffer = await pdfmake.createPdf(definition).getBuffer();
assert.equal(buffer.subarray(0, 5).toString(), '%PDF-');
```

Avec un bundler pour navigateur, importez le point d’entrée précompilé et enregistrez directement le VFS. Utilisez `module: "ESNext"` et `moduleResolution: "Bundler"` ; ces options nécessitent un bundler et ne conviennent pas à une sortie exécutée directement par Node.

**JavaScript**

```js
import pdfmake from 'pdfmake/build/pdfmake.js';
import vfs from 'pdfmake/build/vfs_fonts.js';
pdfmake.addVirtualFileSystem(vfs);
const definition = { content: [{ text: 'TypeScript browser bundler', bold: true }] };
export async function render() {
    return pdfmake.createPdf(definition).getBlob();
}
```

**TypeScript**

```ts
import pdfmake from 'pdfmake/build/pdfmake.js';
import vfs from 'pdfmake/build/vfs_fonts.js';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

pdfmake.addVirtualFileSystem(vfs);
const definition = { content: [{ text: 'TypeScript browser bundler', bold: true }] } satisfies TDocumentDefinitions;
export async function render(): Promise<Blob> {
  return pdfmake.createPdf(definition).getBlob();
}
```

Les types apportent la compl�tion et les v�rifications � la compilation. Ils ne valident pas le JSON externe et ne garantissent pas la mise en page. Les d�clarations fournies distinguent `write` dans Node de `getBlob`, `download`, `open` et `print` dans le navigateur. Utilisez les imports explicites du navigateur pour les bundlers. Le playground et les exemples int�gr�s v�rifient TypeScript localement avant le rendu. Consultez la [validation des documents](/docs/0.3/fr/guides/errors/) pour les contr�les � l�ex�cution.
