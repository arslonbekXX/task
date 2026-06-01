import { useState } from "react";
import { MapPinned } from "lucide-react";
import type { LatLng } from "@/types";
import { useObjectsStore } from "@/store/objects.store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapView } from "@/components/map/map-view";

interface MapPickerProps {
  /** Current coordinate (pre-selects it and centres the map on open). */
  value?: LatLng | null;
  /** Called with the confirmed coordinate. */
  onChange: (coord: LatLng) => void;
}

/**
 * "Pick from map" button → opens a dialog with the map. Existing objects are
 * shown for context; clicking the map chooses a point (blue marker), and
 * "Tanlash" writes it back to the form. Reused by the create and edit forms.
 */
export function MapPicker({ value, onChange }: MapPickerProps) {
  const objects = useObjectsStore((state) => state.objects);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<LatLng | null>(value ?? null);

  function handleOpenChange(next: boolean) {
    // Re-seed the draft from the current value each time the dialog opens.
    if (next) setDraft(value ?? null);
    setOpen(next);
  }

  function confirm() {
    if (draft) onChange(draft);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <MapPinned className="size-4" />
          Xaritadan tanlash
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Xaritadan koordinata tanlash</DialogTitle>
          <DialogDescription>
            Joyni belgilash uchun xaritaning kerakli nuqtasiga bosing.
          </DialogDescription>
        </DialogHeader>

        <div className="h-[55vh] max-h-[26rem] w-full">
          <MapView
            objects={objects}
            picked={draft}
            initialCenter={value ?? undefined}
            onPick={setDraft}
          />
        </div>

        <p className="font-mono text-xs text-muted-foreground">
          {draft
            ? `${draft.lat.toFixed(6)}, ${draft.lng.toFixed(6)}`
            : "Hali nuqta tanlanmadi"}
        </p>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Bekor qilish
          </Button>
          <Button type="button" onClick={confirm} disabled={!draft}>
            Tanlash
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
