# dev/

Strony testowe silnika 3D. Nie są częścią książki — nie ma do nich linków ze
spisu treści i nie trafiają do nawigacji.

- `test-widgetow.html` — po jednym widgecie z każdej fabryki `sky3d.js`
  (niebo, chmura, lob rozpraszania, diagram). Do sprawdzenia, czy moduł
  w ogóle wstaje po zmianie.
- `test-chmury.html` — wszystkie presety chmur obok siebie. Do dostrajania
  `CLOUD_PRESETS`: jeśli zmienisz jeden parametr, tu widać, co się zepsuło
  w pozostałych dziewięciu.

Wymagają serwera (widgety to moduły ES, `file://` zablokuje import):

    python3 -m http.server 8000

potem `http://localhost:8000/dev/test-widgetow.html`.
