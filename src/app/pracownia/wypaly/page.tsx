"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
import { wypaly as dane, klienci, type StatusWypalu, type TypWypalu } from "@/lib/data";

const statusy: StatusWypalu[] = ["przyjęte", "zaplanowane", "w piecu", "do odbioru", "rozliczone"];

export default function Wypaly() {
  const [wypaly, setWypaly] = useState(dane);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ klient: "", praca: "", glina: "Kamionka biała", szkliwo: "", typ: "standard" as TypWypalu, cena: "20" });

  function dalej(id: string) {
    setWypaly((w) =>
      w.map((x) => {
        if (x.id !== id) return x;
        const i = statusy.indexOf(x.status);
        return i < statusy.length - 1 ? { ...x, status: statusy[i + 1] } : x;
      })
    );
  }

  function dodaj() {
    if (!form.klient || !form.praca) return;
    setWypaly((w) => [
      { id: `W-${1047 + w.length - dane.length}`, ...form, cena: Number(form.cena), status: "przyjęte", data: "2026-11-02" },
      ...w,
    ]);
    setOpen(false);
    setForm({ klient: "", praca: "", glina: "Kamionka biała", szkliwo: "", typ: "standard", cena: "20" });
  }

  const lista = (rows: typeof wypaly) => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nr</TableHead>
              <TableHead>Klient</TableHead>
              <TableHead>Praca</TableHead>
              <TableHead className="hidden md:table-cell">Glina / szkliwo</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Cena</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((w) => (
              <TableRow key={w.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{w.id}</TableCell>
                <TableCell className="font-medium">{w.klient}</TableCell>
                <TableCell>{w.praca}</TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">{w.glina} · {w.szkliwo}</TableCell>
                <TableCell><StatusBadge value={w.typ} /></TableCell>
                <TableCell><StatusBadge value={w.status} /></TableCell>
                <TableCell className="text-right">{w.cena} zł</TableCell>
                <TableCell className="text-right">
                  {w.status !== "rozliczone" && (
                    <Button size="sm" variant="ghost" onClick={() => dalej(w.id)}>
                      {w.status === "do odbioru" ? "Rozlicz" : "Dalej →"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow><TableCell colSpan={8} className="py-8 text-center text-muted-foreground">Brak wypałów</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <>
      <PageHeader
        title="Wypały"
        description="Zgłoszenia, kolejka ze statusami i rozliczenia."
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button />}><Plus className="size-4" /> Zgłoś wypał</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nowe zgłoszenie wypału</DialogTitle>
                <DialogDescription>Klient, praca, glina, szkliwo i typ wypału.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
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
                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="cena">Stawka (zł)</Label>
                    <Input id="cena" type="number" value={form.cena} onChange={(e) => setForm({ ...form, cena: e.target.value })} />
                  </div>
                </div>
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
          <TabsTrigger value="aktywne">W toku ({wypaly.filter((w) => w.status !== "rozliczone").length})</TabsTrigger>
          <TabsTrigger value="asap">ASAP ({wypaly.filter((w) => w.typ === "ASAP" && w.status !== "rozliczone").length})</TabsTrigger>
          <TabsTrigger value="rozliczone">Rozliczone</TabsTrigger>
        </TabsList>
        <TabsContent value="aktywne">{lista(wypaly.filter((w) => w.status !== "rozliczone"))}</TabsContent>
        <TabsContent value="asap">{lista(wypaly.filter((w) => w.typ === "ASAP" && w.status !== "rozliczone"))}</TabsContent>
        <TabsContent value="rozliczone">{lista(wypaly.filter((w) => w.status === "rozliczone"))}</TabsContent>
      </Tabs>
    </>
  );
}
