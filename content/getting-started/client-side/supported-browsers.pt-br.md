+++
title = "Navegadores compatíveis"
description = "Consulte a compatibilidade dos navegadores e as limitações dos métodos para abrir, imprimir e baixar PDFs."
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

{{% panel theme="warning" header="Limitações" %}}Os métodos **`open()`** e **`print()`** são compatíveis apenas com:

* Firefox
* Chrome
* Opera{{% /panel %}}

{{% alert theme="warning" %}}As extensões instaladas no navegador podem afetar o funcionamento do pdfmake (especialmente `open()` e `print()`). Se o pdfmake não funcionar, tente desativar as extensões do navegador.{{% /alert %}}

{{% panel theme="danger" header="Extensão problemática" %}}AdBlock{{% /panel %}}

A descrição completa está disponível nesta [issue](https://github.com/bpampuch/pdfmake/issues/800).
