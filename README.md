# Panel Ceramika — prototyp

Prototyp aplikacji dla pracowni ceramicznych i ich członków, zbudowany na podstawie
`../PANEL-CERAMIKA-SPEC.md`. Next.js (App Router) + Tailwind 4 + shadcn/ui.

Bez logowania: na ekranie głównym wybiera się typ konta. Dane są testowe (`src/lib/data.ts`),
zmiany w interfejsie (statusy wypałów, zadania, lajki) żyją tylko w pamięci strony.

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja: http://localhost:3000

## Ekrany

- `/` — wybór typu konta
- `/pracownia` — pulpit, wypały, abonenci, magazyn, biblioteka szkliw, treści pracowni
- `/czlonek` — moje prace, kursy, warsztaty, wiki, buddy, galeria i outlet
