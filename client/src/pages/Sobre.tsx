import Seo from "@/components/Seo";
import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { ArrowRight, Eye, HeartHandshake, Leaf, Target, Timer, Zap } from "lucide-react";

export default function Sobre() {
  return (
    <SiteShell>
      <Seo
        title="Sobre"
        description="Conheça a NightHost: missão, visão e valores. Uma plataforma de hosting e serviços digitais com foco em sustentabilidade, performance e experiência premium."
        path="/sobre"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          testId="sobre-heading"
          eyebrow="Sobre a NightHost"
          title={
            <>
              A web pode ser{" "}
              <span className="text-gradient">rápida</span>,{" "}
              <span className="text-gradient">segura</span> e{" "}
              <span className="text-gradient">responsável</span>.
            </>
          }
          description="A NightHost nasceu para reduzir fricção: menos configuração caótica, mais previsibilidade. Infra com estética noturna, mas com luz alta nos números — performance, uptime e eficiência."
          actions={
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                data-testid="sobre-cta-contato"
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
                type="button"
                variant="secondary"
                data-testid="sobre-cta-roadmap"
                onClick={() => alert("Placeholder: roadmap público (em breve).")}
                className={cn(
                  "h-11 rounded-2xl px-5",
                  "bg-muted/35 text-foreground ring-1 ring-border/60",
                  "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                )}
              >
                Ver roadmap
              </Button>
            </div>
          }
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3" data-testid="sobre-mvv">
          <FeatureCard
            testId="sobre-missao"
            icon={<Target className="h-5 w-5" />}
            title="Missão"
            description="Entregar hosting e serviços digitais com performance, segurança e suporte que realmente resolve — com escolhas técnicas sustentáveis."
            highlight="Missão"
          />
          <FeatureCard
            testId="sobre-visao"
            icon={<Eye className="h-5 w-5" />}
            title="Visão"
            description="Ser referência em infraestrutura digital eficiente e consciente, com uma experiência premium para devs, agências e negócios."
            highlight="Visão"
          />
          <FeatureCard
            testId="sobre-valores"
            icon={<HeartHandshake className="h-5 w-5" />}
            title="Valores"
            description="Transparência, responsabilidade, engenharia bem feita e obsessão por experiência do cliente."
            highlight="Valores"
          />
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="sobre-principios">
          <FeatureCard
            testId="sobre-principio-velocidade"
            icon={<Zap className="h-5 w-5" />}
            title="Velocidade com propósito"
            description="Otimização não é estética: é custo menor, melhor UX e menos energia desperdiçada."
          />
          <FeatureCard
            testId="sobre-principio-tempo"
            icon={<Timer className="h-5 w-5" />}
            title="Menos tempo apagando incêndios"
            description="Configurações sensatas e automações que evitam que o “fácil” vire “frágil”."
          />
          <FeatureCard
            testId="sobre-principio-sustentavel"
            icon={<Leaf className="h-5 w-5" />}
            title="Sustentabilidade digital"
            description="Eficiência e boas escolhas técnicas para reduzir consumo e ampliar durabilidade do seu stack."
          />
        </div>

        <div className="mt-12 rounded-3xl glass-strong noise-overlay p-6 sm:p-8" data-testid="sobre-cta-box">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="font-display text-2xl">
                Quer uma recomendação personalizada?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Responda 3 perguntas e a gente indica o melhor caminho (plano + próximos passos).
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                onClick={() => alert("Placeholder: questionário (em breve).")}
                data-testid="sobre-cta-questionario"
                className={cn(
                  "h-11 rounded-2xl px-5 btn-sheen",
                  "bg-gradient-to-r from-primary/18 via-accent/10 to-transparent",
                  "ring-1 ring-border/55 text-foreground hover:ring-border"
                )}
              >
                Iniciar questionário
              </Button>
              <Button
                asChild
                data-testid="sobre-cta-planos"
                className={cn(
                  "h-11 rounded-2xl px-5 btn-sheen",
                  "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                  "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
                  "hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                )}
              >
                <Link href="/planos" className="flex items-center gap-2">
                  Ver Planos <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
