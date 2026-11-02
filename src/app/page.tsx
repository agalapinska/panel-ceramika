import Link from "next/link";
import { Building2, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const typyKont = [
  {
    href: "/pracownia",
    icon: Building2,
    tytul: "Pracownia ceramiczna",
    opis: "Rozliczaj wypały, prowadź magazyn szkliw, zarządzaj abonentami i treściami pracowni.",
    punkty: ["Kolejka wypałów ze statusami", "Magazyn i biblioteka szkliw", "Abonenci i aktywność", "Instrukcje, tutoriale, FAQ"],
    cta: "Wejdź jako pracownia",
  },
  {
    href: "/czlonek",
    icon: User,
    tytul: "Członek pracowni",
    opis: "Zobacz, gdzie skończyłaś pracę, ucz się na kursach, zapisz na warsztaty i pokaż swoje prace.",
    punkty: ["Moje prace i lista zadań", "Kursy „na konkretną rzecz”", "Warsztaty i wiki", "Buddy — asystent pracowni"],
    cta: "Wejdź jako członek",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 size-14 rounded-full bg-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">Panel Ceramika</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Platforma łącząca pracownie ceramiczne z ich członkami. Wybierz typ konta, żeby zobaczyć swój panel.
        </p>
        <Badge variant="outline" className="mt-3">Prototyp — bez logowania</Badge>
      </div>
      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
        {typyKont.map((t) => (
          <Card key={t.href} className="flex flex-col">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <t.icon className="size-5" />
              </div>
              <CardTitle className="text-xl">{t.tytul}</CardTitle>
              <CardDescription>{t.opis}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between gap-6">
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {t.punkty.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" /> {p}
                  </li>
                ))}
              </ul>
              <Button render={<Link href={t.href} />} nativeButton={false} size="lg" className="w-full">
                {t.cta} <ArrowRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
