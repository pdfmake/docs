+++
title = "Tabellen"
description = "Erstelle Tabellen mit einheitlichen Zeilen, wiederholten Kopfzeilen, benutzerdefinierten Rahmen, Breiten und verbundenen Zellen."
weight = 2030
alwaysopen = true
sourceDigest = "c80db33fd2025ca3fdc93880f47e52e7b8169c0b5a2901a4156cd2d208073487"
+++

## Mit Zeilen und wiederholter Kopfzeile beginnen

Verwende eine Tabelle, wenn Zellen verschiedener Zeilen ausgerichtet werden sollen. `body` ist ein Array mit Zeilen-Arrays. Jede Zeile muss dieselbe Anzahl von Zellen enthalten; Zellen können Text oder andere pdfmake-Knoten enthalten. `headerRows: 1` wiederholt die erste Zeile, wenn die Tabelle auf einer neuen Seite fortgesetzt wird.

{{< example id="tables" >}}

## Breiten auswählen

| Breite | Bedeutung | Geeignet, wenn |
| --- | --- | --- |
| Eine Zahl, zum Beispiel `80` | Feste Punkte | Codes, Mengen oder eine Spalte mit vorhersehbaren Beschriftungen |
| `'*'` | Verbleibende Breite teilen | Eine Beschreibung den verfügbaren Platz ausfüllen soll |
| `'auto'` | Inhalt messen | Kurze Beschriftungen nur die benötigte Breite belegen sollen |
| Prozentangabe als Zeichenfolge | Prozentuale Breite | Ein proportionales Layout erforderlich ist; gemischte Breiten sorgfältig prüfen |

Rahmen, Innenabstände, Seitenränder und andere Spalten belegen ebenfalls Platz. Beginne mit festen Breiten und Sternbreiten und verwende `auto`, wenn eine inhaltsabhängige Größe beabsichtigt ist. Vermeide große feste Breiten, die den Inhaltsbereich überschreiten.

## Tabellen- und Zellfelder

| Feld | Ebene | Typ / Zweck |
| --- | --- | --- |
| `body` | `table` | Nichtleere Zeilen-Arrays |
| `widths` | `table` | Breitenangaben, eine pro Spalte |
| `headerRows` | `table` | Anzahl der ersten Zeilen, die als Kopfzeile wiederholt werden |
| `dontBreakRows` | `table` | Verhindert, dass eine einzelne Zeile auf mehrere Seiten aufgeteilt wird |
| `keepWithHeaderRows` | `table` | Anzahl der folgenden Zeilen, die zusammen mit der Kopfzeile gehalten werden |
| `layout` | Knoten neben `table` | Name eines integrierten Layouts, registrierter eigener Name oder Layoutobjekt |
| `tableAlignment` | Knoten neben `table` | Horizontale Ausrichtung der gesamten Tabelle: `left`, `center`, `right`; seit 0.3.13 |
| `colSpan`, `rowSpan` | Zelle | Positive Anzahl der überspannten Spalten/Zeilen; Platzhalter sind weiterhin erforderlich |
| `verticalAlignment` | Zelle | `'top'` (Standard), `'middle'` oder `'bottom'` |
| `border` | Zelle | Vier boolesche Werte: links, oben, rechts, unten |
| `borderColor` | Zelle | Vier Farben in derselben Reihenfolge |
| `fillColor` | Zelle | Hintergrundfarbe oder unterstütztes Mustertupel |
| `fillOpacity` | Zelle | Numerische Deckkraft des Hintergrunds |
| `overlayPattern`, `overlayOpacity` | Zelle | Mustertupel und numerische Deckkraft, die über den Inhalt gelegt werden |

Eine Zeile zusammenzuhalten sorgt nicht dafür, dass eine übergroße Zeile auf eine Seite passt. Prüfe lange Beschreibungen und verschachtelten Inhalt mit deiner tatsächlichen Seitengröße und deinen Schriften.

## Die gesamte Tabelle ausrichten

**Seit 0.3.13.** Setze `tableAlignment` am Knoten neben `table`. Unterstützt werden `left` (Standard), `center` und `right`. Damit wird die gesamte Tabelle innerhalb der verfügbaren Breite positioniert; `alignment` steuert unabhängig davon den Text in den Zellen.

```js
var docDefinition = {
  content: [{
    tableAlignment: 'center',
    alignment: 'left',
    table: {
      widths: ['auto', 'auto'],
      body: [['Item', 'Quantity'], ['Example', '2']]
    }
  }]
};
```

Das Beispiel zentriert die Tabelle und lässt den Text linksbündig. Mit `tableAlignment: 'right'` wird die Tabelle rechts ausgerichtet. Die Ausrichtung ist sichtbar, wenn die Tabelle schmaler als ihre verfügbare Breite ist, beispielsweise mit `auto` oder festen Spaltenbreiten. Tabellen, die diese Breite ausfüllen oder überschreiten, bleiben links. Seitenränder sowie die umgebende Spalte oder Tabellenzelle bestimmen die verfügbare Breite.

## Zellen verbinden, ohne die Zeilenlänge zu ändern

```js
var dd = {
  content: [{
    table: {
      widths: ['*', '*', '*'],
      body: [
        [{ text: 'A heading across three columns', colSpan: 3, bold: true }, {}, {}],
        [{ text: 'Two rows', rowSpan: 2 }, 'A', 'B'],
        [{}, 'C', 'D']
      ]
    }
  }]
};
```

Die leeren Objekte belegen die von einer Zelle überspannten Plätze. Ohne sie ist eine Zeile nicht einheitlich. Verwende `undefined` nicht als Platzhalter. Das [Playground-Beispiel zu Zellüberspannungen](/docs/0.3/de/playground/?example=spans) zeigt diese Definition.

## Integriertes Layout verwenden

Die Layouts `noBorders`, `headerLineOnly` und `lightHorizontalLines` stehen unter ihrem Namen zur Verfügung. Setze `layout` neben `table`, nicht innerhalb davon:

```js
var dd = {
  content: [{
    layout: 'lightHorizontalLines',
    table: { headerRows: 1, widths: ['*', 'auto'], body: [['Item', 'Qty'], ['Notebook', 3]] }
  }]
};
```

## Eigenes Layout registrieren

Registriere Layouts, bevor du das Dokument erstellst. Verwende in Node.js dein konfiguriertes `pdfmake`-Singleton und im Browser `pdfMake`.

```js
pdfMake.addTableLayouts({
  compact: {
    hLineWidth: function (index, node) {
      return index === node.table.headerRows ? 1 : 0;
    },
    vLineWidth: function () { return 0; },
    hLineColor: function () { return '#b7cfc4'; },
    paddingLeft: function () { return 6; },
    paddingRight: function () { return 6; }
  }
});

var dd = {
  content: [{ layout: 'compact', table: { headerRows: 1, body: [['Item', 'Qty'], ['Notebook', 3]] } }]
};
```

Das Snippet setzt voraus, dass Browser-Engine und Schriften geladen sind. Eine Layoutvariable zu definieren, registriert sie noch nicht. Verwende möglichst deterministische Callbacks und ändere gemeinsam genutzte Konfiguration nicht während paralleler Node.js-Aufträge.

## Fehlerhafte Tabellen diagnostizieren

Prüfe `body`, bevor du Rahmen oder Breiten änderst: Es muss Zeilen-Arrays mit einheitlicher Länge enthalten. Prüfe anschließend die Platzhalter für überspannte Zellen. Im lokalen Verbesserungszweig nennen Diagnosen den fehlerhaften Definitionspfad und die erwartete Zellanzahl. Siehe [Fehler und Diagnose](/docs/0.3/de/guides/errors/).
