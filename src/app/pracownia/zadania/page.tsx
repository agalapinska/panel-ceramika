"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Flame, Truck, ShoppingBag, Users } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { wypaly, zadaniaReczne, kategorieZadan, type Zadanie, type KategoriaZadania } from "@/lib/data";

const DZIS = "2026-11-02";
const ikony: Record<KategoriaZadania, typeof Flame> = { sklep: ShoppingBag, klient: Users, asap: Flame, wysylka: Truck };

/** Zadania wyliczone z kolejki wypałów: ASAP w toku oraz prace do odbioru / wysyłki. */
function zadaniaZWypalow(): Zadanie[] {
  const z: Zadanie[] = [];
  for (const w of wypaly) {
    if (w.status === "rozliczone") continue;
    if (w.typ === "ASAP" && w.status !== "do odbioru" && w.status !== "do wysyłki") {
      z.push({ id: `A-${w.id}`, kategoria: "asap", tytul: `Wypał ASAP: ${w.praca} (${w.glina}, ${w.szkliwo})`, kto: w.odbiorca ? `${w.klient} → ${w.odbiorca}` : w.klient, termin: w.termin, zrobione: false, zrodlo: w.id });
    }
    if (w.status === "do odbioru") {
      z.push({ id: `O-${w.id}`, kategoria: "wysylka", tytul: `Przygotować do odbioru: ${w.praca}`, kto: w.klient, termin: w.termin, zrobione: false, zrodlo: w.id });
    }
    if (w.status === "do wysyłki") {
      z.push({ id: `S-${w.id}`, kategoria: "wysylka", tytul: `Spakować i wysłać: ${w.praca}`, kto: w.odbiorca ? `${w.klient} → ${w.odbiorca}` : w.klient, termin: w.termin, zrobione: false, zrodlo: w.id });
    }
    if (w.typ === "zlecony" && w.odbiorca) {
      z.push({ id: `K-${w.id}`, kategoria: "klient", tytul: `Zlecenie: ${w.praca}`, kto: `${w.klient} → ${w.odbiorca}`, termin: w.termin, zrobione: false, zrodlo: w.id });
    }
  }
  return z;
}

function formatTermin(t: string) {
  return new Date(t).toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
}

export default function Zadania() {
  const [filtr, setFiltr] = useState<KategoriaZadania | "wszystko">("wszystko");
  const [pokazZrobione, setPokazZrobione] = useState(false);
  const [zrobione, setZrobione] = useState<Record<string, boolean>>(Object.fromEntries(zadaniaReczne.map((z) => [z.id, z.zrobione])));

  const wszystkie = useMemo(() => [...zadaniaZWypalow(), ...zadaniaReczne].sort((a, b) => a.termin.localeCompare(b.termin)), []);
  const liczby = Object.fromEntries(kategorieZadan.map((k) => [k.id, wszystkie.filter((z) => z.kategoria === k.id && !zrobione[z.id]).length])) as Record<KategoriaZadania, number>;
  const widoczne = wszystkie.filter((z) => (filtr === "wszystko" || z.kategoria === filtr) && (pokazZrobione || !zrobione[z.id]));

  return (
    <>
      <PageHeader
        title="Do zrobienia"
        description="Jedna kolejka operacyjna pracowni. Wypały ASAP i prace do wydania dochodzą same z kolejki wypałów."
        action={<Button><Plus className="size-4" /> Dodaj zadanie</Button>}
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Button size="sm" variant={filtr === "wszystko" ? "default" : "outline"} onClick={() => setFiltr("wszystko")}>
          Wszystko <Badge variant="secondary" className="ml-1">{Object.values(liczby).reduce((a, b) => a + b, 0)}</Badge>
        </Button>
        {kategorieZadan.map((k) => {
          const Icon = ikony[k.id];
          return (
            <Button key={k.id} size="sm" variant={filtr === k.id ? "default" : "outline"} onClick={() => setFiltr(k.id)} title={k.opis}>
              <Icon className="size-4" /> {k.label} <Badge variant="secondary" className="ml-1">{liczby[k.id]}</Badge>
            </Button>
          );
        })}
        <label className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox checked={pokazZrobione} onCheckedChange={(v) => setPokazZrobione(!!v)} /> pokaż zrobione
        </label>
      </div>
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {widoczne.map((z) => {
              const Icon = ikony[z.kategoria];
              const spoznione = z.termin < DZIS && !zrobione[z.id];
              return (
                <li key={z.id} className="flex items-center gap-3 px-4 py-3">
                  <Checkbox checked={!!zrobione[z.id]} onCheckedChange={() => setZrobione({ ...zrobione, [z.id]: !zrobione[z.id] })} />
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className={`truncate text-sm font-medium ${zrobione[z.id] ? "text-muted-foreground line-through" : ""}`}>{z.tytul}</div>
                    <div className="text-xs text-muted-foreground">{z.kto}</div>
                  </div>
                  <StatusBadge value={z.kategoria} className="hidden sm:inline-flex" />
                  <span className={`w-16 text-right text-sm ${spoznione ? "font-medium text-red-700" : "text-muted-foreground"}`}>{formatTermin(z.termin)}</span>
                  {z.zrodlo?.startsWith("W-") && (
                    <Button size="sm" variant="ghost" render={<Link href="/pracownia/wypaly" />} nativeButton={false} className="hidden sm:inline-flex">{z.zrodlo}</Button>
                  )}
                </li>
              );
            })}
            {widoczne.length === 0 && <li className="px-4 py-8 text-center text-sm text-muted-foreground">Nic do zrobienia w tej kategorii.</li>}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
