# Leistung und Speicher

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/guides/performance/

## Arbeitslast messen

Vergleiche repräsentative Dokumente mit derselben Node.js-Version, denselben Schriften und Eingabedaten. Erfasse Median und hohe Latenzwerte, Spitzenspeicherverbrauch, Seitenzahl und Ausgabegröße. Miss den Kaltstart und das Laden der Schriften getrennt von wiederholten Renderdurchläufen. Vergleiche Dokumente mit vielen Tabellen, langem Text und vielen Bildern separat.

**JavaScript**

```js
const start = performance.now();
const bytes = await pdfmake.createPdf(makeFreshDefinition()).getBuffer();
console.log({ milliseconds: performance.now() - start, bytes: bytes.length });
```

**TypeScript**

```ts
const start = performance.now();
const bytes = await pdfmake.createPdf(makeFreshDefinition()).getBuffer();
console.log({ milliseconds: performance.now() - start, bytes: bytes.length });
```

`makeFreshDefinition()` ist eine eigene Factory-Funktion. Verwende keine Dokumentdefinition wieder, die das Layout bereits verändert hat. Prüfe neben der Geschwindigkeit auch den Text, die Seitenzahlen und repräsentative gerenderte Seiten.

## Vermeidbare Arbeit reduzieren

- Lege wiederholte Bilder im Wörterbuch `images` ab und verweise über ihren Schlüssel darauf. Skaliere große Quelldateien vor dem Einbetten; die Anzeigemaße verkleinern nicht die ursprünglichen Bilddaten.
- Verwende feste Breiten, wenn dein Layout es zulässt. Inhaltsabhängige `auto`-Breiten erfordern Textmessungen; miss die Leistung, bevor du Tabellen neu gestaltest.
- Registriere Schriften einmal. Liefere in Browseranwendungen nur die benötigten Schriftfamilien und Varianten aus.
- Lass `fontLayoutCache` aktiviert, sofern kein gemessenes Kompatibilitätsproblem das Deaktivieren erfordert. Siehe [Rendering-Optionen](/docs/0.3/de/options/).
- Vermeide Base64, wenn deine API binäre PDF-Bytes zurückgeben kann. Base64 stellt je drei Bytes mit vier Zeichen dar und legt außerdem eine Zeichenfolge im Speicher an.
- Verwende `write()` oder verarbeite Streams direkt, um den zusätzlichen zusammengefügten Buffer von `getBuffer()` zu vermeiden, wenn du nur eine Datei oder einen Stream benötigst. Das Layout wird trotzdem vor der Ausgabe berechnet.

## Parallelität steuern

Mehr gleichzeitige PDF-Aufträge können den Speicherverbrauch und die Verzögerungen der Event-Loop erhöhen. Begrenze die Zahl paralleler Renderdurchläufe und teste die Auslastung, statt nur eine Anfrage zu messen. Verwende Worker-Threads oder separate Prozesse, wenn blockierende Arbeit die Reaktionsfähigkeit der API beeinträchtigt. Ändere veränderliche Singleton-Konfiguration nicht pro Anfrage.

## Benchmark für die Bibliotheksentwicklung

Der Verbesserungszweig der Bibliothek enthält `npm run benchmark:text`, ausführbar nach `npm run build:node`. Der Benchmark vergleicht das Abflachen von Text-Arrays mit dem vorherigen Algorithmus anhand deterministischer gemischter Eingaben und prüft, ob die Ergebnisse übereinstimmen. Die optimierte Schleife vermeidet wiederholtes Kopieren von Präfixen. Der gemessene Geschwindigkeitsgewinn betrifft nur diese Hilfsfunktion; er sagt nichts über die Gesamtdauer der PDF-Erzeugung aus.

Zeitgrenzwerte sind bewusst nicht Teil von CI, da gemeinsam genutzte Runner unzuverlässige Messwerte liefern. Verwende Korrektheitstests als Freigabekriterium und halte Benchmark-Ergebnisse mit den Umgebungsdetails zur Prüfung fest.
