+++
title = "Versions de Node.js prises en charge"
description = "Vérifiez la version minimale requise par le paquet et la matrice d’exécution d’intégration continue de pdfmake 0.3."
weight = 11
sourceDigest = "f4c2a68e78a87bb4e9aaab5680632a3bd23ed11ffce20ae002258442874d3b24"
+++

## Version minimale requise

Le paquet 0.3.15 déclare **Node.js >=20.19.0** dans `package.json`. La matrice CI proposée couvre Node.js 20, 22, 24 et 26 sous Linux, Windows et macOS. La couverture de compatibilité est distincte de la prise en charge de sécurité de Node.js en amont.

En production, utilisez une version de Node.js encore maintenue. Consultez le [calendrier officiel des versions de Node.js](https://github.com/nodejs/Release#release-schedule) avant de choisir votre environnement. Testez vos polices, vos ressources et votre charge de génération sur la version exacte que vous déployez.
