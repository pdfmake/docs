+++
title = "Supported browsers"
description = ""
weight = 11
alwaysopen = true
+++

* Internet Explorer 11
* Edge 12+
* Firefox
* Chrome
* Chrome (Android)
* Opera
* Safari (iOS)
* Safari (iOS) iPhone

{{% alert theme="warning" %}}Internet Explorer 10 supports only version 0.1.x.{{% /alert %}}

{{% panel theme="warning" header="Limitations" %}}Methods **`open()`** and **`print()`** are supported only in:

* Firefox
* Chrome
* Opera{{% /panel %}}

{{% alert theme="warning" %}}Add-ons used in browsers can affect the functionality of pdfmake (especially for `open()` and `print()`). If pdfmake is not working try disable add-ons in browser.{{% /alert %}}

{{% panel theme="danger" header="Problematic add-ons" %}}AdBlock{{% /panel %}}

Fully description is available in [issue](https://github.com/bpampuch/pdfmake/issues/800).