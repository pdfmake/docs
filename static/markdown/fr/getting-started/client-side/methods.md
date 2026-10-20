# Méthodes de sortie du navigateur

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/getting-started/client-side/methods/

## Créer un document

Après avoir [chargé le moteur et les polices](/docs/0.3/fr/getting-started/client-side/) :

**JavaScript**

```js
const output = pdfMake.createPdf(docDefinition, options);
```

**TypeScript**

```ts
const output = pdfMake.createPdf(docDefinition, options);
```

Le deuxième argument facultatif contient les [options de rendu](/docs/0.3/fr/options/). `createPdf` renvoie immédiatement un objet de sortie. Les méthodes de sortie renvoient des Promises ; gérez leurs rejets.

## Choisir une sortie

| Méthode | Valeur résolue | Comportement |
| --- | --- | --- |
| `download(filename?)` | `undefined` | Lance un téléchargement ; le nom de fichier par défaut est `file.pdf` |
| `open(window?)` | `undefined` | Navigue vers le PDF généré dans une nouvelle fenêtre ou une fenêtre fournie |
| `print(window?)` | `undefined` | Ouvre un PDF avec une action d’impression ; le comportement varie selon le lecteur |
| `getBlob()` | `Blob` | Données binaires avec le type MIME `application/pdf` |
| `getBuffer()` | Octets compatibles avec Buffer | Octets PDF bruts |
| `getBase64()` | `string` | PDF encodé en base64 |
| `getDataUrl()` | `string` | URL de données base64 |
| `getStream()` | Flux PDFKit | Sortie de bas niveau ; préférez généralement Blob ou les octets |

**JavaScript**

```js
try {
  await pdfMake.createPdf(docDefinition).download('report.pdf');
} catch (error) {
  console.error('PDF generation failed', error);
}
```

**TypeScript**

```ts
try {
  await pdfMake.createPdf(docDefinition).download('report.pdf');
} catch (error) {
  console.error('PDF generation failed', error);
}
```

La résolution de la Promise de téléchargement ne confirme pas que l’utilisateur a enregistré le fichier. L’impression dépend du navigateur et du lecteur PDF ; ne vous fiez pas à l’impression silencieuse.

## Ouvrir après une opération asynchrone

Ouvrez la fenêtre directement dans le gestionnaire de clic de l’utilisateur, avant d’attendre les données. Sinon, le bloqueur de fenêtres surgissantes peut refuser l’ouverture.

**JavaScript**

```js
async function openReport() {
  const win = window.open('', '_blank');
  if (!win) throw new Error('Allow popups to open the PDF');
  try {
    const response = await fetch('/report-data');
    if (!response.ok) throw new Error('Could not load report data');
    const data = await response.json();
    const definition = { content: [String(data.title)] };
    await pdfMake.createPdf(definition).open(win);
  } catch (error) {
    win.close();
    throw error;
  }
}
```

**TypeScript**

```ts
async function openReport() {
  const win = window.open('', '_blank');
  if (!win) throw new Error('Allow popups to open the PDF');
  try {
    const response = await fetch('/report-data');
    if (!response.ok) throw new Error('Could not load report data');
    const data = await response.json();
    const definition = { content: [String(data.title)] };
    await pdfMake.createPdf(definition).open(win);
  } catch (error) {
    win.close();
    throw error;
  }
}
```

Appelez `openReport` depuis le gestionnaire de clic de votre application et gérez le rejet de sa Promise. Pour imprimer, remplacez `.open(win)` par `.print(win)`. Le passage de `window` navigue dans l’onglet actuel. Définissez le [titre des métadonnées](/docs/0.3/fr/document-definition-object/document-medatadata/) du document pour identifier le PDF ; le nom de fichier et le titre affichés par le lecteur dépendent du navigateur.

## Gérer les URL Blob

**JavaScript**

```js
const blob = await pdfMake.createPdf(docDefinition).getBlob();
const url = URL.createObjectURL(blob);
document.querySelector('#preview').src = url;
// Revoke url when replacing the preview or removing it, after it is no longer needed.
```

**TypeScript**

```ts
const blob = await pdfMake.createPdf(docDefinition).getBlob();
const url = URL.createObjectURL(blob);
document.querySelector('#preview').src = url;
// Revoke url when replacing the preview or removing it, after it is no longer needed.
```

Conservez l’URL tant que le lecteur l’utilise. Appelez `URL.revokeObjectURL(url)` lors du nettoyage. Utilisez un nouvel objet de sortie pour chaque rendu. Évitez de mélanger la lecture manuelle d’un flux avec les méthodes buffer ou Blob sur la même sortie.

## Politique d’accès aux URL

Depuis la version **0.3.6**, `setUrlAccessPolicy(callback)` accepte une fonction synchrone qui renvoie un booléen. Elle ne constitue pas un bac à sable réseau complet, et les redirections du navigateur peuvent avoir lieu avant la vérification de l’URL finale. Consultez la [sécurité des ressources](/docs/0.3/fr/guides/resource-security/).
