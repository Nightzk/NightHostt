import Seo from "@/components/Seo";
import SiteShell from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { ArrowLeft, FileX } from "lucide-react";

export default function NotFound() {
  return (
    <SiteShell>
      <Seo
        title="Página não encontrada"
        description="A página que você tentou acessar não existe. Volte para a Home da NightHost."
        path="/404"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-3xl glass-strong noise-overlay p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-muted/35 ring-1 ring-border/60 text-primary">
            <FileX className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl">404</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed" data-testid="notfound-text">
            Não encontramos esta rota. Se você veio de um link antigo, fale com a gente e a gente corrige rapidinho.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              data-testid="notfound-home"
              className={cn(
                "h-11 rounded-2xl px-5 btn-sheen",
                "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
                "hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              )}
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar para Home
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              data-testid="notfound-contato"
              className={cn(
                "h-11 rounded-2xl px-5",
                "bg-muted/35 text-foreground ring-1 ring-border/60",
                "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              )}
            >
              <Link href="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
