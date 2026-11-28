+++
title = "Verschlüsselung und Zugriffsrechte"
description = "Lege PDF-Passwörter, Verschlüsselungsversionen und Dokumentberechtigungen fest; diese sind von Ressourcen-Zugriffsrichtlinien getrennt."
weight = 2290
alwaysopen = true
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

PDF-Dokumente können verschlüsselt und beim Öffnen durch ein Passwort geschützt werden. Außerdem können Berechtigungen für die Aktionen festgelegt werden, die Benutzer mit dem PDF ausführen dürfen.

Um die Verschlüsselung zu aktivieren, setze das Benutzerpasswort (Zeichenfolge) in `userPassword`. Wenn ein Benutzerpasswort angegeben ist, wird die PDF-Datei verschlüsselt und Benutzer werden beim Öffnen aufgefordert, das Passwort zum Entschlüsseln einzugeben.

Um Zugriffsrechte für die PDF-Datei festzulegen, musst du ein Eigentümerpasswort (Zeichenfolge) in `ownerPassword` und ein Objekt `permissions` mit Berechtigungen angeben. Standardmäßig sind alle Vorgänge gesperrt. Du musst die gewünschten Vorgänge ausdrücklich erlauben.

Folgende Einstellungen sind im Objekt `permissions` möglich:

- `printing` – ob Drucken erlaubt ist. Mit `"lowResolution"` wird Drucken in niedriger Auflösung erlaubt, mit `"highResolution"` Drucken in hoher Auflösung.
- `modifying` – ob Änderungen erlaubt sind. Setze den Wert auf `true`, um Änderungen am Dokumentinhalt zu erlauben.
- `copying` – ob Text oder Grafiken kopiert werden dürfen. Setze den Wert auf `true`, um das Kopieren zu erlauben.
- `annotating` – ob Anmerkungen und das Ausfüllen von Formularen erlaubt sind. Setze den Wert auf `true`, um beides zuzulassen.
- `fillingForms` – ob Formulare ausgefüllt und signiert werden dürfen. Setze den Wert auf `true`, um das Ausfüllen und Signieren von Formularfeldern zu erlauben.
- `contentAccessibility` – ob Text für Barrierefreiheit kopiert werden darf. Setze den Wert auf `true`, um dieses Kopieren zu erlauben.
- `documentAssembly` – ob das Dokument zusammengestellt werden darf. Setze den Wert auf `true`, um das Zusammenstellen zu erlauben.

Du kannst das Benutzerpasswort, das Eigentümerpasswort oder beide angeben. Das Verhalten hängt von den angegebenen Passwörtern ab:

- Wenn nur ein Benutzerpasswort angegeben ist, können Benutzer mit diesem Passwort die Datei entschlüsseln und haben vollen Zugriff auf das Dokument.
- Wenn nur ein Eigentümerpasswort angegeben ist, können Benutzer das Dokument ohne Passwort entschlüsseln und öffnen, haben aber nur Zugriff auf ausdrücklich erlaubte Vorgänge. Benutzer mit Eigentümerpasswort haben vollen Zugriff auf das Dokument.
- Wenn beide Passwörter angegeben sind, können Benutzer mit dem Benutzerpasswort die Datei entschlüsseln, haben aber entsprechend den Berechtigungseinstellungen nur eingeschränkten Zugriff. Benutzer mit Eigentümerpasswort haben vollen Zugriff auf das Dokument.

Beachte, dass die PDF-Datei selbst Zugriffsrechte nicht durchsetzen kann. Sobald die Datei entschlüsselt ist, haben PDF-Viewer Zugriff auf den gesamten Dateiinhalt. Es liegt an den Viewer-Anwendungen, die Berechtigungseinstellungen zu beachten.

Um das Verschlüsselungsverfahren auszuwählen, musst du über `version` die PDF-Version angeben. Es wird das bestmögliche Verschlüsselungsverfahren für diese PDF-Version verwendet.

{{% alert theme="warning" %}}Die PDF-Version wird nur für das Verschlüsselungsverfahren verwendet; alle anderen PDF-Elemente haben Version 1.3.{{% /alert %}}

Verfügbare Versionen:

- `1.3` – PDF-Version 1.3 (Standard), 40-Bit-RC4
- `1.4` – PDF-Version 1.4, 128-Bit-RC4
- `1.5` – PDF-Version 1.5, 128-Bit-RC4
- `1.6` – PDF-Version 1.6, 128-Bit-AES
- `1.7` – PDF-Version 1.7, 128-Bit-AES
- `1.7ext3` – PDF-Version 1.7 ExtensionLevel 3, 256-Bit-AES

Bei PDF-Version 1.7 ExtensionLevel 3 wird das Passwort auf 127 Bytes seiner UTF-8-Darstellung gekürzt. In älteren Versionen wird es auf 32 Bytes gekürzt; erlaubt sind dort nur Latin-1-Zeichen.
