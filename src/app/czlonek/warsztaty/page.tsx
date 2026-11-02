import { CalendarDays, Users } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { warsztaty } from "@/lib/data";

export default function Warsztaty() {
  return (
    <>
      <PageHeader title="Warsztaty" description="Zapisz się jednorazowo albo kup pakiet." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {warsztaty.map((w) => (
          <Card key={w.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant={w.miejsca > 0 ? "secondary" : "outline"}>{w.miejsca > 0 ? `${w.miejsca} wolne miejsca` : "Brak miejsc"}</Badge>
                <span className="font-semibold">{w.cena} zł</span>
              </div>
              <CardTitle className="text-base">{w.tytul}</CardTitle>
              <CardDescription className="flex items-center gap-2"><CalendarDays className="size-4" /> {w.data}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button className="flex-1" disabled={w.miejsca === 0}>{w.miejsca > 0 ? "Zapisz się" : "Lista rezerwowa"}</Button>
              <Button variant="outline" size="icon" aria-label="Uczestnicy"><Users className="size-4" /></Button>
            </CardContent>
          </Card>
        ))}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-base">Pakiet 3 warsztatów</CardTitle>
            <CardDescription>Dowolne 3 warsztaty w ciągu 6 miesięcy. Oszczędzasz 90 zł.</CardDescription>
          </CardHeader>
          <CardContent><Button variant="secondary">Kup pakiet — 400 zł</Button></CardContent>
        </Card>
      </div>
    </>
  );
}
