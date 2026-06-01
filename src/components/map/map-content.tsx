import { useEffect } from "react";
import L, { type DivIcon } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import type { GeoObject, LatLng, Status } from "@/types";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/lib/constants";
import { useThemeStore } from "@/store/theme.store";
import { StatusBadge } from "@/components/ui/status-badge";

/**
 * Leaflet map. This module statically imports `leaflet` / `react-leaflet`,
 * which touch `window` at load time, so it is only ever imported on the client
 * (via `React.lazy` behind `<ClientOnly>` in `map-view.tsx`).
 */

/** Coloured SVG pin; the bottom tip (16,40) is anchored on the coordinate. */
function pinSvg(color: string): string {
  return `<svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16 0C7.16 0 0 7.0 0 15.7 0 27 16 40 16 40s16-13 16-24.3C32 7 24.84 0 16 0Z" fill="${color}"/><circle cx="16" cy="15.5" r="6" fill="#ffffff"/></svg>`;
}

function makeIcon(color: string): DivIcon {
  return L.divIcon({
    html: pinSvg(color),
    className: "", // drop Leaflet's default white box around div icons
    iconSize: [32, 40],
    iconAnchor: [16, 40], // bottom tip sits on the coordinate
    popupAnchor: [0, -40], // popup opens above the tip
  });
}

// Built once — only the colour varies (green-600 / gray-500).
const ICONS: Record<Status, DivIcon> = {
  active: makeIcon("#16a34a"),
  inactive: makeIcon("#6b7280"),
};

// Distinct marker for a coordinate being chosen in the map picker (blue-600).
const PICKED_ICON = makeIcon("#2563eb");

const TILE_URLS: Record<"light" | "dark", string> = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};

const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

/** Bridges Leaflet map clicks to `onPick` — `latlng` is already {lat, lng}. */
function ClickHandler({ onPick }: { onPick?: (coord: LatLng) => void }) {
  useMapEvents({
    click(event) {
      onPick?.({ lat: event.latlng.lat, lng: event.latlng.lng });
    },
  });
  return null;
}

/** Keep Leaflet's size in sync when its container resizes (e.g. in a dialog). */
function AutoResize() {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());
    // Also re-measure once after mount, in case the container was animating
    // (Radix dialog open transition) when Leaflet first sized itself.
    const timer = setTimeout(() => map.invalidateSize(), 200);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [map]);
  return null;
}

interface MapContentProps {
  objects: GeoObject[];
  /** Called with the clicked coordinate (lat/lng). */
  onPick?: (coord: LatLng) => void;
  /** A coordinate being chosen — rendered as a distinct (blue) marker. */
  picked?: LatLng | null;
  /** Initial map centre (read once on mount); defaults to DEFAULT_MAP_CENTER. */
  initialCenter?: LatLng;
}

export default function MapContent({
  objects,
  onPick,
  picked,
  initialCenter,
}: MapContentProps) {
  const theme = useThemeStore((state) => state.theme);
  const center: [number, number] = initialCenter
    ? [initialCenter.lat, initialCenter.lng]
    : DEFAULT_MAP_CENTER;

  return (
    <MapContainer
      center={center}
      zoom={DEFAULT_MAP_ZOOM}
      scrollWheelZoom
      className="h-full w-full"
    >
      {/* `key` forces a clean reload of the raster layer on theme toggle. */}
      <TileLayer
        key={theme}
        url={TILE_URLS[theme]}
        attribution={TILE_ATTRIBUTION}
      />

      <ClickHandler onPick={onPick} />
      <AutoResize />

      {objects.map((object) => (
        <Marker
          key={object.id}
          position={[object.latitude, object.longitude]}
          icon={ICONS[object.status]}
        >
          <Popup className="geo-popup">
            <p className="text-sm font-semibold text-popover-foreground">
              {object.name}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {object.description}
            </p>
            <div className="mt-2">
              <StatusBadge status={object.status} />
            </div>
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">
              {object.latitude.toFixed(5)}, {object.longitude.toFixed(5)}
            </p>
          </Popup>
        </Marker>
      ))}

      {picked && (
        <Marker position={[picked.lat, picked.lng]} icon={PICKED_ICON} />
      )}
    </MapContainer>
  );
}
