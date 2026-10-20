+++
title = "Versões compatíveis do Node.js"
description = "Consulte o requisito do pacote e a matriz de ambientes de execução da integração contínua para o pdfmake 0.3."
weight = 11
sourceDigest = "a3773119140b35aeeb52b0f988b7fbc41e35370ef21c63bcb1f6d8de8683380d"
+++

## Requisito do mecanismo

O pacote 0.3.12 declara **Node.js >=20** em `package.json`. A matriz de CI proposta abrange Node.js 20, 22 e 24 em Linux, Windows e macOS. A cobertura de compatibilidade é diferente do suporte de segurança oferecido pelo projeto Node.js.

Em produção, use uma versão do Node.js que ainda receba manutenção. Consulte o [cronograma oficial de versões do Node.js](https://github.com/nodejs/Release#release-schedule) antes de escolher o ambiente de execução. Teste suas fontes, recursos e carga de documentos na versão exata que será implantada.
