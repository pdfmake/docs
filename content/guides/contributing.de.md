+++
title = "Mitwirken und Quellcodearchitektur"
description = "Lerne die Rendering-Pipeline von pdfmake kennen, ergänze gezielte Regressionstests und prüfe Beiträge zur Bibliothek oder Dokumentation lokal."
weight = 7
sourceDigest = "ca6cb5430de16efbb426ec56f526fac9bd29bebd50ca1a5c9f971b896f29363b"
+++

## Quellcodeübersicht

Die Bibliothek und diese Website liegen in getrennten Repositories:

- [bpampuch/pdfmake](https://github.com/bpampuch/pdfmake): Engine, Bundles, Tests und Beispiele.
- [pdfmake/docs](https://github.com/pdfmake/docs): diese versionierte Entwicklerwebsite und die Dokumentationswerkzeuge.

Der Node.js-Einstieg der Bibliothek ist `src/index.js`; gemeinsame Konfiguration liegt in `src/base.js`. Die Browserintegration befindet sich unter `src/browser-extensions/`. `Printer` bereitet Ressourcen vor und erzeugt die PDFKit-Ausgabe. `DocPreprocessor` normalisiert Knoten, `DocMeasure` und `TextInlines` messen sie, `LayoutBuilder` und `TableProcessor` teilen sie auf Seiten auf, und `Renderer` schreibt PDFKit-Zeichenanweisungen.

## Änderungen an der Engine prüfen

```sh
npm ci
npm test
npm run build:examples
npm run test:package
```

`npm test` erstellt generierte Node.js- und Browserartefakte und führt dann Mocha und ESLint aus. Unit-Tests importieren kompiliertes `js/`; erstelle diese Dateien nach Änderungen in `src/` erneut. Bearbeite `js/` oder `build/` nicht direkt. Der neue Paket-Rauchtest installiert das tatsächliche Tarball in einem temporären Consumer mit Produktionsabhängigkeiten und prüft anschließend die Node.js-Ausgabe und beide Browser-Bundles. Er ersetzt Tests in echten Browsern nicht.

Bewahre bei Optimierungen Text, Schriftmetriken, Stilvererbung und Seiteneinteilung. Ergänze einen Regressionstest für einen Randfall und vergleiche, wenn möglich, mit dem bisherigen Verhalten. Halte Leistungsbenchmarks getrennt von Korrektheitstests.

## Dokumentationsänderungen prüfen

Verwende Node.js >=24.11 und Hugo **0.168.0**. Führe im Repository Folgendes aus:

```sh
npm ci
npm run docs:generate
npm test
npm run build
npm run dev
```

Öffne die von Hugo ausgegebene Adresse. Die Generierung erstellt den Website-Suchindex, Markdown-Exporte und den MCP-Korpus aus `content/`. Tests prüfen Metadaten, Beispiele und MCP-Verhalten. Der Build prüft generierte interne Links und Fragmentziele. Übernimm die neu generierten Ausgaben zusammen mit den Quelldateien, damit Clients den Korpus ohne Hugo-Installation verwenden können.

## Releases

Die Bibliothek behält den GitHub-Release-Trigger des Upstream-Projekts bei. Der vorgeschlagene Workflow prüft, ob Tag und Version übereinstimmen, erstellt und testet das Paket, generiert Beispiele, prüft ein gepacktes Consumer-Projekt und veröffentlicht anschließend genau dieses Tarball mit Herkunftsnachweis. Lokale Tests veröffentlichen nichts in der Registry.

Der Dokumentationsworkflow erstellt und lädt bei Pushes und Pull Requests ein Prüf-Artefakt hoch; er überschreibt nicht die versionierte Produktionswebsite. Die bestehende Bereitstellung für mehrere Versionen muss mit den Maintainer:innen abgestimmt werden, bevor die Deployment-Konfiguration geändert wird.
