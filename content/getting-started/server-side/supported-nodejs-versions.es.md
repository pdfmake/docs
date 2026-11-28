+++
sourceDigest = "f4c2a68e78a87bb4e9aaab5680632a3bd23ed11ffce20ae002258442874d3b24"
title = "Versiones de Node.js compatibles"
description = "Consulta el requisito de versión del paquete y la matriz de entornos de integración continua para pdfmake 0.3."
weight = 11
+++

## Requisito de versión

El paquete 0.3.15 declara **Node.js >=20.19.0** en `package.json`. La matriz de CI propuesta incluye Node.js 20, 22, 24 y 26 en Linux, Windows y macOS. La cobertura de compatibilidad es independiente del soporte de seguridad de Node.js upstream.

Para producción, usa una versión de Node.js que siga en mantenimiento. Consulta el [calendario oficial de versiones de Node.js](https://github.com/nodejs/Release#release-schedule) antes de elegir el entorno de ejecución. Prueba tus fuentes, recursos y carga de documentos en la versión exacta que vas a desplegar.
