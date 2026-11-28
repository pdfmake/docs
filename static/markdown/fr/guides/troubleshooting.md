# Dépannage

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/guides/troubleshooting/

## Vérifier la version et l’environnement d’exécution

Exécutez `npm ls pdfmake` et comparez votre import au guide de démarrage adapté. Un bundle de navigateur et le point d’entrée Node proposent des fonctions de sortie différentes. Les exemples 0.1/0.2 utilisant `new PdfPrinter(...)` ou des callbacks ne décrivent pas l’API 0.3.

| Symptôme | Vérification | Correction |
| --- | --- | --- |
| Famille ou variante de police non définie | Nom de la famille, correspondance gras/italique, police par défaut | Enregistrez toutes les variantes utilisées et sélectionnez la famille dans `defaultStyle` |
| Fichier introuvable ou accès refusé | Chemin réel de la police ou de l’image et règle d’accès | Utilisez des chemins existants gérés par l’application et une règle synchrone correspondante |
| Glyphes manquants ou incorrects | Couverture de glyphes de la police sélectionnée | Incorporez une police couvrant la langue ; testez aussi le gras et l’italique |
| Tableau vide ou mal formé | `body`, longueurs des lignes et cellules fusionnées | Fournissez des lignes non vides de longueur cohérente et des espaces réservés pour les cellules fusionnées |
| `download` n’est pas une fonction dans Node | Environnement importé | Utilisez `write` ou `getBuffer` avec le point d’entrée Node |
| Aucune fenêtre ne s’ouvre dans le navigateur | Geste utilisateur et bloqueur de fenêtres contextuelles | Ouvrez une fenêtre directement au clic, avant le chargement asynchrone des données |
| URL refusée malgré une fonction d’autorisation | Type de valeur de retour | Renvoyez le booléen littéral `true` de manière synchrone ; supprimez `async` |
| Échec de la requête HTTP d’une image | URL, règle, CORS, statut et redirections | Vérifiez l’accès dans l’environnement cible ; les navigateurs appliquent CORS |
| Fichier incomplet ou manquant | Promise rejetée et erreurs d’écriture | Attendez `write()` et gérez son rejet avant d’annoncer la réussite |
| La sortie change après une mise à niveau | Version, polices, entrées et valeurs par défaut | Reproduisez avec une version épinglée et comparez le texte extrait, le nombre de pages et les pages rendues |

## Réduire la définition

Commencez par un paragraphe simple et des polices connues comme fonctionnelles. Ajoutez les styles, les lignes de tableau et les ressources un par un. Créez une définition neuve à chaque tentative. Distinguez les erreurs de requête et de ressource des erreurs de mise en page.

## Signaler un bogue utile

Indiquez les versions exactes de pdfmake et de Node ou du navigateur, le système d’exploitation, une définition minimale exécutable, la configuration des polices, le comportement attendu et le comportement observé, ainsi que la trace complète pertinente. Supprimez le contenu privé et les secrets. Pour les défauts de pagination, fournissez le plus petit exemple qui reproduit encore le saut de page.
