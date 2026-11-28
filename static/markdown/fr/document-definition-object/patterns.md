# Motifs

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/patterns/

Les motifs peuvent être définis sous forme de dictionnaire de motifs prédéfinis dans la définition du document.

Seuls les motifs de pavage sont pris en charge.

## Définition d’un motif

Chaque motif est défini à l’aide des propriétés suivantes :

- `boundingBox` - boîte de délimitation servant à découper la cellule du motif
- `xStep` - espacement horizontal entre les cellules
- `yStep` - espacement vertical entre les cellules
- `pattern` - flux d’opérations PDF qui dessinent les éléments graphiques et le texte de la cellule

Pour en savoir plus sur chaque propriété et les motifs en général, consultez la [référence PDF](https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/pdf_reference_archives/PDFReference.pdf), en particulier les sections 4.6 et 4.6.2 sur les motifs de pavage.

## Exemple de définition d’un motif

Motif de base produisant des rayures à 45° :

**JavaScript**

```js
var docDefinition = {
  content: ["..."],
  patterns: {
    stripe45d: {
      boundingBox: [1, 1, 4, 4],
      xStep: 3,
      yStep: 3,
      pattern: "1 w 0 1 m 4 5 l s 2 0 m 5 3 l s",
    },
  },
};
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: ["..."],
  patterns: {
    stripe45d: {
      boundingBox: [1, 1, 4, 4],
      xStep: 3,
      yStep: 3,
      pattern: "1 w 0 1 m 4 5 l s 2 0 m 5 3 l s",
    },
  },
};
```

Le résultat est visible dans l’exemple vectoriel.

## Utilisation dans les vecteurs, tableaux et textes

Les propriétés suivantes sont disponibles.

Pour le texte :

- `background` - définit l’arrière-plan du texte (voir l’exemple `styling_properties`)

Pour les vecteurs :

- `color` - définit la couleur de remplissage d’un vecteur (voir le rectangle dans l’exemple vectoriel)

Pour les cellules de tableau :

- `fillColor` - couleur de remplissage de la cellule (arrière-plan)
- `overlayPattern` - motif superposé à la cellule, dessiné par-dessus le contenu
- `overlayOpacity` - opacité de la superposition

Chacune de ces propriétés est définie par un tuple `[string, string]`. Le premier élément est la clé du motif dans le dictionnaire et le second est la couleur utilisée pour dessiner le motif.

## Exemples

Texte :

**JavaScript**

```js
var dd = { content: [
{ text: 'Insert lorem. And ipsum', background: ['stripe45d', 'gray'] }
] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [
{ text: 'Insert lorem. And ipsum', background: ['stripe45d', 'gray'] }
] };
```

Vecteur :

**JavaScript**

```js
var dd = { content: [{ canvas: [
{
  type: 'rect',
  x: 10, y: 250, w: 50, h: 30,
  color: ['stripe45d', 'blue'],
}
] }] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [{ canvas: [
{
  type: 'rect',
  x: 10, y: 250, w: 50, h: 30,
  color: ['stripe45d', 'blue'],
}
] }] };
```

Tableau (dans les cellules) :

**JavaScript**

```js
var dd = { content: [
{
  text: 'Sample value',
  fillOpacity: 0.85,
  fillColor: ['stripe45d', 'blue']
}
] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [
{
  text: 'Sample value',
  fillOpacity: 0.85,
  fillColor: ['stripe45d', 'blue']
}
] };
```

**JavaScript**

```js
var dd = { content: [
{
  text: 'Sample value',
  fillOpacity: 0.15,
  fillColor: 'blue',
  overlayPattern: ['stripe45d', 'gray'],
  overlayOpacity: 0.15
}
] };
```

**TypeScript**

```ts
import type { ContentText } from "pdfmake/interfaces";

// Cell properties are included in the bundled pdfmake declarations.
const cell = {
  text: 'Sample value',
  fillOpacity: 0.15,
  fillColor: 'blue',
  overlayPattern: ['stripe45d', 'gray'],
  overlayOpacity: 0.15
} satisfies ContentText;

```
