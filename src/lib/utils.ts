import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { GeoObject, ObjectFormValues } from "@/types";

/** Merge class names, de-duplicating conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Convert validated form values into the persisted GeoObject shape (sans id/createdAt). */
export function formValuesToGeoObject(
  values: ObjectFormValues,
): Omit<GeoObject, "id" | "createdAt"> {
  return {
    name: values.name.trim(),
    description: values.description.trim(),
    status: values.status,
    latitude: Number(values.latitude),
    longitude: Number(values.longitude),
  };
}

/** Convert a stored GeoObject into form values (for the edit modal). */
export function geoObjectToFormValues(obj: GeoObject): ObjectFormValues {
  return {
    name: obj.name,
    description: obj.description,
    status: obj.status,
    latitude: String(obj.latitude),
    longitude: String(obj.longitude),
  };
}

/**
 * Normalise a TanStack Form error list into a single string.
 * With a Standard Schema (Zod) validator the errors are issue objects
 * ({ message }); with a function validator they are plain strings.
 */
export function fieldErrorText(errors: ReadonlyArray<unknown>): string | null {
  if (errors.length === 0) return null;
  const messages = errors
    .map((err) =>
      typeof err === "string"
        ? err
        : (err as { message?: string } | null | undefined)?.message,
    )
    .filter((m): m is string => Boolean(m));
  return messages.length > 0 ? messages.join(", ") : null;
}

/** Format a coordinate for display (6 decimals). */
export function formatCoord(value: number): string {
  return value.toFixed(6);
}

/** Shorten an id for compact table display. */
export function shortId(id: string): string {
  return id.length <= 8 ? id : `${id.slice(0, 8)}…`;
}
