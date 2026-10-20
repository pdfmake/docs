# API-Übersicht

Version: pdfmake 0.3.x
Language: de
Source: https://pdfmake.github.io/docs/0.3/de/guides/api-reference/

## Einmal konfigurieren, oft rendern

Beide Einstiegspunkte stellen ein Singleton bereit. Konfiguriere Schriften, Richtlinien und Layouts beim Start der Anwendung. Ändere keine gemeinsam genutzte Konfiguration, während parallele Anfragen rendern.

| Methode | Laufzeit | Verhalten |
| --- | --- | --- |
| `addFonts(fonts)` | Beide | Schriftfamilien zusammenführen; eine angegebene Familie ersetzt die bisherige Zuordnung |
| `setFonts(fonts)` | Beide | Gesamte Schriftzuordnung ersetzen |
| `clearFonts()` | Beide | Registrierte Schriften entfernen |
| `addTableLayouts(layouts)` | Beide | Benannte Layoutfunktionen zusammenführen |
| `setTableLayouts(layouts)` | Beide | Benannte Layoutfunktionen ersetzen |
| `clearTableLayouts()` | Beide | Benutzerdefinierte Layouts entfernen |
| `setProgressCallback(callback)` | Beide | Rendering-Fortschritt empfangen; kein Profiler für das Seitenlayout |
| `setUrlAccessPolicy(callback)` | Beide, seit 0.3.6 | Ressourcen-URLs nur zulassen, wenn der Callback synchron `true` zurückgibt |
| `setLocalAccessPolicy(callback)` | Node.js, seit 0.3.8 | Lokale Ressourcen nur zulassen, wenn der Callback synchron `true` zurückgibt |
| `addVirtualFileSystem(vfs)` | Browser | Base64-Schrift- und Ressourcendaten zum virtuellen Dateisystem hinzufügen |
| `addFontContainer(container)` | Browser | Einen gebündelten Schriftcontainer registrieren |

## Rendern

`createPdf(docDefinition, options?)` akzeptiert Objekte und gibt einen Ausgabe-Wrapper zurück. Verwende [Dokumentfelder](/docs/0.3/de/document-definition-object/) im ersten Argument und [Rendering-Optionen](/docs/0.3/de/options/) im zweiten.

| Ausgabe | Node.js | Browser |
| --- | --- | --- |
| `getBuffer()`, `getBase64()`, `getDataUrl()`, `getStream()` | Ja | Ja |
| `write(filename)` | Ja | Nein |
| `download(filename?)`, `open(window?)`, `print(window?)`, `getBlob()` | Nein | Ja |

Alle Ausgabemethoden geben Promises zurück. Behandle abgelehnte Promises immer. Der `createPdf`-Wrapper selbst ist kein Promise. Details zum Lebenszyklus findest du unter [Node.js-Methoden](/docs/0.3/de/getting-started/server-side/methods/) und [Browsermethoden](/docs/0.3/de/getting-started/client-side/methods/).
