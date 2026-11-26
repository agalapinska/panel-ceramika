"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Camera, Bell, Flame, Scale, Receipt, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mojePrace as dane, cennik, progresWypalu, rachunekZPrac, type Praca } from "@/lib/data";

const DZIS = "2026-11-02";
const CO = ["kubek", "miseczka", "misa", "talerz", "wazon", "doniczka", "inne"];
const METODY = ["lepienie", "wałki", "toczenie", "z plastra"];
const fmt = (d: string) => new Date(d).toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
const zl = (n: number) => `${n.toFixed(2).replace(".", ",")} zł`;

export default function MojePrace() {
  const [prace, setPrace] = useState<Praca[]>(dane);
  const [nowa, setNowa] = useState({ co: "kubek", metoda: "lepienie", glinaKg: "1", dzis: false });
  const [openNowa, setOpenNowa] = useState(false);
  const [zglos, setZglos] = useState<{ praca: Praca; etap: 1 | 2 } | null>(null);
  const [f1, setF1] = useState({ foto: false, kg: "", cienka: false, asap: false, tylko1: false });
  const [f2, setF2] = useState({ foto: false, kg: "", asap: false, szkliwa: [] as string[], wlasne: false });

  const doZaplaty = rachunekZPrac(prace, cennik).filter((p) => !p.oplacone).reduce((s, p) => s + p.kwota, 0);
  const doOdbioru = prace.filter((p) => (p.status === "1 wypał in progress" && p.wypal1 && progresWypalu(p.wypal1.data, p.wypal1.asap, DZIS).procent === 100) || (p.status === "2 wypał in progress" && p.wypal2 && progresWypalu(p.wypal2.data, p.wypal2.asap, DZIS).procent === 100));

  function dodajPrace() {
    const kg = Number(nowa.glinaKg) || 0;
    const tytul = `${nowa.co[0].toUpperCase()}${nowa.co.slice(1)} (${nowa.metoda})`;
    setPrace((ps) => [{ id: Date.now(), tytul, co: nowa.co, metoda: nowa.metoda, status: "przed 1 wypałem", utworzono: DZIS, glinaKg: kg, notatka: nowa.dzis ? "Oddaję do wypału dziś — przypomnienie za 1 h: foto na wadze i zgłoszenie." : "", tagi: [nowa.co, nowa.metoda], zadania: nowa.dzis ? ["Zgłosić do 1. wypału"] : [] }, ...ps]);
    setOpenNowa(false);
  }

  function otworzZgloszenie(praca: Praca, etap: 1 | 2) {
    setF1({ foto: false, kg: praca.wypal1 ? String(praca.wypal1.kg) : "", cienka: false, asap: false, tylko1: false });
    setF2({ foto: false, kg: praca.wypal1 ? String(praca.wypal1.kg) : "", asap: false, szkliwa: [], wlasne: false });
    setZglos({ praca, etap });
  }

  const mozna1 = f1.foto && Number(f1.kg) > 0;
  const mozna2 = f2.foto && Number(f2.kg) > 0 && (f2.wlasne || f2.szkliwa.length > 0);
  const asapM = 1 + cennik.asapProcent / 100;
  const koszt1 = Number(f1.kg) * cennik.biskwitKg * (f1.asap ? asapM : 1);
  const koszt2 = Number(f2.kg) * cennik.szkliwnyKg * (f2.asap ? asapM : 1) + (f2.wlasne ? 0 : f2.szkliwa.reduce((s, n) => s + (cennik.szkliwa.find((x) => x.nazwa === n)?.cena ?? 0), 0));

  function wstawDoPieca() {
    if (!zglos) return;
    setPrace((ps) =>
      ps.map((p) => {
        if (p.id !== zglos.praca.id) return p;
        if (zglos.etap === 1) return { ...p, status: "1 wypał in progress", wypal1: { data: DZIS, kg: Number(f1.kg), cienka: f1.cienka, asap: f1.asap, tylko1: f1.tylko1 }, zadania: [] };
        return { ...p, status: "2 wypał in progress", wypal2: { data: DZIS, kg: Number(f2.kg), asap: f2.asap, szkliwa: f2.wlasne ? [] : f2.szkliwa, wlasneSzkliwa: f2.wlasne }, zadania: [] };
      })
    );
    setZglos(null);
  }

  function odbierz(id: number) {
    setPrace((ps) => ps.map((p) => (p.id === id ? { ...p, status: p.status === "1 wypał in progress" ? (p.wypal1?.tylko1 ? "gotowe" : "biskwit odebrany") : "gotowe" } : p)));
  }

  return (
    <>
      <PageHeader
        title="Moje prace w pracowni"
        description="Gdzie skończyłam, co zgłaszam do pieca i ile to kosztuje. Rozliczenie za kilogram."
        action={
          <div className="flex gap-2">
            <Button variant="outline" render={<Link href="/czlonek/rachunek" />} nativeButton={false}><Receipt className="size-4" /> Do zapłaty: {zl(doZaplaty)}</Button>
            <Dialog open={openNowa} onOpenChange={setOpenNowa}>
              <DialogTrigger render={<Button />}><Plus className="size-4" /> Nowa praca</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Zacznij nową pracę</DialogTitle>
                  <DialogDescription>Co robisz, jaką metodą i ile gliny bierzesz z pracowni.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2"><Label>Co</Label>
                      <Select value={nowa.co} onValueChange={(v) => setNowa({ ...nowa, co: v ?? "kubek" })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{CO.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
                    <div className="grid gap-2"><Label>Metoda</Label>
                      <Select value={nowa.metoda} onValueChange={(v) => setNowa({ ...nowa, metoda: v ?? "lepienie" })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{METODY.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select></div>
                  </div>
                  {nowa.co === "kubek" && nowa.metoda === "lepienie" && (
                    <div className="flex items-start justify-between gap-3 border bg-secondary p-3 text-sm">
                      <span>Do „kubek + lepienie” jest kurs pracowni. Chcesz skorzystać z instruktażu?</span>
                      <Button size="sm" variant="outline" render={<Link href="/czlonek/kursy" />} nativeButton={false}>Otwórz kurs</Button>
                    </div>
                  )}
                  <div className="grid gap-2"><Label htmlFor="glina">Ilość pobranej gliny z pracowni (kg)</Label><Input id="glina" type="number" step="0.1" value={nowa.glinaKg} onChange={(e) => setNowa({ ...nowa, glinaKg: e.target.value })} /><p className="text-xs text-muted-foreground">{cennik.glinaKg} zł/kg → {zl((Number(nowa.glinaKg) || 0) * cennik.glinaKg)} na rachunek</p></div>
                  <label className="flex items-center gap-2 text-sm"><Checkbox checked={nowa.dzis} onCheckedChange={(v) => setNowa({ ...nowa, dzis: !!v })} /> Oddaję do wypału dziś (przypomnij za 1 h o zdjęciu i zgłoszeniu)</label>
                </div>
                <DialogFooter><Button variant="outline" onClick={() => setOpenNowa(false)}>Anuluj</Button><Button onClick={dodajPrace}>Zacznij tworzyć</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      {doOdbioru.length > 0 && (
        <Card className="mb-6 border-emerald-200 bg-emerald-50">
          <CardHeader className="flex flex-row items-center gap-3">
            <Bell className="size-5 text-emerald-700" />
            <div><CardTitle className="text-base">Praca po wypale — do odbioru!</CardTitle><CardDescription>{doOdbioru.map((p) => p.tytul).join(", ")} czeka na półce odbiorczej.</CardDescription></div>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {prace.map((p) => {
          const w = p.status === "2 wypał in progress" ? p.wypal2 : p.status === "1 wypał in progress" ? p.wypal1 : undefined;
          const prog = w ? progresWypalu(w.data, w.asap, DZIS) : null;
          const naPolce = prog && prog.naPolce > 0 ? prog.naPolce : 0;
          return (
            <Card key={p.id} className="flex flex-col pt-0">
              <div className="flex aspect-[4/3] items-center justify-center bg-secondary text-secondary-foreground"><Camera className="size-8 opacity-60" /></div>
              <CardHeader>
                <div className="flex items-center justify-between gap-2"><CardTitle className="text-base">{p.tytul}</CardTitle><StatusBadge value={p.status} /></div>
                <CardDescription>{p.glinaKg} kg gliny · od {fmt(p.utworzono)}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                {prog && w && (
                  <div>
                    <div className="mb-1 flex justify-between text-xs text-muted-foreground"><span>{w.asap ? "ASAP" : "standard"} · oddane {fmt(w.data)}</span><span>{prog.procent}%</span></div>
                    <Progress value={prog.procent} />
                    {naPolce > 0 && <p className={`mt-1 text-xs ${naPolce > cennik.limitPolkiDni ? "text-red-700" : "text-muted-foreground"}`}>Na półce od {naPolce} dni{naPolce > cennik.limitPolkiDni ? " — ponad limit 30 dni" : ""}</p>}
                  </div>
                )}
                {p.notatka && <p className="text-sm">{p.notatka}</p>}
                {p.zadania.length > 0 && (
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">Na następną wizytę</Label>
                    {p.zadania.map((z, i) => <label key={i} className="flex items-center gap-2 text-sm"><Checkbox /> {z}</label>)}
                  </div>
                )}
                <div className="flex flex-wrap gap-1">{p.tagi.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}</div>
                <div className="mt-auto flex gap-2 pt-1">
                  {p.status === "przed 1 wypałem" && <Button size="sm" className="flex-1" onClick={() => otworzZgloszenie(p, 1)}><Flame className="size-4" /> Zgłoś do 1. wypału</Button>}
                  {p.status === "biskwit odebrany" && <Button size="sm" className="flex-1" onClick={() => otworzZgloszenie(p, 2)}><Flame className="size-4" /> Zgłoś do 2. wypału</Button>}
                  {prog?.procent === 100 && <Button size="sm" variant="secondary" className="flex-1" onClick={() => odbierz(p.id)}>Odebrałam z półki</Button>}
                  {p.status === "gotowe" && <Button size="sm" variant="outline" className="flex-1" render={<Link href="/czlonek/galeria" />} nativeButton={false}>Podziel się w Inspiracjach</Button>}
                  <Button size="sm" variant="ghost" aria-label="Zgłoś problem"><AlertTriangle className="size-4" /></Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!zglos} onOpenChange={(v) => !v && setZglos(null)}>
        <DialogContent>
          {zglos?.etap === 1 && (
            <>
              <DialogHeader><DialogTitle>Gotowa do 1. wypału! Gratulacje</DialogTitle><DialogDescription>{zglos.praca.tytul}. Waga na wadze to podstawa ceny: {cennik.biskwitKg} zł/kg biskwitu.</DialogDescription></DialogHeader>
              <div className="grid gap-3">
                <label className="flex items-center gap-2 text-sm"><Checkbox checked={f1.foto} onCheckedChange={(v) => setF1({ ...f1, foto: !!v })} /> <Scale className="size-4 text-muted-foreground" /> Zdjęcie pracy na wadze wgrane</label>
                <div className="grid gap-2"><Label htmlFor="kg1">Waga (kg)</Label><Input id="kg1" type="number" step="0.05" placeholder="np. 0.55" value={f1.kg} onChange={(e) => setF1({ ...f1, kg: e.target.value })} /></div>
                <label className="flex items-center gap-2 text-sm"><Checkbox checked={f1.cienka} onCheckedChange={(v) => setF1({ ...f1, cienka: !!v })} /> Praca cienka lub do 7 cm</label>
                <label className="flex items-center gap-2 text-sm"><Checkbox checked={f1.asap} onCheckedChange={(v) => setF1({ ...f1, asap: !!v })} /> ASAP (+{cennik.asapProcent}%, gotowe w 5 dni zamiast 14)</label>
                <label className="flex items-center gap-2 text-sm"><Checkbox checked={f1.tylko1} onCheckedChange={(v) => setF1({ ...f1, tylko1: !!v })} /> Tylko 1 wypał (bez szkliwienia)</label>
                <div className="border bg-secondary p-3 text-sm">Na rachunek: <span className="font-semibold">{zl(koszt1 || 0)}</span></div>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setZglos(null)}>Anuluj</Button><Button disabled={!mozna1} onClick={wstawDoPieca}><Flame className="size-4" /> Wstaw do pieca</Button></DialogFooter>
            </>
          )}
          {zglos?.etap === 2 && (
            <>
              <DialogHeader><DialogTitle>Gotowa do 2. wypału! Gratulacje</DialogTitle><DialogDescription>{zglos.praca.tytul}. {cennik.szkliwnyKg} zł/kg biskwitu plus szkliwa pracowni. Bez wpisania szkliw nie da się wstawić do pieca.</DialogDescription></DialogHeader>
              <div className="grid gap-3">
                <label className="flex items-center gap-2 text-sm"><Checkbox checked={f2.foto} onCheckedChange={(v) => setF2({ ...f2, foto: !!v })} /> <Scale className="size-4 text-muted-foreground" /> Zdjęcie biskwitu na wadze wgrane</label>
                <div className="grid gap-2"><Label htmlFor="kg2">Waga biskwitu (kg)</Label><Input id="kg2" type="number" step="0.05" value={f2.kg} onChange={(e) => setF2({ ...f2, kg: e.target.value })} /></div>
                <div className="grid gap-2">
                  <Label>Użyte szkliwa pracowni</Label>
                  <div className="grid gap-1.5">
                    {cennik.szkliwa.map((s) => (
                      <label key={s.nazwa} className={`flex items-center justify-between gap-2 border px-3 py-2 text-sm ${f2.wlasne ? "opacity-50" : ""}`}>
                        <span className="flex items-center gap-2"><Checkbox disabled={f2.wlasne} checked={f2.szkliwa.includes(s.nazwa)} onCheckedChange={(v) => setF2({ ...f2, szkliwa: v ? [...f2.szkliwa, s.nazwa] : f2.szkliwa.filter((x) => x !== s.nazwa) })} /> {s.nazwa} <StatusBadge value={s.typ} /></span>
                        <span className="text-muted-foreground">{s.cena} zł / {s.porcja} {s.jednostka}</span>
                      </label>
                    ))}
                  </div>
                  <label className="flex items-center gap-2 text-sm"><Checkbox checked={f2.wlasne} onCheckedChange={(v) => setF2({ ...f2, wlasne: !!v, szkliwa: [] })} /> Użyłam własnych szkliw (nie wpisuję)</label>
                </div>
                <label className="flex items-center gap-2 text-sm"><Checkbox checked={f2.asap} onCheckedChange={(v) => setF2({ ...f2, asap: !!v })} /> ASAP (+{cennik.asapProcent}%)</label>
                <div className="border bg-secondary p-3 text-sm">Na rachunek: <span className="font-semibold">{zl(koszt2 || 0)}</span></div>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setZglos(null)}>Anuluj</Button><Button disabled={!mozna2} onClick={wstawDoPieca}><Flame className="size-4" /> Wstaw do pieca</Button></DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
