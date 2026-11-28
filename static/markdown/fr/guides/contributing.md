# Contribuer et architecture du code source

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/guides/contributing/

## Plan du code source

La bibliothèque et ce site sont hébergés dans des dépôts distincts :

- [bpampuch/pdfmake](https://github.com/bpampuch/pdfmake) : moteur, bundles, tests et exemples.
- [pdfmake/docs](https://github.com/pdfmake/docs) : ce site de documentation versionné et ses outils.

Le point d’entrée Node de la bibliothèque est `src/index.js` ; la configuration commune se trouve dans `src/base.js`. L’intégration navigateur se trouve dans `src/browser-extensions/`. `Printer` prépare les ressources et crée la sortie PDFKit. `DocPreprocessor` normalise les nœuds, `DocMeasure` et `TextInlines` les mesurent, `LayoutBuilder` et `TableProcessor` gèrent la pagination, et `Renderer` écrit les instructions de dessin PDFKit.

## Valider les changements du moteur

```sh
npm ci
npm test
npm run build:examples
npm run test:package
```

`npm test` construit les artefacts Node et navigateur générés, puis exécute Mocha et ESLint. Les tests unitaires importent le dossier compilé `js/` : reconstruisez-le après toute modification de `src/`. Ne modifiez pas directement `js/` ou `build/`. Le nouveau test de fumée du paquet installe l’archive réelle dans un consommateur temporaire avec les dépendances de production, puis teste la sortie Node et les deux bundles navigateur. Il ne remplace pas les tests dans de vrais navigateurs.

Lors d’une optimisation, préservez le texte, les métriques de police, l’héritage des styles et la pagination. Ajoutez un test de régression pour le cas limite et, si possible, une comparaison avec le comportement précédent. Gardez les benchmarks de performance séparés des contrôles de correction.

## Valider les changements de documentation

Utilisez Node >=24.11 et Hugo **0.168.0**. Depuis ce dépôt :

```sh
npm ci
npm run docs:generate
npm test
npm run build
npm run dev
```

Ouvrez l’adresse affichée par Hugo. La génération produit l’index de recherche du site, les exports Markdown et le corpus MCP depuis `content/`. Les tests vérifient les métadonnées, les exemples et le comportement MCP. La compilation vérifie les liens internes générés et les fragments de destination. Commitez les sorties régénérées avec les modifications sources afin que les clients puissent utiliser le corpus sans installer Hugo.

## Versions

La bibliothèque conserve son déclencheur GitHub Release en amont. Le workflow proposé vérifie la correspondance entre l’étiquette et la version, construit, teste, génère les exemples, teste un consommateur du paquet puis publie cette même archive avec provenance. Les tests locaux ne publient rien dans le registre.

Le workflow de documentation construit et téléverse un artefact de revue pour les pushes et les demandes de fusion ; il ne remplace pas le site de production versionné. Toute modification du mécanisme existant de publication multi-version du site doit être coordonnée avec les responsables du dépôt.
