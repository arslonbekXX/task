import type { Status } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Coloured status pill (green = active, muted = inactive). */
export function StatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  const isActive = status === "active";
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1.5",
        isActive
          ? "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
          : "text-muted-foreground",
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          isActive ? "bg-emerald-500" : "bg-muted-foreground/60",
        )}
      />
      {isActive ? "Aktiv" : "Nofaol"}
    </Badge>
  );
}
