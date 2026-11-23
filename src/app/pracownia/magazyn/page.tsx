"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, ClipboardCheck, CalendarClock } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { magazyn as dane, przeglady as historia, wypaly, CYKL_PRZEGLADU_DNI, type PozycjaMagazynu } from "@/lib/data";

const DZIS = "2026-11-02";
const dni = (a: string, b: string) => Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
const fmt = (d: string) => new Date(d).toLocaleDateString("pl-PL", { day: "numeric", month: "short" });

/** Szacowane zużycie od ostatniego przeglądu: suma zużycia w wypałach, które weszły do pieca po przeglądzie. */
function szacowaneZuzycie(p: PozycjaMagazynu) {
  return wypaly
    .filter((w) => w.data > p.ostatniPrzeglad && (p.typ === "glina" ? w.glina === p.nazwa : w.szkliwo === p.nazwa) && w.status !== "przyjęte")
    .reduce((s, w) => s + (p.typ === "glina" ? 0.5 : (w.zuzycieSzkliwa ?? 0)), 0);
}

export default function Magazyn() {
  const [magazyn, setMagazyn] = useState<PozycjaMagazynu[]>(dane);
  const [przeglady, setPrzeglady] = useState(historia);
  const [open, setOpen] = useState(false);
  const [formStany, setFormStany] = useState<Record<string, string>>({});

  const ostatni = magazyn[0].ostatniPrzeglad;
  const dniOdPrzegladu = dni(ostatni, DZIS);
  const czasNaPrzeglad = dniOdPrzegladu >= CYKL_PRZEGLADU_DNI;

  const pozycje = useMemo(
    () =>
      magazyn.map((p) => {
        const szac = szacowaneZuzycie(p);
        const stanSzac = Math.max(0, p.stan - szac);
        const miesiace = p.srednia > 0 ? stanSzac / p.srednia : 9;
        return { ...p, szac, stanSzac, miesiace, ostrzezenie: miesiace < 0.75 };
      }),
    [magazyn]
  );
  const ostrzezenia = pozycje.filter((p) => p.ostrzezenie);

  function otworzPrzeglad(v: boolean) {
    if (v) setFormStany(Object.fromEntries(pozycje.map((p) => [p.nazwa, String(p.stanSzac)])));
    setOpen(v);
  }

  function zapiszPrzeglad() {
    const stany = Object.fromEntries(magazyn.map((p) => [p.nazwa, Number(formStany[p.nazwa] ?? p.stan)]));
    const dniMiedzy = Math.max(1, dni(ostatni, DZIS));
    setMagazyn((m) =>
      m.map((p) => {
        const zuzyte = Math.max(0, p.stan - stany[p.nazwa]);
        const srednia = Math.round(((zuzyte / dniMiedzy) * 30 + p.srednia) / 2);
        return { ...p, stan: stany[p.nazwa], srednia, ostatniPrzeglad: DZIS };
      })
    );
    setPrzeglady((h) => [...h, { data: DZIS, stany }]);
    setOpen(false);
  }

  const dialogPrzegladu = (
    <Dialog open={open} onOpenChange={otworzPrzeglad}>
      <DialogTrigger render={<Button />}><ClipboardCheck className="size-4" /> Zrób przegląd</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Przegląd magazynu</DialogTitle>
          <DialogDescription>Wpisz, ile faktycznie jest na półce. Pola są wypełnione szacunkiem z wypałów, popraw to, co się nie zgadza.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          {pozycje.map((p) => (
            <div key={p.nazwa} className="grid grid-cols-[1fr_120px] items-center gap-3">
              <div>
                <Label htmlFor={`st-${p.nazwa}`}>{p.nazwa}</Label>
                <div className="text-xs text-muted-foreground">przegląd {fmt(p.ostatniPrzeglad)}: {p.stan} {p.jednostka} · szacunek dziś: {p.stanSzac} {p.jednostka}</div>
              </div>
              <div className="flex items-center gap-2">
                <Input id={`st-${p.nazwa}`} type="number" value={formStany[p.nazwa] ?? ""} onChange={(e) => setFormStany({ ...formStany, [p.nazwa]: e.target.value })} />
                <span className="w-6 text-sm text-muted-foreground">{p.jednostka}</span>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Anuluj</Button>
          <Button onClick={zapiszPrzeglad}>Zapisz przegląd</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <PageHeader
        title="Magazyn szkliw i glin"
        description="Szkliwa kupne (fluidowe w ml, proszkowe w g) i gliny w kg. Zużycie szacowane z wypałów, korygowane przeglądem co 2 tygodnie."
        action={<div className="flex gap-2"><Button variant="outline">Dodaj dostawę</Button>{dialogPrzegladu}</div>}
      />

      {czasNaPrzeglad ? (
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardHeader className="flex flex-row items-start gap-3">
            <CalendarClock className="mt-0.5 size-5 text-amber-600" />
            <div className="flex-1">
              <CardTitle className="text-base">Sprawdź magazyn — ostatni przegląd {dniOdPrzegladu} dni temu ({fmt(ostatni)})</CardTitle>
              <CardDescription>Od tego czasu było {wypaly.filter((w) => w.data > ostatni && w.status !== "przyjęte").length} wypałów. Stany poniżej to szacunek; przegląd zamienia go na fakty i aktualizuje średnie.</CardDescription>
            </div>
          </CardHeader>
        </Card>
      ) : (
        <Card className="mb-6 border-emerald-200 bg-emerald-50">
          <CardHeader className="flex flex-row items-center gap-3">
            <ClipboardCheck className="size-5 text-emerald-700" />
            <div>
              <CardTitle className="text-base">Magazyn sprawdzony {fmt(ostatni)}</CardTitle>
              <CardDescription>Następny przegląd za {CYKL_PRZEGLADU_DNI - dniOdPrzegladu} dni.</CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}

      {ostrzezenia.length > 0 && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 text-amber-600" />
            <div>
              <CardTitle className="text-base">Zamów: {ostrzezenia.map((o) => o.nazwa).join(", ")}</CardTitle>
              <CardDescription>Szacowany zapas poniżej 3 tygodni przy średnim zużyciu. Tenmoku schodzi szybciej w pierwszej dekadzie miesiąca — w ostatnich 3 miesiącach o 40% więcej.</CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}

      <Tabs defaultValue="stany">
        <TabsList className="mb-4">
          <TabsTrigger value="stany">Stany</TabsTrigger>
          <TabsTrigger value="staty">Statystyki zużycia</TabsTrigger>
        </TabsList>

        <TabsContent value="stany">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pozycje.map((p) => {
              const procent = Math.min(100, Math.round((p.stanSzac / (p.srednia * 2)) * 100));
              return (
                <Card key={p.nazwa}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{p.nazwa}</CardTitle>
                      <StatusBadge value={p.typ} />
                    </div>
                    {p.ostrzezenie ? <Badge className="border-transparent bg-amber-100 text-amber-800">Zamów</Badge> : <Badge variant="secondary">OK</Badge>}
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-2xl font-semibold">{p.stanSzac} <span className="text-sm font-normal text-muted-foreground">{p.jednostka}</span></span>
                      <span className="text-xs text-muted-foreground">śr. {p.srednia} {p.jednostka}/msc</span>
                    </div>
                    <Progress value={procent} />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Przegląd {fmt(p.ostatniPrzeglad)}: {p.stan} {p.jednostka} · od tego czasu wypały zużyły ok. {p.szac} {p.jednostka} · zapas na ok. {p.miesiace.toFixed(1)} msc
                    </p>
                    {p.typ === "glina" && p.dataZamowienia && (
                      <p className="mt-1 text-xs text-muted-foreground">Zamówiona {fmt(p.dataZamowienia)}{dni(p.dataZamowienia, DZIS) > 75 ? " — leży długo, sprawdź twardość" : ""}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="staty">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Zużycie między przeglądami</CardTitle>
              <CardDescription>Liczone z faktycznych stanów, nie z szacunków. Z tego powstaje średnia miesięczna i ostrzeżenia.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pozycja</TableHead>
                    {przeglady.slice(1).map((pr, i) => (
                      <TableHead key={pr.data} className="text-right">{fmt(przeglady[i].data)} → {fmt(pr.data)}</TableHead>
                    ))}
                    <TableHead className="text-right">Średnia / msc</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pozycje.map((p) => {
                    const zuzycia = przeglady.slice(1).map((pr, i) => {
                      const a = przeglady[i].stany[p.nazwa] ?? 0;
                      const b = pr.stany[p.nazwa] ?? 0;
                      const d = Math.max(1, dni(przeglady[i].data, pr.data));
                      return { zuzyte: Math.max(0, a - b), naMsc: Math.round((Math.max(0, a - b) / d) * 30) };
                    });
                    const ost = zuzycia[zuzycia.length - 1]?.naMsc ?? 0;
                    const poprz = zuzycia[zuzycia.length - 2]?.naMsc ?? ost;
                    const trend = poprz === 0 ? 0 : Math.round(((ost - poprz) / poprz) * 100);
                    return (
                      <TableRow key={p.nazwa}>
                        <TableCell className="font-medium">{p.nazwa} <span className="text-xs text-muted-foreground">({p.jednostka})</span></TableCell>
                        {zuzycia.map((z, i) => <TableCell key={i} className="text-right">{z.zuzyte}</TableCell>)}
                        <TableCell className="text-right font-medium">{p.srednia}</TableCell>
                        <TableCell className={`text-right ${trend > 15 ? "text-amber-700" : trend < -15 ? "text-emerald-700" : "text-muted-foreground"}`}>{trend > 0 ? "+" : ""}{trend}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
