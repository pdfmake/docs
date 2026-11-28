# Guide du playground

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/guides/playground/

## Apprendre en modifiant le code

Ouvrez le [playground](/docs/0.3/fr/playground/), choisissez un exemple et modifiez la définition dans le panneau de gauche. Le panneau de droite affiche un véritable PDF rendu avec PDF.js. Lorsque l’aperçu en direct est activé, le PDF se met automatiquement à jour après vos modifications. Sélectionnez **Run** ou appuyez sur **Ctrl/Commande + Entrée** pour lancer immédiatement le rendu.

L’éditeur CodeMirror 6 propose la coloration syntaxique, les numéros de ligne, l’appariement des parenthèses, l’indentation, les boutons Undo/Redo, un historique d’annulation conservé et des diagnostics de syntaxe indiquant la ligne et la colonne. **Go to error** place le curseur sur l’emplacement fautif. L’éditeur propose aussi des complétions. Utilisez **Ctrl + Espace** pour les afficher. Les noms de champs suggérés sont des indications ; la référence du document définit leur contexte, leur type et leurs valeurs valides.

## Exemples

| Exemple | Découverte |
| --- | --- |
| [Premier document](/docs/0.3/fr/playground/?example=welcome) | Texte, espacements et styles de police |
| [Facture](/docs/0.3/fr/playground/?example=invoice) | Tableau, totaux et pied de page avec numéro de page |
| [Tableaux](/docs/0.3/fr/playground/?example=tables) | En-têtes répétés sur plusieurs pages |
| [Styles de texte](/docs/0.3/fr/playground/?example=styles) | Styles nommés et remplacements en ligne |
| [Colonnes](/docs/0.3/fr/playground/?example=columns) | Blocs côte à côte et piles |
| [Fusions](/docs/0.3/fr/playground/?example=spans) | Fusions de lignes et colonnes avec cellules de remplacement |
| [Pages](/docs/0.3/fr/playground/?example=pages) | Sauts de page, en-têtes et pieds de page |
| [Vecteurs](/docs/0.3/fr/playground/?example=vectors) | SVG intégrés et codes QR |
| [Images](/docs/0.3/fr/playground/?example=images) | Données PNG intégrées réutilisées par nom |
| [Listes](/docs/0.3/fr/playground/?example=lists) | Éléments numérotés, puces et liens |

Le paramètre d’URL `example` sélectionne un exemple connu ; il n’accepte pas de JavaScript. L’aperçu en direct met aussi à jour les espaces de travail restaurés, les documents enregistrés et les fichiers importés. Désactivez **Live preview** avant d’importer du code que vous voulez examiner au préalable.

## Aperçu et sortie

Utilisez les flèches pour changer de page et le menu de zoom pour modifier l’échelle. **Page text** expose le texte extrait de la page PDF actuelle pour inspection et pour les technologies d’assistance. **Open PDF** ouvre le fichier généré séparément ; **Download PDF** enregistre les mêmes octets PDF. Le pied de page indique la durée de génération et la taille de sortie. La durée n’inclut pas le rendu de l’aperçu par PDF.js.

L’aperçu en direct attend 650 ms après la dernière modification, puis effectue le rendu dans un nouveau worker. L’ancien PDF reste visible jusqu’à ce que la page suivante ait fini son rendu hors écran ; le canevas est alors remplacé en une seule opération. La page PDF sélectionnée et le zoom sont conservés lorsque c’est possible. Le téléchargement est désactivé tant que le PDF visible ne correspond pas au code actuel. En cas d’erreur, le dernier aperçu réussi reste affiché au lieu d’être remplacé par un panneau vide.

## Conserver votre travail

**Export code** télécharge la définition actuelle au format JavaScript. **Import .js** lit un fichier local. Les fichiers sont limités à 500 Ko. Désactivez **Live preview** avant d’importer du code que vous souhaitez examiner avant son exécution. Une réinitialisation ou un changement d’exemple demande confirmation avant de remplacer vos modifications.

**L’espace de travail actuel est enregistré automatiquement en local**, avec la définition, la sélection de l’éditeur, l’historique d’annulation, l’exemple, la page et le zoom. Après rechargement, l’éditeur, son historique Undo/Redo et la préférence d’aperçu en direct sont restaurés. Si l’aperçu est activé, le PDF restauré est généré automatiquement et les modifications suivantes le mettent à jour sans cliquer sur Run. S’il est désactivé, le rendu reste manuel, même après rechargement.

Donnez un nom au document et choisissez **Save document** pour conserver une copie locale distincte. Un nouveau nom crée un autre document enregistré ; enregistrer sous le nom sélectionné le met à jour. Le menu des documents enregistrés restaure un document et son historique. Delete supprime cette copie nommée tout en conservant le contenu actuel de l’éditeur. Vous pouvez conserver jusqu’à 30 documents nommés. Les limites de stockage du navigateur s’appliquent toujours.

**Save draft locally** reste un instantané rapide distinct avec les commandes Restore/Clear. **Clear workspace autosave** supprime l’enregistrement automatique actuel et le suspend jusqu’à la prochaine saisie. Les documents nommés et les brouillons rapides sont distincts. Si le stockage du navigateur est désactivé ou plein, l’éditeur continue de fonctionner et l’export du code reste disponible. Cette application ne téléverse ni le code source ni les PDF.

## Limites du rendu

Chaque rendu démarre un nouveau worker de navigateur. **Cancel** l’arrête, y compris s’il est bloqué dans une boucle JavaScript. Une limite de dix secondes interrompt les traitements anormalement coûteux. Simplifiez les documents volumineux ou testez-les dans une application contrôlée lorsqu’ils dépassent la limite du playground. Ici, l’API PDF refuse l’accès aux ressources par URL distante ; utilisez des images intégrées et les polices Roboto fournies.

Le JavaScript personnalisé est du code utilisateur considéré comme fiable, et non une sandbox de sécurité. N’exécutez pas de code provenant d’une source inconnue. Un worker évite que l’interface ne se bloque, mais ne constitue pas une frontière d’isolation pour du code hostile. Consultez [Sécurité des ressources](/docs/0.3/fr/guides/resource-security/) pour les recommandations applicables aux API de production.

## Lancer l’outil autonome de développement

Depuis une copie de travail de la bibliothèque pdfmake déjà compilée, exécutez `npm run playground`. L’outil sert la même interface avec le moteur de cette copie à `http://127.0.0.1:1234/playground/`. Il requiert Node >=22.13 pour ses outils spécifiques. La version publiée de la bibliothèque continue d’exiger Node >=20 à l’exécution. Le site de documentation peut également prévisualiser un moteur local avec `PDFMAKE_SOURCE` ; consultez le README du dépôt de documentation.
