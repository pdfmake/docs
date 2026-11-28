# Options de rendu

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/options/

## Transmettre des options à createPdf

**JavaScript**

```js
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false,
  unbreakableOverflow: 'allowBreak'
});
```

**TypeScript**

```ts
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false,
  unbreakableOverflow: 'allowBreak'
});
```

L’objet d’options est distinct de la [définition du document](/docs/0.3/fr/document-definition-object/).

| Option | Type | Valeur par défaut | Signification |
| --- | --- | --- | --- |
| `fontLayoutCache` | boolean | `true` | Active le cache de mise en page des polices de PDFKit |
| `bufferPages` | boolean | `false` | Conserve les pages de PDFKit en mémoire tampon au lieu de les vider immédiatement |
| `unbreakableOverflow` | 'allowBreak' / 'error' | `'allowBreak'` | Contrôler les blocs insécables trop grands ; voir la section ci-dessous. |

Conservez les valeurs par défaut sauf si votre cas d’usage exige un changement. La mise en mémoire tampon des pages peut augmenter l’utilisation de la mémoire. Elle ne rend pas la mise en page propre à pdfmake différée ou incrémentale. Consultez [les performances](/docs/0.3/fr/guides/performance/) et [la documentation de PDFKit sur la mise en mémoire tampon des pages](https://pdfkit.org/docs/getting_started.html).

Les polices, les mises en page de tableaux nommées et les règles d’accès aux ressources se configurent via l’[API publique](/docs/0.3/fr/guides/api-reference/). Le format du papier, les marges et le contenu appartiennent à la définition.

## Débordement des blocs insécables {#unbreakable-overflow}

Depuis **0.3.15**, `unbreakableOverflow` contrôle les blocs insécables trop grands. Les deux modes gardent ensemble un bloc tenant sur une page ; un espace restant insuffisant le déplace simplement à la page suivante. Cela couvre `unbreakable`, `dontBreakRows`, `keepWithHeaderRows`, les fusions de lignes associées et les en-têtes répétés.

| Valeur | Comportement |
| --- | --- |
| `'allowBreak'` | Réessayer avec les contraintes d’insécabilité prises en charge assouplies, en scindant les blocs trop grands si possible. |
| `'error'` | Rejeter la génération si un bloc insécable ne tient pas sur une page. |
