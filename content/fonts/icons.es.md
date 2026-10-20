+++
sourceDigest = "389a424f61b90f95836afb77e66802f06435c1b671de3c8b4054b385699698b1"
title = "Iconos"
description = "Configura iconos en pdfmake 0.3 con ejemplos, opciones y notas de uso."
weight = 15
alwaysopen = true
+++

- Crea una fuente en http://fontello.com/ o un servicio similar y descárgala.

- A partir del archivo de fuente (por ejemplo, `.ttf`), crea el archivo `vfs_fonts.js` (consulta cómo [usar fuentes personalizadas](/docs/0.3/es/fonts/custom-fonts-client-side/vfs/)).

- Define la fuente en JavaScript (puede bastar con definir `normal`):
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

- Añade un estilo para los iconos:
`            icon: {
                font: 'Fontello'
            }`
- Crea un párrafo de texto:
`
            { text: '', style: 'icon' }, //icon wifi`
- Usa como texto el carácter copiado de los comentarios de `fontello-codes.css` (no el valor escapado).

---

Si necesitas un icono dentro del texto, anida objetos de texto:

```
    text: [
        { text: '', style: 'icon' }, //icon gift
        " my present"
    ]
```
Esto produce: «[icono de regalo] my present».
