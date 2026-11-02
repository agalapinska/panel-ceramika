export type StatusWypalu = "przyjęte" | "zaplanowane" | "w piecu" | "do odbioru" | "rozliczone";
export type TypWypalu = "ASAP" | "standard" | "zlecony";

export const wypaly = [
  { id: "W-1041", klient: "Marta Kowal", praca: "Kubek z uchem", glina: "Kamionka biała", szkliwo: "Celadon", typ: "standard" as TypWypalu, status: "do odbioru" as StatusWypalu, cena: 18, data: "2026-10-30" },
  { id: "W-1042", klient: "Jan Wiśniewski", praca: "Misa 24 cm", glina: "Kamionka czerwona", szkliwo: "Tenmoku", typ: "ASAP" as TypWypalu, status: "w piecu" as StatusWypalu, cena: 42, data: "2026-11-02" },
  { id: "W-1043", klient: "Ola Nowak", praca: "Zestaw 4 talerzy", glina: "Porcelana", szkliwo: "Przezroczyste", typ: "standard" as TypWypalu, status: "zaplanowane" as StatusWypalu, cena: 64, data: "2026-11-04" },
  { id: "W-1044", klient: "Marta Kowal", praca: "Wazon", glina: "Kamionka biała", szkliwo: "Shino", typ: "zlecony" as TypWypalu, status: "przyjęte" as StatusWypalu, cena: 55, data: "2026-11-05" },
  { id: "W-1045", klient: "Piotr Zieliński", praca: "Doniczka", glina: "Kamionka czerwona", szkliwo: "—", typ: "standard" as TypWypalu, status: "rozliczone" as StatusWypalu, cena: 20, data: "2026-10-27" },
  { id: "W-1046", klient: "Kasia Mróz", praca: "Czarka do herbaty", glina: "Porcelana", szkliwo: "Celadon", typ: "ASAP" as TypWypalu, status: "przyjęte" as StatusWypalu, cena: 25, data: "2026-11-02" },
];

export const klienci = [
  { id: 1, imie: "Marta Kowal", email: "marta@example.com", abonament: "Open studio", waznosc: "2026-11-30", status: "aktywny", prace: 3, przychod: 215 },
  { id: 2, imie: "Jan Wiśniewski", email: "jan.w@example.com", abonament: "Pakiet 10h", waznosc: "2026-12-15", status: "aktywny", prace: 2, przychod: 164 },
  { id: 3, imie: "Ola Nowak", email: "ola@example.com", abonament: "Open studio", waznosc: "2026-11-05", status: "wygasa", prace: 4, przychod: 318 },
  { id: 4, imie: "Piotr Zieliński", email: "piotr.z@example.com", abonament: "Jednorazowo", waznosc: "—", status: "nieaktywny", prace: 1, przychod: 20 },
  { id: 5, imie: "Kasia Mróz", email: "kasia@example.com", abonament: "Pakiet 10h", waznosc: "2027-01-10", status: "aktywny", prace: 1, przychod: 25 },
];

export const magazyn = [
  { nazwa: "Celadon", stan: 2.4, jednostka: "kg", srednia: 1.8, ostrzezenie: false },
  { nazwa: "Tenmoku", stan: 0.6, jednostka: "kg", srednia: 1.2, ostrzezenie: true },
  { nazwa: "Shino", stan: 3.1, jednostka: "kg", srednia: 0.9, ostrzezenie: false },
  { nazwa: "Przezroczyste", stan: 1.1, jednostka: "kg", srednia: 2.2, ostrzezenie: true },
  { nazwa: "Kamionka biała", stan: 45, jednostka: "kg", srednia: 30, ostrzezenie: false },
  { nazwa: "Porcelana", stan: 12, jednostka: "kg", srednia: 18, ostrzezenie: true },
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
