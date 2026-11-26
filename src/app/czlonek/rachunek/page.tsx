"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mojePrace, cennik, rachunekZPrac } from "@/lib/data";

const fmt = (d: string) => new Date(d).toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
const zl = (n: number) => `${n.toFixed(2).replace(".", ",")} zł`;

export default function Rachunek() {
  const [pozycje] = useState(() => rachunekZPrac(mojePrace, cennik));
  const doZaplaty = pozycje.filter((p) => !p.oplacone);
  const suma = doZaplaty.reduce((s, p) => s + p.kwota, 0);
  const sumaOplacone = pozycje.filter((p) => p.oplacone).reduce((s, p) => s + p.kwota, 0);

  const tabela = (rows: typeof pozycje) => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Data</TableHead><TableHead>Praca</TableHead><TableHead>Pozycja</TableHead><TableHead className="hidden md:table-cell">Ilość × stawka</TableHead><TableHead className="text-right">Kwota</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {rows.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="text-muted-foreground">{fmt(p.data)}</TableCell>
                <TableCell className="font-medium">{p.praca}</TableCell>
                <TableCell>{p.opis}</TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">{p.ilosc}</TableCell>
                <TableCell className="text-right">{zl(p.kwota)}</TableCell>
                <TableCell><StatusBadge value={p.oplacone ? "opłacone" : "do zapłaty"} /></TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Brak pozycji</TableCell></TableRow>}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <>
      <PageHeader title="Rachunek" description="Glina, wypały i szkliwa pracowni rozliczane za kilogram. Pozycje powstają z Twoich zgłoszeń." action={<Button disabled>Zapłać online (wkrótce)</Button>} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card><CardHeader className="pb-2"><CardDescription>Do zapłaty</CardDescription></CardHeader><CardContent className="text-2xl font-semibold">{zl(suma)}</CardContent></Card>
        <Card><CardHeader className="pb-2"><CardDescription>Opłacone w tym sezonie</CardDescription></CardHeader><CardContent className="text-2xl font-semibold">{zl(sumaOplacone)}</CardContent></Card>
        <Card><CardHeader className="pb-2"><CardDescription>Stawki pracowni</CardDescription></CardHeader><CardContent className="text-sm">glina {cennik.glinaKg} zł/kg · biskwit {cennik.biskwitKg} zł/kg · szkliwny {cennik.szkliwnyKg} zł/kg · ASAP +{cennik.asapProcent}%</CardContent></Card>
      </div>
      <Tabs defaultValue="dozaplaty">
        <TabsList className="mb-4"><TabsTrigger value="dozaplaty">Do zapłaty ({doZaplaty.length})</TabsTrigger><TabsTrigger value="wszystko">Wszystko</TabsTrigger></TabsList>
        <TabsContent value="dozaplaty">{tabela(doZaplaty)}</TabsContent>
        <TabsContent value="wszystko">{tabela(pozycje)}</TabsContent>
      </Tabs>
      <Card className="mt-6 border-dashed">
        <CardHeader><CardTitle className="text-base">Jak liczymy</CardTitle><CardDescription>Waga z wagi w pracowni przy zgłoszeniu. ASAP mnoży stawkę wypału. Własne szkliwa nic nie kosztują, szkliwa pracowni liczone za porcję. Płatność na miejscu, pracownia oznacza „opłacone”.</CardDescription></CardHeader>
      </Card>
    </>
  );
}
