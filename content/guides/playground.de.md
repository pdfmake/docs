+++
title = "Playground-Anleitung"
description = "Erkunde pdfmake-Beispiele mit Code-Editor, direkter PDF-Vorschau, Seitennavigation, lokalen Imports und herunterladbarem Quellcode."
weight = 0
sourceDigest = "396ad48200f73ea3dadbbbcc3eaaf41d819c39e44ee4dd12c2546b4608adf171"
+++

## Durch Bearbeiten lernen

Öffne den [Playground](/docs/0.3/de/playground/), wähle ein Beispiel und bearbeite die Definition im linken Bereich. Rechts siehst du eine echte, mit PDF.js gerenderte PDF. Wenn **Live-Vorschau** aktiviert ist, wird die PDF nach jeder Bearbeitung automatisch aktualisiert. Wähle **Ausführen** oder drücke **Strg/Command + Enter**, um sie sofort zu aktualisieren.

Der CodeMirror-6-Editor bietet Syntaxhervorhebung, Zeilennummern, Klammerzuordnung, Einrückung, Undo/Redo-Schaltflächen, einen persistenten Rückgängig-Verlauf und Syntaxdiagnosen mit Zeile und Spalte. Mit **Zum Fehler springen** wird die fehlerhafte Quelltextstelle fokussiert. Der Editor bietet außerdem Vervollständigungen. Drücke **Strg + Leertaste**, um sie aufzurufen. Vorgeschlagene Feldnamen sind Hinweise; gültigen Kontext, Typ und Werte beschreibt die Dokumentreferenz.

## Beispiele

| Beispiel | Erkunden |
| --- | --- |
| [Erstes Dokument](/docs/0.3/de/playground/?example=welcome) | Text, Abstände und Schriftstile |
| [Rechnung](/docs/0.3/de/playground/?example=invoice) | Tabelle, Summen und Fußzeile mit Seitenzahlen |
| [Tabellen](/docs/0.3/de/playground/?example=tables) | Wiederholte Kopfzeilen auf mehreren Seiten |
| [Textstile](/docs/0.3/de/playground/?example=styles) | Benannte Stile und Inline-Überschreibungen |
| [Spalten](/docs/0.3/de/playground/?example=columns) | Nebeneinander angeordnete Blöcke und Stapel |
| [Zellüberspannungen](/docs/0.3/de/playground/?example=spans) | Zeilen- und Spaltenüberspannungen mit Platzhaltern |
| [Seiten](/docs/0.3/de/playground/?example=pages) | Seitenumbrüche, Kopf- und Fußzeilen |
| [Vektoren](/docs/0.3/de/playground/?example=vectors) | Eingebettete SVGs und QR-Codes |
| [Bilder](/docs/0.3/de/playground/?example=images) | Eingebettete PNG-Daten unter einem Namen wiederverwenden |
| [Listen](/docs/0.3/de/playground/?example=lists) | Nummerierte Listen, Aufzählungen und Links |

Ein `example`-URL-Parameter wählt ein bekanntes Beispiel aus; er akzeptiert kein JavaScript. Die Live-Vorschau aktualisiert auch wiederhergestellte Arbeitsbereiche, gespeicherte Dokumente und importierte Dateien. Schalte **Live-Vorschau** aus, bevor du Code importierst, den du zunächst prüfen möchtest.

## Vorschau und Ausgabe

Verwende die Pfeilschaltflächen, um die Seite zu wechseln, und das Zoommenü, um die Skalierung anzupassen. **Seitentext** zeigt den aus der aktuellen PDF-Seite extrahierten Text zur Prüfung und für unterstützende Technologien an. **PDF öffnen** öffnet die erzeugte Datei separat; **PDF herunterladen** speichert dieselben PDF-Bytes. Die Fußzeile zeigt Erstellungszeit und Ausgabegröße. Die Erstellungszeit umfasst nicht das Rendern der Vorschau mit PDF.js.

Die Live-Vorschau wartet nach der letzten Änderung 650 ms und rendert anschließend in einem neuen Worker. Die vorherige PDF bleibt sichtbar, bis die nächste Seite außerhalb des Bildschirms fertig gerendert ist; danach wird die Canvas in einem Schritt ausgetauscht. Die ausgewählte PDF-Seite und Zoomstufe bleiben nach Möglichkeit erhalten. Downloads sind deaktiviert, wenn die sichtbare PDF nicht dem aktuellen Code entspricht. Bei Fehlern bleibt die letzte erfolgreiche Vorschau erhalten, statt durch ein leeres Feld ersetzt zu werden.

## Arbeit behalten

**Code exportieren** lädt die aktuelle Definition als JavaScript herunter. **.js importieren** liest eine lokale Datei ein. Dateien sind auf 500 KB begrenzt. Deaktiviere **Live-Vorschau**, bevor du Code importierst, den du vor dem Ausführen prüfen möchtest. Vor dem Zurücksetzen oder Wechseln des Beispiels wirst du gefragt, bevor Änderungen überschrieben werden.

**Der aktuelle Arbeitsbereich wird lokal automatisch gespeichert** – einschließlich Definition, Editor-Auswahl, Undo-Verlauf, Beispiel, Seite und Zoomstufe. Beim Neuladen werden Editor, Undo-/Redo-Verlauf und die Einstellung der Live-Vorschau wiederhergestellt. Wenn die Live-Vorschau aktiviert ist, wird die wiederhergestellte PDF automatisch gerendert; Änderungen aktualisieren sie anschließend ohne **Ausführen**. Ist sie deaktiviert, bleibt das Rendering auch nach dem Neuladen manuell.

Gib dem Dokument einen Namen und wähle **Dokument speichern**, um eine separate lokale Kopie anzulegen. Ein neuer Name erzeugt ein weiteres gespeichertes Dokument; unter dem aktuell ausgewählten Namen wird die Datei aktualisiert. Über das Menü gespeicherter Dokumente stellst du ein Dokument und seinen Verlauf wieder her. **Löschen** entfernt diese benannte Kopie, behält aber den aktuellen Editorinhalt bei. Bis zu 30 benannte Dokumente können gespeichert werden. Es gelten die Speichergrenzen des Browsers.

**Entwurf lokal speichern** bleibt ein separates Schnellsnapshot mit **Wiederherstellen**- und **Löschen**-Steuerung. **Automatisches Speichern des Arbeitsbereichs löschen** entfernt die aktuelle automatische Speicherung und pausiert sie, bis du wieder Text eingibst. Benannte Dokumente und Schnellentwürfe sind getrennt. Wenn der Browser-Speicher deaktiviert oder voll ist, funktioniert der Editor weiterhin und der Codeexport bleibt verfügbar. Diese Anwendung lädt weder Quellcode noch PDFs hoch.

## Grenzen des Renderings

Jeder Renderdurchlauf startet einen neuen Browser-Worker. **Abbrechen** beendet ihn auch bei einer blockierten JavaScript-Schleife. Ein Zeitlimit von zehn Sekunden beendet unerwartet aufwendige Aufgaben. Vereinfache große Dokumente oder teste sie in einer kontrollierten Anwendung, wenn sie das Limit des Playgrounds überschreiten. Die PDF-API sperrt hier entfernte URL-Ressourcen; verwende eingebettete Bilder und die bereitgestellten Roboto-Schriften.

Benutzerdefiniertes JavaScript ist vertrauenswürdiger Benutzer-Code, keine Sicherheitssandbox. Führe keinen Code aus unbekannter Quelle aus. Ein Worker schützt die Benutzeroberfläche vor Blockaden, isoliert aber keinen bösartigen Code. Hinweise für Produktions-APIs findest du unter [Ressourcensicherheit](/docs/0.3/de/guides/resource-security/).

## Eigenständiges Entwicklungswerkzeug starten

Führe in einem erstellten Checkout der pdfmake-Bibliothek `npm run playground` aus. Damit wird dieselbe Benutzeroberfläche mit der Engine dieses Checkouts unter `http://127.0.0.1:1234/playground/` bereitgestellt. Für die separaten Werkzeuge ist Node.js >=22.13 erforderlich. Die Laufzeitanforderung der veröffentlichten Bibliothek bleibt Node.js >=20. Die Dokumentationswebsite kann mit `PDFMAKE_SOURCE` ebenfalls eine lokale Engine verwenden; siehe die README des Dokumentationsrepositorys.
