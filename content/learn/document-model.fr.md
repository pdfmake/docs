+++
title = "Le modèle de document"
description = "Choisissez entre paragraphes, texte en ligne, piles, colonnes et tableaux, et comprenez où placer la configuration."
weight = 2
sourceDigest = "7e8645b7aacec49012239058169490a59be9441a27c94823fc6aa528cef81064"
+++

## Partir du contenu

`content` décrit le corps du PDF. Une chaîne simple est un paragraphe. Un tableau `content` est une séquence verticale de blocs. Un objet décrit un nœud avec des propriétés supplémentaires. pdfmake calcule les positions ; en général, vous n’avez pas à indiquer de coordonnées.

```js
const dd = {
  content: [
    'One paragraph.',
    { text: 'Another paragraph.', bold: true },
    { text: ['One paragraph with ', { text: 'an emphasized part', italics: true }] }
  ]
};
```

Le tableau `text` imbriqué crée des **segments en ligne dans le même paragraphe**. Un tableau `content` ou une `stack` crée des **blocs distincts**. Cette différence explique de nombreux retours à la ligne surprenants lorsque l’on commence à construire des définitions.

## Choisir un conteneur

| Besoin | Nœud | Erreur courante |
| --- | --- | --- |
| Plusieurs paragraphes partageant un style | `{ stack: [...] }` | Essayer d’affecter directement des propriétés de style à un tableau |
| Blocs indépendants côte à côte | `{ columns: [...] }` | S’attendre à l’alignement des lignes d’un tableau |
| Lignes et cellules alignées | `{ table: { body: [...] } }` | Omettre les cellules de remplacement après `colSpan` ou `rowSpan` |
| Éléments à puces ou numérotés | `{ ul: [...] }` ou `{ ol: [...] }` | Fournir une chaîne là où un tableau d’éléments est attendu |
| Styles mélangés sur une même ligne | `{ text: [...] }` | Utiliser une pile, qui crée des blocs distincts |

{{< example id="columns" >}}

## Placer les paramètres au bon niveau

| Niveau | Exemples | Rôle |
| --- | --- | --- |
| Configuration de l’application | `addFonts`, `addTableLayouts`, règles d’accès aux ressources | Enregistrer des ressources réutilisables avant le démarrage des tâches |
| Définition du document | `content`, `styles`, `defaultStyle`, `pageMargins`, `footer` | Décrire un PDF |
| Nœud individuel | `text`, `fontSize`, `bold`, `margin`, `pageBreak` | Décrire un élément de contenu |
| Deuxième argument de `createPdf` | `fontLayoutCache`, `bufferPages` | Régler les options du moteur |

Dans un service Node, enregistrez une fois les polices et règles partagées. Construisez une définition neuve pour chaque tâche : la mise en page ajoute des mesures et positions aux nœuds. Évitez de modifier la configuration de l’instance pdfmake partagée pendant des requêtes concurrentes.

## Comprendre unités et largeurs

Les dimensions sont exprimées en points. Une marge à quatre valeurs suit l’ordre `[gauche, haut, droite, bas]`. Une valeur numérique de largeur est fixe et exprimée en points ; `'auto'` suit le contenu ; `'*'` partage l’espace restant avec les autres colonnes étoilées. Commencez par des largeurs fixes ou étoilées, puis utilisez le dimensionnement selon le contenu lorsqu’il répond à un besoin réel.

## Poursuivre avec la référence

[Styles](/docs/0.3/fr/document-definition-object/styling/) · [Tableaux](/docs/0.3/fr/document-definition-object/tables/) · [Images](/docs/0.3/fr/document-definition-object/images/) · [Mise en page](/docs/0.3/fr/document-definition-object/page/)
