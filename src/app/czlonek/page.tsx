"use client";

import { useState } from "react";
import { Plus, Camera, Bell } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { mojePrace, wypaly } from "@/lib/data";

export default function MojePrace() {
  const [prace, setPrace] = useState(mojePrace.map((p) => ({ ...p, zrobione: p.zadania.map(() => false) })));
  const [nowe, setNowe] = useState<Record<number, string>>({});
  const doOdbioru = wypaly.filter((w) => w.klient === "Marta Kowal" && w.status === "do odbioru");

  function toggle(id: number, i: number) {
    setPrace((ps) => ps.map((p) => (p.id === id ? { ...p, zrobione: p.zrobione.map((z, j) => (j === i ? !z : z)) } : p)));
  }
  function dodajZadanie(id: number) {
    const t = nowe[id]?.trim();
    if (!t) return;
    setPrace((ps) => ps.map((p) => (p.id === id ? { ...p, zadania: [...p.zadania, t], zrobione: [...p.zrobione, false] } : p)));
    setNowe({ ...nowe, [id]: "" });
  }

  return (
    <>
      <PageHeader title="Moje prace w pracowni" description="Gdzie skończyłam i co robię na następnej wizycie." action={<Button><Plus className="size-4" /> Nowa praca</Button>} />
      {doOdbioru.length > 0 && (
        <Card className="mb-6 border-emerald-200 bg-emerald-50">
          <CardHeader className="flex flex-row items-center gap-3">
            <Bell className="size-5 text-emerald-700" />
            <div>
              <CardTitle className="text-base">Twoja praca jest po wypale — do odbioru!</CardTitle>
              <CardDescription>{doOdbioru.map((w) => w.praca).join(", ")} czeka na półce odbiorczej.</CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}
      <div className="grid gap-4 lg:grid-cols-3">
        {prace.map((p) => (
          <Card key={p.id} className="flex flex-col pt-0">
            <div className="flex aspect-[4/3] items-center justify-center rounded-t-xl bg-secondary text-secondary-foreground">
              <Camera className="size-8 opacity-60" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{p.tytul}</CardTitle>
                <StatusBadge value={p.status} />
              </div>
              <CardDescription>Ostatni etap · {p.data}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <p className="text-sm">{p.etap}</p>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Na następną wizytę</Label>
                {p.zadania.map((z, i) => (
                  <label key={i} className="flex items-center gap-2 text-sm">
                    <Checkbox checked={p.zrobione[i]} onCheckedChange={() => toggle(p.id, i)} />
                    <span className={p.zrobione[i] ? "text-muted-foreground line-through" : ""}>{z}</span>
                  </label>
                ))}
                {p.zadania.length === 0 && <p className="text-sm text-muted-foreground">Nic do zrobienia — praca gotowa.</p>}
              </div>
              <div className="mt-auto flex gap-2">
                <Textarea
                  rows={1}
                  placeholder="Dodaj zadanie…"
                  className="min-h-9"
                  value={nowe[p.id] ?? ""}
                  onChange={(e) => setNowe({ ...nowe, [p.id]: e.target.value })}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); dodajZadanie(p.id); } }}
                />
                <Button size="sm" variant="secondary" onClick={() => dodajZadanie(p.id)}>Dodaj</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
