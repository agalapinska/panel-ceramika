"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cennik as dane, warsztaty } from "@/lib/data";

export default function Cennik() {
  const [c, setC] = useState(dane);
  const [zapisano, setZapisano] = useState(false);
  const pole = (label: string, key: "glinaKg" | "biskwitKg" | "szkliwnyKg" | "asapProcent" | "limitPolkiDni", suffix: string) => (
    <div className="grid gap-2">
      <Label htmlFor={key}>{label}</Label>
      <div className="flex items-center gap-2"><Input id={key} type="number" className="max-w-32" value={c[key]} onChange={(e) => { setC({ ...c, [key]: Number(e.target.value) }); setZapisano(false); }} /><span className="text-sm text-muted-foreground">{suffix}</span></div>
    </div>
  );
  const przyklad = 0.55 * c.biskwitKg + 0.5 * c.szkliwnyKg + 8;

  return (
    <>
      <PageHeader title="Cennik" description="Stawki za kilogram, które widzą członkowie przy zgłaszaniu prac. Zmiana działa od następnego zgłoszenia." action={<Button onClick={() => setZapisano(true)}>{zapisano ? "Zapisano" : "Zapisz cennik"}</Button>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Wypały i glina</CardTitle><CardDescription>Rozliczenie za kg wg wagi z wagi przy zgłoszeniu. Sztuka tylko dla zleceń.</CardDescription></CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            {pole("Glina z pracowni", "glinaKg", "zł / kg")}
            {pole("1. wypał — biskwit", "biskwitKg", "zł / kg")}
            {pole("2. wypał — szkliwny (1050 °C)", "szkliwnyKg", "zł / kg")}
            {pole("Dopłata ASAP", "asapProcent", "% do stawki wypału")}
            {pole("Limit leżenia na półce", "limitPolkiDni", "dni od gotowości")}
            <div className="grid gap-2 sm:col-span-2 border bg-secondary p-3 text-sm">Przykład: kubek 0,55 kg biskwit + 0,5 kg szkliwny + 1 porcja Celadonu = <span className="font-semibold">{przyklad.toFixed(2).replace(".", ",")} zł</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Szkliwa pracowni</CardTitle><CardDescription>Cena za porcję. Własne szkliwa członków są bezpłatne.</CardDescription></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Szkliwo</TableHead><TableHead>Porcja</TableHead><TableHead className="text-right">Cena</TableHead></TableRow></TableHeader>
              <TableBody>
                {c.szkliwa.map((s, i) => (
                  <TableRow key={s.nazwa}>
                    <TableCell><div className="flex items-center gap-2 font-medium">{s.nazwa} <StatusBadge value={s.typ} /></div></TableCell>
                    <TableCell className="text-muted-foreground">{s.porcja} {s.jednostka}</TableCell>
                    <TableCell className="text-right"><Input type="number" className="ml-auto h-8 w-20 text-right" value={s.cena} onChange={(e) => { const sz = [...c.szkliwa]; sz[i] = { ...s, cena: Number(e.target.value) }; setC({ ...c, szkliwa: sz }); setZapisano(false); }} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle className="text-base">Warsztaty i zajęcia</CardTitle><CardDescription>Ceny z oferty Dwa Wypały (Gdańsk). Edycja w module Warsztaty.</CardDescription></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Oferta</TableHead><TableHead className="hidden md:table-cell">Opis</TableHead><TableHead className="text-right">Cena</TableHead></TableRow></TableHeader>
            <TableBody>
              {warsztaty.map((w) => <TableRow key={w.id}><TableCell className="font-medium">{w.tytul}</TableCell><TableCell className="hidden text-muted-foreground md:table-cell">{w.opis}</TableCell><TableCell className="text-right">{w.id === 6 ? "od " : ""}{w.cena} zł</TableCell></TableRow>)}
              <TableRow><TableCell className="font-medium">Bony / vouchery</TableCell><TableCell className="hidden text-muted-foreground md:table-cell">Lekcje indywidualne 250–2 300 zł</TableCell><TableCell className="text-right">160–899 zł</TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
