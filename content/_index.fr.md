+++
title = "Vue d’ensemble"
description = "Créez des PDF avec pdfmake 0.3 : guides progressifs, exemples exécutables et référence pour JavaScript."
weight = 0
sourceDigest = "3be141146a4c948512e50597ef37f878749e249c98a65a0af17c20b1e7cc62b3"
+++

Créez un PDF en trois étapes : configurez l’environnement, décrivez le contenu, puis demandez une sortie.

## 1. Choisir votre environnement

<div class="runtime-picker" data-runtime-picker role="tablist" aria-label="Runtime"><button type="button" role="tab" id="runtime-node" aria-controls="panel-node" data-runtime="node" aria-selected="true">Node.js / API</button><button type="button" role="tab" id="runtime-browser" aria-controls="panel-browser" data-runtime="browser" aria-selected="false">Navigateur</button></div>
<div data-runtime-panel="node" role="tabpanel" id="panel-node" aria-labelledby="runtime-node">

Utilisez Node.js 20 ou ultérieur. Installez la version fixe ci-dessous, enregistrez cet exemple complet dans `first-pdf.cjs`, puis lancez `node first-pdf.cjs`.

```sh
npm install pdfmake@0.3.13
```

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

[Démarrage avec Node.js](/docs/0.3/fr/getting-started/server-side/)

</div>
<div data-runtime-panel="browser" role="tabpanel" id="panel-browser" aria-labelledby="runtime-browser">

Le navigateur a besoin du moteur puis des polices. Le guide complet inclut un bouton de téléchargement et la gestion des erreurs.

[Démarrage dans le navigateur](/docs/0.3/fr/getting-started/client-side/)

</div>

## 2. Comprendre la définition

Une définition est un objet JavaScript, pas du HTML. `content` énumère les blocs dans l’ordre de lecture. Cet exemple génère exactement le PDF affiché. Modifiez-le dans le playground, puis revenez ici sans perdre votre espace de travail.

{{< example id="welcome" >}}

## 3. Choisir le prochain élément

- [Votre premier PDF](/docs/0.3/fr/learn/first-pdf/)
- [Le modèle de document](/docs/0.3/fr/learn/document-model/)
- [Styles et mise en forme](/docs/0.3/fr/document-definition-object/styling/)
- [Tableaux](/docs/0.3/fr/document-definition-object/tables/)
- [Polices et caractères](/docs/0.3/fr/fonts/)
- [Comprendre et gérer les erreurs](/docs/0.3/fr/guides/errors/)

Utilisez une définition neuve à chaque génération, car la mise en page modifie l’objet. Les sorties renvoient des Promises : attendez-les avec `await` et gérez les erreurs.
