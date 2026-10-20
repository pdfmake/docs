# Performances et mémoire

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/guides/performance/

## Mesurer votre charge de travail

Évaluez des documents représentatifs avec la même version de Node, les mêmes polices et les mêmes données d’entrée. Notez la latence médiane et de queue, la mémoire maximale, le nombre de pages et la taille de sortie. Séparez le démarrage à froid et le chargement des polices des rendus répétés. Comparez distinctement les documents contenant de nombreux tableaux, de longs textes ou beaucoup d’images.

**JavaScript**

```js
const start = performance.now();
const bytes = await pdfmake.createPdf(makeFreshDefinition()).getBuffer();
console.log({ milliseconds: performance.now() - start, bytes: bytes.length });
```

**TypeScript**

```ts
const start = performance.now();
const bytes = await pdfmake.createPdf(makeFreshDefinition()).getBuffer();
console.log({ milliseconds: performance.now() - start, bytes: bytes.length });
```

`makeFreshDefinition()` est votre propre fonction de création. Ne réutilisez pas une définition déjà modifiée par la mise en page. Vérifiez aussi le texte, le nombre de pages et des pages rendues représentatives, pas seulement la vitesse.

## Réduire le travail évitable

- Placez les images répétées dans le dictionnaire `images` et référencez-les par leur clé. Redimensionnez les sources volumineuses avant de les intégrer ; les dimensions d’affichage ne réduisent pas leur charge utile.
- Préférez des largeurs fixes si votre mise en page le permet. Les largeurs `auto` calculées selon le contenu nécessitent la mesure du texte ; mesurez les performances avant de remanier les tableaux.
- Enregistrez les polices une fois. Dans les applications navigateur, ne livrez que les familles et variantes nécessaires.
- Laissez `fontLayoutCache` activé sauf si un problème de compatibilité constaté impose de le désactiver. Consultez les [options de rendu](/docs/0.3/fr/options/).
- Évitez base64 si votre API peut renvoyer les octets PDF binaires. Base64 représente trois octets par quatre caractères et alloue également une chaîne.
- Utilisez `write()` ou consommez directement le flux pour éviter le Buffer concaténé supplémentaire créé par `getBuffer()` si vous avez uniquement besoin d’un fichier ou d’un flux. La mise en page a toutefois lieu avant la consommation de la sortie.

## Maîtriser la concurrence

Un plus grand nombre de tâches PDF simultanées peut augmenter la mémoire utilisée et le délai de la boucle d’événements. Limitez les rendus concurrents et testez le débit au lieu de mesurer seulement une requête. Utilisez des threads worker ou des processus séparés si le travail bloquant affecte la réactivité de l’API. Gardez la configuration mutable du singleton hors du code exécuté pour chaque requête.

## Benchmark de développement de la bibliothèque

La branche d’amélioration de la bibliothèque comprend `npm run benchmark:text`, à exécuter après `npm run build:node`. Le benchmark compare l’aplatissement de tableaux de texte à l’algorithme précédent avec des entrées mixtes déterministes et vérifie l’équivalence des résultats. La boucle optimisée évite de recopier les préfixes à répétition. Son gain de vitesse concerne uniquement cet utilitaire ; il ne porte pas sur la durée totale de génération PDF.

Les seuils de temps sont volontairement exclus de l’intégration continue, car les exécuteurs partagés produisent des mesures variables. Utilisez les tests de correction comme critères de validation et conservez les résultats du benchmark avec les détails de l’environnement pour la revue.
