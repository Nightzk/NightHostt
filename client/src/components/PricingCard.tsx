import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  recommended?: boolean;
  ctaLabel: string;
};

export default function PricingCard({
  plan,
  onSelect,
  testId,
  extra,
}: {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
  testId?: string;
  extra?: ReactNode;
}) {
  return (
    <motion.div
      data-testid={testId}
      className={cn(
        "relative rounded-3xl p-6 glass noise-overlay",
        plan.recommended ? "ring-1 ring-primary/35" : "ring-1 ring-border/60"
      )}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      {plan.recommended ? (
        <div
          className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 px-3 py-1 text-xs font-bold text-foreground ring-1 ring-primary/25"
          data-testid={`${testId}-badge`}
        >
          Recomendado
        </div>
      ) : null}

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
          </div>
        </div>

        <div className="mt-6 flex items-end gap-2">
          <div className="font-display text-4xl tracking-tight">{plan.price}</div>
          <div className="pb-1 text-sm text-muted-foreground">{plan.period}</div>
        </div>

        <div className="mt-6 grid gap-2">
          {plan.features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm text-foreground/90">
              <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/25">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="leading-relaxed">{f}</span>
            </div>
          ))}
        </div>

        {extra ? <div className="mt-6">{extra}</div> : null}

        <Button
          type="button"
          onClick={() => onSelect(plan.id)}
          data-testid={`${testId}-cta`}
          className={cn(
            "mt-8 w-full rounded-2xl h-11 justify-center gap-2 btn-sheen",
            plan.recommended
              ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
              : "bg-muted/40 text-foreground ring-1 ring-border/60 hover:bg-muted/60"
          )}
        >
          {plan.ctaLabel}
        </Button>

        <p className="mt-3 text-xs text-muted-foreground">
          Sem letras miúdas. Escale quando precisar — você mantém o controle.
        </p>
      </div>
    </motion.div>
  );
}
