# Chiffrement et autorisations d’accès

Version: pdfmake 0.3.x
Language: fr
Source: https://pdfmake.github.io/docs/0.3/fr/document-definition-object/security/

**JavaScript**

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

**TypeScript**

```ts
import type { TDocumentDefinitions } from "pdfmake/interfaces";

var docDefinition: TDocumentDefinitions = {
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

Les documents PDF peuvent être chiffrés et exiger un mot de passe à l’ouverture ; ils peuvent aussi définir les opérations autorisées aux utilisateurs.

Pour activer le chiffrement, définissez un mot de passe utilisateur dans `userPassword` (valeur de type chaîne). Le fichier PDF est chiffré dès qu’un mot de passe utilisateur est fourni, et les utilisateurs sont invités à saisir ce mot de passe pour le déchiffrer à l’ouverture.

Pour définir les autorisations d’accès au fichier PDF, fournissez un mot de passe propriétaire dans `ownerPassword` (valeur de type chaîne) et un objet `permissions` contenant les autorisations. Par défaut, toutes les opérations sont interdites. Vous devez autoriser explicitement les opérations voulues.

Les paramètres suivants sont pris en charge dans l’objet `permissions` :

- `printing` : indique si l’impression est autorisée. La valeur `"lowResolution"` autorise une impression de qualité réduite ; `"highResolution"` autorise une impression haute résolution.
- `modifying` : indique si la modification du fichier est autorisée. Définissez `true` pour autoriser la modification du contenu du document.
- `copying` : indique si la copie de texte ou de graphiques est autorisée. Définissez `true` pour autoriser la copie.
- `annotating` : indique si l’annotation et le remplissage de formulaires sont autorisés. Définissez `true` pour les autoriser.
- `fillingForms` : indique si le remplissage et la signature de formulaires sont autorisés. Définissez `true` pour autoriser le remplissage des champs et la signature.
- `contentAccessibility` : indique si la copie de texte à des fins d’accessibilité est autorisée. Définissez `true` pour l’autoriser.
- `documentAssembly` : indique si l’assemblage du document est autorisé. Définissez `true` pour l’autoriser.

Vous pouvez fournir le mot de passe utilisateur, le mot de passe propriétaire ou les deux. Le comportement dépend des mots de passe fournis :

- Avec uniquement le mot de passe utilisateur, les utilisateurs qui le connaissent peuvent déchiffrer le fichier et disposent d’un accès complet au document.
- Avec uniquement le mot de passe propriétaire, les utilisateurs peuvent déchiffrer et ouvrir le document sans mot de passe, mais leur accès est limité aux opérations explicitement autorisées. Les utilisateurs qui connaissent le mot de passe propriétaire disposent d’un accès complet.
- Avec les deux mots de passe, les utilisateurs qui connaissent le mot de passe utilisateur peuvent déchiffrer le fichier, mais leur accès est limité conformément aux autorisations. Ceux qui connaissent le mot de passe propriétaire disposent d’un accès complet.

Notez que le fichier PDF ne peut pas faire respecter lui-même les autorisations. Une fois le fichier déchiffré, les applications de lecture PDF ont pleinement accès à son contenu ; il appartient à ces applications de respecter les autorisations définies.

Pour choisir la méthode de chiffrement, spécifiez la version PDF avec `version`. La meilleure méthode de chiffrement compatible avec cette version est utilisée.


> **Note:** La version PDF ne sert qu’à déterminer la méthode de chiffrement ; tous les autres éléments du PDF sont en version 1.3.


Versions disponibles :

- `1.3` : PDF version 1.3 (par défaut), chiffrement RC4 40 bits
- `1.4` : PDF version 1.4, chiffrement RC4 128 bits
- `1.5` : PDF version 1.5, chiffrement RC4 128 bits
- `1.6` : PDF version 1.6, chiffrement AES 128 bits
- `1.7` : PDF version 1.7, chiffrement AES 128 bits
- `1.7ext3` : PDF version 1.7 ExtensionLevel 3, chiffrement AES 256 bits

Avec la version PDF 1.7 ExtensionLevel 3, le mot de passe est tronqué à 127 octets de sa représentation UTF-8. Dans les versions antérieures, il est tronqué à 32 octets et seuls les caractères Latin-1 sont autorisés.
