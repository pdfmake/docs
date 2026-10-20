+++
sourceDigest = "3ea8d830019ccfb8321db6f8c7fe9d40ba017ac0b435e042cefefa32be20db66"
title = "Navegadores compatibles"
description = "Consulta la compatibilidad de los navegadores y las limitaciones de las funciones para abrir, imprimir y descargar."
weight = 11
alwaysopen = true
+++

* Edge
* Firefox
* Chrome
* Chrome (Android)
* Opera
* Safari (iOS)
* Safari (iOS) iPhone

{{% panel theme="warning" header="Limitations" %}}Los métodos **`open()`** e **`print()`** solo son compatibles con:

* Firefox
* Chrome
* Opera{{% /panel %}}

{{% alert theme="warning" %}}Los complementos instalados en los navegadores pueden afectar al funcionamiento de pdfmake (especialmente a `open()` y `print()`). Si pdfmake no funciona, prueba a desactivar los complementos.{{% /alert %}}

{{% panel theme="danger" header="Problematic add-ons" %}}AdBlock{{% /panel %}}

La descripción completa está disponible en este [incidente](https://github.com/bpampuch/pdfmake/issues/800).
