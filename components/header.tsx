"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Download, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
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
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { navLinks, NavItem } from "@/lib/nav-links2";

const SECTION_IDS = [
  "inicio",
  "sobre-mi",
  "terapia",
  "filosofia",
  "servicios",
  "orga",
  "videos",
  "testimonios",
  "contacto",
] as const;

/** Hover: primary suave. Activo: accent muy sutil. */
const navItemInteractive = cn(
  "rounded-lg transition-colors duration-150 outline-none",
  "hover:bg-primary/10 hover:text-foreground",
  "focus-visible:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/20",
);

const navItemActive = "bg-accent/8 text-foreground";

const navTriggerClass = cn(
  "inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2",
  "text-sm font-medium transition-colors duration-150 outline-none",
  "hover:bg-primary/10 hover:text-foreground",
  "focus-visible:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/20",
  "data-[state=open]:bg-accent/8 data-[state=open]:text-foreground",
  "data-[state=open]:hover:bg-accent/8",
  "disabled:pointer-events-none disabled:opacity-50",
);

function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

function isSectionActive(href: string, activeId: string) {
  return href.replace("#", "") === activeId;
}

function NavListItem({
  href,
  label,
  description,
  isActive,
}: {
  href: string;
  label: string;
  description?: string;
  isActive?: boolean;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "group flex select-none flex-col gap-1 p-3",
            "text-sm leading-none no-underline",
            navItemInteractive,
            "active:scale-[0.98]",
            isActive && navItemActive,
          )}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "size-1.5 rounded-full bg-primary/25 transition-colors duration-200",
                "group-hover:bg-primary/50",
                isActive && "bg-accent/50",
              )}
            />
            <span className="font-medium leading-none">{label}</span>
          </div>
          {description && (
            <p className="mt-0.5 pl-3.5 text-xs leading-snug text-muted-foreground">
              {description}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

// ─── Mobile accordion section ─────────────────────────────────────────────────

function MobileSection({
  item,
  sheetOpen,
  activeId,
}: {
  item: NavItem;
  sheetOpen: boolean;
  activeId: string;
}) {
  const [open, setOpen] = useState(false);
  const hasActiveChild = item.children?.some((child) =>
    isSectionActive(child.href, activeId),
  );

  useEffect(() => {
    if (!sheetOpen) setOpen(false);
  }, [sheetOpen]);

  useEffect(() => {
    if (hasActiveChild) setOpen(true);
  }, [hasActiveChild]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          aria-expanded={open}
          className={cn(
            "flex w-full items-center justify-between px-3 py-2.5",
            "text-sm font-medium active:scale-[0.98]",
            navItemInteractive,
            (open || hasActiveChild) && navItemActive,
          )}
        >
          {item.label}
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
              open && "rotate-180 text-foreground",
            )}
            aria-hidden
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <ul className="mt-1 space-y-0.5 border-l border-primary/15 pl-3 pr-1">
          {item.children?.map((child) => {
            const childActive = isSectionActive(child.href, activeId);
            return (
            <li key={child.href}>
              <SheetClose asChild>
                <Link
                  href={child.href}
                  className={cn(
                    "group flex flex-col gap-0.5 px-3 py-2.5",
                    "text-sm active:scale-[0.98]",
                    navItemInteractive,
                    childActive && navItemActive,
                  )}
                >
                  <span className="flex items-center gap-2.5 font-medium text-foreground">
                    <span
                      className={cn(
                        "size-1.5 shrink-0 rounded-full bg-primary/25 transition-colors duration-200",
                        "group-hover:bg-primary/50",
                        childActive && "bg-accent/50",
                      )}
                    />
                    {child.label}
                  </span>
                  {child.description ? (
                    <span className="pl-4 text-xs leading-snug text-muted-foreground">
                      {child.description}
                    </span>
                  ) : null}
                </Link>
              </SheetClose>
            </li>
            );
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 overflow-visible",
        "transition-all duration-300 ease-out",
        scrolled
          ? "border-b border-border/50 bg-background/60 py-2 shadow-lg backdrop-blur-lg"
          : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto max-w-6xl overflow-visible px-4 sm:px-6">
        <nav className="flex items-center justify-between overflow-visible">
          {/* ── Logo ── */}
          <Link href="#inicio" className="flex items-center gap-3">
            <Image
              src="/images/romina-logo2-reduced.webp"
              alt="Romina Melul - Terapia Psicocorporal"
              width={50}
              height={50}
              className="rounded-lg h-10 w-auto"
            />
            <div className="hidden sm:block">
              <p className="text-lg font-semibold text-foreground">
                Romina Melul
              </p>
              <p className="text-xs text-muted-foreground tracking-wide">
                Terapeuta Psicocorporal
              </p>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden items-center gap-1 overflow-visible md:flex">
            <NavigationMenu viewport={false} className="z-50">
              <NavigationMenuList>
                {/* Inicio */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="#inicio"
                      className={cn(
                        navTriggerClass,
                        isSectionActive("#inicio", activeId) && navItemActive,
                      )}
                    >
                      Inicio
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Dropdown items */}
                {navLinks
                  .filter((item) => item.children)
                  .map((item) => {
                    const groupActive = item.children?.some((child) =>
                      isSectionActive(child.href, activeId),
                    );
                    return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger
                        className={cn(navTriggerClass, groupActive && navItemActive)}
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="left-0 top-full z-50 min-w-[260px] p-0">
                        <ul
                          className={cn(
                            "grid grid-cols-1 gap-1 p-2",
                            item.children!.length >= 3
                              ? "w-[300px]"
                              : "w-[260px]",
                          )}
                        >
                          {item.children!.map((child) => (
                            <NavListItem
                              key={child.href}
                              href={child.href}
                              label={child.label}
                              description={child.description}
                              isActive={isSectionActive(child.href, activeId)}
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    );
                  })}
              </NavigationMenuList>
            </NavigationMenu>

            <Separator orientation="vertical" className="mx-2 h-5" />

            {/* Descargar CV */}
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-xl text-muted-foreground",
                "hover:bg-primary/10 hover:text-foreground",
                "active:scale-[0.97]",
                "transition-all duration-150",
              )}
            >
              <Link href="/CV_ROMINAMELUL..pdf" download>
                <Download className="mr-1.5 size-4" aria-hidden="true" />
                CV
              </Link>
            </Button>

            {/* CTA */}
            <Button
              asChild
              size="sm"
              className={cn(
                "rounded-xl bg-primary text-primary-foreground",
                "hover:bg-primary/90 active:bg-primary/80",
                "shadow-sm shadow-primary/20 hover:shadow-primary/30",
                "active:scale-[0.97] active:shadow-none",
                "transition-all duration-150",
              )}
            >
              <Link href="#contacto">Contacto</Link>
            </Button>
          </div>

          {/* ── Mobile sheet ── */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "shrink-0 rounded-xl md:hidden",
                  navItemInteractive,
                )}
                aria-label={sheetOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={sheetOpen}
              >
                {sheetOpen ? (
                  <X className="size-5" aria-hidden />
                ) : (
                  <Menu className="size-5" aria-hidden />
                )}
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-[min(100vw-2rem,20rem)] flex-col gap-0 p-0 sm:max-w-xs [&>button]:hidden"
            >
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="relative flex items-center gap-3 border-b px-4 py-4 pr-14">
                  <SheetClose asChild>
                    <Link
                      href="#inicio"
                      className="flex min-w-0 flex-1 items-center gap-3"
                    >
                      <Image
                        src="/images/romina-logo2-reduced.webp"
                        alt=""
                        width={40}
                        height={40}
                        className="h-9 w-auto shrink-0 rounded-lg"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          Romina Melul
                        </p>
                        <p className="truncate text-[11px] text-muted-foreground">
                          Terapeuta Psicocorporal
                        </p>
                      </div>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-3 top-3 size-9 shrink-0 rounded-lg"
                      aria-label="Cerrar menú"
                    >
                      <X className="size-4" aria-hidden />
                    </Button>
                  </SheetClose>
                </div>

                {/* Sheet nav */}
                <nav
                  className="flex-1 space-y-1 overflow-y-auto px-3 py-4"
                  aria-label="Navegación principal"
                >
                  <SheetClose asChild>
                    <Link
                      href="#inicio"
                      className={cn(
                        "flex items-center px-3 py-2.5 text-sm font-medium active:scale-[0.98]",
                        navItemInteractive,
                        isSectionActive("#inicio", activeId) && navItemActive,
                      )}
                    >
                      Inicio
                    </Link>
                  </SheetClose>

                  {navLinks
                    .filter((i) => i.children)
                    .map((item) => (
                      <MobileSection
                        key={item.label}
                        item={item}
                        sheetOpen={sheetOpen}
                        activeId={activeId}
                      />
                    ))}
                </nav>

                {/* Sheet footer CTA */}
                <div className="border-t bg-background p-4 space-y-2">
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="outline"
                      className={cn(
                        "w-full rounded-xl border-primary/30 text-primary",
                        "hover:bg-primary/10 active:scale-[0.97]",
                        "transition-all duration-150",
                      )}
                    >
                      <Link href="/CV_ROMINAMELUL..pdf" download>
                        <Download className="mr-2 size-4" aria-hidden="true" />
                        Descargar CV
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className={cn(
                        "w-full rounded-xl bg-primary text-primary-foreground",
                        "hover:bg-primary/90 active:scale-[0.97]",
                        "transition-all duration-150",
                      )}
                    >
                      <Link href="#contacto">Agenda tu sesión</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
