+++
title = "Unterstützte Browser"
description = "Prüfe die Browserkompatibilität sowie Einschränkungen der Hilfsfunktionen zum Öffnen, Drucken und Herunterladen."
weight = 11
alwaysopen = true
sourceDigest = "3ea8d830019ccfb8321db6f8c7fe9d40ba017ac0b435e042cefefa32be20db66"
+++

* Edge
* Firefox
* Chrome
* Chrome (Android)
* Opera
* Safari (iOS)
* Safari (iOS) iPhone

{{% panel theme="warning" header="Einschränkungen" %}}Die Methoden **`open()`** und **`print()`** werden nur in folgenden Browsern unterstützt:

* Firefox
* Chrome
* Opera{{% /panel %}}

{{% alert theme="warning" %}}Browser-Erweiterungen können die Funktion von pdfmake beeinflussen (insbesondere `open()` und `print()`). Wenn pdfmake nicht funktioniert, deaktiviere testweise die Erweiterungen.{{% /alert %}}

{{% panel theme="danger" header="Problematische Erweiterungen" %}}AdBlock{{% /panel %}}

Die vollständige Beschreibung findest du im [Issue](https://github.com/bpampuch/pdfmake/issues/800).
