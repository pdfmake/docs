# Código QR

Version: pdfmake 0.3.x
Language: pt-br
Source: https://pdfmake.github.io/docs/0.3/pt-br/document-definition-object/qr/

**JavaScript**

```js
var docDefinition = {
  content: [
    // basic usage
    { qr: 'text in QR' },

    // colored QR
    { qr: 'text in QR', foreground: 'red', background: 'yellow' },

    // resized QR
    { qr: 'text in QR', fit: 500 },
  ]
}
```

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
  content: [
    // basic usage
    { qr: 'text in QR' },

    // colored QR
    { qr: 'text in QR', foreground: 'red', background: 'yellow' },

    // resized QR
    { qr: 'text in QR', fit: 500 },
  ]
}
```

Propriedades:

* `qr`: `string` - texto no código QR
* `foreground`: `string` (opcional, padrão preto) - cor do primeiro plano
* `background`: `string` (opcional, padrão branco) - cor do fundo
* `fit`: `integer` (opcional) - ajusta o tamanho da imagem QR de saída
* `version`: `integer` (opcional) - versão QR de 1 a 40 (detalhes em [wikipedia.org](https://en.wikipedia.org/wiki/QR_code#Storage))
* `eccLevel`: `string` (opcional, padrão L) - capacidade de correção de erros (detalhes em [wikipedia.org](https://en.wikipedia.org/wiki/QR_code#Error_correction)); valores possíveis:
  * _L_ - nível L (baixo), aproximadamente 7% das palavras de código podem ser restauradas
  * _M_ - nível M (médio), aproximadamente 15% das palavras de código podem ser restauradas
  * _Q_ - nível Q (quartil), aproximadamente 25% das palavras de código podem ser restauradas
  * _H_ - nível H (alto), aproximadamente 30% das palavras de código podem ser restauradas
* `mode`: `string` (opcional) - modo de codificação; valores possíveis: _numeric_, _alphanumeric_, _octet_ (detalhes em [wikipedia.org](https://en.wikipedia.org/wiki/QR_code#Storage))
* `mask`: `integer` (opcional) - padrão de máscara, de 0 a 7 (detalhes em [wikipedia.org](https://en.wikipedia.org/wiki/QR_code#Encoding))
