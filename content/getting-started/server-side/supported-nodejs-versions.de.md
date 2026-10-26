+++
title = "Unterstützte Node.js-Versionen"
description = "Prüfe die Laufzeitanforderung des Pakets und die CI-Laufzeitmatrix für pdfmake 0.3."
weight = 11
sourceDigest = "16cebaa83ef298cf564edac58e4bb046a96e29d8d0b06c7d858ef19db881d2b7"
+++

## Laufzeitanforderung

Das Paket 0.3.13 gibt in `package.json` **Node.js >=20** als Mindestversion an. Die vorgeschlagene CI-Matrix umfasst Node.js 20, 22 und 24 unter Linux, Windows und macOS. Diese Kompatibilitätstests sind unabhängig vom Sicherheits-Support der Node.js-Versionen.

Verwende in der Produktion eine Node.js-Version, die noch gewartet wird. Sieh im [offiziellen Veröffentlichungsplan von Node.js](https://github.com/nodejs/Release#release-schedule) nach, bevor du eine Laufzeit auswählst. Teste deine Schriften, Ressourcen und Dokumentlast mit genau der Version, die du bereitstellst.
