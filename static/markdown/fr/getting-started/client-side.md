# Démarrage rapide dans le navigateur

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/getting-started/client-side/

## Installer et copier les ressources du navigateur

```sh
npm install pdfmake@0.3.12
```

Copiez `node_modules/pdfmake/build/pdfmake.min.js` et `node_modules/pdfmake/build/vfs_fonts.js` à côté de ce fichier HTML. Servez le dossier avec votre serveur de développement local.

## Générer un PDF

```html
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>My first PDF</title></head>
<body>
  <button id="download" type="button">Download PDF</button>
  <p id="status" role="status"></p>
  <script src="./pdfmake.min.js"></script>
  <script src="./vfs_fonts.js"></script>
  <script>
    document.querySelector('#download').addEventListener('click', async () => {
      try {
        await pdfMake.createPdf({ content: ['Hello from the browser!'] }).download('hello.pdf');
        document.querySelector('#status').textContent = 'PDF prepared';
      } catch (error) {
        document.querySelector('#status').textContent = 'PDF generation failed';
        console.error(error);
      }
    });
  </script>
</body>
</html>
```

Chargez le moteur **avant** son lot de polices. `vfs_fonts.js` fournit les fichiers Roboto par défaut. Cet exemple ne nécessite pas d’API de rendu côté serveur. La résolution de `download()` signifie que le téléchargement a été lancé ; elle ne confirme pas que l’utilisateur a enregistré le fichier.

## Utiliser un bundler

**JavaScript**

```js
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.addVirtualFileSystem(pdfFonts);
await pdfMake.createPdf({ content: ['Bundled application'] }).download('document.pdf');
```

**TypeScript**

```ts
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.addVirtualFileSystem(pdfFonts);
await pdfMake.createPdf({ content: ['Bundled application'] }).download('document.pdf');
```

Ce code s’exécute dans le module de votre application ou dans un gestionnaire d’événement asynchrone. Avec un framework SSR, ne chargez pas ces imports côté serveur. Pour TypeScript, utilisez des déclarations compatibles avec la version pdfmake installée ; les types ne permettent pas à une ancienne version d’exécuter l’API 0.3.

## Ouvrir et imprimer

Appelez `open()` ou `print()` à la suite d’une action de l’utilisateur pour éviter le blocage des fenêtres surgissantes. Si vous récupérez d’abord des données, ouvrez une fenêtre de façon synchrone, puis transmettez-la à la méthode de sortie. Consultez [Méthodes du navigateur](/docs/0.3/fr/getting-started/client-side/methods/).

## Étapes suivantes

[Polices personnalisées](/docs/0.3/fr/fonts/custom-fonts-client-side/) · [Méthodes du navigateur](/docs/0.3/fr/getting-started/client-side/methods/) · [Dépannage](/docs/0.3/fr/guides/troubleshooting/)
