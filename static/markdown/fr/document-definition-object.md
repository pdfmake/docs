# Référence de la définition de document

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/

## Structure d’une définition

**JavaScript**

```js
const docDefinition = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [40, 50, 40, 50],
  defaultStyle: { fontSize: 12 },
  styles: { heading: { fontSize: 20, bold: true } },
  info: { title: 'Example document', author: 'Example author' },
  content: [
    { text: 'Document heading', style: 'heading' },
    'A plain string becomes a paragraph.',
    { ul: ['First item', 'Second item'] }
  ]
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

const docDefinition: TDocumentDefinitions = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [40, 50, 40, 50],
  defaultStyle: { fontSize: 12 },
  styles: { heading: { fontSize: 20, bold: true } },
  info: { title: 'Example document', author: 'Example author' },
  content: [
    { text: 'Document heading', style: 'heading' },
    'A plain string becomes a paragraph.',
    { ul: ['First item', 'Second item'] }
  ]
};
```

Transmettez la définition à la méthode `createPdf` de votre environnement après avoir configuré les polices. Toutes les dimensions numériques sont exprimées en **points** (72 points par pouce). Les marges suivent l’ordre **gauche, haut, droite, bas**. Le tableau `content` forme une pile verticale. Créez un nouvel objet pour chaque rendu : le processus de mise en page y ajoute des mesures internes et des positions.

## Nœuds de contenu

| Nœud | Rôle | Référence |
| --- | --- | --- |
| `{ text: '...' }` | Paragraphe ou séquences de texte en ligne | [Styles](/docs/0.3/fr/document-definition-object/styling/) |
| `{ stack: [...] }` | Regroupe des blocs et leur applique un style commun | [Piles](/docs/0.3/fr/document-definition-object/stack/) |
| `{ columns: [...] }` | Contenu côte à côte | [Colonnes](/docs/0.3/fr/document-definition-object/columns/) |
| `{ table: { body: [...] } }` | Lignes, cellules et en-têtes répétés | [Tableaux](/docs/0.3/fr/document-definition-object/tables/) |
| `{ ul: [...] }`, `{ ol: [...] }` | Listes à puces ou numérotées | [Listes](/docs/0.3/fr/document-definition-object/lists/) |
| `{ image: 'key' }` | PNG ou JPEG | [Images](/docs/0.3/fr/document-definition-object/images/) |
| `{ svg: '<svg>...</svg>' }` | Contenu vectoriel SVG | [SVG](/docs/0.3/fr/document-definition-object/svgs/) |
| `{ qr: '...' }` | Code QR | [QR](/docs/0.3/fr/document-definition-object/qr/) |

## Paramètres du document

- [Format, orientation et sauts de page](/docs/0.3/fr/document-definition-object/page/), [marges](/docs/0.3/fr/document-definition-object/margins/) et [sections](/docs/0.3/fr/document-definition-object/sections/).
- [En-têtes et pieds de page](/docs/0.3/fr/document-definition-object/headers-footers/), [arrière-plans](/docs/0.3/fr/document-definition-object/background-layer/) et [filigranes](/docs/0.3/fr/document-definition-object/watermark/).
- [Métadonnées](/docs/0.3/fr/document-definition-object/document-medatadata/), [liens](/docs/0.3/fr/document-definition-object/links/), [table des matières](/docs/0.3/fr/document-definition-object/toc/) et [plans](/docs/0.3/fr/document-definition-object/outlines/).
- [Pièces jointes](/docs/0.3/fr/document-definition-object/attachments/), [chiffrement](/docs/0.3/fr/document-definition-object/security/), [PDF/A](/docs/0.3/fr/document-definition-object/pdfa/) et [compression](/docs/0.3/fr/document-definition-object/compression/).

## Définition et options de rendu

Le contenu et les paramètres visuels appartiennent à la définition. `fontLayoutCache` et `bufferPages` se placent dans le deuxième argument de `createPdf`. Les polices, les mises en page de tableau et les politiques de ressources se configurent sur l’API pdfmake. Consultez la [référence de l’API](/docs/0.3/fr/guides/api-reference/).
