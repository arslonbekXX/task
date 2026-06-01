import type { GeoObject, ObjectFormValues } from '@/types'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ObjectForm } from './object-form'
import { geoObjectToFormValues } from '@/lib/utils'
import { useObjectsStore } from '@/store/objects.store'

interface EditObjectModalProps {
  object: GeoObject | null
  open: boolean
  onClose: () => void
}

export function EditObjectModal({ object, open, onClose }: EditObjectModalProps) {
  const updateObject = useObjectsStore((state) => state.updateObject)

  return (
    <Dialog
      open={open && object !== null}
      onOpenChange={(next) => {
        if (!next) onClose()
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Obyektni tahrirlash</DialogTitle>
          <DialogDescription>
            Obyekt maydonlarini yangilab, saqlang.
          </DialogDescription>
        </DialogHeader>
        {object && (
          <ObjectForm
            mode="edit"
            initialValues={geoObjectToFormValues(object)}
            submitLabel="Saqlash"
            onCancel={onClose}
            onSubmit={(values: ObjectFormValues) => {
              updateObject(object.id, values)
              toast.success('Obyekt yangilandi')
              onClose()
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
