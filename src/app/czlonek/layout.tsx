"use client";

import { Hammer, GraduationCap, CalendarDays, BookOpen, Sparkles, Images } from "lucide-react";
import { AppShell } from "@/components/app-shell";

const nav = [
  { href: "/czlonek", label: "Moje prace", icon: Hammer },
  { href: "/czlonek/kursy", label: "Kursy", icon: GraduationCap },
  { href: "/czlonek/warsztaty", label: "Warsztaty", icon: CalendarDays },
  { href: "/czlonek/wiki", label: "Wiki", icon: BookOpen },
  { href: "/czlonek/buddy", label: "Buddy", icon: Sparkles },
  { href: "/czlonek/galeria", label: "Galeria i outlet", icon: Images },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell nav={nav} rola="Członek" uzytkownik={{ imie: "Marta Kowal", inicjaly: "MK", opis: "Open studio · Glina & Ogień" }}>
      {children}
    </AppShell>
  );
}
