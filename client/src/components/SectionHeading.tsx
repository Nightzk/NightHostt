import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  actions,
  testId,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  actions?: ReactNode;
  testId?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
      data-testid={testId}
    >
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/25 px-3 py-1 text-xs font-semibold text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
      ) : null}

      <h2 className={cn("text-2xl sm:text-3xl lg:text-4xl leading-[1.05]")}>
        {title}
      </h2>

      {description ? (
        <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      ) : null}

      {actions ? <div className="pt-2">{actions}</div> : null}
    </div>
  );
}
