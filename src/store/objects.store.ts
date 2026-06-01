import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { GeoObject, ObjectFormValues, Stats } from "@/types";
import { STORAGE_KEYS } from "@/lib/constants";
import { formValuesToGeoObject } from "@/lib/utils";
import seed from "@/data/seed.json";

// seed.json is statically typed as a loose structure; assert our domain type.
const seedObjects = seed as GeoObject[];

interface ObjectsState {
  objects: GeoObject[];
  addObject: (values: ObjectFormValues) => void;
  updateObject: (id: string, values: ObjectFormValues) => void;
  deleteObject: (id: string) => void;
  resetToSeed: () => void;
}

function createId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `obj_${Date.now().toString(36)}_${Math.random().toString(16).slice(2)}`;
}

export const useObjectsStore = create<ObjectsState>()(
  persist(
    (set) => ({
      objects: seedObjects,

      addObject: (values) =>
        set((state) => ({
          objects: [
            {
              ...formValuesToGeoObject(values),
              id: createId(),
              createdAt: new Date().toISOString(),
            },
            ...state.objects,
          ],
        })),

      updateObject: (id, values) =>
        set((state) => ({
          objects: state.objects.map((obj) =>
            obj.id === id ? { ...obj, ...formValuesToGeoObject(values) } : obj,
          ),
        })),

      deleteObject: (id) =>
        set((state) => ({
          objects: state.objects.filter((obj) => obj.id !== id),
        })),

      resetToSeed: () => set({ objects: seedObjects }),
    }),
    {
      name: STORAGE_KEYS.objects,
      storage: createJSONStorage(() => localStorage),
      // Don't read localStorage during SSR — we rehydrate manually on the client.
      skipHydration: true,
      partialize: (state) => ({ objects: state.objects }),
      version: 1,
    },
  ),
);

/** Derive dashboard statistics from the object list. */
export function selectStats(objects: GeoObject[]): Stats {
  const active = objects.reduce(
    (count, obj) => (obj.status === "active" ? count + 1 : count),
    0,
  );
  return {
    total: objects.length,
    active,
    inactive: objects.length - active,
    // GeoObject is point-based, so there are no polygon objects yet.
    polygons: 0,
  };
}
