"use client";

import { useState } from "react";
import { Plus, Truck } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { wypaly as dane, klienci, terminDomyslny, DOMYSLNY_TERMIN_DNI, type Wypal, type StatusWypalu, type TypWypalu, type Dostawa } from "@/lib/data";

const DZIS = "2026-11-02";

function nastepnyStatus(w: Wypal): StatusWypalu | null {
  switch (w.status) {
    case "przyjęte": return "zaplanowane";
    case "zaplanowane": return "w piecu";
    case "w piecu": return w.dostawa === "wysyłka" ? "do wysyłki" : "do odbioru";
    case "do odbioru":
    case "do wysyłki": return "rozliczone";
    default: return null;
  }
}
function etykietaAkcji(w: Wypal) {
  if (w.status === "do odbioru") return "Rozlicz";
  if (w.status === "do wysyłki") return "Wysłano";
  if (w.status === "w piecu") return w.dostawa === "wysyłka" ? "Do wysyłki" : "Do odbioru";
  return "Dalej →";
}
function formatTermin(t: string) {
  const d = new Date(t);
  return d.toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
}
function poTerminie(t: string) {
  return t < DZIS;
}

const pustyForm = { klient: "", odbiorca: "", praca: "", glina: "Kamionka biała", szkliwo: "", typ: "standard" as TypWypalu, cena: "20", termin: terminDomyslny(DZIS), dostawa: "odbiór" as Dostawa };

export default function Wypaly() {
  const [wypaly, setWypaly] = useState<Wypal[]>(dane);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(pustyForm);

  function dalej(id: string) {
    setWypaly((w) => w.map((x) => (x.id === id ? { ...x, status: nastepnyStatus(x) ?? x.status } : x)));
  }

  function dodaj() {
    if (!form.klient || !form.praca) return;
    setWypaly((w) => [
      { id: `W-${1047 + w.length - dane.length}`, ...form, odbiorca: form.odbiorca || undefined, cena: Number(form.cena), status: "przyjęte", data: DZIS },
      ...w,
    ]);
    setOpen(false);
    setForm(pustyForm);
  }

  const lista = (rows: Wypal[]) => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nr</TableHead>
              <TableHead>Klient / odbiorca</TableHead>
              <TableHead>Praca</TableHead>
              <TableHead className="hidden lg:table-cell">Glina / szkliwo</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Termin</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Cena</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((w) => (
              <TableRow key={w.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{w.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{w.klient}</div>
                  {w.odbiorca && <div className="text-xs text-muted-foreground">→ {w.odbiorca}</div>}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {w.praca}
                    {w.dostawa === "wysyłka" && <Truck className="size-3.5 text-muted-foreground" aria-label="wysyłka" />}
                  </div>
                </TableCell>
                <TableCell className="hidden text-muted-foreground lg:table-cell">{w.glina} · {w.szkliwo}</TableCell>
                <TableCell><StatusBadge value={w.typ} /></TableCell>
                <TableCell className={poTerminie(w.termin) && w.status !== "rozliczone" ? "font-medium text-red-700" : ""}>{formatTermin(w.termin)}</TableCell>
                <TableCell><StatusBadge value={w.status} /></TableCell>
                <TableCell className="text-right">{w.cena} zł</TableCell>
                <TableCell className="text-right">
                  {w.status !== "rozliczone" && (
                    <Button size="sm" variant="ghost" onClick={() => dalej(w.id)}>{etykietaAkcji(w)}</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow><TableCell colSpan={9} className="py-8 text-center text-muted-foreground">Brak wypałów</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const aktywne = wypaly.filter((w) => w.status !== "rozliczone");

  return (
    <>
      <PageHeader
        title="Wypały"
        description="Zgłoszenia, kolejka ze statusami i rozliczenia. Termin domyślnie za 14 dni."
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button />}><Plus className="size-4" /> Zgłoś wypał</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nowe zgłoszenie wypału</DialogTitle>
                <DialogDescription>Klient, praca, glina, szkliwo, typ wypału, termin i sposób odbioru.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Klient</Label>
                    <Select value={form.klient} onValueChange={(v) => setForm({ ...form, klient: v ?? "" })}>
                      <SelectTrigger><SelectValue placeholder="Wybierz klienta" /></SelectTrigger>
                      <SelectContent>
                        {klienci.map((k) => <SelectItem key={k.id} value={k.imie}>{k.imie}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="odbiorca">Odbiorca (jeśli inny)</Label>
                    <Input id="odbiorca" placeholder="np. Kawiarnia Pora" value={form.odbiorca} onChange={(e) => setForm({ ...form, odbiorca: e.target.value })} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="praca">Praca</Label>
                  <Input id="praca" placeholder="np. Kubek z uchem" value={form.praca} onChange={(e) => setForm({ ...form, praca: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Glina</Label>
                    <Select value={form.glina} onValueChange={(v) => setForm({ ...form, glina: v ?? "" })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Kamionka biała", "Kamionka czerwona", "Porcelana"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="szkliwo">Szkliwo</Label>
                    <Input id="szkliwo" placeholder="np. Celadon" value={form.szkliwo} onChange={(e) => setForm({ ...form, szkliwo: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label>Typ wypału</Label>
                    <Select value={form.typ} onValueChange={(v) => setForm({ ...form, typ: (v ?? "standard") as TypWypalu })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">standard</SelectItem>
                        <SelectItem value="ASAP">ASAP (+50%)</SelectItem>
                        <SelectItem value="zlecony">zlecony</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="termin">Termin</Label>
                    <Input id="termin" type="date" value={form.termin} onChange={(e) => setForm({ ...form, termin: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cena">Stawka (zł)</Label>
                    <Input id="cena" type="number" value={form.cena} onChange={(e) => setForm({ ...form, cena: e.target.value })} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Odbiór</Label>
                  <Select value={form.dostawa} onValueChange={(v) => setForm({ ...form, dostawa: (v ?? "odbiór") as Dostawa })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="odbiór">Odbiór osobisty w pracowni</SelectItem>
                      <SelectItem value="wysyłka">Wysyłka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">Termin domyślnie {DOMYSLNY_TERMIN_DNI} dni od dziś. Wypały ASAP trafiają automatycznie do „Do zrobienia”.</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Anuluj</Button>
                <Button onClick={dodaj}>Dodaj do kolejki</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <Tabs defaultValue="aktywne">
        <TabsList className="mb-4">
          <TabsTrigger value="aktywne">W toku ({aktywne.length})</TabsTrigger>
          <TabsTrigger value="asap">ASAP ({aktywne.filter((w) => w.typ === "ASAP").length})</TabsTrigger>
          <TabsTrigger value="wydanie">Do odbioru / wysyłki ({aktywne.filter((w) => w.status === "do odbioru" || w.status === "do wysyłki").length})</TabsTrigger>
          <TabsTrigger value="rozliczone">Rozliczone</TabsTrigger>
        </TabsList>
        <TabsContent value="aktywne">{lista(aktywne)}</TabsContent>
        <TabsContent value="asap">{lista(aktywne.filter((w) => w.typ === "ASAP"))}</TabsContent>
        <TabsContent value="wydanie">{lista(aktywne.filter((w) => w.status === "do odbioru" || w.status === "do wysyłki"))}</TabsContent>
        <TabsContent value="rozliczone">{lista(wypaly.filter((w) => w.status === "rozliczone"))}</TabsContent>
      </Tabs>
    </>
  );
}
