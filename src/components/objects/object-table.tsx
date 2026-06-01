import { useEffect, useMemo, useState } from "react";
import { Inbox, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import type { GeoObject } from "@/types";
import { useObjectsStore } from "@/store/objects.store";
import { useDebounce } from "@/lib/use-debounce";
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ObjectRow } from "./object-row";
import { CreateObjectModal } from "./create-object-modal";
import { EditObjectModal } from "./edit-object-modal";

export function ObjectTable() {
  const objects = useObjectsStore((state) => state.objects);
  const deleteObject = useObjectsStore((state) => state.deleteObject);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(1);

  const [editing, setEditing] = useState<GeoObject | null>(null);
  const [pendingDelete, setPendingDelete] = useState<GeoObject | null>(null);
  const [creating, setCreating] = useState(false);

  // Filter by name (debounced, case-insensitive).
  const filtered = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return objects;
    return objects.filter((object) =>
      object.name.toLowerCase().includes(query),
    );
  }, [objects, debouncedSearch]);

  // Reset to the first page whenever the filter or page size changes.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, pageSize]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(startIndex, startIndex + pageSize);

  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteObject(pendingDelete.id);
    toast.success("Obyekt o‘chirildi");
    setPendingDelete(null);
  };

  return (
    <Card className="gap-0 overflow-hidden py-0">
      {/* Toolbar: title + search + page size */}
      <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Obyektlar ({filtered.length})</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nom bo‘yicha qidirish…"
              className="w-full pl-8 sm:w-56"
              aria-label="Nom bo‘yicha qidirish"
            />
          </div>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger
              size="sm"
              className="w-auto"
              aria-label="Har sahifadagi qatorlar soni"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} / sahifa
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" onClick={() => setCreating(true)}>
            <Plus className="size-4" />
            Yangi obyekt
          </Button>
        </div>
      </div>

      {objects.length === 0 ? (
        <EmptyState
          title="Hali obyekt yo‘q"
          message="«Yangi obyekt» tugmasi orqali birinchi geo obyektni qo‘shing."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Natija topilmadi"
          message={`"${debouncedSearch}" bo‘yicha mos obyekt yo‘q.`}
        />
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nomi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageItems.map((object) => (
                <ObjectRow
                  key={object.id}
                  object={object}
                  onEdit={setEditing}
                  onDelete={setPendingDelete}
                />
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-col items-center justify-between gap-3 border-t px-5 py-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              {startIndex + 1}–
              {Math.min(startIndex + pageSize, filtered.length)} /{" "}
              {filtered.length} ta
            </p>
            <TablePagination
              page={currentPage}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          </div>
        </>
      )}

      <CreateObjectModal open={creating} onClose={() => setCreating(false)} />

      <EditObjectModal
        object={editing}
        open={editing !== null}
        onClose={() => setEditing(null)}
      />

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Obyektni o‘chirish"
        message={
          pendingDelete
            ? `"${pendingDelete.name}" obyektini o‘chirmoqchimisiz? Bu amalni ortga qaytarib bo‘lmaydi.`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </Card>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      <Inbox className="size-8 text-muted-foreground/60" />
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="max-w-sm text-xs text-muted-foreground">{message}</p>
    </div>
  );
}
