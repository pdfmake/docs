# Fontes e cobertura de caracteres

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/fonts/

## Escolha uma estratégia de fontes

| Ambiente | Origem da fonte | Configuração |
| --- | --- | --- |
| Node.js | Arquivos de fonte reais | `addFonts` com caminhos absolutos |
| Node.js | Fontes PDF padrão | `require('pdfmake/standard-fonts/Helvetica')` |
| Navegador | VFS Roboto incluído | Carregue `build/vfs_fonts.js` |
| Navegador | VFS personalizado ou URLs | [Fontes personalizadas no navegador](/docs/0.3/pt-br/fonts/custom-fonts-client-side/) |

A família padrão é `Roboto`. O Node.js não registra seus arquivos automaticamente. Cada família deve associar `normal`, `bold`, `italics` e `bolditalics` aos dados de fonte adequados. Selecionar um estilo sem a variante correspondente pode causar uma falha, mesmo quando o texto normal funciona.

## Registre fontes locais no Node.js

Este exemplo pressupõe que você tem arquivos de fonte licenciados em um diretório `fonts` ao lado do script CommonJS:

**JavaScript**

```js
const path = require('node:path');
const pdfmake = require('pdfmake');
const fonts = {
  Roboto: {
    normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, 'fonts/Roboto-MediumItalic.ttf')
  }
};
const allowed = new Set(Object.values(fonts.Roboto));
pdfmake.addFonts(fonts);
pdfmake.setLocalAccessPolicy(file => allowed.has(path.resolve(file)));
pdfmake.setUrlAccessPolicy(() => false);
```

**TypeScript**

```ts
const path = require('node:path');
import pdfmake from "pdfmake";
const fonts = {
  Roboto: {
    normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, 'fonts/Roboto-MediumItalic.ttf')
  }
};
const allowed = new Set(Object.values(fonts.Roboto));
pdfmake.addFonts(fonts);
pdfmake.setLocalAccessPolicy(file => allowed.has(path.resolve(file)));
pdfmake.setUrlAccessPolicy(() => false);
```

A lista de permissões é adequada a arquivos imutáveis controlados pela aplicação. Quando os caminhos vêm de usuários não confiáveis, considere também links simbólicos e permissões do sistema de arquivos. Um prefixo de texto como `fonts/` não define um limite seguro.

## Combine o texto com a cobertura de glifos

As fontes padrão têm codificações limitadas; elas não abrangem Unicode arbitrário. Escolha fontes incorporadas que contenham os glifos necessários aos idiomas usados. Uma cadeia Unicode, por si só, não garante que a fonte selecionada consiga renderizá-la. Verifique caracteres representativos e todas as variantes em negrito e itálico nos PDFs gerados.

O pdfmake incorpora fontes por meio do PDFKit. Inclua no navegador apenas as famílias necessárias; os dados do VFS aumentam o custo de download e análise. Respeite as licenças de redistribuição e incorporação de cada fonte.

## Guias relacionados

[As 14 fontes padrão](/docs/0.3/pt-br/fonts/standard-14-fonts/) · [VFS no navegador](/docs/0.3/pt-br/fonts/custom-fonts-client-side/vfs/) · [URLs de fontes](/docs/0.3/pt-br/fonts/custom-fonts-client-side/url/) · [Solução de problemas](/docs/0.3/pt-br/guides/troubleshooting/)
