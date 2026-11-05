+++
title = "Fontes personalizadas com VFS"
description = "Crie um sistema virtual de arquivos de fontes fora de node_modules, registre variantes e use a família personalizada em PDFs no navegador."
weight = 15
sourceDigest = "bea37c79f0184516d0fe4a72f5f5c7b3dfb11fa1b76e3eb1d2b51e41c2128cb2"
+++

## Crie o contêiner de fontes

Use arquivos de fonte licenciados que cubram os idiomas desejados. Coloque-os no diretório `fonts/` da aplicação e gere um arquivo VFS a partir da raiz do projeto:

```sh
node node_modules/pdfmake/build-vfs.js ./fonts ./vfs_fonts.js
```

Isso incorpora **todos os arquivos** do diretório informado como entradas base64. Mantenha os assets gerados da aplicação fora de `node_modules` para que uma instalação não sobrescreva suas fontes personalizadas. Gere o VFS novamente sempre que os arquivos de fonte mudarem. O VFS do navegador é desnecessário para [caminhos de fontes no Node.js](/docs/0.3/pt-br/fonts/).

## Carregue e registre

Carregue o mecanismo antes do script VFS gerado. O script gerado registra os arquivos quando `pdfMake` já está disponível. Em um bundler, importe o objeto VFS e chame `addVirtualFileSystem` explicitamente:

```js
import pdfMake from 'pdfmake/build/pdfmake';
import customVfs from './vfs_fonts';

pdfMake.addVirtualFileSystem(customVfs);
pdfMake.addFonts({
  MyFont: {
    normal: 'MyFont-Regular.ttf',
    bold: 'MyFont-Bold.ttf',
    italics: 'MyFont-Italic.ttf',
    bolditalics: 'MyFont-BoldItalic.ttf'
  }
});

await pdfMake.createPdf({
  defaultStyle: { font: 'MyFont' },
  content: ['A document using my font.']
}).download('document.pdf');
```

Substitua os nomes pelas chaves exatas do VFS gerado. Nomes de família, como `MyFont`, são usados nos estilos; as chaves de arquivo identificam os arquivos incorporados. Defina todas as variantes que usar. É possível mapear várias variantes para um mesmo arquivo quando isso for intencional, mas isso não cria uma face realmente em negrito ou itálico.

## Coleções de fontes

Para uma coleção TrueType compatível, o descritor pode ser `[filename, faceName]`:

```js
pdfMake.addFonts({
  PingFangSC: {
    normal: ['pingfang.ttc', 'PingFangSC-Regular'],
    bold: ['pingfang.ttc', 'PingFangSC-Semibold']
  }
});
```

Incorpore a coleção e use nomes de face válidos. Este exemplo registra apenas as variantes normal e negrito; adicione as variantes itálicas antes de usá-las.

## Problemas comuns

Se um arquivo não for encontrado, compare o nome no descritor com as chaves do VFS gerado. Se uma fonte estiver indefinida, compare `defaultStyle.font` com o mapa de famílias. Se faltarem caracteres, verifique a cobertura de glifos da fonte. Se o bundle do navegador ficar grande, remova do diretório de entrada do VFS as famílias e os arquivos que não são usados.
