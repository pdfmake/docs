+++
title = "Unterstützte Node.js-Versionen"
description = "Prüfe die Laufzeitanforderung des Pakets und die CI-Laufzeitmatrix für pdfmake 0.3."
weight = 11
sourceDigest = "b2ba3194ddd7e242d62cb3a7054acd7402e4df0be31235ee864d76b98c814a69"
+++

## Laufzeitanforderung

Das Paket 0.3.13 gibt in `package.json` **Node.js >=20** als Mindestversion an. Die vorgeschlagene CI-Matrix umfasst Node.js 20, 22, 24 und 26 unter Linux, Windows und macOS. Diese Kompatibilitätstests sind unabhängig vom Sicherheits-Support der Node.js-Versionen.

Verwende in der Produktion eine Node.js-Version, die noch gewartet wird. Sieh im [offiziellen Veröffentlichungsplan von Node.js](https://github.com/nodejs/Release#release-schedule) nach, bevor du eine Laufzeit auswählst. Teste deine Schriften, Ressourcen und Dokumentlast mit genau der Version, die du bereitstellst.
