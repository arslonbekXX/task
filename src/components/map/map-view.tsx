import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ClientOnly } from "@tanstack/react-router";
import type { GeoObject, LatLng } from "@/types";
import { cn } from "@/lib/utils";

const MapContent = lazy(() => import("./map-content"));

interface MapViewProps {
  objects: GeoObject[];
  /** Called with the clicked coordinate (lat/lng). */
  onPick?: (coord: LatLng) => void;
  /** A coordinate being chosen — rendered as a distinct marker. */
  picked?: LatLng | null;
  /** Initial map centre (read once on mount). */
  initialCenter?: LatLng;
  className?: string;
}

/** Placeholder shown during SSR and while the map chunk loads. */
function MapLoading() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted/80 backdrop-blur-sm">
      <Loader2 className="size-7 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Xarita yuklanmoqda…</p>
    </div>
  );
}

/**
 * Leaflet has no SSR support, so the real map lives in `./map-content` and is
 * loaded lazily behind `<ClientOnly>`: the Leaflet module is never imported or
 * rendered on the server, which keeps hydration clean. Tiles come from CartoDB
 * (OpenStreetMap data) and need no API key.
 */
export function MapView({
  objects,
  onPick,
  picked,
  initialCenter,
  className,
}: MapViewProps) {
  return (
    <div
      className={cn(
        // `isolate` traps Leaflet's high pane/control z-indexes (up to 1000)
        // inside this stacking context so portal'd overlays — edit dialog,
        // Select dropdowns, toasts — render above the map instead of behind it.
        "relative isolate h-full w-full overflow-hidden rounded-xl border bg-muted",
        className,
      )}
    >
      <ClientOnly fallback={<MapLoading />}>
        <Suspense fallback={<MapLoading />}>
          <MapContent
            objects={objects}
            onPick={onPick}
            picked={picked}
            initialCenter={initialCenter}
          />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
