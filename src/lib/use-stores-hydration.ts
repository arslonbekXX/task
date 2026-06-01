import { useEffect, useState } from "react";
import { useObjectsStore } from "@/store/objects.store";
import { useThemeStore } from "@/store/theme.store";

/**
 * Both stores use `skipHydration: true` so that localStorage is never touched
 * during SSR (which would break / cause hydration mismatches). We rehydrate them
 * manually on the client and gate the interactive UI until that is done.
 *
 * Returns `true` once persisted state has been read from localStorage.
 */
export function useStoresHydration(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void Promise.resolve(
      Promise.all([
        useObjectsStore.persist.rehydrate(),
        useThemeStore.persist.rehydrate(),
      ]),
    ).finally(() => {
      if (!cancelled) setHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return hydrated;
}
