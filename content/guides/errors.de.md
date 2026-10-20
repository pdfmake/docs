+++
title = "Fehler und Diagnose"
description = "Finde JavaScript-Syntaxfehler, ungÃ¼ltige Dokumentknoten, Ressourcenfehler und unterbrochene Ausgaben anhand aussagekrÃ¤ftiger Diagnosen."
weight = 2
sourceDigest = "e4dda1a91f9ef3e34e7b45d6b46a0bc638ea75a858d155ea73e148259ff35728"
+++

## Zuerst die fehlerhafte Phase bestimmen

Eine ungÃ¼ltige Definition sollte einen Fehler auslÃ¶sen und Inhalte nicht stillschweigend auslassen. Entscheidend ist, an welcher Stelle der Fehler auftritt und wie er an deine Anwendung weitergegeben wird.

| Phase | Typischer Fehler | Wo beheben? |
| --- | --- | --- |
| JavaScript-Parsing | Fehlendes Komma, AnfÃ¼hrungszeichen oder schlieÃŸende Klammer | Quellcode-Editor; die Bibliothek wurde noch nicht aufgerufen |
| AusfÃ¼hrung der Definition | `ReferenceError` oder fehlschlagender Callback | Anwendungscode, der die Definition erstellt |
| Dokumentstruktur | Falscher Knotentyp, ungÃ¼ltige Tabellenzeilen oder Liste | Angegebener Pfad in der Definition |
| Ressourcenladen | Fehlende Schrift, abgelehnte URL, nicht lesbares Bild | Schrift-/Ressourcenregistrierung und Zugriffsrichtlinien |
| Layout/Rendering | Zu groÃŸer Inhalt, ungÃ¼ltige Abmessungen oder Callback-Fehler | Kleinste Definition, die den Fehler reproduziert |
| Ausgabe | Geschlossener Stream, Schreibrechte oder Fehler des Ziels | Fehlerbehandlung fÃ¼r Buffer, Stream oder Datei |

## Immer auf die Ausgabe warten

```js
async function generateReport(pdfmake, definition) {
  try {
    return await pdfmake.createPdf(definition).getBuffer();
  } catch (error) {
    console.error('PDF generation failed', {
      message: error.message,
      code: error.code,
      phase: error.phase,
      path: error.path
    });
    throw error;
  }
}
```

Gib einen Fehler an den API-Aufrufer zurÃ¼ck oder zeige `error.message` in der BenutzeroberflÃ¤che an. Gib keine leere PDF zurÃ¼ck und melde keinen Erfolg, nachdem die Ablehnung verschluckt wurde. Vermeide es, Dokumentinhalte oder geheime Zugangsdaten fÃ¼r Ressourcen zu protokollieren.

## Dokumentpfad lesen

Der lokale Verbesserungszweig der Bibliothek ergÃ¤nzt `PDFMAKE_INVALID_DOCUMENT`-Diagnosen mit `phase: 'preprocess'` und einer Eigenschaft `path`. Ein Beispiel:

```text
Unrecognized document structure: ...
Document path: content[0].columns[0].ul[1]
```

Der Pfad verweist auf den zweiten Listeneintrag in der ersten Spalte des ersten Hauptinhaltsknotens. PrÃ¼fe auf Tippfehler wie `{ txt: 'Hello' }` statt `{ text: 'Hello' }`. Bei fehlerhaften Tabellenzeilen werden die Zeile und die erwartete Anzahl an Zellen angegeben. Leere Tabellen melden, dass `table.body` nichtleere Zeilen-Arrays enthalten muss. Behalte `{}`-Platzhalter fÃ¼r Ã¼berspannte Zellen bei. Vorhandener Fehlertext bleibt bestehen; verwende nach MÃ¶glichkeit die Diagnosefelder statt Zeichenfolgen aus der Meldung zu parsen.

Diese strukturierten Diagnosen sind **neu im lokalen Verbesserungszweig**; das verÃ¶ffentlichte Paket 0.3.12 enthÃ¤lt sie noch nicht. Allgemeine Fehler liefern weiterhin eine Meldung. Der Zweig lehnt auÃŸerdem vorzeitig geschlossene Buffer-Streams ab, statt deren Promise unerfÃ¼llt zu lassen.

## Syntaxfehler im Playground

Der Editor parst die Definition, bevor er sie ausfÃ¼hrt, markiert die fehlerhafte Stelle und zeigt Zeile und Spalte an. **Im Editor zum Fehler springen** fokussiert die Stelle. Undo/Redo und das Fehlerfeld ermÃ¶glichen Korrekturen, ohne deine Arbeit zu verlieren. Bei Live-Vorschau bleibt die letzte erfolgreiche PDF wÃ¤hrend der Bearbeitung und nach Fehlern sichtbar; der Download ist deaktiviert, wenn die Vorschau nicht mehr zum aktuellen Quelltext passt.

## Schwierige Fehler eingrenzen

Verwende dieselben Schriften und dieselbe Laufzeit. Ersetze den Inhalt durch einen einzelnen Absatz und fÃ¼ge die BlÃ¶cke schrittweise wieder hinzu, bis das Problem erneut auftritt. PrÃ¼fe bei Tabellen zuerst ZeilenlÃ¤ngen und ZellÃ¼berspannungen, bevor du Breiten anpasst. Verwende bei Ressourcenfehlern zunÃ¤chst eine bekannte lokale Schrift und ein eingebettetes Bild. Weitere Symptome findest du unter [Fehlerbehebung](/docs/0.3/de/guides/troubleshooting/).

## Die vollständige Definition vor dem Rendern prüfen

Die lokale, unveröffentlichte API `validateDocument(input, options)` prüft alle deklarierten Dokumenteigenschaften und sammelt mehrere Fehler mit Pfaden. Zusätzlich prüft sie Tabellen, Spans, Referenzen, Zahlenbereiche und Zyklen. Sie verändert keine Eingabe, führt keine Callbacks aus und greift auf keine Ressourcen zu. Unbekannte Eigenschaften sind standardmäßig Warnungen; mit `strict: true` werden sie zu Fehlern.

```js
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

Das Ergebnis enthält `valid`, `errors`, `warnings`, `deferred` und `truncated`. Jeder Befund enthält `path`, `code`, `severity` und `message`. Standardgrenzen: 100 Befunde, 100 Verschachtelungsebenen und 50.000 untersuchte Werte. Ein ausgeschöpftes Limit meldet niemals Erfolg. Callback-Ergebnisse, Ressourcenverfügbarkeit und -dekodierung sowie das endgültige Layout werden weiterhin beim Rendern geprüft. JavaScript muss bereits syntaktisch gültig sein, bevor diese Objekt-API aufgerufen werden kann.

Übergebe `{ validation: true }` als zweites Argument an `createPdf`, um ungültige Definitionen vor dem Laden von Ressourcen abzulehnen. Ein ungültiges Dokument wirft einen `DocumentValidationError` mit `code: "PDFMAKE_VALIDATION_ERROR"`, `phase: "validation"` und einem `diagnostics`-Array. Bestehende Aufrufe bleiben kompatibel; die automatische Vorabprüfung ist optional. Der lokale Playground führt sie mit der verbesserten Library automatisch aus.
