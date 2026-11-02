import { Plus, FileText, PlayCircle, HelpCircle, GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { tresciPracowni, pytaniaOtwarte } from "@/lib/data";

const ikony = { instrukcja: FileText, tutorial: PlayCircle, faq: HelpCircle, kurs: GraduationCap } as const;

export default function Tresci() {
  return (
    <>
      <PageHeader title="Treści pracowni" description="Instrukcje, tutoriale, kursy i FAQ. To z tego buddy odpowiada członkom." action={<Button><Plus className="size-4" /> Nowa treść</Button>} />
      <Tabs defaultValue="tresci">
        <TabsList className="mb-4">
          <TabsTrigger value="tresci">Baza wiedzy ({tresciPracowni.length})</TabsTrigger>
          <TabsTrigger value="pytania">Pytania bez odpowiedzi ({pytaniaOtwarte.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="tresci">
          <div className="grid gap-4 md:grid-cols-2">
            {tresciPracowni.map((t) => {
              const Icon = ikony[t.typ as keyof typeof ikony];
              return (
                <Card key={t.tytul}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 text-muted-foreground" />
                      <Badge variant="secondary">{t.typ}</Badge>
                    </div>
                    <CardTitle className="text-base">{t.tytul}</CardTitle>
                    <CardDescription>{t.opis}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="pytania">
          <div className="grid gap-4 md:grid-cols-2">
            {pytaniaOtwarte.map((p) => (
              <Card key={p.tresc}>
                <CardHeader>
                  <CardTitle className="text-base">„{p.tresc}”</CardTitle>
                  <CardDescription>{p.autor} · {p.data} · buddy nie znalazł odpowiedzi w bazie</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea placeholder="Odpowiedz raz — trafi do bazy i buddy odpowie następnym razem sam." />
                  <div className="flex gap-2">
                    <Button size="sm">Odpowiedz i zapisz w FAQ</Button>
                    <Button size="sm" variant="ghost">Tylko odpowiedz</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
