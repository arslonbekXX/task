import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Accent = "indigo" | "green" | "gray" | "amber";

interface StatsCardProps {
  label: string;
  value: number;
  hint?: string;
  icon: ReactNode;
  accent?: Accent;
}

const accentClasses: Record<Accent, string> = {
  indigo:
    "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300",
  green:
    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
  gray: "bg-muted text-muted-foreground",
  amber:
    "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300",
};

export function StatsCard({
  label,
  value,
  hint,
  icon,
  accent = "indigo",
}: StatsCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-foreground">
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-lg [&_svg]:size-5",
            accentClasses[accent],
          )}
        >
          {icon}
        </span>
      </div>
    </Card>
  );
}
