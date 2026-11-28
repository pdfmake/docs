+++
title = "Criptografia e permissões de acesso"
description = "Configure senhas, versões de criptografia e permissões do documento PDF; isso é distinto das políticas de acesso a recursos."
weight = 2290
sourceDigest = "6736e08d8db59cae0ce17becb97f86de18201817a5135ee1385a2a15cc1608f5"
+++

```js
var docDefinition = {
  userPassword: '123',
  ownerPassword: '123456',
  permissions: {
    printing: 'highResolution', //'lowResolution'
    modifying: false,
    copying: false,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true
  },
  content: [
    '...'
  ]
};
```

Documentos PDF podem ser criptografados para exigir uma senha ao serem abertos e/ou definir as ações que os usuários podem realizar no arquivo.

Para ativar a criptografia, defina a senha de usuário em `userPassword` (valor string). O arquivo PDF será criptografado quando uma senha de usuário for fornecida, e os usuários precisarão informá-la para descriptografar o arquivo ao abri-lo.

Para definir privilégios de acesso ao PDF, forneça uma senha de proprietário em `ownerPassword` (valor string) e um objeto `permissions` com as permissões. Por padrão, todas as operações são proibidas. É preciso permitir explicitamente as operações desejadas.

As configurações a seguir podem ser usadas no objeto `permissions`:

- `printing` - se a impressão é permitida. Especifique `"lowResolution"` para permitir impressão de baixa qualidade ou `"highResolution"` para permitir impressão em alta resolução
- `modifying` - se é permitido modificar o arquivo. Especifique `true` para permitir a modificação do conteúdo do documento
- `copying` - se é permitido copiar texto ou gráficos. Especifique `true` para permitir cópias
- `annotating` - se é permitido adicionar anotações e preencher formulários. Especifique `true` para permitir essas ações
- `fillingForms` - se é permitido preencher formulários e assinar. Especifique `true` para permitir o preenchimento de campos e assinaturas
- `contentAccessibility` - se é permitido copiar texto para acessibilidade. Especifique `true` para permitir essa cópia
- `documentAssembly` - se é permitido montar o documento. Especifique `true` para permitir a montagem

Você pode especificar a senha de usuário, a senha de proprietário ou ambas. O comportamento depende das senhas fornecidas:

- Quando somente a senha de usuário é fornecida, usuários com essa senha podem descriptografar o arquivo e têm acesso completo ao documento.
- Quando somente a senha de proprietário é fornecida, os usuários podem descriptografar e abrir o documento sem fornecer senha, mas o acesso fica limitado às operações explicitamente permitidas. Usuários com a senha de proprietário têm acesso completo ao documento.
- Quando ambas as senhas são fornecidas, usuários com a senha de usuário podem descriptografar o arquivo, mas têm acesso limitado de acordo com as permissões. Usuários com a senha de proprietário têm acesso completo ao documento.

Observe que o próprio arquivo PDF não consegue impor privilégios de acesso. Depois que o arquivo é descriptografado, os aplicativos visualizadores de PDF têm acesso completo ao conteúdo, e cabe a eles respeitar as configurações de permissão.

Para escolher o método de criptografia, especifique a versão do PDF usando `version`. Será utilizado o melhor método de criptografia disponível para essa versão.

{{% alert theme="warning" %}}A versão do PDF é usada somente para escolher o método de criptografia; todos os outros elementos do PDF permanecem na versão 1.3.{{% /alert %}}

Versões disponíveis:

- `1.3` - versão PDF 1.3 (padrão), usa RC4 de 40 bits
- `1.4` - versão PDF 1.4, usa RC4 de 128 bits
- `1.5` - versão PDF 1.5, usa RC4 de 128 bits
- `1.6` - versão PDF 1.6, usa AES de 128 bits
- `1.7` - versão PDF 1.7, usa AES de 128 bits
- `1.7ext3` - versão PDF 1.7 ExtensionLevel 3, usa AES de 256 bits

Ao usar a versão PDF 1.7 ExtensionLevel 3, a senha é truncada em 127 bytes de sua representação UTF-8. Nas versões anteriores, ela é truncada em 32 bytes e somente caracteres Latin-1 são permitidos.
