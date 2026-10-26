+++
title = "Bien dÃ©marrer"
description = "Choisissez Node.js ou le navigateur, enregistrez les polices et gÃ©nÃ©rez votre premier PDF avec pdfmake 0.3."
weight = 10
sourceDigest = "99fb4e43045381e3fb65fdf81576ac12ed30e6cf3ca5e79f4130207b775a67d0"
+++

## Choisir votre environnement

- [Node.js](/docs/0.3/fr/getting-started/server-side/) : Ã©crire un fichier, renvoyer un Buffer depuis une API ou consommer un flux.
- [Navigateur](/docs/0.3/fr/getting-started/client-side/) : tÃ©lÃ©charger, ouvrir, imprimer ou obtenir un Blob.

Les deux environnements utilisent la mÃªme [dÃ©finition de document](/docs/0.3/fr/document-definition-object/). Les mÃ©thodes de sortie renvoient des Promises. Le chargement des polices diffÃ¨re entre les fichiers Node et les conteneurs de polices du navigateur.

## Avant de commencer

Consultez la documentation correspondant Ã  la version installÃ©e (`npm ls pdfmake`). Commencez par un exemple minimal avant dâ€™ajouter des polices personnalisÃ©es, des images distantes ou des dispositions de tableau. Pour les applications 0.1/0.2, suivez le [guide de migration](/docs/0.3/fr/migration-from-0.1/).

## JavaScript et TypeScript

Cette branche de développement fournit ses propres déclarations TypeScript avec la bibliothèque et sépare les API Node et navigateur. Pour le paquet construit localement, installez TypeScript sans `@types/pdfmake`. Le paquet npm publié 0.3.13 nécessite encore les types communautaires correspondants ; les déclarations natives et la validation préalable présentées ici ne sont pas encore publiées. Le compilateur vérifié est TypeScript 5.9.3.

```sh
npm install pdfmake@0.3.13
npm install --save-dev typescript@~5.9.3
```

Node.js : enregistrez cet exemple dans `document.mts`. `NodeNext` permet au compilateur de suivre la rÃ©solution rÃ©elle de Node. Un fichier CommonJS `.cts` peut commencer par `import pdfmake = require("pdfmake")`. Ã‰vitez les imports nommÃ©s Ã  lâ€™exÃ©cution.

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

Avec un bundler pour navigateur, importez le point dâ€™entrÃ©e prÃ©compilÃ© et enregistrez directement le VFS. Utilisez `module: "ESNext"` et `moduleResolution: "Bundler"` ; ces options nÃ©cessitent un bundler et ne conviennent pas Ã  une sortie exÃ©cutÃ©e directement par Node.

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

Les types apportent la complétion et les vérifications à la compilation. Ils ne valident pas le JSON externe et ne garantissent pas la mise en page. Les déclarations fournies distinguent `write` dans Node de `getBlob`, `download`, `open` et `print` dans le navigateur. Utilisez les imports explicites du navigateur pour les bundlers. Le playground et les exemples intégrés vérifient TypeScript localement avant le rendu. Consultez la [validation des documents](/docs/0.3/fr/guides/errors/) pour les contrôles à l’exécution.
