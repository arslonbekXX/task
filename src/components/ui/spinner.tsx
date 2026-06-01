import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/** Small spinning indicator built on the lucide Loader2 icon. */
export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2
      role="status"
      aria-label="Yuklanmoqda"
      className={cn("size-5 animate-spin text-muted-foreground", className)}
    />
  );
}
