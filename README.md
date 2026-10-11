# ontolo-ko-jedro — ONTOMATEMATIKA Presentation Layer

> Web viewer for the ONTOMATEMATIKA system. Role declared in [CANONICAL.md](CANONICAL.md).

## What this is

A React (Vite + TypeScript + shadcn/ui + Tailwind) presentation layer for
the ONTOMATEMATIKA system: the Pojmovnik (concept lexicon), Manifest, Etika,
and concept detail pages.

This repository **renders**; it contains no ontology logic. Canonical
content lives in the corpus: [Atmavictu/canon](https://github.com/AtmaOVictu/Atmavictu/tree/main/canon).
Concept data currently shown is hardcoded presentation data; the roadmap is
to read it from the corpus instead.

## Development

```sh
npm install
npm run dev        # local dev server
npm run build      # production build
npm run lint
```

## Pages

| Route | Page |
|---|---|
| `/` | Index — system overview |
| `/manifest` | Manifest |
| `/pojmovnik` | Concept lexicon (10 concepts) |
| `/pojmovnik/:slug` | Concept detail |
| `/etika` | Etika |

## System hierarchy

See [CANONICAL.md](CANONICAL.md) for the full repo hierarchy and the
fold/independence decision record.
