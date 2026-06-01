import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme.store";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDark = theme === "dark";

  return (
    <Button variant="outline" size="sm" onClick={toggleTheme}>
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
