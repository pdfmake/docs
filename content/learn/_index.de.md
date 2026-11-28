+++
title = "Hier anfangen"
description = "Ein kurzer Lernpfad von der Laufzeitwahl bis zum Erstellen, Formatieren und zur Fehlerbehebung deiner ersten PDF."
weight = 5
sourceDigest = "a8635fe5b8817a5c2f610b634abb0689d9672e42eef5a1b0bc6d01f52ba73dbe"
+++

## Mit einem funktionierenden Dokument beginnen

Du musst nicht erst die gesamte Dokumentreferenz kennen. Folge diesen drei Schritten:

<div class="learning-path">
<a href="/docs/0.3/de/learn/first-pdf/"><strong>1. Deine erste PDF erstellen</strong><span>Verstehe die Definition, lade Schriften und führe ein vollständiges Beispiel aus.</span></a>
<a href="/docs/0.3/de/learn/document-model/"><strong>2. Das Dokumentmodell kennenlernen</strong><span>Erfahre, wann Absätze, Inline-Text, Stapel, Spalten oder Tabellen sinnvoll sind.</span></a>
<a href="/docs/0.3/de/guides/errors/"><strong>3. Fehler lesen und gezielt beheben</strong><span>Unterscheide zwischen JavaScript-Syntax, Dokumentstruktur, Ressourcen und Ausgabe.</span></a>
</div>

## Welche Laufzeit brauche ich?

| Auswahl | Wann | Ausgabe |
| --- | --- | --- |
| [Node.js](/docs/0.3/de/getting-started/server-side/) | Deine API oder ein Hintergrundauftrag erstellt die Datei | `write()` für Dateien; `getBuffer()` für HTTP-Antworten |
| [Browser](/docs/0.3/de/getting-started/client-side/) | Benutzer erstellen das Dokument auf ihrem Gerät | `download()`, `open()`, `print()` oder `getBlob()` |

Die Dokumentdefinition wird gemeinsam verwendet. Das Laden der Schriften und die Ausgabemethoden hängen von der Laufzeit ab. Diese Seiten beziehen sich auf **0.3.x**; ältere Beispiele mit `new PdfPrinter(...)` und Callback-Ausgabe gehören zu [0.1/0.2](/docs/0.3/de/migration-from-0.1/).

## Durch sichtbare Ergebnisse lernen

Die Beispiele dieses Lernpfads zeigen den exakten JavaScript-Code neben einer tatsächlich erzeugten PDF. Öffne sie im Playground und bearbeite sie. Der vollständige Quellcode ist außerdem im [Markdown-Korpus](/docs/0.3/de/llms-full.txt) enthalten, auch der Code, der sonst von interaktiven Beispielkomponenten erzeugt wird.
