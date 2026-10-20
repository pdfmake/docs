# Icônes

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/fonts/icons/

- Créez une police sur http://fontello.com/ ou un site similaire, puis téléchargez-la.

- À partir du fichier de police (par exemple `.ttf`), créez un fichier `vfs_fonts.js` (voir [comment utiliser des polices personnalisées](/docs/0.3/fr/fonts/custom-fonts-client-side/vfs/)).

- Déclarez la police en JavaScript (il peut suffire de définir `normal`) :
**JavaScript**

```js
pdfMake.fonts = {
    Fontello: {
        normal: 'fontello.ttf',
        bold: 'fontello.ttf',
        italics: 'fontello.ttf',
        bolditalics: 'fontello.ttf'
    }
}
```

**TypeScript**

```ts
pdfMake.fonts = {
    Fontello: {
        normal: 'fontello.ttf',
        bold: 'fontello.ttf',
        italics: 'fontello.ttf',
        bolditalics: 'fontello.ttf'
    }
}
```

- Ajoutez un style pour les icônes :
`            icon: {
                font: 'Fontello'
            }`
- Créez un paragraphe de texte :
`
            { text: '', style: 'icon' }, //icon wifi`
- Copiez le caractère indiqué dans les commentaires de `fontello-codes.css` (et non sa valeur échappée).

---

Pour insérer une icône au sein d’un texte, imbriquez des objets de texte :

**JavaScript**

```js
var dd = { content: [{
text: [
        { text: '', style: 'icon' }, //icon gift
        " my present"
    ]
}] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [{
text: [
        { text: '', style: 'icon' }, //icon gift
        " my present"
    ]
}] };
```
Cela affiche « [icône cadeau] my present ».
