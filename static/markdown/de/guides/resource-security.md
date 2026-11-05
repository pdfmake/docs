# Ressourcensicherheit

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/guides/resource-security/

## Behandle Definitionen wie Anwendungscode

Eine Definition kann Callback-Funktionen für Kopf- und Fußzeilen, Tabellenlayouts und Seitenumbrüche enthalten. Werte niemals JavaScript aus, das ein nicht vertrauenswürdiger Aufrufer übermittelt. Nimm geprüfte Anwendungsdaten entgegen und erstelle die Definitionen selbst. Begrenze vor dem Rendern Eingabegröße, Verschachtelung, Tabellenabmessungen und Bildgröße.

## Nicht benötigte Ressourcen sperren

Wenn alle Ressourcen als In-Memory-Daten bereitgestellt werden, sperre Ressourcenpfade in Form von Zeichenfolgen:

**JavaScript**

```js
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(() => false);
```

**TypeScript**

```ts
pdfmake.setUrlAccessPolicy(() => false);
pdfmake.setLocalAccessPolicy(() => false);
```

Die aktuelle Implementierung leitet auch Standard-Schriftkennungen (zum Beispiel `Helvetica-Bold`) durch die lokale Richtlinie. Wenn du Standardschriften verwendest, erlaube die genau registrierten Kennungen; die [Node.js-Schnellstartanleitung](/docs/0.3/de/getting-started/server-side/) zeigt diese Einrichtung.

URL-Richtlinien erfordern **0.3.6+**, lokale Richtlinien **0.3.8+**. Konfiguriere sie, bevor du Aufträge entgegennimmst. Eine nicht gesetzte Richtlinie erlaubt das Laden von Ressourcen; sie bedeutet nicht, dass alle Zugriffe gesperrt sind.

## Synchrone Richtlinien verwenden

Die Implementierung prüft, ob `callback(value) === true` gilt. Verwende in diesen Richtlinien keine `async`-Callbacks, DNS-Abfragen oder Promises. Lade freigegebene Ressourcen in deiner Anwendung vorab, wenn die Prüfung asynchron erfolgen muss, und übergib anschließend eingebettete Daten oder eine anwendungseigene Datei.

**JavaScript**

```js
pdfmake.setUrlAccessPolicy(value => {
  const url = new URL(value);
  return url.protocol === 'https:' && url.hostname === 'assets.example.com' && !url.username && !url.password;
});
```

**TypeScript**

```ts
pdfmake.setUrlAccessPolicy(value => {
  const url = new URL(value);
  return url.protocol === 'https:' && url.hostname === 'assets.example.com' && !url.username && !url.password;
});
```

Dieses Beispiel mit Hostnamen bietet keinen vollständigen Schutz vor SSRF. DNS-Änderungen, Weiterleitungen, interne Adressbereiche und Netzwerkrechte der Bereitstellung sind ebenfalls relevant. Begrenze ausgehende Netzwerkzugriffe. In Node.js prüft der Resolver manuelle Weiterleitungsschritte. Browser können Weiterleitungen folgen, bevor die endgültige URL geprüft wird; Browserrichtlinien können nicht jeden Netzwerkschritt kontrollieren.

## Lokale Dateien

Erlaube genau aufgelöste, von deiner Anwendung verwaltete Pfade. Eine funktionierende Zulassungsliste zeigt die [Schriftkonfiguration](/docs/0.3/de/fonts/). Vermeide `startsWith('fonts/')`, da damit weder Pfadmanipulation noch Dateisystem-Aliase verhindert werden. Schütze freigegebene Dateien vor Austausch und berücksichtige symbolische Links. Lass Aufrufer keine beliebigen Serverpfade auswählen.

## Auftragsumfang begrenzen

Layout- und Schriftenverarbeitung können CPU und Speicher verbrauchen, bevor ein Ausgabestream verfügbar ist. Verwende begrenzte Warteschlangen und isolierte Worker, wenn du große oder nicht vertrauenswürdige Dokumente verarbeitest. Ein Promise-Timeout unterbricht das synchrone Layout nicht. Wenn du eine harte Abbruchmöglichkeit brauchst, setze Prozesslimits.

## PDF-Verschlüsselung ist davon getrennt

[Passwörter und PDF-Berechtigungen](/docs/0.3/de/document-definition-object/security/) betreffen das erzeugte Dokument. Sie sichern nicht das Netzwerk, Dateisystem oder die Callback-Ausführung deines Servers.
