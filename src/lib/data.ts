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
  /** Waga pracy na wadze przy zgłoszeniu — podstawa rozliczenia. */
  kg: number;
  etap: 1 | 2;
  cena: number;
  data: string;
  termin: string;
  dostawa: Dostawa;
  /** Szacowane zużycie szkliwa w tym wypale (ml lub g wg typu szkliwa). */
  zuzycieSzkliwa?: number;
};

export const wypaly: Wypal[] = [
  { id: "W-1041", klient: "Marta Kowal", praca: "Kubek z uchem", glina: "Kamionka biała", szkliwo: "Celadon", typ: "standard", status: "do odbioru", kg: 0.55, etap: 2, cena: 18, data: "2026-10-30", termin: "2026-11-13", dostawa: "odbiór", zuzycieSzkliwa: 60 },
  { id: "W-1042", klient: "Jan Wiśniewski", praca: "Misa 24 cm", glina: "Kamionka czerwona", szkliwo: "Tenmoku", typ: "ASAP", status: "w piecu", kg: 1.0, etap: 2, cena: 42, data: "2026-11-02", termin: "2026-11-05", dostawa: "odbiór", zuzycieSzkliwa: 120 },
  { id: "W-1043", klient: "Ola Nowak", odbiorca: "Restauracja Zielnik", praca: "Zestaw 4 talerzy", glina: "Porcelana", szkliwo: "Przezroczyste", typ: "standard", status: "zaplanowane", kg: 1.6, etap: 2, cena: 64, data: "2026-11-04", termin: "2026-11-18", dostawa: "wysyłka", zuzycieSzkliwa: 200 },
  { id: "W-1044", klient: "Marta Kowal", praca: "Wazon", glina: "Kamionka biała", szkliwo: "Shino", typ: "zlecony", status: "przyjęte", kg: 2.5, etap: 1, cena: 55, data: "2026-11-05", termin: "2026-11-19", dostawa: "odbiór", zuzycieSzkliwa: 90 },
  { id: "W-1045", klient: "Piotr Zieliński", praca: "Doniczka", glina: "Kamionka czerwona", szkliwo: "—", typ: "standard", status: "rozliczone", kg: 0.6, etap: 1, cena: 20, data: "2026-10-27", termin: "2026-11-10", dostawa: "odbiór" },
  { id: "W-1046", klient: "Kasia Mróz", odbiorca: "Prezent dla mamy", praca: "Czarka do herbaty", glina: "Porcelana", szkliwo: "Celadon", typ: "ASAP", status: "przyjęte", kg: 0.4, etap: 2, cena: 25, data: "2026-11-02", termin: "2026-11-05", dostawa: "wysyłka", zuzycieSzkliwa: 40 },
  { id: "W-1040", klient: "Ola Nowak", praca: "Dzbanek", glina: "Kamionka biała", szkliwo: "Celadon", typ: "standard", status: "do wysyłki", kg: 0.9, etap: 2, cena: 38, data: "2026-10-25", termin: "2026-11-08", dostawa: "wysyłka", zuzycieSzkliwa: 110 },
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
  { id: 1, imie: "Marta Kowal", email: "marta@example.com", abonament: "Open studio", waznosc: "2026-11-30", status: "aktywny", prace: 3, przychod: 215, doZaplaty: 128.8 },
  { id: 2, imie: "Jan Wiśniewski", email: "jan.w@example.com", abonament: "Pakiet 10h", waznosc: "2026-12-15", status: "aktywny", prace: 2, przychod: 164, doZaplaty: 63 },
  { id: 3, imie: "Ola Nowak", email: "ola@example.com", abonament: "Open studio", waznosc: "2026-11-05", status: "wygasa", prace: 4, przychod: 318, doZaplaty: 0 },
  { id: 4, imie: "Piotr Zieliński", email: "piotr.z@example.com", abonament: "Jednorazowo", waznosc: "—", status: "nieaktywny", prace: 1, przychod: 20, doZaplaty: 0 },
  { id: 5, imie: "Kasia Mróz", email: "kasia@example.com", abonament: "Pakiet 10h", waznosc: "2027-01-10", status: "aktywny", prace: 1, przychod: 25, doZaplaty: 37.5 },
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

/** Cennik pracowni — rozliczenie za kilogram, nie za sztukę. */
export type Cennik = {
  glinaKg: number;
  biskwitKg: number;
  szkliwnyKg: number;
  asapProcent: number;
  /** Szkliwa pracowni: cena za porcję (ml dla fluidowych, g dla proszkowych). */
  szkliwa: { nazwa: string; typ: "fluidowe" | "proszkowe"; porcja: number; jednostka: "ml" | "g"; cena: number }[];
  /** Po ilu dniach od 100% praca na półce zaczyna „leżeć za długo”. */
  limitPolkiDni: number;
};

export const cennik: Cennik = {
  glinaKg: 18,
  biskwitKg: 30,
  szkliwnyKg: 40,
  asapProcent: 50,
  szkliwa: [
    { nazwa: "Celadon", typ: "fluidowe", porcja: 50, jednostka: "ml", cena: 8 },
    { nazwa: "Tenmoku", typ: "fluidowe", porcja: 50, jednostka: "ml", cena: 9 },
    { nazwa: "Przezroczyste", typ: "fluidowe", porcja: 50, jednostka: "ml", cena: 6 },
    { nazwa: "Shino", typ: "proszkowe", porcja: 50, jednostka: "g", cena: 7 },
    { nazwa: "Amaco Potter's Choice", typ: "fluidowe", porcja: 50, jednostka: "ml", cena: 12 },
  ],
  limitPolkiDni: 30,
};

/** Progres wypału w czasie: standard 7 dni 80%, 10 dni 90%, 14 dni 100%; ASAP 3/4/5 dni. */
export function progresWypalu(dataOddania: string, asap: boolean, dzis = "2026-11-02") {
  const dni = Math.round((new Date(dzis).getTime() - new Date(dataOddania).getTime()) / 86400000);
  const [d80, d90, d100] = asap ? [3, 4, 5] : [7, 10, 14];
  if (dni >= d100) return { procent: 100, dni, naPolce: dni - d100 };
  if (dni >= d90) return { procent: 90, dni, naPolce: 0 };
  if (dni >= d80) return { procent: 80, dni, naPolce: 0 };
  return { procent: Math.max(5, Math.round((dni / d80) * 70)), dni, naPolce: 0 };
}

export type StatusPracy = "przed 1 wypałem" | "1 wypał in progress" | "biskwit odebrany" | "2 wypał in progress" | "gotowe";
export type Wypal1 = { data: string; kg: number; cienka: boolean; asap: boolean; tylko1: boolean };
export type Wypal2 = { data: string; kg: number; asap: boolean; szkliwa: string[]; wlasneSzkliwa: boolean };
export type Praca = {
  id: number;
  tytul: string;
  co: string;
  metoda: string;
  status: StatusPracy;
  utworzono: string;
  glinaKg: number;
  wypal1?: Wypal1;
  wypal2?: Wypal2;
  notatka: string;
  tagi: string[];
  zadania: string[];
};

export const mojePrace: Praca[] = [
  { id: 1, tytul: "Kubek z uchem", co: "kubek", metoda: "lepienie", status: "biskwit odebrany", utworzono: "2026-10-12", glinaKg: 0.8, wypal1: { data: "2026-10-18", kg: 0.55, cienka: true, asap: false, tylko1: false }, notatka: "Biskwit gotowy, odebrany z półki B3.", tagi: ["kubek", "lepienie"], zadania: ["Przeszlifować stopkę", "Nałożyć celadon 2 warstwy", "Zgłosić do 2. wypału"] },
  { id: 2, tytul: "Wazon", co: "wazon", metoda: "wałki", status: "przed 1 wypałem", utworzono: "2026-11-01", glinaKg: 2.5, notatka: "Doklejona szyjka, pod folią na półce A1.", tagi: ["wazon", "wałki"], zadania: ["Sprawdzić czy równo schnie", "Retusz łączenia"] },
  { id: 3, tytul: "Misa 24 cm", co: "misa", metoda: "toczenie", status: "2 wypał in progress", utworzono: "2026-10-05", glinaKg: 1.6, wypal1: { data: "2026-10-10", kg: 1.1, cienka: false, asap: false, tylko1: false }, wypal2: { data: "2026-10-28", kg: 1.0, asap: true, szkliwa: ["Tenmoku"], wlasneSzkliwa: false }, notatka: "ASAP na prezent.", tagi: ["misa", "toczenie"], zadania: [] },
  { id: 4, tytul: "Miseczka", co: "miseczka", metoda: "lepienie", status: "gotowe", utworzono: "2026-09-20", glinaKg: 0.5, wypal1: { data: "2026-09-28", kg: 0.35, cienka: true, asap: false, tylko1: false }, wypal2: { data: "2026-10-06", kg: 0.32, asap: false, szkliwa: ["Celadon"], wlasneSzkliwa: false }, notatka: "Po wypale szkliwnym. Odebrana.", tagi: ["miseczka", "lepienie"], zadania: [] },
];

export type PozycjaRachunku = { id: string; pracaId: number; praca: string; data: string; opis: string; ilosc: string; kwota: number; oplacone: boolean };

/** Rachunek członka wyliczany z prac: glina, 1. wypał (biskwit), 2. wypał (szkliwny) + szkliwa pracowni, dopłata ASAP. */
export function rachunekZPrac(prace: Praca[], c: Cennik, oplacone: Set<string> = new Set(["G-4", "W1-4", "W2-4", "S-4-Celadon"])): PozycjaRachunku[] {
  const r: PozycjaRachunku[] = [];
  const asapMnoznik = 1 + c.asapProcent / 100;
  for (const p of prace) {
    r.push({ id: `G-${p.id}`, pracaId: p.id, praca: p.tytul, data: p.utworzono, opis: "Glina z pracowni", ilosc: `${p.glinaKg} kg × ${c.glinaKg} zł`, kwota: +(p.glinaKg * c.glinaKg).toFixed(2), oplacone: oplacone.has(`G-${p.id}`) });
    if (p.wypal1) {
      const m = p.wypal1.asap ? asapMnoznik : 1;
      r.push({ id: `W1-${p.id}`, pracaId: p.id, praca: p.tytul, data: p.wypal1.data, opis: `1. wypał (biskwit)${p.wypal1.asap ? " ASAP" : ""}`, ilosc: `${p.wypal1.kg} kg × ${c.biskwitKg} zł${p.wypal1.asap ? ` × ${asapMnoznik}` : ""}`, kwota: +(p.wypal1.kg * c.biskwitKg * m).toFixed(2), oplacone: oplacone.has(`W1-${p.id}`) });
    }
    if (p.wypal2) {
      const m = p.wypal2.asap ? asapMnoznik : 1;
      r.push({ id: `W2-${p.id}`, pracaId: p.id, praca: p.tytul, data: p.wypal2.data, opis: `2. wypał (szkliwny)${p.wypal2.asap ? " ASAP" : ""}`, ilosc: `${p.wypal2.kg} kg × ${c.szkliwnyKg} zł${p.wypal2.asap ? ` × ${asapMnoznik}` : ""}`, kwota: +(p.wypal2.kg * c.szkliwnyKg * m).toFixed(2), oplacone: oplacone.has(`W2-${p.id}`) });
      if (!p.wypal2.wlasneSzkliwa) {
        for (const nazwa of p.wypal2.szkliwa) {
          const sz = c.szkliwa.find((x) => x.nazwa === nazwa);
          if (sz) r.push({ id: `S-${p.id}-${nazwa}`, pracaId: p.id, praca: p.tytul, data: p.wypal2.data, opis: `Szkliwo pracowni: ${nazwa}`, ilosc: `1 porcja (${sz.porcja} ${sz.jednostka})`, kwota: sz.cena, oplacone: oplacone.has(`S-${p.id}-${nazwa}`) });
        }
      }
    }
  }
  return r.sort((a, b) => b.data.localeCompare(a.data));
}

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
  { id: 1, tytul: "Kurs garncarstwa (2 godz.)", data: "Sob 8 lis, 10:00", miejsca: 3, cena: 249, opis: "Toczenie na kole od zera, jedna praca do wypału w cenie." },
  { id: 2, tytul: "Malowanie ceramiki", data: "Nd 16 lis, 12:00", miejsca: 0, cena: 99, opis: "Biskwit, angoby i szkliwa pracowni, bez doświadczenia." },
  { id: 3, tytul: "1-miesięczne toczenie (4 × 2 godz.)", data: "Od wt 18 lis, 18:00", miejsca: 4, cena: 679, opis: "Cztery spotkania co tydzień, materiały i wypały w cenie." },
  { id: 4, tytul: "Intensywny kurs garncarstwa (3 dni)", data: "Pt–nd 28–30 lis", miejsca: 2, cena: 1249, opis: "Trzy pełne dni: toczenie, toczenie, szkliwienie." },
  { id: 5, tytul: "Cotygodniowe zajęcia ceramiczne", data: "Czw 19:00, miesiąc", miejsca: 6, cena: 399, opis: "Dorośli i młodzież, stałe miejsce w grupie." },
  { id: 6, tytul: "Urodzinki dla dzieci", data: "Termin do ustalenia", miejsca: 9, cena: 200, opis: "Od 200 zł, grupa do 8 dzieci, lepienie i malowanie." },
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
