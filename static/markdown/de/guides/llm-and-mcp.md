# LLM- und MCP-Integration

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/guides/llm-and-mcp/

## Dokumentation ohne MCP verwenden

Jede Seite ist als generiertes Markdown verfügbar. Dieselbe Quelle erzeugt:

- [llms.txt](/docs/0.3/de/llms.txt): Seitenverzeichnis mit Beschreibungen und Markdown-Links.
- [llms-full.txt](/docs/0.3/de/llms-full.txt): den vollständigen, versionierten Markdown-Korpus.
- [docs-index.json](/docs/0.3/de/docs-index.json): Seiten-IDs, Titel, Beschreibungen, Quell-URLs und vollständiges Markdown.

Diese Dateien erleichtern das Auffinden von Inhalten, garantieren aber keine Suchmaschinenindexierung oder Aufnahme in Modellindizes. Nenne im Prompt die installierte Bibliotheksversion. Bitte das Modell, die verwendete Dokumentationsseite anzugeben und Promise-basierte Ausgabemethoden zu verwenden. Die `AGENTS.md`-Datei der Bibliothek beschreibt den Quellprozess und Testbefehle für Coding-Agenten.

## Lokalen MCP-Server starten

Klone das Dokumentationsrepository, installiere die Abhängigkeiten, erzeuge den Korpus und starte den Server:

```sh
git clone https://github.com/pdfmake/docs.git
cd docs
npm ci
npm run docs:generate
node mcp/server.mjs
```

Bis zur Annahme durch das Upstream-Projekt gehört dieser Server zum lokalen Verbesserungszweig. Starte ihn über die stdio-Konfiguration deines MCP-Clients und verwende absolute Pfade:

```json
{
  "mcpServers": {
    "pdfmake-docs": {
      "command": "node",
      "args": ["/absolute/path/to/docs/mcp/server.mjs"]
    }
  }
}
```

Ersetze den Beispielpfad durch den Pfad deines Klons. In Windows-JSON-Pfaden musst du `/` oder escaped `\\` verwenden. Die Speicherorte der Clientkonfiguration unterscheiden sich. Der Server schreibt Protokollnachrichten nach stdout und Fehler nach stderr. Nach der Installation der Abhängigkeiten benötigt er weder einen API-Schlüssel noch ein Modellkonto oder eine Netzwerkverbindung.

## Werkzeuge und Ressourcen

| Funktion | Eingabe | Ergebnis |
| --- | --- | --- |
| `search_docs` | `query`, optional `limit` (1–10), optional `language` | Rangsortierte Seiten mit exakten IDs, Sprache, Version, Quell-URLs und Auszügen |
| `get_doc` | Exakte `id` aus der Suche | Vollständige Markdown-Seite |
| MCP-Ressourcen | `pdfmake://docs/0.3/de/<id>` | Dieselbe versionierte Markdown-Seite |

Der Server kann nur den mitgelieferten Dokumentationskorpus lesen. Er kann keine PDFs rendern, keinen Code auswerten, keine vom Aufrufer ausgewählten Dateisystempfade lesen und keine entfernten URLs aufrufen. Erzeuge den Korpus nach Dokumentationsänderungen erneut und starte den Server neu.

`language` akzeptiert `en` (Standard), `de`, `fr`, `es` und `pt-br`. Jede unterstützte Sprache enthält dieselbe vollständige Menge an Dokumentationsseiten. Bei der Suche werden Sprachen nicht unbemerkt vermischt. Eine übersetzte ID wie `de/learn/first-pdf` kann mit `get_doc` oder über die Ressource `pdfmake://docs/0.3/de/learn/first-pdf` abgerufen werden. Jede Sprache hat eigene Discovery-Dateien, zum Beispiel `/docs/0.3/de/llms.txt` und `/docs/0.3/de/llms-full.txt`.

## Promptvorschlag

> Ich verwende pdfmake 0.3.x in Node.js. Suche in der passenden Dokumentation, bevor du Code erzeugst. Verwende die Node-Singleton-API, registriere Schriften, konfiguriere synchrone Ressourcenrichtlinien, warte Ausgabemethoden mit await ab und nenne die verwendeten Seiten-IDs. Erstelle für jede Anfrage eine neue Dokumentdefinition.
