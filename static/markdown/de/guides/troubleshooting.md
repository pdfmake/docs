# Fehlerbehebung

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/guides/troubleshooting/

## Zuerst Version und Laufzeit prüfen

Führe `npm ls pdfmake` aus und vergleiche deinen Import mit der passenden Schnellstartanleitung. Ein Browser-Bundle und der Node.js-Einstieg bieten unterschiedliche Ausgabemethoden. Beispiele für Version 0.1/0.2 mit `new PdfPrinter(...)` oder Callbacks beschreiben nicht die API von 0.3.

| Symptom | Prüfen | Lösung |
| --- | --- | --- |
| Schriftfamilie oder Variante ist nicht definiert | Familienname, Zuordnung für fett/kursiv, Standardschrift | Alle verwendeten Varianten registrieren und die Familie in `defaultStyle` auswählen |
| Datei nicht gefunden oder Zugriff verweigert | Tatsächlich aufgelöster Pfad der Schrift/des Bildes und Richtlinie | Vorhandene anwendungseigene Pfade und eine passende synchrone Richtlinie verwenden |
| Glyphen fehlen oder werden falsch dargestellt | Glyphenabdeckung der ausgewählten Schrift | Schrift mit den benötigten Sprachzeichen einbetten; auch fett und kursiv prüfen |
| Tabelle leer oder fehlerhaft | `body`, Zeilenlängen und Zellenüberspannung | Nichtleere, einheitliche Zeilen und Platzhalter für überspannte Zellen bereitstellen |
| `download` ist in Node.js keine Funktion | Importierte Laufzeit | In Node.js `write` oder `getBuffer` verwenden |
| Browser öffnet kein Fenster | Benutzeraktion und Popup-Blocker | Ein Fenster direkt beim Klick öffnen, bevor asynchron Daten geladen werden |
| URL trotz Zulassungs-Callback abgelehnt | Rückgabetyp des Callbacks | Synchron den booleschen Wert `true` zurückgeben; `async` entfernen |
| HTTP-Bildanfrage schlägt fehl | URL, Richtlinie, CORS, Status und Weiterleitungen | Zugriff in der Ziel-Laufzeit prüfen; Browser setzen CORS durch |
| Datei unvollständig oder fehlt | Abgelehntes Promise und Schreibstreamfehler | Auf `write()` warten und Ablehnung behandeln, bevor der Erfolg gemeldet wird |
| Ausgabe ändert sich nach einem Upgrade | Version, Schriften, Eingaben und Standardwerte | Mit festgelegter Version reproduzieren und extrahierten Text, Seitenzahlen und gerenderte Seiten vergleichen |

## Definition vereinfachen

Beginne mit einem einfachen Absatz und bekannten funktionierenden Schriften. Ergänze Stile, Tabellenzeilen und Ressourcen einzeln. Erzeuge für jeden Versuch eine neue Definition. Trenne Anfrage- und Ressourcenfehler von Layoutfehlern.

## Einen hilfreichen Fehlerbericht erstellen

Gib die genauen pdfmake- und Node.js-/Browser-Versionen, das Betriebssystem, eine minimale ausführbare Definition, die Schrifteinrichtung, erwartetes und tatsächliches Verhalten sowie den vollständigen relevanten Stack-Trace an. Entferne private Inhalte und Geheimnisse. Bei Seitenumbruchfehlern nenne die kleinste Eingabe, mit der sich das Problem noch reproduzieren lässt.
