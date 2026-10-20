+++
title = "Bilder"
description = "Bette PNG- und JPEG-Bilder über Data-URLs, benannte Ressourcen, Dateien oder freigegebene externe URLs ein."
weight = 2100
alwaysopen = true
sourceDigest = "e0419b93231e1257dc4fafa17f5b9f74c214b95807240b77511d32bfe7c0da6d"
+++

## Eingebettete PNG- oder JPEG-Daten wiederverwenden

Ein Bildknoten hat die Form `{ image: 'key' }`; der Schlüssel verweist auf einen Eintrag im Wörterbuch `images`. Verwende denselben Schlüssel, wenn ein Bild mehrfach vorkommt. Unterstützt werden PNG und JPEG. Für SVG-Inhalte verwende einen [SVG-Knoten](/docs/0.3/de/document-definition-object/svgs/).

{{< example id="images" >}}

## Skalierung festlegen

| Felder des Bildknotens | Ergebnis |
| --- | --- |
| Keine Angabe von width, height oder fit | Natürliche Abmessungen des Bildes verwenden |
| `width: 150` | Proportional auf diese Breite skalieren |
| `height: 100` | Proportional auf diese Höhe skalieren; seit 0.3.2 |
| `width: 150, height: 100` | Diese Abmessungen erzwingen; das Bild kann dadurch gestreckt werden |
| `fit: [150, 100]` | In ein Rechteck einpassen und Seitenverhältnis beibehalten |
| `cover: { width: 150, height: 100, align: 'right', valign: 'bottom' }` | Rechteck mit Bild füllen, zuschneiden und ausrichten |

Die angezeigten Abmessungen verkleinern nicht die ursprünglichen Bilddaten. Skaliere übergroße Quelldateien vor dem Einbetten, wenn Ausgabegröße und Speicherverbrauch wichtig sind.

## Quelle für deine Laufzeit auswählen

| Quelle | Einrichtung |
| --- | --- |
| Data-URL | Vollständige PNG-/JPEG-Base64-Data-URL in `images` oder direkt im Knoten angeben |
| Lokale Datei | Nur Node.js oder eine Datei, die bereits im Browser-VFS liegt |
| HTTP(S)-URL | Benannten Eintrag in `images` verwenden und über die Ressourcenrichtlinie freigeben |
| URL mit Headern | `{ url, headers }` im benannten Eintrag unter `images` verwenden |

```js
var dd = {
  images: {
    logo: '/application-owned/assets/logo.png',
    remote: {
      url: 'https://assets.example.com/photo.jpg',
      headers: { 'X-Example-Header': 'value' }
    }
  },
  content: [
    { image: 'logo', width: 120 },
    { image: 'remote', fit: [200, 150] }
  ]
};
```

Dieses Snippet zeigt die Formen der Quellen, ist aber kein eigenständiges Beispiel zum Herunterladen. Stelle eine vorhandene, von deiner Anwendung verwaltete Datei und eine gültige, freigegebene URL bereit. Im Browser muss die lokale Datei im VFS vorhanden sein; Browser-URLs benötigen außerdem CORS-Unterstützung. Füge keine privaten Zugangsdaten in clientseitige Definitionen ein. Das oben gezeigte eingebettete Beispiel benötigt keine Netzwerkressource.

## Fehlende Bilder untersuchen

Ein leerer oder ungültiger Bildwert führt zu einem Fehler. Prüfe den Wörterbuchschlüssel, das vollständige Data-URL-Präfix und die Datenbytes, das Vorhandensein der Datei, die URL-Antwort und die Zugriffsrichtlinie. `setUrlAccessPolicy` umgeht CORS nicht. Eine lokale Dateirichtlinie muss den tatsächlich aufgelösten Dateipfad erlauben. Siehe [Ressourcensicherheit](/docs/0.3/de/guides/resource-security/) und [Fehlerbehebung](/docs/0.3/de/guides/troubleshooting/).
