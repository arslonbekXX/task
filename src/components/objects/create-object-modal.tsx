import type { ObjectFormValues } from '@/types'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ObjectForm } from './object-form'
import { useObjectsStore } from '@/store/objects.store'

interface CreateObjectModalProps {
  open: boolean
  onClose: () => void
}

export function CreateObjectModal({ open, onClose }: CreateObjectModalProps) {
  const addObject = useObjectsStore((state) => state.addObject)

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose()
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Yangi obyekt</DialogTitle>
          <DialogDescription>
            Yangi geo obyekt ma’lumotlarini kiriting.
          </DialogDescription>
        </DialogHeader>
        <ObjectForm
          mode="create"
          submitLabel="Qo‘shish"
          onCancel={onClose}
          onSubmit={(values: ObjectFormValues) => {
            addObject(values)
            toast.success('Obyekt qo‘shildi')
            onClose()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
