import { Plus, Mail } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { klienci } from "@/lib/data";

export default function Klienci() {
  return (
    <>
      <PageHeader
        title="Abonenci"
        description="Członkowie pracowni, ich abonamenty i aktywność."
        action={<Button><Plus className="size-4" /> Zaproś klienta</Button>}
      />
      <div className="mb-4 flex gap-2">
        <Input placeholder="Szukaj po imieniu lub mailu…" className="max-w-sm" />
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Klient</TableHead>
                <TableHead>Abonament</TableHead>
                <TableHead className="hidden md:table-cell">Ważny do</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Prace</TableHead>
                <TableHead className="text-right">Przychód</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {klienci.map((k) => (
                <TableRow key={k.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8"><AvatarFallback>{k.imie.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                      <div>
                        <div className="font-medium">{k.imie}</div>
                        <div className="text-xs text-muted-foreground">{k.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{k.abonament}</TableCell>
                  <TableCell className="hidden md:table-cell">{k.waznosc}</TableCell>
                  <TableCell><StatusBadge value={k.status} /></TableCell>
                  <TableCell className="text-right">{k.prace}</TableCell>
                  <TableCell className="text-right font-medium">{k.przychod} zł</TableCell>
                  <TableCell className="text-right"><Button size="icon" variant="ghost" aria-label="Napisz"><Mail className="size-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
