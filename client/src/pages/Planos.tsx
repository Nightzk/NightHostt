import { useState } from "react";
import Seo from "@/components/Seo";
import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import PricingCard, { type PricingPlan } from "@/components/PricingCard";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { ArrowRight, Gauge, Globe, LifeBuoy, ShieldCheck, Sparkles } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5542999401166";

const plans: PricingPlan[] = [
  {
    id: "web-starter",
    name: "Web Starter",
    price: "R$ 38",
    priceYearly: "R$ 410",
    period: "/mês",
    tagline: "O essencial com acabamento premium.",
    features: [
      "1 site · 10 GB NVMe",
      "SSL automático + HTTP/3",
      "Backups semanais",
      "1 caixa de e-mail",
      "Suporte por ticket",
    ],
    ctaLabel: "Contratar Web Starter",
  },
  {
    id: "web-pro",
    name: "Web Pro",
    price: "R$ 75",
    priceYearly: "R$ 810",
    period: "/mês",
    tagline: "Equilíbrio ideal entre custo e performance.",
    features: [
      "Até 5 sites · 50 GB NVMe",
      "Backups diários + restauração rápida",
      "CDN e cache inteligente",
      "10 caixas de e-mail",
      "Monitoramento e mitigação básica",
    ],
    recommended: true,
    ctaLabel: "Contratar Web Pro",
  },
  {
    id: "vps-core",
    name: "VPS Core",
    price: "R$ 162",
    priceYearly: "R$ 1.750",
    period: "/mês",
    tagline: "Controle total para stacks e APIs.",
    features: [
      "2 vCPU · 4 GB RAM · 80 GB NVMe",
      "Snapshots sob demanda",
      "Firewall + rede otimizada",
      "Acesso root",
      "Suporte prioritário",
    ],
    ctaLabel: "Contratar VPS Core",
  },
  {
    id: "vps-scale",
    name: "VPS Scale",
    price: "R$ 324",
    priceYearly: "R$ 3.500",
    period: "/mês",
    tagline: "Para tráfego alto e serviços críticos.",
    features: [
      "4 vCPU · 8 GB RAM · 160 GB NVMe",
      "Snapshots + automação de backups",
      "Rede premium (baixa latência)",
      "Políticas avançadas de firewall",
      "SLA e suporte premium",
    ],
    ctaLabel: "Contratar VPS Scale",
  },
];

export default function Planos() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const onSelectPlan = (planId: string) => {
    alert(`Placeholder: contratar plano "${planId}" no ciclo ${billing} (checkout em breve).`);
  };

  return (
    <SiteShell>
      <Seo
        title="Planos"
        description="Planos NightHost para Web Hosting e VPS. Transparência, performance e suporte em um visual noturno premium."
        path="/planos"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeading
              testId="planos-heading"
              eyebrow="Planos & Preços"
              title={
                <>
                  Preço claro.{" "}
                  <span className="text-gradient">Infra de respeito</span>.
                </>
              }
              description="Escolha pelo tipo de projeto: sites, e-commerce, APIs, workloads. Todos com segurança e foco em eficiência."
              actions={
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
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
                  
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      onClick={() => alert("Placeholder: cálculo de migração (em breve).")}
                      data-testid="planos-cta-calcular"
                      className={cn(
                        "h-11 rounded-2xl px-5 btn-sheen",
                        "bg-gradient-to-r from-primary/18 via-accent/10 to-transparent",
                        "ring-1 ring-border/55 text-foreground hover:ring-border"
                      )}
                    >
                      Calcular migração
                    </Button>

                    <Button
                      asChild
                      data-testid="planos-cta-contato"
                      className={cn(
                        "h-11 rounded-2xl px-5 btn-sheen",
                        "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                        "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
                        "hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                      )}
                    >
                      <Link href="/contato" className="flex items-center gap-2">
                        Fale Conosco <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              }
            />
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-3xl glass noise-overlay p-5" data-testid="planos-aside">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90">
                <Sparkles className="h-4 w-4 text-primary" />
                Dica NightHost
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Se você quer “configurar e esquecer”, vá de{" "}
                <span className="text-foreground/90 font-semibold">Web Pro</span>. Para
                APIs e apps, o caminho é{" "}
                <span className="text-foreground/90 font-semibold">VPS</span>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  asChild
                  variant="secondary"
                  data-testid="planos-whatsapp"
                  className={cn(
                    "h-10 rounded-2xl bg-muted/35 text-foreground ring-1 ring-border/60",
                    "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  )}
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  data-testid="planos-comparar"
                  onClick={() => alert("Placeholder: comparador avançado (em breve).")}
                  className={cn(
                    "h-10 rounded-2xl bg-muted/25 text-foreground ring-1 ring-border/60",
                    "hover:bg-muted/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  )}
                >
                  Comparar detalhes
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-testid="planos-grid">
          {plans.map((p) => (
            <PricingCard
              key={p.id}
              plan={{
                ...p,
                price: billing === "yearly" ? p.priceYearly! : p.price,
                period: billing === "yearly" ? "/ano" : "/mês",
              }}
              onSelect={onSelectPlan}
              testId={`plano-${p.id}`}
            />
          ))}
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3" data-testid="planos-beneficios">
          <FeatureCard
            testId="beneficio-performance"
            icon={<Gauge className="h-5 w-5" />}
            title="Performance orientada a métricas"
            description="Infra e otimizações focadas em reduzir latência e melhorar experiência do usuário."
            highlight="Core"
          />
          <FeatureCard
            testId="beneficio-seguranca"
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Segurança como padrão"
            description="SSL, boas práticas e monitoramento — para você trabalhar sem ansiedade operacional."
            highlight="Seguro"
          />
          <FeatureCard
            testId="beneficio-dominios"
            icon={<Globe className="h-5 w-5" />}
            title="Domínios e gestão centralizada"
            description="Registre, renove e organize com visão de portfólio — ideal para agências e revenda."
            highlight="DNS"
          />
        </div>

        <div className="mt-10 rounded-3xl glass-strong noise-overlay p-6 sm:p-8" data-testid="planos-suporte">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90">
                <LifeBuoy className="h-4 w-4 text-primary" />
                Suporte que resolve
              </div>
              <h3 className="mt-2 font-display text-2xl">
                Precisa de ajuda para escolher ou migrar?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Conte para a gente seu stack, tráfego e objetivos. A gente recomenda o caminho mais
                seguro e eficiente — com passos claros.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                data-testid="planos-suporte-contato"
                className={cn(
                  "h-11 rounded-2xl px-5 btn-sheen",
                  "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                  "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
                  "hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                )}
              >
                <Link href="/contato" className="flex items-center gap-2">
                  Fale Conosco <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                data-testid="planos-suporte-whatsapp"
                className={cn(
                  "h-11 rounded-2xl px-5",
                  "bg-muted/35 text-foreground ring-1 ring-border/60",
                  "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                )}
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
