+++
title = "Code QR"
description = "Ajoutez des codes QR et configurez leur couleur, leur taille, leur version, la correction d’erreurs et le mode d’encodage."
weight = 2220
alwaysopen = true
sourceDigest = "1faae2f9f0ec8989f3aac23e9c10b8b8c91998d2830d52b4558b2ff3f8beafe9"
+++

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

Propriétés :

* `qr` : `string` - texte du code QR
* `foreground` : `string` (facultatif, noir par défaut) - couleur de premier plan
* `background` : `string` (facultatif, blanc par défaut) - couleur d’arrière-plan
* `fit` : `integer` (facultatif) - ajuste la taille de l’image QR générée
* `version` : `integer` (facultatif) - version QR, de 1 à 40 (voir [Wikipédia](https://en.wikipedia.org/wiki/QR_code#Storage))
* `eccLevel` : `string` (facultatif, L par défaut) - capacité de correction d’erreurs (voir [Wikipédia](https://en.wikipedia.org/wiki/QR_code#Error_correction)), valeurs possibles :
  * _L_ - niveau L (faible), environ 7 % des mots de code peuvent être restaurés
  * _M_ - niveau M (moyen), environ 15 % des mots de code peuvent être restaurés
  * _Q_ - niveau Q (quartile), environ 25 % des mots de code peuvent être restaurés
  * _H_ - niveau H (élevé), environ 30 % des mots de code peuvent être restaurés
* `mode` : `string` (facultatif) - mode d’encodage ; valeurs possibles : _numeric_, _alphanumeric_, _octet_ (voir [Wikipédia](https://en.wikipedia.org/wiki/QR_code#Storage))
* `mask` : `integer` (facultatif) - motif de masque, de 0 à 7 (voir [Wikipédia](https://en.wikipedia.org/wiki/QR_code#Encoding))
