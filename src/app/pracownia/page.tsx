import Link from "next/link";
import { Flame, Users, TrendingUp, AlertTriangle, ArrowRight, MessageCircleQuestion, ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { wypaly, klienci, magazyn, pytaniaOtwarte, zadaniaReczne } from "@/lib/data";

export default function Pulpit() {
  const aktywne = wypaly.filter((w) => w.status !== "rozliczone");
  const doOdbioru = wypaly.filter((w) => w.status === "do odbioru").length;
  const przychod = klienci.reduce((s, k) => s + k.przychod, 0);
  const ostrzezenia = magazyn.filter((m) => m.stan / m.srednia < 0.75);
  const doZrobienia = zadaniaReczne.filter((z) => !z.zrobione).length + wypaly.filter((w) => w.typ === "ASAP" && w.status !== "rozliczone").length + wypaly.filter((w) => w.status === "do odbioru" || w.status === "do wysyłki").length;

  const kpi = [
    { label: "Wypały w toku", value: aktywne.length, hint: `${doOdbioru} do odbioru`, icon: Flame },
    { label: "Do zrobienia", value: doZrobienia, hint: "zamówienia, ASAP, wysyłki", icon: ClipboardList },
    { label: "Aktywni abonenci", value: klienci.filter((k) => k.status === "aktywny").length, hint: `${klienci.filter((k) => k.status === "wygasa").length} wygasa wkrótce`, icon: Users },
    { label: "Przychód z wypałów (msc)", value: `${przychod} zł`, hint: "+12% vs. październik", icon: TrendingUp },
    { label: "Ostrzeżenia magazynowe", value: ostrzezenia.length, hint: ostrzezenia.map((o) => o.nazwa).join(", "), icon: AlertTriangle },
  ];

  return (
    <>
      <PageHeader title="Dzień dobry, Glina & Ogień" description="Niedziela, 2 listopada 2026 — co się dzieje w pracowni." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpi.map((k) => (
          <Card key={k.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>{k.label}</CardDescription>
              <k.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{k.value}</div>
              <p className="mt-1 truncate text-xs text-muted-foreground">{k.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Kolejka wypałów</CardTitle>
              <CardDescription>Najbliższe prace do wypalenia i odbioru</CardDescription>
            </div>
            <Button render={<Link href="/pracownia/wypaly" />} nativeButton={false} variant="outline" size="sm">
              Wszystkie <ArrowRight className="size-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Klient</TableHead>
                  <TableHead>Praca</TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aktywne.slice(0, 5).map((w) => (
                  <TableRow key={w.id}>
                    <TableCell className="font-medium">{w.klient}</TableCell>
                    <TableCell>{w.praca}</TableCell>
                    <TableCell><StatusBadge value={w.typ} /></TableCell>
                    <TableCell><StatusBadge value={w.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><AlertTriangle className="size-4 text-amber-600" /> Zamów wkrótce</CardTitle>
              <CardDescription>Stan poniżej średniego zużycia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {ostrzezenia.map((m) => (
                <div key={m.nazwa} className="flex items-center justify-between text-sm">
                  <span>{m.nazwa}</span>
                  <span className="text-muted-foreground">{m.stan} / śr. {m.srednia} {m.jednostka}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageCircleQuestion className="size-4" /> Pytania do buddy&apos;ego</CardTitle>
              <CardDescription>Bez odpowiedzi w bazie — odpowiedz raz, baza rośnie</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pytaniaOtwarte.map((p) => (
                <div key={p.tresc} className="text-sm">
                  <div className="font-medium">„{p.tresc}”</div>
                  <div className="text-xs text-muted-foreground">{p.autor} · {p.data}</div>
                </div>
              ))}
              <Button render={<Link href="/pracownia/tresci" />} nativeButton={false} variant="secondary" size="sm" className="w-full">Odpowiedz</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
