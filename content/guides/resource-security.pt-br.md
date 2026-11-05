+++
title = "Segurança de recursos"
description = "Controle URLs externas, arquivos locais e entradas de documento não confiáveis ao usar pdfmake em aplicações de servidor."
weight = 3
sourceDigest = "6c29d58fcc33de62c3b85279453f4530abfd1801030ad057800f73e261b61a26"
+++

## Trate definições como código da aplicação

Uma definição pode conter funções de callback para cabeçalhos, rodapés, layouts de tabela e quebras de página. Nunca execute JavaScript enviado por um chamador não confiável. Aceite dados da aplicação já validados e construa você mesmo as definições. Limite o tamanho da entrada, o aninhamento, as dimensões das tabelas e o tamanho das imagens antes de renderizar.

## Bloqueie recursos desnecessários

Se todos os recursos forem fornecidos como dados em memória, bloqueie caminhos de recursos em formato de string:

```js
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(() => false);
```

A implementação atual também passa identificadores de fontes padrão (por exemplo, `Helvetica-Bold`) pela política local. Ao usar fontes padrão, permita os identificadores exatos registrados; o [início rápido para Node](/docs/0.3/pt-br/getting-started/server-side/) mostra essa configuração.

As políticas de URL exigem **0.3.6 ou superior** e as políticas locais, **0.3.8 ou superior**. Configure-as antes de aceitar trabalho. Uma política não definida permite o carregamento de recursos; isso não significa negar tudo.

## Use políticas síncronas

A implementação verifica se `callback(value) === true`. Não use callbacks `async`, consultas DNS ou Promises nessas políticas. Se a validação exigir trabalho assíncrono, busque previamente os recursos aprovados na aplicação e passe dados incorporados ou um arquivo controlado pela aplicação.

```js
pdfmake.setUrlAccessPolicy(value => {
  const url = new URL(value);
  return url.protocol === 'https:' && url.hostname === 'assets.example.com' && !url.username && !url.password;
});
```

Este exemplo de nome de host não oferece proteção completa contra SSRF. Mudanças de DNS, redirecionamentos, faixas de endereços internos e permissões de rede do deployment também importam. Aplique controles de rede de saída. No Node.js, o resolvedor verifica os redirecionamentos manuais. Navegadores podem seguir redirecionamentos antes da verificação final da política de URL; políticas no navegador não conseguem controlar cada salto de rede.

## Arquivos locais

Permita caminhos resolvidos exatos que pertençam à aplicação. Consulte [configuração de fontes](/docs/0.3/pt-br/fonts/) para ver uma lista de permissões funcional. Evite `startsWith('fonts/')`, que não resolve travessia de diretórios nem aliases do sistema de arquivos. Proteja os arquivos aprovados contra substituição e considere links simbólicos. Não permita que um chamador escolha caminhos arbitrários do servidor.

## Limite o trabalho

O layout e o processamento de fontes podem consumir CPU e memória antes que um stream de saída esteja disponível. Use filas limitadas e workers isolados para documentos grandes ou não confiáveis. Um timeout de Promise, sozinho, não interrompe o layout síncrono. Se precisar de cancelamento rígido, adicione limites no nível do processo.

## A criptografia do PDF é diferente

[Senhas e permissões do PDF](/docs/0.3/pt-br/document-definition-object/security/) afetam o documento produzido. Elas não protegem a rede, o sistema de arquivos nem a execução de callbacks do servidor.
