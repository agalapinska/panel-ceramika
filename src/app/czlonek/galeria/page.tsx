"use client";

import { useState } from "react";
import { Heart, MessageCircle, Upload, ShoppingBag } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { galeria } from "@/lib/data";

export default function Galeria() {
  const [lajki, setLajki] = useState<Record<number, boolean>>({});
  const siatka = (rows: typeof galeria) => (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {rows.map((g) => {
        const i = galeria.indexOf(g);
        const liked = !!lajki[i];
        return (
          <Card key={i} className="overflow-hidden pt-0">
            <div className="aspect-square" style={{ background: `radial-gradient(circle at 35% 30%, white 0%, transparent 45%), ${g.kolor}` }} />
            <CardContent>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold">{g.tytul}</div>
                  <div className="text-xs text-muted-foreground">{g.autor}</div>
                </div>
                {g.naSprzedaz && <Badge variant="secondary">{g.cena} zł</Badge>}
              </div>
              <div className="mt-3 flex items-center gap-1">
                <Button size="sm" variant="ghost" onClick={() => setLajki({ ...lajki, [i]: !liked })}>
                  <Heart className={liked ? "size-4 fill-red-500 text-red-500" : "size-4"} /> {g.lajki + (liked ? 1 : 0)}
                </Button>
                <Button size="sm" variant="ghost"><MessageCircle className="size-4" /> {g.komentarze}</Button>
                {g.naSprzedaz && <Button size="sm" variant="outline" className="ml-auto"><ShoppingBag className="size-4" /> Kup</Button>}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
  return (
    <>
      <PageHeader title="Galeria i outlet" description="Prace członków pracowni. Odwdzięcz się — kup czyjś kubek." action={<Button><Upload className="size-4" /> Opublikuj pracę</Button>} />
      <Tabs defaultValue="feed">
        <TabsList className="mb-4">
          <TabsTrigger value="feed">Feed pracowni</TabsTrigger>
          <TabsTrigger value="outlet">Outlet</TabsTrigger>
          <TabsTrigger value="moje">Moje</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">{siatka(galeria)}</TabsContent>
        <TabsContent value="outlet">{siatka(galeria.filter((g) => g.naSprzedaz))}</TabsContent>
        <TabsContent value="moje">{siatka(galeria.filter((g) => g.autor === "Marta K."))}</TabsContent>
      </Tabs>
    </>
  );
}
