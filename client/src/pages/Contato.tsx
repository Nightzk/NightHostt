import { useMemo, useState } from "react";
import Seo from "@/components/Seo";
import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useCreateContactMessage, useContactMessages } from "@/hooks/use-contact-messages";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Inbox, Loader2, Send, ShieldCheck } from "lucide-react";
import type { CreateContactMessageRequest } from "@shared/schema";

const WHATSAPP_URL = "https://wa.me/5542999401166";

function validate(form: CreateContactMessageRequest) {
  const errors: Partial<Record<keyof CreateContactMessageRequest, string>> = {};
  if (!form.name?.trim()) errors.name = "Informe seu nome.";
  if (!form.email?.trim()) errors.email = "Informe seu e-mail.";
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = "E-mail inválido.";
  if (!form.subject?.trim()) errors.subject = "Informe o assunto.";
  if (!form.message?.trim()) errors.message = "Escreva sua mensagem.";
  if (form.message?.trim() && form.message.trim().length < 12)
    errors.message = "Conte um pouco mais (mínimo 12 caracteres).";
  return errors;
}

export default function Contato() {
  const { toast } = useToast();

  const [form, setForm] = useState<CreateContactMessageRequest>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const errors = useMemo(() => validate(form), [form]);

  const createMutation = useCreateContactMessage();
  // Admin-like list (for demo/polish). If backend blocks it later, UI still stands.
  const listQuery = useContactMessages();

  const canSubmit =
    Object.keys(errors).length === 0 &&
    !createMutation.isPending &&
    form.name.trim().length > 0;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length > 0) {
      toast({
        title: "Revise o formulário",
        description: "Alguns campos precisam de atenção antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createMutation.mutateAsync({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company?.trim() ? form.company.trim() : null,
        subject: form.subject.trim(),
        message: form.message.trim(),
      } as any);

      toast({
        title: "Mensagem enviada",
        description: "Recebemos seu contato. Vamos responder o quanto antes.",
      });

      setForm({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast({
        title: "Não foi possível enviar",
        description: err instanceof Error ? err.message : "Tente novamente em instantes.",
        variant: "destructive",
      });
    }
  };

  return (
    <SiteShell>
      <Seo
        title="Contato"
        description="Fale com a NightHost. Envie uma mensagem ou chame no WhatsApp para escolher plano, migrar projetos e tirar dúvidas."
        path="/contato"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <SectionHeading
              testId="contato-heading"
              eyebrow="Contato"
              title={
                <>
                  Vamos colocar seu projeto{" "}
                  <span className="text-gradient">no ar</span>.
                </>
              }
              description="Conte rapidamente o que você precisa (site, VPS, domínios, migração). A gente responde com clareza — sem empurrar plano."
              actions={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    asChild
                    data-testid="contato-cta-whatsapp"
                    className={cn(
                      "h-11 rounded-2xl px-5 btn-sheen",
                      "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                      "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
                      "hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    )}
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                      Falar no WhatsApp <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    data-testid="contato-cta-contratar"
                    onClick={() => alert("Placeholder: contratação/checkout (em breve).")}
                    className={cn(
                      "h-11 rounded-2xl px-5",
                      "bg-muted/35 text-foreground ring-1 ring-border/60",
                      "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    )}
                  >
                    Contratar
                  </Button>
                </div>
              }
            />

            <div className="mt-8 rounded-3xl glass-strong noise-overlay p-6 sm:p-7" data-testid="contato-form-card">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-foreground/90" htmlFor="name">
                      Nome
                    </label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Seu nome"
                      data-testid="contato-input-nome"
                      className="mt-2 w-full rounded-2xl bg-background/30 border-2 border-border/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                    {errors.name ? (
                      <p className="mt-2 text-xs text-destructive" data-testid="contato-erro-nome">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground/90" htmlFor="email">
                      E-mail
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="voce@empresa.com"
                      data-testid="contato-input-email"
                      className="mt-2 w-full rounded-2xl bg-background/30 border-2 border-border/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                    {errors.email ? (
                      <p className="mt-2 text-xs text-destructive" data-testid="contato-erro-email">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-foreground/90" htmlFor="company">
                      Empresa (opcional)
                    </label>
                    <Input
                      id="company"
                      value={form.company ?? ""}
                      onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                      placeholder="Nome da empresa"
                      data-testid="contato-input-empresa"
                      className="mt-2 w-full rounded-2xl bg-background/30 border-2 border-border/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground/90" htmlFor="subject">
                      Assunto
                    </label>
                    <Input
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                      placeholder="Ex.: Migração de site, VPS para API..."
                      data-testid="contato-input-assunto"
                      className="mt-2 w-full rounded-2xl bg-background/30 border-2 border-border/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                    {errors.subject ? (
                      <p className="mt-2 text-xs text-destructive" data-testid="contato-erro-assunto">
                        {errors.subject}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground/90" htmlFor="message">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Conte o contexto, stack e objetivo. Quanto mais claro, mais rápida a resposta."
                    data-testid="contato-input-mensagem"
                    className="mt-2 min-h-[140px] w-full rounded-2xl bg-background/30 border-2 border-border/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                  {errors.message ? (
                    <p className="mt-2 text-xs text-destructive" data-testid="contato-erro-mensagem">
                      {errors.message}
                    </p>
                  ) : (
                    <p className="mt-2 text-xs text-muted-foreground" data-testid="contato-dica-mensagem">
                      Dica: inclua o volume de tráfego e se precisa de e-mail profissional.
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                    <span data-testid="contato-privacidade">
                      Ao enviar, você concorda que a NightHost use seus dados apenas para responder este contato.
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    data-testid="contato-btn-enviar"
                    className={cn(
                      "h-11 rounded-2xl px-5 btn-sheen",
                      "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                      "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
                      "hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200",
                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    )}
                  >
                    {createMutation.isPending ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        Enviar mensagem <Send className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl glass noise-overlay p-6 sm:p-7" data-testid="contato-inbox">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90">
                    <Inbox className="h-4 w-4 text-primary" />
                    Últimas mensagens (demo)
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Se o endpoint de listagem estiver ativo, você verá envios recentes aqui.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  data-testid="contato-btn-atualizar"
                  onClick={() => listQuery.refetch()}
                  className={cn(
                    "h-10 rounded-2xl bg-muted/35 text-foreground ring-1 ring-border/60",
                    "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  )}
                >
                  Atualizar
                </Button>
              </div>

              <div className="mt-6 space-y-3">
                {listQuery.isLoading ? (
                  <div className="rounded-2xl bg-muted/20 p-4 ring-1 ring-border/55">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Carregando mensagens...
                    </div>
                  </div>
                ) : listQuery.isError ? (
                  <div className="rounded-2xl bg-destructive/10 p-4 ring-1 ring-destructive/25">
                    <div className="text-sm font-semibold text-foreground">Não foi possível carregar</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {listQuery.error instanceof Error ? listQuery.error.message : "Erro desconhecido."}
                    </p>
                  </div>
                ) : (listQuery.data?.length ?? 0) === 0 ? (
                  <div className="rounded-2xl bg-muted/20 p-5 ring-1 ring-border/55" data-testid="contato-vazio">
                    <div className="text-sm font-semibold text-foreground/90">Nada por aqui ainda</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Envie uma mensagem pelo formulário — ela deve aparecer nesta lista quando o backend estiver pronto.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        data-testid="contato-btn-exemplo"
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            subject: p.subject || "Quero migrar meu site para a NightHost",
                            message:
                              p.message ||
                              "Tenho um site WordPress com tráfego moderado. Quero migrar com o mínimo de downtime. Qual plano você recomenda?",
                          }))
                        }
                        className={cn(
                          "h-10 rounded-2xl bg-muted/35 text-foreground ring-1 ring-border/60",
                          "hover:bg-muted/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                        )}
                      >
                        Preencher exemplo
                      </Button>

                      <Button
                        asChild
                        data-testid="contato-btn-planos"
                        className={cn(
                          "h-10 rounded-2xl btn-sheen",
                          "bg-gradient-to-r from-primary/18 via-accent/10 to-transparent",
                          "ring-1 ring-border/55 text-foreground hover:ring-border"
                        )}
                      >
                        <Link href="/planos">Ver planos</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3" data-testid="contato-lista">
                    {listQuery.data!.slice(0, 6).map((m) => (
                      <div
                        key={m.id}
                        className="rounded-2xl bg-muted/20 p-4 ring-1 ring-border/55"
                        data-testid={`contato-msg-${m.id}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-foreground/90">
                              <span data-testid={`contato-msg-${m.id}-assunto`}>{m.subject}</span>
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              <span data-testid={`contato-msg-${m.id}-nome`}>{m.name}</span> ·{" "}
                              <span data-testid={`contato-msg-${m.id}-email`}>{m.email}</span>
                              {m.company ? (
                                <>
                                  {" "}
                                  · <span data-testid={`contato-msg-${m.id}-empresa`}>{m.company}</span>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          <span data-testid={`contato-msg-${m.id}-mensagem`}>{m.message}</span>
                        </p>
                      </div>
                    ))}
                    <p className="pt-1 text-xs text-muted-foreground">
                      Mostrando as últimas {Math.min(listQuery.data!.length, 6)} mensagens.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
