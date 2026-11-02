"use client";

import { useState } from "react";
import { Search, Calculator } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { wiki } from "@/lib/data";

const skurcze: Record<string, number> = { "Kamionka biała": 12, "Kamionka czerwona": 11, "Porcelana": 14 };

export default function Wiki() {
  const [q, setQ] = useState("");
  const [wymiar, setWymiar] = useState("10");
  const [glina, setGlina] = useState("Kamionka biała");
  const rows = wiki.filter((w) => `${w.dzial} ${w.tytul} ${w.skrot}`.toLowerCase().includes(q.toLowerCase()));
  const poWypale = (Number(wymiar) * (1 - skurcze[glina] / 100)).toFixed(1);

  return (
    <>
      <PageHeader title="Wiki" description="Przepisy, zasady wypału, techniki i kalkulatory." />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Szukaj w wiki…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="space-y-3">
            {rows.map((w) => (
              <Card key={w.tytul} className="cursor-pointer transition-colors hover:bg-accent/40">
                <CardHeader>
                  <Badge variant="outline" className="w-fit">{w.dzial}</Badge>
                  <CardTitle className="text-base">{w.tytul}</CardTitle>
                  <CardDescription>{w.skrot}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Calculator className="size-4" /> Kalkulator skurczu</CardTitle>
            <CardDescription>Ile będzie miała praca po wypale?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="wymiar">Wymiar surowy (cm)</Label>
              <Input id="wymiar" type="number" value={wymiar} onChange={(e) => setWymiar(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Glina</Label>
              <Select value={glina} onValueChange={(v) => setGlina(v ?? glina)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(skurcze).map((g) => <SelectItem key={g} value={g}>{g} ({skurcze[g]}%)</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg bg-secondary p-4 text-center">
              <div className="text-xs text-muted-foreground">Po wypale</div>
              <div className="text-3xl font-semibold">{poWypale} cm</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
