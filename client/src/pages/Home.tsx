import { useState, useEffect } from "react";
import Seo from "@/components/Seo";
import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import PricingCard, { type PricingPlan } from "@/components/PricingCard";
import StatPill from "@/components/StatPill";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Globe,
  Leaf,
  Lock,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_URL = "https://wa.me/5542999401166";

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Web Starter",
    price: "R$ 38",
    priceYearly: "R$ 410",
    period: "/mês",
    tagline: "Para projetos rápidos com presença profissional.",
    features: [
      "1 site · 10 GB SSD NVMe",
      "SSL automático + HTTP/3",
      "Backups semanais",
      "E-mail profissional (1 caixa)",
      "Suporte por ticket",
    ],
    ctaLabel: "Começar agora",
  },
  {
    id: "pro",
    name: "Web Pro",
    price: "R$ 75",
    priceYearly: "R$ 810",
    period: "/mês",
    tagline: "Performance + recursos para crescer com tranquilidade.",
    features: [
      "Até 5 sites · 50 GB NVMe",
      "Backups diários + restauração rápida",
      "CDN e cache inteligente",
      "E-mail profissional (10 caixas)",
      "Monitoramento e mitigação básica de ataques",
    ],
    recommended: true,
    ctaLabel: "Escolher Web Pro",
  },
  {
    id: "vps",
    name: "VPS Core",
    price: "R$ 162",
    priceYearly: "R$ 1.750",
    period: "/mês",
    tagline: "Controle total para apps, APIs e workloads críticos.",
    features: [
      "2 vCPU · 4 GB RAM · 80 GB NVMe",
      "Snapshots sob demanda",
      "Rede otimizada (baixa latência)",
      "Acesso root + firewall",
      "Suporte prioritário",
    ],
    ctaLabel: "Selecionar VPS",
  },
];

export default function Home() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  useEffect(() => {
    // Corrige um possível erro de referência ou estado inicial se necessário
    if (!billing) setBilling("monthly");
  }, [billing]);

  const onSelectPlan = (planId: string) => {
    alert(`Placeholder: contratação do plano "${planId}" (checkout em breve).`);
  };

  return (
    <SiteShell>
      <Seo
        title="Hospedagem sustentável com performance noturna"
        description="NightHost: web hosting, VPS e revenda de domínios com foco em sustentabilidade digital, segurança e velocidade. Uma experiência premium — do deploy ao suporte."
        path="/"
      />

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8 lg:pb-20">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                data-testid="home-kicker"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Infra premium · estética noturna · carbono consciente</span>
              </motion.div>

              <motion.h1
                className="mt-5 text-4xl leading-[1.02] sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                data-testid="home-hero-title"
              >
                Hospedagem que{" "}
                <span className="text-gradient">acelera</span> seu produto — e{" "}
                <span className="text-gradient">reduz</span> o ruído operacional.
              </motion.h1>

              <motion.p
                className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                data-testid="home-hero-subtitle"
              >
                Web Hosting, VPS e Revenda de Domínios com foco em{" "}
                <span className="text-foreground/90 font-semibold">performance real</span>,{" "}
                <span className="text-foreground/90 font-semibold">segurança</span> e{" "}
                <span className="text-foreground/90 font-semibold">sustentabilidade digital</span>.
                Interface limpa, suporte humano e infra pronta para escalar.
              </motion.p>

              <motion.div
                className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2 rounded-2xl bg-muted/30 p-1.5 ring-1 ring-border/55">
                    <Button
                      type="button"
                      variant={billing === "monthly" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setBilling("monthly")}
                      className="rounded-xl h-9 px-4 text-xs font-bold"
                    >
                      Mensal
                    </Button>
                    <Button
                      type="button"
                      variant={billing === "yearly" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setBilling("yearly")}
                      className="rounded-xl h-9 px-4 text-xs font-bold"
                    >
                      Anual (-10%)
                    </Button>
                  </div>

                  <Button
                    type="button"
                    onClick={() => alert("Placeholder: contratação/checkout (em breve).")}
                    data-testid="home-cta-contratar"
                    className={cn(
                      "h-12 rounded-2xl px-6 text-sm font-bold btn-sheen",
                      "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                      "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
                      "hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    )}
                  >
                    Contratar agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <Button
                  asChild
                  variant="secondary"
                  data-testid="home-cta-planos"
                  className={cn(
                    "h-12 rounded-2xl px-6 text-sm font-bold",
                    "bg-muted/35 text-foreground ring-1 ring-border/60",
                    "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  )}
                >
                  <Link href="/planos">Ver planos</Link>
                </Button>

                <Button
                  asChild
                  variant="secondary"
                  data-testid="home-cta-whatsapp"
                  className={cn(
                    "h-12 rounded-2xl px-6 text-sm font-bold",
                    "bg-muted/20 text-foreground ring-1 ring-border/60",
                    "hover:bg-muted/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  )}
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
              </motion.div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3" data-testid="home-stats">
                <StatPill icon={<Zap className="h-5 w-5" />} label="Tempo até online" value="minutos" testId="stat-tempo" />
                <StatPill icon={<Lock className="h-5 w-5" />} label="SSL + WAF" value="por padrão" testId="stat-seguranca" />
                <StatPill icon={<Leaf className="h-5 w-5" />} label="Digital sustentável" value="por design" testId="stat-eco" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-[2rem] glass-strong noise-overlay p-6 sm:p-7">
                <div
                  className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-accent/15 blur-3xl"
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="font-display text-sm text-muted-foreground">
                      Painel NightHost
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-muted/25 px-3 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/55">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
                      <span data-testid="home-status">Operacional</span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl bg-muted/20 ring-1 ring-border/55 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-foreground/90">night-api</div>
                        <div className="text-xs text-muted-foreground">VPS</div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <div className="rounded-xl bg-background/20 p-2 ring-1 ring-border/40">
                          <div>CPU</div>
                          <div className="mt-1 font-semibold text-foreground/90">2 vCPU</div>
                        </div>
                        <div className="rounded-xl bg-background/20 p-2 ring-1 ring-border/40">
                          <div>RAM</div>
                          <div className="mt-1 font-semibold text-foreground/90">4 GB</div>
                        </div>
                        <div className="rounded-xl bg-background/20 p-2 ring-1 ring-border/40">
                          <div>NVMe</div>
                          <div className="mt-1 font-semibold text-foreground/90">80 GB</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-accent/8 to-transparent ring-1 ring-border/55 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/25">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground/90">
                            Segurança sem fricção
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground leading-relaxed">
                            SSL automático, boas práticas de hardening e monitoramento para manter seu
                            produto no ar — mesmo quando a noite fica turbulenta.
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => alert("Placeholder: abrir demonstração do painel (em breve).")}
                      data-testid="home-cta-demo"
                      className={cn(
                        "h-12 rounded-2xl w-full justify-between px-5 btn-sheen",
                        "bg-muted/35 text-foreground ring-1 ring-border/60",
                        "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                      )}
                    >
                      <span>Ver demonstração do painel</span>
                      <ArrowRight className="h-4 w-4 opacity-80" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-muted/20 ring-1 ring-border/55 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90">
                    <Rocket className="h-4 w-4 text-primary" />
                    Deploy ágil
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed" data-testid="home-pill-deploy">
                    Stack pronta para aplicações modernas e sites rápidos.
                  </p>
                </div>
                <div className="rounded-2xl bg-muted/20 ring-1 ring-border/55 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90">
                    <Globe className="h-4 w-4 text-primary" />
                    Domínios
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed" data-testid="home-pill-domains">
                    Registro e revenda com gestão simplificada.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="home-features">
            <FeatureCard
              testId="feature-velocidade"
              icon={<Zap className="h-5 w-5" />}
              title="Velocidade que aparece no Core Web Vitals"
              description="Cache e otimizações para reduzir TTFB, com NVMe e rotas eficientes para seu público."
              highlight="Performance"
            />
            <FeatureCard
              testId="feature-seguranca"
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Segurança de base — sem configurar mil coisas"
              description="SSL automático, políticas de segurança e monitoramento com alertas. Você foca no produto."
              highlight="Proteção"
            />
            <FeatureCard
              testId="feature-sustentavel"
              icon={<Leaf className="h-5 w-5" />}
              title="Sustentabilidade digital, de verdade"
              description="Práticas de infraestrutura e eficiência energética para reduzir o desperdício computacional."
              highlight="Eco"
            />
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                testId="home-pricing-heading"
                eyebrow="Planos"
                title={
                  <>
                    Escolha um plano que{" "}
                    <span className="text-gradient">não te limita</span>.
                  </>
                }
                description="Do primeiro deploy ao tráfego pesado: planos com performance, segurança e suporte, sem surpresas."
              />
            </div>
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <Button
                asChild
                data-testid="home-link-planos"
                className={cn(
                  "h-11 rounded-2xl px-5 btn-sheen",
                  "bg-gradient-to-r from-primary/18 via-accent/10 to-transparent",
                  "ring-1 ring-border/55 text-foreground hover:ring-border"
                )}
              >
                <Link href="/planos" className="flex items-center gap-2">
                  Ver todos os detalhes
                  <ArrowRight className="h-4 w-4 opacity-80" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {plans.map((p) => (
              <PricingCard
                key={p.id}
                plan={{
                  ...p,
                  price: billing === "yearly" ? p.priceYearly! : p.price,
                  period: billing === "yearly" ? "/ano" : "/mês",
                }}
                testId={`home-plan-${p.id}`}
                onSelect={onSelectPlan}
                extra={
                  p.id === "pro" ? (
                    <div className="rounded-2xl bg-primary/8 p-4 ring-1 ring-primary/20">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90">
                        <Cpu className="h-4 w-4 text-primary" />
                        Otimizado para stacks modernas
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        Perfeito para React, Next, APIs Node e aplicações com crescimento rápido.
                      </p>
                    </div>
                  ) : null
                }
              />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
