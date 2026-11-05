+++
title = "Ícones"
description = "Configure ícones no pdfmake 0.3 com exemplos, opções e orientações de uso."
weight = 15
alwaysopen = true
sourceDigest = "389a424f61b90f95836afb77e66802f06435c1b671de3c8b4054b385699698b1"
+++

- Crie uma fonte em http://fontello.com/ ou em um serviço semelhante e baixe-a.

- A partir do arquivo de fonte (por exemplo, `.ttf`), crie o arquivo `vfs_fonts.js` (consulte como [usar fontes personalizadas](/docs/0.3/pt-br/fonts/custom-fonts-client-side/vfs/)).

- Defina a fonte em JavaScript (talvez baste definir `normal`):
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

```
    text: [
        { text: '', style: 'icon' }, //icon gift
        " my present"
    ]
```
O resultado será: "[ícone de presente] meu presente"
