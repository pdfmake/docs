+++
title = "Erreurs et diagnostics"
description = "RepÃ©rez les erreurs de syntaxe JavaScript, les nÅ“uds de document mal formÃ©s, les Ã©checs de ressources et les sorties interrompues Ã  lâ€™aide de diagnostics exploitables."
weight = 2
sourceDigest = "ff68daa138b7259216d53546c431739a03360e22b4e9749840a4eba20c38c633"
+++

## Identifier dâ€™abord lâ€™Ã©tape en Ã©chec

Une dÃ©finition non valide doit provoquer une erreur, plutÃ´t que dâ€™omettre du contenu sans avertissement. Il faut dÃ©terminer oÃ¹ lâ€™Ã©chec sâ€™est produit et comment cette erreur remonte dans votre application.

| Ã‰tape | Ã‰chec courant | OÃ¹ le corriger |
| --- | --- | --- |
| Analyse JavaScript | Virgule, guillemet ou accolade fermante manquante | Ã‰diteur de code ; la bibliothÃ¨que nâ€™a pas encore Ã©tÃ© appelÃ©e |
| ExÃ©cution de la dÃ©finition | `ReferenceError` ou Ã©chec dâ€™une fonction de rappel | Code de lâ€™application qui construit la dÃ©finition |
| Structure du document | Type de nÅ“ud mal orthographiÃ©, lignes de tableau ou liste non valides | Chemin de dÃ©finition signalÃ© |
| Chargement des ressources | Police manquante, URL refusÃ©e, image illisible | Enregistrement des polices/ressources et rÃ¨gles dâ€™accÃ¨s |
| Mise en page/rendu | Contenu trop volumineux, dimensions non valides ou fonction de rappel en Ã©chec | Plus petite dÃ©finition permettant de reproduire le problÃ¨me |
| Sortie | Flux fermÃ©, droits dâ€™Ã©criture ou Ã©chec de destination | Gestion des erreurs de buffer, flux ou fichier |

## Toujours attendre la sortie

```js
async function generateReport(pdfmake, definition) {
  try {
    return await pdfmake.createPdf(definition).getBuffer();
  } catch (error) {
    console.error('PDF generation failed', {
      message: error.message,
      code: error.code,
      phase: error.phase,
      path: error.path
    });
    throw error;
  }
}
```

Renvoyez lâ€™erreur Ã  lâ€™appelant de lâ€™API ou affichez `error.message` dans lâ€™interface. Ne rÃ©pondez pas avec un PDF vide et nâ€™annoncez pas un succÃ¨s aprÃ¨s avoir ignorÃ© le rejet. Ã‰vitez de journaliser le contenu du document ou les identifiants privÃ©s des ressources.

Depuis 0.3.13, `getStream()` rejette l’accès à un flux déjà consommé. Les méthodes basées sur un buffer réutilisent les octets mis en cache ; `write()` dans Node accepte aussi une sortie déjà lue avec `getBuffer()`, `getBase64()` ou `getDataUrl()`. Créez une nouvelle instance de sortie pour obtenir un nouveau flux brut.

## Lire le chemin dans le document

La branche locale dâ€™amÃ©lioration de la bibliothÃ¨que ajoute des diagnostics `PDFMAKE_INVALID_DOCUMENT` avec `phase: 'preprocess'` et une propriÃ©tÃ© `path`. Par exemple :

```text
Unrecognized document structure: ...
Document path: content[0].columns[0].ul[1]
```

Ce chemin dÃ©signe le deuxiÃ¨me Ã©lÃ©ment de liste dans la premiÃ¨re colonne du premier nÅ“ud du corps. Cherchez une faute telle que `{ txt: 'Hello' }` Ã  la place de `{ text: 'Hello' }`. Pour des lignes de tableau mal formÃ©es, le diagnostic indique la ligne et le nombre de cellules attendu. Les tableaux vides prÃ©cisent que `table.body` doit contenir des tableaux de lignes non vides. Conservez les objets `{}` de remplacement pour les cellules fusionnÃ©es. Le texte dâ€™erreur existant est maintenu ; lorsque les champs de diagnostic sont disponibles, les appelants doivent les utiliser au lieu dâ€™analyser les chaÃ®nes de message.

Ces diagnostics structurÃ©s sont **nouveaux dans la branche locale dâ€™amÃ©lioration** ; le paquet publiÃ© 0.3.13 ne les contient pas encore. Les erreurs gÃ©nÃ©riques comportent toujours un message. La branche rejette Ã©galement les flux de buffer fermÃ©s prÃ©maturÃ©ment au lieu de laisser leur Promise en attente.

## Erreurs de syntaxe dans le playground

Lâ€™Ã©diteur analyse la dÃ©finition avant son exÃ©cution, marque lâ€™emplacement fautif et affiche la ligne et la colonne. **Aller Ã  lâ€™erreur dans lâ€™Ã©diteur** place le curseur Ã  cet endroit. Lâ€™annulation/restauration et le panneau dâ€™erreurs permettent de corriger le problÃ¨me sans perdre le travail. Avec lâ€™aperÃ§u en direct, le dernier PDF gÃ©nÃ©rÃ© avec succÃ¨s reste visible pendant les modifications et les Ã©checs, mais son tÃ©lÃ©chargement est dÃ©sactivÃ© sâ€™il ne correspond plus au code actuel.

## RÃ©duire les Ã©checs difficiles Ã  diagnostiquer

Conservez les mÃªmes polices et le mÃªme environnement dâ€™exÃ©cution. Remplacez le corps par un seul paragraphe, puis rÃ©ajoutez les blocs jusquâ€™Ã  ce que le problÃ¨me rÃ©apparaisse. Pour les tableaux, vÃ©rifiez les longueurs des lignes et les fusions avant dâ€™ajuster les largeurs. En cas dâ€™Ã©chec liÃ© aux ressources, commencez par une police locale connue et une image intÃ©grÃ©e. Consultez [DÃ©pannage](/docs/0.3/fr/guides/troubleshooting/) pour dÃ©couvrir dâ€™autres symptÃ´mes.

## Valider la définition complète avant le rendu

L’API locale non publiée `validateDocument(input, options)` vérifie toutes les propriétés déclarées du document et rassemble plusieurs erreurs avec leurs chemins. Elle contrôle aussi les tableaux, les cellules fusionnées, les références, les plages numériques et les cycles. Elle ne modifie pas l’entrée, n’exécute aucun callback et n’accède à aucune ressource. Les propriétés inconnues produisent des avertissements ; `strict: true` les transforme en erreurs.

```js
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

Le résultat contient `valid`, `errors`, `warnings`, `deferred` et `truncated`. Chaque diagnostic contient `path`, `code`, `severity` et `message`. Limites par défaut : 100 diagnostics, 100 niveaux et 50 000 valeurs inspectées. Une limite atteinte ne donne jamais un résultat valide. Les résultats des callbacks, la disponibilité et le décodage des ressources ainsi que la mise en page finale restent vérifiés pendant le rendu. Le code JavaScript doit déjà être syntaxiquement valide pour appeler cette API objet.

Passez `{ validation: true }` comme deuxième argument à `createPdf` pour rejeter une définition incorrecte avant de charger les ressources. Le document invalide lève un `DocumentValidationError` avec `code: "PDFMAKE_VALIDATION_ERROR"`, `phase: "validation"` et un tableau `diagnostics`. Les appels existants restent compatibles ; cette vérification préalable est facultative. Le playground local l’exécute automatiquement avec la bibliothèque améliorée.
