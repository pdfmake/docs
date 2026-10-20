+++
title = "Versions de Node.js prises en charge"
description = "Vérifiez la version minimale requise par le paquet et la matrice d’exécution d’intégration continue de pdfmake 0.3."
weight = 11
sourceDigest = "a3773119140b35aeeb52b0f988b7fbc41e35370ef21c63bcb1f6d8de8683380d"
+++

## Version minimale requise

Le paquet 0.3.12 déclare **Node.js >=20** dans `package.json`. La matrice CI proposée couvre Node.js 20, 22 et 24 sous Linux, Windows et macOS. La couverture de compatibilité est distincte de la prise en charge de sécurité de Node.js en amont.

En production, utilisez une version de Node.js encore maintenue. Consultez le [calendrier officiel des versions de Node.js](https://github.com/nodejs/Release#release-schedule) avant de choisir votre environnement. Testez vos polices, vos ressources et votre charge de génération sur la version exacte que vous déployez.
