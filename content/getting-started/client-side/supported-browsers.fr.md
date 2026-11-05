+++
title = "Navigateurs pris en charge"
description = "Vérifiez la compatibilité des navigateurs et les limites des fonctions d’ouverture, d’impression et de téléchargement."
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

{{% panel theme="warning" header="Limitations" %}}Les méthodes **`open()`** et **`print()`** ne sont prises en charge que dans :

* Firefox
* Chrome
* Opera{{% /panel %}}

{{% alert theme="warning" %}}Les extensions de navigateur peuvent affecter le fonctionnement de pdfmake (en particulier `open()` et `print()`). Si pdfmake ne fonctionne pas, essayez de désactiver les extensions du navigateur.{{% /alert %}}

{{% panel theme="danger" header="Extensions problématiques" %}}AdBlock{{% /panel %}}

La description complète est disponible dans cette [issue](https://github.com/bpampuch/pdfmake/issues/800).
