import { AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { magazyn } from "@/lib/data";

export default function Magazyn() {
  return (
    <>
      <PageHeader title="Magazyn szkliw i surowców" description="Stany, średnie miesięczne zużycie i ostrzeżenia przed brakami." action={<Button variant="outline">Dodaj dostawę</Button>} />
      <Card className="mb-6 border-amber-200 bg-amber-50">
        <CardHeader className="flex flex-row items-start gap-3">
          <AlertTriangle className="mt-0.5 size-5 text-amber-600" />
          <div>
            <CardTitle className="text-base">Prognoza: w tym tygodniu zwykle schodzi więcej Tenmoku</CardTitle>
            <CardDescription>W ostatnich 3 miesiącach zużycie między 1 a 10 dniem miesiąca było o 40% wyższe. Stan wystarczy na ok. 2 wypały — zamów.</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {magazyn.map((m) => {
          const procent = Math.min(100, Math.round((m.stan / (m.srednia * 2)) * 100));
          return (
            <Card key={m.nazwa}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{m.nazwa}</CardTitle>
                {m.ostrzezenie ? <Badge className="border-transparent bg-amber-100 text-amber-800">Zamów</Badge> : <Badge variant="secondary">OK</Badge>}
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-2xl font-semibold">{m.stan} <span className="text-sm font-normal text-muted-foreground">{m.jednostka}</span></span>
                  <span className="text-xs text-muted-foreground">śr. {m.srednia} {m.jednostka}/msc</span>
                </div>
                <Progress value={procent} />
                <p className="mt-2 text-xs text-muted-foreground">Zapas na ok. {(m.stan / m.srednia).toFixed(1)} miesiąca</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
