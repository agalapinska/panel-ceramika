"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { biblioteka } from "@/lib/data";

export default function Szkliwa() {
  const [q, setQ] = useState("");
  const rows = biblioteka.filter((b) => `${b.szkliwo} ${b.glina}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHeader title="Biblioteka szkliw" description="Jak wygląda szkliwo X na glinie Y — zdjęcia z wypałów." action={<Button variant="outline">Dodaj wpis</Button>} />
      <div className="relative mb-6 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="np. celadon porcelana" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((b, i) => (
          <Card key={i} className="overflow-hidden pt-0">
            <div className="aspect-[4/3]" style={{ background: `radial-gradient(circle at 30% 30%, white 0%, transparent 40%), ${b.kolor}` }} />
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="font-semibold">{b.szkliwo}</div>
                <Badge variant="outline">stożek {b.stozek}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">na {b.glina}</div>
              <p className="mt-2 text-sm">{b.uwagi}</p>
            </CardContent>
          </Card>
        ))}
        {rows.length === 0 && <p className="text-muted-foreground">Brak wpisów dla „{q}”.</p>}
      </div>
    </>
  );
}
