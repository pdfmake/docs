# Ícones

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/fonts/icons/

- Crie uma fonte em http://fontello.com/ ou em um serviço semelhante e baixe-a.

- A partir do arquivo de fonte (por exemplo, `.ttf`), crie o arquivo `vfs_fonts.js` (consulte como [usar fontes personalizadas](/docs/0.3/pt-br/fonts/custom-fonts-client-side/vfs/)).

- Defina a fonte em JavaScript (talvez baste definir `normal`):
**JavaScript**

```js
pdfMake.fonts = {
    Fontello: {
        normal: 'fontello.ttf',
        bold: 'fontello.ttf',
        italics: 'fontello.ttf',
        bolditalics: 'fontello.ttf'
    }
}
```

**TypeScript**

```ts
pdfMake.fonts = {
    Fontello: {
        normal: 'fontello.ttf',
        bold: 'fontello.ttf',
        italics: 'fontello.ttf',
        bolditalics: 'fontello.ttf'
    }
}
```

- Adicione um estilo para os ícones:
`            icon: {
                font: 'Fontello'
            }`
- Crie um parágrafo de texto:
`
            { text: '', style: 'icon' }, //icon wifi`
- Copie o texto dos comentários de `fontello-codes.css` (não o valor com escape).

---

Se precisar de um ícone dentro do texto, aninhe objetos de texto:

**JavaScript**

```js
var dd = { content: [{
text: [
        { text: '', style: 'icon' }, //icon gift
        " my present"
    ]
}] };
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var dd: TDocumentDefinitions = { content: [{
text: [
        { text: '', style: 'icon' }, //icon gift
        " my present"
    ]
}] };
```
O resultado será: "[ícone de presente] meu presente"
