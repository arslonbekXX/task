import { useMemo } from "react";
import { CircleCheck, CirclePause, Layers, MapPin } from "lucide-react";
import { selectStats, useObjectsStore } from "@/store/objects.store";
import { StatsCard } from "./stats-card";

export function StatsGrid() {
  const objects = useObjectsStore((state) => state.objects);
  const stats = useMemo(() => selectStats(objects), [objects]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        label="Jami obyektlar"
        value={stats.total}
        icon={<MapPin />}
        accent="indigo"
      />
      <StatsCard
        label="Aktiv obyektlar"
        value={stats.active}
        icon={<CircleCheck />}
        accent="green"
      />
      <StatsCard
        label="Nofaol obyektlar"
        value={stats.inactive}
        icon={<CirclePause />}
        accent="gray"
      />
      <StatsCard
        label="Poligonlar"
        value={stats.polygons}
        hint="Nuqtaviy model — poligon yo‘q"
        icon={<Layers />}
        accent="amber"
      />
    </div>
  );
}
