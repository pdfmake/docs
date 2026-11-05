+++
title = "Votre premier PDF"
description = "Créez un document pdfmake 0.3 fonctionnel en cinq étapes simples, avec son code source et le PDF réellement généré."
weight = 1
sourceDigest = "cc22460fa895f9043a3b91fedd495c215fe7096cedc48fdf33cf5800f1a7ea7c"
+++

## 1. Comprendre les deux éléments nécessaires

pdfmake a besoin d’un **moteur avec des polices** et d’une **définition de document**. Cette définition est un objet JavaScript qui décrit ce qu’il faut imprimer. Ce n’est pas du HTML et elle ne dessine rien tant que vous ne la transmettez pas à `createPdf` et ne demandez pas une sortie.

Pour votre premier essai, utilisez dans le navigateur l’exemple ci-dessous. Le moteur et la police Roboto y sont déjà configurés. Suivez ensuite à l’étape 3 les instructions de configuration de votre environnement.

## 2. Examiner une définition complète

Le résultat ci-dessous est généré exactement à partir de ce code. Les trois éléments `content` deviennent trois blocs verticaux. Le texte revient automatiquement à la ligne ; les marges et tailles de police sont mesurées en points PDF (72 points = 1 pouce).

{{< example id="welcome" >}}

Modifiez le titre ou la taille de police dans le playground. Si l’aperçu en direct est activé, le PDF apparaît après une pause de saisie. Vous pouvez annuler des modifications, enregistrer des documents nommés dans le navigateur ou exporter un fichier JavaScript.

## 3. Configurer votre application

Choisissez **une** configuration. Ne combinez pas l’entrée Node avec des méthodes de sortie réservées au navigateur.

| Environnement | Configuration | Pourquoi les polices comptent |
| --- | --- | --- |
| API Node.js | [Démarrage rapide complet avec Node](/docs/0.3/fr/getting-started/server-side/) | Enregistrez des fichiers de police réels ou une famille standard avant le rendu |
| Application navigateur | [Démarrage rapide complet dans le navigateur](/docs/0.3/fr/getting-started/client-side/) | Chargez `pdfmake.min.js`, puis un VFS de polices, ou enregistrez-le dans votre bundler |

L’exemple utilise `Roboto`, la police par défaut du navigateur. Si vous l’utilisez avec la configuration Helvetica standard du guide Node, ajoutez `defaultStyle: { font: 'Helvetica' }` à la définition ou enregistrez les fichiers Roboto. Le texte Unicode exige également une police couvrant les caractères utilisés ; une chaîne valide ne fournit pas les glyphes manquants.

## 4. Demander une sortie et gérer les erreurs

Dans une application navigateur configurée :

```js
try {
  await pdfMake.createPdf(dd).download('first-document.pdf');
} catch (error) {
  document.querySelector('#status').textContent = error.message;
}
```

Ici, `dd` est la définition ci-dessus et `#status` est un élément de votre application. Dans Node.js, utilisez plutôt `await pdfmake.createPdf(dd).write('first-document.pdf')`. `createPdf` renvoie un objet de sortie ; la méthode de sortie renvoie la Promise à attendre. Sans `await` ou `.catch(...)`, un échec de génération peut ne jamais remonter jusqu’à votre interface.

## 5. Ajouter les notions une à une

Conservez le premier document fonctionnel. Ajoutez ensuite des [styles nommés](/docs/0.3/fr/document-definition-object/styling/), puis des [tableaux](/docs/0.3/fr/document-definition-object/tables/) lorsque vous avez besoin de lignes. Utilisez le [modèle de document](/docs/0.3/fr/learn/document-model/) pour choisir un type de nœud. En cas d’échec, [classez l’erreur](/docs/0.3/fr/guides/errors/) avant de modifier en même temps les polices, la mise en page et les ressources.
