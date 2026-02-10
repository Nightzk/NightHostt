import Seo from "@/components/Seo";
import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Cloud, Cpu, Globe, Leaf, ShieldCheck, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Servicos() {
  return (
    <SiteShell>
      <Seo
        title="Serviços"
        description="Serviços NightHost: Web Hosting, VPS, revenda de domínios e hospedagem sustentável. Infra moderna, segurança e performance com suporte humano."
        path="/servicos"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          testId="servicos-heading"
          eyebrow="Serviços"
          title={
            <>
              Um conjunto completo para operar na web com{" "}
              <span className="text-gradient">confiança</span>.
            </>
          }
          description="Escolha a camada certa para seu momento: sites e e-commerce, aplicações, APIs e revenda de domínios — tudo com a assinatura NightHost."
          actions={
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                data-testid="servicos-cta-planos"
                className={cn(
                  "h-11 rounded-2xl px-5 btn-sheen",
                  "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                  "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
                  "hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                )}
              >
                <Link href="/planos" className="flex items-center gap-2">
                  Ver planos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                type="button"
                variant="secondary"
                data-testid="servicos-cta-consultoria"
                onClick={() => alert("Placeholder: consultoria técnica (em breve).")}
                className={cn(
                  "h-11 rounded-2xl px-5",
                  "bg-muted/35 text-foreground ring-1 ring-border/60",
                  "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                )}
              >
                Falar com um especialista
              </Button>
            </div>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="servicos-cards">
          <FeatureCard
            testId="servico-webhosting"
            icon={<Cloud className="h-5 w-5" />}
            title="Web Hosting"
            description="Sites rápidos com cache, SSL e painel amigável. Ideal para landing pages, portfólios e pequenas lojas."
            highlight="Sites"
            footer={
              <button
                type="button"
                data-testid="servico-webhosting-acao"
                onClick={() => alert("Placeholder: detalhes de Web Hosting (em breve).")}
                className={cn(
                  "mt-2 inline-flex items-center gap-2 text-sm font-semibold",
                  "text-primary hover:text-primary/90 transition-colors"
                )}
              >
                Ver detalhes <ArrowRight className="h-4 w-4" />
              </button>
            }
          />

          <FeatureCard
            testId="servico-vps"
            icon={<Cpu className="h-5 w-5" />}
            title="VPS Hosting"
            description="Infra dedicada para APIs, apps e workloads críticos. Acesso root, snapshots e rede otimizada."
            highlight="Controle"
            footer={
              <button
                type="button"
                data-testid="servico-vps-acao"
                onClick={() => alert("Placeholder: detalhes de VPS (em breve).")}
                className={cn(
                  "mt-2 inline-flex items-center gap-2 text-sm font-semibold",
                  "text-primary hover:text-primary/90 transition-colors"
                )}
              >
                Comparar configurações <ArrowRight className="h-4 w-4" />
              </button>
            }
          />

          <FeatureCard
            testId="servico-dominios"
            icon={<Globe className="h-5 w-5" />}
            title="Revenda de Domínios"
            description="Gerencie portfólio, renovações e registros com um fluxo simples — pronto para agências e revendedores."
            highlight="Domínios"
            footer={
              <button
                type="button"
                data-testid="servico-dominios-acao"
                onClick={() => alert("Placeholder: programa de revenda (em breve).")}
                className={cn(
                  "mt-2 inline-flex items-center gap-2 text-sm font-semibold",
                  "text-primary hover:text-primary/90 transition-colors"
                )}
              >
                Solicitar onboarding <ArrowRight className="h-4 w-4" />
              </button>
            }
          />

          <FeatureCard
            testId="servico-sustentavel"
            icon={<Leaf className="h-5 w-5" />}
            title="Hospedagem Sustentável"
            description="Infra eficiente, escolhas técnicas conscientes e foco em reduzir desperdício computacional — sem sacrificar performance."
            highlight="Eco"
            footer={
              <button
                type="button"
                data-testid="servico-sustentavel-acao"
                onClick={() => alert("Placeholder: relatório de sustentabilidade (em breve).")}
                className={cn(
                  "mt-2 inline-flex items-center gap-2 text-sm font-semibold",
                  "text-primary hover:text-primary/90 transition-colors"
                )}
              >
                Ver princípios <ArrowRight className="h-4 w-4" />
              </button>
            }
          />

          <FeatureCard
            testId="servico-seguranca"
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Camada de Segurança"
            description="Boas práticas, monitoramento, mitigação básica e orientação para hardening — ideal para quem precisa dormir em paz."
            highlight="Shield"
            footer={
              <button
                type="button"
                data-testid="servico-seguranca-acao"
                onClick={() => alert("Placeholder: pacotes de segurança (em breve).")}
                className={cn(
                  "mt-2 inline-flex items-center gap-2 text-sm font-semibold",
                  "text-primary hover:text-primary/90 transition-colors"
                )}
              >
                Explorar pacotes <ArrowRight className="h-4 w-4" />
              </button>
            }
          />

          <FeatureCard
            testId="servico-migracao"
            icon={<Wrench className="h-5 w-5" />}
            title="Migração Assistida"
            description="Trazemos seu projeto com cuidado: planejamento, validações e ajustes de performance. Menos downtime, mais previsibilidade."
            highlight="Suporte"
            footer={
              <button
                type="button"
                data-testid="servico-migracao-acao"
                onClick={() => alert("Placeholder: solicitar migração (em breve).")}
                className={cn(
                  "mt-2 inline-flex items-center gap-2 text-sm font-semibold",
                  "text-primary hover:text-primary/90 transition-colors"
                )}
              >
                Solicitar migração <ArrowRight className="h-4 w-4" />
              </button>
            }
          />
        </div>
      </section>
    </SiteShell>
  );
}
