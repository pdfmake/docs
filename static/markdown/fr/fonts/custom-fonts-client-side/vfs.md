# Polices personnalisées avec le VFS

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/fonts/custom-fonts-client-side/vfs/

## Créer le conteneur de polices

Utilisez des fichiers de polices sous licence qui couvrent les langues visées. Placez-les dans le répertoire `fonts/` de votre application et générez un fichier VFS depuis la racine du projet :

```sh
node node_modules/pdfmake/build-vfs.js ./fonts ./vfs_fonts.js
```

Tous les fichiers du répertoire fourni sont intégrés sous forme d’entrées base64. Gardez les ressources générées de l’application en dehors de `node_modules` afin qu’une installation ne remplace pas vos polices personnalisées. Régénérez le VFS chaque fois que les fichiers de polices changent. Le VFS du navigateur n’est pas nécessaire pour les [chemins de polices Node.js](/docs/0.3/fr/fonts/).

## Charger et enregistrer les polices

Chargez le moteur avant le script VFS généré. Le script généré enregistre ses fichiers si `pdfMake` est déjà disponible. Avec un bundler, importez l’objet VFS et appelez explicitement `addVirtualFileSystem` :

**JavaScript**

```js
import pdfMake from 'pdfmake/build/pdfmake';
import customVfs from './vfs_fonts';

pdfMake.addVirtualFileSystem(customVfs);
pdfMake.addFonts({
  MyFont: {
    normal: 'MyFont-Regular.ttf',
    bold: 'MyFont-Bold.ttf',
    italics: 'MyFont-Italic.ttf',
    bolditalics: 'MyFont-BoldItalic.ttf'
  }
});

await pdfMake.createPdf({
  defaultStyle: { font: 'MyFont' },
  content: ['A document using my font.']
}).download('document.pdf');
```

**TypeScript**

```ts
import pdfMake from 'pdfmake/build/pdfmake';
import customVfs from './vfs_fonts';

pdfMake.addVirtualFileSystem(customVfs);
pdfMake.addFonts({
  MyFont: {
    normal: 'MyFont-Regular.ttf',
    bold: 'MyFont-Bold.ttf',
    italics: 'MyFont-Italic.ttf',
    bolditalics: 'MyFont-BoldItalic.ttf'
  }
});

await pdfMake.createPdf({
  defaultStyle: { font: 'MyFont' },
  content: ['A document using my font.']
}).download('document.pdf');
```

Remplacez ces noms par les clés exactes du VFS généré. Les noms de famille, comme `MyFont`, sont utilisés dans les styles ; les clés de fichier désignent les fichiers incorporés. Définissez chaque variante que vous utilisez. Vous pouvez associer plusieurs variantes à un seul fichier si c’est intentionnel, mais cela ne crée pas de véritable graisse ou style italique.

## Collections de polices

Pour une collection TrueType prise en charge, un descripteur peut être un tableau `[filename, faceName]` :

**JavaScript**

```js
pdfMake.addFonts({
  PingFangSC: {
    normal: ['pingfang.ttc', 'PingFangSC-Regular'],
    bold: ['pingfang.ttc', 'PingFangSC-Semibold']
  }
});
```

**TypeScript**

```ts
pdfMake.addFonts({
  PingFangSC: {
    normal: ['pingfang.ttc', 'PingFangSC-Regular'],
    bold: ['pingfang.ttc', 'PingFangSC-Semibold']
  }
});
```

Incorporez la collection et utilisez des noms de faces valides. Cet exemple n’enregistre que les variantes normale et grasse ; ajoutez les variantes italiques avant de les utiliser.

## Erreurs fréquentes

Si un fichier est introuvable, comparez le nom de fichier du descripteur aux clés du VFS généré. Si une police n’est pas définie, comparez `defaultStyle.font` à la famille dans le mappage. Si des caractères manquent, vérifiez la couverture des glyphes de la police. Si le bundle du navigateur est volumineux, retirez du répertoire d’entrée VFS les familles et fichiers inutilisés.
