import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FeatureCard({
  icon,
  title,
  description,
  highlight,
  testId,
  footer,
}: {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  highlight?: string;
  footer?: ReactNode;
  testId?: string;
}) {
  return (
    <motion.div
      data-testid={testId}
      className={cn(
        "group relative rounded-3xl p-5 sm:p-6 glass noise-overlay",
        "transition-all duration-300"
      )}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          "bg-gradient-to-br from-primary/10 via-accent/10 to-transparent"
        )}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted/35 ring-1 ring-border/60 text-primary">
            {icon}
          </div>
          {highlight ? (
            <div className="rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/25">
              {highlight}
            </div>
          ) : null}
        </div>

        <div className="mt-4">
          <h3 className="font-display text-lg sm:text-xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        {footer ? <div className="mt-4">{footer}</div> : null}
      </div>
    </motion.div>
  );
}
