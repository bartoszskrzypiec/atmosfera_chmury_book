# Status projektu — zatrzymane na życzenie użytkownika (31.08.2026)

Ten plik jest migawką stanu prac nad książką "Atmosfera i chmury dla ciekawych".
Praca została świadomie wstrzymana tutaj — nic nie jest zepsute, nic nie czeka
w niedokończonym stanie na dysku roboczym. Gałąź `claude/atmosphere-clouds-book-ueya9e`
jest w pełni wypchnięta i spójna.

## Co jest zrobione (całość)

- **Fundament**: `assets/style.css`, `assets/interactive.js`, `CLAUDE.md`, `README.md`,
  `.gitignore`, `.nojekyll`.
- **Silnik 3D**: three.js r180 wgrany do `assets/vendor/` (nie z CDN), `assets/sky3d.js`
  z pięcioma funkcjami fabrycznymi. Wydajność naprawiona (patrz commit o diagnozie 1 FPS
  we wcześniejszej historii gałęzi) — widgety renderują na żądanie, nie w pętli.
- **24 rozdziały** (`rozdzialy/rozdzial-01..24-*.html`) — napisane, wypchnięte, sprawdzone
  pod kątem renderowania w headless Chromium.
- **26 dodatków A–Z** (`dodatki/dodatek-*.html`) — wszystkie mają treść, włącznie
  z dwoma lekkimi dodatkami CG (Y, Z) bez wzorów, zgodnie z ustaleniem.
- **3 strony terenowe** (`teren/`) — klucz do rozpoznawania chmur (interaktywne drzewo
  decyzyjne z 13 wynikami, stan w hashu URL), kalendarz nieba (12 miesięcy dla środkowej
  Polski), ściąga prognozy z nieba (sekwencje frontów, progi bezpieczeństwa przy burzy).
- **`index.html`** — spis treści wygenerowany z `dev/spis.json`, z widgetem 3D w hero.
- **Przebieg weryfikacyjny**: `dev/scaffold.py sprawdz` przechodzi czysto (linki, nawigacja,
  EXT OF w obie strony, bloki obowiązkowe, modale, fallbacki). Zero rastrów w repo. Zero
  zewnętrznych zależności poza fontami Google. `node --check` czysty na obu plikach JS.
  Fallback bez WebGL zweryfikowany na wszystkich 12 stronach z widgetem. Żadna z 54 stron
  nie przepełnia się w poziomie przy 360 px (naprawiono `.topnav` i `.value-readout`
  w `assets/style.css`).

## Przebieg wzbogacający — w toku, częściowo zrobiony

Rozdziały pierwotnie wychodziły poniżej ustalonych 2000–3500 słów / 5–8 wizualizacji.
Dopisuję do nich sekcje narzędziem `dev/dopisz.py` (wstawia przed blokiem "Z praktyki",
nie rusza istniejącej treści).

**Domknięte do progu 2000+ słów (13 z 24):** R.5, R.9, R.10, R.11, R.13, R.14, R.15,
R.17, R.19, R.20, R.21, R.23, R.24.

**Wciąż poniżej 2000 słów (11 z 24) — to jest następny krok:**

| Rozdział | Słowa | Wizualizacje |
|---|---|---|
| R.1 Ocean powietrza | 1906 | 3 |
| R.2 Gdzie kończy się niebo | 1796 | 2 |
| R.3 Rozpraszanie | 1810 | 3 |
| R.4 Oko i mózg | 1695 | 3 |
| R.6 Czerwony zachód | 1867 | 4 |
| R.7 Zmierzch | 1854 | 3 |
| R.8 Refrakcja i miraże | 1840 | 3 |
| R.12 Narodziny chmury | 1821 | 2 |
| R.16 Chmury niskie | 1633 | 2 |
| R.18 Odmiany i osobliwości | 1818 | 2 |
| R.22 Fronty | 1649 | 2 |

Metoda sprawdzona na 13 gotowych rozdziałach: dopisuję 1–3 nowe `.section`, każda
z diagramem SVG lub blokiem `.worked`/`.myth`, trzymając się rejestru "my" i zasady
zero wzorów w tekście głównym. Po każdym dopisaniu sprawdzam w headless Chromium
(`node tchk.mjs` w scratchpadzie — brak przepełnienia przy 360 px, brak etykiet SVG
poza `viewBox`, brak błędów JS) i uruchamiam `dev/scaffold.py sprawdz`.

## Co zostało do zrobienia

1. **Dokończyć przebieg wzbogacający** na 11 rozdziałach z tabeli wyżej — to jedyna
   praca merytoryczna, jaka pozostała. Reszta książki (dodatki, strony terenowe,
   index) jest kompletna i nie wymaga zmian.
2. **Promocja `assets/sky3d.js` do `learning-materials`** — nietknięta. Ta sesja miała
   do tamtego repo wyłącznie odczyt. Plan (opisany w pliku planu z wcześniejszej fazy
   projektu): spróbować dołączyć repo z prawem zapisu; jeśli się nie uda, złożyć gotowe
   pliki do skopiowania w katalogu `do-promocji-learning-materials/` w tym repozytorium
   i powiedzieć o tym wprost, zamiast markować promocję jako zrobioną.
3. Nic więcej nie jest zaplanowane — po punkcie 1 książka jest gotowa do ogłoszenia.

## Jak wznowić

Wystarczy poprosić o kontynuację przebiegu wzbogacającego, wskazując rozdział z tabeli
wyżej albo mówiąc "zrób kolejną partię". Narzędzia (`dev/dopisz.py`, licznik słów
w scratchpadzie sesji, `dev/scaffold.py sprawdz`) trzeba będzie odtworzyć w nowej sesji —
są proste (patrz historia commitów tej gałęzi za wzorzec sekcji), ale nie są zapisane
jako trwałe pliki poza `dev/dopisz.py`, który już jest w repo.
