"use client";

import { LayoutDashboard, Flame, Users, Package, Palette, BookOpen } from "lucide-react";
import { AppShell } from "@/components/app-shell";

const nav = [
  { href: "/pracownia", label: "Pulpit", icon: LayoutDashboard },
  { href: "/pracownia/wypaly", label: "Wypały", icon: Flame },
  { href: "/pracownia/klienci", label: "Abonenci", icon: Users },
  { href: "/pracownia/magazyn", label: "Magazyn", icon: Package },
  { href: "/pracownia/szkliwa", label: "Biblioteka szkliw", icon: Palette },
  { href: "/pracownia/tresci", label: "Treści pracowni", icon: BookOpen },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell nav={nav} rola="Pracownia" uzytkownik={{ imie: "Pracownia Glina & Ogień", inicjaly: "GO", opis: "Właściciel" }}>
      {children}
    </AppShell>
  );
}
