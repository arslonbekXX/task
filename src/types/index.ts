/**
 * Domain types for the Mini Geo Dashboard.
 */

export type Status = 'active' | 'inactive'

/** A single geo object stored in the app (point geometry). */
export interface GeoObject {
  id: string
  name: string
  description: string
  status: Status
  latitude: number
  longitude: number
  /** ISO 8601 timestamp */
  createdAt: string
}

/**
 * Shape held by TanStack Form while editing.
 * latitude/longitude are kept as strings because they come from text inputs
 * (and from the map as formatted strings) — they are converted to numbers on submit.
 */
export interface ObjectFormValues {
  name: string
  description: string
  status: Status
  latitude: string
  longitude: string
}

/** Derived dashboard statistics. */
export interface Stats {
  total: number
  active: number
  inactive: number
  polygons: number
}

/** A geographic coordinate in latitude/longitude form. */
export interface LatLng {
  lat: number
  lng: number
}
