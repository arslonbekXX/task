import { useEffect, useState } from "react";
import { SEARCH_DEBOUNCE_MS } from "@/lib/constants";

/**
 * Returns a debounced copy of `value` that only updates after `delay` ms
 * of no changes. Used by the table search input.
 */
export function useDebounce<T>(
  value: T,
  delay: number = SEARCH_DEBOUNCE_MS,
): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
