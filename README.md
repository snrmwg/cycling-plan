# cycling-plan

Offline-Anzeige für Indoor-Cycling-Stunden auf dem Tablet. Eine HTML-Datei, keine Abhängigkeiten, kein Server.

Zeigt den aktuellen Abschnitt groß mit Countdown, darunter den nächsten. Die letzten 10 Sekunden färbt sich die Uhr gelb, die letzten 3 Sekunden rot.

## Bedienung

Eine feste Leiste mit großen Tasten, für verschwitzte Finger. Auf die Anzeige selbst zu tippen löst nichts aus.

| Taste | Wirkung |
|---|---|
| ↶ rückgängig | nimmt die letzte Aktion zurück, beliebig oft |
| −30 / +30 | verkürzt oder verlängert den laufenden Abschnitt, etwa wenn der Song abweicht |
| ◀ zurück | startet den Abschnitt neu; in den ersten 3 Sekunden geht es zum vorherigen |
| Start / Pause | groß in der Mitte; in der Pause steht ein gelbes PAUSE-Schild |
| ▶ weiter | nächster Abschnitt |
| ☰ Liste | alle Abschnitte mit Startzeit, antippen springt dorthin |

Oben: „Plan“ zum Bearbeiten, Einfügen oder Laden einer Textdatei, „Vollbild“ blendet die Browserleiste aus.

Der Lauf wird laufend gespeichert. Lädt der Browser neu, geht es an derselben Stelle weiter, die Zeit dazwischen wird abgezogen. Während der Countdown läuft, hält die Seite den Bildschirm wach, sofern der Browser das unterstützt.

## Planformat

Eine Zeile pro Abschnitt: Dauer, dann Abschnitt und Details, getrennt durch `|`.

```
Titel: Berg und Sprint

3:30  Warm-up | sitzend, locker | 85–95 RPM | Z1
3:45  Berg | stehend ab dem Refrain | 60–70 RPM | Z4
0:30  Sprint | alles raus | Z5
```

- Dauer als `m:ss` oder in Minuten (`4`, `2,5`)
- `Z1` bis `Z5` färbt den Abschnitt (violett, blau, grün, gelb, rot)
- `#` am Zeilenanfang ist ein Kommentar

Den Plan kann man in Markor als `.txt` schreiben und über „Plan > Datei öffnen“ laden.

## Musik-Modus (`musik.html`)

Die Seite spielt die Musik selbst ab. Die Zeit im Song ist die einzige Uhr: Pause, Spulen und Songwechsel wirken auf Musik und Choreo zugleich. Oben ein Songverlauf wie in einer Musik-App mit den Choreo-Abschnitten als Farbfelder, darunter groß der aktuelle Abschnitt und der Countdown bis zum nächsten Wechsel. Tipp auf den Songverlauf springt dorthin. Erreichbar über „Musik“ in der Timer-Ansicht.

Planformat: pro Song eine Kopfzeile, darunter Zeitmarken im Song, wie sie in der Choreo stehen.

```
Titel: Ride or die #01

## Beggin' – Måneskin | yt:ZWKpPDI1M-o | 3:32
0:00  SITZEN | Intro 6×8 | Z2
0:35  einzählen | → STEHEN
0:39  STEHEN | 8×8 | Z4
```

- Kopfzeile: `## Titel | YouTube-Link oder yt:ID | Dauer`; Dauer ist optional, der Player misst sie
- `einzählen` (oder `4–3–2–1`) als Abschnitt wird weiß hervorgehoben
- Ohne Marke bei `0:00` beginnt der Song mit seinem Titel als Abschnitt

Woher der Ton kommt:

- **Lokale Datei**, wenn eine unter „Songs“ geladen ist. Läuft offline. Zuordnung über die YouTube-ID im Dateinamen (`Titel [ID].m4a`, wie yt-dlp sie benennt) oder über den Songtitel (wie NewPipe sie benennt). Die Dateien liegen in der IndexedDB des Browsers.
- **YouTube**, sonst. Braucht Internet. Im WebView-Browser (Jelly) startet der Ton erst nach einem Tipp ins Video; danach steuert die Seite allein. Die Seite zeigt dann „Kein Ton? Einmal ins Video tippen.“

Plan und Dateien gelten je Adresse: Was unter `localhost` geladen ist, fehlt unter GitHub Pages und umgekehrt.

## Aufs Tablet

Läuft als installierbare Web-App über GitHub Pages: https://snrmwg.github.io/cycling-plan/

Einmal im Browser öffnen, dann „Zum Startbildschirm hinzufügen“. Ein Service Worker hält die Seite danach offline vor; eine neue Version ist beim übernächsten Start aktiv. Pläne liegen nur im Browser des Geräts (localStorage), nicht im Repo.

Als lokale Datei (`file://`) geht es auf dem Tablet nicht: Der LineageOS-Browser hat keine Speicherberechtigung.
