# Vue d’ensemble

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/

Créez un PDF en trois étapes : configurez l’environnement, décrivez le contenu, puis demandez une sortie.

## 1. Choisir votre environnement




Utilisez Node.js 20 ou ultérieur. Installez la version fixe ci-dessous, enregistrez cet exemple complet dans `first-pdf.cjs`, puis lancez `node first-pdf.cjs`.

```sh
npm install pdfmake@0.3.13
```

**JavaScript**

```js
const pdfmake = require('pdfmake');

const fonts = require('pdfmake/standard-fonts/Helvetica');
pdfmake.addFonts(fonts);
pdfmake.setUrlAccessPolicy(() => false);
const standardNames = new Set(Object.values(fonts.Helvetica));
pdfmake.setLocalAccessPolicy(name => standardNames.has(name));

async function main() {
  const definition = {
    defaultStyle: { font: 'Helvetica' },
    content: [
      { text: 'Hello, pdfmake!', fontSize: 24, bold: true },
      'Your first PDF, generated in Node.js.'
    ]
  };
  await pdfmake.createPdf(definition).write('document.pdf');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfmake from "pdfmake";

const fonts = require('pdfmake/standard-fonts/Helvetica');
pdfmake.addFonts(fonts);
pdfmake.setUrlAccessPolicy(() => false);
const standardNames = new Set(Object.values(fonts.Helvetica));
pdfmake.setLocalAccessPolicy(name => standardNames.has(name));

async function main() {
  const definition: TDocumentDefinitions = {
    defaultStyle: { font: 'Helvetica' },
    content: [
      { text: 'Hello, pdfmake!', fontSize: 24, bold: true },
      'Your first PDF, generated in Node.js.'
    ]
  };
  await pdfmake.createPdf(definition).write('document.pdf');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
```

[Démarrage avec Node.js](/docs/0.3/fr/getting-started/server-side/)




Le navigateur a besoin du moteur puis des polices. Le guide complet inclut un bouton de téléchargement et la gestion des erreurs.

[Démarrage dans le navigateur](/docs/0.3/fr/getting-started/client-side/)



## 2. Comprendre la définition

Une définition est un objet JavaScript, pas du HTML. `content` énumère les blocs dans l’ordre de lecture. Cet exemple génère exactement le PDF affiché. Modifiez-le dans le playground, puis revenez ici sans perdre votre espace de travail.



### Runnable example: 01 · First document

**JavaScript**

```js
// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

// Define a fresh document in dd. Ctrl/⌘ + Enter to run.
var dd: TDocumentDefinitions = {
  content: [
    { text: 'Make something clear.', fontSize: 30, bold: true, color: '#08786b', margin: [0, 0, 0, 16] },
    'A paragraph, a table, a report. Start here and make it yours.',
    { text: 'Built with pdfmake', italics: true, color: '#667d73', margin: [0, 20, 0, 0] }
  ]
};
```

[See the rendered PDF and edit this example](https://pdfmake.github.io/docs/0.3/fr/playground/?example=welcome)



## 3. Choisir le prochain élément

- [Votre premier PDF](/docs/0.3/fr/learn/first-pdf/)
- [Le modèle de document](/docs/0.3/fr/learn/document-model/)
- [Styles et mise en forme](/docs/0.3/fr/document-definition-object/styling/)
- [Tableaux](/docs/0.3/fr/document-definition-object/tables/)
- [Polices et caractères](/docs/0.3/fr/fonts/)
- [Comprendre et gérer les erreurs](/docs/0.3/fr/guides/errors/)

Utilisez une définition neuve à chaque génération, car la mise en page modifie l’objet. Les sorties renvoient des Promises : attendez-les avec `await` et gérez les erreurs.
