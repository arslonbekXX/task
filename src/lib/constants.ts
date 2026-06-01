import type { Status } from "@/types";

/** localStorage keys used by the Zustand `persist` middleware. */
export const STORAGE_KEYS = {
  objects: "geo-objects-storage",
  theme: "geo-theme-storage",
} as const;

/** Table page-size options the user can switch between. */
export const PAGE_SIZE_OPTIONS = [5, 10] as const;
export const DEFAULT_PAGE_SIZE = 5;

/** Debounce delay (ms) for the table search input. */
export const SEARCH_DEBOUNCE_MS = 300;

/**
 * Default map view — Tashkent, Uzbekistan.
 * NOTE: Leaflet expects coordinates as [latitude, longitude].
 */
export const DEFAULT_MAP_CENTER: [number, number] = [41.2995, 69.2401];
export const DEFAULT_MAP_ZOOM = 11;

/** Options for the status <select>. */
export const STATUS_OPTIONS: ReadonlyArray<{ value: Status; label: string }> = [
  { value: "active", label: "Faol" },
  { value: "inactive", label: "Nofaol" },
];
