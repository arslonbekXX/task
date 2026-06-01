import type { GeoObject } from '@/types'
import { Pencil, Trash2 } from 'lucide-react'
import { TableCell, TableRow } from '@/components/ui/table'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { formatCoord, shortId } from '@/lib/utils'

interface ObjectRowProps {
  object: GeoObject
  onEdit: (object: GeoObject) => void
  onDelete: (object: GeoObject) => void
}

export function ObjectRow({ object, onEdit, onDelete }: ObjectRowProps) {
  return (
    <TableRow>
      <TableCell
        className="font-mono text-xs text-muted-foreground"
        title={object.id}
      >
        {shortId(object.id)}
      </TableCell>
      <TableCell className="font-medium text-foreground">{object.name}</TableCell>
      <TableCell>
        <StatusBadge status={object.status} />
      </TableCell>
      <TableCell className="tabular-nums">{formatCoord(object.latitude)}</TableCell>
      <TableCell className="tabular-nums">{formatCoord(object.longitude)}</TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(object)}
            aria-label={`${object.name} ni tahrirlash`}
          >
            <Pencil />
            <span className="hidden sm:inline">Tahrirlash</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(object)}
            aria-label={`${object.name} ni o‘chirish`}
          >
            <Trash2 />
            <span className="hidden sm:inline">O‘chirish</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
