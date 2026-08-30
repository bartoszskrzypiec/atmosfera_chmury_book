# Atmosfera i chmury dla ciekawych

Statyczna, polskojęzyczna książka o niebie: dlaczego się zmienia, skąd biorą się
chmury i czym się od siebie różnią. Dla osoby, która lubi technologię, ale
fizyki w szkole nie polubiła — nie ma tu ani jednego wzoru w tekście głównym.

**Strona:** https://bartoszskrzypiec.github.io/atmosfera_chmury_book/

## Co jest w środku

- **24 rozdziały** w siedmiu częściach, ułożonych tak, że nic nie pojawia się,
  zanim nie ma czym tego wytłumaczyć. Atlas chmur jest dopiero czwartą częścią,
  bo „dlaczego Cumulus ma płaskie dno" wymaga wcześniej punktu rosy.
- **26 dodatków** (A–Z) dla tych, którzy chcą głębiej — tu mieszkają wzory.
- **Trzy strony terenowe** w `teren/` do otwarcia na telefonie na dworze: klucz
  do rozpoznawania chmur, kalendarz nieba i ściąga „co ta chmura zapowiada".
- Ok. **120 wizualizacji**: diagramy SVG, diagramy sterowane suwakiem,
  symulacje Canvas2D i jedenaście widgetów 3D.

## Struktura

```
index.html                          spis treści
rozdzialy/rozdzial-NN-slug.html     24 rozdziały
dodatki/dodatek-x-slug.html         26 dodatków (a–z)
teren/                              trzy strony do użytku w terenie
assets/style.css                    jeden wspólny arkusz stylów
assets/interactive.js               modale wzorów + tooltipy symboli
assets/sky3d.js                     silnik widgetów 3D
assets/vendor/                      three.js, wgrany do repo
```

## Uruchomienie

Nie ma czego budować. Otwórz `index.html` w przeglądarce albo podaj katalog
dowolnym serwerem statycznym:

```
python3 -m http.server 8000
```

Widgety 3D są modułami ES i wymagają serwera (`file://` zablokuje import) —
reszta książki działa nawet z otwartego pliku.

## Zależności

Jedna: **three.js**, wgrany do repozytorium w `assets/vendor/`, nie ładowany
z CDN-a. Poza fontami Google żadna strona nie wysyła zapytania na zewnątrz.
Książka działa offline.

## Rodzina

Ta książka korzysta z tych samych konwencji i tego samego arkusza stylów, co:

| Projekt | Strona |
|---|---|
| Ray Tracing dla Artystów Technicznych | https://bartoszskrzypiec.github.io/raytracing-book/ |
| Lookdev dla Artystów Technicznych | https://bartoszskrzypiec.github.io/lookdev-book/ |
| Pipeline dla Artystów Technicznych | https://bartoszskrzypiec.github.io/pipeline-book/ |
| PxrSurface Guide | https://bartoszskrzypiec.github.io/pxrsurface-guide/ |

Wspólny toolkit: https://github.com/bartoszskrzypiec/learning-materials
