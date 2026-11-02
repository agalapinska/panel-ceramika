import { Award, Trophy, Lock } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { kursy, odznaki } from "@/lib/data";

export default function Kursy() {
  const punkty = kursy.reduce((s, k) => s + Math.round((k.ukonczone / k.lekcje) * k.punkty), 0);
  return (
    <>
      <PageHeader title="Kursy na konkretną rzecz" description="Krok po kroku — od pomysłu do gotowego przedmiotu." />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2"><CardDescription>Punkty</CardDescription></CardHeader>
          <CardContent className="flex items-center gap-2 text-2xl font-semibold"><Trophy className="size-5 text-amber-500" /> {punkty}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardDescription>Ukończone kursy</CardDescription></CardHeader>
          <CardContent className="text-2xl font-semibold">{kursy.filter((k) => k.ukonczone === k.lekcje).length} / {kursy.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardDescription>Ścieżka</CardDescription></CardHeader>
          <CardContent className="text-2xl font-semibold">Krok 2 <span className="text-sm font-normal text-muted-foreground">/ 4 do znawcy</span></CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {kursy.map((k) => {
            const pct = Math.round((k.ukonczone / k.lekcje) * 100);
            return (
              <Card key={k.id}>
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">{k.tytul}</CardTitle>
                    <CardDescription>{k.opis}</CardDescription>
                  </div>
                  <Badge variant="secondary">{k.punkty} pkt</Badge>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <div className="flex-1">
                    <Progress value={pct} />
                    <p className="mt-1 text-xs text-muted-foreground">{k.ukonczone} z {k.lekcje} lekcji</p>
                  </div>
                  <Button size="sm" variant={pct === 100 ? "outline" : "default"}>{pct === 100 ? "Powtórz" : pct === 0 ? "Zacznij" : "Kontynuuj"}</Button>
                </CardContent>
              </Card>
            );
          })}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-base">Lepię w domu? Pakiet startowy</CardTitle>
              <CardDescription>Zestaw DIY + zniżka na wypał w pracowni + dostęp do kursu „Zrób kubek”.</CardDescription>
            </CardHeader>
            <CardContent><Button variant="secondary">Zobacz pakiet — 149 zł</Button></CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Award className="size-4" /> Odznaki</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {odznaki.map((o) => (
              <div key={o.nazwa} className={`flex flex-col items-center gap-2 rounded-lg border p-3 text-center text-xs ${o.zdobyta ? "bg-secondary" : "opacity-50"}`}>
                <div className={`flex size-10 items-center justify-center rounded-full ${o.zdobyta ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {o.zdobyta ? <Award className="size-5" /> : <Lock className="size-4" />}
                </div>
                {o.nazwa}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
