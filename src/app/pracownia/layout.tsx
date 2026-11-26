"use client";

import { LayoutDashboard, Flame, ClipboardList, Users, Package, Palette, BookOpen, BadgeDollarSign } from "lucide-react";
import { AppShell } from "@/components/app-shell";

const nav = [
  { href: "/pracownia", label: "Pulpit", icon: LayoutDashboard },
  { href: "/pracownia/wypaly", label: "Wypały", icon: Flame },
  { href: "/pracownia/zadania", label: "Do zrobienia", icon: ClipboardList },
  { href: "/pracownia/klienci", label: "Abonenci", icon: Users },
  { href: "/pracownia/magazyn", label: "Magazyn", icon: Package },
  { href: "/pracownia/szkliwa", label: "Biblioteka szkliw", icon: Palette },
  { href: "/pracownia/tresci", label: "Treści pracowni", icon: BookOpen },
  { href: "/pracownia/cennik", label: "Cennik", icon: BadgeDollarSign },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell nav={nav} rola="Pracownia" uzytkownik={{ imie: "Pracownia Glina & Ogień", inicjaly: "GO", opis: "Właściciel" }}>
      {children}
    </AppShell>
  );
}
