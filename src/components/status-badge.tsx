import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const kolory: Record<string, string> = {
  "przyjęte": "bg-muted text-muted-foreground",
  "zaplanowane": "bg-sky-100 text-sky-800",
  "w piecu": "bg-orange-100 text-orange-800",
  "do odbioru": "bg-emerald-100 text-emerald-800",
  "do wysyłki": "bg-teal-100 text-teal-800",
  "wysyłka": "bg-teal-100 text-teal-800",
  "odbiór": "bg-muted text-muted-foreground",
  "sklep": "bg-pink-100 text-pink-800",
  "klient": "bg-sky-100 text-sky-800",
  "wysylka": "bg-teal-100 text-teal-800",
  "asap": "bg-red-100 text-red-800",
  "fluidowe": "bg-sky-100 text-sky-800",
  "proszkowe": "bg-amber-100 text-amber-800",
  "glina": "bg-orange-100 text-orange-800",
  "rozliczone": "bg-secondary text-secondary-foreground",
  "aktywny": "bg-emerald-100 text-emerald-800",
  "wygasa": "bg-amber-100 text-amber-800",
  "nieaktywny": "bg-muted text-muted-foreground",
  "schnie": "bg-sky-100 text-sky-800",
  "do retuszu": "bg-amber-100 text-amber-800",
  "na biskwit": "bg-orange-100 text-orange-800",
  "do szkliwienia": "bg-violet-100 text-violet-800",
  "gotowe": "bg-emerald-100 text-emerald-800",
  "przed 1 wypałem": "bg-muted text-muted-foreground",
  "1 wypał in progress": "bg-orange-100 text-orange-800",
  "biskwit odebrany": "bg-violet-100 text-violet-800",
  "2 wypał in progress": "bg-orange-100 text-orange-800",
  "opłacone": "bg-emerald-100 text-emerald-800",
  "do zapłaty": "bg-amber-100 text-amber-800",
  "ASAP": "bg-red-100 text-red-800",
  "standard": "bg-muted text-muted-foreground",
  "zlecony": "bg-violet-100 text-violet-800",
};

export function StatusBadge({ value, className, children }: { value: string; className?: string; children?: React.ReactNode }) {
  return <Badge className={cn("border-transparent", kolory[value] ?? "bg-muted", className)}>{children ?? value}</Badge>;
}
