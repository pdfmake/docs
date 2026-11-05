+++
sourceDigest = "b2ba3194ddd7e242d62cb3a7054acd7402e4df0be31235ee864d76b98c814a69"
title = "Versiones de Node.js compatibles"
description = "Consulta el requisito de versión del paquete y la matriz de entornos de integración continua para pdfmake 0.3."
weight = 11
+++

## Requisito de versión

El paquete 0.3.13 declara **Node.js >=20** en `package.json`. La matriz de CI propuesta incluye Node.js 20, 22, 24 y 26 en Linux, Windows y macOS. La cobertura de compatibilidad es independiente del soporte de seguridad de Node.js upstream.

Para producción, usa una versión de Node.js que siga en mantenimiento. Consulta el [calendario oficial de versiones de Node.js](https://github.com/nodejs/Release#release-schedule) antes de elegir el entorno de ejecución. Prueba tus fuentes, recursos y carga de documentos en la versión exacta que vas a desplegar.
