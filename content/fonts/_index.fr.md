+++
title = "Polices et couverture des caractères"
description = "Enregistrez des familles et variantes de polices dans Node.js ou le navigateur, et choisissez des polices adaptées aux langues de vos documents."
weight = 25
sourceDigest = "62a4549bbe46519fb6f576d6cab99d9ed5fc071bddcfb1b77fa75f75df6e785b"
+++

## Choisir une stratégie de polices

| Environnement | Source de polices | Configuration |
| --- | --- | --- |
| Node.js | Fichiers de police réels | `addFonts` avec des chemins absolus |
| Node.js | Polices PDF standard | `require('pdfmake/standard-fonts/Helvetica')` |
| Navigateur | VFS Roboto intégré | Charger `build/vfs_fonts.js` |
| Navigateur | VFS personnalisé ou URL | [Polices personnalisées dans le navigateur](/docs/0.3/fr/fonts/custom-fonts-client-side/) |

La famille par défaut est `Roboto`. Node.js n’enregistre pas automatiquement ses fichiers. Pour chaque famille, associez `normal`, `bold`, `italics` et `bolditalics` aux données de police appropriées. Un style qui sélectionne une variante manquante peut échouer même si le texte normal s’affiche.

## Enregistrer des polices locales dans Node.js

Cet exemple suppose que vous possédez les fichiers de police sous licence dans un dossier `fonts` à côté de votre script CommonJS :

```js
const path = require('node:path');
const pdfmake = require('pdfmake');
const fonts = {
  Roboto: {
    normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, 'fonts/Roboto-MediumItalic.ttf')
  }
};
const allowed = new Set(Object.values(fonts.Roboto));
pdfmake.addFonts(fonts);
pdfmake.setLocalAccessPolicy(file => allowed.has(path.resolve(file)));
pdfmake.setUrlAccessPolicy(() => false);
```

Cette liste d’autorisation convient aux fichiers immuables gérés par l’application. Si les chemins proviennent d’utilisateurs non fiables, tenez également compte des liens symboliques et des permissions du système de fichiers. Une simple vérification de préfixe telle que `fonts/` ne constitue pas une limite de sécurité.

## Faire correspondre le texte aux glyphes disponibles

Les polices standard ont des encodages limités et ne couvrent pas n’importe quel caractère Unicode. Choisissez des polices incorporées qui contiennent les glyphes nécessaires aux langues de vos documents. Une chaîne Unicode ne garantit pas à elle seule que la police choisie saura l’afficher. Vérifiez des caractères représentatifs ainsi que toutes les variantes grasses et italiques dans les PDF générés.

pdfmake incorpore les polices au moyen de PDFKit. Dans le navigateur, n’incluez que les familles nécessaires : les données VFS augmentent les coûts de téléchargement et d’analyse. Respectez les licences de redistribution et d’incorporation de chaque police.

## Guides associés

[Les 14 polices standard](/docs/0.3/fr/fonts/standard-14-fonts/) · [VFS du navigateur](/docs/0.3/fr/fonts/custom-fonts-client-side/vfs/) · [URL de polices](/docs/0.3/fr/fonts/custom-fonts-client-side/url/) · [Dépannage](/docs/0.3/fr/guides/troubleshooting/)
