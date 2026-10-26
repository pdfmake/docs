+++
title = "Démarrage rapide avec Node.js"
description = "Créez un fichier PDF complet avec pdfmake 0.3 dans Node.js, les polices standard et des sorties fondées sur des Promises."
weight = 12
sourceDigest = "a943d71f035716932810834880e3bf5c02cde041ecc0cf438373b27e0c62157d"
+++

## Installer

Utilisez Node.js **20 ou ultérieur**. Créez une application et installez pdfmake :

```sh
npm init -y
npm install pdfmake@0.3.13
```

La version exacte rend cet exemple reproductible. Consultez les notes de version et effectuez des tests avant de choisir un correctif plus récent.

## Écrire votre premier PDF

Enregistrez cet exemple complet sous `first-pdf.cjs`, puis exécutez `node first-pdf.cjs`.

```js
// docs-test: node-quickstart
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

`write()` se résout lorsque le fichier de sortie est fermé. Gérez le rejet des Promises afin qu’un échec de génération ne produise pas silencieusement une réponse API présentée comme réussie.

Helvetica ne nécessite aucun fichier de police local ; l’exemple bloque donc les URL externes et n’autorise, via la stratégie locale, que les identifiants de polices standard. L’implémentation actuelle vérifie ces identifiants même s’il ne s’agit pas de chemins de fichiers. Les polices standard couvrent un nombre limité de caractères. Pour les documents multilingues, [enregistrez des fichiers de police adaptés](/docs/0.3/fr/fonts/) et autorisez explicitement leurs chemins résolus.

## Renvoyer les octets PDF depuis une API

```js
const buffer = await pdfmake.createPdf({
  defaultStyle: { font: 'Helvetica' },
  content: ['API document']
}).getBuffer();

// Adapt these lines to your HTTP framework:
response.setHeader('Content-Type', 'application/pdf');
response.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
response.end(buffer);
```

Cet extrait suppose que `pdfmake` est configuré comme ci-dessus et que `response` est l’objet de réponse de votre framework. Validez les données reçues avant de construire une définition. Créez une définition neuve pour chaque requête : la mise en page la modifie.

## Applications ESM

Le paquet Node exporte une instance configurée. Dans une application ESM, utilisez `import pdfmake from 'pdfmake'` ; ne créez pas d’instance avec `new PdfPrinter(...)` comme dans les anciens exemples. Enregistrez les polices et les stratégies une seule fois au démarrage de l’application. Évitez de modifier la configuration de l’instance partagée pendant des requêtes concurrentes.

## Étapes suivantes

[Méthodes de sortie](/docs/0.3/fr/getting-started/server-side/methods/) · [Accès aux ressources](/docs/0.3/fr/guides/resource-security/) · [Recette de facture](/docs/0.3/fr/guides/invoice/)
