+++
title = "Options de rendu"
description = "Configurez le cache de mise en page des polices et la mise en mémoire tampon des pages PDFKit via le second argument de createPdf."
weight = 30
sourceDigest = "fa3eacf7dfb3dc985a1eb6cf541fdccb9dae9648d423d3d758d78b70eabb4882"
+++

## Transmettre des options à createPdf

```js
const output = pdfmake.createPdf(docDefinition, {
  fontLayoutCache: true,
  bufferPages: false
});
```

L’objet d’options est distinct de la [définition du document](/docs/0.3/fr/document-definition-object/).

| Option | Type | Valeur par défaut | Signification |
| --- | --- | --- | --- |
| `fontLayoutCache` | boolean | `true` | Active le cache de mise en page des polices de PDFKit |
| `bufferPages` | boolean | `false` | Conserve les pages de PDFKit en mémoire tampon au lieu de les vider immédiatement |

Conservez les valeurs par défaut sauf si votre cas d’usage exige un changement. La mise en mémoire tampon des pages peut augmenter l’utilisation de la mémoire. Elle ne rend pas la mise en page propre à pdfmake différée ou incrémentale. Consultez [les performances](/docs/0.3/fr/guides/performance/) et [la documentation de PDFKit sur la mise en mémoire tampon des pages](https://pdfkit.org/docs/getting_started.html).

Les polices, les mises en page de tableaux nommées et les règles d’accès aux ressources se configurent via l’[API publique](/docs/0.3/fr/guides/api-reference/). Le format du papier, les marges et le contenu appartiennent à la définition.
