# Fehler und Diagnose

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/guides/errors/

## Zuerst die fehlerhafte Phase bestimmen

Eine ungültige Definition sollte einen Fehler auslösen und Inhalte nicht stillschweigend auslassen. Entscheidend ist, an welcher Stelle der Fehler auftritt und wie er an deine Anwendung weitergegeben wird.

| Phase | Typischer Fehler | Wo beheben? |
| --- | --- | --- |
| JavaScript-Parsing | Fehlendes Komma, Anführungszeichen oder schließende Klammer | Quellcode-Editor; die Bibliothek wurde noch nicht aufgerufen |
| Ausführung der Definition | `ReferenceError` oder fehlschlagender Callback | Anwendungscode, der die Definition erstellt |
| Dokumentstruktur | Falscher Knotentyp, ungültige Tabellenzeilen oder Liste | Angegebener Pfad in der Definition |
| Ressourcenladen | Fehlende Schrift, abgelehnte URL, nicht lesbares Bild | Schrift-/Ressourcenregistrierung und Zugriffsrichtlinien |
| Layout/Rendering | Zu großer Inhalt, ungültige Abmessungen oder Callback-Fehler | Kleinste Definition, die den Fehler reproduziert |
| Ausgabe | Geschlossener Stream, Schreibrechte oder Fehler des Ziels | Fehlerbehandlung für Buffer, Stream oder Datei |

## Immer auf die Ausgabe warten

**JavaScript**

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

**TypeScript**

```ts
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

Gib einen Fehler an den API-Aufrufer zurück oder zeige `error.message` in der Benutzeroberfläche an. Gib keine leere PDF zurück und melde keinen Erfolg, nachdem die Ablehnung verschluckt wurde. Vermeide es, Dokumentinhalte oder geheime Zugangsdaten für Ressourcen zu protokollieren.

## Dokumentpfad lesen

Der lokale Verbesserungszweig der Bibliothek ergänzt `PDFMAKE_INVALID_DOCUMENT`-Diagnosen mit `phase: 'preprocess'` und einer Eigenschaft `path`. Ein Beispiel:

```text
Unrecognized document structure: ...
Document path: content[0].columns[0].ul[1]
```

Der Pfad verweist auf den zweiten Listeneintrag in der ersten Spalte des ersten Hauptinhaltsknotens. Prüfe auf Tippfehler wie `{ txt: 'Hello' }` statt `{ text: 'Hello' }`. Bei fehlerhaften Tabellenzeilen werden die Zeile und die erwartete Anzahl an Zellen angegeben. Leere Tabellen melden, dass `table.body` nichtleere Zeilen-Arrays enthalten muss. Behalte `{}`-Platzhalter für überspannte Zellen bei. Vorhandener Fehlertext bleibt bestehen; verwende nach Möglichkeit die Diagnosefelder statt Zeichenfolgen aus der Meldung zu parsen.

Diese strukturierten Diagnosen sind **neu im lokalen Verbesserungszweig**; das veröffentlichte Paket 0.3.12 enthält sie noch nicht. Allgemeine Fehler liefern weiterhin eine Meldung. Der Zweig lehnt außerdem vorzeitig geschlossene Buffer-Streams ab, statt deren Promise unerfüllt zu lassen.

## Syntaxfehler im Playground

Der Editor parst die Definition, bevor er sie ausführt, markiert die fehlerhafte Stelle und zeigt Zeile und Spalte an. **Im Editor zum Fehler springen** fokussiert die Stelle. Undo/Redo und das Fehlerfeld ermöglichen Korrekturen, ohne deine Arbeit zu verlieren. Bei Live-Vorschau bleibt die letzte erfolgreiche PDF während der Bearbeitung und nach Fehlern sichtbar; der Download ist deaktiviert, wenn die Vorschau nicht mehr zum aktuellen Quelltext passt.

## Schwierige Fehler eingrenzen

Verwende dieselben Schriften und dieselbe Laufzeit. Ersetze den Inhalt durch einen einzelnen Absatz und füge die Blöcke schrittweise wieder hinzu, bis das Problem erneut auftritt. Prüfe bei Tabellen zuerst Zeilenlängen und Zellüberspannungen, bevor du Breiten anpasst. Verwende bei Ressourcenfehlern zunächst eine bekannte lokale Schrift und ein eingebettetes Bild. Weitere Symptome findest du unter [Fehlerbehebung](/docs/0.3/de/guides/troubleshooting/).

## Die vollst�ndige Definition vor dem Rendern pr�fen

Die lokale, unver�ffentlichte API `validateDocument(input, options)` pr�ft alle deklarierten Dokumenteigenschaften und sammelt mehrere Fehler mit Pfaden. Zus�tzlich pr�ft sie Tabellen, Spans, Referenzen, Zahlenbereiche und Zyklen. Sie ver�ndert keine Eingabe, f�hrt keine Callbacks aus und greift auf keine Ressourcen zu. Unbekannte Eigenschaften sind standardm��ig Warnungen; mit `strict: true` werden sie zu Fehlern.

**JavaScript**

```js
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

**TypeScript**

```ts
const input = { content: [{ text: 'Report', fontSize: 'large' }] };
const report = pdfMake.validateDocument(input, { strict: true });
for (const issue of report.errors) {
  console.error(issue.path, issue.code, issue.message);
}
```

Das Ergebnis enth�lt `valid`, `errors`, `warnings`, `deferred` und `truncated`. Jeder Befund enth�lt `path`, `code`, `severity` und `message`. Standardgrenzen: 100 Befunde, 100 Verschachtelungsebenen und 50.000 untersuchte Werte. Ein ausgesch�pftes Limit meldet niemals Erfolg. Callback-Ergebnisse, Ressourcenverf�gbarkeit und -dekodierung sowie das endg�ltige Layout werden weiterhin beim Rendern gepr�ft. JavaScript muss bereits syntaktisch g�ltig sein, bevor diese Objekt-API aufgerufen werden kann.

�bergebe `{ validation: true }` als zweites Argument an `createPdf`, um ung�ltige Definitionen vor dem Laden von Ressourcen abzulehnen. Ein ung�ltiges Dokument wirft einen `DocumentValidationError` mit `code: "PDFMAKE_VALIDATION_ERROR"`, `phase: "validation"` und einem `diagnostics`-Array. Bestehende Aufrufe bleiben kompatibel; die automatische Vorabpr�fung ist optional. Der lokale Playground f�hrt sie mit der verbesserten Library automatisch aus.
