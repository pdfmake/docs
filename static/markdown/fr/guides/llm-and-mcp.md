# Intégration LLM et MCP

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/guides/llm-and-mcp/

## Utiliser la documentation sans MCP

Chaque page est disponible en Markdown généré. La même source produit :

- [llms.txt](/docs/0.3/fr/llms.txt) : index des pages avec descriptions et liens Markdown.
- [llms-full.txt](/docs/0.3/fr/llms-full.txt) : corpus Markdown versionné complet.
- [docs-index.json](/docs/0.3/fr/docs-index.json) : identifiants, titres, descriptions, URL sources et Markdown complet des pages.

Ces fichiers facilitent la découverte ; ils ne garantissent ni l’indexation par un moteur de recherche ni celle par un modèle. Indiquez dans votre prompt la version de la bibliothèque installée. Demandez au modèle de citer la page et d’utiliser les méthodes de sortie basées sur Promise. Le fichier `AGENTS.md` de la bibliothèque explique le pipeline source et les commandes de test destinées aux agents de programmation.

## Exécuter le serveur MCP local

Clonez le dépôt de documentation, installez ses dépendances, générez le corpus et démarrez le serveur :

```sh
git clone https://github.com/pdfmake/docs.git
cd docs
npm ci
npm run docs:generate
node mcp/server.mjs
```

Ce serveur fait partie de la branche d’amélioration locale jusqu’à son acceptation en amont. Démarrez-le au moyen de la configuration stdio de votre client MCP, en utilisant des chemins absolus :

```json
{
  "mcpServers": {
    "pdfmake-docs": {
      "command": "node",
      "args": ["/absolute/path/to/docs/mcp/server.mjs"]
    }
  }
}
```

Remplacez le chemin d’exemple par celui de votre clone. Dans un JSON Windows, utilisez `/` ou échappez les antislashs avec `\\`. L’emplacement de la configuration dépend du client. Le serveur écrit les messages du protocole sur stdout et les erreurs sur stderr. Après l’installation des dépendances, aucune clé API, aucun compte de modèle ni connexion réseau n’est nécessaire.

## Outils et ressources

| Capacité | Entrée | Résultat |
| --- | --- | --- |
| `search_docs` | `query`, `limit` facultatif (1–10), `language` facultatif | Pages classées avec identifiants exacts, langue, version, URL sources et extraits |
| `get_doc` | `id` exact issu de la recherche | Page Markdown complète |
| Ressources MCP | `pdfmake://docs/0.3/<id>` | Même page Markdown versionnée |

Le serveur ne peut lire que son corpus de documentation intégré. Il ne peut pas générer de PDF, exécuter du code d’exemple, lire des chemins du système de fichiers choisis par l’appelant ni parcourir des URL distantes. Régénérez le corpus et redémarrez le serveur après toute modification de la documentation.

`language` accepte `en` (par défaut), `de`, `fr`, `es` et `pt-br`. Chaque langue prise en charge contient le même ensemble complet de pages de documentation. La recherche ne mélange jamais silencieusement les langues. Un identifiant traduit, tel que `de/learn/first-pdf`, peut être lu avec `get_doc` ou la ressource `pdfmake://docs/0.3/de/learn/first-pdf`. Chaque langue possède également ses propres fichiers de découverte, par exemple `/docs/0.3/de/llms.txt` et `/docs/0.3/de/llms-full.txt`.

## Exemple de prompt

> J’utilise pdfmake 0.3.x dans Node.js. Consulte la documentation correspondant à cette version avant de générer du code. Utilise l’API singleton Node, enregistre les polices, configure des politiques de ressources synchrones, attends la sortie et cite les identifiants des pages utilisées. Crée une nouvelle définition de document pour chaque requête.
