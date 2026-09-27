# cycling-plan

Offline-Anzeige für Indoor-Cycling-Stunden auf dem Tablet. Eine HTML-Datei, keine Abhängigkeiten, kein Server.

Zeigt den aktuellen Abschnitt groß mit Countdown, darunter den nächsten. Die letzten 10 Sekunden färbt sich die Uhr gelb, die letzten 3 Sekunden rot.

## Bedienung

- Mitte antippen: Start / Pause
- Rechts antippen: nächster Abschnitt
- Links antippen: vorheriger Abschnitt (im ersten: Abschnitt neu starten)
- „Plan“: Plan bearbeiten, einfügen oder als Textdatei öffnen
- „Vollbild“: Browserleiste ausblenden

Der Plan bleibt im Browser gespeichert. Während der Countdown läuft, hält die Seite den Bildschirm wach, sofern der Browser das unterstützt.

## Planformat

Eine Zeile pro Abschnitt: Dauer, dann Abschnitt und Details, getrennt durch `|`.

```
Titel: Berg und Sprint

3:30  Warm-up | sitzend, locker | 85–95 RPM | Z1
3:45  Berg | stehend ab dem Refrain | 60–70 RPM | Z4
0:30  Sprint | alles raus | Z5
```

- Dauer als `m:ss` oder in Minuten (`4`, `2,5`)
- `Z1` bis `Z5` färbt den Abschnitt (grau, blau, grün, gelb, rot)
- `#` am Zeilenanfang ist ein Kommentar

Den Plan kann man in Markor als `.txt` schreiben und über „Plan > Datei öffnen“ laden.

## Aufs Tablet

Läuft als installierbare Web-App über GitHub Pages: https://snrmwg.github.io/cycling-plan/

Einmal im Browser öffnen, dann „Zum Startbildschirm hinzufügen“. Ein Service Worker hält die Seite danach offline vor; eine neue Version ist beim übernächsten Start aktiv. Pläne liegen nur im Browser des Geräts (localStorage), nicht im Repo.

Als lokale Datei (`file://`) geht es auf dem Tablet nicht: Der LineageOS-Browser hat keine Speicherberechtigung.
