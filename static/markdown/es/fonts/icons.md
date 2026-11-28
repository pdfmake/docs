# Iconos

Version: pdfmake 0.3.x
Language: es
Source: https://pdfmake.github.io/docs/0.3/es/fonts/icons/

- Crea una fuente en http://fontello.com/ o un servicio similar y descárgala.

- A partir del archivo de fuente (por ejemplo, `.ttf`), crea el archivo `vfs_fonts.js` (consulta cómo [usar fuentes personalizadas](/docs/0.3/es/fonts/custom-fonts-client-side/vfs/)).

- Define la fuente en JavaScript (puede bastar con definir `normal`):
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
Esto produce: «[icono de regalo] my present».
