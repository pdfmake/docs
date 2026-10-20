# Erreurs et diagnostics

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/guides/errors/

## Identifier d’abord l’étape en échec

Une définition non valide doit provoquer une erreur, plutôt que d’omettre du contenu sans avertissement. Il faut déterminer où l’échec s’est produit et comment cette erreur remonte dans votre application.

| Étape | Échec courant | Où le corriger |
| --- | --- | --- |
| Analyse JavaScript | Virgule, guillemet ou accolade fermante manquante | Éditeur de code ; la bibliothèque n’a pas encore été appelée |
| Exécution de la définition | `ReferenceError` ou échec d’une fonction de rappel | Code de l’application qui construit la définition |
| Structure du document | Type de nœud mal orthographié, lignes de tableau ou liste non valides | Chemin de définition signalé |
| Chargement des ressources | Police manquante, URL refusée, image illisible | Enregistrement des polices/ressources et règles d’accès |
| Mise en page/rendu | Contenu trop volumineux, dimensions non valides ou fonction de rappel en échec | Plus petite définition permettant de reproduire le problème |
| Sortie | Flux fermé, droits d’écriture ou échec de destination | Gestion des erreurs de buffer, flux ou fichier |

## Toujours attendre la sortie

**JavaScript**

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

**TypeScript**

```ts
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

Renvoyez l’erreur à l’appelant de l’API ou affichez `error.message` dans l’interface. Ne répondez pas avec un PDF vide et n’annoncez pas un succès après avoir ignoré le rejet. Évitez de journaliser le contenu du document ou les identifiants privés des ressources.

## Lire le chemin dans le document

La branche locale d’amélioration de la bibliothèque ajoute des diagnostics `PDFMAKE_INVALID_DOCUMENT` avec `phase: 'preprocess'` et une propriété `path`. Par exemple :

```text
Unrecognized document structure: ...
Document path: content[0].columns[0].ul[1]
```

Ce chemin désigne le deuxième élément de liste dans la première colonne du premier nœud du corps. Cherchez une faute telle que `{ txt: 'Hello' }` à la place de `{ text: 'Hello' }`. Pour des lignes de tableau mal formées, le diagnostic indique la ligne et le nombre de cellules attendu. Les tableaux vides précisent que `table.body` doit contenir des tableaux de lignes non vides. Conservez les objets `{}` de remplacement pour les cellules fusionnées. Le texte d’erreur existant est maintenu ; lorsque les champs de diagnostic sont disponibles, les appelants doivent les utiliser au lieu d’analyser les chaînes de message.

Ces diagnostics structurés sont **nouveaux dans la branche locale d’amélioration** ; le paquet publié 0.3.12 ne les contient pas encore. Les erreurs génériques comportent toujours un message. La branche rejette également les flux de buffer fermés prématurément au lieu de laisser leur Promise en attente.

## Erreurs de syntaxe dans le playground

L’éditeur analyse la définition avant son exécution, marque l’emplacement fautif et affiche la ligne et la colonne. **Aller à l’erreur dans l’éditeur** place le curseur à cet endroit. L’annulation/restauration et le panneau d’erreurs permettent de corriger le problème sans perdre le travail. Avec l’aperçu en direct, le dernier PDF généré avec succès reste visible pendant les modifications et les échecs, mais son téléchargement est désactivé s’il ne correspond plus au code actuel.

## Réduire les échecs difficiles à diagnostiquer

Conservez les mêmes polices et le même environnement d’exécution. Remplacez le corps par un seul paragraphe, puis réajoutez les blocs jusqu’à ce que le problème réapparaisse. Pour les tableaux, vérifiez les longueurs des lignes et les fusions avant d’ajuster les largeurs. En cas d’échec lié aux ressources, commencez par une police locale connue et une image intégrée. Consultez [Dépannage](/docs/0.3/fr/guides/troubleshooting/) pour découvrir d’autres symptômes.

## Valider la d�finition compl�te avant le rendu

L�API locale non publi�e `validateDocument(input, options)` v�rifie toutes les propri�t�s d�clar�es du document et rassemble plusieurs erreurs avec leurs chemins. Elle contr�le aussi les tableaux, les cellules fusionn�es, les r�f�rences, les plages num�riques et les cycles. Elle ne modifie pas l�entr�e, n�ex�cute aucun callback et n�acc�de � aucune ressource. Les propri�t�s inconnues produisent des avertissements ; `strict: true` les transforme en erreurs.

**JavaScript**

```js
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

**TypeScript**

```ts
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

Le r�sultat contient `valid`, `errors`, `warnings`, `deferred` et `truncated`. Chaque diagnostic contient `path`, `code`, `severity` et `message`. Limites par d�faut : 100 diagnostics, 100 niveaux et 50 000 valeurs inspect�es. Une limite atteinte ne donne jamais un r�sultat valide. Les r�sultats des callbacks, la disponibilit� et le d�codage des ressources ainsi que la mise en page finale restent v�rifi�s pendant le rendu. Le code JavaScript doit d�j� �tre syntaxiquement valide pour appeler cette API objet.

Passez `{ validation: true }` comme deuxi�me argument � `createPdf` pour rejeter une d�finition incorrecte avant de charger les ressources. Le document invalide l�ve un `DocumentValidationError` avec `code: "PDFMAKE_VALIDATION_ERROR"`, `phase: "validation"` et un tableau `diagnostics`. Les appels existants restent compatibles ; cette v�rification pr�alable est facultative. Le playground local l�ex�cute automatiquement avec la biblioth�que am�lior�e.
