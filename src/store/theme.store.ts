import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: STORAGE_KEYS.theme,
      storage: createJSONStorage(() => localStorage),
      // Rehydrated manually on the client (see useStoresHydration).
      skipHydration: true,
      version: 1,
    },
  ),
);
