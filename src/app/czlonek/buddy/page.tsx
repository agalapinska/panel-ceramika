"use client";

import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Msg = { rola: "ja" | "buddy"; tresc: string; zrodlo?: string; brak?: boolean };

const baza: { klucze: string[]; odp: string; zrodlo: string }[] = [
  { klucze: ["godzin", "otwart", "kiedy"], odp: "Pracownia open jest czynna wt–pt 12:00–21:00 i sob 10:00–18:00. Rezerwacja koła przez panel.", zrodlo: "Zasady korzystania z pracowni open" },
  { klucze: ["gdzie", "półk", "szkliw", "narzędzi"], odp: "Szkliwa stoją na regale przy piecu (oznaczone kolorami), narzędzia w szufladach pod stołem nr 2, Twoje prace na półce B3.", zrodlo: "Gdzie co jest" },
  { klucze: ["odbi", "wypał", "ile"], odp: "Wypał standard: 7–10 dni, ASAP: 2–3 dni (+50% stawki). Dostaniesz powiadomienie, kiedy praca będzie do odbioru.", zrodlo: "FAQ: Kiedy odbiorę pracę po wypale?" },
  { klucze: ["zostaw", "wysch", "schn"], odp: "Owiń pracę luźno folią, połóż na półce ze swoim imieniem i wpisz etap w karcie pracy — wtedy wiemy, czego nie ruszać.", zrodlo: "Jak zostawić pracę do wyschnięcia" },
];

const sugestie = ["Jakie są godziny otwarcia?", "Gdzie są szkliwa?", "Ile czeka się na wypał?", "Czy mogę przynieść własną glinę?"];

export default function Buddy() {
  const [msgs, setMsgs] = useState<Msg[]>([{ rola: "buddy", tresc: "Cześć Marta! Jestem buddy pracowni Glina & Ogień. Zapytaj mnie, co możesz robić, gdzie co jest albo jak działa wypał." }]);
  const [text, setText] = useState("");

  function wyslij(t: string) {
    const q = t.trim();
    if (!q) return;
    const hit = baza.find((b) => b.klucze.some((k) => q.toLowerCase().includes(k)));
    const odp: Msg = hit
      ? { rola: "buddy", tresc: hit.odp, zrodlo: hit.zrodlo }
      : { rola: "buddy", tresc: "Nie mam tego jeszcze w bazie pracowni. Przekazałem pytanie do pracowni — odpowiedź trafi tutaj i do FAQ.", brak: true };
    setMsgs((m) => [...m, { rola: "ja", tresc: q }, odp]);
    setText("");
  }

  return (
    <>
      <PageHeader title="Buddy pracowni" description="Asystent odpowiada z treści Twojej pracowni. Czego nie wie — przekazuje pracowni." />
      <Card className="flex h-[calc(100vh-14rem)] flex-col">
        <CardContent className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
          {msgs.map((m, i) => (
            <div key={i} className={cn("max-w-[80%] rounded-2xl px-4 py-2.5 text-sm", m.rola === "ja" ? "self-end bg-primary text-primary-foreground" : "self-start bg-secondary")}>
              {m.rola === "buddy" && <Sparkles className="mb-1 size-3.5 opacity-60" />}
              <p>{m.tresc}</p>
              {m.zrodlo && <Badge variant="outline" className="mt-2 bg-background">Źródło: {m.zrodlo}</Badge>}
              {m.brak && <Badge className="mt-2 border-transparent bg-amber-100 text-amber-800">Przekazano pracowni</Badge>}
            </div>
          ))}
          {msgs.length === 1 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {sugestie.map((s) => <Button key={s} size="sm" variant="outline" onClick={() => wyslij(s)}>{s}</Button>)}
            </div>
          )}
        </CardContent>
        <form className="flex gap-2 border-t p-3" onSubmit={(e) => { e.preventDefault(); wyslij(text); }}>
          <Input placeholder="Zapytaj o pracownię…" value={text} onChange={(e) => setText(e.target.value)} />
          <Button type="submit" size="icon" aria-label="Wyślij"><Send className="size-4" /></Button>
        </form>
      </Card>
    </>
  );
}
