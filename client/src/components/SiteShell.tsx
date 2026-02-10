import { ReactNode, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

type NavItem = { label: string; href: string; testId: string };

const WHATSAPP_URL = "https://wa.me/5542999401166";

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function BrandMark() {
  return (
    <div className="relative flex items-center gap-3">
      <div
        className={cn(
          "relative grid place-items-center rounded-2xl",
          "h-10 w-10 sm:h-11 sm:w-11",
          "bg-gradient-to-br from-primary/25 via-accent/20 to-foreground/5",
          "ring-gradient"
        )}
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-2xl noise-overlay" />
        <Sparkles className="relative h-5 w-5 text-primary" />
      </div>
      <div className="leading-tight">
        <div className="font-display text-[15px] tracking-tight sm:text-base">
          Night<span className="text-gradient">Host</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Hosting sustentável · Domínios · VPS
        </div>
      </div>
    </div>
  );
}

function DesktopNav({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <nav className="hidden items-center gap-2 md:flex" aria-label="Navegação principal">
      {items.map((it) => {
        const active = pathname === it.href;
        return (
          <Link
            key={it.href}
            href={it.href}
            data-testid={it.testId}
            className={cn(
              "group relative rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-300",
              "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              active && "text-foreground bg-muted/55"
            )}
          >
            <span className="relative z-10">{it.label}</span>
            <span
              className={cn(
                "pointer-events-none absolute inset-x-3 -bottom-0.5 h-px rounded-full",
                "bg-gradient-to-r from-primary/0 via-primary/70 to-accent/0",
                "opacity-0 transition-opacity duration-300",
                active && "opacity-100"
              )}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNav({
  items,
  open,
  onClose,
}: {
  items: NavItem[];
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="absolute inset-0 bg-background/65 backdrop-blur" onClick={onClose} />
          <motion.div
            className="absolute left-3 right-3 top-3 rounded-3xl glass-strong p-3 shadow-2xl"
            initial={{ y: -18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between">
              <BrandMark />
              <button
                type="button"
                onClick={onClose}
                data-testid="btn-menu-fechar"
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                  "bg-muted/40 text-foreground/90 ring-1 ring-border/60",
                  "hover:bg-muted/60 hover:-translate-y-0.5 active:translate-y-0",
                  "transition-all duration-200"
                )}
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 grid gap-1">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onClose}
                  data-testid={it.testId}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3",
                    "bg-muted/30 ring-1 ring-border/55",
                    "text-foreground/90 font-semibold",
                    "hover:bg-muted/45 hover:-translate-y-0.5 active:translate-y-0",
                    "transition-all duration-200"
                  )}
                >
                  <span>{it.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Button
                asChild
                className={cn(
                  "rounded-2xl h-11 justify-between px-4",
                  "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                  "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25",
                  "transition-all duration-200"
                )}
                data-testid="cta-mobile-planos"
              >
                <Link href="/planos">
                  <span>Ver Planos</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                className={cn(
                  "rounded-2xl h-11 justify-between px-4",
                  "bg-muted/40 text-foreground hover:bg-muted/60",
                  "ring-1 ring-border/60"
                )}
                data-testid="cta-mobile-whatsapp"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  <span>WhatsApp</span>
                  <ExternalLink className="h-4 w-4 opacity-80" />
                </a>
              </Button>
            </div>

            <div className="mt-3 flex items-start gap-3 rounded-2xl bg-muted/25 px-4 py-3 ring-1 ring-border/55">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                Infraestrutura otimizada e foco em sustentabilidade digital — com suporte humano
                de verdade.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="relative mt-16 border-t border-border/60">
      <div className="absolute inset-0 bg-radial-glow opacity-80" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandMark />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              NightHost é uma plataforma de hospedagem e serviços digitais com estética noturna,
              desempenho de ponta e compromisso com um futuro mais sustentável na web.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                data-testid="footer-whatsapp"
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold",
                  "bg-muted/35 ring-1 ring-border/60 text-foreground/90",
                  "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0",
                  "transition-all duration-200"
                )}
              >
                <span>Falar no WhatsApp</span>
                <ExternalLink className="h-4 w-4 opacity-75" />
              </a>

              <Link
                href="/contato"
                data-testid="footer-contato"
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold",
                  "bg-gradient-to-r from-primary/18 via-accent/10 to-transparent",
                  "ring-1 ring-border/55 text-foreground/90",
                  "hover:ring-border hover:-translate-y-0.5 active:translate-y-0",
                  "transition-all duration-200"
                )}
              >
                <span>Fale Conosco</span>
                <ArrowRight className="h-4 w-4 opacity-80" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="font-display text-sm text-foreground">Produto</div>
                <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  <Link href="/servicos" data-testid="footer-servicos" className="hover:text-foreground transition-colors">
                    Serviços
                  </Link>
                  <Link href="/planos" data-testid="footer-planos" className="hover:text-foreground transition-colors">
                    Planos
                  </Link>
                  <Link href="/sobre" data-testid="footer-sobre" className="hover:text-foreground transition-colors">
                    Sobre
                  </Link>
                </div>
              </div>

              <div>
                <div className="font-display text-sm text-foreground">Legal</div>
                <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  <button
                    type="button"
                    data-testid="footer-termos"
                    onClick={() => alert("Placeholder: Termos de Uso (em breve).")}
                    className="text-left hover:text-foreground transition-colors"
                  >
                    Termos de Uso
                  </button>
                  <button
                    type="button"
                    data-testid="footer-privacidade"
                    onClick={() => alert("Placeholder: Política de Privacidade (em breve).")}
                    className="text-left hover:text-foreground transition-colors"
                  >
                    Política de Privacidade
                  </button>
                  <button
                    type="button"
                    data-testid="footer-sla"
                    onClick={() => alert("Placeholder: SLA e suporte (em breve).")}
                    className="text-left hover:text-foreground transition-colors"
                  >
                    SLA & Suporte
                  </button>
                </div>
              </div>

              <div>
                <div className="font-display text-sm text-foreground">Social</div>
                <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  <button
                    type="button"
                    data-testid="footer-linkedin"
                    onClick={() => window.open("https://www.linkedin.com", "_blank", "noreferrer")}
                    className="text-left hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </button>
                  <button
                    type="button"
                    data-testid="footer-github"
                    onClick={() => window.open("https://github.com", "_blank", "noreferrer")}
                    className="text-left hover:text-foreground transition-colors"
                  >
                    GitHub
                  </button>
                  <button
                    type="button"
                    data-testid="footer-instagram"
                    onClick={() => window.open("https://instagram.com", "_blank", "noreferrer")}
                    className="text-left hover:text-foreground transition-colors"
                  >
                    Instagram
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-muted-foreground">
                <span data-testid="footer-copyright">
                  © {new Date().getFullYear()} NightHost. Todos os direitos reservados.
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="opacity-80">Feito para performance, desenhado para a noite.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function SiteShell({
  children,
}: {
  children: ReactNode;
}) {
  const [location] = useLocation();
  const y = useScrollY();
  const [mobileOpen, setMobileOpen] = useState(false);

  const items: NavItem[] = useMemo(
    () => [
      { label: "Home", href: "/", testId: "nav-home" },
      { label: "Serviços", href: "/servicos", testId: "nav-servicos" },
      { label: "Planos", href: "/planos", testId: "nav-planos" },
      { label: "Sobre", href: "/sobre", testId: "nav-sobre" },
      { label: "Contato", href: "/contato", testId: "nav-contato" },
    ],
    [],
  );

  const elevated = y > 8;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-radial-glow" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-[0.14]" aria-hidden="true" />

      <header
        className={cn(
          "sticky top-0 z-40 border-b border-border/60",
          "transition-all duration-300",
          elevated ? "bg-background/60 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            <Link href="/" data-testid="brand-home" className="group flex items-center gap-2">
              <BrandMark />
            </Link>

            <DesktopNav items={items} pathname={location} />

            <div className="hidden items-center gap-2 md:flex">
              <Button
                type="button"
                variant="secondary"
                className={cn(
                  "rounded-xl bg-muted/35 text-foreground ring-1 ring-border/60",
                  "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                )}
                data-testid="cta-contratar"
                onClick={() => alert("Placeholder: contratação/checkout (em breve).")}
              >
                Contratar
              </Button>

              <Button
                asChild
                className={cn(
                  "rounded-xl btn-sheen",
                  "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                  "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
                  "hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                )}
                data-testid="cta-ver-planos"
              >
                <Link href="/planos" className="flex items-center gap-2">
                  <span>Ver Planos</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                className={cn(
                  "rounded-xl bg-muted/35 text-foreground ring-1 ring-border/60",
                  "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                )}
                data-testid="cta-whatsapp"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              data-testid="btn-menu-abrir"
              className={cn(
                "md:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl",
                "bg-muted/35 ring-1 ring-border/60 text-foreground/90",
                "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0",
                "transition-all duration-200"
              )}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav items={items} open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
