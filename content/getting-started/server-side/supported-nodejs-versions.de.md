+++
title = "Unterstützte Node.js-Versionen"
description = "Prüfe die Laufzeitanforderung des Pakets und die CI-Laufzeitmatrix für pdfmake 0.3."
weight = 11
sourceDigest = "a3773119140b35aeeb52b0f988b7fbc41e35370ef21c63bcb1f6d8de8683380d"
+++

## Laufzeitanforderung

Das Paket 0.3.12 gibt in `package.json` **Node.js >=20** als Mindestversion an. Die vorgeschlagene CI-Matrix umfasst Node.js 20, 22 und 24 unter Linux, Windows und macOS. Diese Kompatibilitätstests sind unabhängig vom Sicherheits-Support der Node.js-Versionen.

Verwende in der Produktion eine Node.js-Version, die noch gewartet wird. Sieh im [offiziellen Veröffentlichungsplan von Node.js](https://github.com/nodejs/Release#release-schedule) nach, bevor du eine Laufzeit auswählst. Teste deine Schriften, Ressourcen und Dokumentlast mit genau der Version, die du bereitstellst.
