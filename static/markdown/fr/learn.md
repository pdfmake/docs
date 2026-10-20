# Commencer ici

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/learn/

## Commencer par un document fonctionnel

Vous n’avez pas besoin de connaître toute la référence du document dès le départ. Suivez ces trois étapes :



- [1. Créer votre premier PDF](/docs/0.3/fr/learn/first-pdf/): Comprenez la définition, chargez les polices et exécutez un exemple complet.


- [2. Comprendre le modèle de document](/docs/0.3/fr/learn/document-model/): Apprenez quand utiliser un paragraphe, du texte en ligne, une pile, des colonnes ou un tableau.


- [3. Lire les erreurs et corriger le bon élément](/docs/0.3/fr/guides/errors/): Distinguez la syntaxe JavaScript, la structure du document, les ressources et la sortie.



## De quel environnement ai-je besoin ?

| Choisir | Quand | Sortie |
| --- | --- | --- |
| [Node.js](/docs/0.3/fr/getting-started/server-side/) | Votre API ou tâche en arrière-plan crée le fichier | `write()` pour les fichiers ; `getBuffer()` pour les réponses HTTP |
| [Navigateur](/docs/0.3/fr/getting-started/client-side/) | L’utilisateur crée le document sur son appareil | `download()`, `open()`, `print()` ou `getBlob()` |

La définition de document est commune. Le chargement des polices et les méthodes de sortie dépendent de l’environnement d’exécution. Ces pages concernent **0.3.x** ; les anciens exemples utilisant `new PdfPrinter(...)` et des sorties par callback se rapportent à [0.1/0.2](/docs/0.3/fr/migration-from-0.1/).

## Apprendre en observant le résultat

Les exemples de ce parcours montrent la définition JavaScript exacte à côté d’un PDF réellement généré. Ouvrez-les dans le playground pour les modifier. Leur source complète figure également dans le [corpus Markdown](/docs/0.3/fr/llms-full.txt), y compris le code qui serait autrement généré par les composants d’exemples interactifs.
