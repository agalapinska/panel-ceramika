import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const kolory: Record<string, string> = {
  "przyjęte": "bg-muted text-muted-foreground",
  "zaplanowane": "bg-sky-100 text-sky-800",
  "w piecu": "bg-orange-100 text-orange-800",
  "do odbioru": "bg-emerald-100 text-emerald-800",
  "rozliczone": "bg-secondary text-secondary-foreground",
  "aktywny": "bg-emerald-100 text-emerald-800",
  "wygasa": "bg-amber-100 text-amber-800",
  "nieaktywny": "bg-muted text-muted-foreground",
  "schnie": "bg-sky-100 text-sky-800",
  "do retuszu": "bg-amber-100 text-amber-800",
  "na biskwit": "bg-orange-100 text-orange-800",
  "do szkliwienia": "bg-violet-100 text-violet-800",
  "gotowe": "bg-emerald-100 text-emerald-800",
  "ASAP": "bg-red-100 text-red-800",
  "standard": "bg-muted text-muted-foreground",
  "zlecony": "bg-violet-100 text-violet-800",
};

export function StatusBadge({ value, className }: { value: string; className?: string }) {
  return <Badge className={cn("border-transparent", kolory[value] ?? "bg-muted", className)}>{value}</Badge>;
}
