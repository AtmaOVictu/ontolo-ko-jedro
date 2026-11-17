# ontolo-ko-jedro · predstavitvena plast ONTOMATEMATIKA

> Spletni prikazovalnik sistema ONTOMATEMATIKA. Vloga razglašena v [CANONICAL.md](CANONICAL.md).

## Kaj je to

Predstavitvena plast (React · Vite + TypeScript + shadcn/ui + Tailwind) za sistem ONTOMATEMATIKA: Pojmovnik (leksikon pojmov), Manifest, Etika ∧ posamezne strani pojmov.

Ta repozitorij **izrisuje**; ne vsebuje ontološke logike. Kanonska vsebina živi v korpusu: [Atmavictu/canon](https://github.com/AtmaOVictu/Atmavictu/tree/main/canon). Podatki o pojmovih, prikazani trenutno, so vgrajeni predstavitveni podatki; na poti je, da jih izrisovalnik prebere iz korpusa.

## Razvoj

```sh
npm install
npm run dev        # krajevni razvojni strežnik
npm run build      # produkcijska izgradnja
npm run lint
```

## Strani

| Pot | Stran |
|---|---|
| `/` | Kazalo · pregled sistema |
| `/manifest` | Manifest |
| `/pojmovnik` | Pojmovnik (10 pojmov) |
| `/pojmovnik/:slug` | Posamezen pojem |
| `/etika` | Etika |

## Hierarhija sistema

Celotna hierarhija repozitorijev ∧ zapisnik odločitve o zložbi/neodvisnosti: [CANONICAL.md](CANONICAL.md).
