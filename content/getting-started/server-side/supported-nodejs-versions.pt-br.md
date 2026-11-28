+++
title = "Versões compatíveis do Node.js"
description = "Consulte o requisito do pacote e a matriz de ambientes de execução da integração contínua para o pdfmake 0.3."
weight = 11
sourceDigest = "f4c2a68e78a87bb4e9aaab5680632a3bd23ed11ffce20ae002258442874d3b24"
+++

## Requisito do mecanismo

O pacote 0.3.15 declara **Node.js >=20.19.0** em `package.json`. A matriz de CI proposta abrange Node.js 20, 22, 24 e 26 em Linux, Windows e macOS. A cobertura de compatibilidade é diferente do suporte de segurança oferecido pelo projeto Node.js.

Em produção, use uma versão do Node.js que ainda receba manutenção. Consulte o [cronograma oficial de versões do Node.js](https://github.com/nodejs/Release#release-schedule) antes de escolher o ambiente de execução. Teste suas fontes, recursos e carga de documentos na versão exata que será implantada.
