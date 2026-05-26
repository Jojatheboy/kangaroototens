"use client";

import {
  Menu,
  X,
  Camera,
  Disc3,
  Disc,
  Frame,
  Gift,
  Mic,
} from "lucide-react";
import { useState, type JSX } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShinyButton } from "@/components/ui/shiny-button";

const WHATSAPP =
  "https://wa.me/5551996752150?text=Olá%20Kangaroo,%20quero%20um%20orçamento%20para%20o%20meu%20evento.";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: JSX.Element;
  items?: MenuItem[];
}

const menu: MenuItem[] = [
  {
    title: "Equipamentos",
    url: "#equipamentos",
    items: [
      {
        title: "Totem Fotográfico",
        description: "Foto instantânea com qualidade profissional",
        icon: <Camera className="size-5 shrink-0" style={{ color: "var(--c-text-secondary)" }} />,
        url: "#equipamentos",
      },
      {
        title: "Plataforma 360°",
        description: "Vídeo dinâmico pronto pras redes",
        icon: <Disc3 className="size-5 shrink-0" style={{ color: "var(--c-text-secondary)" }} />,
        url: "#equipamentos",
      },
      {
        title: "Plataforma 180°",
        description: "Formato premium e mais rápido",
        icon: <Disc className="size-5 shrink-0" style={{ color: "var(--c-text-secondary)" }} />,
        url: "#equipamentos",
      },
      {
        title: "Cabine Fotográfica",
        description: "Cabine física personalizada com a marca",
        icon: <Frame className="size-5 shrink-0" style={{ color: "var(--c-text-secondary)" }} />,
        url: "#equipamentos",
      },
      {
        title: "Cabine de Prêmios",
        description: "Interação que distribui recompensas",
        icon: <Gift className="size-5 shrink-0" style={{ color: "var(--c-text-secondary)" }} />,
        url: "#equipamentos",
      },
      {
        title: "Audio Book",
        description: "Mensagens de voz dos convidados",
        icon: <Mic className="size-5 shrink-0" style={{ color: "var(--c-text-secondary)" }} />,
        url: "#equipamentos",
      },
    ],
  },
  { title: "Como funciona", url: "#como-funciona" },
  { title: "Eventos", url: "#eventos" },
  { title: "FAQ", url: "#faq" },
];

function Logo() {
  return (
    <a href="#" className="flex items-center no-underline" aria-label="Kangaroo Totens">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/kangaroo-logo.svg"
        alt="Kangaroo"
        style={{
          height: 26,
          width: "auto",
          filter: "brightness(0) invert(1)",
        }}
      />
    </a>
  );
}

function HeaderCta({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? "w-full [&_a]:w-full" : ""}>
      <ShinyButton href={WHATSAPP} target="_blank" rel="noopener noreferrer">
        Solicitar orçamento
      </ShinyButton>
    </div>
  );
}

function renderMenuItem(item: MenuItem) {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-[760px] p-4 grid grid-cols-3 gap-2">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <a
                    className="flex select-none gap-3 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-white/5"
                    href={subItem.url}
                  >
                    {subItem.icon}
                    <div>
                      <div
                        className="text-sm font-semibold"
                        style={{
                          color: "var(--c-text-primary)",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p
                          className="text-xs leading-snug mt-1.5"
                          style={{ color: "var(--c-text-mute)" }}
                        >
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <a
          className="group inline-flex h-9 w-max items-center justify-center rounded-md px-3.5 py-2 text-sm font-medium transition-colors hover:bg-white/5 no-underline"
          href={item.url}
          style={{
            color: "var(--c-text-primary)",
            fontFamily: "var(--font-geist)",
          }}
        >
          {item.title}
        </a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function renderMobileMenuItem(item: MenuItem, onNavigate: () => void) {
  if (item.items) {
    return (
      <AccordionItem
        key={item.title}
        value={item.title}
        variant="ghost"
        className="border-b border-[color:var(--c-line)] last:border-b-0"
      >
        <AccordionTrigger
          variant="ghost"
          className="hover:no-underline px-2.5 py-3.5 text-base text-[color:var(--c-text-primary)] font-display font-semibold"
        >
          {item.title}
        </AccordionTrigger>
        <AccordionContent variant="ghost" className="pb-3 pt-0">
          <div className="flex flex-col">
            {item.items.map((subItem) => (
              <a
                key={subItem.title}
                onClick={onNavigate}
                className="flex select-none items-center gap-3 rounded-md px-2.5 py-2.5 leading-none outline-none transition-colors hover:bg-white/5 no-underline"
                href={subItem.url}
              >
                {subItem.icon}
                <span
                  className="text-[13.5px]"
                  style={{
                    color: "var(--c-text-secondary)",
                    fontFamily: "var(--font-geist)",
                  }}
                >
                  {subItem.title}
                </span>
              </a>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      key={item.title}
      href={item.url}
      onClick={onNavigate}
      className="no-underline block px-2.5 py-3.5 text-base"
      style={{
        color: "var(--c-text-primary)",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        borderBottom: "1px solid var(--c-line)",
      }}
    >
      {item.title}
    </a>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100]"
      style={{
        background: "rgba(15, 9, 6, 0.7)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--c-line)",
      }}
    >
      <div
        className="relative px-4 sm:px-6"
        style={{ maxWidth: 1280, margin: "0 auto" }}
      >
        {/* DESKTOP */}
        <nav className="hidden lg:flex justify-between items-center h-[64px]">
          <div className="flex items-center gap-8">
            <Logo />
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <HeaderCta />
        </nav>

        {/* MOBILE */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between h-[60px]">
            <Logo />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                  aria-expanded={mobileOpen}
                  onClick={() => setMobileOpen((v) => !v)}
                  className="relative z-[120] inline-flex items-center justify-center rounded-md transition-colors hover:bg-white/5"
                  style={{
                    width: 40,
                    height: 40,
                    border: "1px solid var(--c-line-strong)",
                    color: "var(--c-text-primary)",
                  }}
                >
                  {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                </button>
              </SheetTrigger>
              <SheetContent className="z-[110] overflow-y-auto flex flex-col gap-0 p-0 w-[86%] max-w-[360px]">
                <SheetHeader
                  className="px-5 py-4"
                  style={{ borderBottom: "1px solid var(--c-line)" }}
                >
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-3 py-4">
                  <Accordion
                    type="single"
                    collapsible
                    variant="ghost"
                    className="w-full max-w-none"
                  >
                    {menu.map((item) => renderMobileMenuItem(item, () => setMobileOpen(false)))}
                  </Accordion>
                </div>

                <div
                  className="px-5 py-4"
                  style={{ borderTop: "1px solid var(--c-line)" }}
                >
                  <HeaderCta fullWidth />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
