import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function StatPill({
  icon,
  label,
  value,
  testId,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  testId?: string;
}) {
  return (
    <div
      data-testid={testId}
      className={cn(
        "flex items-center gap-3 rounded-2xl px-4 py-3",
        "bg-muted/25 ring-1 ring-border/55 backdrop-blur",
        "shadow-[0_1px_0_hsl(0_0%_100%_/_0.03)]"
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/18 to-accent/10 ring-1 ring-border/50 text-primary">
        {icon}
      </div>
      <div className="leading-tight">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-display text-base">{value}</div>
      </div>
    </div>
  );
}
