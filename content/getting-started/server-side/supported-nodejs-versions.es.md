+++
sourceDigest = "16cebaa83ef298cf564edac58e4bb046a96e29d8d0b06c7d858ef19db881d2b7"
title = "Versiones de Node.js compatibles"
description = "Consulta el requisito de versión del paquete y la matriz de entornos de integración continua para pdfmake 0.3."
weight = 11
+++

## Requisito de versión

El paquete 0.3.13 declara **Node.js >=20** en `package.json`. La matriz de CI propuesta incluye Node.js 20, 22 y 24 en Linux, Windows y macOS. La cobertura de compatibilidad es independiente del soporte de seguridad de Node.js upstream.

Para producción, usa una versión de Node.js que siga en mantenimiento. Consulta el [calendario oficial de versiones de Node.js](https://github.com/nodejs/Release#release-schedule) antes de elegir el entorno de ejecución. Prueba tus fuentes, recursos y carga de documentos en la versión exacta que vas a desplegar.
