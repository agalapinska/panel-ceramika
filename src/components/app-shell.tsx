"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon, ArrowLeftRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export type NavItem = { href: string; label: string; icon: LucideIcon };

type Props = {
  nav: NavItem[];
  rola: string;
  uzytkownik: { imie: string; inicjaly: string; opis: string };
  children: React.ReactNode;
};

function Nav({ nav, pathname, onClick }: { nav: NavItem[]; pathname: string; onClick?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {nav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ nav, rola, uzytkownik, children }: Props) {
  const pathname = usePathname();
  const aside = (
    <>
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="size-8 rounded-full bg-primary" />
        <div>
          <div className="text-sm font-semibold leading-tight">Panel Ceramika</div>
          <Badge variant="secondary" className="mt-0.5">{rola}</Badge>
        </div>
      </div>
      <div className="mt-4 flex-1">
        <Nav nav={nav} pathname={pathname} />
      </div>
      <div className="mt-4 border-t pt-4">
        <div className="flex items-center gap-3 px-3">
          <Avatar>
            <AvatarFallback>{uzytkownik.inicjaly}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{uzytkownik.imie}</div>
            <div className="truncate text-xs text-muted-foreground">{uzytkownik.opis}</div>
          </div>
        </div>
        <Button render={<Link href="/" />} nativeButton={false} variant="ghost" size="sm" className="mt-3 w-full justify-start">
          <ArrowLeftRight className="size-4" /> Zmień typ konta
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-sidebar p-3 md:flex">{aside}</aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b bg-background/80 px-4 py-3 backdrop-blur md:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" />}>
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="left" className="flex w-72 flex-col bg-sidebar p-3">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              {aside}
            </SheetContent>
          </Sheet>
          <span className="font-semibold">Panel Ceramika</span>
          <Badge variant="secondary">{rola}</Badge>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}
