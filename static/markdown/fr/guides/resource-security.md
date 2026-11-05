# Sécurité des ressources

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/guides/resource-security/

## Traiter les définitions comme du code applicatif

Une définition peut contenir des fonctions de rappel pour les en-têtes, les pieds de page, les mises en page de tableaux et les sauts de page. N’exécutez jamais le JavaScript fourni par un appelant non fiable. Acceptez des données d’application validées et construisez vous-même les définitions. Avant le rendu, limitez la taille des entrées, leur profondeur d’imbrication, les dimensions des tableaux et la taille des images.

## Refuser les ressources inutiles

Si toutes les ressources sont fournies sous forme de données en mémoire, refusez les chemins de ressources sous forme de chaînes :

**JavaScript**

```js
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(() => false);
```

**TypeScript**

```ts
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(() => false);
```

L’implémentation actuelle transmet également les identifiants des polices standard (par exemple `Helvetica-Bold`) à la règle locale. Si vous utilisez les polices standard, autorisez leurs identifiants exacts enregistrés ; le [guide de démarrage Node](/docs/0.3/fr/getting-started/server-side/) montre cette configuration.

Les règles d’accès URL nécessitent **0.3.6+** et les règles locales **0.3.8+**. Configurez-les avant d’accepter des tâches. Une règle non définie autorise le chargement de ressources ; elle ne signifie pas « tout refuser ».

## Utiliser des règles synchrones

L’implémentation vérifie `callback(value) === true`. N’utilisez pas de fonctions de rappel `async`, de requêtes DNS ou de Promises dans ces règles. Si la validation exige un traitement asynchrone, récupérez les ressources approuvées dans votre application, puis transmettez les données intégrées ou un fichier géré par l’application.

**JavaScript**

```js
pdfmake.setUrlAccessPolicy(value => {
  const url = new URL(value);
  return url.protocol === 'https:' && url.hostname === 'assets.example.com' && !url.username && !url.password;
});
```

**TypeScript**

```ts
pdfmake.setUrlAccessPolicy(value => {
  const url = new URL(value);
  return url.protocol === 'https:' && url.hostname === 'assets.example.com' && !url.username && !url.password;
});
```

Cet exemple de nom d’hôte ne constitue pas une protection complète contre les attaques SSRF. Les changements DNS, les redirections, les plages d’adresses internes et les autorisations réseau du déploiement comptent également. Appliquez des contrôles réseau sortants. Sous Node.js, le résolveur vérifie chaque étape des redirections manuelles. Les navigateurs peuvent suivre des redirections avant de vérifier la règle sur l’URL finale ; les règles du navigateur ne peuvent pas contrôler chaque étape réseau.

## Fichiers locaux

Autorisez des chemins résolus exacts appartenant à l’application. Consultez la [configuration des polices](/docs/0.3/fr/fonts/) pour un exemple de liste d’autorisation fonctionnelle. Évitez `startsWith('fonts/')`, qui ne résout ni les traversées de répertoires ni les alias du système de fichiers. Protégez les fichiers autorisés contre le remplacement et tenez compte des liens symboliques. Ne laissez pas un appelant choisir des chemins arbitraires du serveur.

## Limiter la charge

La mise en page et le traitement des polices peuvent consommer processeur et mémoire avant qu’un flux de sortie soit disponible. Utilisez des files d’attente limitées et des workers isolés pour les documents volumineux ou non fiables. Un délai sur une Promise n’interrompt pas à lui seul la mise en page synchrone. Ajoutez des limites au niveau du processus si une annulation ferme est nécessaire.

## Le chiffrement PDF est distinct

Les [mots de passe et autorisations PDF](/docs/0.3/fr/document-definition-object/security/) s’appliquent au document produit. Ils ne sécurisent ni le réseau ni le système de fichiers de votre serveur, et n’encadrent pas l’exécution des fonctions de rappel.
