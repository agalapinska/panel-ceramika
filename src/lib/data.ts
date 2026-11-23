export type StatusWypalu = "przyjęte" | "zaplanowane" | "w piecu" | "do odbioru" | "do wysyłki" | "rozliczone";
export type TypWypalu = "ASAP" | "standard" | "zlecony";
export type Dostawa = "odbiór" | "wysyłka";

/** Domyślny termin: 14 dni od zgłoszenia (można zmienić w dialogu). */
export const DOMYSLNY_TERMIN_DNI = 14;
export function terminDomyslny(odDaty = "2026-11-02") {
  const d = new Date(odDaty);
  d.setDate(d.getDate() + DOMYSLNY_TERMIN_DNI);
  return d.toISOString().slice(0, 10);
}

export type Wypal = {
  id: string;
  klient: string;
  /** Komu praca ma trafić, jeśli nie do klienta (zamówienie dla kogoś). */
  odbiorca?: string;
  praca: string;
  glina: string;
  szkliwo: string;
  typ: TypWypalu;
  status: StatusWypalu;
  cena: number;
  data: string;
  termin: string;
  dostawa: Dostawa;
  /** Szacowane zużycie szkliwa w tym wypale (ml lub g wg typu szkliwa). */
  zuzycieSzkliwa?: number;
};

export const wypaly: Wypal[] = [
  { id: "W-1041", klient: "Marta Kowal", praca: "Kubek z uchem", glina: "Kamionka biała", szkliwo: "Celadon", typ: "standard", status: "do odbioru", cena: 18, data: "2026-10-30", termin: "2026-11-13", dostawa: "odbiór", zuzycieSzkliwa: 60 },
  { id: "W-1042", klient: "Jan Wiśniewski", praca: "Misa 24 cm", glina: "Kamionka czerwona", szkliwo: "Tenmoku", typ: "ASAP", status: "w piecu", cena: 42, data: "2026-11-02", termin: "2026-11-05", dostawa: "odbiór", zuzycieSzkliwa: 120 },
  { id: "W-1043", klient: "Ola Nowak", odbiorca: "Restauracja Zielnik", praca: "Zestaw 4 talerzy", glina: "Porcelana", szkliwo: "Przezroczyste", typ: "standard", status: "zaplanowane", cena: 64, data: "2026-11-04", termin: "2026-11-18", dostawa: "wysyłka", zuzycieSzkliwa: 200 },
  { id: "W-1044", klient: "Marta Kowal", praca: "Wazon", glina: "Kamionka biała", szkliwo: "Shino", typ: "zlecony", status: "przyjęte", cena: 55, data: "2026-11-05", termin: "2026-11-19", dostawa: "odbiór", zuzycieSzkliwa: 90 },
  { id: "W-1045", klient: "Piotr Zieliński", praca: "Doniczka", glina: "Kamionka czerwona", szkliwo: "—", typ: "standard", status: "rozliczone", cena: 20, data: "2026-10-27", termin: "2026-11-10", dostawa: "odbiór" },
  { id: "W-1046", klient: "Kasia Mróz", odbiorca: "Prezent dla mamy", praca: "Czarka do herbaty", glina: "Porcelana", szkliwo: "Celadon", typ: "ASAP", status: "przyjęte", cena: 25, data: "2026-11-02", termin: "2026-11-05", dostawa: "wysyłka", zuzycieSzkliwa: 40 },
  { id: "W-1040", klient: "Ola Nowak", praca: "Dzbanek", glina: "Kamionka biała", szkliwo: "Celadon", typ: "standard", status: "do wysyłki", cena: 38, data: "2026-10-25", termin: "2026-11-08", dostawa: "wysyłka", zuzycieSzkliwa: 110 },
];

export type KategoriaZadania = "sklep" | "klient" | "asap" | "wysylka";
export const kategorieZadan: { id: KategoriaZadania; label: string; opis: string }[] = [
  { id: "sklep", label: "Zamówienia w sklepie", opis: "Z outletu i sklepu pracowni" },
  { id: "klient", label: "Zamówienia dla klientów", opis: "Prace zlecone, z odbiorcą i terminem" },
  { id: "asap", label: "Wypały ASAP", opis: "Automatycznie z kolejki wypałów" },
  { id: "wysylka", label: "Wysyłki / do odbioru", opis: "Po wypale: spakować, wydać, wysłać" },
];

export type Zadanie = {
  id: string;
  kategoria: KategoriaZadania;
  tytul: string;
  kto: string;
  termin: string;
  zrobione: boolean;
  zrodlo?: string;
};

/** Zadania ręczne; wypały ASAP i prace do odbioru/wysyłki dochodzą automatycznie z kolejki wypałów. */
export const zadaniaReczne: Zadanie[] = [
  { id: "Z-1", kategoria: "sklep", tytul: "Outlet: Kubek celadon (Marta K.) — spakować i wysłać", kto: "Anna Lis, Kraków", termin: "2026-11-04", zrobione: false, zrodlo: "outlet" },
  { id: "Z-2", kategoria: "sklep", tytul: "Outlet: Talerze porcelanowe (Ola N.) — potwierdzić płatność", kto: "Tomasz Bąk, Gdańsk", termin: "2026-11-06", zrobione: false, zrodlo: "outlet" },
  { id: "Z-3", kategoria: "klient", tytul: "Zamówić 6 kubków firmowych z logo", kto: "Kawiarnia Pora", termin: "2026-11-20", zrobione: false },
  { id: "Z-4", kategoria: "klient", tytul: "Wycena zestawu 12 misek", kto: "Restauracja Zielnik", termin: "2026-11-07", zrobione: false },
  { id: "Z-5", kategoria: "wysylka", tytul: "Odebrać kartony i folię bąbelkową", kto: "pracownia", termin: "2026-11-03", zrobione: true },
];

export const klienci = [
  { id: 1, imie: "Marta Kowal", email: "marta@example.com", abonament: "Open studio", waznosc: "2026-11-30", status: "aktywny", prace: 3, przychod: 215 },
  { id: 2, imie: "Jan Wiśniewski", email: "jan.w@example.com", abonament: "Pakiet 10h", waznosc: "2026-12-15", status: "aktywny", prace: 2, przychod: 164 },
  { id: 3, imie: "Ola Nowak", email: "ola@example.com", abonament: "Open studio", waznosc: "2026-11-05", status: "wygasa", prace: 4, przychod: 318 },
  { id: 4, imie: "Piotr Zieliński", email: "piotr.z@example.com", abonament: "Jednorazowo", waznosc: "—", status: "nieaktywny", prace: 1, przychod: 20 },
  { id: 5, imie: "Kasia Mróz", email: "kasia@example.com", abonament: "Pakiet 10h", waznosc: "2027-01-10", status: "aktywny", prace: 1, przychod: 25 },
];

export type TypPozycji = "fluidowe" | "proszkowe" | "glina";
export type Jednostka = "ml" | "g" | "kg";
export type PozycjaMagazynu = {
  nazwa: string;
  typ: TypPozycji;
  jednostka: Jednostka;
  /** Stan z ostatniego przeglądu. */
  stan: number;
  /** Średnie miesięczne zużycie z przeglądów. */
  srednia: number;
  /** Kiedy ostatnio sprawdzono stan fizycznie. */
  ostatniPrzeglad: string;
  dataZamowienia?: string;
};

/** Co ile dni aplikacja prosi o przegląd magazynu. */
export const CYKL_PRZEGLADU_DNI = 14;

export const magazyn: PozycjaMagazynu[] = [
  { nazwa: "Celadon", typ: "fluidowe", jednostka: "ml", stan: 2400, srednia: 1800, ostatniPrzeglad: "2026-10-18" },
  { nazwa: "Tenmoku", typ: "fluidowe", jednostka: "ml", stan: 600, srednia: 1200, ostatniPrzeglad: "2026-10-18" },
  { nazwa: "Shino", typ: "proszkowe", jednostka: "g", stan: 3100, srednia: 900, ostatniPrzeglad: "2026-10-18" },
  { nazwa: "Przezroczyste", typ: "fluidowe", jednostka: "ml", stan: 1100, srednia: 2200, ostatniPrzeglad: "2026-10-18" },
  { nazwa: "Kamionka biała", typ: "glina", jednostka: "kg", stan: 45, srednia: 30, ostatniPrzeglad: "2026-10-18", dataZamowienia: "2026-09-12" },
  { nazwa: "Kamionka czerwona", typ: "glina", jednostka: "kg", stan: 20, srednia: 15, ostatniPrzeglad: "2026-10-18", dataZamowienia: "2026-08-02" },
  { nazwa: "Porcelana", typ: "glina", jednostka: "kg", stan: 12, srednia: 18, ostatniPrzeglad: "2026-10-18", dataZamowienia: "2026-10-01" },
];

/** Historia przeglądów (ostatnie 3) — do statystyk. */
export type Przeglad = { data: string; stany: Record<string, number> };
export const przeglady: Przeglad[] = [
  { data: "2026-09-06", stany: { Celadon: 4100, Tenmoku: 1900, Shino: 3900, Przezroczyste: 3300, "Kamionka biała": 70, "Kamionka czerwona": 35, Porcelana: 30 } },
  { data: "2026-10-04", stany: { Celadon: 3200, Tenmoku: 1300, Shino: 3500, Przezroczyste: 2200, "Kamionka biała": 58, "Kamionka czerwona": 28, Porcelana: 21 } },
  { data: "2026-10-18", stany: { Celadon: 2400, Tenmoku: 600, Shino: 3100, Przezroczyste: 1100, "Kamionka biała": 45, "Kamionka czerwona": 20, Porcelana: 12 } },
];

export const biblioteka = [
  { szkliwo: "Celadon", glina: "Porcelana", stozek: "8", kolor: "oklch(0.78 0.06 160)", uwagi: "Seledynowy, gładki, lekko krakle na grubszej warstwie." },
  { szkliwo: "Celadon", glina: "Kamionka biała", stozek: "8", kolor: "oklch(0.72 0.05 150)", uwagi: "Ciemniejszy niż na porcelanie, matowieje na krawędziach." },
  { szkliwo: "Tenmoku", glina: "Kamionka czerwona", stozek: "9", kolor: "oklch(0.3 0.06 40)", uwagi: "Brąz z rdzawymi przełamaniami na kantach." },
  { szkliwo: "Shino", glina: "Kamionka biała", stozek: "9", kolor: "oklch(0.85 0.05 60)", uwagi: "Kremowe, pomarańczowe plamy przy redukcji." },
  { szkliwo: "Przezroczyste", glina: "Porcelana", stozek: "6", kolor: "oklch(0.95 0.01 80)", uwagi: "Czyste, błyszczące. Dobre pod podszkliwne." },
  { szkliwo: "Tenmoku", glina: "Porcelana", stozek: "9", kolor: "oklch(0.25 0.04 30)", uwagi: "Niemal czarne, bardzo błyszczące." },
];

export const tresciPracowni = [
  { typ: "instrukcja", tytul: "Zasady korzystania z pracowni open", opis: "Godziny, stanowiska, sprzątanie, co wolno a czego nie." },
  { typ: "instrukcja", tytul: "Gdzie co jest", opis: "Mapa półek: gliny, narzędzia, szkliwa, regały na prace." },
  { typ: "tutorial", tytul: "Jak zostawić pracę do wyschnięcia", opis: "Folia, półka, oznaczenie karteczką." },
  { typ: "faq", tytul: "Kiedy odbiorę pracę po wypale?", opis: "Standard: 7–10 dni. ASAP: 2–3 dni, +50% stawki." },
  { typ: "kurs", tytul: "Kurs pracowni: kubek z uchem", opis: "5 lekcji, od toczenia po szkliwienie." },
];

export const pytaniaOtwarte = [
  { autor: "Kasia Mróz", tresc: "Czy mogę użyć własnego szkliwa z domu?", data: "dziś" },
  { autor: "Jan Wiśniewski", tresc: "Gdzie są gąbki do retuszu?", data: "wczoraj" },
];

export const mojePrace = [
  { id: 1, tytul: "Kubek z uchem", status: "do szkliwienia", etap: "Biskwit gotowy, odebrany z półki B3.", zadania: ["Przeszlifować stopkę", "Nałożyć celadon 2 warstwy", "Zgłosić do wypału"], data: "30 paź" },
  { id: 2, tytul: "Wazon", status: "schnie", etap: "Doklejona szyjka, pod folią na półce A1.", zadania: ["Sprawdzić czy równo schnie", "Retusz łączenia"], data: "1 lis" },
  { id: 3, tytul: "Miseczka", status: "gotowe", etap: "Po wypale szkliwnym. Odebrana.", zadania: [], data: "20 paź" },
];

export const kursy = [
  { id: 1, tytul: "Zrób kubek", lekcje: 6, ukonczone: 4, punkty: 120, opis: "Od kulki gliny do kubka z uchem gotowego do wypału." },
  { id: 2, tytul: "Zrób talerz", lekcje: 5, ukonczone: 0, punkty: 100, opis: "Toczenie płaskich form, ranty, szkliwienie przez zanurzanie." },
  { id: 3, tytul: "Podstawy szkliwienia", lekcje: 4, ukonczone: 4, punkty: 80, opis: "Przygotowanie, nakładanie, najczęstsze błędy." },
];

export const odznaki = [
  { nazwa: "Pierwszy wypał", zdobyta: true },
  { nazwa: "Kubek mistrza", zdobyta: true },
  { nazwa: "Szkliwiarz", zdobyta: true },
  { nazwa: "Talerzysta", zdobyta: false },
  { nazwa: "Pomocna dłoń", zdobyta: false },
];

export const warsztaty = [
  { id: 1, tytul: "Toczenie dla początkujących", data: "Sob 8 lis, 10:00", miejsca: 3, cena: 180 },
  { id: 2, tytul: "Szkliwienie: efekty i błędy", data: "Nd 16 lis, 12:00", miejsca: 0, cena: 150 },
  { id: 3, tytul: "Lepienie z wałków: wazon", data: "Sob 22 lis, 10:00", miejsca: 6, cena: 160 },
];

export const wiki = [
  { dzial: "Szkliwa", tytul: "Podstawowe przepisy na szkliwa stożek 6", skrot: "Trzy sprawdzone receptury bazowe + jak je barwić." },
  { dzial: "Wypał", tytul: "Zasady wypału, żeby praca przeżyła", skrot: "Grubość ścianek, suszenie, dziurki, stopka bez szkliwa." },
  { dzial: "Wypał", tytul: "Biskwit a wypał szkliwny", skrot: "Różnice temperatur i po co dwa wypały." },
  { dzial: "Techniki", tytul: "Doklejanie ucha, żeby nie odpadło", skrot: "Szlikier, nacinanie, wilgotność obu elementów." },
  { dzial: "Kalkulatory", tytul: "Kalkulator skurczu", skrot: "Wpisz wymiar surowy i rodzaj gliny." },
];

export const galeria = [
  { autor: "Marta K.", tytul: "Kubek celadon", lajki: 12, komentarze: 3, kolor: "oklch(0.78 0.06 160)", naSprzedaz: true, cena: 90 },
  { autor: "Ola N.", tytul: "Talerze porcelanowe", lajki: 24, komentarze: 7, kolor: "oklch(0.93 0.01 80)", naSprzedaz: true, cena: 220 },
  { autor: "Jan W.", tytul: "Misa tenmoku", lajki: 8, komentarze: 1, kolor: "oklch(0.3 0.06 40)", naSprzedaz: false, cena: 0 },
  { autor: "Kasia M.", tytul: "Czarka", lajki: 5, komentarze: 0, kolor: "oklch(0.85 0.05 60)", naSprzedaz: false, cena: 0 },
];
