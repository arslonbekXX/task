import { MapPin } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <MapPin className="size-4.5" />
          </span>
          <div>
            <h1 className="text-base font-semibold">Mini Geo Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              Geo obyektlarni boshqarish
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
